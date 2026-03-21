'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchLatestDataDragonVersion, sanitizeText } from '../lib/champion-data';

const FALLBACK_VERSION = '16.6.1';
const BANNER_SLIDES = [
  { name: '亚索', url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg' },
  { name: '阿狸', url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg' },
  { name: '永恩', url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yone_0.jpg' },
  { name: '劫', url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg' },
  { name: '薇恩', url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg' }
];

function getItemCategory(item) {
  const tags = item.tags || [];
  if (tags.includes('Boots')) return '鞋子';
  if (tags.includes('Support')) return '辅助';
  if (tags.includes('Jungle')) return '打野';
  if (tags.includes('Defense') || tags.includes('Health')) return '防御';
  if (
    tags.includes('SpellDamage') ||
    tags.includes('Mana') ||
    tags.includes('ManaRegen') ||
    tags.includes('CooldownReduction')
  ) {
    return '法术';
  }
  if (
    tags.includes('Damage') ||
    tags.includes('CriticalStrike') ||
    tags.includes('AttackSpeed') ||
    tags.includes('ArmorPenetration') ||
    tags.includes('LifeSteal') ||
    tags.includes('OnHit')
  ) {
    return '物理';
  }
  return '功能';
}

function useItemCatalog() {
  const [version, setVersion] = useState(FALLBACK_VERSION);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const latestVersion = await fetchLatestDataDragonVersion();
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/zh_CN/item.json`
        );
        if (!response.ok) throw new Error('item.json 请求失败');
        const payload = await response.json();
        const allItems = Object.entries(payload.data || {})
          .map(([id, item]) => ({ id, ...item }))
          .filter((item) => item.maps?.['11'] && item.inStore !== false && item.gold?.total > 0)
          .sort((a, b) => (a.gold.total - b.gold.total) || a.name.localeCompare(b.name, 'zh-CN'));

        if (!cancelled) {
          setVersion(latestVersion);
          setItems(allItems);
          setError('');
        }
      } catch {
        if (!cancelled) {
          setError('官方装备数据加载失败，请稍后刷新页面重试。');
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { version, items, error };
}

export function ItemsRunesHeroHeader() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((value) => (value + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="guide-hero-header guide-hero-header-rich">
      <div
        className="guide-hero-splash"
        style={{ backgroundImage: `url('${BANNER_SLIDES[slideIndex].url}')` }}
      ></div>
      <div className="guide-hero-overlay"></div>
      <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
      <div className="guide-hero-info">
        <nav className="breadcrumb" aria-label="面包屑导航">
          <a href="/">首页</a>
          <span className="separator">/</span>
          <span className="current">符文与装备</span>
        </nav>
        <div className="guide-hero-grid">
          <div className="guide-hero-copy">
            <span className="guide-kicker">Build Intelligence Desk</span>
            <h1 className="guide-hero-title">符文与装备系统</h1>
            <p className="guide-hero-subtitle">不是背答案，而是学会在每一局里做对构筑判断。</p>
            <div className="guide-hero-roles">
              <span className="role-tag role-fighter">符文系统</span>
              <span className="role-tag role-mage">装备系统</span>
              <span className="role-tag role-support">对局适配</span>
            </div>
            <div className="banner-dots" aria-label="英雄背景轮播">
              {BANNER_SLIDES.map((slide, index) => (
                <button
                  className={`banner-dot ${index === slideIndex ? 'active' : ''}`}
                  key={slide.name}
                  aria-label={`切换到${slide.name}背景`}
                  onClick={() => setSlideIndex(index)}
                  type="button"
                ></button>
              ))}
            </div>
          </div>
          <aside className="guide-hero-panel">
            <span className="guide-panel-tag">构筑顺序</span>
            <ol className="guide-panel-list">
              <li>先判断自己这局的赢法</li>
              <li>再判断敌方主要威胁</li>
              <li>最后做滚动修正与功能补件</li>
            </ol>
          </aside>
        </div>
      </div>
    </header>
  );
}

export function ItemsRunesCatalog() {
  const { version, items, error } = useItemCatalog();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = !query.trim() || item.name.includes(query.trim());
      const matchesType = type === 'all' || getItemCategory(item) === type;
      return matchesQuery && matchesType;
    });
  }, [items, query, type]);

  return (
    <section className="guide-section" id="all-items">
      <div className="strategy-section-head">
        <div>
          <p className="strategy-section-kicker">Riot Item Catalog</p>
          <h2 className="section-title">官方全部装备图鉴</h2>
        </div>
        <p className="section-subtitle">按名称和类型筛选当前版本装备，帮助你更快找到本局需要的功能件。</p>
      </div>
      <div className="all-items-controls">
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索装备名称..."
          />
          <button className="search-btn" type="button" aria-label="搜索装备">
            🔍
          </button>
        </div>
        <div className="difficulty-filter">
          <label htmlFor="allItemsType">类型:</label>
          <select id="allItemsType" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">全部类型</option>
            <option value="物理">物理</option>
            <option value="法术">法术</option>
            <option value="防御">防御</option>
            <option value="鞋子">鞋子</option>
            <option value="辅助">辅助</option>
            <option value="打野">打野</option>
            <option value="功能">功能</option>
          </select>
        </div>
      </div>
      <p className="section-subtitle">
        {error || `已同步 Riot 官方装备库：共 ${items.length} 件，当前筛选结果 ${filteredItems.length} 件（版本 ${version}）。`}
      </p>
      <div className="all-items-grid">
        {filteredItems.map((item) => {
          const category = getItemCategory(item);
          const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
          const desc = sanitizeText(item.description || '').slice(0, 90);

          return (
            <article className="all-item-card" key={item.id}>
              <div className="all-item-head">
                <img src={iconUrl} alt={`${item.name}高清图标`} loading="lazy" />
                <h3>{item.name}</h3>
              </div>
              <div className="all-item-meta">
                {[category, `总价 ${item.gold.total}`, `售价 ${item.gold.sell}`, ...(item.tags || []).slice(0, 2)].map((tag) => (
                  <span key={`${item.id}-${tag}`}>{tag}</span>
                ))}
              </div>
              <p className="all-item-desc">{desc || '该装备用于提升战斗属性与对局节奏。'}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
