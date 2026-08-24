import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import heroImage from "@/assets/hero.png";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import {
  capabilities,
  experience,
  highlights,
  proofPoints,
  projects,
  siteConfig,
  socials,
} from "@/lib/site";

export default function Home() {
  return (
    <main id="top" className="page-shell">
      <SiteHeader />

      <section className="section hero" aria-labelledby="hero-title">
        <div className="section-inner">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Available for frontend and mobile roles</p>
              <h1 id="hero-title">{siteConfig.name}</h1>
              <p>
                I build focused web and mobile products across React, Next.js, TypeScript,
                Flutter, Kotlin, Firebase, and Supabase. The work is practical: clear
                interfaces, structured code, and releases that can keep improving.
              </p>
              <div className="hero-actions">
                <Link className="button primary" href="#work">
                  View work <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <a className="button secondary" href={`mailto:${siteConfig.email}`}>
                  Contact me <Mail size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className="hero-visual" aria-label="Portfolio summary">
              <div className="hero-meta">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="meta-item" key={item.label}>
                      <span>{item.label}</span>
                      <span>
                        {Icon ? <Icon size={16} aria-hidden="true" /> : null}
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="portrait-frame">
                <Image
                  src={heroImage}
                  alt="Abstract workspace illustration for GABI's portfolio"
                  priority
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
            </aside>
          </div>

          <div className="proof-strip" aria-label="Technical focus areas">
            {proofPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section" aria-labelledby="work-title">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects with practical product constraints."
            description="The first release focuses on credible, inspectable work rather than inflated claims. Each project has a clear problem space and a realistic delivery path."
          />

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span className="status">{project.status}</span>
                  {project.href ? (
                    <a
                      className="project-link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <p>{project.impact}</p>
                <footer>
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section" aria-labelledby="capabilities-title">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Capabilities"
            title="A compact stack for shipping real products."
            description="The architecture keeps the portfolio maintainable now and leaves a clean path to Sanity content, server actions, analytics, and richer case studies later."
          />

          <div className="capability-grid">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article className="capability-card" key={capability.title}>
                  <span className="capability-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="section" aria-labelledby="experience-title">
        <div className="section-inner">
          <SectionHeading
            eyebrow="Experience"
            title="Learning in public, building with production standards."
            description="This timeline keeps the language grounded in what the current sources support."
          />

          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={`${item.role}-${item.period}`}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.role}</h3>
                  <strong>{item.organization}</strong>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="section-inner">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">Let us build something clear and useful.</h2>
              <p>
                The secure first-release contact path is direct email and social links.
                A server-side form can be added when the mail provider and environment
                variables are ready.
              </p>
              <div className="contact-actions">
                <a className="button primary" href={`mailto:${siteConfig.email}`}>
                  Email me <Mail size={18} aria-hidden="true" />
                </a>
                <a className="button secondary" href={siteConfig.repo} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="social-row" aria-label="Social links">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <Icon size={20} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Copyright 2026 {siteConfig.name}</span>
        <span>{siteConfig.email}</span>
      </footer>
    </main>
  );
}
