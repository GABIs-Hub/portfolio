"use client";

import { useEffect, useState } from "react";

const splashKey = "gabi-intro-seen";

export function IntroSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(splashKey)) return;
    window.sessionStorage.setItem(splashKey, "true");
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const hideTimer = window.setTimeout(() => setVisible(false), 420);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-splash" aria-hidden="true">
      <span className="intro-splash-mark">GABI</span>
      <span className="intro-splash-line" />
    </div>
  );
}
