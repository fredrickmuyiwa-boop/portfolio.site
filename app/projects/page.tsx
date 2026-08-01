import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { PageTransition } from '@/components/page-transition';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionHeading } from '@/components/section-heading';
import { ProjectsGrid } from '@/components/projects-grid';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects — Fredrick Muyiwa',
  description:
    'Explore interactive project case studies and live demos across business analytics, web development, and GoHighLevel automation.',
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: 'Projects — Fredrick Muyiwa',
    description:
      'Interactive project case studies and live demos across business analytics, web development, and automation.',
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden pt-28">
          <div className="container-max px-6 md:px-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects' },
              ]}
            />
          </div>
          <section className="section-pad pt-8">
            <div className="container-max">
              <SectionHeading
                eyebrow="Projects"
                title="Interactive project showcase"
                description="Each project includes a full case study and a live, interactive demo you can explore — not just screenshots."
              />
              <ProjectsGrid />
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
