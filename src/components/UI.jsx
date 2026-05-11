import React, { useState, useEffect, useRef } from "react";

export function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Glass({ children, accent = "#06b6d4", style = {}, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${accent}22`,
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Chip({ children, color = "#06b6d4" }) {
  return (
    <span
      style={{
        background: `${color}18`,
        border: `1px solid ${color}35`,
        color: color,
        borderRadius: "100px",
        padding: "0.2rem 0.7rem",
        fontSize: "0.73rem",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.03em",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ number, id }) {
  return (
    <span className="text-slate-500 font-mono text-sm tracking-widest">
      {number}. // {id}
    </span>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
      lineHeight: 1.08,
      color: "#f1f5f9",
      letterSpacing: "0.02em",
      margin: 0,
    }}>
      {children}
    </h2>
  );
}

export function BtnPrimary({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.85rem 2rem",
        borderRadius: "8px",
        border: "none",
        background: "#10b981",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: hov ? "0 0 30px rgba(16,185,129,0.5), inset 0 0 20px rgba(255,255,255,0.1)" : "0 0 15px rgba(16,185,129,0.3)",
        transform: hov ? "translateY(-4px) scale(1.05)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </button>
  );
}

export function BtnGhost({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.85rem 2rem",
        borderRadius: "8px",
        border: hov ? "2px solid #10b981" : "1.5px solid rgba(255,255,255,0.15)",
        background: hov ? "rgba(16,185,129,0.1)" : "transparent",
        color: hov ? "#10b981" : "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        cursor: "pointer",
        transform: hov ? "translateY(-4px) scale(1.03)" : "translateY(0)",
        boxShadow: hov ? "0 0 20px rgba(16,185,129,0.3)" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </button>
  );
}
