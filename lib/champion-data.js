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

export function getChampionIconUrl(version, heroOrId = '') {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampionKey(heroOrId)}.png`;
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

export function transformChampionList(championsMap = {}) {
  const heroes = Object.values(championsMap).map((champion) => {
    const roles = (champion.tags || []).map((tag) => ROLE_CN_MAP[tag]).filter(Boolean);
    const preset = getRolePreset(roles);

    return {
      id: toKebabCase(champion.id),
      ddKey: champion.id,
      name: champion.name,
      title: champion.title,
      roles: roles.length > 0 ? roles : ['战士'],
      difficulty: toDifficultyLabel(champion.info?.difficulty || 5),
      lore: sanitizeText(champion.blurb || ''),
      image: getRoleEmoji(roles),
      playstyle: preset.playstyle,
      builds: preset.builds,
      runes: preset.runes,
      skins: [
        {
          id: `${toKebabCase(champion.id)}-classic`,
          name: `${champion.name} 经典`,
          price: '免费',
          tier: '经典',
          description: `${champion.name} 的默认造型。`,
          imageNum: 0
        }
      ]
    };
  });

  heroes.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
  return heroes;
}

export function normalizeHero(hero = {}) {
  const roles = Array.isArray(hero.roles) && hero.roles.length > 0 ? hero.roles : ['战士'];
  const preset = getRolePreset(roles);

  return {
    id: hero.id || toKebabCase(hero.ddKey || hero.name || 'champion'),
    ddKey: hero.ddKey || getChampionKey(hero.id || hero.name || ''),
    name: hero.name || '英雄',
    title: hero.title || '峡谷参战者',
    roles,
    difficulty: hero.difficulty || '中等',
    lore: hero.lore || '暂无背景故事。',
    image: hero.image || getRoleEmoji(roles),
    quote: hero.quote || '',
    playstyle: hero.playstyle || preset.playstyle,
    builds: hero.builds || preset.builds,
    runes: hero.runes || preset.runes,
    skins: Array.isArray(hero.skins) && hero.skins.length > 0 ? hero.skins : [],
    abilities: hero.abilities || null
  };
}

export function mergeChampionCatalog(catalog = [], localHeroes = []) {
  const merged = new Map();

  catalog.forEach((hero) => {
    const normalized = normalizeHero(hero);
    merged.set(normalized.id, normalized);
  });

  localHeroes.forEach((hero) => {
    const normalized = normalizeHero(hero);
    const existing = merged.get(normalized.id) || {};
    merged.set(normalized.id, normalizeHero({ ...existing, ...normalized }));
  });

  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
}

export function buildChampionFromDetail(heroId, championData) {
  const roles = (championData?.tags || []).map((tag) => ROLE_CN_MAP[tag]).filter(Boolean);
  const preset = getRolePreset(roles);

  return normalizeHero({
    id: heroId,
    ddKey: championData.id,
    name: championData.name,
    title: championData.title,
    roles: roles.length > 0 ? roles : ['战士'],
    difficulty: toDifficultyLabel(championData.info?.difficulty || 5),
    lore: sanitizeText(championData.lore || championData.blurb || ''),
    image: getRoleEmoji(roles),
    playstyle: preset.playstyle,
    builds: preset.builds,
    runes: preset.runes,
    abilities: buildAbilitiesFromChampionDetail(championData),
    skins: buildSkinsFromChampionDetail(championData.skins || [])
  });
}

export function buildChampionDetailModel(championData, version) {
  const roles = (championData?.tags || []).map((tag) => ROLE_CN_MAP[tag]).filter(Boolean);

  return {
    ddKey: championData.id,
    version,
    roles,
    title: championData.title,
    lore: sanitizeText(championData.lore || championData.blurb || ''),
    abilities: buildAbilitiesFromChampionDetail(championData),
    abilityIcons: {
      passive: getAbilityIconUrl(version, championData.passive?.image?.full || '', 'passive'),
      q: getAbilityIconUrl(version, championData.spells?.[0]?.image?.full || ''),
      w: getAbilityIconUrl(version, championData.spells?.[1]?.image?.full || ''),
      e: getAbilityIconUrl(version, championData.spells?.[2]?.image?.full || ''),
      r: getAbilityIconUrl(version, championData.spells?.[3]?.image?.full || '')
    },
    spells: championData.spells || [],
    passive: championData.passive || null,
    skins: buildSkinsFromChampionDetail(championData.skins || [])
  };
}

export function mergeChampionData(baseHero, detailModel = null, localHero = null) {
  const merged = normalizeHero({
    ...(baseHero || {}),
    ...(localHero || {}),
    ddKey: detailModel?.ddKey || localHero?.ddKey || baseHero?.ddKey,
    roles: detailModel?.roles?.length ? detailModel.roles : localHero?.roles || baseHero?.roles,
    title: localHero?.title || detailModel?.title || baseHero?.title,
    lore: localHero?.lore || detailModel?.lore || baseHero?.lore,
    abilities: detailModel?.abilities || localHero?.abilities || baseHero?.abilities,
    skins: detailModel?.skins?.length ? detailModel.skins : localHero?.skins || baseHero?.skins
  });

  return {
    ...merged,
    abilityIcons: detailModel?.abilityIcons || null,
    version: detailModel?.version || DEFAULT_DATA_DRAGON_VERSION,
    detailSource: detailModel
  };
}

export async function fetchLatestDataDragonVersion() {
  try {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    if (!response.ok) return DEFAULT_DATA_DRAGON_VERSION;
    const versions = await response.json();
    return Array.isArray(versions) && versions.length > 0 ? versions[0] : DEFAULT_DATA_DRAGON_VERSION;
  } catch {
    return DEFAULT_DATA_DRAGON_VERSION;
  }
}

export async function fetchChampionCatalog(version) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/zh_CN/champion.json`
  );
  if (!response.ok) {
    throw new Error('Failed to load champion catalog');
  }
  const data = await response.json();
  return transformChampionList(data.data || {});
}

export async function fetchChampionDetail(version, heroOrId) {
  const championKey = getChampionKey(heroOrId);
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/zh_CN/champion/${championKey}.json`
  );
  if (!response.ok) {
    throw new Error('Failed to load champion detail');
  }
  const data = await response.json();
  return data.data?.[championKey] || null;
}

export async function resolveChampionPayload(heroId, localHeroes = []) {
  const version = await fetchLatestDataDragonVersion();

  let catalog = [];
  try {
    catalog = await fetchChampionCatalog(version);
  } catch {
    catalog = [];
  }

  const mergedCatalog = mergeChampionCatalog(catalog, localHeroes);
  const localHero = localHeroes.find((hero) => hero.id === heroId) || null;
  let baseHero = mergedCatalog.find((hero) => hero.id === heroId) || localHero;
  let detailModel = null;

  try {
    const championDetail = await fetchChampionDetail(version, baseHero?.ddKey || heroId);
    if (championDetail) {
      detailModel = buildChampionDetailModel(championDetail, version);
      if (!baseHero) {
        baseHero = buildChampionFromDetail(heroId, championDetail);
      }
    }
  } catch {
    // ignore network failures, local fallback below
  }

  if (!baseHero && localHero) {
    baseHero = localHero;
  }

  if (!baseHero) {
    return {
      version,
      catalog: mergedCatalog,
      hero: null
    };
  }

  const hero = mergeChampionData(baseHero, detailModel, localHero);

  return {
    version,
    catalog: mergedCatalog,
    hero
  };
}

export function buildHeroGuideModel(hero) {
  const normalized = normalizeHero(hero);
  const preset = getRolePreset(normalized.roles);
  const abilityList = normalized.abilities
    ? [
        ['被动', 'passive'],
        ['Q', 'q'],
        ['W', 'w'],
        ['E', 'e'],
        ['R', 'r']
      ]
        .map(([label, key]) => {
          const ability = normalized.abilities[key];
          if (!ability) return null;
          return {
            key: label,
            name: ability.name,
            description: ability.description,
            cooldown: ability.cooldown,
            mana: ability.mana,
            icon: normalized.abilityIcons?.[key] || '',
            tips: buildAbilityTips(label, normalized.roles, ability.description)
          };
        })
        .filter(Boolean)
    : [];

  const runePrimary = normalized.runes?.primary || preset.runes.primary;
  const runeSecondary = normalized.runes?.secondary || preset.runes.secondary;
  const runeKeystone = normalized.runes?.keystone || preset.runes.keystone;
  const coreItems = Array.isArray(normalized.builds?.core) ? normalized.builds.core : preset.builds.core;
  const situationalItems = Array.isArray(normalized.builds?.situational)
    ? normalized.builds.situational
    : preset.builds.situational;

  return {
    hero: normalized,
    overview: [
      {
        title: '打法关键词',
        value: preset.focus,
        text: preset.intro
      },
      {
        title: '分路理解',
        value: normalized.roles.join(' / '),
        text: '先明确你在阵容中的职责，再决定自己要打前排、节奏还是收割。'
      },
      {
        title: '版本适配',
        value: '以通用逻辑为主',
        text: '这页优先保留长期稳定的打法判断，避免写死容易过时的版本答案。'
      }
    ],
    playstyles: [
      {
        name: preset.guideAngles[0] || '对线打法',
        icon: '⚔️',
        description: '围绕兵线、换血与技能命中建立第一波优势。',
        early: normalized.playstyle.early,
        mid: normalized.playstyle.mid,
        late: normalized.playstyle.late,
        tips: [
          '每次换血前先确认兵线位置和敌方打野可能的出现时间。',
          '把核心位移或防守技能留给最危险的时间点，而不是先手全交。',
          '对线领先后优先把优势转成线权、镀层和河道先落位。'
        ]
      },
      {
        name: preset.guideAngles[1] || '中期运营',
        icon: '🗺️',
        description: '把单线领先转成先锋、小龙、视野和边线兵线的团队收益。',
        early: '线权和回城节奏稳定后，优先配合打野或辅助处理第一波河道资源。',
        mid: '中期以“先清线，再进资源区”为原则，减少无意义空转和迟到团。',
        late: '当地图缩小时，站位和视野比单次操作更重要，要始终和队伍节奏一致。',
        tips: [
          '先推线再支援，避免每次游走都白白亏兵。',
          '把击杀后续动作固定成“推线/转塔/控龙”三选一。',
          '逆风时优先守中路线和关键高地视野，不轻易野区接战。'
        ]
      },
      {
        name: preset.guideAngles[2] || '团战执行',
        icon: '🛡️',
        description: '明确自己在团战里是先手、补伤害、保护后排还是残局追击。',
        early: '小规模碰撞里先判断人数和技能状态，别因为一波兵线就硬接团。',
        mid: '资源团开打前 30-40 秒先到场，留时间处理视野和阵型。',
        late: '后期每次进场都要有退路，能连续输出或二次进场通常比第一时间梭哈更值。',
        tips: [
          '先确认敌方关键控制和保命技能，再决定自己的进场顺序。',
          '站位尽量和队伍同侧，避免孤立被集火。',
          '团战结束后立刻转资源，不让优势停留在击杀数字上。'
        ]
      }
    ],
    abilities: abilityList,
    builds: [
      {
        title: '标准成装',
        summary: '适合多数均势或顺风对局，优先保证主属性和中期节奏。',
        items: coreItems,
        runes: { primary: runePrimary, secondary: runeSecondary, keystone: runeKeystone }
      },
      {
        title: '逆风/抗压选择',
        summary: '当对方爆发更高或控制更多时，优先补容错与生存，而不是执着纯输出。',
        items: situationalItems.slice(0, 4),
        runes: { primary: runePrimary, secondary: runeSecondary, keystone: runeKeystone }
      }
    ],
    runeSets: [
      {
        title: '标准对局',
        primary: runePrimary,
        keystone: runeKeystone,
        secondary: runeSecondary,
        notes: '默认用于多数均势对线，优先保证稳定收益和成装曲线。'
      },
      {
        title: '压制或反手',
        primary: runePrimary,
        keystone: runeKeystone,
        secondary: '启迪/坚决',
        notes: '如果你更需要线上续航、鞋子时机或抗压能力，可以适当换副系。'
      }
    ],
    matchups: [
      {
        enemy: '长手消耗型对手',
        difficulty: '困难',
        tips: '以补刀和兵线位置为先，等技能窗口或打野路线到位再换血。'
      },
      {
        enemy: `${normalized.roles[0]}镜像或近战对拼`,
        difficulty: '中等',
        tips: '关键在于谁先骗出防守技能，以及谁更会处理回推线。'
      },
      {
        enemy: '强控制团战阵容',
        difficulty: '中等',
        tips: '提前考虑鞋子、韧性和进场路线，别在正面第一时间吃满控制。'
      }
    ],
    matchupNotes: [
      '先判断敌方是想消耗你，还是等打野配合打一波。',
      '你每次回城后的第一波线，通常最容易决定下一个 2 分钟节奏。',
      '对线不是比谁更勇，而是比谁更少在错误时间交技能。'
    ],
    combos: [
      {
        name: '稳定起手',
        keys: '先手控制/接近 + 主伤害技能 + 追击',
        difficulty: '基础',
        description: '优先练最稳定的一套连招，让自己在实战里能稳定打满伤害。'
      },
      {
        name: '资源团先手',
        keys: '绕视野落位 + 核心技能命中 + 团队跟进',
        difficulty: '进阶',
        description: '资源团连招更看重地形和视野，而不是单纯拼手速。'
      },
      {
        name: '残局收割',
        keys: '保留位移/保命 + 处理残血 + 及时拉开',
        difficulty: '进阶',
        description: '不要为了追最后一个人把自己送进敌方反打范围。'
      }
    ],
    teamfight: {
      phases: [
        ['前期小规模碰撞', '围绕河道和兵线人数差开打，能先落位就别后手硬接。'],
        ['中期资源团', '确认队伍阵型后再决定先手还是反手，别自己把战线拉散。'],
        ['后期决胜团', '把技能交给最关键目标，并提前想好打赢后要转哪一个资源。']
      ],
      positioning:
        '与队伍保持同侧站位，优先争取视野和地形，而不是在空旷正面硬拼第一波技能。',
      checklist: [
        '资源刷新前 40 秒开始处理兵线和视野。',
        '开团前先确认闪现、终极技能和关键召唤师技能状态。',
        '赢团后立刻转塔、龙、先锋或男爵，不让团战价值浪费。'
      ]
    },
    tips: [
      '如果这一页只记住一件事，那就是先把每波兵线和资源点串起来看。',
      '熟练度提升最快的顺序通常是：补刀稳定 -> 技能命中 -> 地图节奏 -> 连招上限。',
      '遇到输线局时，先想怎么少亏，而不是怎么一波翻盘。'
    ]
  };
}

function buildAbilityTips(label, roles, description) {
  const roleText = roles.join(' / ');
  const cleanDesc = summarizeText(description, 56);
  return [
    `${label} 的价值不只在伤害，还在于你用它拿到的站位、线权或换血节奏。`,
    `如果这招是你的核心资源，就不要为了“试探”在无把握时先交。`,
    cleanDesc ? `记忆点：${cleanDesc}` : `${roleText} 对局里要优先把技能交给最关键目标。`
  ];
}
