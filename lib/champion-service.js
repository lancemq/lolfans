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
  const primaryRole = normalized.roles[0] || '战士';
  const roleBriefing = getRoleBriefing(primaryRole);
  const difficultyBriefing = getDifficultyBriefing(normalized.difficulty);
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
        text: roleBriefing.identity
      },
      {
        title: '版本适配',
        value: '以通用逻辑为主',
        text: `这页优先保留长期稳定的打法判断，避免写死容易过时的版本答案。${
          siteMeta?.championUpdatedAt ? ` 官方资料最近同步：${siteMeta.championUpdatedAt}。` : ''
        }`
      },
      {
        title: '上手建议',
        value: difficultyBriefing.label,
        text: `${difficultyBriefing.text} ${roleBriefing.practice}`
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
    earlyPlan: [
      {
        title: '开局目标',
        window: '0-3 分钟',
        notes: roleBriefing.earlyGoal
      },
      {
        title: '第一波回城',
        window: '3-6 分钟',
        notes: roleBriefing.firstBase
      },
      {
        title: '六级前后转节奏',
        window: '6-10 分钟',
        notes: roleBriefing.levelSix
      }
    ],
    earlyMistakes: getRoleEarlyMistakes(primaryRole),
    abilities: abilityList,
    skillOrder: [
      {
        title: roleBriefing.skillOrderTitles[0],
        order: roleBriefing.skillOrderOrders[0],
        notes: roleBriefing.skillOrderNotes[0]
      },
      {
        title: roleBriefing.skillOrderTitles[1],
        order: roleBriefing.skillOrderOrders[1],
        notes: roleBriefing.skillOrderNotes[1]
      },
      {
        title: roleBriefing.skillOrderTitles[2],
        order: roleBriefing.skillOrderOrders[2],
        notes: roleBriefing.skillOrderNotes[2]
      }
    ],
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
    buildAdjustments: {
      core: [
        ['第一件先保证节奏装', '优先让清线、对拼或刷野速度成型，再去补更贪的伤害件。'],
        ['第二件补当前最缺的属性', '缺伤害补穿透或爆发，缺容错就补韧性、血量或保命。']
      ],
      ahead: [
        '顺风时把优势先转成更快清线、先落位和资源压制，而不是只想着再多一件纯输出。',
        '如果你已经能稳定先手，下一件优先考虑能把连胜节奏继续滚下去的中期件。'
      ],
      behind: [
        '逆风时先补能让你活到第二轮技能的装备，别为了账面伤害把团战时间缩短。',
        '被逼守线时，优先考虑清线、安全吃资源和跟团容错，而不是继续赌单点斩杀。'
      ]
    },
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
    summonerSpells: [
      {
        title: roleBriefing.summonerTitles[0],
        spells: roleBriefing.summonerSpells[0],
        useCase: roleBriefing.summonerUseCases[0],
        notes: roleBriefing.summonerNotes[0]
      },
      {
        title: roleBriefing.summonerTitles[1],
        spells: roleBriefing.summonerSpells[1],
        useCase: roleBriefing.summonerUseCases[1],
        notes: roleBriefing.summonerNotes[1]
      },
      {
        title: roleBriefing.summonerTitles[2],
        spells: roleBriefing.summonerSpells[2],
        useCase: roleBriefing.summonerUseCases[2],
        notes: roleBriefing.summonerNotes[2]
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
    matchupDetails: [
      {
        title: '对线领先时',
        text: '领先后优先把优势转成线权、回城时机和资源先落位，而不是为了多打一波伤害把位置交掉。'
      },
      {
        title: '对线被压时',
        text: '被压时先守住血量、经验和关键技能，不要因为一波兵线就把整段对线节奏一起送掉。'
      }
    ],
    synergy: {
      allies: [
        ['稳定控制队友', '能帮你把第一波关键技能或进场机会变得更稳定。'],
        ['会先做视野和先落位的队友', '能让你的强势期更容易转成资源和地图收益。']
      ],
      comps: [
        ['有明确前排的阵容', '有人吃第一波技能时，你更容易把输出和执行打完整。'],
        ['节奏一致的资源团体系', '当队伍知道这波要先推线还是先占位时，你的发挥会更稳定。']
      ]
    },
    synergyCases: [
      {
        duo: '和稳定先手队友一起打',
        window: '资源刷新前后',
        plan: '让队友先拿视野或先交第一手控制，你负责补关键伤害、控制或收尾，不抢先把自己的核心资源交空。'
      },
      {
        duo: '和会处理兵线的队友联动',
        window: '中期边线转河道',
        plan: '先同步推完兵线再一起进河道或野区，这样你们的组合价值才会从“打得过”变成“能先到、能先动”。'
      }
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

function getDifficultyBriefing(difficulty = '中等') {
  const map = {
    简单: {
      label: '适合先建立基本功',
      text: '这类英雄通常更适合先练补刀、站位、兵线和资源意识，再逐步增加操作细节。'
    },
    中等: {
      label: '适合边打边建立判断',
      text: '这类英雄既需要基础操作，也需要一定局势判断，适合在实战中逐步拉高熟练度。'
    },
    困难: {
      label: '适合有耐心反复练习',
      text: '这类英雄的上限高，但前提是你愿意为技能顺序、站位、节奏和失误复盘投入更多时间。'
    }
  };

  return map[difficulty] || map.中等;
}

function getRoleBriefing(role = '战士') {
  const profiles = {
    战士: {
      identity: '先明确自己这局更偏边线压制、正面进场还是跟队友打第二拍。战士最怕的是定位模糊，结果每波都站在不上不下的位置。',
      practice: '练习重点放在兵线位置、换血边界和什么时候该把优势转成河道与边线资源。',
      earlyGoal: '前几波先建立血量和兵线的主动权，别在没有退路时硬换。战士真正的前期价值来自能不能把线权变成先动权。',
      firstBase: '第一波回家优先补让换血与清线都更舒服的关键小件，确保回来后还能继续压线或稳定守线。',
      levelSix: '六级后先看自己能不能靠线权去接先锋、小龙或边线碰撞，不一定非要把大招用在线上单杀。',
      skillOrderTitles: ['主加核心压线技能', '抗压时先补功能点', '六级后回到主线'],
      skillOrderOrders: ['主伤害/清线技能 > 副机动或功能技能 > 其余技能，有大点大', '前三级先把对线必要技能开齐，再回到主技能主线', '六级后优先保证主技能成型速度'],
      skillOrderNotes: [
        '战士最稳定的提升来自主技能等级带来的换血和清线收益。',
        '如果对线更吃反打或保命，早点点出功能技能比死守模板更稳。',
        '中期资源团里，你最需要的是稳定伤害和进场节奏，不要把主线拖散。'
      ],
      summonerTitles: ['默认携带', '压制对线', '抗压保命'],
      summonerSpells: ['闪现 + 对拼技能', '闪现 + 更强斩杀技能', '闪现 + 防守型技能'],
      summonerUseCases: [
        '多数均势对局，兼顾换血、团战和追击容错。',
        '你确定自己能在对线建立明显血量差，且敌方打野压力不大时。',
        '敌方控制、爆发或中野联动强，你更需要稳过前中期时。'
      ],
      summonerNotes: [
        '战士的召唤师技能核心在于让自己能把第一波优势滚成中期资源。',
        '压制型带法更吃兵线与视野，一旦前几波打空，后续风险会变高。',
        '保命带法不是退让，而是让你活着进入下一轮更关键的资源团。'
      ]
    },
    刺客: {
      identity: '刺客的职责不是每波都秒人，而是让敌方后排永远不能舒舒服服站位。你要先判断这局是打线、打边，还是打残局。',
      practice: '练习重点放在技能顺序、能量或资源管理，以及什么时候先逼技能、什么时候再真正进场。',
      earlyGoal: '前几波先稳住血量和兵线，等对手关键技能真空期再压一套。刺客最怕的是为了第一波手感，把整段对线资源都交空。',
      firstBase: '第一波回城优先补让爆发和清线更完整的关键散件，让六级前后第一次节奏点更有把握。',
      levelSix: '六级后先想清楚谁最容易被逼闪现或被打残，不一定非要直接单杀。对刺客来说，召唤师技能优势和边线主导权同样值钱。',
      skillOrderTitles: ['主加爆发主技能', '前三级先开关键联动', '别把主线改散'],
      skillOrderOrders: ['主爆发技能 > 副联动技能 > 其余技能，有大点大', '前三等级保证基础连段成立，再回到主技能主线', '六级后继续围绕最稳的伤害链加点'],
      skillOrderNotes: [
        '刺客的加点核心是让一套技能稳定打满，而不是把每个技能都点得“看起来能用”。',
        '前三级有时更需要完整连段，而不是单个技能的边际提升。',
        '只要主爆发技能等级被拖慢，你的斩杀线和边线威慑都会下降。'
      ],
      summonerTitles: ['默认携带', '滚雪球带法', '打高控阵容'],
      summonerSpells: ['闪现 + 进攻型技能', '闪现 + 强斩杀技能', '闪现 + 净化/防守型技能'],
      summonerUseCases: [
        '多数中路或边线对局，优先保证击杀与调整空间。',
        '你想把六级后第一波大招节奏变成稳定击杀时。',
        '敌方稳定点控很多，你更怕进场后直接被锁死时。'
      ],
      summonerNotes: [
        '刺客最怕技能还在，人已经先被控住，所以闪现通常很难替代。',
        '滚雪球带法很强，但要建立在线权和视野能支撑你先动的前提上。',
        '保命类带法会降低锋利度，但能让你更稳定打到第二拍进场。'
      ]
    },
    法师: {
      identity: '法师的价值不只在伤害数字，而在于你能否稳定拿线、先到河道、先卡地形。法师一旦线权丢了，很多节奏都会被连锁压缩。',
      practice: '练习重点放在补刀、蓝量、技能命中铺垫和回城节奏，而不是只盯着一发技能中了没中。',
      earlyGoal: '前几波先围绕清线和蓝量管理打，别为了抢一次换血把自己卡进技能真空期。法师真正的前期优势来自先推线再先动。',
      firstBase: '第一波回家优先补让清线和蓝量继续舒服的散件，确保回线后不至于立刻失去兵线主导权。',
      levelSix: '六级后先想清楚你是继续压中、逼塔皮，还是跟打野先去边路制造人数差。法师最怕的是中线没推完就盲目离线。',
      skillOrderTitles: ['先做清线主技能', '前几级补控制或保命点', '推线权永远别乱丢'],
      skillOrderOrders: ['主清线/核心输出技能 > 副副伤害或功能技能 > 其余技能，有大点大', '对线压力大时先把控制/位移点出来，再回到主技能', '六级后继续保证中线处理速度'],
      skillOrderNotes: [
        '法师多数时候最怕线推不动，所以主清线技能等级通常不能拖。',
        '早点拿到控制或保命点，往往能换来更稳的回线和更安全的河道落位。',
        '只要线权稳住，你的团战和游走都会自然变强。'
      ],
      summonerTitles: ['默认携带', '压线消耗', '打稳定控制'],
      summonerSpells: ['闪现 + 对线技能', '闪现 + 更强压制技能', '闪现 + 净化/传送'],
      summonerUseCases: [
        '多数均势法师对局，兼顾对线与团战调整空间。',
        '你想扩大线权、消耗和六级前后的中路主导权时。',
        '敌方控制稳定，或你更需要稳住中线和回线节奏时。'
      ],
      summonerNotes: [
        '法师最重要的是别因为召唤师技能选得太激进，反而把线权送掉。',
        '压制型带法很看命中率和兵线处理，不适合每局无脑带。',
        '传送和净化这类选择，常常能让法师更稳定打出“先推线再动”的节奏。'
      ]
    },
    射手: {
      identity: '射手最重要的不是花哨操作，而是补刀、站位和输出顺序是否始终稳定。你要先判断自己这局该争线、该抗压，还是该单纯保发育。',
      practice: '练习重点放在补刀稳定性、回城时机、谁先碰到你，以及团战第一目标选择。',
      earlyGoal: '前几波先守住血量和补刀，不要为了打一波漂亮换血把自己站位交掉。射手最怕的是线没赢，血和经验还一起亏。',
      firstBase: '第一波回家优先补让回线更舒服的攻击和续航组件，保证回来后还能稳线或接资源团。',
      levelSix: '六级后先把大招或关键资源看成补伤害、收尾或反打工具，不必每次都自己找先手。前 10 分钟的核心仍然是成装速度。',
      skillOrderTitles: ['主加稳定输出技能', '前三级把保命点开齐', '不要为了手感拖主线'],
      skillOrderOrders: ['主持续输出/清线技能 > 副消耗或保命技能 > 其余技能，有大点大', '前三级保证保命与反手工具齐全，再回到主技能', '中期继续保证主技能等级收益'],
      skillOrderNotes: [
        '射手多数时候靠主技能保证发育和团战输出曲线。',
        '越是高压对线，越不能忽视早一点拿到保命技能的价值。',
        '只要主输出技能等级成型慢了，中期每波团的伤害都会打折。'
      ],
      summonerTitles: ['默认携带', '打强开控制', '高压对线求稳'],
      summonerSpells: ['闪现 + 治疗/常规保命技能', '闪现 + 净化', '闪现 + 屏障/更稳保命技能'],
      summonerUseCases: [
        '多数下路均势对局，优先保证发育和团战基础容错。',
        '对面控制稳定，吃到一波就容易直接倒的局。',
        '下路线爆发很高，你更担心前几波被直接打穿时。'
      ],
      summonerNotes: [
        '射手最需要的是活到能连续输出，而不是账面上多那一点激进收益。',
        '净化的价值常常不在回血，而在于你能不能活着走出第一波控制。',
        '保命技能带得稳，很多时候比线上多一点压制更划算。'
      ]
    },
    辅助: {
      identity: '辅助的价值在于让队友更容易做出正确决策。你要先判断这局要帮下路线权、帮打野抢信息，还是提前为主核准备保护环境。',
      practice: '练习重点放在草丛控制、回家后的视野路线、这波该开还是该保，以及谁是本局最需要你保护的人。',
      earlyGoal: '前几波先用站位、草丛和线权协助队友，不是每波都必须先手。辅助真正的前期价值是让队友能更舒服地赢第一波线。',
      firstBase: '第一波回家优先补视野、鞋子或功能件，保证回图后还能持续影响河道和下半区入口。',
      levelSix: '六级后辅助的职责会快速扩展到河道、野区和资源团。先想好这波是抓单、开团还是保核，不要看到机会就一股脑冲上去。',
      skillOrderTitles: ['主加最稳定的先手/保护技能', '前三级把关键工具开齐', '根据职责决定副技能'],
      skillOrderOrders: ['主最稳定起节奏的技能 > 副反手/保护技能 > 其余技能，有大点大', '前三等级优先把先手、反手和保人工具配齐', '中期根据开团还是保核职责调整副技能'],
      skillOrderNotes: [
        '辅助加点的核心不是伤害，而是你能否更稳定地把队友带进正确节奏。',
        '前三级工具齐不齐，常常直接决定第一波河道和下路线权。',
        '如果你的任务已经从进攻转成保人，就不要继续按纯进攻心态加点。'
      ],
      summonerTitles: ['默认携带', '对线进攻', '保核反开'],
      summonerSpells: ['闪现 + 常规进攻/功能技能', '闪现 + 点燃', '闪现 + 虚弱/更强保护技能'],
      summonerUseCases: [
        '大多数辅助对局，优先保留线权和中期功能性。',
        '你明确想增强下路对拼和抓失误收益时。',
        '敌方刺客、爆发或突进点很清晰，你更需要保护主核时。'
      ],
      summonerNotes: [
        '辅助召唤师技能的价值，常常体现在队友能不能把这波正确打完。',
        '点燃会提高锋利度，但也意味着你更需要在线上把节奏主动打出来。',
        '虚弱这类技能常常能直接决定主核能不能活过第一轮冲脸。'
      ]
    },
    坦克: {
      identity: '坦克不是单纯抗打，而是负责在正确位置吃掉第一波技能、撑开阵型并给队友争取输出空间。你要先想清楚自己是要抗压、顶正面还是主动找先手。',
      practice: '练习重点放在兵线和血量管理、资源团前的落位、什么时候开团、什么时候回头护住自家主核。',
      earlyGoal: '前几波先稳住经验和血线，不要为了无意义换血把整波兵线都亏掉。坦克最怕的是还没到中期就先把前排资格打没了。',
      firstBase: '第一波回家优先补坦度和续航，让自己回线后还能继续顶线、守塔或先到资源区。',
      levelSix: '六级后先想清楚这波大招要换什么，是开先锋、小龙，还是单纯帮队友把线权守住。坦克的大招价值更看团队收益。 ',
      skillOrderTitles: ['主加最稳的清线或消耗技能', '抗压时先补保命点', '中期围绕前排职责加点'],
      skillOrderOrders: ['主稳定对线/清线技能 > 副抗压或控制技能 > 其余技能，有大点大', '前三级优先把抗压和保命工具开齐', '六级后根据开团还是保护职责继续补主线'],
      skillOrderNotes: [
        '坦克不是不需要加点逻辑，清线和抗压曲线会直接影响你中期能不能顶在前面。',
        '前几级多一层保命和控制，经常比多一点表面伤害更重要。',
        '一旦前排节奏稳住，中期资源团的价值会比对线那点小赚小亏大得多。'
      ],
      summonerTitles: ['默认携带', '对线压制', '抗压稳团'],
      summonerSpells: ['闪现 + 常规对线技能', '闪现 + 更强换血技能', '闪现 + 传送/防守技能'],
      summonerUseCases: [
        '多数上路或前排对局，兼顾对线、资源团和开团容错。',
        '你确定前期能靠换血和线权建立优势时。',
        '更看重回线、边线覆盖和中后期稳定参团时。'
      ],
      summonerNotes: [
        '坦克通常仍然离不开闪现，因为开团角度和反手站位都太依赖它。',
        '对线压制技能更适合已经看懂兵线和对位边界的局。',
        '传送与防守技能的价值，在于让你更稳定地把前排职责接到中期。'
      ]
    }
  };

  return profiles[role] || profiles.战士;
}

function getRoleEarlyMistakes(role = '战士') {
  const map = {
    战士: [
      '前几波没确认打野位置，就把位移和换血技能一起交空。',
      '为了打一波漂亮对拼，把兵线位置和回城节奏一起送掉。',
      '六级后只想着线上继续压人，没有把优势转成河道和资源点先手。'
    ],
    刺客: [
      '前几波过度急于找单杀，结果血量、能量和线权一起亏。',
      '兵线没处理好就先离线，最后人没抓到，中线也守不住。',
      '六级一到就盲目交大，没有先挑最容易打出召唤师技能的目标。'
    ],
    法师: [
      '为了抢一波技能命中，把蓝量和清线节奏一起打空。',
      '中线没推完就提前离线游走，导致边路没抓成，中路先亏。',
      '六级后只想着先手秒人，忽略了法师更擅长先占位再打覆盖。'
    ],
    射手: [
      '前几波站位太贪，既亏血量又亏补刀，整条线直接进入被动。',
      '回城时机太晚，导致回来后装备、兵线和视野都接不上。',
      '六级后太急着开技能找人，反而错过了更稳的收尾和反打。'
    ],
    辅助: [
      '为了证明自己能开，把草丛控制和站位一起交掉。',
      '第一波回家只想着补装备，忘了视野路线和回图任务。',
      '六级后每波都抢第一手，真正该保人的团反而没有资源可用。'
    ],
    坦克: [
      '前几波为了换血把兵线打崩，结果血线和经验一起亏。',
      '回家时机差，回来后既不够肉也赶不上资源点落位。',
      '六级后只想着自己开，不先看队友位置和跟进能力。'
    ]
  };

  return map[role] || map.战士;
}
