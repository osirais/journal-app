"use client";

import { getPalette } from "@/lib/theme-palettes";
import { createClient } from "@/utils/supabase/client";
import { createContext, memo, useCallback, useContext, useEffect, useMemo } from "react";
import * as React from "react";
import useSWR from "swr";

export interface Theme {
  palette: { name: string; colors?: Record<string, string> };
  favoritePalettes: Set<string>;
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

  favoritePalettes?: Set<string>;
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
  palette: { name: "system" },
  favoritePalettes: new Set(["light", "dark"])
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
    .maybeSingle();

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
  storageKey = "palette",
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
      saveToLS(storageKey, JSON.stringify(theme.palette));
    }
  });

  const paletteName = theme.palette.name;

  const setPaletteName = useCallback(
    async (name: string) => {
      const newPalette = getPalette(name) || { name: name };

      mutate({ ...theme, palette: newPalette }, { revalidate: false });

      saveToLS(storageKey, JSON.stringify(newPalette));

      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("user_settings")
          .upsert({ user_id: user.id, theme: { palette: { name } } });
      }
    },
    [mutate, storageKey, theme]
  );

  const applyTheme = useCallback(() => {
    if (!paletteName) return;

    if (disableTransitionOnChange) {
      disableAnimation(nonce)();
    }

    const resolved = paletteName === "system" ? (getSystemTheme() ?? "dark") : paletteName;
    const el = document.documentElement;

    el.classList.remove(...themes);
    if (resolved) el.classList.add(resolved);

    const colorScheme = colorSchemes.includes(resolved)
      ? resolved
      : colorSchemes.includes(defaultTheme.palette.name)
        ? defaultTheme.palette.name
        : null;

    (el.style as any).colorScheme = colorScheme;

    const palette = getPalette(resolved);
    if (!palette) return;

    Object.entries(palette.colors).forEach(([k, v]) => {
      el.style.setProperty(k, v);
    });
  }, [defaultTheme.palette.name, disableTransitionOnChange, nonce, paletteName, themes]);

  useEffect(() => {
    applyTheme();

    if (paletteName === "system" && !forcedTheme) {
      const media = window.matchMedia(MEDIA);

      // Intentionally use deprecated listener methods to support iOS & old browsers
      media.addListener?.(applyTheme);
      media.addEventListener?.("change", applyTheme);

      return () => {
        media.removeListener?.(applyTheme);
        media.removeEventListener?.("change", applyTheme);
      };
    }
  }, [applyTheme, forcedTheme, paletteName]);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === storageKey) {
        mutate();
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [mutate, storageKey, applyTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      paletteName,
      setPaletteName,
      forcedTheme,
      themes: themes,
      favoritePalettes: theme.favoritePalettes
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
      const { colors }: { colors: Record<string, string> } = JSON.parse(
        localStorage.getItem(storageKey) || "{}"
      );

      if (colors) {
        Object.entries(colors).forEach(([k, v]) => {
          el.style.setProperty(k, v);
        });
      }
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const palette = JSON.parse(localStorage.getItem(storageKey) || "{}");
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
