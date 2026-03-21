import { Suspense } from 'react';
import { SearchPageClient } from '../../components/search-page-client';
import { SeoJsonLd } from '../../components/seo-jsonld';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { getSearchResources } from '../../lib/content-index';
import { buildBreadcrumbJsonLd, buildPageMetadata, buildWebPageJsonLd } from '../../lib/site-config';
import { getLocalChampionSnapshot } from '../../lib/local-champions';

export const metadata = buildPageMetadata({
  title: '全站搜索',
  description: '搜索英雄资料、攻略专题、训练模板与站内核心内容入口。',
  path: '/search.html'
});

export default async function SearchPage() {
  const [{ heroes, siteMeta }, resources] = await Promise.all([
    getLocalChampionSnapshot(),
    Promise.resolve(getSearchResources())
  ]);

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
