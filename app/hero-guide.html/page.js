import { Suspense } from 'react';
import { HeroGuideClient } from '../../components/hero-guide-client';
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
      title: '英雄攻略',
      description: '查看英雄联盟英雄攻略，包含打法、技能、出装、符文、对线与团战建议。',
      path: '/hero-guide.html'
    });
  }

  return buildPageMetadata({
    title: `${localHero.name} 攻略`,
    description: `查看 ${localHero.name} 的打法、技能、出装、符文、对线与团战建议。`,
    path: `/hero-guide.html?id=${localHero.id}`
  });
}

export default async function HeroGuidePage() {
  const heroes = await getLocalChampions();
  const siteMeta = await getSiteMeta();

  return (
    <>
      <SiteHeader active="strategy-center" />
      <main className="hero-guide-page">
        <div className="container">
          <Suspense fallback={<section className="knowledge-card hero-empty-state"><h2>加载英雄攻略中</h2><p>正在准备页面内容。</p></section>}>
            <HeroGuideClient initialHeroes={heroes} siteMeta={siteMeta} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
