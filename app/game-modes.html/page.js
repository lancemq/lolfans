import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '游戏模式',
  description:
    '查看英雄联盟常见游戏模式，包括召唤师峡谷、极地大乱斗、训练模式与轮换玩法，快速判断哪种模式更适合你。',
  path: '/game-modes.html'
});

const modeGuides = [
  {
    title: '想认真提升',
    text: '优先打召唤师峡谷与训练模式。一个负责实战，一个负责拆分练习，两者配合效率最高。'
  },
  {
    title: '想轻松开一把',
    text: '极地大乱斗更适合快速团战和娱乐体验，不需要完整处理对线、转线和运营。'
  },
  {
    title: '想尝鲜和放松',
    text: '轮换模式更强调趣味规则和短时刺激，适合换口味，不适合作为主要进步路径。'
  }
];

const modeCards = [
  {
    title: '召唤师峡谷',
    subtitle: "Summoner's Rift",
    category: 'competitive',
    badge: '核心',
    badgeClass: 'competitive',
    desc: '标准 5v5 地图，也是大多数玩家理解英雄联盟的起点。三路兵线、野区、中立资源和完整运营都集中在这里。',
    meta: ['5v5', '30-45分钟', '完整对局结构'],
    tags: ['竞技核心', '最适合提升', '排位环境']
  },
  {
    title: '极地大乱斗',
    subtitle: 'ARAM',
    category: 'casual',
    badge: '休闲',
    badgeClass: 'casual',
    desc: '单线随机英雄模式。对线和运营压力更小，但团战频率更高，适合快速体验英雄和放松开局。',
    meta: ['5v5', '15-25分钟', '随机英雄'],
    tags: ['高频团战', '轻松上手']
  },
  {
    title: '训练模式',
    subtitle: 'Practice Tool',
    category: 'casual',
    badge: '训练',
    badgeClass: 'casual',
    desc: '最适合练补刀、连招、技能范围、装备测试和进塔刀。很多提升都应该先在训练模式里拆解再进实战。',
    meta: ['单人', '不限时', '专项训练'],
    tags: ['新手友好', '复盘补强']
  },
  {
    title: '无限火力',
    subtitle: 'URF',
    category: 'rotating',
    badge: '轮换',
    badgeClass: 'rotating',
    desc: '节奏极快、技能释放频率极高的娱乐模式。更适合放松和体验夸张战斗，不适合拿来判断常规对局强弱。',
    meta: ['5v5', '15-20分钟', '高频技能'],
    tags: ['娱乐拉满', '限时开放']
  },
  {
    title: '云顶之弈',
    subtitle: 'TFT',
    category: 'casual',
    badge: '独立玩法',
    badgeClass: 'casual',
    desc: '虽然同属 League 生态，但核心是自走棋式阵容运营，和峡谷对战是完全不同的学习路径。',
    meta: ['8人', '30-40分钟', '阵容运营'],
    tags: ['策略导向', '独立体系']
  },
  {
    title: '轮换玩法',
    subtitle: 'Rotating Modes',
    category: 'rotating',
    badge: '活动',
    badgeClass: 'rotating',
    desc: '不同阶段会开放不同的限时模式。它们更像季节性娱乐内容，适合体验，不适合当作长期训练主场。',
    meta: ['限时', '规则变化大', '娱乐优先'],
    tags: ['阶段开放', '换口味']
  }
];

const comparisonRows = [
  ['召唤师峡谷', '完整', '高', '中-高', '想认真学游戏、打排位的人'],
  ['极地大乱斗', '部分', '高', '低-中', '想轻松打团、快速开一把的人'],
  ['训练模式', '专项', '无', '低', '想练补刀、连招、装备测试的人'],
  ['无限火力', '娱乐化', '极高', '低', '想放松、体验夸张战斗的人'],
  ['云顶之弈', '不同体系', '中', '中-高', '喜欢策略和阵容经营的人']
];

export default function GameModesPage() {
  return (
    <>
      <SiteHeader active="game-modes" />

      <main className="hero-guide-page game-modes-directory-page">
        <div className="container">
          <header className="guide-hero-header guide-hero-header-rich modes-directory-header">
            <div
              className="guide-hero-splash"
              style={{
                backgroundImage:
                  "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg')"
              }}
            ></div>
            <div className="guide-hero-overlay"></div>
            <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
            <div className="guide-hero-info">
              <nav className="breadcrumb" aria-label="面包屑导航">
                <a href="/">首页</a>
                <span className="separator">/</span>
                <span className="current">游戏模式</span>
              </nav>
              <div className="guide-hero-grid">
                <div className="guide-hero-copy">
                  <span className="guide-kicker">Mode Directory</span>
                  <h1 className="guide-hero-title">游戏模式</h1>
                  <p className="guide-hero-subtitle">不只是告诉你“有哪些模式”，而是帮你判断该去哪种战场打这一局。</p>
                  <div className="guide-hero-roles">
                    <span className="role-tag role-fighter">竞技模式</span>
                    <span className="role-tag role-mage">娱乐模式</span>
                    <span className="role-tag role-support">训练入口</span>
                  </div>
                </div>
                <aside className="guide-hero-panel">
                  <span className="guide-panel-tag">选模式思路</span>
                  <ol className="guide-panel-list">
                    <li>想提升，优先峡谷和训练模式</li>
                    <li>想放松，优先大乱斗和轮换玩法</li>
                    <li>想换脑子，TFT 是完全不同的体系</li>
                  </ol>
                </aside>
              </div>
            </div>
          </header>

          <section className="guide-section">
            <h2 className="section-title">
              <span className="title-icon">◎</span>
              模式选择建议
            </h2>
            <p className="section-subtitle">先明确你这局想获得什么，再选模式，比“随机开一个”更有意义。</p>
            <div className="editorial-grid editorial-grid-3">
              {modeGuides.map((guide) => (
                <article className="editorial-card" key={guide.title}>
                  <span className="editorial-card-index">{guide.title}</span>
                  <p>{guide.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section">
            <div className="strategy-section-head">
              <div>
                <p className="strategy-section-kicker">Mode Catalog</p>
                <h2 className="section-title">模式目录</h2>
              </div>
              <p className="section-subtitle">按竞技、休闲和轮换三类浏览，更快找到适合当下状态的玩法。</p>
            </div>
            <div className="modes-filter">
              <button className="filter-btn active" data-filter="all">
                全部
              </button>
              <button className="filter-btn" data-filter="competitive">
                竞技模式
              </button>
              <button className="filter-btn" data-filter="casual">
                休闲模式
              </button>
              <button className="filter-btn" data-filter="rotating">
                轮换模式
              </button>
            </div>
            <div className="modes-grid-enhanced">
              {modeCards.map((mode) => (
                <article className="mode-card-enhanced" data-category={mode.category} key={mode.title}>
                  <div className="mode-card-header">
                    <div className="mode-card-badge-wrap">
                      <div className={`mode-card-badge ${mode.badgeClass}`}>{mode.badge}</div>
                    </div>
                  </div>
                  <div className="mode-card-body">
                    <h3>{mode.title}</h3>
                    <p className="mode-card-subtitle">{mode.subtitle}</p>
                    <p className="mode-card-desc">{mode.desc}</p>
                    <div className="mode-card-meta">
                      {mode.meta.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mode-card-footer">
                    <div className="mode-tags">
                      {mode.tags.map((tag) => (
                        <span className="mode-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section">
            <h2 className="section-title">
              <span className="title-icon">↔</span>
              模式对比
            </h2>
            <p className="section-subtitle">把节奏、学习价值和适合人群放在一起看，会更容易做决定。</p>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>模式</th>
                    <th>学习价值</th>
                    <th>团战密度</th>
                    <th>上手门槛</th>
                    <th>适合谁</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
