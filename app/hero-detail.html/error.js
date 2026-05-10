'use client';

export default function HeroDetailError({ error, reset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '40px', textAlign: 'center' }}>
      <span style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</span>
      <h2 style={{ fontSize: '1.3rem', color: '#c8aa6e', marginBottom: '12px' }}>英雄详情加载失败</h2>
      <p style={{ color: '#b7c0ce', marginBottom: '24px', lineHeight: 1.6 }}>无法加载英雄数据，请检查网络后重试。</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => reset()} style={{ padding: '10px 24px', background: '#c8aa6e', color: '#010a13', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
          重试
        </button>
        <a href="/champions.html" style={{ padding: '10px 24px', background: 'transparent', color: '#c8aa6e', border: '1px solid rgba(200,170,110,0.3)', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}>
          返回英雄列表
        </a>
      </div>
    </div>
  );
}
