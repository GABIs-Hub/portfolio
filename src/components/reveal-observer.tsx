"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks `[data-reveal]` elements with `data-inview` as they enter the viewport.
 * The CSS transition is only enabled once `html[data-js]` is set, and elements
 * already on screen are marked before that, so nothing flashes on hydration.
 * With reduced motion or without JavaScript, content is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    const viewportHeight = window.innerHeight;
    const pending: HTMLElement[] = [];

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        element.dataset.inview = "";
      } else {
        pending.push(element);
      }
    }

    document.documentElement.dataset.js = "";

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.inview = "";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    pending.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
