"use client";

import { getPalette } from "@/lib/theme-palettes";
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";

type Theme = {
  palette: { name: string };
};

type ThemeOverrides = Partial<Theme>;

const defaultTheme: Theme = {
  palette: { name: "" }
};

const ThemeContext = createContext<
  | {
      theme: Theme;
      setPaletteName: (name: string) => Promise<void>;
      clearTheme: () => Promise<void>;
    }
  | undefined
>(undefined);

async function fetchThemeOverrides(): Promise<ThemeOverrides> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {};
  }

  const { data } = await supabase
    .from("user_settings")
    .select("theme")
    .eq("user_id", user.id)
    .single();

  return data?.theme ?? {};
}

function resolveTheme(overrides: ThemeOverrides): Theme {
  return {
    palette: { name: overrides.palette?.name ?? defaultTheme.palette.name }
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: overrides = {}, mutate } = useSWR("theme", fetchThemeOverrides);

  const theme = useMemo(() => resolveTheme(overrides), [overrides]);

  async function setPaletteName(name: string) {
    mutate(
      (current: ThemeOverrides = {}) => ({
        ...current,
        palette: { name }
      }),
      false
    );

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("user_settings")
      .update({ theme: { palette: { name } } })
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error updating theme:", error);
    }

    mutate();
  }

  async function clearTheme() {
    mutate(
      (current: ThemeOverrides = {}) => ({
        ...current,
        palette: { name: "" }
      }),
      false
    );

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("user_settings")
      .update({ theme: { palette: { name: "" } } })
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error clearing theme:", error);
    }

    // clear css variables
    const cssVars = [
      "--color-bg",
      "--color-main",
      "--color-caret",
      "--color-sub",
      "--color-sub-alt",
      "--color-text",
      "--color-error",
      "--color-error-extra",
      "--color-colorful-error",
      "--color-colorful-error-extra",
      "--color-background",
      "--color-foreground",
      "--color-card",
      "--color-card-foreground",
      "--color-popover",
      "--color-popover-foreground",
      "--color-primary",
      "--color-primary-foreground",
      "--color-secondary",
      "--color-secondary-foreground",
      "--color-muted",
      "--color-muted-foreground",
      "--color-accent",
      "--color-accent-foreground",
      "--color-destructive",
      "--color-destructive-foreground",
      "--color-border",
      "--color-input",
      "--color-ring",
      "--color-hover"
    ];

    cssVars.forEach((variable) => {
      document.documentElement.style.removeProperty(variable);
    });

    mutate();
  }

  useEffect(() => {
    const palette = getPalette(theme.palette.name);
    if (!palette) return;

    const { colors } = palette;

    const {
      bg,
      main,
      caret,
      sub,
      subAlt,
      text,
      error,
      errorExtra,
      colorfulError,
      colorfulErrorExtra
    } = colors;

    const cssVars = {
      "--color-bg": bg,
      "--color-main": main,
      "--color-caret": caret,
      "--color-sub": sub,
      "--color-sub-alt": subAlt,
      "--color-text": text,
      "--color-error": error,
      "--color-error-extra": errorExtra,
      "--color-colorful-error": colorfulError,
      "--color-colorful-error-extra": colorfulErrorExtra,
      "--color-background": bg,
      "--color-foreground": text,
      "--color-card": bg,
      "--color-card-foreground": text,
      "--color-popover": bg,
      "--color-popover-foreground": text,
      "--color-primary": main,
      "--color-primary-foreground": bg,
      "--color-secondary": subAlt,
      "--color-secondary-foreground": sub,
      "--color-muted": subAlt,
      "--color-muted-foreground": sub,
      "--color-accent": subAlt,
      "--color-accent-foreground": sub,
      "--color-destructive": error,
      "--color-destructive-foreground": text,
      "--color-border": subAlt,
      "--color-input": subAlt,
      "--color-ring": main,
      "--color-hover": text
    };

    for (const [key, value] of Object.entries(cssVars)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme.palette.name]);

  return (
    <ThemeContext.Provider value={{ theme, setPaletteName, clearTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
