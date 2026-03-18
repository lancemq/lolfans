import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const metadata = {
  title: '符文与装备 - 英雄联盟爱好者',
  description:
    '英雄联盟符文与装备系统详解，符文大陆四大基石符文，AD/AP/坦克装备全解析。掌握符文装备搭配，提升游戏实力。'
};

const quickNav = [
  ['#runes', '⚡', '符文系统'],
  ['#precision', '⚔️', '精密系'],
  ['#domination', '🔥', '主宰系'],
  ['#sorcery', '✨', '巫术系'],
  ['#resolve', '🛡️', '坚决系'],
  ['#inspiration', '💡', '灵感系'],
  ['#all-items', '🎒', '全部装备']
];

const runeOverview = [
  ['⚔️', '精密系', '强化攻击型英雄的持续输出', '适合ADC/战士', 'easy', '精密系符文提供攻击力、攻速和暴击加成，适合依赖普攻输出的英雄。基石符文包括征服者、致命节奏、迅捷步法等。', ['基石符文：征服者、致命节奏、迅捷步法', '定位：ADC、上单战士、打野']],
  ['🔥', '主宰系', '提升爆发伤害和击杀能力', '适合刺客', 'medium', '主宰系符文提供高爆发和穿甲效果，适合刺客型英雄。基石符文包括电刑、丛刃、掠食者等。', ['基石符文：电刑、丛刃、掠食者', '定位：中单刺客、打野']],
  ['✨', '巫术系', '强化技能伤害和法力值', '适合法师', 'medium', '巫术系符文提供技能加速、法力和 AP 加成，适合依赖技能输出的法师。基石符文包括奥术彗星、相位猛冲、冰川增幅等。', ['基石符文：奥术彗星、相位猛冲、冰川增幅', '定位：中单法师、辅助']],
  ['🛡️', '坚决系', '增强生存能力和团队控制', '适合坦克/辅助', 'easy', '坚决系符文提供护甲、魔抗和生命值加成，适合坦克和辅助英雄。基石符文包括不灭之握、余震、守护者等。', ['基石符文：不灭之握、余震、守护者', '定位：上单坦克、辅助']],
  ['💡', '灵感系', '提供特殊机制和灵活选择', '适合创意玩法', 'hard', '灵感系符文提供特殊机制和全能加成，适合创意玩法和特定英雄。基石符文包括启封的秘籍、全能之石、先攻等。', ['基石符文：启封的秘籍、全能之石、先攻', '定位：辅助、特定套路']]
];

const runeSections = [
  {
    id: 'precision',
    icon: '⚔️',
    title: '精密系符文详解',
    subtitle: '适合依赖普攻和持续输出的英雄',
    cards: [
      ['征服者', '攻击英雄时获得适应之力，叠满后对英雄造成伤害时会回复生命值。适合持续战斗的战士和部分 ADC。', ['上单战士：诺手、锐雯、剑魔、亚索、永恩', '打野：赵信、蔚、挖掘机', '部分 ADC：德莱文、卡莎']],
      ['致命节奏', '攻击敌方英雄时获得攻击速度加成，可以溢出。适合需要高攻速的 ADC 和战士。', ['ADC：VN、大嘴、老鼠、金克斯', '上单：武器大师、蛮王']],
      ['迅捷步法', '攻击和移动会积攒能量层数，层数满时下次攻击会回复生命值并获得加速。适合续航型英雄。', ['ADC：艾希、MF、赛娜', '上单：肾、慎']]
    ]
  },
  {
    id: 'domination',
    icon: '🔥',
    title: '主宰系符文详解',
    subtitle: '适合高爆发的刺客英雄',
    cards: [
      ['电刑', '在 3 秒内用 3 个独立技能或攻击命中同一敌人时，造成额外自适应伤害。刺客的标准选择。', ['中单刺客：劫、泰隆、卡特、小鱼人', '打野：螳螂、狮子狗']],
      ['丛刃', '对敌方英雄的前 3 次普攻获得大量攻速加成。适合依赖普攻的刺客和战士。', ['刺客：劫、狮子狗、螳螂', '战士：赵信、武器']],
      ['掠食者', '主动激活后获得大量移动速度，下一次攻击或技能会造成额外伤害。适合游走型英雄。', ['中单：加里奥、潘森', '打野：皇子、挖掘机']]
    ]
  },
  {
    id: 'sorcery',
    icon: '✨',
    title: '巫术系符文详解',
    subtitle: '适合依赖技能输出的法师英雄',
    cards: [
      ['奥术彗星', '用技能命中敌人时召唤彗星造成额外伤害。适合 poke 型法师。', ['中单：泽拉斯、艾妮薇娅、捷拉', '上单：兰博、提莫']],
      ['相位猛冲', '用技能命中敌人后获得爆发性移动速度。适合需要近身的法师。', ['中单：阿狸、皎月、卡萨丁', '辅助：风女、露露']]
    ]
  },
  {
    id: 'resolve',
    icon: '🛡️',
    title: '坚决系符文详解',
    subtitle: '适合坦克和辅助英雄',
    cards: [
      ['不灭之握', '每 4 秒对英雄的下次普攻造成额外伤害并回复生命值。适合持续战斗的坦克。', ['上单：狗头、茂凯、塞恩', '辅助：布隆、泰坦']],
      ['余震', '定身敌方英雄后获得双抗加成并造成范围伤害。适合开团型坦克。', ['上单：奥恩、树人、石像鬼', '辅助：日女、泰坦、机器人']],
      ['守护者', '为附近的友军提供护盾和加速。保护型辅助的核心选择。', ['辅助：风女、露露、卡尔玛', '上单：慎、肾']]
    ]
  },
  {
    id: 'inspiration',
    icon: '💡',
    title: '灵感系符文详解',
    subtitle: '适合创意玩法和特定英雄',
    cards: [
      ['启封的秘籍', '可以更换召唤师技能，击杀单位获得额外经验。适合需要灵活召唤师技能的英雄。', ['中单：卡牌、时光', '辅助：赛娜、琴女']],
      ['先攻', '对敌方英雄的第一次攻击获得额外伤害和金币。适合前期强势英雄。', ['上单：潘森、杰斯', '中单：男刀、劫']]
    ]
  }
];

const buildTemplates = [
  ['ADC 通用模板', ['基石：致命节奏/迅捷步法', '出装：岚切→无尽→饮血→多米尼克', '符文：欢欣+致命一击+血之滋味']],
  ['中单刺客 通用模板', ['基石：电刑', '出装：暮刃→幽梦→夜之锋刃→巨蛇之牙', '符文：猛然冲击+眼球收集器+寻宝猎人']],
  ['上单战士 通用模板', ['基石：征服者', '出装：黑切→血手→死亡之舞→板甲', '符文：凯旋+欢欣+致命一击']],
  ['辅助 通用模板', ['基石：守护者/余震', '出装：监视残物→基克的聚合→骑士之誓', '符文：生命源泉+复苏+坚定']]
];

function SectionTitle({ icon, title, subtitle }) {
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

export default function ItemsRunesPage() {
  return (
    <>
      <SiteHeader active="items-runes" />

      <main className="hero-guide-page">
        <div className="container">
          <header className="guide-hero-header">
            <div
              className="guide-hero-splash"
              id="itemsRunesHeroBanner"
              style={{
                backgroundImage:
                  "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg')"
              }}
            ></div>
            <div
              className="guide-hero-splash guide-hero-splash-secondary"
              id="itemsRunesHeroBannerSecondary"
            ></div>
            <div className="guide-hero-overlay"></div>
            <div className="guide-hero-info">
              <nav className="breadcrumb" aria-label="面包屑导航">
                <a href="/">首页</a>
                <span className="separator">/</span>
                <span className="current">符文与装备</span>
              </nav>
              <h1 className="guide-hero-title">符文与装备系统</h1>
              <p className="guide-hero-subtitle">符文大陆的核心机制</p>
              <div className="guide-hero-roles">
                <span className="role-tag role-fighter">符文系统</span>
                <span className="role-tag role-mage">装备系统</span>
              </div>
              <div className="banner-dots" id="itemsRunesBannerDots" aria-label="英雄背景轮播"></div>
            </div>
          </header>

          <div className="guide-quick-nav">
            {quickNav.map(([href, icon, label]) => (
              <a href={href} className="quick-nav-item" key={href}>
                <span className="quick-nav-icon">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>

          <section className="guide-section" id="runes">
            <SectionTitle icon="⚡" title="符文系统概览" subtitle="符文大陆的基石力量，分为五大主系" />
            <div className="playstyle-cards">
              {runeOverview.map(([icon, title, desc, tag, difficulty, body, items]) => (
                <article className="playstyle-card-full" key={title}>
                  <div className="playstyle-card-header">
                    <span className="playstyle-icon">{icon}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                    <span className={`difficulty-tag ${difficulty}`}>{tag}</span>
                  </div>
                  <div className="playstyle-card-body">
                    <p>{body}</p>
                    <ul className="checklist">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {runeSections.map((section) => (
            <section className="guide-section" id={section.id} key={section.id}>
              <SectionTitle icon={section.icon} title={section.title} subtitle={section.subtitle} />
              <div className="abilities-guide">
                {section.cards.map(([title, desc, heroes]) => (
                  <div className="ability-card" key={title}>
                    <div className="ability-key">基石</div>
                    <div className="ability-info">
                      <h3>{title}</h3>
                      <p className="ability-desc">{desc}</p>
                      <div className="ability-tips">
                        <h4>适用英雄</h4>
                        <ul>
                          {heroes.map((hero) => (
                            <li key={hero}>✅ {hero}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="guide-section" id="all-items">
            <SectionTitle
              icon="🧾"
              title="官方全部装备图鉴"
              subtitle="正在从 Riot 官方 Data Dragon 加载召唤师峡谷可购买装备..."
            />
            <p className="section-subtitle" id="allItemsSummary">
              正在从 Riot 官方 Data Dragon 加载召唤师峡谷可购买装备...
            </p>
            <div className="all-items-controls">
              <input
                id="allItemsSearch"
                type="search"
                placeholder="搜索装备名称..."
                aria-label="搜索装备名称"
              />
              <select id="allItemsType" aria-label="筛选装备类型">
                <option value="all">全部类型</option>
                <option value="物理">物理输出</option>
                <option value="法术">法术输出</option>
                <option value="防御">防御坦克</option>
                <option value="鞋子">鞋子</option>
                <option value="辅助">辅助</option>
                <option value="打野">打野</option>
                <option value="功能">功能装备</option>
              </select>
            </div>
            <div className="all-items-grid" id="allItemsCatalog"></div>
          </section>

          <section className="guide-section">
            <SectionTitle icon="📋" title="常见英雄符文装备搭配" />
            <div className="knowledge-grid two-col">
              {buildTemplates.map(([title, items]) => (
                <article className="knowledge-card" key={title}>
                  <h3>{title}</h3>
                  <ul className="checklist">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <div className="guide-footer-nav">
            <a href="/" className="back-link">
              ← 返回首页
            </a>
            <a href="/strategy-center.html" className="back-link">
              前往攻略中心 →
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
