import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '攻略中心',
  description:
    '英雄联盟最全攻略，涵盖五路打法、对线技巧、团战思路、排位上分指南。版本强势英雄推荐，阵容搭配分析，助您快速提升水平。',
  path: '/strategy-center.html'
});

const featuredRoutes = [
  {
    href: '/meta-report.html',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg',
    alt: '当前版本强势英雄榜',
    title: '版本观察',
    description: '按 2026 年 3 月 21 日的 26.6 版本基准，区分稳分选择、上升观察名单和降优先级英雄。'
  },
  {
    href: '/draft.html',
    image: '/images/strategy/draft-banner.svg',
    alt: '阵容搭配思路',
    title: '阵容搭配',
    description: '从前排结构、伤害曲线到开团链条，先判断阵容怎么赢。'
  },
  {
    href: '/macro.html',
    image: '/images/strategy/macro-banner.svg',
    alt: '中期运营路线',
    title: '中期运营',
    description: '围绕兵线、资源和视野，把优势转成更稳定的地图收益。'
  },
  {
    href: '/training.html',
    image: '/images/strategy/training-banner.svg',
    alt: '14天训练模板',
    title: '训练模板',
    description: '把补刀、站位、复盘和资源决策拆成可执行的训练计划。'
  }
];

const heroGuides = [
  ['yasuo', '疾风剑豪 亚索', '中单爆发/上单战士/辅助游走 三种打法详解'],
  ['zed', '影流之主 劫', '中单爆发/Poke消耗 两种打法详解'],
  ['riven', '放逐之刃 锐雯', '上单爆发/战士 两种打法详解'],
  ['vayne', '暗夜猎手 薇恩', 'ADC发育/上单压制 两种打法详解'],
  ['irelia', '刀锋舞者 艾瑞莉娅', '上单战士/中单刺客 两种打法详解'],
  ['talon', '刀锋之影 泰隆', '中单刺客/打野Gank 两种打法详解'],
  ['mordekaiser', '暗影巨头 莫德凯撒', '上单战士/中单法师 两种打法详解'],
  ['camille', '青钢影 卡密尔', '上单战士/打野Gank 两种打法详解'],
  ['renekton', '荒漠屠夫 雷克顿', '上单战士/半肉坦克 两种打法详解'],
  ['fizz', '潮汐海灵 菲兹', '中单刺客/AP战士 两种打法详解'],
  ['katarina', '不祥之刃 卡特琳娜', '中单刺客 打法详解'],
  ['ekko', '时间刺客 艾克', '打野/中单 两种打法详解'],
  ['yone', '封魔剑魂 永恩', '中单战士 打法详解'],
  ['vi', '皮城执法官 蔚', '打野 打法详解'],
  ['rengar', '傲之追猎者 雷恩加尔', '打野/上单 两种打法详解']
];

const tierSections = [
  {
    title: '上单 T0/T1 梯队',
    items: [
      'T0：狗头、鳄鱼、诺手、剑魔、亚索',
      'T1：腕豪、格温、永恩、武器、刀妹',
      '核心思路：狗头因强度过高必上 ban 位，推荐优先选择诺手和剑魔。亚索操作难度较高，需熟练后再使用。'
    ]
  },
  {
    title: '打野 T0/T1 梯队',
    items: [
      'T0：瞎子、螳螂、男枪、小鱼人',
      'T1：雪人、寡妇、赵信、奥拉夫、锐雯、剑圣',
      '核心思路：小鱼人需注重前期发育，中后期可实现秒杀效果，适合运营型玩家。'
    ]
  },
  {
    title: '中单 T0/T1 梯队',
    items: [
      'T0：劫、刀妹、永恩、狗头、天使',
      'T1：卡牌、阿狸、皎月、卡特、小法',
      '核心思路：优先选择狗头，若无法获得则推荐天使，其前期需猥琐发育，后期远程爆发极强。'
    ]
  },
  {
    title: '射手 T0/T1 梯队',
    items: [
      'T0：卡莎、维鲁斯、EZ、飞机、女警',
      'T1：VN、金克斯、奥巴马、德莱文、小炮',
      '核心思路：射手强度差异较小，建议根据个人熟练度选择，卡莎和维鲁斯为当前版本首选。'
    ]
  },
  {
    title: '辅助 T0/T1 梯队',
    items: [
      'T0：锤石、机器人、日女、布隆',
      'T1：风女、露露、娜美、泰坦',
      '核心思路：硬辅依然是版本主流，开团能力强的辅助在团战中更具价值。'
    ]
  }
];

const sectionBlocks = [
  {
    title: '对线进阶技巧',
    subtitle: '掌握核心对线技巧，从细节处建立优势',
    cols: 'three-col',
    cards: [
      {
        title: '抢二技巧',
        text: '对线期的第一个关键节点。开场直接打后排兵，抢先到2级可打一套技能建立血量优势。注意观察敌方补刀节奏，预判其走位。',
        items: ['开场直接 A 最后排小兵', '保持高频普攻不贪刀', '2级瞬间学技能压血线']
      },
      {
        title: '控线与推线',
        text: '根据对线情况选择控线或推线策略。优势推线扩大镀层收益，劣势控线防止被 gank。',
        items: ['优势：快速推线进塔压镀层', '均势：控线等打野 gank', '劣势：保持兵线在塔前']
      },
      {
        title: '换血时机',
        text: '对线换血的核心是“赚多赔少”。利用敌方补刀间隙出手，确保技能命中全身而退。',
        items: ['敌方补刀时出手', '我方小兵仇恨间隙', '确保有位移或治疗可撤退']
      }
    ]
  },
  {
    title: '视野控制体系',
    subtitle: '视野是高端局的胜负关键，合理布置眼位可大幅提升胜率',
    cols: 'two-col',
    cards: [
      {
        title: '基础眼位教学',
        items: [
          '河道草丛：最重要的防守眼位，侦查敌方打野动向',
          '三角草丛：防止敌方绕后 gank，ADC 必争之地',
          '敌方野区入口：获取敌方打野刷野路线信息',
          '龙坑入口：资源团前必争视野',
          '大小龙坑：劣势局关键防守位置'
        ]
      },
      {
        title: '辅助眼石策略',
        items: [
          '前期：保证河道视野，防 gank 为主',
          '中期：跟随团队节奏，控制关键草丛',
          '后期：劣势局做防守眼，优势局做进攻眼',
          '扫描使用：团战前排眼，野区入侵前排眼',
          '控制守卫：关键资源点必插，防止被排'
        ]
      }
    ]
  },
  {
    title: '兵线运营详解',
    subtitle: '兵线处理是决定胜负的核心因素之一',
    cols: 'two-col',
    cards: [
      {
        title: '优势局兵线',
        items: [
          '推完下一塔后，双人组换至上路压制敌方弱势线',
          '配合峡谷先锋快速破塔，经济差可扩大 40% 以上',
          '边路带线深度要控制好，防止被敌方多人抓单',
          '大龙逼团时，保证三路兵线同时到达'
        ]
      },
      {
        title: '劣势局兵线',
        items: [
          '中单换下路支援防御，利用防御塔减伤机制',
          '边路带线不宜过深，一塔被破后带至二塔附近',
          '二塔被破后带至高地附近，避免深入',
          '清完兵线再支援，不可盲目接团'
        ]
      }
    ]
  },
  {
    title: '防御塔攻略',
    subtitle: '防御塔是游戏中最重要的战略资源',
    cols: 'two-col',
    cards: [
      {
        title: '推塔策略',
        items: [
          '中间的外一塔要比上下的外一塔加一起还重要',
          '推塔时在敌人塔视野边缘放眼，可扩大优势',
          '塔的攻击范围是以塔为中心点的圆，贴着侧边走受伤害最小',
          '塔永远会打在视野内第一个攻击敌方的人',
          '把塔打剩一丝血后转线，逼迫对方额外回防'
        ]
      },
      {
        title: '塔下反杀',
        items: [
          '在塔下小道卡好位会拯救你的队友并极有机会反杀',
          '塔内或隔塔闪现是典型的极限操作',
          '没装备没血还越塔是高风险低收益行为',
          '敌方塔下 1 换 1 常常值得，因为他会丧失两波兵线',
          '召唤物和宠物可以堵住塔下通道创造空间'
        ]
      }
    ]
  },
  {
    title: '防 Gank 与游走意识',
    subtitle: '避免被抓是保持优势的关键',
    cols: 'two-col',
    cards: [
      {
        title: '防 Gank 技巧',
        items: [
          '对线期随时关注小地图，敌方打野消失立即后撤',
          '1分30秒是打野刷完第一组野的时间点，特别注意',
          '兵线过深时是敌方 gank 的最佳时机',
          '敌方兵线压进我方塔时，打野大概率在蹲',
          '保持河道草丛眼位，特别是在 6 级前'
        ]
      },
      {
        title: '游走时机',
        items: [
          '推完线后游走，不要亏兵线',
          '击杀敌方后，看兵线决定是否回中或继续游走',
          '敌方压线过深时，配合打野越塔',
          '资源团前确保有线权再支援',
          '优势方积极游走扩大优势，劣势方谨慎游走'
        ]
      }
    ]
  },
  {
    title: '团战致胜法则',
    subtitle: '团战是决定胜负的关键时刻',
    cols: 'two-col',
    cards: [
      {
        title: '团战前准备',
        items: [
          '观察敌方阵容，分析其优势与弱点',
          '确认敌方关键控制技能是否冷却',
          '资源团前 40 秒提前落位',
          '辅助提前布置关键草丛视野',
          '明确团战目标和进场顺序'
        ]
      },
      {
        title: '团战站位',
        items: [
          '坦克和战士站在最前排，吸收第一波伤害',
          '法师和射手保持安全距离，在辅助保护范围内',
          '刺客从侧翼或后方切入敌方后排',
          '前后排保持适当距离，避免被 AOE 波及',
          '被先手时保持阵型，不要盲目后撤'
        ]
      }
    ]
  },
  {
    title: '段位体系与上分策略',
    subtitle: '了解段位机制，制定针对性上分策略',
    cols: 'two-col',
    cards: [
      {
        title: '七大段位详解',
        items: [
          '黑铁/青铜：基础操作阶段，专注补刀和走位',
          '白银：开始有团队意识，学习基础配合',
          '黄金：稳定对线期，学习资源争夺',
          '铂金：意识提升期，需要更多大局观',
          '翡翠：高黄金到钻石的过渡，隐藏分权重高',
          '钻石：操作与意识并重，阵容配合关键',
          '大师/宗师/王者：顶尖对决，细节决定成败'
        ]
      },
      {
        title: '上分核心建议',
        items: [
          '主练 1-2 个版本强势英雄，建立熟练度优势',
          '每周只练 2 个英雄，熟练度达到精通',
          '使用训练模式模拟前 3 分钟节奏',
          '固定位置，避免补位导致熟练度下降',
          '每输 3 局复盘一次操作失误',
          '连胜后容易匹配劣势局，适当休息',
          '心态最重要，输赢都保持平常心'
        ]
      }
    ]
  },
  {
    title: '连招技巧与英雄操作',
    subtitle: '掌握核心连招，提升操作上限',
    cols: 'two-col',
    cards: [
      {
        title: '连招核心要素',
        items: [
          '了解所使用英雄的所有技能及冷却时间',
          '善于观察敌人的走位和行动模式',
          '连招不是简单的按键组合，需要精确的时机把控',
          '练习在训练模式中反复练习连招节奏',
          '根据敌方阵容和装备调整连招顺序'
        ]
      },
      {
        title: '常见英雄连招示例',
        items: [
          '阿卡丽：R 接近 → W 隐身 → E 标记 → R 回撤',
          '锐雯：光速 QA，A+Q 取消后摇',
          '亚索：E 兵线接近 → Q 击飞 → R 跟进',
          '劫：W 影分身 → E 减速 → Q 输出 → R 收割',
          '安妮：叠晕眩 → W 晕眩 → Q 输出 → R 完美开团'
        ]
      }
    ]
  },
  {
    title: '资源争夺优先级',
    subtitle: '了解资源刷新时间，合理规划节奏',
    cols: 'two-col',
    cards: [
      {
        title: '关键时间节点',
        items: [
          '1分30秒：打野刷完第一组野，重点防 gank',
          '2分30秒：河道蟹刷新，争夺河道视野',
          '5分钟：峡谷先锋刷新，第一波大节奏',
          '6分钟：小龙刷新，资源团第一波',
          '14分钟：镀层脱落，注意推塔节奏'
        ]
      },
      {
        title: '资源优先级',
        items: [
          '优势局：先锋 > 小龙 > 大龙 > 防御塔 > 经济滚雪球',
          '劣势局：防御塔 > 大龙 > 小龙 > 守野区 > 补发育',
          '首条小龙通常会显著抬高团队中期节奏',
          '大龙 Buff 适合 4-1 分推逼团',
          '远古龙阶段尽量不要让对方白拿'
        ]
      }
    ]
  }
];

const roleGuides = [
  ['上单', '前8分钟优先处理兵线与换血时机。中后期承担边线压力与开团职责。', ['前期：控线发育为主', '中期：边线分带牵制', '后期：开团或保护 C 位']],
  ['打野', '以资源节奏为轴，优先保证关键河道视野，围绕强势线打第一波节奏。', ['前期：刷野路线规划', '中期：控龙先锋节奏', '后期：团战切后排']],
  ['中单', '中路线权决定支援效率。控制线权后与打野联动做河道与边路节奏。', ['前期：推线游走支援', '中期：辐射边路和野区', '后期：团战输出核心']],
  ['射手', '稳健补刀、控制距离、减少无效换血。团战目标是活着打满输出。', ['前期：稳健发育补刀', '中期：安全位置输出', '后期：活到最后']],
  ['辅助', '以视野和先手控制影响全图。中期负责建立关键草丛和资源点信息优势。', ['前期：保护 ADC 发育', '中期：游走做视野', '后期：开团或保护']]
];

const trainingPlan14 = [
  {
    title: '第一周：基础巩固',
    items: [
      'Day1-2：固定 2 个主练英雄，专注补刀与对线基础',
      'Day3：练习技能连招，在训练模式中反复练习',
      'Day4：学习眼位布置，了解关键草丛位置',
      'Day5：练习打野刷野路线和 Gank 时机',
      'Day6-7：实战练习，重点总结对线优缺点'
    ]
  },
  {
    title: '第二周：意识提升',
    items: [
      'Day8-9：强化中期运营，围绕龙先锋做决策',
      'Day10：学习团战站位和进场时机',
      'Day11：练习视野控制和扫描使用',
      'Day12-13：复盘团战站位、目标选择、转资源效率',
      'Day14：整周总结，修正下周训练目标'
    ]
  }
];

const measurableGoals = [
  {
    title: '对线期目标',
    items: [
      '10分钟补刀达到对应分路基准（上路80刀，中路85刀，下路90刀）',
      '每局至少 3 次有效换血（赚取血量优势）',
      '对线期死亡不超过 2 次',
      '补刀误差控制在 5 刀以内'
    ]
  },
  {
    title: '团战期目标',
    items: [
      '资源团前 40 秒提前落位做视野',
      '团战输出占比达到 20% 以上（输出位）',
      '每局复盘 1 次“可避免死亡”与 1 次“可复制决策”',
      '连续 3 局保持同一战术思路验证效果'
    ]
  }
];

const trainingPlan7 = [
  {
    title: '执行节奏',
    ordered: true,
    items: [
      'Day1-2：固定 2 个主练英雄，专注补刀与对线',
      'Day3-4：强化中期运营，围绕龙先锋做决策',
      'Day5-6：复盘团战站位、目标选择、转资源效率',
      'Day7：整周总结，修正下周训练目标'
    ]
  },
  {
    title: '数据目标',
    items: [
      '10分钟补刀达到对应分路基准',
      '资源团前 40 秒提前落位做视野',
      '每局复盘 1 次“可避免死亡”与 1 次“可复制决策”',
      '连续 3 局保持同一战术思路验证效果'
    ]
  }
];

const rankedStages = [
  {
    title: '基础段位阶段',
    text: '优先稳定对线与补刀，减少无视野单走。目标是建立“少失误”的基础胜率。',
    items: ['每局至少 1 次主动资源集合', '尽量减少无意义单人越线']
  },
  {
    title: '中段冲分阶段',
    text: '核心是中期运营质量：视野、线权、资源转换效率。减少“赢团不转资源”。',
    items: ['团战后 15 秒内完成转资源决策', '固定 2 个主练英雄提高熟练度']
  },
  {
    title: '高段质量阶段',
    text: '重视阵容相性与开团链条，强调信息差和技能冷却管理。',
    items: ['资源前 40 秒完成站位与布眼', '关键团前先确认敌方核心大招']
  }
];

const communicationTemplates = [
  {
    title: '开团前 30 秒',
    items: ['先打“集合/进攻目标”信号，确认主战场', '辅助与打野补关键草丛视野', '边线英雄回中靠拢，避免 4v5']
  },
  {
    title: '团战结束后',
    items: ['第一优先：大龙/小龙/先锋', '第二优先：中路兵线与防御塔', '第三优先：回补与重置视野']
  }
];

const reviewChecklist = [
  {
    title: '局内关键问题',
    items: ['前 10 分钟是否达成补刀与等级目标？', '第一次资源团前是否拿到关键视野？', '团战是否明确优先目标与进场时机？']
  },
  {
    title: '改进动作',
    items: ['每局至少记录 1 次误判与 1 次正确决策', '每周固定练 2 个英雄和 1 套通用思路', '将复盘结论写成下一局可执行目标']
  }
];

const sources = [
  ['英雄联盟手游官网 - 国服数据', 'https://lolm.qq.com/act/a20220818raider/index.html'],
  ['腾讯英雄联盟 101 - 英雄资料', 'https://101.qq.com/#/hero'],
  ['Riot Data Dragon - 官方英雄数据', 'https://ddragon.leagueoflegends.com/cdn/14.1.1/data/zh_CN/champion.json'],
  ['League of Legends 官方新手教程', 'https://www.leagueoflegends.com/en-us/how-to-play/'],
  ['Riot Support - 排位系统说明', 'https://support-leagueoflegends.riotgames.com/hc/en-us/articles/4406004330643-Ranked-Tiers-Divisions-and-Queues'],
  ['Riot Support - 快捷信号系统', 'https://support-leagueoflegends.riotgames.com/hc/en-us/articles/7094910087955-Smart-Ping-Wheel-and-Quickbinds'],
  ['英雄联盟中文官网 - 玩法指南', 'https://www.leagueoflegends.com/zh-cn/how-to-play/']
];

function SectionHead({ kicker, title, subtitle }) {
  return (
    <div className="strategy-section-head">
      <div>
        {kicker ? <p className="strategy-section-kicker">{kicker}</p> : null}
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

function KnowledgeCard({ title, text, items, ordered = false, extraClass = '' }) {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <article className={`knowledge-card ${extraClass}`.trim()}>
      <h3>{title}</h3>
      {text ? <p>{text}</p> : null}
      <ListTag className={ordered ? 'ordered-list' : 'checklist'}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </article>
  );
}

export default function StrategyCenterPage() {
  return (
    <>
      <SiteHeader active="strategy-center" />

      <main className="strategy-page">
        <div className="container">
          <div className="page-header strategy-header">
            <div className="strategy-header-grid">
              <div className="strategy-header-main">
                <nav className="breadcrumb" aria-label="面包屑导航">
                  <a href="/">首页</a>
                  <span className="separator">/</span>
                  <span className="current">攻略中心</span>
                </nav>
                <span className="strategy-kicker">Editorial Playbook</span>
                <h1 className="page-title">攻略中心</h1>
                <p className="page-subtitle">
                  从对线到团战，从运营到复盘，建立一套更像“作战手册”的上分体系。
                </p>
                <div className="pill-list strategy-tags">
                  {['版本强势', '分路进阶', '阵容搭配', '对线克制', '中后期运营', '复盘提升'].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="strategy-headline-metrics">
                  <div className="strategy-metric">
                    <strong>15+</strong>
                    <span>英雄专题</span>
                  </div>
                  <div className="strategy-metric">
                    <strong>5</strong>
                    <span>分路模块</span>
                  </div>
                  <div className="strategy-metric">
                    <strong>3</strong>
                    <span>训练入口</span>
                  </div>
                </div>
              </div>
              <aside className="strategy-header-side">
                <article className="strategy-side-card">
                  <span className="strategy-side-tag">本周重点</span>
                  <h3>先锁主玩位置，再补专题攻略</h3>
                  <p>建议按“版本梯队 → 英雄专题 → 中期运营”的顺序阅读，效率更高。</p>
                </article>
                <article className="strategy-side-card">
                  <span className="strategy-side-tag">阅读路径</span>
                  <ul className="strategy-side-list">
                    <li>新手先看分路全面攻略</li>
                    <li>想上分优先看版本强势英雄榜</li>
                    <li>打排位前复习视野与团战模块</li>
                  </ul>
                </article>
              </aside>
            </div>
          </div>

          <section className="strategy-carousel">
            <SectionHead
              kicker="Featured Routes"
              title="精选路线专题"
              subtitle="用更接近编辑策划页的方式组织阵容、运营和训练入口。"
            />
            <div className="featured-routes-grid">
              {featuredRoutes.map((route) => (
                <a href={route.href} className="featured-route-card" key={route.href}>
                  <div className="featured-route-media">
                    <img src={route.image} alt={route.alt} loading="lazy" />
                  </div>
                  <div className="featured-route-body">
                    <span className="featured-route-tag">{route.title}</span>
                    <h3>{route.title}</h3>
                    <p>{route.description}</p>
                    <span className="featured-route-link">进入专题 →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <SectionHead
              kicker="Hero Matrix"
              title="热门英雄攻略专题"
              subtitle="点击进入单英雄攻略，查看打法、技能、出装、符文与对线模块。"
            />
            <div className="featured-hero-guides">
              {heroGuides.map(([id, title, description]) => (
                <a href={`/hero-guide.html?id=${id}`} className="featured-hero-guide-card" key={id}>
                  <div
                    className="hero-guide-img"
                    style={{
                      backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id.charAt(0).toUpperCase()}${id.slice(1)}_0.jpg')`
                    }}
                  ></div>
                  <div className="hero-guide-info">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="guide-link">查看攻略 →</span>
                  </div>
                </a>
              ))}
            </div>
            <a className="hub-link" href="/champions.html">
              查看完整英雄列表
            </a>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">版本强势英雄榜</h2>
            <p className="section-subtitle">基于当前版本数据整理的各位置强势英雄排行，助您快速找到上分首选</p>
            <div className="knowledge-grid two-col">
              {tierSections.map((section) => (
                <KnowledgeCard key={section.title} title={section.title} items={section.items} />
              ))}
            </div>
          </section>

          {sectionBlocks.map((section) => (
            <section className="knowledge-section" key={section.title}>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-subtitle">{section.subtitle}</p>
              <div className={`knowledge-grid ${section.cols}`}>
                {section.cards.map((card) => (
                  <KnowledgeCard
                    key={card.title}
                    title={card.title}
                    text={card.text}
                    items={card.items}
                  />
                ))}
              </div>
            </section>
          ))}

          <section className="knowledge-section">
            <h2 className="section-title">分路全面攻略</h2>
            <p className="section-subtitle">各位置核心职责与进阶技巧</p>
            <div className="knowledge-grid five-col">
              {roleGuides.map(([title, text, items]) => (
                <KnowledgeCard
                  key={title}
                  title={title}
                  text={text}
                  items={items}
                  extraClass="role-guide"
                />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">训练计划（14 天）</h2>
            <p className="section-subtitle">系统化训练，快速提升实力</p>
            <div className="knowledge-grid two-col">
              {trainingPlan14.map((card) => (
                <KnowledgeCard key={card.title} title={card.title} items={card.items} ordered />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">数据目标清单</h2>
            <p className="section-subtitle">可量化的提升指标</p>
            <div className="knowledge-grid two-col">
              {measurableGoals.map((card) => (
                <KnowledgeCard key={card.title} title={card.title} items={card.items} />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">训练计划（7 天）</h2>
            <div className="knowledge-grid two-col">
              {trainingPlan7.map((card) => (
                <KnowledgeCard
                  key={card.title}
                  title={card.title}
                  items={card.items}
                  ordered={Boolean(card.ordered)}
                />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">排位阶段打法（按分段目标）</h2>
            <div className="knowledge-grid three-col">
              {rankedStages.map((card) => (
                <KnowledgeCard
                  key={card.title}
                  title={card.title}
                  text={card.text}
                  items={card.items}
                />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">沟通执行模板（Smart Ping）</h2>
            <div className="knowledge-grid two-col">
              {communicationTemplates.map((card) => (
                <KnowledgeCard key={card.title} title={card.title} items={card.items} ordered />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">复盘清单</h2>
            <div className="knowledge-grid two-col">
              {reviewChecklist.map((card) => (
                <KnowledgeCard key={card.title} title={card.title} items={card.items} ordered />
              ))}
            </div>
          </section>

          <section className="knowledge-section">
            <h2 className="section-title">参考来源</h2>
            <div className="knowledge-card">
              <ul className="checklist source-links">
                {sources.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
