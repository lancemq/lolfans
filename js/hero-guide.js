// 英雄攻略页面逻辑

const HERO_GUIDES = {
    'yasuo': {
        id: 'yasuo',
        name: '疾风剑豪',
        title: '亚索',
        roles: ['战士', '刺客'],
        splashSkin: 8,
        playstyles: [
            {
                name: '中单爆发',
                icon: '⚔️',
                description: '追求极致爆发，一套秒人',
                summary: '以高爆发伤害为主，利用前期优势快速结束游戏',
                early: '1级学Q快速推线抢2，2级后利用E技能消耗，3级风墙挡掉关键技能后打一套。注意保持血量健康。',
                mid: '推线后游走边路，配合队友击杀。团战中寻找击飞机会进场秒杀后排。',
                late: '后期以切后排为主，等队友先手开团或自己寻找机会E小额进',
                tips: ['对线时保持与兵线平行，利用E位移躲避技能', '风墙可以阻挡大多数飞行技能', 'EQ闪是亚索的核心技巧']
            },
            {
                name: '上单战士',
                icon: '🛡️',
                description: '持续输出，半肉装更稳定',
                summary: '偏战士出装，团战中承担更多前排职责',
                early: '稳健发育为主，利用Q技能补刀和消耗。不要过于激进，防止被gank。',
                mid: '边路分带牵制，配合打野争夺先锋和小龙。团战中等待机会进场。',
                late: '半肉出装可以承受更多伤害，大招用于控制敌方关键人物。',
                tips: ['上单位置需要更好的发育空间', '利用风墙阻挡敌方上单的关键技能', '分带时注意小地图，防止被抓']
            },
            {
                name: '辅助游走',
                icon: '🎯',
                description: '控制辅助，团队增益',
                summary: '利用风墙和击飞提供团队控制',
                early: '辅助亚索需要较强的前期对抗能力，利用风墙消耗对面ADC。',
                mid: '游走各路，利用E技能快速支援。大招提供团队控制。',
                late: '作为辅助需要保护队友，用风墙阻挡敌方技能。',
                tips: ['辅助亚索需要良好的意识', 'W技能保护ADC非常重要', '大招配合队友的控制技能']
            }
        ],
        abilities: [
            {
                name: '浪客之道',
                key: '被动',
                description: '暴击率翻倍，但暴击伤害降低至175%。移动时会积攒剑意，满层时受到来自英雄或野怪的伤害时会获得护盾。',
                tips: ['利用移动积攒护盾，在对拼前保持移动状态', '护盾持续约1秒，看到触发要后撤']
            },
            {
                name: '斩钢闪',
                key: 'Q',
                description: '向前出剑，造成物理伤害。命中时会获得一层旋风烈斩效果。叠满两层后，下一次Q会形成击飞敌人的旋风。',
                tips: ['Q技能可以叠加暴击率和穿甲效果', 'EQ是亚索的核心连招基础', '空中Q可以延长控制时间']
            },
            {
                name: '风之障壁',
                key: 'W',
                description: '创造一堵持续4秒的风墙，可以阻挡所有敌方飞行道具。',
                tips: ['风墙可以阻挡非常多的技能', '预判敌方技能释放风墙', '关键团战中风墙可以改变战局']
            },
            {
                name: '踏前斩',
                key: 'E',
                description: '向目标敌人冲刺，造成魔法伤害。每次施放会增加下次踏前斩的伤害，最多叠加4层。',
                tips: ['不能对同一目标连续使用', 'E技能可以穿墙', '利用E技能快速接近或撤离']
            },
            {
                name: '狂风绝息斩',
                key: 'R',
                description: '瞬间移动到被击飞的敌人身边，造成物理伤害并使敌人继续滞空。',
                tips: ['需要队友提供击飞控制', '落地后获得50%护甲穿透', '可以接在其他控制技能后']
            }
        ],
        combos: [
            { name: '基础连招', keys: 'E + Q + 空中Q + R', description: 'E接近目标，Q击飞，接空中Q续控制，大招收割' },
            { name: 'EQ闪', keys: 'EQ + 闪现', description: 'EQ二连瞬间改变位置，用于追击或躲避' },
            { name: '风墙连招', keys: 'W + E + Q + R', description: '风墙挡住关键技能后E近身，Q击飞接大' },
            { name: '团战进场', keys: 'E兵线 + E英雄 + Q击飞 + R', description: '利用多段E位移进场，配合控制击杀' }
        ],
        matchups: [
            { enemy: '永恩', difficulty: '均势', tips: '双方机制相似，注意躲避对方Q技能，保持距离' },
            { enemy: '锐雯', difficulty: '劣势', tips: '锐雯爆发高，不要硬拼，等打野支援' },
            { enemy: '劫', difficulty: '均势', tips: '利用风墙阻挡劫的技能，注意不要被消耗太多' },
            { enemy: '凯南', difficulty: '劣势', tips: '凯南手长难以接近，需要等待队友先手' },
            { enemy: '薇恩', difficulty: '优势', tips: '亚索天敌，尽量在前期建立优势' }
        ],
        teamfight: {
            early: '团战前先手消耗，利用Q技能poke。寻找敌方走位失误。',
            mid: '中规模团战需要找准进场时机，等敌方关键控制技能交出后再进场。',
            late: '后期团战以秒杀脆皮为主，或配合队友控制打AOE伤害。',
            positioning: '侧翼或绕后进场最理想，避免正面被集火'
        },
        tips: [
            '亚索需要对线经验和游戏理解，新手建议多练习',
            '风墙的timing是亚索的核心技巧',
            '不要无脑EQ进场，保持安全血量',
            '逆风时保守发育，团战中等待机会',
            'E技能不要用来赶路，留作位移或追击'
        ]
    },
    'ahri': {
        id: 'ahri',
        name: '九尾妖狐',
        title: '阿狸',
        roles: ['法师', '刺客'],
        splashSkin: 8,
        playstyles: [
            {
                name: '中单爆发',
                icon: '✨',
                description: '高爆发，一套秒杀',
                summary: '追求技能伤害最大化，团战中秒掉敌方后排',
                early: '1级学Q清线，2级后E技能命中可以打一套。保持安全距离，利用Q技能poke。',
                mid: '推线后游走边路，利用大招的三段位移进行击杀或gank。',
                late: '团战中寻找机会E中敌方C位，一套秒杀。注意自己的站位。',
                tips: ['E技能是阿狸的核心命中技能', '前期以发育为主，避免被gank', '6级后具备秒杀能力']
            },
            {
                name: '中单poke',
                icon: '🎯',
                description: '远程消耗，持续压制',
                summary: '利用技能远程消耗，压低敌方血量',
                early: '用Q技能远距离清线和消耗，保持血量优势。',
                mid: '保持中路线权，支援边路。大招用来追击或撤离。',
                late: '团战前poke压低血量，团战中保持安全距离输出。',
                tips: ['poke打法需要保持距离感', 'Q技能的回来段有真实伤害', 'W技能自动追踪可以补充伤害']
            }
        ],
        abilities: [
            {
                name: '摄魂夺魄',
                key: '被动',
                description: '技能命中敌人会获得一层摄魂夺魄，9层后下次技能命中回复生命值。',
                tips: ['对线消耗时注意叠加被动回血', '9层后下一个技能会回复生命']
            },
            {
                name: '欺诈宝珠',
                key: 'Q',
                description: '发射宝珠，来回都有伤害。第二段返回时造成真实伤害。',
                tips: ['Q技能来回都有伤害', '第二段有真实伤害', '可以通过走位调整Q的回程轨迹']
            },
            {
                name: '妖异狐火',
                key: 'W',
                description: '召唤三团狐火自动追击附近敌人，优先攻击英雄。',
                tips: ['W技能自动追踪无需预判', '可以用来探草', '伤害可以触发被动']
            },
            {
                name: '魅惑妖术',
                key: 'E',
                description: '送出爱心，魅惑命中的敌人并造成伤害。',
                tips: ['E技能是阿狸唯一的硬控', '建议配合其他技能连招使用', '需要一定预判']
            },
            {
                name: '灵魄突袭',
                key: 'R',
                description: '向指定方向冲刺并发射魔法弹，可释放3次，期间获得加速。',
                tips: ['三段位移可以灵活追击或撤离', '可以用R调整位置躲避技能', '团战中不要一次性用完三段']
            }
        ],
        combos: [
            { name: '基础连招', keys: 'E + Q + W + R', description: 'E魅惑，QW输出，最后R撤离或追击' },
            { name: '秒杀连招', keys: 'R + E + Q + W + R', description: 'R近身接控制打一套，最后R撤离' },
            { name: '反杀连招', keys: 'R + E + Q + W', description: '被gank时R调整位置后反打' }
        ],
        matchups: [
            { enemy: '劫', difficulty: '均势', tips: '注意躲避劫的Q，保持距离' },
            { enemy: '艾妮薇亚', difficulty: '劣势', tips: '对方手长难以接近' },
            { enemy: '发条', difficulty: '均势', tips: '互相发育为主' },
            { enemy: '辛德拉', difficulty: '均势', tips: '注意躲避对方QE二连' }
        ],
        teamfight: {
            early: '对线期以发育和消耗为主，E中可打一套',
            mid: '推线游走，利用大招支援边路',
            late: '团战中秒敌方C位，或持续poke压血量',
            positioning: '保持在中后排，利用技能输出'
        },
        tips: [
            '阿狸需要良好的走位和技能命中率',
            '6级后具备很强的生存能力',
            '大招不要一次性用完，留一段备用',
            'E技能的预判是阿狸的核心'
        ]
    },
    'lee-sin': {
        id: 'lee-sin',
        name: '盲僧',
        title: '李青',
        roles: ['战士', '刺客'],
        splashSkin: 9,
        playstyles: [
            {
                name: '食肉型打野',
                icon: '👊',
                description: '主动出击，入侵反野',
                summary: '前期强势入侵野区，控制资源',
                early: '红开直接入侵或反蹲，快速清野到3级。',
                mid: '以gank和反野为主，争取前期节奏。',
                late: '团战中找机会踢回敌方C位。',
                tips: ['前期强势期要积极做事', '利用W护盾进行反野', '注意惩戒的时机']
            },
            {
                name: '食草型打野',
                icon: '🛡️',
                description: '稳定发育，团战发力',
                summary: '以刷野和控资源为主，后期团战发力',
                early: '稳定刷野到3级，保证发育。',
                mid: '以刷野和控龙为主，适时gank。',
                late: '后期团战保护队友或开团。',
                tips: ['刷野路线规划很重要', '资源团前提前落位', '后期保护后排']
            }
        ],
        abilities: [
            {
                name: '疾风骤雨',
                key: '被动',
                description: '使用技能后下一次普攻会额外攻击两次，回复能量。',
                tips: ['技能后接普攻可以最大化伤害', '利用被动回复能量']
            },
            {
                name: '天音波/回音击',
                key: 'Q',
                description: '发出声波标记敌人，可再次释放冲向标记目标。',
                tips: ['Q技能是李青的核心位移', '二段Q有斩杀伤害', '可以Q眼位移']
            },
            {
                name: '金钟罩/铁布衫',
                key: 'W',
                description: '冲向友军获得护盾，或强化下次普攻获得生命偷取。',
                tips: ['W眼是李青的核心机制', '可以W小兵位移', '护盾可以抵挡关键伤害']
            },
            {
                name: '天雷破/摧筋断骨',
                key: 'E',
                description: '拍打地面造成伤害并暴露隐形，减速敌人。',
                tips: ['E可以探视野', '范围减速留人']
            },
            {
                name: '猛龙摆尾',
                key: 'R',
                description: '猛踢敌人，将其击飞并造成伤害。',
                tips: ['R闪是核心技巧', '可以踢回关键人物', '配合Q技能位移进场']
            }
        ],
        combos: [
            { name: '基础gank', keys: 'Q + 摸眼 + R + Q', description: 'Q中后摸眼到身后，R踢回，接Q' },
            { name: 'R闪', keys: 'R + 闪现', description: '闪现改变R的方向，踢回更多敌人' },
            { name: '回旋踢', keys: 'Q + R + 闪现 + Q', description: 'Q中后R闪踢回，再接Q' }
        ],
        matchups: [
            { enemy: '螳螂', difficulty: '均势', tips: '双方都是前期强势英雄，看操作' },
            { enemy: '男枪', difficulty: '均势', tips: '男枪刷野更快，需要线上配合' },
            { enemy: '稻草人', difficulty: '劣势', tips: '对方刷野效率高，难以对抗' }
        ],
        teamfight: {
            early: '前期积极gank，建立优势',
            mid: '以小龙和先锋为主',
            late: '团战中找机会开团或保护',
            positioning: '侧翼等待机会，或保护己方C位'
        },
        tips: [
            '李青需要大量练习才能熟练',
            'W眼是核心机制，必须掌握',
            '团战中R闪的timing很重要',
            '逆风时可以保护队友'
        ]
    }
};

let currentGuide = null;

function initHeroGuidePage() {
    const params = new URLSearchParams(window.location.search);
    const heroId = params.get('id') || 'yasuo';
    
    const guide = HERO_GUIDES[heroId];
    if (!guide) {
        window.location.href = 'strategy-center.html';
        return;
    }
    
    currentGuide = guide;
    renderGuide(guide);
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

function renderHeroHeader(guide) {
    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${capitalize(guide.id)}_${guide.splashSkin}.jpg`;
    document.getElementById('guideHeroSplash').style.backgroundImage = `url('${splashUrl}')`;
    document.getElementById('guideHeroName').textContent = guide.name;
    document.getElementById('guideHeroTitle').textContent = guide.name;
    document.getElementById('guideHeroSubtitle').textContent = guide.title;
    
    const rolesHtml = guide.roles.map(role => 
        `<span class="role-tag ${getRoleClass(role)}">${role}</span>`
    ).join('');
    document.getElementById('guideHeroRoles').innerHTML = rolesHtml;
    
    document.title = `${guide.name} 攻略 - 英雄联盟爱好者`;
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
                <div class="phase-card">
                    <div class="phase-icon">🌅</div>
                    <h4>前期</h4>
                    <p>${style.early}</p>
                </div>
                <div class="phase-card">
                    <div class="phase-icon">🌇</div>
                    <h4>中期</h4>
                    <p>${style.mid}</p>
                </div>
                <div class="phase-card">
                    <div class="phase-icon">🌙</div>
                    <h4>后期</h4>
                    <p>${style.late}</p>
                </div>
            </div>
            <div class="playstyle-tips">
                <h4>💡 技巧要点</h4>
                <ul>
                    ${style.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    
    tabsContainer.querySelectorAll('.playstyle-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tabsContainer.querySelectorAll('.playstyle-tab').forEach(t => t.classList.remove('active'));
            contentContainer.querySelectorAll('.playstyle-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            contentContainer.querySelector(`[data-index="${tab.dataset.index}"]`).classList.add('active');
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
                    <ul>
                        ${ability.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBuilds(guide) {
    const container = document.getElementById('buildsGuide');
    
    container.innerHTML = guide.playstyles.map((style, index) => `
        <div class="build-card">
            <h3>${style.name} 出装</h3>
            <p>${style.description}</p>
        </div>
    `).join('');
}

function renderRunes(guide) {
    const container = document.getElementById('runesGuide');
    
    const runeData = [
        { name: '精密', keystone: '征服者', desc: '适合持续输出' },
        { name: '巫术', keystone: '奥术彗星', desc: '适合poke消耗' },
        { name: '主宰', keystone: '电刑', desc: '适合爆发秒杀' }
    ];
    
    container.innerHTML = runeData.map(rune => `
        <div class="rune-card">
            <h3>${rune.name}</h3>
            <p class="rune-keystone">基石: ${rune.keystone}</p>
            <p>${rune.desc}</p>
        </div>
    `).join('');
}

function renderMatchups(guide) {
    const container = document.getElementById('matchupsGuide');
    
    container.innerHTML = guide.matchups.map(matchup => `
        <div class="matchup-card">
            <div class="matchup-header">
                <h3>${matchup.enemy}</h3>
                <span class="difficulty-tag ${matchup.difficulty}">${matchup.difficulty}</span>
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
            <div class="phase-card">
                <div class="phase-icon">🌅</div>
                <h4>前期</h4>
                <p>${guide.teamfight.early}</p>
            </div>
            <div class="phase-card">
                <div class="phase-icon">🌇</div>
                <h4>中期</h4>
                <p>${guide.teamfight.mid}</p>
            </div>
            <div class="phase-card">
                <div class="phase-icon">🌙</div>
                <h4>后期</h4>
                <p>${guide.teamfight.late}</p>
            </div>
        </div>
        <div class="teamfight-positioning">
            <h4>📍 团战站位</h4>
            <p>${guide.teamfight.positioning}</p>
        </div>
    `;
}

function renderTips(guide) {
    const container = document.getElementById('tipsGuide');
    
    container.innerHTML = `
        <ul class="tips-list">
            ${guide.tips.map(tip => `<li>💡 ${tip}</li>`).join('')}
        </ul>
    `;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRoleClass(role) {
    const map = {
        '战士': 'role-fighter',
        '坦克': 'role-tank',
        '法师': 'role-mage',
        '刺客': 'role-assassin',
        '射手': 'role-marksman',
        '辅助': 'role-support'
    };
    return map[role] || '';
}

document.addEventListener('DOMContentLoaded', initHeroGuidePage);
