import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { ExternalActionLink } from "@/components/external-action-link";
import { projects, siteConfig } from "@/lib/site";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: `${project.summary} Role: ${project.role}.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
      description: `${project.summary} Role: ${project.role}.`,
      url: `${siteConfig.url}/work/${project.slug}`,
      siteName: siteConfig.siteName,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} case study by ${siteConfig.name}`,
        },
      ],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="page-shell">
      <main id="main" className="work-page">
        <div className="wrap">
          <Link className="text-link work-back" href="/#work">
            <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
          </Link>

          <header className="work-header">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="work-summary">{project.summary}</p>
            <div className="work-meta">
              <span className="status" data-status={project.status}>
                {project.status}
              </span>
              <span>{project.role}</span>
            </div>
            <ul className="tag-list" aria-label="Technology">
              {project.stack.map((tag) => (
                <li className="tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="work-content">
            <section aria-labelledby="work-problem">
              <h2 id="work-problem">The problem</h2>
              <p>{project.problem}</p>
            </section>

            <section aria-labelledby="work-approach">
              <h2 id="work-approach">Engineering approach</h2>
              <ul>
                {project.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="work-impact">
              <h2 id="work-impact">Evidence and impact</h2>
              <ul>
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          {project.href ? (
            <ExternalActionLink className="button button-secondary" href={project.href} target="_blank" rel="noreferrer">
              View live site <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </ExternalActionLink>
          ) : null}

          <nav className="work-pagination" aria-label="Case study navigation">
            <Link className="work-pagination-link" href={`/work/${previousProject.slug}`}>
              <span className="eyebrow">Previous case study</span>
              <strong><ArrowLeft size={15} aria-hidden="true" /> {previousProject.title}</strong>
            </Link>
            <Link className="work-pagination-all" href="/#work">
              View all work
            </Link>
            <Link className="work-pagination-link work-pagination-next" href={`/work/${nextProject.slug}`}>
              <span className="eyebrow">Next case study</span>
              <strong>{nextProject.title} <ArrowRight size={15} aria-hidden="true" /></strong>
            </Link>
          </nav>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": `${siteConfig.url}/work/${project.slug}#case-study`,
              url: `${siteConfig.url}/work/${project.slug}`,
              name: project.title,
              description: project.summary,
              genre: project.category,
              keywords: project.stack.join(", "),
              author: {
                "@type": "Person",
                "@id": `${siteConfig.url}/#person`,
                name: siteConfig.name,
              },
              creator: {
                "@type": "Person",
                "@id": `${siteConfig.url}/#person`,
                name: siteConfig.name,
              },
            }),
          }}
        />
      </main>
    </div>
  );
}
