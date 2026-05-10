import React, { useState, useEffect } from "react";

const TIMEZONES = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
  "Asia/Tokyo", "Asia/Shanghai", "Asia/Hong_Kong", "Asia/Dubai", "Asia/Kolkata",
  "Australia/Sydney", "Australia/Melbourne", "Pacific/Auckland",
  "Africa/Lagos", "Africa/Cairo", "Africa/Johannesburg",
  "America/Sao_Paulo", "America/Buenos_Aires",
];

export function Clock() {
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#64748b",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.85rem",
          padding: "0.5rem 0.8rem",
          borderRadius: "6px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#e2e8f0";
          e.target.style.background = "rgba(16,185,129,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#64748b";
          e.target.style.background = "none";
        }}
      >
        {time}
      </button>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "0.5rem",
            background: "rgba(3,7,18,0.98)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "8px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1001,
            minWidth: "200px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {TIMEZONES.map((tz) => (
            <button
              key={tz}
              onClick={() => {
                setTimezone(tz);
                setShowDropdown(false);
              }}
              style={{
                width: "100%",
                background: timezone === tz ? "rgba(16,185,129,0.2)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: timezone === tz ? "#10b981" : "#cbd5e1",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                padding: "0.7rem 1rem",
                textAlign: "left",
                transition: "all 0.2s ease",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(16,185,129,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = timezone === tz ? "rgba(16,185,129,0.2)" : "transparent")
              }
            >
              {tz}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ComingSoonModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(3,7,18,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "16px",
              padding: "2.5rem",
              maxWidth: "400px",
              textAlign: "center",
              animation: "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#10b981",
                marginBottom: "1rem",
              }}
            >
              🚀 Coming Soon
            </div>
            <p
              style={{
                color: "#cbd5e1",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              This project is still in progress and will be live very soon! Stay tuned for updates.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                background: "#10b981",
                border: "none",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 0 20px rgba(16,185,129,0.4)")
              }
              onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
