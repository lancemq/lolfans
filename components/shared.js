export function SectionTitle({ icon, title, subtitle }) {
  return (
    <>
      <h2 className="section-title">
        <span className="title-icon">{icon}</span>
        {title}
      </h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </>
  );
}

export function LoadingCard({ title, text }) {
  return (
    <section className="knowledge-card hero-empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
