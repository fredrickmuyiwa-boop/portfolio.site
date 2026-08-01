import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { WhyWorkWithMe } from '@/components/sections/why-work-with-me';
import { Testimonials } from '@/components/sections/testimonials';
import { PageTransition } from '@/components/page-transition';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About — Fredrick Muyiwa',
  description:
    'Learn about Fredrick Muyiwa — a Business Analyst, Web Developer, and GoHighLevel Automation Expert passionate about solving business problems with technology and data.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: 'About — Fredrick Muyiwa',
    description:
      'Business Analyst, Web Developer, and GoHighLevel Automation Expert passionate about solving business problems with technology and data.',
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden pt-28">
          <div className="container-max px-6 md:px-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'About' },
              ]}
            />
          </div>
          <About />
          <Skills />
          <WhyWorkWithMe />
          <Testimonials />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
