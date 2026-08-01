import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MouseLight } from '@/components/mouse-light';
import { ScrollProgress } from '@/components/scroll-progress';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Fredrick Muyiwa',
  },
  description: siteConfig.description,
  keywords: [
    'Business Analyst',
    'Web Developer',
    'GoHighLevel',
    'GHL Automation',
    'Business Analytics',
    'CRM Automation',
    'Power BI',
    'Next.js Developer',
    'Fredrick Muyiwa',
    'Business Intelligence',
    'Workflow Automation',
    'Data Visualization',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/hero/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Fredrick Muyiwa — Business Analyst, Web Developer & GHL Automation Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/hero/og-image.svg'],
    creator: '@0xfredt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: 'Business Analyst, Web Developer & GoHighLevel Automation Expert',
  description: siteConfig.description,
  knowsAbout: [
    'Business Analytics',
    'Web Development',
    'GoHighLevel',
    'CRM Automation',
    'Power BI',
    'Data Visualization',
    'React',
    'Next.js',
    'Workflow Automation',
    'Business Intelligence',
  ],
  sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.twitter],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  author: { '@type': 'Person', name: siteConfig.name },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MouseLight />
          <ScrollProgress />
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
