'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getChampionLoadingUrl,
  getChampionSplashUrl,
  getDifficultyClass,
  getRoleClass,
  getRolePreset,
  resolveChampionPayload,
  summarizeText
} from '../lib/champion-data';

function LoadingCard({ title, text }) {
  return (
    <section className="knowledge-card hero-empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

export function HeroDetailClient({ initialHeroes = [], siteMeta = null }) {
  const searchParams = useSearchParams();
  const heroId = searchParams.get('id') || 'yasuo';
  const [state, setState] = useState({ loading: true, hero: null, catalog: [], version: '14.1.1' });
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, loading: true }));
      const payload = await resolveChampionPayload(heroId, initialHeroes);
      if (!cancelled) {
        setState({ loading: false, ...payload });
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [heroId, initialHeroes]);

  useEffect(() => {
    setSelectedSkinIndex(0);
  }, [state.hero?.id]);

  const hero = state.hero;
  const version = state.version;
  const activeSkin = hero?.skins?.[selectedSkinIndex] || hero?.skins?.[0] || null;
  const activeSkinNum = activeSkin?.imageNum ?? 0;
  const preset = hero ? getRolePreset(hero.roles) : null;

  const relatedHeroes = useMemo(() => {
    if (!hero) return [];
    return (state.catalog || [])
      .filter((item) => item.id !== hero.id && item.roles.some((role) => hero.roles.includes(role)))
      .slice(0, 4);
  }, [hero, state.catalog]);

  function filterMainSkins(skins) {
    if (!skins || skins.length === 0) return [];
    const seen = new Set();
    return skins.filter((skin) => {
      const base = skin.name.replace(/[\s　][\s\S]*$/, '');
      if (seen.has(base)) return false;
      seen.add(base);
      return true;
    });
  }

  if (state.loading) {
    return <LoadingCard title="加载英雄详情中" text="正在整理英雄资料、技能与皮肤信息。" />;
  }

  if (!hero) {
    return <LoadingCard title="未找到对应英雄" text="请从英雄列表或攻略中心重新进入，或检查链接参数是否正确。" />;
  }

  return (
    <div className="detail-page-stack">
      <header className="champion-header detail-hero-header">
        <div className="champion-avatar detail-hero-portrait">
          <img
            className="champion-avatar-img"
            src={getChampionLoadingUrl(version, hero, 0)}
            alt={`${hero.name} 英雄立绘`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${hero.ddKey || hero.id}.png`;
            }}
          />
        </div>
        <div className="champion-meta detail-hero-meta">
          <span className="detail-kicker">Champion Dossier</span>
          <h1>{hero.name}</h1>
          <p className="title">{hero.title}</p>
          <div className="champion-roles detail-role-row">
            {hero.roles.map((role) => (
              <span className={`role-tag ${getRoleClass(role)}`} key={role}>
                {role}
              </span>
            ))}
            <span className={`difficulty ${getDifficultyClass(hero.difficulty)}`}>{hero.difficulty}</span>
          </div>
          <p className="lore detail-intro">{summarizeText(hero.lore, 140)}</p>
          {hero.quote ? <blockquote className="detail-inline-quote">“{hero.quote}”</blockquote> : null}
        </div>
      </header>

      <section className="detail-summary-grid">
        <article className="detail-summary-card">
          <span className="detail-summary-label">主定位</span>
          <strong>{hero.roles.join(' / ')}</strong>
          <p>优先明确分路职责，再决定自己是要打线权、节奏还是团战收尾。</p>
        </article>
        <article className="detail-summary-card">
          <span className="detail-summary-label">学习重点</span>
          <strong>{preset?.focus || '对线与资源节奏'}</strong>
          <p>{preset?.intro || '先把兵线、换血和团战进场次序练稳，再追求操作上限。'}</p>
        </article>
        <article className="detail-summary-card">
          <span className="detail-summary-label">资料来源</span>
          <strong>本地资料 + 官方 Data Dragon</strong>
          <p>
            皮肤与技能图标优先使用官方资源，玩法结构保留长期稳定的训练价值。
            {siteMeta?.championUpdatedAt ? ` 最近同步：${siteMeta.championUpdatedAt}。` : ''}
          </p>
        </article>
      </section>

      <section className="lore-section detail-lore-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Lore & Identity</p>
            <h2 className="section-title">背景故事</h2>
          </div>
          <p className="section-subtitle">先理解英雄在世界观中的位置，也更容易记住其技能风格与战斗气质。</p>
        </div>
        <div className="detail-lore-grid">
          <div className="lore-content">
            <div className="lore-text">
              {hero.lore
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
          </div>
          <aside className="detail-side-card">
            <h3>阅读提示</h3>
            <ul className="checklist">
              <li>看英雄故事时，可以顺手理解其定位与技能表达为什么会这样设计。</li>
              <li>如果你主要是为了上手玩法，优先看下方技能、出装和对局建议。</li>
              <li>对线和团战思路通常比单一数值更值得长期记住。</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="abilities-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Abilities</p>
            <h2 className="section-title">技能介绍</h2>
          </div>
          <p className="section-subtitle">先看技能功能，再记冷却与消耗，实战里会更容易知道什么时候该出手。</p>
        </div>
        <div className="abilities-list">
          {[
            ['被动', 'passive'],
            ['Q', 'q'],
            ['W', 'w'],
            ['E', 'e'],
            ['R', 'r']
          ]
            .map(([label, key]) => {
              const ability = hero.abilities?.[key];
              if (!ability) return null;
              const icon = hero.abilityIcons?.[key] || null;
              return (
                <article className="ability-item" key={key}>
                  <div className="ability-icon">
                    {icon ? <img src={icon} alt={`${hero.name} ${ability.name} 图标`} /> : <span className="ability-key-fallback">{label}</span>}
                    <span className="ability-key-overlay">{label}</span>
                  </div>
                  <div className="ability-info">
                    <h3>{ability.name}</h3>
                    <p>{ability.description}</p>
                    <div className="ability-stats">
                      {ability.cooldown ? <span className="ability-stat-cd">冷却: {ability.cooldown}</span> : null}
                      {ability.mana ? <span className="ability-stat-mana">消耗: {ability.mana}</span> : null}
                    </div>
                  </div>
                </article>
              );
            })
            .filter(Boolean)}
        </div>
      </section>

      <section className="playstyle-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Game Plan</p>
            <h2 className="section-title">玩法攻略</h2>
          </div>
          <p className="section-subtitle">把对线、中期和后期拆开理解，比记一段笼统“玩法介绍”更有用。</p>
        </div>
        <div className="playstyle-grid">
          <article className="playstyle-card">
            <div className="phase-icon">🌅</div>
            <h3>前期对线</h3>
            <p>{hero.playstyle?.early}</p>
          </article>
          <article className="playstyle-card">
            <div className="phase-icon">🌇</div>
            <h3>中期转线</h3>
            <p>{hero.playstyle?.mid}</p>
          </article>
          <article className="playstyle-card">
            <div className="phase-icon">🌙</div>
            <h3>后期团战</h3>
            <p>{hero.playstyle?.late}</p>
          </article>
        </div>
      </section>

      <section className="builds-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Build Path</p>
            <h2 className="section-title">出装推荐</h2>
          </div>
          <p className="section-subtitle">先有通用主线，再根据敌方伤害结构和节奏决定防装、穿透或容错件。</p>
        </div>
        <div className="builds-container">
          <article className="build-category">
            <h3>核心装备</h3>
            <div className="items-grid">
              {(hero.builds?.core || []).map((item) => (
                <span className="item-card" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="build-category">
            <h3>情境选择</h3>
            <div className="items-grid">
              {(hero.builds?.situational || []).map((item) => (
                <span className="item-card" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="runes-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Runes</p>
            <h2 className="section-title">符文推荐</h2>
          </div>
          <p className="section-subtitle">符文不只是“照抄”，重点是理解主系给你什么战斗节奏，副系弥补什么短板。</p>
        </div>
        <div className="runes-display">
          <article className="rune-tree">
            <h3>主系</h3>
            <div className="rune-keystone">{hero.runes?.primary} · {hero.runes?.keystone}</div>
          </article>
          <article className="rune-tree">
            <h3>副系</h3>
            <div className="rune-secondary">{hero.runes?.secondary}</div>
          </article>
          <article className="rune-tree">
            <h3>选择原则</h3>
            <div className="rune-secondary">均势优先稳定收益，逆风优先续航与容错，顺风再拉满压制。</div>
          </article>
        </div>
      </section>

      <section className="skins-section">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Skin Gallery</p>
            <h2 className="section-title">皮肤展示</h2>
          </div>
          <p className="section-subtitle">皮肤图片使用官方高清资源，左侧查看大图，右侧快速切换不同造型。</p>
        </div>
        <div className="skins-showcase">
          <div className="skin-detail-panel">
            <div className="skin-preview">
              <div className="skin-image-large">
                <img
                  className="skin-image-large-img"
                  src={getChampionSplashUrl(version, hero, activeSkinNum)}
                  alt={`${hero.name} ${activeSkin?.name || '默认皮肤'}`}
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = getChampionLoadingUrl(version, hero, activeSkinNum);
                      e.target.src = e.target.dataset.fallback;
                    }
                  }}
                />
              </div>
            </div>
            <div className="skin-info">
              <h3>{activeSkin?.name || `${hero.name} 经典皮肤`}</h3>
              <div className="skin-meta">
                <span className="skin-tier">{activeSkin?.tier || '经典'}</span>
                <span className="skin-price">{activeSkin?.price || '免费'}</span>
              </div>
              <p className="skin-description">
                {activeSkin?.description || '英雄的默认视觉方案。'}
              </p>
            </div>
          </div>
          <div className="skins-gallery">
            {(filterMainSkins(hero.skins) || []).map((skin, index) => (
              <button
                className={`skin-card ${hero.skins.indexOf(skin) === selectedSkinIndex ? 'active' : ''}`}
                data-index={hero.skins.indexOf(skin)}
                key={skin.id || `${hero.id}-skin-${index}`}
                onClick={() => setSelectedSkinIndex(hero.skins.indexOf(skin))}
                type="button"
              >
                <div className="skin-thumbnail">
                  <img
                    className="skin-thumbnail-img"
                    src={getChampionLoadingUrl(version, hero, skin.imageNum ?? index)}
                    alt={`${hero.name} ${skin.name} 缩略图`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="skin-card-info">
                  <div className="skin-card-name">{skin.name}</div>
                  <span className="skin-card-tier">{skin.tier}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="related-champions">
        <div className="detail-section-head">
          <div>
            <p className="strategy-section-kicker">Related Picks</p>
            <h2 className="section-title">相似英雄</h2>
          </div>
          <p className="section-subtitle">如果你想扩英雄池，优先从同定位或相近打法的英雄开始最省成本。</p>
        </div>
        <div className="champions-grid detail-related-grid">
          {relatedHeroes.map((item) => (
            <a className="champion-card detail-related-card" href={`/hero-detail.html?id=${item.id}`} key={item.id}>
              <div className="champion-image">
                <img
                  className="champion-image-img"
                  src={getChampionLoadingUrl(version, item, 0)}
                  alt={`${item.name} 英雄立绘`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.ddKey || item.id}.png`;
                  }}
                />
              </div>
              <div className="champion-info">
                <h3 className="champion-name">{item.name}</h3>
                <p className="champion-title">{item.title}</p>
                <div className="champion-roles">
                  {item.roles.slice(0, 2).map((role) => (
                    <span className={`role-tag ${getRoleClass(role)}`} key={role}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
