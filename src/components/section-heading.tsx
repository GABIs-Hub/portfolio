type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

/** Renders a consistently styled heading and optional description for a page section. */
export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
