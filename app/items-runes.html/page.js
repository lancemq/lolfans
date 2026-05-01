import { ItemsRunesCatalog, ItemsRunesHeroHeader } from '../../components/items-runes-interactive';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { SectionTitle } from '../../components/shared';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '符文与装备',
  description:
    '英雄联盟符文与装备系统详解，围绕基石符文、装备选择逻辑、对局应对与官方装备图鉴，帮助你更稳定地完成对局构筑。',
  path: '/items-runes.html'
});

const quickNav = [
  ['#overview', '◎', '构筑总览'],
  ['#runes', '⚡', '符文系统'],
  ['#item-logic', '🧭', '出装逻辑'],
  ['#precision', '⚔️', '精密系'],
  ['#domination', '🔥', '主宰系'],
  ['#sorcery', '✨', '巫术系'],
  ['#resolve', '🛡️', '坚决系'],
  ['#inspiration', '💡', '启迪系'],
  ['#all-items', '🎒', '全部装备']
];

const overviewCards = [
  {
    title: '先看对局目标',
    text: '符文决定你想怎么赢这局，装备决定你能不能把这种赢法稳定打出来。先明确自己是打对线、打爆发、打持续输出，还是补团队功能。'
  },
  {
    title: '再看敌方威胁',
    text: '对手是多控制、多回复、双前排、三刺客还是远程消耗，这些信息会直接决定你的鞋子、防御件和功能件。'
  },
  {
    title: '最后做滚动修正',
    text: '领先时补强节奏和伤害，均势时保证成型曲线，落后时优先做能让你活下来并继续清线或保人的装备。'
  }
];

const runeOverview = [
  [
    '⚔️',
    '精密系',
    '强化持续输出与长回合战斗',
    '适合射手/战士',
    'easy',
    '精密系更适合依赖普攻、需要长时间站场或靠连续技能叠收益的英雄。常见基石会围绕持续输出、拉扯续航与收尾能力展开。',
    ['适合定位：射手、战士、部分近战核心', '常见收益：攻速、持续伤害、斩杀或续航', '判断标准：你是否能稳定打满第二轮输出']
  ],
  [
    '🔥',
    '主宰系',
    '强调爆发、先手与滚雪球',
    '适合刺客/爆发打野',
    'medium',
    '主宰系适合短时间内完成伤害结算的英雄，尤其是刺客、中野联动和需要利用先手窗口完成击杀的对局。',
    ['适合定位：刺客、爆发型打野、强先手中单', '常见收益：爆发、穿透、击杀后收益', '判断标准：你能否稳定找到先手秒杀窗口']
  ],
  [
    '✨',
    '巫术系',
    '提升技能频率、消耗与拉扯能力',
    '适合法师/消耗辅助',
    'medium',
    '巫术系更偏向技能命中收益、法力管理和节奏拉扯，适合依靠技能消耗、控制和中距离压制的英雄。',
    ['适合定位：法师、消耗辅助、部分功能中单', '常见收益：技能急速、法力、消耗伤害', '判断标准：你是否靠技能节奏而非贴脸站撸赢线']
  ],
  [
    '🛡️',
    '坚决系',
    '提升生存、抗压与团战容错',
    '适合坦克/保护型辅助',
    'easy',
    '坚决系更强调换血容错、硬度和团队保护。当你要承担前排、反开、保后排或抗压对线时，优先考虑这一系。',
    ['适合定位：坦克、功能辅助、抗压上单', '常见收益：双抗、生命、反手收益', '判断标准：你是否是队伍里要先吃技能的人']
  ],
  [
    '💡',
    '启迪系',
    '强调经济、节奏与对局适配',
    '适合功能玩法',
    'hard',
    '启迪系不是单纯提高面板，而是通过额外经济、召唤师技能变化或节奏工具，帮助你更灵活地应对局势。',
    ['适合定位：功能中单、辅助、特定战术英雄', '常见收益：经济、冷却、节奏工具', '判断标准：你是否需要更高的局外策略空间']
  ]
];

const runeSections = [
  {
    id: 'precision',
    icon: '⚔️',
    title: '精密系符文详解',
    subtitle: '适合依赖普攻、持续换血与长回合站场的英雄',
    cards: [
      [
        '强攻',
        '更适合打短换血和前中期对拼。能够稳定连到三次攻击或技能触发时，能帮你更快建立对线主动权。',
        ['适合射手与部分战士对线期打压制', '当你要配合辅助或打野快速集火时价值更高']
      ],
      [
        '致命节奏',
        '更适合高频普攻、拉扯站场和持续输出环境。对需要长时间保持攻击节奏的射手和部分近战核心很友好。',
        ['适合后排持续输出英雄', '敌方前排较厚、团战时间更长时收益更稳定']
      ],
      [
        '迅捷步法',
        '偏向续航和对线容错。面对强消耗、手长压制或你需要更稳健过渡发育期时，是更适合新手的选择。',
        ['适合对线期容易被压血的射手', '也适合需要边打边拉开的部分中上英雄']
      ]
    ]
  },
  {
    id: 'domination',
    icon: '🔥',
    title: '主宰系符文详解',
    subtitle: '适合需要先手、爆发和滚雪球的对局',
    cards: [
      [
        '电刑',
        '当你能在短时间内稳定打出一套技能时，电刑仍然是最直接的爆发选择。适合刺客与节奏中野。',
        ['适合中单刺客、爆发型打野', '你的目标是抢先手并快速完成击杀']
      ],
      [
        '丛刃',
        '适合依赖前三次普攻快速起手的英雄。对需要短窗口完成一轮高频普攻的打法很有效。',
        ['适合部分刺客与近战战士', '更强调爆发起手，而非长回合拉扯']
      ],
      [
        '掠食者/节奏型方案',
        '这类选择更看重跑图、游走和先手覆盖范围。适合喜欢用行动半径影响边路的玩家。',
        ['适合支援型中单与节奏打野', '当对局更需要你先到场，而不是先打满伤害']
      ]
    ]
  },
  {
    id: 'sorcery',
    icon: '✨',
    title: '巫术系符文详解',
    subtitle: '适合依赖技能命中、持续消耗与法力管理的英雄',
    cards: [
      [
        '奥术彗星',
        '适合技能射程长、命中率稳定的法师和消耗辅助。你的价值在于把对线血量慢慢拉开。',
        ['适合远程消耗英雄', '对手缺少高机动性时命中收益更高']
      ],
      [
        '召唤艾黎',
        '在对线频繁消耗或需要保护队友时非常稳定。比起赌爆发，更强调每次技能交换都赚钱。',
        ['适合法师、软辅、部分上单消耗位', '当你想提高每一波短换血的稳定收益']
      ],
      [
        '相位猛冲',
        '适合进出战场节奏要求高的英雄。它不是为了多打伤害，而是为了打完一轮之后还能走出危险区域。',
        ['适合需要近身后再拉开的法师与战士', '面对黏人阵容或需要保命拉扯时很有价值']
      ]
    ]
  },
  {
    id: 'resolve',
    icon: '🛡️',
    title: '坚决系符文详解',
    subtitle: '适合承担前排、反手和保护职责的英雄',
    cards: [
      [
        '不灭之握',
        '适合频繁短换血的近战上单。你能不断靠普攻换回状态，并逐步把对线优势变成血量与压线权。',
        ['适合坦克或半肉上单', '面对近战对线时最容易稳定触发']
      ],
      [
        '余震',
        '当你的英雄带稳定控制，且团战职责是先手或反手时，余震能显著提高进场容错。',
        ['适合硬辅与开团坦克', '对局越需要你先吃技能，余震越有价值']
      ],
      [
        '守护者',
        '偏保护型思路，强调保后排和抗第一轮伤害。当队友是核心输出点时，守护者的价值非常稳定。',
        ['适合软辅与保护型前排', '双C 发育良好、需要你兜底时优先考虑']
      ]
    ]
  },
  {
    id: 'inspiration',
    icon: '💡',
    title: '启迪系符文详解',
    subtitle: '适合看重经济与战术灵活性的英雄',
    cards: [
      [
        '先攻',
        '当你能稳定先手打到对方，先攻能把消耗和爆发都转化成经济。适合有中距离压制能力的英雄。',
        ['适合部分中单、长手上单与节奏打野', '你需要能稳定先手，而不是被迫后手反打']
      ],
      [
        '启封的秘籍',
        '更偏战术型选择。它提高的是召唤师技能应对面而不是伤害面板，适合熟悉对局节奏后再使用。',
        ['适合功能中单、辅助', '更适合已经理解对局节点的玩家']
      ]
    ]
  }
];

const decisionCards = [
  {
    title: '先做哪一件',
    steps: ['你要先抢线权，就做战力最直接的组件', '你要稳住对线，就优先续航、鞋子或解控', '你要打第一波资源团，就保证第一件能在那之前成型']
  },
  {
    title: '鞋子怎么选',
    steps: ['对面控制和普攻威胁高，优先提高容错', '技能型消耗多，优先补机动和法术抗性思路', '领先局也不要无脑贪输出鞋，先看谁能切到你']
  },
  {
    title: '什么时候补功能件',
    steps: ['敌方回复高，尽早考虑重伤', '敌方前排厚，尽早安排破甲或法穿', '敌方刺客强，第二或第三件就要开始考虑保命']
  }
];

const itemPrinciples = [
  ['爆发型构筑', '适合刺客、爆发法师和需要抢先手的阵容。目标是在第一轮技能里完成击杀，不把战斗拖长。'],
  ['持续输出构筑', '适合射手、站场战士和部分法核。优先保证攻速、技能循环或站场续航，让你在第二轮、第三轮输出里继续强势。'],
  ['抗压容错构筑', '适合坦克、保护型辅助以及发育偏慢的核心位。目标不是打最高伤害，而是保证自己能活到关键团并完成职责。'],
  ['功能反制构筑', '包括减治疗、破盾、解控、保排与推进。很多局输赢不在于面板高低，而在于你是否补了正确的对策件。']
];

const buildTemplates = [
  {
    title: '射手通用判断模板',
    summary: '核心不是死记某 3 件套，而是判断这局更需要站得住、打得穿还是先活下来。',
    items: ['顺风：优先扩大中期输出曲线', '均势：平衡伤害、攻速与生存', '逆风：先保证团战存活和清线效率'],
    notes: ['面对双前排，尽早安排穿透', '面对强开阵容，保命件与鞋子优先级会上升'],
    examples: '卡莎：攻速鞋→鬼索→飓风→无尽→穿甲弓→复活甲。EZ：魔切→冰脉护手→破败→赛瑞尔达→穿甲→水银鞋。'
  },
  {
    title: '上单判断模板',
    summary: '上单构筑取决于你的英雄定位——是打线杀、打团坦还是打分带。',
    items: ['线杀型：伤害优先，利用经济差碾压', '坦克型：双抗与血量平衡，根据对面伤害类型调整', '分带型：攻速与回复兼顾，保证持续作战能力'],
    notes: ['上路装备选择要看对面打野的威胁程度', '单人线节奏慢，第一件装备的选择最重要'],
    examples: '德莱厄斯：焚天→护手→死亡之舞→兰顿→自然之力→护甲鞋。剑魔：无穷饥渴→护手→死舞→复活甲→振奋→护甲鞋。'
  },
  {
    title: '打野判断模板',
    summary: '打野的装备选择要考虑清野效率、gank成功率和团战定位。',
    items: ['节奏型：优先穿甲与减CD，最大化前期影响力', '刷子型：攻速与AOE清野装，快速积累经济', '坦克型：双抗与生命值，承担前排职责'],
    notes: ['打野经济通常低于线上，选择性价比高的装备', '前期优先补输出装保证击杀效率'],
    examples: '李青：幽梦→赛瑞尔达→死舞→复活甲→夜之锋刃→穿甲鞋。螳螂：黯影阔剑→幽梦→赛瑞尔达→夜刃→复活甲→穿甲鞋。'
  },
  {
    title: '法师通用判断模板',
    summary: '法师出装要在伤害、法力和生存之间找平衡。先看你是打对线压制、先手爆发还是团战持续消耗。',
    items: ['压线型：优先法力与技能频率', '爆发型：优先法强与穿透', '功能型：优先控制、保命或减速类收益'],
    notes: ['敌方刺客多时，不要把保命件拖得太后', '敌方魔抗堆得快，法穿收益会更明显'],
    examples: '阿狸：卢登→影焰→法穿杖→帽子→女妖→CD鞋。拉克丝：卢登→影焰→视界专注→帽子→法穿杖→CD鞋。'
  },
  {
    title: '辅助判断模板',
    summary: '辅助的构筑围绕视野、开团、保人和团队增益展开。越早明确职责，出装越不会乱。',
    items: ['硬辅：优先开团容错和功能主动装', '软辅：优先保护、回复或强化队友输出', '游走辅助：优先机动与节奏工具'],
    notes: ['对局拖得越久，主动功能件越值钱', '如果双 C 是主要赢点，优先围绕他们出装'],
    examples: '锤石：钢铁烈阳→基克→骑士之誓→救赎→坩埚→CD鞋。露露：月石再生器→香炉→流水法杖→救赎→女妖→CD鞋。'
  }
];

export default function ItemsRunesPage() {
  return (
    <>
      <SiteHeader active="items-runes" />

      <main className="hero-guide-page">
        <div className="container">
          <ItemsRunesHeroHeader />

          <div className="guide-quick-nav">
            {quickNav.map(([href, icon, label]) => (
              <a href={href} className="quick-nav-item" key={href}>
                <span className="quick-nav-icon">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>

          <section className="guide-section" id="overview">
            <SectionTitle icon="◎" title="构筑总览" subtitle="把“选符文”和“出装备”放进同一个决策框架里理解。" />
            <div className="editorial-grid editorial-grid-3">
              {overviewCards.map((card) => (
                <article className="editorial-card" key={card.title}>
                  <span className="editorial-card-index">{card.title}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" id="runes">
            <SectionTitle icon="⚡" title="符文系统概览" subtitle="五大主系并不是“强弱排名”，而是五种完全不同的胜利方法。" />
            <div className="playstyle-cards">
              {runeOverview.map(([icon, title, desc, tag, difficulty, body, items]) => (
                <article className="playstyle-card-full editorial-surface" key={title}>
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

          <section className="guide-section" id="item-logic">
            <SectionTitle icon="🧭" title="出装逻辑" subtitle="出装本质上是把金币换成你最需要的那一种胜率。" />
            <div className="editorial-grid editorial-grid-3">
              {decisionCards.map((card) => (
                <article className="decision-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <ol className="ordered-list">
                    {card.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
            <div className="editorial-grid editorial-grid-2">
              {itemPrinciples.map(([title, text]) => (
                <article className="knowledge-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
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
                        <h4>使用提示</h4>
                        <ul>
                          {heroes.map((hero) => (
                            <li key={hero}>{hero}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="guide-section">
            <SectionTitle icon="📋" title="常见位置构筑模板" subtitle="给你的是判断框架，不是必须一模一样照抄的清单。" />
            <div className="editorial-grid editorial-grid-2">
              {buildTemplates.map((template) => (
                <article className="build-template-card" key={template.title}>
                  <h3>{template.title}</h3>
                  <p>{template.summary}</p>
                  <ul className="checklist">
                    {template.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {template.examples && (
                    <div className="build-template-examples">
                      <span className="examples-label">英雄示范</span>
                      <p>{template.examples}</p>
                    </div>
                  )}
                  <div className="build-template-note">
                    {template.notes.map((note) => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <ItemsRunesCatalog />

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
