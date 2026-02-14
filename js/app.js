// 英雄联盟网站主逻辑

// 英雄数据存储
let championsData = [];
let dataDragonVersion = '14.1.1';
const DEFAULT_HERO_ICON = '⚔️';
const heroCarouselState = {
    timer: null,
    currentIndex: 0
};
const heroInfoCarouselState = {
    timer: null,
    currentIndex: 0
};
const abilityAssetsCache = {};
const championDetailCache = {};
const HOT_CHAMPION_IDS = [
    'yasuo',
    'ahri',
    'lee-sin',
    'jinx',
    'ezreal',
    'thresh',
    'zed',
    'lux',
    'kai-sa',
    'vayne',
    'caitlyn',
    'irelia',
    'yone',
    'akali',
    'darius',
    'draven',
    'syndra',
    'leona',
    'morgana',
    'master-yi'
];

// 初始化
document.addEventListener('DOMContentLoaded', async function() {
    await loadDataDragonVersion();
    await loadChampionsData();
    initNavigation();
    initCurrentPage();
});

// 加载英雄数据
async function loadChampionsData() {
    try {
        const url = `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/zh_CN/champion.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Data Dragon 列表加载失败');
        const data = await response.json();
        championsData = transformChampionList(data.data || {});
    } catch (error) {
        console.error('加载全量英雄失败，回退到本地数据:', error);
        try {
            const localResponse = await fetch('data/champions.json');
            const localData = await localResponse.json();
            championsData = localData.heroes || [];
        } catch (fallbackError) {
            console.error('加载本地英雄数据失败:', fallbackError);
        }
    }
}

// 加载 Data Dragon 最新版本号
async function loadDataDragonVersion() {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        if (!response.ok) return;
        const versions = await response.json();
        if (Array.isArray(versions) && versions.length > 0) {
            dataDragonVersion = versions[0];
        }
    } catch (error) {
        console.warn('加载 Data Dragon 版本失败，使用默认版本:', dataDragonVersion);
    }
}

// 导航菜单初始化
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// 根据当前页面初始化
function initCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'champions.html':
            initChampionsPage();
            break;
        case 'hero-detail.html':
            initHeroDetailPage();
            break;
        case 'guide.html':
            initGuidePage();
            break;
    }
}

// 首页初始化
function initHomePage() {
    renderFeaturedChampions();
    initHomeHeroCarousel();
    initHomeInfoCarousel();
    updateHomeStats();
}

// 渲染热门英雄（含介绍和背景故事）
async function renderFeaturedChampions() {
    const container = document.getElementById('featuredChampions');
    if (!container || championsData.length === 0) return;

    const hotList = getHotChampions(12);
    const featured = await Promise.all(
        hotList.map(async hero => {
            const detail = await fetchChampionDetailFromDataDragon(hero);
            return mergeHeroData(hero, detail);
        })
    );

    container.innerHTML = featured.map(hero => createFeaturedChampionCard(hero)).join('');

    // 添加点击事件
    addChampionCardListeners(container);
}

function createFeaturedChampionCard(hero) {
    const rolesHtml = hero.roles.map(role =>
        `<span class="role-tag ${getRoleClass(role)}">${role}</span>`
    ).join('');

    const difficultyClass = getDifficultyClass(hero.difficulty);
    const heroImage = hero.image || DEFAULT_HERO_ICON;
    const intro = sanitizeText(hero.title || '').replace(/^the\s+/i, '');
    const loreSummary = summarizeLore(hero.lore, 64);

    return `
        <div class="champion-card featured-champion-card" data-id="${hero.id}">
            <div class="champion-image">
                ${createImageHtml(
                    getChampionLoadingUrl(hero, 0),
                    `${hero.name} 高清立绘`,
                    heroImage,
                    'champion-image-img',
                    'lazy'
                )}
                <span class="featured-badge">热门</span>
            </div>
            <div class="champion-info">
                <h3 class="champion-name">${hero.name}</h3>
                <p class="champion-title">${intro || hero.title}</p>
                <p class="featured-champion-desc">英雄介绍：${hero.title}</p>
                <p class="featured-champion-lore">背景故事：${loreSummary}</p>
                <div class="champion-roles">
                    ${rolesHtml}
                </div>
                <span class="difficulty ${difficultyClass}">${hero.difficulty}</span>
            </div>
        </div>
    `;
}

// 创建英雄卡片HTML
function createChampionCard(hero) {
    const rolesHtml = hero.roles.map(role =>
        `<span class="role-tag ${getRoleClass(role)}">${role}</span>`
    ).join('');

    const difficultyClass = getDifficultyClass(hero.difficulty);
    const heroImage = hero.image || DEFAULT_HERO_ICON;
    const heroImageHtml = createImageHtml(
        getChampionLoadingUrl(hero, 0),
        `${hero.name} 头像`,
        heroImage,
        'champion-image-img',
        'lazy'
    );

    return `
        <div class="champion-card" data-id="${hero.id}">
            <div class="champion-image">
                ${heroImageHtml}
            </div>
            <div class="champion-info">
                <h3 class="champion-name">${hero.name}</h3>
                <p class="champion-title">${hero.title}</p>
                <div class="champion-roles">
                    ${rolesHtml}
                </div>
                <span class="difficulty ${difficultyClass}">${hero.difficulty}</span>
            </div>
        </div>
    `;
}

// 获取角色类名
function getRoleClass(role) {
    const roleMap = {
        '战士': 'fighter',
        '刺客': 'assassin',
        '法师': 'mage',
        '射手': 'marksman',
        '辅助': 'support',
        '坦克': 'tank'
    };
    return roleMap[role] || '';
}

// 获取难度类名
function getDifficultyClass(difficulty) {
    const diffMap = {
        '简单': 'easy',
        '中等': 'medium',
        '困难': 'hard'
    };
    return diffMap[difficulty] || 'medium';
}

// 添加英雄卡片点击事件
function addChampionCardListeners(container) {
    const cards = container.querySelectorAll('.champion-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const heroId = card.dataset.id;
            window.location.href = `hero-detail.html?id=${heroId}`;
        });
    });
}

// 英雄列表页初始化
function initChampionsPage() {
    renderChampionsList();
    initFilters();
}

// 渲染英雄列表
function renderChampionsList(filter = 'all', difficulty = 'all', search = '') {
    const container = document.getElementById('championsList');
    if (!container) return;

    let filteredHeroes = championsData;

    // 角色筛选
    if (filter !== 'all') {
        filteredHeroes = filteredHeroes.filter(hero => 
            hero.roles.includes(filter)
        );
    }

    // 难度筛选
    if (difficulty !== 'all') {
        filteredHeroes = filteredHeroes.filter(hero => 
            hero.difficulty === difficulty
        );
    }

    // 搜索筛选
    if (search) {
        filteredHeroes = filteredHeroes.filter(hero => 
            hero.name.toLowerCase().includes(search.toLowerCase()) ||
            hero.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (filteredHeroes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <p style="font-size: 1.2rem;">没有找到匹配的英雄</p>
                <p>请尝试其他筛选条件</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredHeroes.map(hero => createChampionCard(hero)).join('');
    addChampionCardListeners(container);
}

// 初始化筛选功能
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const difficultySelect = document.getElementById('difficultySelect');
    const searchInput = document.getElementById('searchInput');

    let currentFilter = 'all';
    let currentDifficulty = 'all';
    let currentSearch = '';

    // 角色筛选按钮
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderChampionsList(currentFilter, currentDifficulty, currentSearch);
        });
    });

    // 难度筛选
    if (difficultySelect) {
        difficultySelect.addEventListener('change', () => {
            currentDifficulty = difficultySelect.value;
            renderChampionsList(currentFilter, currentDifficulty, currentSearch);
        });
    }

    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderChampionsList(currentFilter, currentDifficulty, currentSearch);
        });
    }
}

// 英雄详情页初始化
function initHeroDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('id');

    if (!heroId || championsData.length === 0) {
        // 如果没有指定英雄ID，显示第一个英雄
        setTimeout(() => {
            if (championsData.length > 0) {
                renderHeroDetail(championsData[0]);
            }
        }, 500);
        return;
    }

    const hero = championsData.find(h => h.id === heroId);
    if (hero) {
        renderHeroDetail(hero);
    } else {
        // 英雄未找到，显示第一个
        if (championsData.length > 0) {
            renderHeroDetail(championsData[0]);
        }
    }
}

// 渲染英雄详情
async function renderHeroDetail(hero) {
    const heroDetail = await fetchChampionDetailFromDataDragon(hero);
    const displayHero = mergeHeroData(hero, heroDetail);
    const heroImage = displayHero.image || DEFAULT_HERO_ICON;
    const heroImageHtml = createImageHtml(
        getChampionSplashUrl(displayHero, 0),
        `${displayHero.name} 立绘`,
        heroImage,
        'champion-avatar-img',
        'eager'
    );
    
    // 头部信息
    const header = document.getElementById('championHeader');
    if (header) {
        const rolesHtml = displayHero.roles.map(role => 
            `<span class="role-tag ${getRoleClass(role)}">${role}</span>`
        ).join('');

        header.innerHTML = `
            <div class="champion-avatar">
                ${heroImageHtml}
            </div>
            <div class="champion-meta">
                <h1>${displayHero.name}</h1>
                <p class="title">${displayHero.title}</p>
                <div class="champion-roles" style="margin-bottom: 15px;">
                    ${rolesHtml}
                    <span class="difficulty ${getDifficultyClass(displayHero.difficulty)}">${displayHero.difficulty}</span>
                </div>
                <p class="lore">${displayHero.lore}</p>
            </div>
        `;
    }
    
    // 渲染皮肤
    renderSkins(displayHero, heroImage);

    // 技能列表
    const abilitiesList = document.getElementById('abilitiesList');
    if (abilitiesList && displayHero.abilities) {
        const abilityAssets = await fetchChampionAbilityAssets(displayHero);
        const abilityKeys = ['passive', 'q', 'w', 'e', 'r'];
        const abilityNames = ['被动', 'Q', 'W', 'E', 'R'];
        
        abilitiesList.innerHTML = abilityKeys.map((key, index) => {
            const ability = displayHero.abilities[key];
            if (!ability) return '';
            const abilityIcon = createAbilityIconHtml(
                abilityNames[index],
                abilityAssets[key],
                `${displayHero.name} ${ability.name} 图标`
            );
            
            return `
                <div class="ability-item">
                    <div class="ability-icon">${abilityIcon}</div>
                    <div class="ability-info">
                        <h3>${ability.name}</h3>
                        <p>${ability.description}</p>
                        <div class="ability-stats">
                            ${ability.cooldown ? `<span class="ability-stat-cd">冷却: ${ability.cooldown}</span>` : ''}
                            ${ability.mana ? `<span class="ability-stat-mana">消耗: ${ability.mana}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 玩法建议
    if (displayHero.playstyle) {
        const early = document.getElementById('earlyGame');
        const mid = document.getElementById('midGame');
        const late = document.getElementById('lateGame');

        if (early) early.textContent = displayHero.playstyle.early;
        if (mid) mid.textContent = displayHero.playstyle.mid;
        if (late) late.textContent = displayHero.playstyle.late;
    }

    // 出装推荐
    if (displayHero.builds) {
        const coreItems = document.getElementById('coreItems');
        const situationalItems = document.getElementById('situationalItems');

        if (coreItems) {
            coreItems.innerHTML = displayHero.builds.core.map(item => 
                `<div class="item-card">${item}</div>`
            ).join('');
        }

        if (situationalItems) {
            situationalItems.innerHTML = displayHero.builds.situational.map(item => 
                `<div class="item-card">${item}</div>`
            ).join('');
        }
    }

    // 符文推荐
    if (displayHero.runes) {
        const runesDisplay = document.getElementById('runesDisplay');
        if (runesDisplay) {
            runesDisplay.innerHTML = `
                <div class="rune-tree">
                    <h3>主系: ${displayHero.runes.primary}</h3>
                    <div class="rune-keystone">${displayHero.runes.keystone}</div>
                </div>
                <div class="rune-tree">
                    <h3>副系: ${displayHero.runes.secondary}</h3>
                    <div class="rune-secondary">${displayHero.runes.secondary}系符文</div>
                </div>
            `;
        }
    }

    // 相关英雄（同类型的其他英雄）
    const relatedContainer = document.getElementById('relatedChampions');
    if (relatedContainer) {
        const related = championsData
            .filter(h => h.id !== displayHero.id && h.roles.some(r => displayHero.roles.includes(r)))
            .slice(0, 3);
        
        if (related.length > 0) {
            relatedContainer.innerHTML = related.map(h => createChampionCard(h)).join('');
            addChampionCardListeners(relatedContainer);
        }
    }
}

// 新手指南页初始化
function initGuidePage() {
    const container = document.getElementById('recommendedChampions');
    if (!container || championsData.length === 0) return;

    // 筛选简单难度的英雄作为新手推荐
    const easyHeroes = championsData.filter(hero => hero.difficulty === '简单').slice(0, 4);
    
    if (easyHeroes.length > 0) {
        container.innerHTML = easyHeroes.map(hero => createChampionCard(hero)).join('');
        addChampionCardListeners(container);
    }
}

// 工具函数：平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 渲染皮肤
function renderSkins(hero, defaultImage) {
    const skinsGallery = document.getElementById('skinsGallery');
    const skinImageLarge = document.getElementById('skinImageLarge');
    const selectedSkinName = document.getElementById('selectedSkinName');
    const selectedSkinTier = document.getElementById('selectedSkinTier');
    const selectedSkinPrice = document.getElementById('selectedSkinPrice');
    const selectedSkinDescription = document.getElementById('selectedSkinDescription');
    
    if (!skinsGallery || !hero.skins || hero.skins.length === 0) return;
    
    // 渲染皮肤缩略图
    skinsGallery.innerHTML = hero.skins.map((skin, index) => `
        <div class="skin-card ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="skin-thumbnail">
                ${createImageHtml(
                    getChampionSkinUrl(hero, skin.imageNum ?? index),
                    `${hero.name} ${skin.name} 皮肤缩略图`,
                    defaultImage,
                    'skin-thumbnail-img',
                    'lazy'
                )}
            </div>
            <div class="skin-card-info">
                <div class="skin-card-name">${skin.name}</div>
                <span class="skin-card-tier skin-tier-${skin.tier}">${skin.tier}</span>
            </div>
        </div>
    `).join('');
    
    // 显示第一个皮肤的详情
    updateSkinDetail(hero, hero.skins[0], hero.skins[0]?.imageNum ?? 0, defaultImage);
    
    // 添加点击事件
    const skinCards = skinsGallery.querySelectorAll('.skin-card');
    skinCards.forEach(card => {
        card.addEventListener('click', () => {
            // 移除其他卡片的active状态
            skinCards.forEach(c => c.classList.remove('active'));
            // 添加当前卡片的active状态
            card.classList.add('active');
            // 更新详情面板
            const index = parseInt(card.dataset.index);
            const skin = hero.skins[index];
            updateSkinDetail(hero, skin, skin?.imageNum ?? index, defaultImage);
        });
    });
}

// 更新皮肤详情
function updateSkinDetail(hero, skin, skinIndex, defaultImage) {
    const skinImageLarge = document.getElementById('skinImageLarge');
    const selectedSkinName = document.getElementById('selectedSkinName');
    const selectedSkinTier = document.getElementById('selectedSkinTier');
    const selectedSkinPrice = document.getElementById('selectedSkinPrice');
    const selectedSkinDescription = document.getElementById('selectedSkinDescription');
    
    if (skinImageLarge) {
        skinImageLarge.innerHTML = createImageHtml(
            getChampionSplashUrl(hero, skinIndex),
            `${hero.name} ${skin.name}`,
            defaultImage,
            'skin-image-large-img',
            'eager'
        );
    }
    if (selectedSkinName) selectedSkinName.textContent = skin.name;
    if (selectedSkinTier) selectedSkinTier.textContent = skin.tier;
    if (selectedSkinPrice) selectedSkinPrice.textContent = skin.price;
    if (selectedSkinDescription) selectedSkinDescription.textContent = skin.description;
}

function createImageHtml(src, alt, fallbackText, className, loading = 'lazy') {
    return `
        <img class="${className}" src="${src}" alt="${alt}" loading="${loading}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="hero-fallback">${fallbackText}</span>
    `;
}

function getChampionIconUrl(hero) {
    const championKey = getChampionKey(hero);
    return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${championKey}.png`;
}

function getChampionLoadingUrl(hero, skinIndex = 0) {
    const championKey = getChampionKey(hero);
    const safeIndex = Number.isInteger(skinIndex) && skinIndex >= 0 ? skinIndex : 0;
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_${safeIndex}.jpg`;
}

function getChampionSkinUrl(hero, skinIndex = 0) {
    const championKey = getChampionKey(hero);
    const safeIndex = Number.isInteger(skinIndex) && skinIndex >= 0 ? skinIndex : 0;
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_${safeIndex}.jpg`;
}

function getChampionSplashUrl(hero, skinIndex = 0) {
    const championKey = getChampionKey(hero);
    const safeIndex = Number.isInteger(skinIndex) && skinIndex >= 0 ? skinIndex : 0;
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championKey}_${safeIndex}.jpg`;
}

function getChampionKey(heroOrId = '') {
    if (heroOrId && typeof heroOrId === 'object') {
        if (heroOrId.ddKey) return heroOrId.ddKey;
        if (typeof heroOrId.id === 'string') {
            return getChampionKey(heroOrId.id);
        }
        return '';
    }

    const heroId = String(heroOrId || '');
    if (!heroId) return '';
    if (/[A-Z]/.test(heroId) && !heroId.includes('-')) return heroId;

    return heroId
        .split('-')
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function initHomeHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    const heroHighlight = document.getElementById('heroHighlight');
    if (!carousel || championsData.length === 0) return;
    if (carousel.dataset.initialized === 'true') return;

    const slides = championsData.slice(0, 6);
    carousel.dataset.initialized = 'true';

    carousel.innerHTML = `
        <div class="hero-carousel-track">
            ${slides.map((hero, index) => `
                <div class="hero-carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}" style="background-image: url('${getChampionSplashUrl(hero, 0)}');"></div>
            `).join('')}
        </div>
        <div class="hero-carousel-overlay"></div>
        <div class="hero-carousel-controls">
            ${slides.map((hero, index) => `
                <button type="button" class="hero-carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="切换到${hero.name}"></button>
            `).join('')}
        </div>
    `;

    const slideEls = carousel.querySelectorAll('.hero-carousel-slide');
    const dotEls = carousel.querySelectorAll('.hero-carousel-dot');
    const total = slides.length;

    function setActive(index) {
        heroCarouselState.currentIndex = index;
        slideEls.forEach(slide => {
            slide.classList.toggle('active', Number(slide.dataset.index) === index);
        });
        dotEls.forEach(dot => {
            dot.classList.toggle('active', Number(dot.dataset.index) === index);
        });

        if (heroHighlight) {
            const currentHero = slides[index];
            heroHighlight.textContent = `当前聚焦：${currentHero.name} · ${currentHero.title}`;
        }
    }

    function moveNext() {
        const next = (heroCarouselState.currentIndex + 1) % total;
        setActive(next);
    }

    dotEls.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.index);
            setActive(index);
            restartAutoplay();
        });
    });

    function startAutoplay() {
        stopAutoplay();
        heroCarouselState.timer = setInterval(moveNext, 5000);
    }

    function stopAutoplay() {
        if (heroCarouselState.timer) {
            clearInterval(heroCarouselState.timer);
            heroCarouselState.timer = null;
        }
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    setActive(0);
    startAutoplay();
}

function initHomeInfoCarousel() {
    const container = document.getElementById('heroInfoCarousel');
    if (!container || container.dataset.initialized === 'true') return;

    const slides = [
        {
            label: '版本焦点',
            title: '本周上分节奏',
            desc: '优先控前两条小龙与先锋，15分钟前建立地图资源优势。',
            link: 'game-data.html',
            linkText: '查看游戏资料'
        },
        {
            label: '实战攻略',
            title: '团战执行四步',
            desc: '先站位再开团，统一集火目标，结束后立刻转龙或推塔。',
            link: 'strategy-center.html',
            linkText: '进入攻略中心'
        },
        {
            label: '新手推荐',
            title: '三局训练模板',
            desc: '一局练补刀，一局练视野，一局练团战目标选择，稳步提升。',
            link: 'guide.html',
            linkText: '查看新手指南'
        }
    ];

    container.dataset.initialized = 'true';
    container.innerHTML = `
        <div class="hero-info-track">
            ${slides.map((slide, index) => `
                <article class="hero-info-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <span class="hero-info-label">${slide.label}</span>
                    <h3>${slide.title}</h3>
                    <p>${slide.desc}</p>
                    <a href="${slide.link}" class="hero-info-link">${slide.linkText}</a>
                </article>
            `).join('')}
        </div>
        <div class="hero-info-dots">
            ${slides.map((_, index) => `
                <button type="button" class="hero-info-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="切换轮播内容${index + 1}"></button>
            `).join('')}
        </div>
    `;

    const slideEls = container.querySelectorAll('.hero-info-slide');
    const dotEls = container.querySelectorAll('.hero-info-dot');
    const total = slides.length;

    function setActive(index) {
        heroInfoCarouselState.currentIndex = index;
        slideEls.forEach(slide => {
            slide.classList.toggle('active', Number(slide.dataset.index) === index);
        });
        dotEls.forEach(dot => {
            dot.classList.toggle('active', Number(dot.dataset.index) === index);
        });
    }

    function next() {
        setActive((heroInfoCarouselState.currentIndex + 1) % total);
    }

    function start() {
        stop();
        heroInfoCarouselState.timer = setInterval(next, 4200);
    }

    function stop() {
        if (heroInfoCarouselState.timer) {
            clearInterval(heroInfoCarouselState.timer);
            heroInfoCarouselState.timer = null;
        }
    }

    dotEls.forEach(dot => {
        dot.addEventListener('click', () => {
            setActive(Number(dot.dataset.index));
            start();
        });
    });

    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);

    setActive(0);
    start();
}

async function fetchChampionAbilityAssets(hero) {
    const championKey = getChampionKey(hero);
    if (abilityAssetsCache[championKey]) {
        return abilityAssetsCache[championKey];
    }

    const fallback = {
        passive: '',
        q: '',
        w: '',
        e: '',
        r: ''
    };

    try {
        const url = `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/zh_CN/champion/${championKey}.json`;
        const response = await fetch(url);
        if (!response.ok) {
            abilityAssetsCache[championKey] = fallback;
            return fallback;
        }

        const data = await response.json();
        const championData = data.data?.[championKey];
        if (!championData) {
            abilityAssetsCache[championKey] = fallback;
            return fallback;
        }

        const assets = {
            passive: championData.passive?.image?.full
                ? `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/passive/${championData.passive.image.full}`
                : '',
            q: championData.spells?.[0]?.image?.full
                ? `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${championData.spells[0].image.full}`
                : '',
            w: championData.spells?.[1]?.image?.full
                ? `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${championData.spells[1].image.full}`
                : '',
            e: championData.spells?.[2]?.image?.full
                ? `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${championData.spells[2].image.full}`
                : '',
            r: championData.spells?.[3]?.image?.full
                ? `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${championData.spells[3].image.full}`
                : ''
        };

        abilityAssetsCache[championKey] = assets;
        return assets;
    } catch (error) {
        abilityAssetsCache[championKey] = fallback;
        return fallback;
    }
}

async function fetchChampionDetailFromDataDragon(hero) {
    const championKey = getChampionKey(hero);
    if (championDetailCache[championKey]) {
        return championDetailCache[championKey];
    }

    try {
        const url = `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/zh_CN/champion/${championKey}.json`;
        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        const championData = data.data?.[championKey];
        if (!championData) return null;

        const detail = {
            lore: sanitizeText(championData.lore),
            abilities: buildAbilitiesFromDataDragon(championData),
            skins: buildSkinsFromDataDragon(championData.skins || []),
            ...getRolePreset(hero.roles)
        };

        championDetailCache[championKey] = detail;
        return detail;
    } catch (error) {
        return null;
    }
}

function transformChampionList(championsMap) {
    const roleMap = {
        Fighter: '战士',
        Tank: '坦克',
        Mage: '法师',
        Assassin: '刺客',
        Marksman: '射手',
        Support: '辅助'
    };

    const heroes = Object.values(championsMap).map(champion => {
        const roles = (champion.tags || []).map(tag => roleMap[tag]).filter(Boolean);
        const difficulty = toDifficultyLabel(champion.info?.difficulty || 5);

        return {
            id: toKebabCase(champion.id),
            ddKey: champion.id,
            name: champion.name,
            title: champion.title,
            roles: roles.length > 0 ? roles : ['战士'],
            difficulty,
            lore: sanitizeText(champion.blurb || ''),
            image: getRoleEmoji(roles),
            abilities: null,
            playstyle: getRolePreset(roles).playstyle,
            builds: getRolePreset(roles).builds,
            runes: getRolePreset(roles).runes,
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

function getHotChampions(limit = 6) {
    const hotMap = new Map(championsData.map(hero => [hero.id, hero]));
    const selected = HOT_CHAMPION_IDS
        .map(id => hotMap.get(id))
        .filter(Boolean)
        .slice(0, limit);

    if (selected.length >= limit) {
        return selected;
    }

    const existingIds = new Set(selected.map(hero => hero.id));
    const fallback = championsData
        .filter(hero => !existingIds.has(hero.id))
        .slice(0, limit - selected.length);

    return [...selected, ...fallback];
}

function buildAbilitiesFromDataDragon(championData) {
    const spells = championData.spells || [];
    const passive = championData.passive || {};
    const passiveDesc = sanitizeText(passive.description || passive.sanitizedDescription || '');
    const passiveName = passive.name || '被动技能';

    return {
        passive: {
            name: passiveName,
            description: passiveDesc || '官方技能描述加载中。',
            cooldown: '无',
            mana: '无'
        },
        q: buildSpell(spells[0]),
        w: buildSpell(spells[1]),
        e: buildSpell(spells[2]),
        r: buildSpell(spells[3])
    };
}

function buildSpell(spell) {
    if (!spell) {
        return {
            name: '技能',
            description: '官方技能描述加载中。',
            cooldown: '',
            mana: ''
        };
    }

    const cooldown = spell.cooldownBurn ? `${spell.cooldownBurn}秒` : '';
    const mana = spell.costBurn && spell.costBurn !== '0' ? spell.costBurn : (sanitizeText(spell.resource || '') || '无消耗');

    return {
        name: spell.name || '技能',
        description: sanitizeText(spell.description || spell.sanitizedDescription || '官方技能描述加载中。'),
        cooldown,
        mana
    };
}

function buildSkinsFromDataDragon(skins) {
    if (!Array.isArray(skins) || skins.length === 0) {
        return [];
    }

    return skins.map(skin => ({
        id: String(skin.id || skin.num || 'skin'),
        name: skin.name || '皮肤',
        price: skin.num === 0 ? '免费' : '商城可购买',
        tier: skin.num === 0 ? '经典' : '普通',
        description: `官方皮肤：${skin.name || '默认皮肤'}`,
        imageNum: Number.isInteger(skin.num) ? skin.num : 0
    }));
}

function mergeHeroData(baseHero, detail) {
    if (!detail) return baseHero;
    return {
        ...baseHero,
        ...detail,
        playstyle: detail.playstyle || baseHero.playstyle,
        builds: detail.builds || baseHero.builds,
        runes: detail.runes || baseHero.runes,
        abilities: detail.abilities || baseHero.abilities,
        skins: detail.skins && detail.skins.length > 0 ? detail.skins : baseHero.skins
    };
}

function getRolePreset(roles = []) {
    const primary = Array.isArray(roles) && roles.length > 0 ? roles[0] : '战士';

    const presets = {
        战士: {
            playstyle: {
                early: '前期以稳健换血和控线为主，利用基础伤害建立线权。',
                mid: '中期跟随团队争夺先锋与小龙，兼顾开团和前排承伤。',
                late: '后期优先限制敌方后排输出，围绕关键团战目标展开。'
            },
            builds: {
                core: ['神话/核心战士装', '抗性装备', '续航装备'],
                situational: ['反甲', '复活甲', '魔抗装备', '功能性装备']
            },
            runes: { primary: '精密', keystone: '征服者', secondary: '坚决' }
        },
        刺客: {
            playstyle: {
                early: '前期以技能消耗与补刀为主，避免无意义换血。',
                mid: '中期多游走边路，利用爆发优势快速处理脆皮目标。',
                late: '后期把握进场时机，优先击杀敌方核心输出后撤离。'
            },
            builds: {
                core: ['穿甲/法穿核心', '爆发伤害装', '保命装'],
                situational: ['夜之锋刃/女妖', '复活甲/中娅', '功能性输出装']
            },
            runes: { primary: '主宰', keystone: '电刑', secondary: '精密' }
        },
        法师: {
            playstyle: {
                early: '前期通过清线和远程消耗建立节奏，注意蓝量管理。',
                mid: '中期围绕河道资源打拉扯，利用技能覆盖团战区域。',
                late: '后期保持安全站位，持续提供控制和AOE伤害。'
            },
            builds: {
                core: ['法强神话装', '法穿装备', '保命法装'],
                situational: ['帽子', '虚空法杖', '女妖面纱', '功能法装']
            },
            runes: { primary: '巫术', keystone: '奥术彗星', secondary: '启迪' }
        },
        射手: {
            playstyle: {
                early: '前期稳定补刀，依靠射程优势进行消耗与压制。',
                mid: '中期跟团推进，优先处理前排并保持持续输出。',
                late: '后期是团队核心输出点，站位与保命优先级最高。'
            },
            builds: {
                core: ['攻速暴击核心', '穿甲/破甲装备', '生存装'],
                situational: ['复活甲', '水银弯刀', '饮血剑', '功能性输出装']
            },
            runes: { primary: '精密', keystone: '致命节奏', secondary: '启迪' }
        },
        辅助: {
            playstyle: {
                early: '前期控制兵线与视野，帮助射手建立对线优势。',
                mid: '中期围绕地图资源布置眼位，组织小规模开团。',
                late: '后期以保护核心或先手控制为主，强化团队容错。'
            },
            builds: {
                core: ['辅助装升级', '团队增益装', '功能防御装'],
                situational: ['救赎', '钢铁烈阳', '骑士之誓', '反开团装备']
            },
            runes: { primary: '坚决', keystone: '余震', secondary: '启迪' }
        },
        坦克: {
            playstyle: {
                early: '前期以抗压发育为主，保证关键等级和装备成型。',
                mid: '中期承担前排职责，优先开团或保护后排。',
                late: '后期利用控制链和高坦度，为团队争取输出空间。'
            },
            builds: {
                core: ['生命值核心', '护甲装备', '魔抗装备'],
                situational: ['反甲', '自然之力', '团队增益防装', '复活甲']
            },
            runes: { primary: '坚决', keystone: '不灭之握', secondary: '启迪' }
        }
    };

    return presets[primary] || presets['战士'];
}

function toDifficultyLabel(value) {
    if (value <= 3) return '简单';
    if (value <= 6) return '中等';
    return '困难';
}

function toKebabCase(text = '') {
    return text.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function sanitizeText(text = '') {
    return String(text)
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function summarizeLore(text = '', maxLength = 64) {
    const clean = sanitizeText(text);
    if (clean.length <= maxLength) return clean;
    return `${clean.slice(0, maxLength).trim()}...`;
}

function getRoleEmoji(roles = []) {
    if (!Array.isArray(roles) || roles.length === 0) return DEFAULT_HERO_ICON;
    const role = roles[0];
    const map = {
        战士: '⚔️',
        坦克: '🛡️',
        法师: '✨',
        刺客: '🥷',
        射手: '🏹',
        辅助: '💠'
    };
    return map[role] || DEFAULT_HERO_ICON;
}

function updateHomeStats() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    if (!statNumbers || statNumbers.length === 0) return;
    if (championsData.length > 0) {
        statNumbers[0].textContent = `${championsData.length}`;
    }
}

function createAbilityIconHtml(label, iconUrl, alt) {
    if (!iconUrl) {
        return `<span class="ability-key-fallback" style="display:grid;">${label}</span>`;
    }

    return `
        <img src="${iconUrl}" alt="${alt}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
        <span class="ability-key-fallback">${label}</span>
        <span class="ability-key-overlay">${label}</span>
    `;
}

// 添加滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.champion-card, .intro-card, .role-card, .mode-card, .skin-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// 页面加载完成后初始化动画
window.addEventListener('load', initScrollAnimations);
