import { notFound } from 'next/navigation';
import { LegacyHtml } from '../../components/legacy-html';
import { hasLegacyPage, listLegacyHtmlPages, readLegacyPage } from '../../lib/legacy-pages';

export async function generateStaticParams() {
  const pages = await listLegacyHtmlPages();
  return pages.map((page) => ({ slug: page }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug || !(await hasLegacyPage(slug))) {
    return {};
  }

  const page = await readLegacyPage(slug);
  return {
    title: page.title,
    description: page.description
  };
}

export default async function LegacyPage({ params }) {
  const { slug } = await params;

  if (!slug || !(await hasLegacyPage(slug))) {
    notFound();
  }

  const page = await readLegacyPage(slug);
  return <LegacyHtml html={page.bodyHtml} />;
}
