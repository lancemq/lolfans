import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '新手指南',
  description:
    '面向新玩家的英雄联盟入门手册，覆盖地图目标、五个位置、基础操作、对局节奏、推荐英雄与训练计划，帮助你更快建立正确的游戏框架。',
  path: '/guide.html'
});

const quickNav = [
  ['#basics', '◎', '入门全景'],
  ['#map', '🗺️', '地图机制'],
  ['#roles', '🎯', '五个位置'],
  ['#champions', '🧑‍🏫', '推荐英雄'],
  ['#skills', '🛠️', '操作基础'],
  ['#timeline', '⏱️', '对局节奏'],
  ['#practice', '📈', '练习计划'],
  ['#faq', '❓', '常见问题']
];

const introCards = [
  {
    title: '这是一个 5v5 团队策略游戏',
    text: '《英雄联盟》的核心目标是和队友一起推进至少一条兵线、摧毁防御塔与水晶兵营，最终击破敌方主堡。这个结构来自 Riot 官方 How to Play 指南。'
  },
  {
    title: '你不需要一开始懂所有英雄',
    text: '新手最先建立的不是“全部知识”，而是地图、资源和自己位置职责的基本框架。只要这三件事稳住，上手速度会快很多。'
  },
  {
    title: '学会少犯错，比秀操作更重要',
    text: '新手阶段提升最快的方法是补刀更稳、少无视野前压、资源团提前到场，而不是一味追求复杂连招。'
  }
];

const mapCards = [
  ['主堡与兵线', '主堡是双方基地核心。你需要先清出至少一条路，推掉沿线防御塔与水晶兵营，才能接近敌方主堡。', ['每条线有三座防御塔与一个水晶兵营', '推进时要让己方小兵先顶塔', '兵线越好，越容易转资源和做视野']],
  ['野区与中立资源', '三路之间的野区不是“可有可无”的空地，而是打野发育、转线、做视野和争夺资源的主战场。', ['重要资源包括小龙、峡谷先锋、男爵', '草丛与河道视野决定你敢不敢往前走', '野区路线也影响中单和辅助的游走效率']],
  ['成长系统', '英雄会通过经验升级，通过金币购买装备。等级领先会提高技能强度，经济领先会让你更快成型。', ['经验主要来自兵线、野怪和击杀参与', '金币来自补刀、击杀、助攻、防御塔和任务', '回城买装备是每个阶段的关键节奏点']]
];

const roleCards = [
  ['上路', '单人抗压线', '更强调对线细节、换血与边线牵制。很多上单既要会开团，也要会在边路承压。', ['先学会补刀与控线', '团战前想清楚自己是进场还是保排', '不要在无视野情况下压得太深']],
  ['打野', '节奏发动机', '负责刷野、支援和资源控制。打野的关键不是“抓得多”，而是能不能让关键时间点有人数和视野优势。', ['优先学固定刷野路线', '第一条河道资源和第一轮 gank 更重要', '不要为了抓人把自己节奏抓崩']],
  ['中路', '支援中枢', '中路路线最短，方便转线支援。中单既要会处理兵线，也要知道何时离线去帮助边路或打野。', ['先保证能推线再谈游走', '看不到打野时不要随意越河道', '中期要多参与河道与资源团']],
  ['射手', '持续输出位', '大多数时间都在练补刀、站位和团战输出顺序。射手的核心不是先打谁，而是先活下来。', ['前期优先稳定补刀', '没有视野不要单独吃长线', '团战先打能打到的目标']],
  ['辅助', '信息与保护位', '负责视野、开团、保人和游走。辅助的价值往往体现在“让队友更容易打”而不是个人数据。', ['学会在回城后补眼和换扫描', '不要一直黏在下路不动', '团战前比输出更重要的是站位和技能目标']]
];

const championCards = [
  ['上路', ['盖伦：技能直接，容错高，适合学习对线和进退时机', '墨菲特：团战职责明确，容易理解“先手开团”', '内瑟斯：帮助新手理解补刀与发育的长期价值']],
  ['打野', ['阿木木：刷野和开团思路清晰，团战价值稳定', '沃里克：续航强、抓人直观，适合理解追击节奏', '努努和威朗普：路径与控图目标明确，易建立资源意识']],
  ['中路', ['安妮：技能组简单，能快速理解爆发和先手', '拉克丝：射程长，适合学习技能命中和安全站位', '玛尔扎哈：兵线处理清楚，能帮助新手理解中期功能价值']],
  ['射手', ['艾希：技能直观，能同时学会开团和拉扯', '凯特琳：手长，便于建立对线距离感', '崔丝塔娜：推塔明确，帮助理解节奏与收割窗口']],
  ['辅助', ['索拉卡：帮助你快速理解保护与站位', '蕾欧娜：开团目标非常清晰，适合学习先手时机', '璐璐：练保护、反手和给核心位提供空间']]
];

const skillCards = [
  ['补刀', ['你只有拿到最后一下，才会得到完整小兵金币', '10 分钟 60-80 刀是新手阶段很实用的基准', '进塔刀节奏要单独练，尤其是远程兵']],
  ['走位', ['普攻或技能后立刻移动，减少原地站桩时间', '不要为了多打一下走进对手整套技能范围', '往有视野的一侧移动，安全性会更高']],
  ['技能释放', ['先练最稳定的一套连招，不要一开始追求复杂操作', '指向性技能更适合新手建立节奏', '技能空了就及时后撤，不要硬打下一波']],
  ['视野与信号', ['河道草、三角草和资源坑前是高优先级眼位', '学会用信号提醒敌人消失和资源集合', '没有视野时，默认危险而不是默认安全']]
];

const timelineRows = [
  ['0-10 分钟', '补刀、血量和线权', '学会稳定发育，不无脑换血，不随意越线', '兵线过深就要开始担心被抓'],
  ['10-20 分钟', '先锋、小龙与一塔', '围绕第一轮资源团做决策，别只盯着个人对线', '赢团后要记得转塔、龙或视野'],
  ['20-30 分钟', '中路兵线、男爵视野、边线牵制', '中期最怕赢了团却不知道做什么', '清线、抱团和资源转化比追人更重要'],
  ['30 分钟后', '站位、技能冷却、关键资源', '后期一波失误可能直接结束比赛', '先保证阵型完整，再考虑开团']
];

const practiceCards = [
  {
    title: '第一周：建立稳定感',
    items: [
      'Day1-2：固定 1 条主玩位置和 2 个英雄',
      'Day3：只练补刀和回城时机',
      'Day4：练习基础连招与技能命中',
      'Day5：学会 3 个常用防守眼位',
      'Day6-7：打匹配，把目标限制在“少死”和“准时到资源团”'
    ]
  },
  {
    title: '第二周：开始理解节奏',
    items: [
      'Day8-9：学会根据兵线决定是否支援',
      'Day10：复盘 1 局，记录 2 次不该死的原因',
      'Day11：学会判断顺风、均势、逆风该怎么玩',
      'Day12-13：练资源团站位与信号沟通',
      'Day14：整理自己的“开局 10 分钟 checklist”'
    ]
  }
];

const faqRows = [
  ['我需要先会很多英雄再去匹配吗？', '不需要。先固定 1 个位置和 2 个英雄，学习速度会明显更快。'],
  ['新手一定要玩输出位吗？', '不一定。上单坦克和辅助反而更容易帮你建立团队与地图意识。'],
  ['为什么我补刀不错还是常输？', '因为补刀只是基础。你还需要把优势转成塔、龙、先锋和视野。'],
  ['什么时候该参团？', '资源刷新前、队友已经集合、兵线可接受时就该靠拢，而不是一直单带到底。'],
  ['最值得先改掉的坏习惯是什么？', '无视野压线、残血不回城、打赢团不转资源，这三件事最伤胜率。']
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

export default function GuidePage() {
  return (
    <>
      <SiteHeader active="guide" />

      <main className="hero-guide-page">
        <div className="container">
          <header className="guide-hero-header guide-hero-header-rich newbie-guide-header">
            <div
              className="guide-hero-splash"
              style={{
                backgroundImage:
                  "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg')"
              }}
            ></div>
            <div className="guide-hero-overlay"></div>
            <div className="guide-hero-overlay guide-hero-overlay-mesh"></div>
            <div className="guide-hero-info">
              <nav className="breadcrumb" aria-label="面包屑导航">
                <a href="/">首页</a>
                <span className="separator">/</span>
                <span className="current">新手指南</span>
              </nav>
              <div className="guide-hero-grid">
                <div className="guide-hero-copy">
                  <span className="guide-kicker">Starter Handbook</span>
                  <h1 className="guide-hero-title">新手指南</h1>
                  <p className="guide-hero-subtitle">把复杂的峡谷拆成一套你能立刻照着练的入门路径。</p>
                  <div className="guide-hero-roles">
                    <span className="role-tag role-mage">地图基础</span>
                    <span className="role-tag role-fighter">位置职责</span>
                    <span className="role-tag role-support">训练方法</span>
                  </div>
                </div>
                <aside className="guide-hero-panel">
                  <span className="guide-panel-tag">新手优先级</span>
                  <ol className="guide-panel-list">
                    <li>先学地图和目标，不急着追求华丽操作</li>
                    <li>先固定 1 个位置和 2 个英雄</li>
                    <li>先把补刀、少死、资源集合练稳</li>
                  </ol>
                </aside>
              </div>
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

          <section className="guide-section" id="basics">
            <SectionTitle icon="◎" title="入门全景" subtitle="先建立正确框架，再补充细节知识，效率会高很多。" />
            <div className="editorial-grid editorial-grid-3">
              {introCards.map((card) => (
                <article className="editorial-card" key={card.title}>
                  <span className="editorial-card-index">{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" id="map">
            <SectionTitle icon="🗺️" title="地图与核心机制" subtitle="Riot 官方新手页强调的核心，就是路线推进、野区资源和成长系统。" />
            <div className="editorial-grid editorial-grid-3">
              {mapCards.map(([title, text, items]) => (
                <article className="knowledge-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ul className="checklist">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" id="roles">
            <SectionTitle icon="🎯" title="五个位置" subtitle="你不需要每个位置都精通，但最好知道每个位置在队伍里负责什么。" />
            <div className="editorial-grid editorial-grid-2">
              {roleCards.map(([title, tag, text, items]) => (
                <article className="role-focus-card" key={title}>
                  <div className="role-focus-head">
                    <h3>{title}</h3>
                    <span>{tag}</span>
                  </div>
                  <p>{text}</p>
                  <ul className="checklist">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" id="champions">
            <SectionTitle icon="🧑‍🏫" title="新手推荐英雄" subtitle="优先选技能明确、容错高、职责清楚的英雄，学习会更快。" />
            <div className="editorial-grid editorial-grid-2">
              {championCards.map(([title, items]) => (
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

          <section className="guide-section" id="skills">
            <SectionTitle icon="🛠️" title="操作基础" subtitle="真正决定新手舒适度的，是这些最基础、最常重复的动作。" />
            <div className="editorial-grid editorial-grid-2">
              {skillCards.map(([title, items]) => (
                <article className="decision-card" key={title}>
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

          <section className="guide-section" id="timeline">
            <SectionTitle icon="⏱️" title="对局节奏" subtitle="每个时间段都有不同重点，知道自己现在该做什么，比忙乱更重要。" />
            <div className="meta-table-wrap">
              <table className="meta-table">
                <thead>
                  <tr>
                    <th>阶段</th>
                    <th>关键目标</th>
                    <th>你要做什么</th>
                    <th>最常见错误</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineRows.map((row) => (
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

          <section className="guide-section" id="practice">
            <SectionTitle icon="📈" title="两周练习计划" subtitle="练习不是多打几局，而是每几天只盯住一个可以执行的目标。" />
            <div className="editorial-grid editorial-grid-2">
              {practiceCards.map((card) => (
                <article className="decision-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <ol className="ordered-list">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" id="faq">
            <SectionTitle icon="❓" title="常见问题" subtitle="这几件事是新玩家最容易卡住的地方。" />
            <div className="meta-table-wrap">
              <table className="meta-table">
                <thead>
                  <tr>
                    <th>问题</th>
                    <th>解答</th>
                  </tr>
                </thead>
                <tbody>
                  {faqRows.map(([question, answer]) => (
                    <tr key={question}>
                      <td>{question}</td>
                      <td>{answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="guide-section">
            <SectionTitle icon="🔗" title="参考来源" subtitle="以下内容主要参考 Riot 官方玩法页的基础机制说明，并结合现有站内结构重写为新手可执行版本。" />
            <div className="knowledge-card">
              <ul className="checklist source-links">
                <li>
                  <a href="https://www.leagueoflegends.com/zh-tw/how-to-play/" target="_blank" rel="noopener noreferrer">
                    League of Legends How to Play（繁中官方）
                  </a>
                </li>
                <li>
                  <a href="https://www.leagueoflegends.com/en-us/how-to-play/" target="_blank" rel="noopener noreferrer">
                    League of Legends How to Play（英文官方）
                  </a>
                </li>
                <li>
                  <a href="https://www.leagueoflegends.com/en-us/" target="_blank" rel="noopener noreferrer">
                    League of Legends 官网首页角色分类与模式说明
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
