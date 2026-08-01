import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { Services } from '@/components/sections/services';
import { Process } from '@/components/sections/process';
import { Contact } from '@/components/sections/contact';
import { PageTransition } from '@/components/page-transition';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services — Fredrick Muyiwa',
  description:
    'Business Analytics, Web Development, and GoHighLevel Automation services. KPI dashboards, Power BI, CRM setup, sales funnels, workflow automation, and more.',
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: 'Services — Fredrick Muyiwa',
    description:
      'Business Analytics, Web Development, and GoHighLevel Automation services to help your business grow.',
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden pt-28">
          <div className="container-max px-6 md:px-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services' },
              ]}
            />
          </div>
          <Services />
          <Process />
          <Contact />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
