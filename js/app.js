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
let localStrategyHeroMap = null;
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

// 英雄背景故事数据
const CHAMPION_LORE = {
    'yasuo': {
        title: '浪人剑客',
        lore: `亚索是艾欧尼亚岛上的一名剑客，他曾经是均衡教派的学生，专注于追求无极之道。然而，一场灾难性的战争彻底改变了他的命运。

当诺克萨斯入侵艾欧尼亚时，亚索被指责在战争中谋杀了他的导师——他最尊敬的人。尽管他实际上是为了保护导师而战，但误解和背叛使他被迫逃亡。

现在，亚索作为一个流浪的浪人，在符文之地上四处漂泊。他追寻着真正的凶手，同时也在寻找救赎之路。他的风之剑术已达到登峰造极的境界，能够在不可能的情况下扭转战局。`,
        quote: "，死亡只是另一种挑战。"
    },
    'ahri': {
        title: '九尾妖狐',
        lore: `阿狸是一只存在于艾欧尼亚与瓦罗兰之间的模糊边境上的魔法生物。她诞生于原始的灵魂能量，原本只是一只普通的狐狸，但在汲取了一个被背叛的法师的灵魂后，她获得了人形。

阿狸一直在寻找她作为狐狸时的记忆碎片，这使她在人类世界中徘徊。她能够操纵敌人的情感，窃取他们的精魄，但内心深处仍然保持着善良。

她加入了英雄联盟，希望能够理解人类的世界，同时也寻找她失落的过去。她的魅惑能力让敌人防不胜防，而她内心的矛盾使她成为一个复杂而迷人的角色。`,
        quote: "记忆如潮水般涌来...却永远无法触及。"
    },
    'lee-sin': {
        title: '盲僧',
        lore: `李青出生于一个名为尚武的均衡教派家庭，他从小就被培养成为一名强大的战士。然而，在他年轻气盛时期的一场决定性战役中，他犯下了一个致命的错误。

当时，李青与队友一起对抗入侵的诺克萨斯军队。在战斗的关键时刻，他释放了一个强大的魔法，却意外导致己方士兵的重大伤亡。这场悲剧成为了他人生的转折点。

为了赎罪，李青用魔法火焰灼烧了自己的双眼，让自己永远失去光明。通过这种方式，他让自己的其他感官变得更加敏锐。他成为了艾欧尼亚最强大的武僧之一，加入英雄联盟来保护这片土地。`,
        quote: "真正的力量来自于内心的平静。"
    },
    'jinx': {
        title: '爆弹怪盗',
        lore: `金克丝原名 Powder，是祖安贫民区长大的孤儿。她和朋友们一起加入了希尔科领导的犯罪组织，希望有朝一日能够改变自己的命运。

在一次关键的任务中，Powder 被派去炸毁一座皮尔特沃夫的关键建筑。然而，任务失败了，她的的朋友们全部丧生。这场悲剧彻底改变了她的心智。

从废墟中走出来的时候，Powder 已经消失了，取而代之的是疯狂的金克丝。她开始相信混乱才是真正的自由，她的行为变得越来越不可预测。现在，她带着她致命的武器——鱼骨头火箭炮和电子火花手炮，在世界各地制造混乱。`,
        quote: "规则就是用来打破的！"
    },
    'ezreal': {
        title: '探险家',
        lore: `Ezreal 是一个自信满满的探险家，来自皮尔特沃夫。他对古代遗迹和失落宝藏有着近乎痴迷的热爱。他的冒险足迹遍布整个符文之地，寻找传说中的神秘力量。

一次偶然的机会，Ezreal 发现了通往古代城市 Shurima 的秘密入口。在那里，他获得了一件强大的神器——奥术护手，这件装备赋予了他传送的能力。

现在，Ezreal 利用他的智慧和先进的科技，在世界各地进行探险。他的大胆和幽默感让他成为联盟中最受欢迎的英雄之一，但他也在不断寻找能够与自己能力相匹配的更大挑战。`,
        quote: "冒险才是人生的真谛！"
    },
    'thresh': {
        title: '锤石',
        lore: `锤石曾经是一个普通的人类——一个致力于收集和保护神秘知识的守望者组织的低级狱卒。这个组织建立在被祝福的岛屿上，被神奇的迷雾所保护。

在一次保管隐藏在地下的危险 artifacts 时，锤石展现了他内心的黑暗。他开始折磨和杀害那些被委托给他保护的人，最终自己也死在了他一手造成的灾难中。

然而，死亡并不能阻止他。锤石成为了一个可怕的幽灵，仍然在被他毁灭的城市 Helia 的废墟中游荡。他的灯笼能够囚禁受害者的灵魂。现在，他在暗影岛上继续他的残暴行为，用他的锁链追捕那些他认为应得的人。`,
        quote: "痛苦...是一种艺术，而我，是最伟大的艺术家。"
    },
    'zed': {
        title: '影流之主',
        lore: `劫是均衡教派最杰出的学生之一，但他对导师关于"保持平衡"的教诲产生了质疑。当他发现教派秘密保存着一本被禁止的暗影魔法书时，他决定不惜一切代价获取它的力量。

劫杀害了他的导师，并率领一批志同道合的学生离开了均衡教派，创立了影流。他们的目标是建立一个没有弱点的新世界秩序。

现在，影流成为了艾欧尼亚最令人畏惧的组织之一。劫相信只有通过消除软弱和犹豫，才能实现真正的和平。他的暗影魔法让他能够在战斗中同时出现在多个位置，使敌人防不胜防。`,
        quote: "要么改变，要么被改变。"
    },
    'lux': {
        title: '光辉女郎',
        lore: `Luxanna（简称 Lux）出生在德玛西亚著名的 Crownguard 家族，这个家族世代保护德玛西亚国王。她的祖父在 Storm's Fang 战役中拯救了国王的性命，这使得家族获得了极高的荣誉。

然而，Lux 隐藏着一个危险的秘密——她是一个天生的法师。在德马西亚，魔法被严格限制甚至禁止，因为曾经的一次魔法灾难。Lux 必须小心谨慎地隐藏她的能力。

尽管如此，Lux 仍然成为了德马西亚最耀眼的英雄之一。她加入了英雄联盟，为光明而战，同时也在寻找能够接受她真正自我的地方。她的Light Binding能力让她能够束缚敌人，为队友创造机会。`,
        quote: "光明存在于我们每个人的心中。"
    },
    'kai-sa': {
        title: '虚空之女',
        lore: `Kai'Sa 曾经是一个普通的小女孩，生活在恕瑞玛的边境地区。当虚空裂缝出现时，整个村庄被吞没，只有她幸存。她被虚空生物所救，在那个黑暗的世界中度过了多年。

在虚空的深处，Kai'Sa 与虚空生物形成了一种共生的关系。她的皮肤被虚空鳞片所覆盖，她获得了一些虚空生物的能力，但代价是她再也无法完全回到人类社会。

现在，Kai'Sa 成为了抵抗虚空威胁的战士。她加入了英雄联盟，希望能够找到其他像她一样的人，同时也为阻止虚空入侵符文之地而战。她的 missile 和 void seakers 让敌人闻风丧胆。`,
        quote: "不是所有怪物都是怪物。"
    },
    'vayne': {
        title: '暗夜猎手',
        lore: `Vayne 出生在德玛西亚一个名叫 Nightfall 的古老骑士家族。从小，她就梦想成为一名伟大的猎人，像她祖父一样保护无辜的人。

当她的家族被一个堕落的黑暗骑士摧毁后，Vayne 踏上了复仇之路。她发誓要猎杀世界上所有的邪恶，尤其是那些利用黑暗魔法的人。

现在，Vayne 是德玛西亚最令人敬畏的猎人之一。她擅长使用十字弩和精湛的翻滚技巧来追踪和消灭她的目标。她的 Final Hour 能力让她能够在短时间内变得极其致命，成为黑暗生物的噩梦。`,
        quote: "正义的执行，从不需要等待。"
    },
    'darius': {
        title: '诺克萨斯之手',
        lore: `Darius 是诺克萨斯军队中最令人恐惧的战士之一。他出生在一个普通的农场家庭，他的父亲和兄弟都在早期与德玛西亚的战争中丧生。

失去了家人的 Darius 加入了诺克萨斯军队，并迅速因其无情的战斗风格而闻名。他成为了诺克萨斯最高指挥部最信任的将军之一，指挥了无数次成功的战役。

Darius 的标志性武器是诺克萨斯战斧——他兄弟的遗物。这把斧头见证了无数次战斗，沾满了敌人的鲜血。他相信诺克萨斯的座右铭：力量就是一切。现在，他作为诺克萨斯在联盟中的代表，为帝国的荣耀而战。`,
        quote: "德玛西亚没有英雄，只有失败者。"
    },
    'irelia': {
        title: '艾欧尼亚',
        lore: `Irelia 是艾欧尼亚均衡教派的守护者。当诺克萨斯入侵艾欧尼亚时，她被迫拿起武器保卫家园。她从一个普通的舞者成长为一名强大的战士。

Irelia 最著名的是她能够控制四把致命的刀刃，这些刀刃曾经是她家族的传家宝。在战争中，她证明了即使是最柔弱的人，也可以在战斗中变得强大。

现在，Irelia 是艾欧尼亚抵抗运动的象征。她在联盟中为艾欧尼亚而战，同时也在寻找能够在这场持久战争中取得胜利的方法。她的灵活性和控制能力使她成为中路的噩梦。`,
        quote: "舞蹈即战斗...战斗即舞蹈。"
    },
    'akali': {
        title: '离群之刺',
        lore: `Akali 是均衡教派创始人 Shen 的得意门生，也是传奇刺客大师 Zed 的师妹。当 Zed 背叛教派时，Akali 被迫做出选择——是留在教派还是跟随她的师父。

Akali 选择了离开，她成为了一个独自行动的刺客。她相信在阴影中行动比在光明中更有力量。她继承了母亲的遗志——一个曾经被认为是艾欧尼亚最伟大的刺客。

现在，Akali 在联盟中证明自己的价值。她的目标是追捕那些威胁艾欧尼亚的敌人，无论是诺克萨斯的侵略者还是其他威胁。她的五连镖和刺客帷幕让敌人措手不及。`,
        quote: "我不为任何人代言。"
    },
    'leona': {
        title: '曙光女神',
        lore: `Leona 出生在 Solari 部落，这是一个崇拜太阳的古老组织。当她还是婴儿时，她被发现在部落圣地的废墟中，身边围绕着神秘的符号。

Leona 被 Solari 的祭司们收养，并被训练成为战士。当她长大后，她成为了太阳的狂热信徒，被派去消灭所有拒绝光明的异端。

然而，当 Leona 获得传说中的 Solarite 板甲时，她获得了太阳的力量，但同时也经历了Transformation。现在，她既是太阳的化身，也是它的執行者。她加入了英雄联盟，为德玛西亚而战，同时也在寻找她真正的使命。`,
        quote: "光明即正义，正义即太阳。"
    },
    'morgana': {
        title: '堕落天使',
        lore: `Morgana 是平衡教派的对立面——她是"堕落的守护者"。她出生在 Demacia，一个禁魔的国家，但Morgana 却拥有强大的魔法能力。

当她的妹妹 Kayle 决定离开她们去追求神圣的使命时，Morgana 感到被遗弃了。她开始相信人类必须依靠自己的力量，而不是等待神救赎。

现在，Morgana 是 Demacia 最令人恐惧的敌人之一。她用她的黑暗魔法 Tormented Shadow 折磨敌人，同时也在寻找能够逃离 Demacia 那些痛恨魔法的人的追捕。她的soul Shackles 能够将敌人牢牢束缚。`,
        quote: "有些人值得拯救...但更多人只配被征服。"
    },
    'master-yi': {
        title: '无极剑圣',
        lore: `Master Yi 是 Wuju 派系的最后一位大师。Wuju 是一种古老的武术风格，强调通过冥想和精神训练来达到身心合一。Yi 从小就展现出了非凡的天赋。

当一种神秘的疾病降临到他的村庄时，Yi 是唯一的幸存者。这场悲剧使他成为了 Wuju 派系的守护者，他发誓要用他的力量保护那些无法自卫的人。

现在，Yi 加入了英雄联盟。他的刀刃之舞能够在瞬间击败成群的敌人，而他的 Meditate 能力让他能够在战斗后快速恢复。他相信真正的力量来自于内心的平静。`,
        quote: "真正的武者，不追求杀戮，只追求和谐。"
    },
    'yone': {
        title: '永劫之魂',
        lore: `Yone 是 Yasuo 的哥哥，也是均衡教派的成员。当他追踪杀害他弟弟的凶手时，他遭遇了一个神秘的生物——一个由纯粹的 spirit 构成的恶魔。

在战斗中，Yone 被杀死了。然而，他的灵魂拒绝安息。他制作了一面特殊的面具——unmasked，能够看到并与spirit world 的生物交流。从那以后，Yone 作为一个半spirit 的存在继续他的旅程。

现在，Yone 在符文之地上行走，寻找那个杀死他的恶魔，同时也试图理解spirit world 的奥秘。他的剑术与 Yasuo 不相上下，但他更加冷静和计算。`,
        quote: "死亡不是终点...只是一个开始。"
    },
    'caitlyn': {
        title: '皮城女警',
        lore: `Caitlyn 是皮尔特沃夫最优秀的执法者。她出生于一个著名的侦察员家庭，从小就展现出了非凡的射击天赋。她立志要追捕那些危害皮尔特沃夫安全的罪犯。

当一个被称为"Serial Killer" 的罪犯在皮尔特沃夫和祖安造成恐慌时，Caitlyn 接下了这个案子。她与她的搭档 Vi 一起，最终成功阻止了罪犯的阴谋。

现在，Caitlyn 是皮尔特沃夫在联盟中的代表。她的精准狙击能力让她能够在超远距离消灭目标，而她的 Piltover Peacemaker 是所有敌人的噩梦。`,
        quote: "正义...也许会迟到，但从不缺席。"
    },
    'draven': {
        title: '德莱文',
        lore: `Draven 是诺克萨斯最受欢迎的竞技场英雄之一。他出生于一个普通家庭，但凭借他的魅力和技巧，迅速成为了诺克萨斯最受欢迎的角斗士。

Draven 最著名的是他的"表演"——他总是确保观众在关注他。他对自己有着极大的自信，这种自信有时甚至会让他变得傲慢。

现在，Draven 作为诺克萨斯的代表加入联盟。他使用他的旋转飞斧来展示他的技巧，他的 Stand Aside 能够击退敌人，他的 Spinning Axe 让敌人不敢靠近。`,
        quote: "没有人能像 Draven 一样 Draven！"
    },
    'syndra': {
        title: '暗黑元首',
        lore: `Syndra 出生在 IOnia 一个拥有强大魔法能力的小女孩。她的能力从一开始就非常强大，但这也使她成为了目标。

当 Syndra 还是个孩子时，她被一个黑暗组织绑架并囚禁了多年。在那些年里，她被迫为那些人使用她的能力，这使她的心灵变得扭曲。

最终，Syndra 成功逃脱并杀死了她的囚禁者。现在，她成为了一个强大的法师，在符文之地上寻求知识和力量。她能够操纵暗影之球来攻击敌人，她的力量几乎无法被阻止。`,
        quote: "力量...就是一切。"
    }
};

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
        case 'strategy-center.html':
            initStrategyCenterPage();
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
                <p class="lore">${displayHero.lore ? displayHero.lore.substring(0, 100) + '...' : '暂无背景故事'}</p>
            </div>
        `;
    }
    
    // 渲染背景故事详情
    const loreContent = document.getElementById('loreContent');
    if (loreContent) {
        const loreText = displayHero.lore || '暂无背景故事';
        const quote = displayHero.quote || '';
        
        loreContent.innerHTML = `
            <div class="lore-text">${loreText.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
            ${quote ? `<blockquote class="lore-quote">"${quote}"</blockquote>` : ''}
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

// 攻略中心页：热门英雄攻略专题
async function initStrategyCenterPage() {
    const container = document.getElementById('strategyHeroGrid');
    if (!container) return;

    const localMap = await loadLocalStrategyHeroMap();
    const hotSet = new Set(HOT_CHAMPION_IDS);
    const list = championsData
        .filter(hero => hotSet.has(hero.id))
        .map(hero => localMap.get(hero.id) ? mergeHeroData(hero, localMap.get(hero.id)) : hero)
        .slice(0, 12);

    if (list.length === 0) {
        container.innerHTML = `
            <div class="knowledge-card" style="grid-column: 1 / -1; text-align: center;">
                <h3>暂无专题英雄</h3>
                <p>请稍后刷新页面重试。</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(hero => createStrategyHeroCard(hero)).join('');
    addStrategyHeroCardListeners(container);
}

async function loadLocalStrategyHeroMap() {
    if (localStrategyHeroMap) return localStrategyHeroMap;

    localStrategyHeroMap = new Map();
    try {
        const response = await fetch('data/champions.json');
        if (!response.ok) return localStrategyHeroMap;
        const data = await response.json();
        (data.heroes || []).forEach(hero => {
            if (hero && hero.id) {
                localStrategyHeroMap.set(hero.id, hero);
            }
        });
    } catch (error) {
        console.warn('本地英雄补充数据加载失败:', error);
    }

    return localStrategyHeroMap;
}

function createStrategyHeroCard(hero) {
    const rolesHtml = hero.roles.map(role =>
        `<span class="role-tag ${getRoleClass(role)}">${role}</span>`
    ).join('');

    const difficultyClass = getDifficultyClass(hero.difficulty);
    const loreText = summarizeLore(hero.lore || `${hero.name} 暂无背景摘要。`, 68);
    const tipSource = hero.playstyle?.mid || hero.playstyle?.early || hero.playstyle?.late || '围绕分路核心职责，优先提升补刀、视野和团战执行。';
    const tipText = summarizeLore(tipSource, 76);
    const coreBuild = Array.isArray(hero.builds?.core) ? hero.builds.core.slice(0, 3).join(' / ') : '根据对局选择核心装备';
    const runeText = hero.runes?.keystone ? `${hero.runes.primary} · ${hero.runes.keystone}` : '根据分路选择主系符文';

    return `
        <article class="strategy-hero-card" data-id="${hero.id}">
            <div class="champion-image">
                ${createImageHtml(
                    getChampionLoadingUrl(hero, 0),
                    `${hero.name} 高清立绘`,
                    hero.image || DEFAULT_HERO_ICON,
                    'champion-image-img',
                    'lazy'
                )}
            </div>
            <div class="strategy-hero-body">
                <h3 class="champion-name">${hero.name}</h3>
                <p class="champion-title">${hero.title}</p>
                <div class="champion-roles">
                    ${rolesHtml}
                    <span class="difficulty ${difficultyClass}">${hero.difficulty}</span>
                </div>
                <p class="strategy-hero-lore">背景：${loreText}</p>
                <p class="strategy-hero-tip">中期打法：${tipText}</p>
                <p class="strategy-hero-tip">核心出装：${coreBuild}</p>
                <p class="strategy-hero-tip">推荐符文：${runeText}</p>
            </div>
        </article>
    `;
}

function addStrategyHeroCardListeners(container) {
    container.querySelectorAll('.strategy-hero-card').forEach(card => {
        card.addEventListener('click', () => {
            const heroId = card.dataset.id;
            window.location.href = `hero-detail.html?id=${heroId}`;
        });
    });
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
    if (!detail) {
        const heroId = baseHero.id || '';
        const loreData = CHAMPION_LORE[heroId] || {};
        return {
            ...baseHero,
            title: loreData.title || baseHero.title,
            lore: loreData.lore || baseHero.lore || '暂无背景故事',
            quote: loreData.quote || baseHero.quote || ''
        };
    }
    const heroId = baseHero.id || '';
    const loreData = CHAMPION_LORE[heroId] || {};
    return {
        ...baseHero,
        ...detail,
        title: loreData.title || detail.title || baseHero.title,
        lore: loreData.lore || detail.lore || baseHero.lore || '暂无背景故事',
        quote: loreData.quote || detail.quote || baseHero.quote || '',
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

    document.querySelectorAll('.champion-card, .strategy-hero-card, .intro-card, .role-card, .mode-card, .skin-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// 页面加载完成后初始化动画
window.addEventListener('load', initScrollAnimations);

// 攻略中心轮播功能
function initStrategyCarousel() {
    const track = document.getElementById('strategyCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || track.children.length === 0) return;
    
    const slides = track.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoplayTimer = null;
    
    // 创建轮播点
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `跳转到第${i + 1}张`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新轮播点
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    // 绑定按钮事件
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
    
    // 鼠标悬停停止自动播放
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }
    
    // 键盘支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // 开始自动播放
    startAutoplay();
}

// 在initCurrentPage中调用
const originalInitCurrentPage = initCurrentPage;
initCurrentPage = function() {
    originalInitCurrentPage();
    initStrategyCarousel();
};
