export const SITE_URL = 'https://www.lolfans.xyz';
export const SITE_NAME = '英雄联盟爱好者';
export const DEFAULT_OG_IMAGE = '/images/logo.svg';

export function buildPageMetadata({ title, description, path = '/', image = DEFAULT_OG_IMAGE }) {
  const canonicalUrl = new URL(path, SITE_URL).toString();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'website',
      images: [{ url: image }]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    }
  };
}

export function buildBreadcrumbJsonLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString()
    }))
  };
}

export function buildWebPageJsonLd({ title, description, path = '/' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: new URL(path, SITE_URL).toString(),
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}
