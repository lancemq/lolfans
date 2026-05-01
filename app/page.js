import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { SeoJsonLd } from '../components/seo-jsonld';
import { HomeFeaturedChampions, HomeHeroExperience, HomeInfoCarousel } from '../components/home-page-client';
import { getLocalChampions } from '../lib/local-champions';
import { buildPageMetadata, buildWebPageJsonLd, buildBreadcrumbJsonLd } from '../lib/site-config';

export const metadata = buildPageMetadata({
  title: 'LOL攻略、英雄资料大全',
  description:
    '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧、游戏模式介绍。170+英雄完整数据、新手指南与排位进阶内容一站查看。',
  path: '/'
});

const contentCards = [
  {
    topline: 'Data',
    icon: '/images/intro/strategy.svg',
    alt: '英雄数据库',
    title: '英雄数据库',
    description: '快速查找英雄定位、技能机制、打法入口，适合先建立整体认知。',
    href: '/champions.html',
    cta: '浏览英雄'
  },
  {
    topline: 'Build',
    icon: '/images/intro/game-data.svg',
    alt: '符文装备库',
    title: '符文装备库',
    description: '查看符文体系、装备分层与对局出装逻辑，建立稳定知识框架。',
    href: '/items-runes.html',
    cta: '查看符文装备'
  },
  {
    topline: 'Macro',
    icon: '/images/intro/strategy.svg',
    alt: '攻略中心',
    title: '攻略中心',
    description: '覆盖五路打法、中期运营、团战模板与复盘清单，形成可执行上分节奏。',
    href: '/strategy-center.html',
    cta: '进入攻略'
  }
];

const introCards = [
  {
    icon: '/images/intro/objective.svg',
    alt: '推塔竞技图标',
    title: '推塔竞技',
    description: '摧毁敌方基地水晶，与队友配合，运用策略和技巧取得胜利。'
  },
  {
    icon: '/images/intro/duel.svg',
    alt: '英雄对战图标',
    title: '英雄对战',
    description: '每位英雄都有独特技能组合，找到适合你的风格，主宰战场。'
  },
  {
    icon: '/images/intro/teamwork.svg',
    alt: '团队协作图标',
    title: '团队协作',
    description: '5v5团队作战，沟通配合是获胜关键，与朋友一起开黑吧！'
  },
  {
    icon: '/images/intro/ranked.svg',
    alt: '排位竞技图标',
    title: '排位竞技',
    description: '从青铜到王者，挑战自我，在排位赛中证明自己的实力。'
  }
];

const roles = [
  { id: 'top', icon: '/images/roles/top.svg', alt: '上单图标', title: '上单', en: 'Top Lane', desc: '坦克战士，抗压发育' },
  { id: 'jungle', icon: '/images/roles/jungle.svg', alt: '打野图标', title: '打野', en: 'Jungle', desc: '游走支援，控制地图' },
  { id: 'mid', icon: '/images/roles/mid.svg', alt: '中单图标', title: '中单', en: 'Mid Lane', desc: '爆发伤害，carry核心' },
  { id: 'adc', icon: '/images/roles/adc.svg', alt: '射手图标', title: '射手', en: 'ADC', desc: '持续输出，后排核心' },
  { id: 'support', icon: '/images/roles/support.svg', alt: '辅助图标', title: '辅助', en: 'Support', desc: '保护团队，控制视野' }
];

export default async function HomePage() {
  const heroes = await getLocalChampions();

  return (
    <>
      <SeoJsonLd data={buildWebPageJsonLd({
        title: 'LOL攻略、英雄资料大全',
        description: '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧、游戏模式介绍。',
        path: '/'
      })} />
      <SeoJsonLd data={buildBreadcrumbJsonLd([
        { name: '首页', path: '/' }
      ])} />
      <SiteHeader active="home" />

      <header className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">Summoner Intelligence Hub</span>
          <h1 className="hero-title">更系统地理解版本，更专业地组织上分路径</h1>
          <p className="hero-subtitle">
            围绕英雄、符文、装备、分路与中后期运营，构建一套更清晰的 LOL 学习与实战入口。
          </p>
          <HomeHeroExperience heroes={heroes} />
          <div className="hero-actions">
            <a href="/champions.html" className="cta-button">
              查看所有英雄
            </a>
            <a href="/strategy-center.html" className="cta-button cta-button-secondary">
              进入攻略中心
            </a>
          </div>
          <div className="hero-trustbar">
            <span>英雄资料</span>
            <span>出装符文</span>
            <span>对线技巧</span>
            <span>版本思路</span>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">170+</span>
              <span className="stat-label">可玩英雄</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">游戏位置</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">无限</span>
              <span className="stat-label">战术可能</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">核心入口</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <HomeInfoCarousel />
        </div>
      </header>

      <section className="content-hub">
        <div className="container">
          <h2 className="section-title">资料与攻略</h2>
          <p className="section-subtitle">
            按“查资料、定路线、看攻略”的使用顺序组织内容，减少信息跳转成本
          </p>
          <div className="intro-grid">
            {contentCards.map((card) => (
              <article className="intro-card" key={card.title}>
                <div className="intro-card-topline">{card.topline}</div>
                <div className="intro-icon">
                  <img className="intro-icon-img" src={card.icon} alt={card.alt} loading="lazy" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a className="cta-button hub-link" href={card.href}>
                  {card.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-briefing">
        <div className="container">
          <div className="briefing-shell">
            <article className="briefing-main">
              <p className="briefing-label">本周作战面板</p>
              <h2>先建立稳定框架，再追求细节操作</h2>
              <p>
                首页现在按“英雄理解、构筑判断、运营执行”三层结构组织，更适合新玩家建立路径，也更方便老玩家快速回看重点。
              </p>
              <div className="briefing-points">
                <div className="briefing-point">
                  <strong>01</strong>
                  <span>先确定主玩位置和英雄池，再看专项攻略。</span>
                </div>
                <div className="briefing-point">
                  <strong>02</strong>
                  <span>遇到出装犹豫时，先回到符文装备页判断功能需求。</span>
                </div>
                <div className="briefing-point">
                  <strong>03</strong>
                  <span>排位前优先看中期运营、资源转换和团战执行模板。</span>
                </div>
              </div>
            </article>
            <div className="briefing-side">
              <article className="briefing-card">
                <span className="briefing-card-tag">Priority</span>
                <h3>推荐阅读顺序</h3>
                <p>英雄列表 → 符文装备 → 攻略中心，先搭框架再学细节。</p>
              </article>
              <article className="briefing-card">
                <span className="briefing-card-tag">Focus</span>
                <h3>首页定位</h3>
                <p>不是内容堆叠，而是给你一个更像专业门户的导航与决策首页。</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-champions">
        <div className="container">
          <h2 className="section-title">热门英雄</h2>
          <p className="section-subtitle">按当前热门与学习价值优先展示，方便快速进入单英雄内容</p>
          <HomeFeaturedChampions heroes={heroes} />
        </div>
      </section>

      <section className="game-intro">
        <div className="container">
          <div className="intro-grid">
            {introCards.map((card) => (
              <div className="intro-card" key={card.title}>
                <div className="intro-icon">
                  <img className="intro-icon-img" src={card.icon} alt={card.alt} loading="lazy" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="roles-section">
        <div className="container">
          <h2 className="section-title">五大位置</h2>
          <div className="roles-grid">
            {roles.map((role) => (
              <div className="role-card" data-role={role.id} key={role.id}>
                <div className="role-icon">
                  <img className="role-icon-img" src={role.icon} alt={role.alt} loading="lazy" />
                </div>
                <h3>{role.title}</h3>
                <p>{role.en}</p>
                <span className="role-desc">{role.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
