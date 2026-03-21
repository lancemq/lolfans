'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function normalize(text = '') {
  return String(text).toLowerCase().trim();
}

function includesQuery(parts, query) {
  const q = normalize(query);
  if (!q) return true;
  return parts.some((part) => normalize(part).includes(q));
}

export function SearchPageClient({ heroes = [], resources = [], updatedAt = '' }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const heroResults = useMemo(() => {
    return heroes
      .filter((hero) =>
        includesQuery(
          [hero.name, hero.title, ...(hero.roles || []), hero.difficulty, hero.lore],
          query
        )
      )
      .slice(0, 24);
  }, [heroes, query]);

  const resourceResults = useMemo(() => {
    return resources.filter((item) => includesQuery([item.title, item.description, ...(item.keywords || [])], query));
  }, [resources, query]);

  return (
    <div className="search-page-stack">
      <header className="guide-hero-header guide-hero-header-rich hero-guide-rich-header">
        <div
          className="guide-hero-splash"
          style={{ backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg')" }}
        ></div>
        <div className="guide-hero-overlay"></div>
        <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
        <div className="guide-hero-info">
          <nav className="breadcrumb" aria-label="面包屑导航">
            <a href="/">首页</a>
            <span className="separator">/</span>
            <span className="current">全站搜索</span>
          </nav>
          <div className="guide-hero-grid">
            <div className="guide-hero-copy">
              <span className="guide-kicker">Search Atlas</span>
              <h1 className="guide-hero-title">全站搜索</h1>
              <p className="guide-hero-subtitle">快速搜索英雄、专题、训练内容与站内核心资料页。</p>
            </div>
            <aside className="guide-hero-panel">
              <span className="guide-panel-tag">当前索引</span>
              <ol className="guide-panel-list">
                <li>{heroes.length} 位英雄</li>
                <li>{resources.length} 个核心内容入口</li>
                <li>{updatedAt ? `最近同步：${updatedAt}` : '最近同步：站内最新版本'}</li>
              </ol>
            </aside>
          </div>
        </div>
      </header>

      <section className="guide-section">
        <div className="search-box search-box-wide">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索英雄名称、定位、专题关键词..."
            aria-label="全站搜索"
          />
          <button className="search-btn" type="button" aria-label="搜索站内内容">
            🔍
          </button>
        </div>
      </section>

      <section className="guide-section">
        <h2 className="section-title">
          <span className="title-icon">🏆</span>
          英雄结果
        </h2>
        <p className="section-subtitle">优先按英雄名称、称号、定位和背景摘要匹配。</p>
        <div className="champions-grid detail-related-grid">
          {heroResults.map((hero) => (
            <a className="champion-card detail-related-card" href={`/hero-detail.html?id=${hero.id}`} key={hero.id}>
              <div className="champion-info">
                <h3 className="champion-name">{hero.name}</h3>
                <p className="champion-title">{hero.title}</p>
                <div className="champion-roles">
                  {(hero.roles || []).slice(0, 2).map((role) => (
                    <span className="role-tag" key={role}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <h2 className="section-title">
          <span className="title-icon">📚</span>
          专题与资料页
        </h2>
        <p className="section-subtitle">搜索训练模板、阵容搭配、运营路线和站内关键入口。</p>
        <div className="editorial-grid editorial-grid-2">
          {resourceResults.map((item) => (
            <a className="related-link-card search-result-card" href={item.href} key={item.href}>
              <span className="related-icon">{item.icon}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
