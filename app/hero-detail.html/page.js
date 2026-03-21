import { Suspense } from 'react';
import { HeroDetailClient } from '../../components/hero-detail-client';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { buildPageMetadata } from '../../lib/site-config';
import { getLocalChampionById, getLocalChampions, getSiteMeta } from '../../lib/local-champions';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const heroId = params?.id;
  const localHero = heroId ? await getLocalChampionById(heroId) : null;

  if (!localHero) {
    return buildPageMetadata({
      title: '英雄详情',
      description: '查看英雄联盟英雄详情，包含技能介绍、玩法建议、出装符文与皮肤资料。',
      path: '/hero-detail.html'
    });
  }

  return buildPageMetadata({
    title: `${localHero.name} 英雄详情`,
    description: `查看 ${localHero.name} 的技能介绍、玩法建议、出装符文与皮肤资料。`,
    path: `/hero-detail.html?id=${localHero.id}`
  });
}

export default async function HeroDetailPage() {
  const heroes = await getLocalChampions();
  const siteMeta = await getSiteMeta();

  return (
    <>
      <SiteHeader active="champions" />
      <main className="champion-detail-page hero-guide-page">
        <div className="container">
          <Suspense fallback={<section className="knowledge-card hero-empty-state"><h2>加载英雄详情中</h2><p>正在准备页面内容。</p></section>}>
            <HeroDetailClient initialHeroes={heroes} siteMeta={siteMeta} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
