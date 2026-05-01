export const DEFAULT_DATA_DRAGON_VERSION = '16.6.1';
export const DEFAULT_HERO_ICON = '⚔️';

export const ROLE_CN_MAP = {
  Fighter: '战士',
  Tank: '坦克',
  Mage: '法师',
  Assassin: '刺客',
  Marksman: '射手',
  Support: '辅助'
};

export const ROLE_EN_MAP = {
  战士: 'Fighter',
  坦克: 'Tank',
  法师: 'Mage',
  刺客: 'Assassin',
  射手: 'Marksman',
  辅助: 'Support'
};

export function sanitizeText(text = '') {
  return String(text)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\{\{\s*[^}]+\s*\}\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function summarizeText(text = '', maxLength = 70) {
  const clean = sanitizeText(text);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trim()}...`;
}

export function toKebabCase(text = '') {
  return String(text).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function getChampionKey(heroOrId = '') {
  if (heroOrId && typeof heroOrId === 'object') {
    if (heroOrId.ddKey) return heroOrId.ddKey;
    if (heroOrId.id) return getChampionKey(heroOrId.id);
  }

  const heroId = String(heroOrId || '');
  if (!heroId) return '';
  if (/[A-Z]/.test(heroId) && !heroId.includes('-')) return heroId;

  return heroId
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function toDifficultyLabel(value) {
  if (value <= 3) return '简单';
  if (value <= 6) return '中等';
  return '困难';
}

export function getDifficultyClass(difficulty = '中等') {
  const map = {
    简单: 'easy',
    中等: 'medium',
    困难: 'hard'
  };
  return map[difficulty] || 'medium';
}

export function getRoleClass(role = '') {
  const map = {
    战士: 'role-fighter',
    坦克: 'role-tank',
    法师: 'role-mage',
    刺客: 'role-assassin',
    射手: 'role-marksman',
    辅助: 'role-support'
  };
  return map[role] || '';
}

export function getRoleEmoji(roles = []) {
  const primary = Array.isArray(roles) && roles.length > 0 ? roles[0] : '';
  const map = {
    战士: '⚔️',
    坦克: '🛡️',
    法师: '✨',
    刺客: '🥷',
    射手: '🏹',
    辅助: '💠'
  };
  return map[primary] || DEFAULT_HERO_ICON;
}

export function getRolePreset(roles = []) {
  const primary = Array.isArray(roles) && roles.length > 0 ? roles[0] : '战士';
  const presets = {
    战士: {
      focus: '线权与进场平衡',
      intro: '以换血、线权和中期资源团为核心，既要会打前排，也要会抓后排时机。',
      playstyle: {
        early: '前期围绕兵线位置与技能 CD 换血，建立线权后再考虑压塔或配合打野。',
        mid: '中期优先围绕先锋、小龙和边线兵线行动，用小规模团战把优势滚起来。',
        late: '后期根据阵容决定自己是先手进场还是盯防敌方前排，别在第一时间交完所有资源。'
      },
      builds: {
        core: ['焚天/无穷饥渴', '斯特拉克的挑战护手', '死亡之舞'],
        situational: ['荆棘之甲', '守护天使', '自然之力', '玛莫提乌斯之噬']
      },
      runes: { primary: '精密', keystone: '征服者', secondary: '坚决' },
      guideAngles: ['对线压制', '边线牵制', '先手进场']
    },
    刺客: {
      focus: '节奏击杀与侧翼切入',
      intro: '利用位移和爆发压缩敌方后排站位，节奏点在于支援效率和收割窗口。',
      playstyle: {
        early: '前期先处理兵线和血量，再抓对手关键技能真空期打一套。',
        mid: '中期多利用线权转线，优先出现在人数不均衡的小规模碰撞里。',
        late: '后期不是第一个进，而是等控制和保命技能交过后再处理后排。'
      },
      builds: {
        core: ['幽梦之灵', '赛瑞尔达的怨恨', '夜之锋刃'],
        situational: ['守护天使', '凡性的提醒', '玛莫提乌斯之噬', '中娅沙漏']
      },
      runes: { primary: '主宰', keystone: '电刑', secondary: '精密' },
      guideAngles: ['爆发换血', '边路游走', '收割残局']
    },
    法师: {
      focus: '清线消耗与团战覆盖',
      intro: '法师的稳定性来自推线、消耗和资源团前的先落位，不只看瞬间爆发。',
      playstyle: {
        early: '前期保持兵线与蓝量节奏，用技能压血线同时避免被反抓。',
        mid: '中期利用清线优势先到河道，抢视野和地形位置比追击更重要。',
        late: '后期优先保持输出环境，让控制与 AOE 覆盖最大化。'
      },
      builds: {
        core: ['卢登的伙伴', '影焰', '中娅沙漏'],
        situational: ['灭世者的死亡之帽', '虚空之杖', '女妖面纱', '梅贾的窃魂卷']
      },
      runes: { primary: '巫术', keystone: '奥术彗星', secondary: '启迪' },
      guideAngles: ['清线控图', '团战覆盖', '安全站位']
    },
    射手: {
      focus: '发育曲线与持续输出',
      intro: '射手的专业感不在于花哨，而在于补刀、站位和输出顺序始终稳定。',
      playstyle: {
        early: '前期先把补刀和血量稳住，利用射程或推线权争取镀层和龙坑先落位。',
        mid: '中期跟随队伍推进视野和中路线权，不要为了多吃一波兵暴露在无视野区域。',
        late: '后期优先保证生存和输出持续性，先打得到的目标，再谈切后排。'
      },
      builds: {
        core: ['无尽之刃', '幻影之舞', '疾射火炮'],
        situational: ['饮血剑', '守护天使', '水银弯刀', '多米尼克领主的致意']
      },
      runes: { primary: '精密', keystone: '致命节奏', secondary: '启迪' },
      guideAngles: ['对线发育', '中期转线', '后排输出']
    },
    辅助: {
      focus: '视野、保护与先手协同',
      intro: '辅助的价值在于让队友更容易打出正确决策，信息差和站位比个人数据更重要。',
      playstyle: {
        early: '前期围绕草丛、兵线与换血节奏打信息优势，帮助队友先拿线权。',
        mid: '中期要把眼位、资源团提前站位和边路协防串在一起。',
        late: '后期优先判断这波团是该先手还是保护核心，技能目标永远比伤害面板更关键。'
      },
      builds: {
        core: ['钢铁烈阳之匣', '骑士之誓', '救赎'],
        situational: ['流水法杖', '米凯尔的祝福', '基克的聚合', '警觉岩石']
      },
      runes: { primary: '坚决', keystone: '守护者/余震', secondary: '启迪' },
      guideAngles: ['线权协助', '视野运营', '保护主核']
    },
    坦克: {
      focus: '前排承伤与团战开图',
      intro: '坦克的关键不是扛多久，而是能否在正确位置吸收第一轮技能并撑开阵型。',
      playstyle: {
        early: '前期以抗压和稳定吃经验为主，避免为了换血丢失整波兵线。',
        mid: '中期承担资源团前排职责，帮助队伍先占草丛与入口。',
        late: '后期注意开团角度与撤退路线，不能和后排完全脱节。'
      },
      builds: {
        core: ['日炎圣盾', '荆棘之甲', '自然之力'],
        situational: ['兰顿之兆', '深渊面具', '石像鬼石板甲', '凛冬之临']
      },
      runes: { primary: '坚决', keystone: '不灭之握/余震', secondary: '启迪' },
      guideAngles: ['前排换血', '强开资源团', '阵型保护']
    }
  };

  return presets[primary] || presets.战士;
}

export function buildSpell(spell) {
  if (!spell) {
    return {
      name: '技能',
      description: '官方技能描述加载中。',
      cooldown: '',
      mana: ''
    };
  }

  const mana =
    spell.costBurn && spell.costBurn !== '0'
      ? spell.costBurn
      : sanitizeText(spell.resource || '') || '无消耗';

  return {
    name: spell.name || '技能',
    description: sanitizeText(spell.description || spell.sanitizedDescription || '官方技能描述加载中。'),
    cooldown: spell.cooldownBurn ? `${spell.cooldownBurn}秒` : '',
    mana
  };
}

export function buildAbilitiesFromChampionDetail(championData) {
  const passive = championData?.passive || {};
  const spells = championData?.spells || [];

  return {
    passive: {
      name: passive.name || '被动技能',
      description: sanitizeText(passive.description || passive.sanitizedDescription || ''),
      cooldown: '无',
      mana: '无'
    },
    q: buildSpell(spells[0]),
    w: buildSpell(spells[1]),
    e: buildSpell(spells[2]),
    r: buildSpell(spells[3])
  };
}

export function buildSkinsFromChampionDetail(skins = []) {
  if (!Array.isArray(skins) || skins.length === 0) return [];

  return skins.map((skin) => ({
    id: String(skin.id || skin.num || 'skin'),
    name: skin.name || '皮肤',
    price: Number(skin.num) === 0 ? '免费' : '商城可购买',
    tier: Number(skin.num) === 0 ? '经典' : '普通',
    description: `官方皮肤：${skin.name || '默认皮肤'}`,
    imageNum: Number.isInteger(skin.num) ? skin.num : 0
  }));
}

export function getChampionSplashUrl(version, heroOrId = '', skinIndex = 0) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampionKey(heroOrId)}_${skinIndex}.jpg`;
}

export function getChampionLoadingUrl(version, heroOrId = '', skinIndex = 0) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampionKey(heroOrId)}_${skinIndex}.jpg`;
}

export function getAbilityIconUrl(version, iconFile = '', type = 'spell') {
  if (!iconFile) return '';
  const folder = type === 'passive' ? 'passive' : 'spell';
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/${folder}/${iconFile}`;
}
