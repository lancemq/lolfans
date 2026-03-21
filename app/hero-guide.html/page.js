import { Suspense } from 'react';
import { HeroGuideClient } from '../../components/hero-guide-client';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { getLocalChampionById, getLocalChampions } from '../../lib/local-champions';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const heroId = params?.id;
  const localHero = heroId ? await getLocalChampionById(heroId) : null;

  if (!localHero) {
    return {
      title: '英雄攻略 - 英雄联盟爱好者',
      description: '查看英雄联盟英雄攻略，包含打法、技能、出装、符文、对线与团战建议。'
    };
  }

  return {
    title: `${localHero.name} 攻略 - 英雄联盟爱好者`,
    description: `查看 ${localHero.name} 的打法、技能、出装、符文、对线与团战建议。`
  };
}

export default async function HeroGuidePage() {
  const heroes = await getLocalChampions();

  return (
    <>
      <SiteHeader active="strategy-center" />
      <main className="hero-guide-page">
        <div className="container">
          <Suspense fallback={<section className="knowledge-card hero-empty-state"><h2>加载英雄攻略中</h2><p>正在准备页面内容。</p></section>}>
            <HeroGuideClient initialHeroes={heroes} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
