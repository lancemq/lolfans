import { SeoJsonLd } from './seo-jsonld';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '../lib/site-config';

export function StrategyArticlePage({ title, subtitle, path, kicker, splash, sections, prevLink, nextLink }) {
  const description = subtitle;
  return (
    <>
      <SeoJsonLd data={buildWebPageJsonLd({ title, description, path })} />
      <SeoJsonLd
        data={buildBreadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '攻略中心', path: '/strategy-center.html' },
          { name: title, path }
        ])}
      />
      <SiteHeader active="strategy-center" />
      <main className="hero-guide-page strategy-article-page">
        <div className="container">
          <header className="guide-hero-header guide-hero-header-rich hero-guide-rich-header">
            <div className="guide-hero-splash" style={{ backgroundImage: `url('${splash}')` }}></div>
            <div className="guide-hero-overlay"></div>
            <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
            <div className="guide-hero-info">
              <nav className="breadcrumb" aria-label="面包屑导航">
                <a href="/">首页</a>
                <span className="separator">/</span>
                <a href="/strategy-center.html">攻略中心</a>
                <span className="separator">/</span>
                <span className="current">{title}</span>
              </nav>
              <div className="guide-hero-grid">
                <div className="guide-hero-copy">
                  <span className="guide-kicker">{kicker}</span>
                  <h1 className="guide-hero-title">{title}</h1>
                  <p className="guide-hero-subtitle">{subtitle}</p>
                </div>
                <aside className="guide-hero-panel">
                  <span className="guide-panel-tag">阅读建议</span>
                  <ol className="guide-panel-list">
                    <li>先看框架，再记细节</li>
                    <li>把知识转成对局前 checklist</li>
                    <li>每次实战只重点改 1-2 个动作</li>
                  </ol>
                </aside>
              </div>
            </div>
          </header>

          {sections.map((section) => (
            <section className="guide-section" id={section.id} key={section.id}>
              <h2 className="section-title">
                <span className="title-icon">{section.icon || '◎'}</span>
                {section.title}
              </h2>
              {section.subtitle ? <p className="section-subtitle">{section.subtitle}</p> : null}
              <div className={`editorial-grid ${section.columns || 'editorial-grid-2'}`}>
                {section.cards.map((card) => (
                  <article className={card.variant || 'knowledge-card'} key={card.title}>
                    <h3>{card.title}</h3>
                    {card.text ? <p>{card.text}</p> : null}
                    {card.items ? (
                      <ul className={card.ordered ? 'ordered-list' : 'checklist'}>
                        {card.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {card.pills ? (
                      <div className="pill-list">
                        {card.pills.map((pill) => (
                          <span key={pill}>{pill}</span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="guide-section">
            <div className="related-links">
              {prevLink ? (
                <a href={prevLink.href} className="related-link-card">
                  <span className="related-icon">←</span>
                  <span>{prevLink.label}</span>
                </a>
              ) : null}
              <a href="/strategy-center.html" className="related-link-card">
                <span className="related-icon">📚</span>
                <span>返回攻略中心</span>
              </a>
              {nextLink ? (
                <a href={nextLink.href} className="related-link-card">
                  <span className="related-icon">→</span>
                  <span>{nextLink.label}</span>
                </a>
              ) : null}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
