'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, background: '#010a13', color: '#f2ecdc', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</span>
          <h1 style={{ fontSize: '1.5rem', color: '#c8aa6e', marginBottom: '12px' }}>页面暂时无法加载</h1>
          <p style={{ color: '#b7c0ce', marginBottom: '24px', lineHeight: 1.6 }}>遇到了一些意外情况，请稍后重试。</p>
          <button onClick={() => reset()} style={{ padding: '12px 28px', background: '#c8aa6e', color: '#010a13', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
            重试
          </button>
          <a href="/" style={{ color: '#c8aa6e', marginTop: '16px', fontSize: '0.9rem' }}>返回首页</a>
        </div>
      </body>
    </html>
  );
}
