export const CORE_CONTENT_RESOURCES = [
  {
    href: '/meta-report.html',
    title: '当前版本强势英雄榜',
    description: '26.6 版本观察台，区分稳分英雄、上升名单与降优先级对象',
    keywords: ['版本', '强势英雄', 'tier', 'meta'],
    icon: '📊'
  },
  {
    href: '/strategy-center.html',
    title: '攻略中心',
    description: '版本热点、专题阅读与英雄攻略入口',
    keywords: ['攻略', '专题', '上分'],
    icon: '📘'
  },
  {
    href: '/items-runes.html',
    title: '符文装备',
    description: '符文逻辑、出装模板与官方装备图鉴',
    keywords: ['符文', '装备', '出装'],
    icon: '🧰'
  },
  {
    href: '/guide.html',
    title: '新手指南',
    description: '地图、位置、操作与训练路径',
    keywords: ['新手', '入门', '教程'],
    icon: '🧭'
  },
  {
    href: '/draft.html',
    title: '阵容搭配思路',
    description: '从 BP 到阵容功能检查清单',
    keywords: ['阵容', 'bp', '搭配'],
    icon: '♟️'
  },
  {
    href: '/macro.html',
    title: '中期运营路线',
    description: '兵线、资源团和大龙节奏判断',
    keywords: ['运营', '中期', '资源'],
    icon: '🗺️'
  },
  {
    href: '/training.html',
    title: '14天训练模板',
    description: '把训练拆成每天可执行动作',
    keywords: ['训练', '复盘', '计划'],
    icon: '📈'
  },
  {
    href: '/champions.html',
    title: '英雄列表',
    description: '按定位、难度和关键词筛选英雄',
    keywords: ['英雄', '列表', '定位'],
    icon: '🏆'
  }
];

export function getSearchResources() {
  return CORE_CONTENT_RESOURCES;
}
