import React from "react";

const CAT_ACCENT = {
  Mobile: "#06b6d4",
  Web: "#8b5cf6",
  Backend: "#10b981",
  Tools: "#f59e0b",
  Design: "#ec4899",
};

export function SkillBar({ name, level, category, inView, delay }) {
  const grad = {
    Mobile: "linear-gradient(90deg,#06b6d4,#8b5cf6)",
    Web: "linear-gradient(90deg,#8b5cf6,#ec4899)",
    Backend: "linear-gradient(90deg,#10b981,#06b6d4)",
    Tools: "linear-gradient(90deg,#f59e0b,#ef4444)",
    Design: "linear-gradient(90deg,#ec4899,#f59e0b)",
  }[category] || "linear-gradient(90deg,#06b6d4,#8b5cf6)";

  return (
    <div className="mb-4.5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 font-sans text-sm">
          {name}
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: CAT_ACCENT[category] }}
        >
          {level}%
        </span>
      </div>
      <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          style={{
            height: "100%",
            borderRadius: "100px",
            background: grad,
            width: inView ? `${level}%` : "0%",
            transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
