"use client";

import { getPalette } from "@/lib/theme-palettes";
import { createClient } from "@/utils/supabase/client";
import { createContext, memo, useCallback, useContext, useEffect, useMemo } from "react";
import * as React from "react";
import useSWR from "swr";

export interface Theme {
  palette: { name: string; colors?: Record<string, string> };
}

declare global {
  // eslint-disable-next-line no-var
  var __THEME__: any;
}

type ScriptProps = React.DetailedHTMLProps<
  React.ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
>;

export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string;

  theme: Theme;

  paletteName: string;

  setPaletteName: (name: string) => Promise<void>;
}

export interface ThemeProviderProps extends React.PropsWithChildren {
  /** List of all available theme names */
  themes?: string[];
  /** Forced theme name for the current page (wip) */
  forcedTheme?: string;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean;
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Default theme */
  defaultTheme?: Theme;
  /** Nonce string to pass to the inline script and style elements for CSP headers */
  nonce?: string;
  /** Props to pass the inline script */
  scriptProps?: ScriptProps;
}

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

const DEFAULT_THEME: Theme = {
  palette: { name: "system" }
};

function saveToLS(storageKey: string, value: string) {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // Unsupported
  }
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const context = useContext(ThemeContext);

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>;
  return <Theme {...props} />;
}

export const systemThemes = ["light", "dark", "system"];

async function fetchTheme(): Promise<Theme> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase
    .from("user_settings")
    .select("theme")
    .eq("user_id", user.id)
    .single();

  if (!data?.theme) {
    throw new Error("Theme not found for user");
  }

  if (data.theme.palette.name) {
    data.theme.palette = getPalette(data.theme.palette.name) || { name: data.theme.palette.name };
  }

  return resolveTheme(data.theme);
}

function resolveTheme(overrides: Partial<Theme> = {}) {
  return {
    ...DEFAULT_THEME,
    ...overrides
  };
}

function Theme({
  forcedTheme,
  disableTransitionOnChange = false,
  storageKey = "theme",
  themes = systemThemes,
  defaultTheme = DEFAULT_THEME,
  children,
  nonce,
  scriptProps
}: ThemeProviderProps) {
  const { data: theme, mutate } = useSWR("theme", fetchTheme, {
    fallbackData: resolveTheme(globalThis.__THEME__),
    keepPreviousData: true,
    onSuccess: (theme) => {
      saveToLS("palette", JSON.stringify(theme.palette));
    }
  });

  const paletteName = theme.palette.name;

  const setPaletteName = useCallback(
    async (name: string) => {
      const newPalette = getPalette(name) || { name: name };

      mutate(
        { ...theme, palette: newPalette },
        {
          revalidate: false
        }
      );

      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("user_settings")
          .upsert({ user_id: user.id, theme: { palette: { name } } });
        mutate();
      }

      saveToLS("palette", JSON.stringify(newPalette));
    },
    [mutate, theme]
  );

  useEffect(() => {
    if (systemThemes.includes(paletteName)) {
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
    }

    const palette = getPalette(paletteName);
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
  }, [paletteName]);

  const applyTheme = useCallback(
    (theme: string) => {
      let resolved = theme;
      if (!resolved) return;

      if (theme === "system") {
        resolved = getSystemTheme() ?? "dark";
      }

      const name = resolved;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      d.classList.remove(...themes);
      if (name) d.classList.add(name);

      const fallback = colorSchemes.includes(defaultTheme.palette.name)
        ? defaultTheme.palette.name
        : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
      // @ts-ignore
      d.style.colorScheme = colorScheme;

      enable?.();
    },
    [defaultTheme.palette.name, disableTransitionOnChange, nonce, themes]
  );

  useEffect(() => {
    if (paletteName !== "system" || forcedTheme) return;

    const media = window.matchMedia(MEDIA);
    const handler = () => applyTheme("system");

    handler();

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener?.(handler);
    media.addEventListener?.("change", handler);

    return () => {
      media.removeListener?.(handler);
      media.removeEventListener?.("change", handler);
    };
  }, [paletteName, forcedTheme, applyTheme]);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === storageKey) mutate();
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [mutate, storageKey]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? paletteName);
  }, [applyTheme, forcedTheme, paletteName]);

  const providerValue = useMemo(
    () => ({
      theme,
      paletteName,
      setPaletteName,
      forcedTheme,
      themes: themes
    }),
    [theme, paletteName, setPaletteName, forcedTheme, themes]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          defaultPalette: defaultTheme.palette.name,
          themes,
          nonce,
          scriptProps
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

function script(storageKey: string, defaultTheme: string, forcedTheme: string, themes: string[]) {
  const el = document.documentElement;

  function updateDOM(theme: string) {
    el.classList.remove(...themes);
    el.classList.add(theme);

    if (theme === "light" || theme === "dark") {
      el.style.colorScheme = theme;
    } else {
      const palette = JSON.parse(localStorage.getItem("palette") || "{}");

      if (palette?.colors) {
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
        } = palette.colors;

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
          el.style.setProperty(key, value);
        }
      }
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const palette = JSON.parse(localStorage.getItem("palette") || "{}");
  globalThis.__THEME__ = { palette: palette };

  try {
    const themeName = forcedTheme || palette.name || defaultTheme;
    updateDOM(!forcedTheme && themeName === "system" ? getSystemTheme() : themeName);
  } catch {
    //
  }
}

const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    defaultPalette,
    themes,
    nonce,
    scriptProps
  }: Omit<ThemeProviderProps, "children"> & { defaultPalette: string }) => {
    const scriptArgs = JSON.stringify([storageKey, defaultPalette, forcedTheme, themes]).slice(
      1,
      -1
    );

    return (
      <script
        {...scriptProps}
        suppressHydrationWarning
        nonce={typeof window === "undefined" ? nonce : ""}
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
      />
    );
  }
);

ThemeScript.displayName = "ThemeScript";

function disableAnimation(nonce?: string) {
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function getSystemTheme(e?: MediaQueryList | MediaQueryListEvent) {
  if (typeof window === "undefined") return undefined;
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
}
