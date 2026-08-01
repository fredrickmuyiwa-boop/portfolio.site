import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { Contact } from '@/components/sections/contact';
import { PageTransition } from '@/components/page-transition';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact — Fredrick Muyiwa',
  description:
    'Get in touch with Fredrick Muyiwa to discuss your project. Available for business analytics, web development, and GoHighLevel automation work.',
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: 'Contact — Fredrick Muyiwa',
    description:
      'Get in touch to discuss your project — business analytics, web development, and GoHighLevel automation.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden pt-28">
          <div className="container-max px-6 md:px-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Contact' },
              ]}
            />
          </div>
          <Contact />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
