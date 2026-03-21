import {
  DEFAULT_DATA_DRAGON_VERSION,
  ROLE_CN_MAP,
  buildAbilitiesFromChampionDetail,
  buildSkinsFromChampionDetail,
  getAbilityIconUrl,
  getChampionKey,
  getRoleEmoji,
  getRolePreset,
  sanitizeText,
  summarizeText,
  toDifficultyLabel,
  toKebabCase
} from './champion-core';
import { getFeaturedGuideOverride } from './featured-guide-overrides';

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

export function buildHeroGuideModel(hero, siteMeta = null) {
  const normalized = normalizeHero(hero);
  const preset = getRolePreset(normalized.roles);
  const featuredOverride = getFeaturedGuideOverride(normalized.id);
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

  const baseGuide = {
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
        text: `这页优先保留长期稳定的打法判断，避免写死容易过时的版本答案。${
          siteMeta?.championUpdatedAt ? ` 官方资料最近同步：${siteMeta.championUpdatedAt}。` : ''
        }`
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
    counters: {
      strongAgainst: [
        ['技能前摇明显的对手', '更容易通过预判和走位抓到他们的技能真空期。'],
        ['线权依赖单一技能的英雄', '只要逼掉关键技能，你就能更舒服地推进下一波节奏。']
      ],
      weakAgainst: [
        ['稳定长手消耗位', '如果一直被压血和控线，你的主动权会明显下降。'],
        ['多控制联动阵容', '一旦关键位移或保命资源交错时机，很容易被连续处理。']
      ]
    },
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
    ],
    powerSpikes: [
      ['第一个关键等级', '先围绕技能完整度提升对线与支援质量。'],
      ['第一件核心装', '这是多数英雄最容易把线权与资源团表现拉开的时间点。'],
      ['两件套团战期', '成装与站位一起到位后，资源团的影响力会明显提高。']
    ],
    mistakes: [
      '先手把关键技能全交，导致后续没有反打与撤退空间。',
      '只盯着对线小赚小亏，忽略了兵线和资源的更大节奏。',
      '团战目标过于理想化，没有先处理最稳定能打到的目标。',
      '逆风时太想一波翻回来，结果把本来还能守住的局面继续送掉。'
    ]
  };

  return mergeGuideOverride(baseGuide, featuredOverride);
}

function mergeGuideOverride(baseGuide, override) {
  if (!override) return baseGuide;

  return {
    ...baseGuide,
    ...override,
    teamfight: override.teamfight ? { ...baseGuide.teamfight, ...override.teamfight } : baseGuide.teamfight,
    counters: override.counters ? { ...baseGuide.counters, ...override.counters } : baseGuide.counters
  };
}

function buildAbilityTips(label, roles, description) {
  const roleText = roles.join(' / ');
  const cleanDesc = summarizeText(description, 56);
  return [
    `${label} 的价值不只在伤害，还在于你用它拿到的站位、线权或换血节奏。`,
    '如果这招是你的核心资源，就不要为了“试探”在无把握时先交。',
    cleanDesc ? `记忆点：${cleanDesc}` : `${roleText} 对局里要优先把技能交给最关键目标。`
  ];
}
