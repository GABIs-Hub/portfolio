export type Theme = "dark" | "light";

/**
 * Dark is the established primary identity, so it is both the SSR default and
 * the fallback when the visitor has never made a choice.
 */
export const DEFAULT_THEME: Theme = "dark";

export const THEME_STORAGE_KEY = "gabi-theme";

/** Browser chrome colours, used for `theme-color` and kept in sync on switch. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0b0c0f",
  light: "#f6f4ef",
};

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Runs synchronously as the first node in `<body>`, before the rest of the
 * document is parsed and therefore before the first paint.
 *
 * Resolution order: explicit stored choice → system preference → dark. A stored
 * choice always wins, so the operating system never fights the switcher.
 * It only touches the `<html>` element, so React hydration is unaffected
 * (`suppressHydrationWarning` on `<html>` covers the attribute value).
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=window.localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
