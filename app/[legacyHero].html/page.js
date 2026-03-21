import { notFound, redirect } from 'next/navigation';

const LEGACY_HERO_IDS = [
  'ahri',
  'camille',
  'ekko',
  'fizz',
  'irelia',
  'katarina',
  'mordekaiser',
  'renekton',
  'rengar',
  'riven',
  'talon',
  'vayne',
  'vi',
  'yasuo',
  'yone',
  'zed'
];

export async function generateStaticParams() {
  return LEGACY_HERO_IDS.map((legacyHero) => ({ legacyHero }));
}

export default async function LegacyHeroRedirectPage({ params }) {
  const { legacyHero } = await params;
  if (!LEGACY_HERO_IDS.includes(legacyHero)) {
    notFound();
  }
  redirect(`/hero-guide.html?id=${legacyHero}`);
}
