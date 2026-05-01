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
            <div className="detail-section-head">
              <p className="strategy-section-kicker">Mode Picks</p>
              <h2 className="section-title">模式推荐英雄</h2>
              <p className="section-subtitle">不同模式下强势英雄不同，选对英雄事半功倍</p>
            </div>
            <div className="knowledge-grid two-col">
              <article className="knowledge-card">
                <h3>召唤师峡谷 - 单排上分</h3>
                <ul className="checklist">
                  <li><strong>上单：</strong>德莱厄斯、剑魔、奥恩、奎桑提</li>
                  <li><strong>打野：</strong>李青、螳螂、弗耶戈、赵信</li>
                  <li><strong>中单：</strong>阿狸、劫、辛德拉、维克托</li>
                  <li><strong>射手：</strong>卡莎、EZ、金克丝、艾希</li>
                  <li><strong>辅助：</strong>锤石、露露、娜美、蕾欧娜</li>
                </ul>
              </article>
              <article className="knowledge-card">
                <h3>极地大乱斗 (ARAM)</h3>
                <ul className="checklist">
                  <li><strong>坦克前排：</strong>奥恩、大树、蒙多、扎克</li>
                  <li><strong>Poke流：</strong>泽拉斯、维鲁斯、杰斯、拉克丝</li>
                  <li><strong>战士：</strong>剑魔、瑟提、亚索、锐雯</li>
                  <li><strong>刺客：</strong>卡萨丁、螳螂、奇亚娜、阿卡丽</li>
                  <li><strong>法师：</strong>维克托、辛德拉、维克兹、吉格斯</li>
                </ul>
              </article>
              <article className="knowledge-card">
                <h3>无限火力 (URF)</h3>
                <ul className="checklist">
                  <li><strong>T0 必选：</strong>伊泽瑞尔、卡莎、卢锡安、霞</li>
                  <li><strong>刺客：</strong>劫、小鱼人、塞恩、盖伦</li>
                  <li><strong>法师：</strong>拉克丝、泽拉斯、维克兹、吉格斯</li>
                  <li><strong>战士：</strong>亚索、锐雯、贾克斯、剑圣</li>
                </ul>
              </article>
              <article className="knowledge-card">
                <h3>云顶之弈 (TFT)</h3>
                <ul className="checklist">
                  <li>云顶之弈阵容随版本变化较大</li>
                  <li>建议关注官网每周阵容推荐</li>
                  <li>开局优先确定主C和阵容方向</li>
                  <li>装备优先级：主C装备 &gt; 坦克装备 &gt; 功能装备</li>
                </ul>
              </article>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
