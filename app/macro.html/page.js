import { StrategyArticlePage } from '../../components/strategy-article-page';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '中期运营路线',
  description: '围绕 10-25 分钟的兵线、视野、小龙、先锋和大龙节奏，建立更清晰的中期运营判断。',
  path: '/macro.html'
});

const sections = [
  {
    id: 'timeline',
    icon: '⏱️',
    title: '10-25 分钟的核心任务',
    subtitle: '中期最怕“打赢了不知道做什么”，所以先把每个时间段的目标固定下来。',
    columns: 'editorial-grid-3',
    cards: [
      { title: '10-14 分钟', text: '第一轮先锋与小龙，重点是谁能先推线、先落位。', items: ['推完线再进河道', '先锋撞塔优先转中路节奏', '镀层脱落前尽量吃满经济'] },
      { title: '14-20 分钟', text: '外塔减少后，视野和转线成本都更高，失误会更致命。', items: ['中路线权优先级上升', '边线过深前先补视野', '资源刷新前 40 秒开始站位'] },
      { title: '20-25 分钟', text: '大龙开始成为真正的地图压力点，兵线处理会直接决定能不能接团。', items: ['别在边线白白被抓', '先处理兵线再看大龙', '赢一波团后马上转资源'] }
    ]
  },
  {
    id: 'states',
    icon: '🗺️',
    title: '顺风、均势、逆风三套思路',
    subtitle: '运营不是一句“控资源”，而是不同局面下要做不同选择。',
    columns: 'editorial-grid-3',
    cards: [
      { title: '顺风局', text: '重点是压缩空间，不是乱开高地。', items: ['先拆外塔再进野区', '把击杀转成龙、塔、视野', '逼团前先确认兵线已经推进'] },
      { title: '均势局', text: '重点是减少无效碰撞，通过信息差和先落位抢第一手。', items: ['看谁先抢到中路线权', '围绕强势边线转资源', '把每波回城时间和资源刷新对齐'] },
      { title: '逆风局', text: '重点是拖节奏、保兵线、抓失误，不是每个资源都硬接。', items: ['优先守中路和高地视野', '边线只带到安全位置', '等对手分散或冒进再反打'] }
    ]
  },
  {
    id: 'conversion',
    icon: '♟️',
    title: '运营转化公式',
    subtitle: '把中期决策固定成一个顺序，执行会稳定很多。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '赢团后的固定顺序',
        items: ['先看最近兵线是否能推进', '再看能不能转塔', '接着判断龙 / 先锋 / 大龙', '最后才是回城补装和重置地图']
      },
      {
        title: '打不过团时的固定顺序',
        items: ['先保关键兵线', '再补防守眼', '再找边线偷经济', '等敌方犯错或关键技能失去同步']
      }
    ]
  }
];

export default function MacroPage() {
  return (
    <StrategyArticlePage
      title="中期运营路线"
      subtitle="把对线优势真正转成塔、龙、视野和大龙压力，而不是停留在面板经济。"
      path="/macro.html"
      kicker="Macro Playbook"
      splash="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_0.jpg"
      sections={sections}
      prevLink={{ href: '/draft.html', label: '上一篇：阵容搭配思路' }}
      nextLink={{ href: '/training.html', label: '下一篇：14天训练模板' }}
    />
  );
}
