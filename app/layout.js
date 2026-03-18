import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import '../css/style.css';

export const metadata = {
  title: '英雄联盟爱好者',
  description: '英雄联盟爱好者网站提供最全的英雄资料、攻略技巧和游戏模式介绍。',
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" data-next-analytics="enabled">
      <body>
        {children}
        <Script src="/js/app.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
