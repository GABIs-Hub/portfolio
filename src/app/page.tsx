import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
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

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div id="top" className="page-shell">
      <SiteHeader />

      <main id="main">
        <section className="section hero" aria-labelledby="hero-title">
          <div className="wrap">
            <p className="hero-intro" data-enter="0">
              <span className="status-dot" aria-hidden="true" />
              Open to mobile roles and freelance projects
            </p>

            <h1 id="hero-title" data-enter="1">
              <span className="hero-name">{siteConfig.name}</span>
              <span className="hero-role">{siteConfig.role}</span>
            </h1>

            <p className="hero-stack" data-enter="2">
              {siteConfig.tagline}
            </p>

            <p className="hero-lede" data-enter="3">
              I&apos;m Gabi. I build cross-platform mobile apps, currently a ledger app for small
              businesses and a budgeting app for students, and the web interfaces around them with
              React and Next.js. I care about clear screens, structured code, and releases that keep
              improving.
            </p>

            <div className="hero-actions" data-enter="4">
              <a className="button button-primary" href="#work">
                Selected work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href={cv.href}
                download={cv.fileName}
                type="application/pdf"
              >
                {cv.label} <Download size={16} aria-hidden="true" />
              </a>
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
              description="Four projects across mobile, web, and developer tooling. Each one states the problem, my role, and the engineering decisions behind it. Status is stated plainly."
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
                    {project.href ? (
                      <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                        View live site <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : null}
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
              title="A mobile developer who started on the web."
            />

            <div className="about-grid">
              <div className="about-copy" data-reveal>
                <p>
                  <strong>I&apos;m David, Gabi to most people.</strong> A software engineering student
                  and mobile developer based in Nigeria. I started with web interfaces in React, moved
                  into Flutter, and now spend most of my time building cross-platform apps.
                </p>
                <p>
                  The projects I enjoy most are practical tools with a clear job: a ledger for a small
                  business, a budget tracker shaped around a student&apos;s semester, an API that
                  explains a stack trace in plain English. I like taking something ambiguous and
                  turning it into a scoped release that can keep improving.
                </p>
                <p>
                  My approach is straightforward: typed data, clear state, screens that adapt to the
                  device they run on, and code another developer can pick up without a walkthrough.
                  Working across web and mobile means I can build the app and the interface around
                  it, and connect both to services like Firebase and Supabase.
                </p>
                <p>
                  Next on the path is native iOS. I&apos;m learning Swift and SwiftUI so that
                  &quot;cross-platform&quot; eventually covers every platform for real.
                </p>
              </div>

              <div data-reveal>
                <h3 className="subheading">Background</h3>
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
                <a className="button button-primary" href={emailHref}>
                  Email me <Mail size={16} aria-hidden="true" />
                </a>
                <a
                  className="button button-secondary"
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>

            <ul className="contact-list" aria-label="Contact details" data-reveal>
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    download={link.download}
                  >
                    <span>{link.label}</span>
                    <span>{link.value}</span>
                  </a>
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
    </div>
  );
}
