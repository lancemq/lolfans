export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img className="brand-logo-footer" src="/images/logo.svg" alt="英雄联盟爱好者" />
          </div>
          <div className="footer-links">
            <a href="/">首页</a>
            <a href="/champions.html">英雄列表</a>
            <a href="/game-modes.html">游戏模式</a>
            <a href="/guide.html">新手指南</a>
            <a href="/strategy-center.html">攻略中心</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 英雄联盟爱好者. 本站仅供学习交流使用.</p>
          <p>英雄联盟是 Riot Games 的注册商标.</p>
        </div>
      </div>
    </footer>
  );
}
