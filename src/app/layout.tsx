import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VibeRadio',
  description:
    'Listen to VibeRadio | VibeRadio is platform that lets you listen to what you love',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:site_name" content="Vibe Radio" />
        <meta property="og:type" content="music.musician" />
        <meta property="og:title" content="VibeRadio" />
        <meta
          property="og:image"
          content="https://i1.sndcdn.com/avatars-ZT9eUT1XxMorQ4o3-GRZZ0g-t1080x1080.jpg"
        />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta
          property="og:description"
          content="Listen to VibeRadio | VibeRadio is platform that lets you listen to what you love"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
