import { StrategyArticlePage } from '../../components/strategy-article-page';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '当前版本强势英雄榜',
  description:
    '基于 2026 年 3 月 21 日可核实资料整理的 26.6 版本强势英雄观察台，区分低分段稳分选择、高分段高上限英雄与版本变动关注名单。',
  path: '/meta-report.html'
});

const sections = [
  {
    id: 'baseline',
    icon: '◎',
    title: '版本基准',
    subtitle: '这页不是写死的“唯一答案”，而是把当前最可靠的信息按时间和用途拆开。',
    columns: 'editorial-grid-3',
    cards: [
      {
        title: '官方版本',
        text: '当前官方最新召唤师峡谷补丁为 26.6，Riot 于 2026 年 3 月 17 日发布补丁说明，并在 2026 年 3 月 20 日对希瓦娜与奥拉夫做了中途修正。'
      },
      {
        title: '数据参考',
        text: '第三方分段推荐当前可稳定核验到的是 Mobalytics 于 26.5 更新的低分段 / 高分段榜单，因此本页把它作为“稳定参考层”，而不是直接伪装成 26.6 实时结论。'
      },
      {
        title: '使用方式',
        text: '如果你想稳分，优先看各分段推荐池；如果你想吃版本变化，重点看本页的“上升观察名单”和“需要降优先级的旧强势英雄”。'
      }
    ]
  },
  {
    id: 'elo',
    icon: '📊',
    title: '按分段的稳分推荐',
    subtitle: '这里优先给“当前最适合拿来上分”的英雄，而不是单纯看热度。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '低分段稳分池（基于 Mobalytics 26.5）',
        text: '更适合想快速建立稳定胜率、减少对局执行门槛的玩家。',
        pills: ['Top: Ornn', 'Jungle: Rek’Sai', 'Mid: Ahri', 'Bot: Jinx', 'Support: Leona'],
        items: [
          '奥恩：容错高、开团直接、资源团价值稳定。',
          '雷克塞：路径和抓边效率高，前中期容易制造人数差。',
          '阿狸：线权 + 游走 + 收尾都稳定，但 26.6 已被小削。',
          '金克丝：只要阵容能保护，她依然是低分段最容易滚雪球的后排之一。',
          '蕾欧娜：强开明确，能把很多混乱团战拉回到可执行节奏里。'
        ]
      },
      {
        title: '高分段高上限池（基于 Mobalytics 26.5）',
        text: '更适合熟练度高、愿意利用节奏差和上限操作放大优势的玩家。',
        pills: ['Top: Aatrox', 'Jungle: Lee Sin', 'Mid: Akali', 'Bot: Kai’Sa', 'Support: Thresh'],
        items: [
          '剑魔：一旦前期吃到优势，边线和资源团统治力都很强。',
          '李青：高分段里路线、先手和回踢价值都更容易兑现。',
          '阿卡丽：高熟练度环境下仍然是最强的中路高上限刺客之一。',
          '卡莎：盲选适应性强，能跟多数辅助和阵容框架兼容。',
          '锤石：在会运营视野和节奏的对局里，价值始终稳定。'
        ]
      }
    ]
  },
  {
    id: 'watchlist',
    icon: '📈',
    title: '26.6 上升观察名单',
    subtitle: '这些英雄在 26.6 获得了 Riot 官方明确加强或重做，值得优先试用，但需要注意样本还在形成中。',
    columns: 'editorial-grid-3',
    cards: [
      {
        title: '丽桑卓',
        text: 'Q 冷却回到更强的 3 秒上限，是这次最明确的中路增强之一。更适合需要稳定控制、反手与中期资源团执行的玩家。',
        pills: ['中路控制', '反手价值', '资源团'],
        items: ['对近战中单压制力提升', '更适合搭配强开或先手打野', '如果你主打中路稳定节奏，她是本补丁最值得试的英雄之一']
      },
      {
        title: '阿兹尔 / Cassiopeia',
        text: '两个中路持续输出核心都在 26.6 获得加强。适合想把中路线权和团战伤害一起拉高的玩家，但熟练度要求更高。',
        pills: ['中路法核', '后排输出', '熟练度要求高'],
        items: ['阿兹尔加强更偏中后期稳定输出', 'Cassiopeia 提升对线换血和法力体验', '适合已经有法核基础的玩家']
      },
      {
        title: '奥拉夫 / 希瓦娜',
        text: '奥拉夫打野在 26.6 获得明确照顾；希瓦娜则是整套更新上线，但 3 月 20 日已吃到中途回调，说明她现在仍处于快速调试期。',
        pills: ['打野观察', '清野效率', '版本波动高'],
        items: ['奥拉夫更适合节奏型打野玩家测试', '希瓦娜是高优先级观察对象，但不建议直接视作稳定 T0', '如果你要练新版本红利英雄，先从普通局验证手感']
      }
    ]
  },
  {
    id: 'downgrade',
    icon: '⚠️',
    title: '需要降优先级观察的旧强势英雄',
    subtitle: '这些英雄并不是不能玩，而是和上个补丁相比，已经不适合再被当成无脑一抢。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '阿狸',
        text: 'Riot 在 26.6 官方补丁里明确写到她因 26.3 的加强“skyrocketed her to the top of the mid lane pool”，因此这次直接下调了 Q 的基础伤害。',
        items: [
          '她依然能玩，尤其是想打线权和游走的玩家。',
          '但不再建议把她当作“默认最强中单答案”。',
          '如果你阿狸熟练度一般，可以优先观察丽桑卓、阿兹尔、Cassiopeia 的新环境表现。'
        ]
      },
      {
        title: '派克',
        text: '26.6 对派克的方向是明确降温，原因是他最近已经越过“值得玩”和“过于强势”的边界。',
        items: [
          '仍然适合熟练玩家拿来惩罚脆皮下路。',
          '但如果你只是想稳定上分，当前更推荐锤石、蕾欧娜这类容错更高的支持位。',
          '尤其在需要稳定资源团执行的对局里，派克不再是最稳的主流答案。'
        ]
      }
    ]
  },
  {
    id: 'recommendations',
    icon: '🧭',
    title: '怎么把榜单用在实战里',
    subtitle: '真正有用的不是“记住谁最强”，而是知道自己该优先练哪一类英雄。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '如果你只想稳分',
        items: [
          '优先选低分段稳分池里的 1 到 2 个英雄，不要同时练 5 个新英雄。',
          '每个位置先锁一个“稳定 pick”再补一个“对位备选”。',
          '打排位前先看你最常玩的主位置，而不是被全位置榜单带跑。'
        ]
      },
      {
        title: '如果你想吃版本红利',
        items: [
          '优先关注 26.6 上升观察名单，尤其是丽桑卓、阿兹尔、奥拉夫。',
          '新版本重做英雄先在普通局测试，再决定要不要进排位英雄池。',
          '看到官方刚加强的英雄时，先判断它适不适合你的分段和熟练度。'
        ]
      }
    ]
  },
  {
    id: 'sources',
    icon: '🔗',
    title: '信息来源',
    subtitle: '这页优先使用官方补丁说明，再补充当前仍可核实的分段推荐来源。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: 'Riot 官方',
        items: [
          'League of Legends Patch 26.6 Notes（发布于 2026-03-17）',
          'Patch 26.6 Mid-Patch Updates（2026-03-20）',
          '用于确认当前官方最新版本与具体加强/削弱方向'
        ]
      },
      {
        title: 'Mobalytics 参考层',
        items: [
          'Low ELO Tier List - Patch 26.5',
          'High ELO Tier List - Patch 26.5',
          '用于给当前补丁初期提供更稳定的分段推荐参考'
        ]
      }
    ]
  }
];

export default function MetaReportPage() {
  return (
    <StrategyArticlePage
      title="当前版本强势英雄榜"
      subtitle="以 2026 年 3 月 21 日为基准，结合 Riot 官方 26.6 补丁与可核实的 26.5 分段推荐，整理一份更稳的当前版本观察台。"
      path="/meta-report.html"
      kicker="Patch 26.6 Meta Watch"
      splash="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg"
      sections={sections}
      prevLink={{ href: '/strategy-center.html', label: '返回攻略中心' }}
      nextLink={{ href: '/draft.html', label: '继续阅读：阵容搭配思路' }}
    />
  );
}
