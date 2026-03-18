import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const metadata = {
  title: '英雄列表 - 英雄联盟爱好者',
  description:
    '浏览英雄联盟全部英雄，按定位、难度和关键词筛选，快速找到适合自己的英雄池与学习入口。'
};

const heroPillars = [
  {
    title: '按位置找英雄',
    text: '先确定你主玩上路、打野、中路、射手还是辅助，再看同位置里自己更适合功能型还是操作型。'
  },
  {
    title: '按难度选英雄',
    text: '新手优先上手职责清晰、技能稳定的英雄；想提高操作上限，再逐步补进需要更高熟练度的角色。'
  },
  {
    title: '按风格建英雄池',
    text: '一套健康的英雄池通常包含“稳定选择 + 对位补位 + 版本答案”三类，而不是只会一个英雄。'
  }
];

const roleCards = [
  ['上路', '抗压与边线牵制', '偏重换血、兵线和团战进场职责。'],
  ['打野', '节奏与资源控制', '负责刷野路径、支援和第一轮地图节奏。'],
  ['中路', '线权与辐射', '兼顾对线、转线与资源团前的支援效率。'],
  ['射手', '持续输出核心', '需要稳定补刀、站位和团战输出顺序。'],
  ['辅助', '视野与先手/保护', '决定很多团战能不能以正确方式开始。'],
  ['自由选择', '按玩法偏好补位', '如果还没想好主位置，可以先按自己喜欢的风格搜索。']
];

export default function ChampionsPage() {
  return (
    <>
      <SiteHeader active="champions" />

      <main className="hero-guide-page champions-catalog-page">
        <div className="container">
          <header className="guide-hero-header guide-hero-header-rich champions-hero-header">
            <div
              className="guide-hero-splash"
              style={{
                backgroundImage:
                  "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg')"
              }}
            ></div>
            <div className="guide-hero-overlay"></div>
            <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
            <div className="guide-hero-info">
              <nav className="breadcrumb" aria-label="面包屑导航">
                <a href="/">首页</a>
                <span className="separator">/</span>
                <span className="current">英雄列表</span>
              </nav>
              <div className="guide-hero-grid">
                <div className="guide-hero-copy">
                  <span className="guide-kicker">Champion Atlas</span>
                  <h1 className="guide-hero-title">英雄列表</h1>
                  <p className="guide-hero-subtitle">从定位、难度和玩法风格出发，建立一套更清晰的英雄选择路径。</p>
                  <div className="guide-hero-roles">
                    <span className="role-tag role-mage">英雄筛选</span>
                    <span className="role-tag role-fighter">位置理解</span>
                    <span className="role-tag role-support">英雄池规划</span>
                  </div>
                </div>
                <aside className="guide-hero-panel">
                  <span className="guide-panel-tag">选择建议</span>
                  <ol className="guide-panel-list">
                    <li>先确定主玩位置</li>
                    <li>再决定自己要稳定英雄还是高上限英雄</li>
                    <li>最后用搜索和筛选补出第二、第三选择</li>
                  </ol>
                </aside>
              </div>
            </div>
          </header>

          <section className="guide-section">
            <h2 className="section-title">
              <span className="title-icon">◎</span>
              英雄选择框架
            </h2>
            <p className="section-subtitle">英雄页不只是“找名字”，更适合拿来建立自己的英雄池结构。</p>
            <div className="editorial-grid editorial-grid-3">
              {heroPillars.map((item) => (
                <article className="editorial-card" key={item.title}>
                  <span className="editorial-card-index">{item.title}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section">
            <h2 className="section-title">
              <span className="title-icon">🎯</span>
              位置速览
            </h2>
            <p className="section-subtitle">如果你还没确定主玩位置，先看这些职责提示会更容易开始。</p>
            <div className="editorial-grid editorial-grid-3">
              {roleCards.map(([title, tag, text]) => (
                <article className="role-focus-card" key={title}>
                  <div className="role-focus-head">
                    <h3>{title}</h3>
                    <span>{tag}</span>
                  </div>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section champion-filter-shell">
            <div className="strategy-section-head">
              <div>
                <p className="strategy-section-kicker">Champion Directory</p>
                <h2 className="section-title">英雄目录</h2>
              </div>
              <p className="section-subtitle">按定位、难度和关键词交叉筛选，快速缩小选择范围。</p>
            </div>

            <div className="filter-section">
              <div className="search-box">
                <input type="text" id="searchInput" placeholder="搜索英雄名称..." />
                <button className="search-btn" aria-label="搜索英雄">
                  🔍
                </button>
              </div>
              <div className="filter-tags">
                <button className="filter-btn active" data-filter="all">
                  全部
                </button>
                <button className="filter-btn" data-filter="战士">
                  战士
                </button>
                <button className="filter-btn" data-filter="刺客">
                  刺客
                </button>
                <button className="filter-btn" data-filter="法师">
                  法师
                </button>
                <button className="filter-btn" data-filter="射手">
                  射手
                </button>
                <button className="filter-btn" data-filter="辅助">
                  辅助
                </button>
                <button className="filter-btn" data-filter="坦克">
                  坦克
                </button>
              </div>
              <div className="difficulty-filter">
                <label htmlFor="difficultySelect">难度:</label>
                <select id="difficultySelect">
                  <option value="all">全部难度</option>
                  <option value="简单">简单</option>
                  <option value="中等">中等</option>
                  <option value="困难">困难</option>
                </select>
              </div>
            </div>

            <div className="champions-list" id="championsList"></div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
