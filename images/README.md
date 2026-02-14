# 英雄联盟网站 - 图片资源说明

## 📁 目录结构

```
images/
├── heroes/           # 英雄头像图片
├── abilities/        # 技能图标图片
└── skins/           # 皮肤图片（可选）
```

## 🎨 当前使用的图片方案

### 方案一：Emoji 占位符（当前使用）
网站目前使用 Emoji 作为英雄的视觉占位符，每个英雄都有对应的 emoji：

| 英雄 | Emoji | 说明 |
|------|-------|------|
| 亚托克斯 | 🗡️ | 暗裔剑魔 |
| 阿狸 | 🦊 | 九尾妖狐 |
| 阿卡丽 | 🥷 | 离群之刺 |
| 艾希 | 🏹 | 寒冰射手 |
| 德莱厄斯 | 🪓 | 诺克萨斯之手 |
| 德莱文 | 🎯 | 荣耀行刑官 |
| 伊泽瑞尔 | ✨ | 探险家 |
| 金克丝 | 💥 | 暴走萝莉 |
| 李青 | 👊 | 盲僧 |
| 拉克丝 | 💫 | 光辉女郎 |
| 易大师 | ⚔️ | 无极剑圣 |
| 厄运小姐 | 🔫 | 赏金猎人 |
| 锤石 | 🔗 | 魂锁典狱长 |
| 亚索 | 🌪️ | 疾风剑豪 |
| 劫 | ⚫ | 影流之主 |

## 🖼️ 如何添加真实图片

### 方法一：使用 Riot Games API（推荐）

Riot Games 提供了官方的英雄图片资源：

```javascript
// 英雄头像示例URL
https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/{英雄英文名}.png

// 例如：
https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Aatrox.png
```

使用步骤：
1. 下载需要的英雄图片
2. 重命名为英雄的 id（如：aatrox.png）
3. 放入 `images/heroes/` 目录
4. 修改代码以使用图片路径

### 方法二：本地图片

1. 准备图片文件（推荐尺寸：
   - 英雄头像：120x120px
   - 技能图标：64x64px
   - 皮肤展示：512x512px 或更大

2. 放入对应目录：
   ```
   images/heroes/aatrox.png
   images/heroes/ahri.png
   ...
   ```

3. 修改 `js/app.js` 中的代码：

   从：
   ```javascript
   const heroImage = hero.image || '⚔️';
   ```
   
   改为：
   ```javascript
   const heroImage = `<img src="images/heroes/${hero.id}.png" alt="${hero.name}" onerror="this.src='images/heroes/default.png'">`;
   ```

### 方法三：使用占位图服务

如果不想下载图片，可以使用占位图服务：

```javascript
// 使用 placeholder.com
const heroImage = `<img src="https://via.placeholder.com/120x120/c89b3c/ffffff?text=${hero.name}" alt="${hero.name}">`;
```

## 🎭 皮肤图片

每个英雄目前配置了 5 个皮肤，可以使用以下方式展示：

### 皮肤数据格式

```json
{
  "id": "皮肤ID",
  "name": "皮肤名称",
  "price": "价格（RP）",
  "tier": "等级（经典/普通/史诗/传说/限定）",
  "description": "皮肤描述"
}
```

### 皮肤展示区域

- **缩略图网格**：显示所有皮肤的缩略图和名称
- **详情面板**：点击缩略图显示大图、价格、等级和描述
- **交互**：支持点击切换不同皮肤查看详情

## 💡 图片优化建议

1. **格式选择**：
   - 头像：PNG（透明背景）
   - 大图：WebP（更好的压缩）

2. **懒加载**：
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

3. **响应式图片**：
   ```html
   <picture>
     <source srcset="hero-large.png" media="(min-width: 768px)">
     <img src="hero-small.png" alt="英雄">
   </picture>
   ```

4. **缓存控制**：
   - 设置适当的 HTTP 缓存头
   - 使用版本号管理图片更新

## 📝 待办事项

- [ ] 下载并添加真实英雄图片
- [ ] 下载并添加技能图标
- [ ] 为每个皮肤添加独立图片
- [ ] 优化图片加载性能
- [ ] 添加图片懒加载
- [ ] 实现图片预加载

## 🔗 资源链接

- [Riot Games API](https://developer.riotgames.com/)
- [Data Dragon CDN](https://developer.riotgames.com/docs/lol#data-dragon)
- [英雄联盟官网](https://lol.qq.com/)
- [Unsplash 免费图片](https://unsplash.com/)（可用于背景图）

---

**注意**：由于版权原因，生产环境使用前请确认图片使用权限。
