'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  buildHeroGuideModel,
  getDifficultyClass,
  getRoleClass,
  getChampionSplashUrl,
  resolveChampionPayload
} from '../lib/champion-data';

function LoadingCard({ title, text }) {
  return (
    <section className="knowledge-card hero-empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

export function HeroGuideClient({ initialHeroes = [], siteMeta = null }) {
  const searchParams = useSearchParams();
  const heroId = searchParams.get('id') || 'yasuo';
  const [state, setState] = useState({ loading: true, hero: null, catalog: [], version: '14.1.1' });
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);

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
    setActiveStyleIndex(0);
  }, [state.hero?.id]);

  if (state.loading) {
    return <LoadingCard title="加载英雄攻略中" text="正在整理打法、技能、出装与对局建议。" />;
  }

  if (!state.hero) {
    return <LoadingCard title="未找到攻略数据" text="请从攻略中心重新进入，或检查当前链接中的英雄参数。" />;
  }

  const guide = buildHeroGuideModel(state.hero, siteMeta);
  const hero = guide.hero;
  const version = state.version;
  const activeStyle = guide.playstyles[activeStyleIndex] || guide.playstyles[0];

  const relatedLinks = useMemo(
    () =>
      (state.catalog || [])
        .filter((item) => item.id !== hero.id && item.roles.some((role) => hero.roles.includes(role)))
        .slice(0, 2),
    [hero, state.catalog]
  );

  return (
    <div className="guide-page-stack">
      <header className="guide-hero-header guide-hero-header-rich hero-guide-rich-header">
        <div
          className="guide-hero-splash"
          style={{ backgroundImage: `url('${getChampionSplashUrl(version, hero, 0)}')` }}
        ></div>
        <div className="guide-hero-overlay"></div>
        <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
        <div className="guide-hero-info">
          <nav className="breadcrumb" aria-label="面包屑导航">
            <a href="/strategy-center.html">攻略中心</a>
            <span className="separator">/</span>
            <span className="current">
              {hero.name} · {hero.title}
            </span>
          </nav>
          <div className="guide-hero-grid">
            <div className="guide-hero-copy">
              <span className="guide-kicker">Matchup Playbook</span>
              <h1 className="guide-hero-title">{hero.name} 攻略</h1>
              <p className="guide-hero-subtitle">{hero.title} · 以长期有效的对线、资源与团战判断为核心。</p>
              <div className="guide-hero-roles">
                {hero.roles.map((role) => (
                  <span className={`role-tag ${getRoleClass(role)}`} key={role}>
                    {role}
                  </span>
                ))}
                <span className={`difficulty-tag ${getDifficultyClass(hero.difficulty)}`}>{hero.difficulty}</span>
              </div>
            </div>
            <aside className="guide-hero-panel">
              <span className="guide-panel-tag">阅读顺序</span>
              <ol className="guide-panel-list">
                <li>先看打法与分路职责</li>
                <li>再看技能和出装逻辑</li>
                <li>最后用对线与团战清单进入实战</li>
              </ol>
            </aside>
          </div>
        </div>
      </header>

      <section className="guide-section guide-overview-shell">
        <div className="guide-overview-grid">
          {guide.overview.map((item) => (
            <article className="detail-summary-card guide-overview-card" key={item.title}>
              <span className="detail-summary-label">{item.title}</span>
              <strong>{item.value}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="power-spikes">
        <h2 className="section-title">
          <span className="title-icon">📈</span>
          强势期与常见失误
        </h2>
        <p className="section-subtitle">先知道什么时候该主动，什么时候最容易送节奏，实战提升会比只背连招更快。</p>
        <div className="editorial-grid editorial-grid-2">
          <article className="decision-card">
            <h3>关键强势期</h3>
            <ol className="ordered-list">
              {guide.powerSpikes.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="decision-card">
            <h3>最常见的 4 个失误</h3>
            <ul className="checklist">
              {guide.mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="guide-section" id="early-plan">
        <h2 className="section-title">
          <span className="title-icon">⏱️</span>
          前 10 分钟节奏计划
        </h2>
        <p className="section-subtitle">很多对局不是 20 分钟后才分胜负，而是在前 10 分钟就决定了你是顺着英雄节奏打，还是一直在补救前面的亏损。</p>
        <div className="editorial-grid editorial-grid-3 early-plan-grid">
          {guide.earlyPlan.map((item) => (
            <article className="decision-card early-plan-card" key={item.title}>
              <span className="detail-summary-label">{item.window}</span>
              <h3>{item.title}</h3>
              <p>{item.notes}</p>
            </article>
          ))}
        </div>
        <article className="decision-card early-mistake-card">
          <h3>前 10 分钟最容易犯的错</h3>
          <ul className="checklist">
            {guide.earlyMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <div className="guide-quick-nav">
        <a href="#playstyles" className="quick-nav-item">
          <span className="quick-nav-icon">🎮</span>
          <span>打法选择</span>
        </a>
        <a href="#early-plan" className="quick-nav-item">
          <span className="quick-nav-icon">⏱️</span>
          <span>前10分钟</span>
        </a>
        <a href="#abilities" className="quick-nav-item">
          <span className="quick-nav-icon">⚡</span>
          <span>技能详解</span>
        </a>
        <a href="#skill-order" className="quick-nav-item">
          <span className="quick-nav-icon">🧭</span>
          <span>技能加点</span>
        </a>
        <a href="#builds" className="quick-nav-item">
          <span className="quick-nav-icon">🎒</span>
          <span>出装推荐</span>
        </a>
        <a href="#runes" className="quick-nav-item">
          <span className="quick-nav-icon">🔮</span>
          <span>符文搭配</span>
        </a>
        <a href="#summoners" className="quick-nav-item">
          <span className="quick-nav-icon">✨</span>
          <span>召唤师技能</span>
        </a>
        <a href="#matchups" className="quick-nav-item">
          <span className="quick-nav-icon">⚔️</span>
          <span>对线技巧</span>
        </a>
        <a href="#synergy" className="quick-nav-item">
          <span className="quick-nav-icon">🤝</span>
          <span>阵容适配</span>
        </a>
        <a href="#combos" className="quick-nav-item">
          <span className="quick-nav-icon">🔥</span>
          <span>连招团战</span>
        </a>
      </div>

      <section className="guide-section" id="playstyles">
        <h2 className="section-title">
          <span className="title-icon">🎮</span>
          打法选择
        </h2>
        <p className="section-subtitle">把英雄的节奏拆成三段：对线、中期运营、团战执行，会比死记模板更稳定。</p>
        <div className="playstyle-tabs">
          {guide.playstyles.map((style, index) => (
            <button
              className={`playstyle-tab ${index === activeStyleIndex ? 'active' : ''}`}
              key={style.name}
              onClick={() => setActiveStyleIndex(index)}
              type="button"
            >
              <span className="tab-icon">{style.icon}</span>
              <span className="tab-name">{style.name}</span>
            </button>
          ))}
        </div>
        <div className="playstyle-content">
          <div className="playstyle-panel active">
            <div className="playstyle-header">
              <span className="playstyle-icon">{activeStyle.icon}</span>
              <div>
                <h3>{activeStyle.name}</h3>
                <p>{activeStyle.description}</p>
              </div>
            </div>
            <div className="playstyle-phases">
              <div className="phase-card">
                <div className="phase-icon">🌅</div>
                <h4>前期</h4>
                <p>{activeStyle.early}</p>
              </div>
              <div className="phase-card">
                <div className="phase-icon">🌇</div>
                <h4>中期</h4>
                <p>{activeStyle.mid}</p>
              </div>
              <div className="phase-card">
                <div className="phase-icon">🌙</div>
                <h4>后期</h4>
                <p>{activeStyle.late}</p>
              </div>
            </div>
            <div className="playstyle-tips">
              <h4>执行清单</h4>
              <ul>
                {activeStyle.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section" id="abilities">
        <h2 className="section-title">
          <span className="title-icon">⚡</span>
          技能详解
        </h2>
        <p className="section-subtitle">技能说明里最值得记住的，是释放条件、使用顺序和什么时候必须保留。</p>
        <div className="abilities-guide">
          {guide.abilities.map((ability) => (
            <article className="ability-card" key={ability.key}>
              <div className="ability-key">
                {ability.icon ? <img className="ability-card-icon" src={ability.icon} alt={`${hero.name} ${ability.name}`} /> : ability.key}
              </div>
              <div className="ability-info">
                <h3>
                  {ability.key} · {ability.name}
                </h3>
                <p className="ability-desc">{ability.description}</p>
                <div className="detail-meta-row">
                  {ability.cooldown ? <span className="ability-stat-cd">冷却: {ability.cooldown}</span> : null}
                  {ability.mana ? <span className="ability-stat-mana">消耗: {ability.mana}</span> : null}
                </div>
                <div className="ability-tips">
                  <h4>使用提示</h4>
                  <ul>
                    {ability.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="skill-order">
        <h2 className="section-title">
          <span className="title-icon">🧭</span>
          技能加点顺序
        </h2>
        <p className="section-subtitle">加点不是死背模板，而是知道这局你更需要清线、爆发、抗压还是更稳定的功能点。</p>
        <div className="editorial-grid editorial-grid-3 skill-order-grid">
          {guide.skillOrder.map((item) => (
            <article className="decision-card skill-order-card" key={item.title}>
              <span className="detail-summary-label">{item.order}</span>
              <h3>{item.title}</h3>
              <p>{item.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="builds">
        <h2 className="section-title">
          <span className="title-icon">🎒</span>
          出装推荐
        </h2>
        <p className="section-subtitle">思路不是“固定六件套”，而是先有稳定主线，再根据局势补针对件。</p>
        <div className="builds-section">
          {guide.builds.map((build) => (
            <article className="build-card-full" key={build.title}>
              <h3>{build.title}</h3>
              <p className="section-subtitle">{build.summary}</p>
              <div className="build-items">
                {build.items.map((item) => (
                  <span className="build-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="build-runes">
                <h4>配套符文</h4>
                <div className="rune-row">
                  <span className="rune-primary">主系</span>
                  <span>{build.runes.primary}</span>
                </div>
                <div className="rune-row">
                  <span className="rune-primary">基石</span>
                  <span>{build.runes.keystone}</span>
                </div>
                <div className="rune-row">
                  <span className="rune-secondary">副系</span>
                  <span>{build.runes.secondary}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="editorial-grid editorial-grid-3 build-adjustment-grid">
          <article className="decision-card build-adjustment-card">
            <h3>主线思路</h3>
            <ul className="checklist">
              {guide.buildAdjustments.core.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="decision-card build-adjustment-card">
            <h3>顺风怎么变</h3>
            <ul className="checklist">
              {guide.buildAdjustments.ahead.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="decision-card build-adjustment-card">
            <h3>逆风怎么变</h3>
            <ul className="checklist">
              {guide.buildAdjustments.behind.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="guide-section" id="runes">
        <h2 className="section-title">
          <span className="title-icon">🔮</span>
          符文搭配
        </h2>
        <p className="section-subtitle">符文页负责告诉你“点什么”，这里负责告诉你“为什么这样点”。</p>
        <div className="editorial-grid editorial-grid-2 guide-rune-grid">
          {guide.runeSets.map((rune) => (
            <article className="decision-card" key={rune.title}>
              <h3>{rune.title}</h3>
              <p>
                <strong>{rune.primary}</strong> · {rune.keystone}
              </p>
              <p>副系：{rune.secondary}</p>
              <p>{rune.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="summoners">
        <h2 className="section-title">
          <span className="title-icon">✨</span>
          召唤师技能选择
        </h2>
        <p className="section-subtitle">召唤师技能决定的是这局你更想要对线强度、团战容错，还是针对某类爆发与控制。</p>
        <div className="editorial-grid editorial-grid-3 summoner-grid">
          {guide.summonerSpells.map((item) => (
            <article className="decision-card summoner-card" key={item.title}>
              <span className="detail-summary-label">{item.spells}</span>
              <h3>{item.title}</h3>
              <p className="summoner-usecase">{item.useCase}</p>
              <p>{item.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="matchups">
        <h2 className="section-title">
          <span className="title-icon">⚔️</span>
          对线技巧
        </h2>
        <p className="section-subtitle">对线不是拼勇气，而是比谁更少在错误时间交技能、站错位置、亏错兵线。</p>
        <div className="editorial-grid editorial-grid-2 matchup-counter-grid">
          <article className="decision-card matchup-counter-card">
            <h3>更擅长应对</h3>
            <ul className="checklist">
              {guide.counters.strongAgainst.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="decision-card matchup-counter-card">
            <h3>需要特别警惕</h3>
            <ul className="checklist">
              {guide.counters.weakAgainst.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <div className="matchups-grid">
          {guide.matchups.map((matchup) => (
            <article className="matchup-card" key={matchup.enemy}>
              <div className="matchup-header">
                <h3>{matchup.enemy}</h3>
                <span className={`difficulty-tag ${matchup.difficulty === '困难' ? 'disadvantage' : 'medium'}`}>
                  {matchup.difficulty}
                </span>
              </div>
              <p>{matchup.tips}</p>
            </article>
          ))}
        </div>
        <div className="matchup-tips">
          <h3>对线清单</h3>
          <ul>
            {guide.matchupNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <div className="editorial-grid editorial-grid-2 matchup-detail-grid">
          {guide.matchupDetails.map((item) => (
            <article className="decision-card matchup-detail-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="combos">
        <h2 className="section-title">
          <span className="title-icon">🔥</span>
          连招与团战执行
        </h2>
        <p className="section-subtitle">先练稳定命中和进退顺序，再慢慢追求更高操作上限。</p>
        <div className="combos-grid">
          {guide.combos.map((combo) => (
            <article className="combo-card" key={combo.name}>
              <span className="combo-difficulty">{combo.difficulty}</span>
              <h3>{combo.name}</h3>
              <div className="combo-keys">{combo.keys}</div>
              <p>{combo.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="teamfight">
        <h2 className="section-title">
          <span className="title-icon">👥</span>
          团战思路
        </h2>
        <p className="section-subtitle">团战强不强，常常不取决于一波操作，而取决于你有没有在正确时间出现在正确位置。</p>
        <div className="teamfight-content">
          <div className="teamfight-phases">
            {guide.teamfight.phases.map(([title, text]) => (
              <article className="phase-card" key={title}>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="teamfight-tips">
            <h3>站位与执行</h3>
            <p>{guide.teamfight.positioning}</p>
            <ul>
              {guide.teamfight.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="guide-section" id="synergy">
        <h2 className="section-title">
          <span className="title-icon">🤝</span>
          推荐搭档与阵容适配
        </h2>
        <p className="section-subtitle">会不会玩这个英雄是一层，知道它该和谁一起赢、该进什么阵容，是更进一步的一层。</p>
        <div className="editorial-grid editorial-grid-2">
          <article className="decision-card synergy-card">
            <h3>推荐搭档</h3>
            <ul className="checklist">
              {guide.synergy.allies.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="decision-card synergy-card">
            <h3>更适合的阵容</h3>
            <ul className="checklist">
              {guide.synergy.comps.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <div className="editorial-grid editorial-grid-2 synergy-case-grid">
          {guide.synergyCases.map((item) => (
            <article className="decision-card synergy-case-card" key={item.duo}>
              <span className="detail-summary-label">{item.window}</span>
              <h3>{item.duo}</h3>
              <p>{item.plan}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="tips">
        <h2 className="section-title">
          <span className="title-icon">💡</span>
          实战技巧
        </h2>
        <p className="section-subtitle">这部分不是花活合集，而是最容易直接提升胜率的实战判断。</p>
        <div className="tips-content">
          <ul className="tips-list">
            {guide.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="guide-section">
        <h2 className="section-title">
          <span className="title-icon">📚</span>
          相关推荐
        </h2>
        <div className="related-links">
          <a href="/strategy-center.html" className="related-link-card">
            <span className="related-icon">📖</span>
            <span>返回攻略中心</span>
          </a>
          {relatedLinks.map((item) => (
            <a href={`/hero-guide.html?id=${item.id}`} className="related-link-card" key={item.id}>
              <span className="related-icon">⚔️</span>
              <span>
                {item.name} · {item.title}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
