export default function NotFoundPage() {
  return (
    <main className="hero-guide-page">
      <div className="container">
        <section className="guide-section">
          <h1 className="section-title">页面不存在</h1>
          <p className="section-subtitle">你访问的内容没有找到，返回首页继续浏览。</p>
          <a href="/" className="cta-button">
            返回首页
          </a>
        </section>
      </div>
    </main>
  );
}
