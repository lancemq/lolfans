import { Analytics } from '@vercel/analytics/next';
import '../css/base.css';
import '../css/surfaces.css';
import '../css/modes.css';
import '../css/guides.css';
import { SeoJsonLd } from '../components/seo-jsonld';
import { SITE_NAME, SITE_URL } from '../lib/site-config';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧、训练路线和版本内容整理。',
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg'
  },
  openGraph: {
    title: SITE_NAME,
    description: '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧、训练路线和版本内容整理。',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧、训练路线和版本内容整理。'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" data-next-analytics="enabled">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://ddragon.leagueoflegends.com" />
      </head>
      <body>
        <SeoJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: 'zh-CN',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/search.html?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
