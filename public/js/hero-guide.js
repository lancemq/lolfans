const HERO_ID_MAP = {
    yasuo: 'Yasuo',
    zed: 'Zed',
    riven: 'Riven',
    vayne: 'Vayne',
    irelia: 'Irelia',
    talon: 'Talon',
    mordekaiser: 'Mordekaiser',
    camille: 'Camille',
    renekton: 'Renekton',
    fizz: 'Fizz',
    katarina: 'Katarina',
    ekko: 'Ekko',
    yone: 'Yone',
    vi: 'Vi',
    rengar: 'Rengar',
    ahri: 'Ahri',
    'lee-sin': 'LeeSin'
};

const ROLE_CN_MAP = {
    Fighter: '战士',
    Tank: '坦克',
    Mage: '法师',
    Assassin: '刺客',
    Marksman: '射手',
    Support: '辅助'
};

const ROLE_PRESETS = {
    Fighter: {
        styles: ['对线压制', '边带拉扯'],
        runes: ['精密 · 征服者', '坚决 · 复苏之风'],
        items: ['黑色切割者', '死亡之舞', '斯特拉克的挑战护手', '守护天使', '铁板靴/水银鞋']
    },
    Assassin: {
        styles: ['爆发秒杀', '侧翼切入'],
        runes: ['主宰 · 电刑', '精密 · 致命一击'],
        items: ['幽梦之灵', '德拉克萨的幕刃', '夜之锋刃', '赛瑞尔达的怨恨', '明朗之靴']
    },
    Mage: {
        styles: ['控线消耗', '团战AOE'],
        runes: ['巫术 · 奥术彗星', '主宰 · 终极猎人'],
        items: ['卢登的伙伴', '影焰', '中娅沙漏', '虚空之杖', '法师之靴']
    },
    Marksman: {
        styles: ['稳健发育', '后期接管'],
        runes: ['精密 · 致命节奏', '主宰 · 血之滋味'],
        items: ['无尽之刃', '幻影之舞', '多米尼克领主的致意', '饮血剑', '狂战士胫甲']
    },
    Support: {
        styles: ['对线保护', '视野运营'],
        runes: ['坚决 · 守护者', '启迪 · 神奇之鞋'],
        items: ['山脉壁垒', '骑士之誓', '救赎', '钢铁烈阳之匣', '明朗之靴']
    },
    Tank: {
        styles: ['前排抗伤', '先手开团'],
        runes: ['坚决 · 余震', '启迪 · 星界洞悉'],
        items: ['日炎圣盾', '兰顿之兆', '自然之力', '荆棘之甲', '铁板靴/水银鞋']
    }
};

const FALLBACK_GUIDE = {
    id: 'yasuo',
    name: '亚索',
    title: '疾风剑豪',
    roles: ['战士', '刺客'],
    splashSkin: 0,
    playstyles: [
        {
            name: '中单爆发',
            icon: '⚔️',
            description: '快速打出击飞连招与爆发伤害',
            early: '利用Q快速推线，保持护盾状态与对手换血。',
            mid: '围绕兵线与小规模团战找击飞，建立节奏优势。',
            late: '通过侧翼切后排，注意风墙时机与进场路线。',
            tips: ['保持移动攒被动护盾', '先观察控制技能再进场', 'EQ闪是关键操作']
        }
    ],
    abilities: [
        { key: '被动', name: '浪客之道', description: '移动可获得护盾，暴击收益更高。', tips: ['换血前先攒护盾'] },
        { key: 'Q', name: '斩钢闪', description: '叠层后产生击飞旋风。', tips: ['连招核心起手技能'] },
        { key: 'W', name: '风之障壁', description: '阻挡飞行道具。', tips: ['关键时刻保命和反打'] },
        { key: 'E', name: '踏前斩', description: '借助兵线快速位移。', tips: ['保持机动性与拉扯'] },
        { key: 'R', name: '狂风绝息斩', description: '接击飞目标进场收割。', tips: ['与队友击飞配合更稳定'] }
    ],
    builds: ['无尽之刃', '不朽盾弓', '幻影之舞', '守护天使', '狂战士胫甲'],
    runeSets: ['精密 · 致命节奏', '坚决 · 复苏之风'],
    matchups: [
        { enemy: '长手法师', difficulty: '中等', tips: '优先稳线，等待打野节奏。' },
        { enemy: '爆发刺客', difficulty: '困难', tips: '保留风墙与位移避免被秒。' }
    ],
    combos: [
        { name: '基础连招', keys: 'E + Q + R', description: '借位移接近并用击飞衔接大招。' },
        { name: '进阶连招', keys: 'EQ + 闪现 + R', description: '通过闪现改变击飞落点。' }
    ],
    teamfight: {
        early: '以对线压制和支援为主。',
        mid: '围绕小龙和先锋参与中期团战。',
        late: '侧翼切后排并保护己方核心输出。',
        positioning: '优先从侧面入场，避免正面吃满控制。'
    },
    tips: ['优先提升补刀和兵线理解', '观察敌方关键技能冷却', '逆风时先保证发育']
};

function stripHtml(value) {
    return (value || '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\{\{\s*[^}]+\s*\}\}/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function toTitleCaseId(heroId) {
    if (!heroId) return '';
    return heroId
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function getRolePreset(tags) {
    const primaryTag = tags[0] || 'Fighter';
    return ROLE_PRESETS[primaryTag] || ROLE_PRESETS.Fighter;
}

function getRoleClass(role) {
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

function buildGuideFromChampion(heroId, champion) {
    const tags = champion.tags || ['Fighter'];
    const roles = tags.map(tag => ROLE_CN_MAP[tag] || '战士');
    const preset = getRolePreset(tags);

    const playstyles = [
        {
            name: preset.styles[0],
            icon: '⚔️',
            description: `围绕${champion.name}的技能优势建立前中期节奏`,
            early: '1-6级优先补刀与换血，保持血量优势并控制兵线。',
            mid: '7-14级配合打野争夺地图资源，推线后先手支援边路。',
            late: '15级后根据阵容担任切后排或持续输出职责，避免先手吃控。',
            tips: ['注意兵线位置和敌方打野动向', '优先保证关键技能命中率', '团战前先处理好视野']
        },
        {
            name: preset.styles[1],
            icon: '🛡️',
            description: `以团战站位和资源博弈为核心的稳定打法`,
            early: '稳健发育为主，避免无意义换血，保证关键等级曲线。',
            mid: '围绕小龙、先锋与边线运营扩大团队优势。',
            late: '后期以阵型协同为主，优先处理敌方威胁最大的输出点。',
            tips: ['不要脱离队伍单独冒进', '利用地形与草丛隐藏进场意图', '劣势局优先控线拖发育']
        }
    ];

    const spells = champion.spells || [];
    const abilities = [
        {
            key: '被动',
            name: champion.passive?.name || '被动技能',
            description: stripHtml(champion.passive?.description || ''),
            tips: ['对线前理解被动触发条件', '围绕被动收益选择换血时机']
        },
        ...spells.map((spell, index) => ({
            key: ['Q', 'W', 'E', 'R'][index] || '技能',
            name: spell.name,
            description: stripHtml(spell.description),
            tips: [
                `留意${spell.name}的冷却与施法距离`,
                '团战中优先用于处理关键目标'
            ]
        }))
    ];

    const combos = [
        {
            name: '基础连招',
            keys: 'Q + W + E',
            description: '先手命中控制或减速后衔接主要输出技能。'
        },
        {
            name: '斩杀连招',
            keys: 'E + Q + R',
            description: '利用位移拉近距离并用终极技能完成收割。'
        },
        {
            name: '团战连招',
            keys: '先手控制 + 核心伤害 + 追击收尾',
            description: '根据敌方站位灵活调整技能顺序，优先击杀C位。'
        }
    ];

    const matchupRole = roles[0] || '战士';
    const matchups = [
        {
            enemy: '长手消耗型英雄',
            difficulty: '困难',
            tips: '前期以补刀发育为主，等待技能窗口再换血。'
        },
        {
            enemy: `${matchupRole}近战对拼型英雄`,
            difficulty: '中等',
            tips: '留关键技能反打，避免在敌方强势期硬拼。'
        },
        {
            enemy: '控制链阵容',
            difficulty: '中等',
            tips: '优先做韧性和保命装备，入场前确认控制技能已交。'
        }
    ];

    return {
        id: heroId,
        ddragonId: champion.id,
        name: champion.name,
        title: champion.title,
        roles,
        splashSkin: 0,
        playstyles,
        abilities,
        builds: preset.items,
        runeSets: preset.runes,
        matchups,
        combos,
        teamfight: {
            early: '前期围绕对线和首个资源点建立节奏。',
            mid: '中期跟随团队推进视野并组织小规模团战。',
            late: '后期优先处理敌方核心输出并保护己方主力。',
            positioning: '保持与队友同侧站位，避免孤立被集火。'
        },
        tips: [
            '先练稳定补刀和兵线理解，再追求高风险操作。',
            '每波团战前先确认闪现、点燃/惩戒等关键技能状态。',
            '根据敌方伤害类型灵活切换防御装与鞋子。'
        ]
    };
}

async function fetchChampionGuide(heroId) {
    const ddragonId = HERO_ID_MAP[heroId] || toTitleCaseId(heroId);
    const versions = ['15.4.1', '15.3.1', '14.24.1'];

    for (const version of versions) {
        const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/zh_CN/champion/${ddragonId}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) continue;
            const payload = await response.json();
            const champion = payload.data?.[ddragonId];
            if (champion) {
                return buildGuideFromChampion(heroId, champion);
            }
        } catch (error) {
            // 网络失败时继续尝试下一个版本
        }
    }

    return FALLBACK_GUIDE;
}

function renderHeroHeader(guide) {
    const splashId = guide.ddragonId || HERO_ID_MAP[guide.id] || toTitleCaseId(guide.id);
    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${splashId}_${guide.splashSkin || 0}.jpg`;
    document.getElementById('guideHeroSplash').style.backgroundImage = `url('${splashUrl}')`;
    document.getElementById('guideHeroName').textContent = `${guide.title} ${guide.name}`;
    document.getElementById('guideHeroTitle').textContent = guide.title;
    document.getElementById('guideHeroSubtitle').textContent = guide.name;

    const rolesHtml = (guide.roles || []).map(role => `<span class="role-tag ${getRoleClass(role)}">${role}</span>`).join('');
    document.getElementById('guideHeroRoles').innerHTML = rolesHtml;
    document.title = `${guide.name}攻略 ${guide.title} - 英雄联盟爱好者`;
}

function renderPlaystyles(guide) {
    const tabsContainer = document.getElementById('playstyleTabs');
    const contentContainer = document.getElementById('playstyleContent');

    tabsContainer.innerHTML = guide.playstyles.map((style, index) => `
        <button class="playstyle-tab ${index === 0 ? 'active' : ''}" data-index="${index}">
            <span class="tab-icon">${style.icon}</span>
            <span class="tab-name">${style.name}</span>
        </button>
    `).join('');

    contentContainer.innerHTML = guide.playstyles.map((style, index) => `
        <div class="playstyle-panel ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="playstyle-header">
                <span class="playstyle-icon">${style.icon}</span>
                <div>
                    <h3>${style.name}</h3>
                    <p>${style.description}</p>
                </div>
            </div>
            <div class="playstyle-phases">
                <div class="phase-card"><div class="phase-icon">🌅</div><h4>前期</h4><p>${style.early}</p></div>
                <div class="phase-card"><div class="phase-icon">🌇</div><h4>中期</h4><p>${style.mid}</p></div>
                <div class="phase-card"><div class="phase-icon">🌙</div><h4>后期</h4><p>${style.late}</p></div>
            </div>
            <div class="playstyle-tips">
                <h4>💡 技巧要点</h4>
                <ul>${style.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            </div>
        </div>
    `).join('');

    tabsContainer.querySelectorAll('.playstyle-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tabsContainer.querySelectorAll('.playstyle-tab').forEach(t => t.classList.remove('active'));
            contentContainer.querySelectorAll('.playstyle-panel').forEach(panel => panel.classList.remove('active'));
            tab.classList.add('active');
            const target = contentContainer.querySelector(`.playstyle-panel[data-index="${tab.dataset.index}"]`);
            if (target) target.classList.add('active');
        });
    });
}

function renderAbilities(guide) {
    const container = document.getElementById('abilitiesGuide');
    container.innerHTML = guide.abilities.map(ability => `
        <div class="ability-card">
            <div class="ability-key">${ability.key}</div>
            <div class="ability-info">
                <h3>${ability.name}</h3>
                <p>${ability.description}</p>
                <div class="ability-tips">
                    <h4>使用技巧</h4>
                    <ul>${ability.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBuilds(guide) {
    const container = document.getElementById('buildsGuide');
    container.innerHTML = `
        <div class="build-card">
            <h3>推荐出装</h3>
            <p>按当前版本通用思路整理，需根据局势动态调整。</p>
            <ul class="checklist">${guide.builds.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
    `;
}

function renderRunes(guide) {
    const container = document.getElementById('runesGuide');
    container.innerHTML = guide.runeSets.map(rune => `
        <div class="rune-card">
            <h3>${rune.split(' · ')[0]}</h3>
            <p class="rune-keystone">基石：${rune.split(' · ')[1] || rune}</p>
            <p>根据对局节奏在伤害、续航和功能性之间调整副系。</p>
        </div>
    `).join('');
}

function renderMatchups(guide) {
    const container = document.getElementById('matchupsGuide');
    container.innerHTML = guide.matchups.map(matchup => `
        <div class="matchup-card">
            <div class="matchup-header">
                <h3>${matchup.enemy}</h3>
                <span class="difficulty-tag medium">${matchup.difficulty}</span>
            </div>
            <p>${matchup.tips}</p>
        </div>
    `).join('');
}

function renderCombos(guide) {
    const container = document.getElementById('combosGuide');
    container.innerHTML = guide.combos.map(combo => `
        <div class="combo-card">
            <h3>${combo.name}</h3>
            <p class="combo-keys">${combo.keys}</p>
            <p>${combo.description}</p>
        </div>
    `).join('');
}

function renderTeamfight(guide) {
    const container = document.getElementById('teamfightGuide');
    container.innerHTML = `
        <div class="teamfight-phases">
            <div class="phase-card"><div class="phase-icon">🌅</div><h4>前期</h4><p>${guide.teamfight.early}</p></div>
            <div class="phase-card"><div class="phase-icon">🌇</div><h4>中期</h4><p>${guide.teamfight.mid}</p></div>
            <div class="phase-card"><div class="phase-icon">🌙</div><h4>后期</h4><p>${guide.teamfight.late}</p></div>
        </div>
        <div class="teamfight-positioning"><h4>📍 团战站位</h4><p>${guide.teamfight.positioning}</p></div>
    `;
}

function renderTips(guide) {
    const container = document.getElementById('tipsGuide');
    container.innerHTML = `<ul class="tips-list">${guide.tips.map(tip => `<li>💡 ${tip}</li>`).join('')}</ul>`;
}

function renderGuide(guide) {
    renderHeroHeader(guide);
    renderPlaystyles(guide);
    renderAbilities(guide);
    renderBuilds(guide);
    renderRunes(guide);
    renderMatchups(guide);
    renderCombos(guide);
    renderTeamfight(guide);
    renderTips(guide);
}

async function initHeroGuidePage() {
    const params = new URLSearchParams(window.location.search);
    const heroId = params.get('id') || 'yasuo';
    const guide = await fetchChampionGuide(heroId);
    renderGuide(guide);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroGuidePage);
} else {
    initHeroGuidePage();
}
