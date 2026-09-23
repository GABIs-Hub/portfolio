"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "top", label: "Home" },
  { id: "work", label: "Selected work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

/** Tracks reading progress and provides shortcuts to the homepage sections. */
export function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const markerLine = window.scrollY + window.innerHeight * 0.34;
      let nextIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= markerLine) nextIndex = index;
      });
      if (window.scrollY >= maxScroll - 8) nextIndex = sections.length - 1;

      setProgress(Math.min(1, Math.max(0, nextProgress)));
      setActiveIndex(nextIndex);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav className="section-progress" aria-label="Page sections">
      <div className="section-progress-track" aria-hidden="true">
        <span className="section-progress-fill" style={{ height: `${progress * 100}%` }} />
      </div>
      <ol className="section-progress-list">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              className="section-progress-marker"
              type="button"
              aria-label={`Jump to ${section.label}`}
              aria-current={activeIndex === index ? "location" : undefined}
              data-active={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToSection(section.id)}
            >
              <span aria-hidden="true" />
              <span className="sr-only">{section.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
