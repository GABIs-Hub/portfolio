import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { SectionProgress } from "@/components/section-progress";
import { SiteHeader } from "@/components/site-header";
import { ExternalActionLink } from "@/components/external-action-link";
import {
  capabilities,
  contactLinks,
  cv,
  emailHref,
  experience,
  heroFacts,
  learning,
  projects,
  siteConfig,
  skillGroups,
  socials,
} from "@/lib/site";

const proofPoints = [
  "Flutter · Dart · Kotlin",
  "React · Next.js · TypeScript",
  "Firebase · Supabase · Node.js",
  "Git · GitHub · Android Studio",
];

/** Renders the portfolio homepage and its primary content sections. */
export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="page-shell">
      <SiteHeader />
      <SectionProgress />

      <main id="main">
        <section id="top" className="section hero" aria-labelledby="hero-title">
          <div className="wrap">
            <p className="hero-intro" data-enter="0">
              <span className="status-dot" aria-hidden="true" />
              Open to software engineering, mobile, and full-stack opportunities
            </p>

            <h1 id="hero-title" data-enter="1">
              <span className="hero-name">{siteConfig.name}</span>
              <span className="hero-role">{siteConfig.role}</span>
            </h1>

            <p className="hero-stack" data-enter="2">
              {siteConfig.tagline}
            </p>

            <p className="hero-lede" data-enter="3">
              I&apos;m Gabi, a software engineering student building Flutter mobile products and
              full-stack applications with React, Next.js, TypeScript, and PostgreSQL. I move from
              product context and architecture through UI implementation, integration, testing, and
              deployment.
            </p>

            <div className="hero-actions" data-enter="4">
              <a className="button button-primary" href="#work">
                Selected work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <ExternalActionLink
                className="button button-secondary"
                href={cv.href}
                download={cv.fileName}
                type="application/pdf"
                pendingLabel="Preparing…"
              >
                {cv.label} <Download size={16} aria-hidden="true" />
              </ExternalActionLink>
              <a className="text-link hero-email" href={emailHref}>
                Email me <Mail size={16} aria-hidden="true" />
              </a>
            </div>

            <dl className="hero-facts" data-enter="5">
              {heroFacts.map((fact) => (
                <div className="hero-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="wrap">
            <SectionHeading
              id="work-title"
              eyebrow="Selected work"
              title="Projects, written up as case studies."
              description={`${projects.length} projects across mobile, web, and developer tooling. Each one states the problem, my role, and the engineering decisions behind it. Status is stated plainly.`}
            />

            <div className="case-list">
              {projects.map((project, index) => (
                <article
                  className="case-study"
                  key={project.slug}
                  id={project.slug}
                  aria-labelledby={`${project.slug}-title`}
                  data-reveal
                >
                  <div className="case-meta">
                    <span className="case-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 id={`${project.slug}-title`}>{project.title}</h3>
                      <p className="case-category">{project.category}</p>
                    </div>
                    <span className="status" data-status={project.status}>
                      {project.status}
                    </span>
                    <ul className="tag-list" aria-label="Technology">
                      {project.stack.map((tag) => (
                        <li className="tag" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-body">
                    <p className="case-summary">{project.summary}</p>
                    <dl className="case-details">
                      <div>
                        <dt>Problem</dt>
                        <dd>{project.problem}</dd>
                      </div>
                      <div>
                        <dt>Role</dt>
                        <dd>{project.role}</dd>
                      </div>
                      <div className="case-notes">
                        <dt>Engineering notes</dt>
                        <dd>
                          <ul>
                            {project.notes.map((note) => (
                              <li key={note}>{note}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                    <div className="case-links">
                      <Link className="text-link" href={`/work/${project.slug}`}>
                        Read case study <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      {project.href ? (
                        <ExternalActionLink className="text-link" href={project.href} target="_blank" rel="noreferrer">
                          View live site <ArrowUpRight size={16} aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </ExternalActionLink>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="wrap">
            <SectionHeading
              id="about-title"
              eyebrow="About"
              title="Flutter-first engineering across the product lifecycle."
            />

            <div className="about-grid">
              <div className="about-copy" data-reveal>
                <p className="about-lead">
                  <strong>Who I am:</strong> I&apos;m David, Gabi to most people — a software
                  engineering student and mobile developer based in Nigeria.
                </p>
                <p>
                  <strong>What I specialize in:</strong> Flutter and Dart for cross-platform mobile
                  products, supported by React, Next.js, TypeScript, and PostgreSQL when the product
                  needs a web interface or full-stack foundation.
                </p>
                <p>
                  <strong>What I have built:</strong> practical tools with a clear job, including a
                  business ledger, a semester-focused budget tracker, full-stack sales systems, and
                  brand tooling. My experience spans UI engineering, backend/API integration,
                  authentication, database migrations, and deployment.
                </p>
                <p>
                  <strong>How I approach engineering:</strong> I move from product context and
                  architecture to typed data, clear state, responsive screens, testing, and a release
                  another developer can continue without a walkthrough. I value Feature-First and
                  Clean Architecture when they make the system easier to evolve.
                </p>
                <p>
                  <strong>Where I&apos;m heading:</strong> deeper mobile engineering, native iOS with
                  Swift and SwiftUI, and product teams where thoughtful implementation matters as much
                  as shipping.
                </p>
              </div>

              <div data-reveal>
                <h3 className="subheading">Background</h3>
                <div className="about-evidence" aria-label="Experience evidence">
                  <p><strong>15+ production UI components</strong><span>Delivered through interface work and reusable frontend systems.</span></p>
                  <p><strong>200+ student users</strong><span>Supported by a student election platform built in a collaborative team.</span></p>
                  <p><strong>5+ client projects</strong><span>Covered from requirements and implementation through live deployment.</span></p>
                </div>
                <ol className="timeline">
                  {experience.map((item) => (
                    <li className="timeline-item" key={`${item.role}-${item.period}`}>
                      <span className="timeline-period">{item.period}</span>
                      <div>
                        <h4>{item.role}</h4>
                        <p className="timeline-org">{item.organization}</p>
                        <ul>
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-title">
          <div className="wrap">
            <SectionHeading
              id="skills-title"
              eyebrow="Skills"
              title="Mobile first, web alongside."
              description="Organised by where I use them. The mobile column is where most of my current work happens."
            />

            <div className="skills-grid" data-reveal>
              {skillGroups.map((group) => (
                <div
                  className="skill-group"
                  key={group.title}
                  data-primary={group.primary ? "" : undefined}
                >
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="learning-note" data-reveal>
              <strong>Currently learning:</strong> {learning.join(", ")}.
            </p>
          </div>
        </section>

        <section id="capabilities" className="section" aria-labelledby="capabilities-title">
          <div className="wrap">
            <SectionHeading
              id="capabilities-title"
              eyebrow="Capabilities"
              title="What I can help with."
            />

            <div className="capability-grid">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <article className="capability" key={capability.title} data-reveal>
                    <Icon className="capability-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="wrap contact-panel">
            <div data-reveal>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">Have a mobile product in mind? Let&apos;s talk.</h2>
              <p className="contact-copy">
                Email is the quickest way to reach me. Tell me what you&apos;re building, or the role
                you&apos;re hiring for, and I&apos;ll get back to you.
              </p>
              <div className="contact-actions">
                <ExternalActionLink className="button button-primary" href={emailHref}>
                  Email me <Mail size={16} aria-hidden="true" />
                </ExternalActionLink>
                <ExternalActionLink
                  className="button button-secondary"
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ExternalActionLink>
              </div>
            </div>

            <ul className="contact-list" aria-label="Contact details" data-reveal>
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <ExternalActionLink
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    download={link.download}
                    pendingLabel={link.download ? "Preparing…" : "Opening…"}
                  >
                    <span>{link.label}</span>
                    <span>{link.value}</span>
                  </ExternalActionLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>
            &copy; {year} {siteConfig.name}. {siteConfig.siteName}.
          </p>
          <nav className="footer-links" aria-label="Social links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </nav>
          <a className="footer-top" href="#top">
            Back to top
          </a>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${siteConfig.url}/#website`,
                url: siteConfig.url,
                name: siteConfig.siteName,
                description: siteConfig.description,
                inLanguage: "en",
              },
              {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/#webpage`,
                url: siteConfig.url,
                name: siteConfig.title,
                description: siteConfig.description,
                isPartOf: { "@id": `${siteConfig.url}/#website` },
                about: { "@id": `${siteConfig.url}/#person` },
                inLanguage: "en",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
