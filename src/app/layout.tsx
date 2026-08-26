import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Harmonic Learning Studio — Where Talent Meets Excellence',
    template: '%s | Harmonic Learning Studio',
  },
  description:
    'Harmonic Learning Studio is a premier institution dedicated to nurturing musical talent through world-class instruction in piano, guitar, violin, vocals, and music theory. Begin your musical journey today.',
  keywords: [
    'learning studio',
    'music school',
    'piano lessons',
    'guitar lessons',
    'violin lessons',
    'vocal training',
    'music theory',
    'music education',
    'Harmonic Learning Studio',
  ],
  authors: [{ name: 'Harmonic Learning Studio' }],
  creator: 'Harmonic Learning Studio',
  publisher: 'Harmonic Learning Studio',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://harmoniclearningstudio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Harmonic Learning Studio',
    title: 'Harmonic Learning Studio — Where Talent Meets Excellence',
    description:
      'A premier learning studio offering world-class instruction in instrumental, vocal, and music theory programs. Join our community of passionate musicians.',
    images: [
      {
        url: '/images/hero-main.png',
        width: 1200,
        height: 630,
        alt: 'Harmonic Learning Studio Campus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonic Learning Studio — Where Talent Meets Excellence',
    description:
      'A premier learning studio offering world-class instruction in instrumental, vocal, and music theory programs.',
    images: ['/images/hero-main.png'],
    creator: '@harmonicmusic',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
