export function SiteHeader({ active = 'home' }) {
  return (
    <nav className="navbar" role="navigation" aria-label="主导航">
      <div className="container">
        <div className="logo">
          <a href="/" aria-label="返回首页">
            <img
              className="brand-logo"
              src="/images/logo.svg"
              alt="英雄联盟爱好者"
              width="120"
              height="40"
            />
          </a>
        </div>
        <button className="hamburger" aria-label="打开导航菜单" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links" role="menubar">
          <li>
            <a href="/" className={active === 'home' ? 'active' : undefined}>
              首页
            </a>
          </li>
          <li>
            <a href="/champions.html" className={active === 'champions' ? 'active' : undefined}>
              英雄列表
            </a>
          </li>
          <li>
            <a href="/game-modes.html" className={active === 'game-modes' ? 'active' : undefined}>
              游戏模式
            </a>
          </li>
          <li>
            <a href="/guide.html" className={active === 'guide' ? 'active' : undefined}>
              新手指南
            </a>
          </li>
          <li>
            <a href="/items-runes.html" className={active === 'items-runes' ? 'active' : undefined}>
              符文装备
            </a>
          </li>
          <li>
            <a
              href="/strategy-center.html"
              className={active === 'strategy-center' ? 'active' : undefined}
            >
              攻略中心
            </a>
          </li>
        </ul>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
