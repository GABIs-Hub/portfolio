"use client";

import { useEffect, useState } from "react";

const splashKey = "gabi-intro-seen";
const minimumDisplayMs = 260;
const fallbackReadyMs = 1600;
const exitAnimationMs = 420;

/** Covers the initial document while the page reaches a usable ready state. */
export function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let hasSeenSplash = false;
    try {
      hasSeenSplash = window.sessionStorage.getItem(splashKey) === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    if (hasSeenSplash) {
      return;
    }

    try {
      window.sessionStorage.setItem(splashKey, "true");
    } catch {
      // The fallback timer still guarantees that the splash cannot remain stuck.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let pageReady = document.readyState === "complete";
    let fontsReady = !document.fonts;
    let finished = false;

    const reveal = () => {
      if (finished || !pageReady || !fontsReady) return;
      finished = true;
      const remainingMinimum = reduceMotion
        ? 0
        : Math.max(0, minimumDisplayMs - (performance.now() - startedAt));

      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(() => setVisible(false), reduceMotion ? 1 : exitAnimationMs);
      }, remainingMinimum);
    };

    const markPageReady = () => {
      pageReady = true;
      reveal();
    };

    const markFontsReady = () => {
      fontsReady = true;
      reveal();
    };

    if (!pageReady) window.addEventListener("load", markPageReady, { once: true });
    if (document.fonts) {
      document.fonts.ready.then(markFontsReady);
    }

    const fallbackTimer = window.setTimeout(() => {
      pageReady = true;
      fontsReady = true;
      reveal();
    }, fallbackReadyMs);

    return () => {
      finished = true;
      window.removeEventListener("load", markPageReady);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-splash${exiting ? " is-exiting" : ""}`} aria-hidden="true">
      <span className="intro-splash-mark">GABI</span>
      <span className="intro-splash-line" />
    </div>
  );
}
