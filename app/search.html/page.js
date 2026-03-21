import { Suspense } from 'react';
import { SearchPageClient } from '../../components/search-page-client';
import { SeoJsonLd } from '../../components/seo-jsonld';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from '../../lib/site-config';
import { getLocalChampions, getSiteMeta } from '../../lib/local-champions';

export const metadata = buildPageMetadata({
  title: '全站搜索',
  description: '搜索英雄资料、攻略专题、训练模板与站内核心内容入口。',
  path: '/search.html'
});

const resources = [
  { href: '/strategy-center.html', title: '攻略中心', description: '版本热点、专题阅读与英雄攻略入口', keywords: ['攻略', '专题', '上分'], icon: '📘' },
  { href: '/items-runes.html', title: '符文装备', description: '符文逻辑、出装模板与官方装备图鉴', keywords: ['符文', '装备', '出装'], icon: '🧰' },
  { href: '/guide.html', title: '新手指南', description: '地图、位置、操作与训练路径', keywords: ['新手', '入门', '教程'], icon: '🧭' },
  { href: '/draft.html', title: '阵容搭配思路', description: '从 BP 到阵容功能检查清单', keywords: ['阵容', 'bp', '搭配'], icon: '♟️' },
  { href: '/macro.html', title: '中期运营路线', description: '兵线、资源团和大龙节奏判断', keywords: ['运营', '中期', '资源'], icon: '🗺️' },
  { href: '/training.html', title: '14天训练模板', description: '把训练拆成每天可执行动作', keywords: ['训练', '复盘', '计划'], icon: '📈' },
  { href: '/champions.html', title: '英雄列表', description: '按定位、难度和关键词筛选英雄', keywords: ['英雄', '列表', '定位'], icon: '🏆' }
];

export default async function SearchPage() {
  const heroes = await getLocalChampions();
  const siteMeta = await getSiteMeta();

  return (
    <>
      <SeoJsonLd data={buildWebPageJsonLd({ title: '全站搜索', description: '搜索站内核心内容。', path: '/search.html' })} />
      <SeoJsonLd data={buildBreadcrumbJsonLd([{ name: '首页', path: '/' }, { name: '全站搜索', path: '/search.html' }])} />
      <SiteHeader active="search" />
      <main className="hero-guide-page">
        <div className="container">
          <Suspense fallback={<section className="knowledge-card hero-empty-state"><h2>加载搜索索引中</h2><p>正在整理站内内容。</p></section>}>
            <SearchPageClient heroes={heroes} resources={resources} updatedAt={siteMeta?.championUpdatedAt || ''} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
