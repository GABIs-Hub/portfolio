"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, summary, label";
const FOLLOW = 0.16;
const HOVER_SCALE = 1.8;

/**
 * A single soft blob that trails the pointer, plus a small dot at the exact position.
 * Runs only on fine-pointer, hover-capable devices without a reduced-motion preference.
 * Uses transform-only updates in a requestAnimationFrame loop that stops when settled.
 */
export function CursorBlob() {
  const layerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    const layer = layerRef.current;
    const blob = blobRef.current;
    const dot = dotRef.current;

    if (!media.matches || !layer || !blob || !dot) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let started = false;

    const render = () => {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      scale += (targetScale - scale) * FOLLOW;

      blob.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const settled =
        Math.abs(targetX - x) < 0.2 &&
        Math.abs(targetY - y) < 0.2 &&
        Math.abs(targetScale - scale) < 0.005;

      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        x = targetX;
        y = targetY;
        layer.dataset.visible = "true";
      }

      const target = event.target instanceof Element ? event.target : null;
      targetScale = target?.closest(INTERACTIVE_SELECTOR) ? HOVER_SCALE : 1;
      schedule();
    };

    const onPointerLeave = () => {
      delete layer.dataset.visible;
      started = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <div ref={blobRef} className="cursor-blob" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
