"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import {
  DEFAULT_THEME,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  isTheme,
  type Theme,
} from "@/lib/theme";

const PREFERS_LIGHT = "(prefers-color-scheme: light)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const TRANSITION_MS = 220;

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this session.
  }
}

/**
 * The `<html data-theme>` attribute set by the pre-paint script is the source of
 * truth, so the control reflects what is actually painted. `getServerSnapshot`
 * keeps the hydration render identical to the server markup.
 */
function getThemeSnapshot(): Theme {
  const current = document.documentElement.getAttribute("data-theme");
  return isTheme(current) ? current : DEFAULT_THEME;
}

function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}

function subscribeToTheme(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  const media = window.matchMedia(PREFERS_LIGHT);
  const onSystemChange = (event: MediaQueryListEvent) => {
    // A stored choice always wins, so the system is only followed until one is made.
    if (readStoredTheme()) return;
    document.documentElement.setAttribute("data-theme", event.matches ? "light" : "dark");
    notify();
  };

  media.addEventListener("change", onSystemChange);

  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onSystemChange);
  };
}

/** Keeps the mobile browser chrome in step with the active theme. */
function syncThemeColor(theme: Theme) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.removeAttribute("media");
    meta.setAttribute("content", THEME_COLORS[theme]);
  });
}

/**
 * Two-state theme control. The visible icon is driven by `data-theme` in CSS, so
 * the correct icon is painted before hydration and no client state is needed to
 * render it. Switching is client-side only: no reload, no layout shift.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => {
    syncThemeColor(theme);
  }, [theme]);

  useEffect(
    () => () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    },
    [],
  );

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "light" ? "Switch to light theme" : "Switch to dark theme";

  const switchTheme = () => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(REDUCED_MOTION).matches;

    if (!reduceMotion) {
      root.setAttribute("data-theme-switching", "");
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        root.removeAttribute("data-theme-switching");
        transitionTimer.current = null;
      }, TRANSITION_MS);
    }

    storeTheme(nextTheme);
    root.setAttribute("data-theme", nextTheme);
    notify();
  };

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={label}
      title={label}
      onClick={switchTheme}
    >
      <Sun className="theme-toggle-icon theme-toggle-sun" size={18} strokeWidth={1.75} aria-hidden="true" />
      <Moon className="theme-toggle-icon theme-toggle-moon" size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
