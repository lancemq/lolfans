import { StrategyArticlePage } from '../../components/strategy-article-page';
import { buildPageMetadata } from '../../lib/site-config';

export const metadata = buildPageMetadata({
  title: '阵容搭配思路',
  description: '从前排、伤害结构、开团链条和资源节奏出发，建立更稳定的阵容理解与选人框架。',
  path: '/draft.html'
});

const sections = [
  {
    id: 'systems',
    icon: '◎',
    title: '三种基础阵容体系',
    subtitle: '先判断这套阵容是想主动开、反手保，还是通过边线与地图资源拉扯取胜。',
    columns: 'editorial-grid-3',
    cards: [
      {
        title: '先手开团体系',
        text: '核心是前排先手、后排跟进、技能链连续。优点是执行直接，缺点是第一波空掉就容易断节奏。',
        pills: ['前排强开', '爆发跟进', '资源团主导'],
        items: ['上野辅至少两点能开团', '中单或射手要跟得上第一波控制', '团战前一定要先占草和入口']
      },
      {
        title: '保护反打体系',
        text: '核心是让主核安全输出，等对手先交资源后打反手。适合双 C 发育阵容和高容错团战。',
        pills: ['保护主核', '反手控制', '中后期更强'],
        items: ['前排负责顶第一波技能', '辅助与中单优先守住 C 位站位', '兵线要先处理好，避免被强逼进场']
      },
      {
        title: '边线分推体系',
        text: '通过单带压力逼敌方分人，再转资源或以多打少。强在地图拉扯，弱在正面硬碰。',
        pills: ['41 分推', '视野要求高', '转资源效率'],
        items: ['单带点必须有逃生或强单挑能力', '中路线权要一直有人处理', '发现敌方多人抓边线要立刻转龙或大龙']
      }
    ]
  },
  {
    id: 'checklist',
    icon: '🧭',
    title: '选人检查清单',
    subtitle: 'BP 不是记英雄名单，而是检查阵容功能有没有缺口。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '功能性优先看 5 件事',
        items: ['有没有稳定开团点', '有没有持续输出来源', '有没有 AP / AD 伤害平衡', '有没有边线处理能力', '有没有资源团前的视野落位能力']
      },
      {
        title: '最常见的阵容错误',
        items: ['五个人都只会冲，没有后续伤害', '双核都要吃资源，发育曲线打架', '全是脆皮没有第一排', '线权太差，资源团永远迟到', '只看英雄强度，不看搭配关系']
      }
    ]
  },
  {
    id: 'examples',
    icon: '⚔️',
    title: '常见阵容搭配模板',
    subtitle: '这些不是固定答案，但很适合当成你理解阵容结构的模板。',
    columns: 'editorial-grid-2',
    cards: [
      {
        title: '资源团压制模板',
        text: '适合中野辅节奏强、15 分钟前就想控先锋和小龙的队伍。',
        items: ['上单：能先手或抗压的前排', '打野：能抢节奏的开图点', '中单：有线权和支援能力', '下路：对线不劣、能先到资源区', '辅助：做第一波视野与开团判断']
      },
      {
        title: '后期双核模板',
        text: '适合中后期伤害稳定、团战站位明确的队伍，核心是少失误。',
        items: ['上单：稳前排', '打野：反蹲和控图', '中单：法核或稳定控制', '射手：后期主核', '辅助：保护与反开']
      }
    ]
  }
];

export default function DraftPage() {
  return (
    <StrategyArticlePage
      title="阵容搭配思路"
      subtitle="从选人到资源团执行，建立一套更稳定的阵容理解框架。"
      path="/draft.html"
      kicker="Draft Framework"
      splash="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg"
      sections={sections}
      nextLink={{ href: '/macro.html', label: '继续阅读：中期运营路线' }}
    />
  );
}
