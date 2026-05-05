import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { name: "Flutter", level: 75, category: "Mobile" },
  { name: "React Native", level: 40, category: "Mobile" },
  { name: "Swift", level: 35, category: "Mobile" },
  { name: "Kotlin / Jetpack Compose", level: 65, category: "Mobile" },
  { name: "React", level: 80, category: "Web" },
  { name: "TypeScript", level: 75, category: "Web" },
  { name: "Tailwind CSS", level: 85, category: "Web" },
  { name: "Firebase", level: 70, category: "Backend" },
  { name: "Supabase", level: 60, category: "Backend" },
  { name: "Neon", level: 5, category: "Backend" },
  { name: "Node.js", level: 65, category: "Backend" },
  { name: "Git / GitHub", level: 82, category: "Tools" },
];

const PROJECTS = [
  {
    title: "DepSense API",
    desc: "A developer-focused tool with a Dependency Analyser (accepting package.json, pubspec.yaml, build.gradle) and an Error Decoder that translates stack traces into plain-English fixes.",
    tags: ["API", "Developer Tools", "Node.js"],
    accent: "#06b6d4",
    icon: "⬡",
    github: "#",
    live: "#",
  },
  {
    title: "BizLedger",
    desc: "Cross-platform business accounting and ledger management app built for small businesses — clean financial tracking with real-time insights across all devices.",
    tags: ["Flutter", "Mobile", "Finance"],
    accent: "#8b5cf6",
    icon: "◈",
    github: "#",
    live: "#",
  },
  {
    title: "Student Budget Tracker",
    desc: "University student expense tracker built in Flutter — tracks spending across restaurants and supermarkets with daily, weekly, monthly, and semester budget views plus analytics.",
    tags: ["Flutter", "Firebase", "Kotlin"],
    accent: "#f59e0b",
    icon: "◆",
    github: "#",
    live: "#",
  },
];

const EXPERIENCE = [
  {
    period: "2024 – Present",
    role: "Junior Mobile Developer",
    org: "Self-Directed / Freelance",
    desc: "Building cross-platform mobile apps with Flutter and React Native. Exploring Kotlin & Jetpack Compose for native Android — actively publishing projects to GitHub.",
    accent: "#06b6d4",
  },
  {
    period: "2024",
    role: "Frontend Developer",
    org: "NACOS DU",
    desc: "Built the Admin section of the NACOS DU Resource System — custom dashboard, navigation, and approval workflows using React, TypeScript, and Tailwind CSS.",
    accent: "#8b5cf6",
  },
  {
    period: "2023 – Present",
    role: "Software Engineering Student",
    org: "University",
    desc: "Studying SE fundamentals while shipping real-world projects in parallel. Coursework spans data structures, programming principles, system design, and software architecture.",
    accent: "#10b981",
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/GABIs-Hub", icon: FiGithub },
  { label: "LinkedIn", href: "www.linkedin.com/in/david-ogabi-b77a2a31a", icon: FiLinkedin },
  { label: "WhatsApp", href: "https://wa.me/2349027876679", icon: FaWhatsapp },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(words, speed = 85, pause = 1800) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        if (cIdx < word.length) { setText(word.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
        else { setTimeout(() => setDeleting(true), pause); }
      } else {
        if (cIdx > 0) { setText(word.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
        else { setDeleting(false); setWIdx(i => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, deleting, wIdx, words, speed, pause]);
  return text;
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(36px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Glass({ children, accent = "#06b6d4", style = {}, onMouseEnter, onMouseLeave }) {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${accent}22`,
      borderRadius: "12px",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Chip({ children, color = "#06b6d4" }) {
  return (
    <span style={{
      background: `${color}18`,
      border: `1px solid ${color}35`,
      color: color,
      borderRadius: "100px",
      padding: "0.2rem 0.7rem",
      fontSize: "0.73rem",
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.03em",
    }}>
      {children}
    </span>
  );
}

function SectionLabel({ number, id }) {
  return (
    <span style={{
      color: "#64748b",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.8rem",
      letterSpacing: "0.08em",
    }}>
      {number}. // {id}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Montaga', serif",
      fontWeight: 700,
      fontSize: "clamp(2rem, 5vw, 3rem)",
      color: "#f1f5f9",
      marginTop: "0.4rem",
      marginBottom: 0,
      letterSpacing: "0.02em",
    }}>
      {children}
    </h2>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const w = useWindowWidth();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(1rem, 5vw, 3rem)",
      background: scrolled ? "rgba(3,7,18,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition: "all 0.35s ease",
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Montaga', serif", fontWeight: 700, fontSize: "1.15rem",
        color: "#10b981",
        letterSpacing: "0.04em",
      }}>
        GABI
      </div>

      {/* Desktop links */}
      {w >= 768 && (
        <div style={{ display: "flex", gap: "2.2rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l.toLowerCase() ? "#10b981" : "#64748b",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem",
              fontWeight: 500, letterSpacing: "0.04em",
              transition: "color 0.22s",
              padding: 0,
            }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* Mobile hamburger */}
      {w < 768 && (
        <button onClick={() => setOpen(o => !o)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#e2e8f0", fontSize: "1.4rem", lineHeight: 1,
        }}>
          {open ? "✕" : "≡"}
        </button>
      )}

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "absolute", top: "64px", left: 0, right: 0,
          background: "rgba(3,7,18,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "1.5rem clamp(1rem,5vw,3rem)",
          display: "flex", flexDirection: "column", gap: "0.25rem",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#cbd5e1", fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem", textAlign: "left", padding: "0.65rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const typed = useTypewriter(
    ["Flutter Developer", "React Native Dev", "Mobile-First Builder", "Web Developer"],
    80, 1900
  );

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "0 clamp(1rem, 6vw, 5rem)",
    }}>
      {/* Grid background - removed */}

      {/* Ambient blobs - removed */}

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", paddingTop: "64px" }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: "100px", padding: "0.4rem 1.1rem",
          marginBottom: "1.8rem",
          animation: "fadeDown 0.7s ease both",
        }}>
          <span style={{
            display: "inline-block", width: "6px", height: "6px",
            borderRadius: "50%", background: "#10b981",
            boxShadow: "none",
          }} />
          <span style={{
            color: "#10b981", fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.78rem", letterSpacing: "0.05em",
          }}>
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Montaga', serif", fontWeight: 700,
          fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
          lineHeight: 1.08, marginBottom: "1rem",
          animation: "fadeUp 0.7s ease 0.15s both",
          letterSpacing: "0.02em",
        }}>
          <span style={{ color: "#f1f5f9" }}>Hey, I'm Gabi</span>
        </h1>

        {/* Typewriter */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(1rem, 2.8vw, 1.35rem)",
          marginBottom: "1.6rem", minHeight: "2rem",
          animation: "fadeUp 0.7s ease 0.3s both",
        }}>
          <span style={{ color: "#64748b" }}>{">"}</span>
          <span style={{ color: "#e2e8f0" }}>{typed}</span>
          <span style={{
            display: "inline-block", width: "2px", height: "1.15em",
            background: "#64748b", verticalAlign: "middle",
          }} />
        </div>

        {/* Bio */}
        <p style={{
          color: "#64748b", fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
          maxWidth: "560px", lineHeight: 1.78, marginBottom: "2.6rem",
          animation: "fadeUp 0.7s ease 0.45s both",
        }}>
          A CS student and junior mobile developer from Nigeria — crafting
          cross-platform apps with Flutter, React Native, and modern web tech.
          Building the future, one commit at a time.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          animation: "fadeUp 0.7s ease 0.6s both",
        }}>
          <BtnPrimary onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View My Work
          </BtnPrimary>
          <BtnGhost onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get In Touch
          </BtnGhost>
        </div>
      </div>

      {/* Scroll indicator - removed */}
    </section>
  );
}

function BtnPrimary({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.85rem 2rem", borderRadius: "8px", border: "none",
        background: "#10b981",
        color: "#fff", fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
        boxShadow: hov ? "0 0 20px rgba(16,185,129,0.3)" : "none",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}>
      {children}
    </button>
  );
}

function BtnGhost({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.85rem 2rem", borderRadius: "8px",
        border: hov ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.15)",
        background: "transparent",
        color: hov ? "#10b981" : "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
        transition: "all 0.25s ease",
      }}>
      {children}
    </button>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const cards = [
    { icon: "{ }", title: "The Developer", accent: "#06b6d4",
      body: "I'm David — Gabi to everyone who knows me. A CS student and junior mobile developer from Nigeria, obsessed with building cross-platform apps that feel truly native on every device." },
    { icon: "→", title: "The Journey", accent: "#8b5cf6",
      body: "My trajectory: Flutter → React Native → iOS. Started with web, moved into mobile, and I'm building toward shipping apps on every platform — including the App Store someday." },
    { icon: "◎", title: "The Goal", accent: "#10b981",
      body: "To become a world-class cross-platform developer. Clean code, great UX, scalable architecture — across mobile and web. No corners cut." },
  ];

  const stats = [
    { val: "5+", label: "Projects Built" },
    { val: "3+", label: "Frameworks" },
    { val: "2+", label: "Years Coding" },
    { val: "🇳🇬", label: "From Nigeria" },
  ];

  return (
    <section id="about" style={{ padding: "9rem clamp(1rem,6vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="01" id="about_me" />
          <SectionTitle>Who Am I?</SectionTitle>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <Glass accent={c.accent} style={{ padding: "2rem", height: "100%" }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800,
                  color: c.accent, marginBottom: "1rem",
                }}>
                  {c.icon}
                </div>
                <h3 style={{ color: "#f1f5f9", fontFamily: "'Montaga', serif", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                  {c.title}
                </h3>
                <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8, fontSize: "0.93rem" }}>
                  {c.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
            gap: "1rem", marginTop: "2rem",
          }}>
            {stats.map(s => (
              <Glass key={s.label} style={{ padding: "1.5rem", textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.9rem",
                  background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {s.val}
                </div>
                <div style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", marginTop: "0.2rem" }}>
                  {s.label}
                </div>
              </Glass>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const CAT_ACCENT = { Mobile: "#06b6d4", Web: "#8b5cf6", Backend: "#10b981", Tools: "#f59e0b" };

function SkillBar({ name, level, category, inView, delay }) {
  const grad = {
    Mobile: "linear-gradient(90deg,#06b6d4,#8b5cf6)",
    Web: "linear-gradient(90deg,#8b5cf6,#ec4899)",
    Backend: "linear-gradient(90deg,#10b981,#06b6d4)",
    Tools: "linear-gradient(90deg,#f59e0b,#ef4444)",
  }[category] || "linear-gradient(90deg,#06b6d4,#8b5cf6)";

  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
        <span style={{ color: "#cbd5e1", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem" }}>
          {name}
        </span>
        <span style={{ color: CAT_ACCENT[category], fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}>
          {level}%
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "5px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "100px",
          background: grad,
          width: inView ? `${level}%` : "0%",
          transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

function SkillsSection() {
  const [sRef, inView] = useInView(0.1);
  const categories = [...new Set(SKILLS.map(s => s.category))];

  return (
    <section id="skills" style={{
      padding: "9rem clamp(1rem,6vw,5rem)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="02" id="skills" />
          <SectionTitle>My Tech Stack</SectionTitle>
        </Reveal>

        <div ref={sRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))",
          gap: "1.5rem",
        }}>
          {categories.map((cat, ci) => (
            <Reveal key={cat} delay={ci * 100}>
              <Glass accent={CAT_ACCENT[cat]} style={{ padding: "2rem" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem",
        animation: "slideInLeft 0.6s ease both",
      }}>
        <div style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: CAT_ACCENT[cat],
        }} />
        <span style={{
          color: CAT_ACCENT[cat], fontFamily: "'Montaga', serif",
          fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em",
        }}>
          {cat.toUpperCase()}
        </span>
      </div>
                {SKILLS.filter(s => s.category === cat).map((sk, i) => (
                  <SkillBar key={sk.name} {...sk} inView={inView} delay={i * 140 + ci * 80} />
                ))}
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────

function EducationSection() {
  const education = [
    {
      school: "University",
      degree: "B.Sc Software Engineering",
      period: "2023 – Present",
      gpa: "3.8/4.0",
      accent: "#10b981",
      courses: ["Data Structures", "Algorithms", "System Design", "Software Architecture"],
    },
  ];

  return (
    <section id="education" style={{ padding: "9rem clamp(1rem,6vw,5rem)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="03" id="education" />
          <SectionTitle>Education</SectionTitle>
        </Reveal>

        <div style={{ display: "grid", gap: "2rem" }}>
          {education.map((edu, i) => (
            <Reveal key={i} delay={i * 100}>
              <Glass accent={edu.accent} style={{ padding: "2.5rem" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "start",
                  marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem",
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: "'Montaga', serif", fontWeight: 700, fontSize: "1.3rem",
                      color: "#f1f5f9", marginBottom: "0.3rem",
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{
                      color: "#64748b", fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                    }}>
                      {edu.school}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      color: edu.accent, fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem", marginBottom: "0.3rem",
                    }}>
                      {edu.period}
                    </div>
                    <div style={{
                      color: "#10b981", fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem", fontWeight: 600,
                    }}>
                      GPA: {edu.gpa}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "0.6rem",
                }}>
                  {edu.courses.map(course => (
                    <Chip key={course} color={edu.accent}>{course}</Chip>
                  ))}
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function ProjectCard({ p, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
      transition: `all 0.65s ease ${delay}ms`,
    }}>
      <Glass
        accent={p.accent}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "2rem",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
          height: "100%",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Icon */}
      <div style={{
        fontFamily: "'Montaga', serif", fontWeight: 700, fontSize: "1.6rem", color: p.accent,
        marginBottom: "1rem",
        animation: hov ? "float 1s ease-in-out infinite" : "none",
      }}>
        {p.icon}
      </div>

        <h3 style={{
          fontFamily: "'Montaga', serif", fontWeight: 700, fontSize: "1.15rem",
          color: "#f1f5f9", marginBottom: "0.6rem",
        }}>
          {p.title}
        </h3>

        <p style={{
          color: "#64748b", fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.5rem", flex: 1,
        }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {p.tags.map(t => <Chip key={t} color={p.accent}>{t}</Chip>)}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href={p.github} style={{
            color: "#64748b", fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = p.accent}
            onMouseLeave={e => e.target.style.color = "#64748b"}
          >
            GitHub →
          </a>
          <a href={p.live} style={{
            color: "#64748b", fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = p.accent}
            onMouseLeave={e => e.target.style.color = "#64748b"}
          >
            Live ↗
          </a>
        </div>
      </Glass>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "9rem clamp(1rem,6vw,5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="03" id="projects" />
          <SectionTitle>Things I've Built</SectionTitle>
        </Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
          gap: "1.5rem",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE / TIMELINE ────────────────────────────────────────────────────

function ExperienceSection() {
  const w = useWindowWidth();
  const isMobile = w < 720;

  return (
    <section id="experience" style={{
      padding: "9rem clamp(1rem,6vw,5rem)",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="04" id="experience" />
          <SectionTitle>My Journey</SectionTitle>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "50%", transform: "translateX(-50%)",
              top: 0, bottom: 0, width: "1px",
              background: "rgba(255,255,255,0.1)",
            }} />
          )}

          {EXPERIENCE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={i} delay={i * 130}>
                {isMobile ? (
                  /* Mobile: single column */
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
                        background: item.accent, boxShadow: `0 0 14px ${item.accent}`,
                        marginTop: "1.4rem",
                      }} />
                      {i < EXPERIENCE.length - 1 && (
                        <div style={{ flex: 1, width: "1px", background: `${item.accent}40`, marginTop: "6px" }} />
                      )}
                    </div>
                    <Glass accent={item.accent} style={{ padding: "1.4rem", flex: 1, marginBottom: 0 }}>
                      <TimelineContent item={item} />
                    </Glass>
                  </div>
                ) : (
                  /* Desktop: alternating */
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "0", marginBottom: "2.5rem", alignItems: "center",
                  }}>
                    {isLeft ? (
                      <>
                        <div style={{ paddingRight: "3rem", textAlign: "right" }}>
                          <div style={{ display: "inline-block", maxWidth: "320px", textAlign: "left" }}>
                            <Glass accent={item.accent} style={{ padding: "1.5rem" }}>
                              <TimelineContent item={item} />
                            </Glass>
                          </div>
                        </div>
                        <div style={{ paddingLeft: "3rem", display: "flex", alignItems: "center" }}>
                          <div style={{
                            width: "12px", height: "12px", borderRadius: "50%",
                            background: item.accent,
                            marginLeft: "-6px",
                          }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ paddingRight: "3rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                          <div style={{
                            width: "12px", height: "12px", borderRadius: "50%",
                            background: item.accent,
                            marginRight: "-6px",
                          }} />
                        </div>
                        <div style={{ paddingLeft: "3rem" }}>
                          <div style={{ maxWidth: "320px" }}>
                            <Glass accent={item.accent} style={{ padding: "1.5rem" }}>
                              <TimelineContent item={item} />
                            </Glass>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineContent({ item }) {
  return (
    <>
      <div style={{ color: item.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", marginBottom: "0.4rem" }}>
        {item.period}
      </div>
      <div style={{ color: "#f1f5f9", fontFamily: "'Montaga', serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>
        {item.role}
      </div>
      <div style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", marginBottom: "0.7rem" }}>
        {item.org}
      </div>
      <p style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.65 }}>
        {item.desc}
      </p>
    </>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    emailjs.send(
      "service_3eiehja",
      "template_cyjeja4",
      {
        to_email: "ogabidavid16@gmail.com",
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      }
    ).then(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4500);
    }).catch((err) => {
      console.error("Email send failed:", err);
      setLoading(false);
      alert("Failed to send message. Please try again.");
    });
  };

  const inp = (field) => ({
    value: form[field],
    onChange: set(field),
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
    style: {
      width: "100%", boxSizing: "border-box",
      padding: "0.85rem 1rem", borderRadius: "8px",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${focused === field ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.08)"}`,
      color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.93rem",
      outline: "none", resize: "none",
      boxShadow: focused === field ? "0 0 0 3px rgba(6,182,212,0.08)" : "none",
      transition: "border-color 0.22s, box-shadow 0.22s",
    },
  });

  return (
    <section id="contact" style={{ padding: "9rem clamp(1rem,6vw,5rem)" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel number="05" id="contact" />
          <SectionTitle>Get In Touch</SectionTitle>
          <p style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif", marginTop: "0.8rem", fontSize: "0.95rem" }}>
            Have a project in mind or just want to connect? Drop me a message.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <Glass style={{ padding: "clamp(1.5rem,5vw,2.5rem)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input {...inp("name")} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input {...inp("email")} placeholder="you@example.com" />
              </div>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Message</label>
              <textarea {...inp("message")} rows={5} placeholder="Let's build something great together..." />
            </div>

            <button onClick={submit} disabled={loading || sent} style={{
              width: "100%", padding: "0.9rem", borderRadius: "8px", border: "none",
              background: sent
                ? "#10b981"
                : "#10b981",
              color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: "1rem", cursor: loading || sent ? "default" : "pointer",
              transition: "all 0.3s ease",
              opacity: loading ? 0.75 : 1,
              letterSpacing: "0.02em",
            }}>
              {sent ? "✓ Message Sent!" : loading ? "Sending..." : "Send Message →"}
            </button>
          </Glass>
        </Reveal>

        {/* Socials */}
        <Reveal delay={200}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2.5rem" }}>
            {SOCIALS.map(s => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                  color: "#475569",
                  fontSize: "1.4rem", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "color 0.22s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#10b981"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const labelStyle = {
  display: "block", color: "#64748b",
  fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
  marginBottom: "0.45rem", letterSpacing: "0.02em",
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.045)",
      padding: "2rem clamp(1rem,6vw,5rem)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
    }}>
      <p style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}>
        © 2026 GABI's WORKSPACE. All rights reserved.
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    /* Load fonts */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Montaga&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    /* Initialize EmailJS */
    emailjs.init("YOUR_PUBLIC_KEY_HERE");

    /* Track active section */
    const handler = () => {
      const ids = NAV_LINKS.map(l => l.toLowerCase());
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "#030712", color: "#f1f5f9", minHeight: "100vh" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#030712;}
        ::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:3px;}

        @keyframes fadeDown{from{opacity:0;transform:translateY(-18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.95);}to{opacity:1;transform:scale(1);}}
        @keyframes shimmer{0%{background-position:-1000px 0;}100%{background-position:1000px 0;}}
        @keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-8px);}}
      `}</style>

      <Navbar active={active} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
