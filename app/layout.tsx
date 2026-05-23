import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '폐기물 정보 — 전국 대형폐기물·종량제봉투 수수료 모음',
  description: '전국 226개 시·군·구의 폐기물 데이터를 한곳에. 공공데이터 기반 매월 갱신.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/[email protected]/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="bg-apple-white font-sans">{children}</body>
    </html>
  );
}
