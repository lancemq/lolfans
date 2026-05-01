import { StrategyArticlePage } from '../../components/strategy-article-page';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '14天训练模板',
  description: '把补刀、站位、视野、资源团和复盘拆成 14 天执行计划，让训练更具体。',
  path: '/training.html'
});

const sections = [
  {
    id: 'quickstart',
    icon: '🚀',
    title: '7天快速入门计划',
    subtitle: '如果你是第一次接触英雄联盟，或从其他游戏转过来，这 7 天帮你建立最基础的操作和意识。',
    columns: 'editorial-grid-2',
    cards: [
      { title: 'Day 1 下载与基础设置', ordered: true, items: ['完成安装并进入训练模式', '调整鼠标灵敏度和视角设置', '了解基础操作：移动、攻击、技能、回城'] },
      { title: 'Day 2-3 选择位置与第一个英雄', ordered: true, items: ['尝试 5 个位置各打 1 局了解基本职责', '从推荐英雄中选择 1-2 个开始练', '只玩 1-2 个英雄，不要频繁换英雄'] },
      { title: 'Day 4-5 补刀与对线基础', ordered: true, items: ['每天 10 分钟自定义补刀练习', '学习抢 2 级和基础换血技巧', '记住 3 个最常用的眼位'] },
      { title: 'Day 6-7 团队配合与推进', ordered: true, items: ['了解小龙、先锋和大龙的作用', '团战时跟着队友走，不要单带', '打完一局快速想 1 个本局最大失误'] }
    ]
  },
  {
    id: 'week1',
    icon: '📈',
    title: '第一周：把基础动作练稳定',
    subtitle: '这一周的目标不是上限，而是降低失误率。',
    columns: 'editorial-grid-2',
    cards: [
      { title: 'Day 1-2 英雄池与按键感', ordered: true, items: ['固定 1 个主位置和 2 个主练英雄', '熟悉技能范围、抬手和位移节奏', '打一局训练模式，只练稳定连招'] },
      { title: 'Day 3-4 补刀与兵线', ordered: true, items: ['做 10 分钟纯补刀训练', '记录 10 分钟刀数', '观察每次漏刀是判断错血量还是站位被干扰'] },
      { title: 'Day 5 视野与防 Gank', ordered: true, items: ['记住 3 个常用防守眼位', '练习敌方打野消失后的后撤习惯', '回放里记录 2 次本可避免的被抓'] },
      { title: 'Day 6-7 实战应用', ordered: true, items: ['打 3-5 局，把目标限制为少死、准时到资源团', '每局结束只复盘一个最大失误', '整理第一周最常犯的 3 个问题'] }
    ]
  },
  {
    id: 'week2',
    icon: '🧠',
    title: '第二周：把意识训练成固定流程',
    subtitle: '从"看到情况才反应"升级成"提前知道接下来要做什么"。',
    columns: 'editorial-grid-2',
    cards: [
      { title: 'Day 8-10 资源团', ordered: true, items: ['练习资源刷新前 40 秒处理兵线', '团前先看谁有闪现和关键大招', '赢团后强制自己在 10 秒内做资源判断'] },
      { title: 'Day 11-12 团战站位', ordered: true, items: ['复盘自己每次是死在进场太早还是站位太深', '记录第一波技能交给了谁', '学会先打得到的目标'] },
      { title: 'Day 13 复盘日', ordered: true, items: ['回看 2 局输掉的比赛', '只记录"本可避免"的错误', '把结论改写成下一局 checklist'] },
      { title: 'Day 14 检验日', ordered: true, items: ['打一组完整对局', '检查补刀、死亡数、资源团到场率', '保留一份自己的后续训练模板'] }
    ]
  },
  {
    id: 'position-training',
    icon: '🎯',
    title: '位置专项训练',
    subtitle: '不同位置训练重点不同，针对性练习效率更高。',
    columns: 'editorial-grid-2',
    cards: [
      { title: '上单训练重点', items: ['控线技巧：慢推、快推、回推线的处理', '换血节奏：利用草丛和技能CD差打短换血', '单带判断：什么时候带线、什么时候参团', 'TP 使用：支援时机的判断'] },
      { title: '打野训练重点', items: ['刷野路线：规划第一条龙/先锋路径', 'Gank 时机：观察兵线状态决定抓哪路', '视野控制：河道与关键路口眼位', '资源判断：龙 vs 先锋的取舍'] },
      { title: '中单训练重点', items: ['线权掌控：推线后游走的时机选择', '换血技巧：利用技能范围差打无伤消耗', '支援路线：上下路和野区的游走路径', '团战站位：在后排输出和找机会之间平衡'] },
      { title: '射手训练重点', items: ['补刀基本功：10 分钟 80+ 刀', '走A练习：在移动中保持输出', '对线配合：与辅助的走位和集火配合', '团战生存：站位和技能的保命运用'] }
    ]
  },
  {
    id: 'metrics',
    icon: '◎',
    title: '训练时最值得看 4 个指标',
    subtitle: '不要只看输赢，这四个指标更能说明你是不是在稳定进步。',
    columns: 'editorial-grid-2',
    cards: [
      { title: '基础指标', items: ['10 分钟补刀', '场均死亡数', '资源团准时到场率', '可避免失误次数'] },
      { title: '训练原则', items: ['一次训练只重点改 1-2 个动作', '先稳定再提速', '每 3-5 局复盘一次', '别用"状态不好"掩盖重复错误'] }
    ]
  }
];

export default function TrainingPage() {
  return (
    <StrategyArticlePage
      title="14天训练模板"
      subtitle="把训练从“多打几把”变成真正有反馈、有节奏的成长计划。"
      path="/training.html"
      kicker="Training Routine"
      splash="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_17.jpg"
      sections={sections}
      prevLink={{ href: '/macro.html', label: '上一篇：中期运营路线' }}
    />
  );
}
