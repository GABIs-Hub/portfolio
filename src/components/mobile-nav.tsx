"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import type { NavItem } from "@/lib/site";

type MobileNavProps = {
  items: NavItem[];
  cv: { href: string; fileName: string; label: string };
};

export function MobileNav({ items, cv }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = "mobile-navigation-panel";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleRef.current?.focus();
        setOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="mobile-nav" ref={rootRef}>
      <button
        type="button"
        className="icon-button"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <nav id={panelId} className="mobile-nav-panel" aria-label="Mobile navigation" hidden={!open}>
        {items.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          className="mobile-nav-cv"
          href={cv.href}
          download={cv.fileName}
          type="application/pdf"
          onClick={() => setOpen(false)}
        >
          {cv.label}
        </a>
      </nav>
    </div>
  );
}
