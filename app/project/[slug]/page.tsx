import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { PageTransition } from '@/components/page-transition';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Reveal } from '@/components/anim';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects, getProject, projectSlugs } from '@/lib/projects';
import { siteConfig } from '@/lib/site';
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { ProjectHero, ProjectResults } from '@/components/project-hero';

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: `${siteConfig.url}/project/${project.slug}` },
    openGraph: {
      title: `${project.title} — Case Study | Fredrick Muyiwa`,
      description: project.description,
      url: `${siteConfig.url}/project/${project.slug}`,
      images: [
        {
          url: `/images/projects/${project.slug}.svg`,
          width: 600,
          height: 420,
          alt: `${project.title} preview`,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative overflow-hidden pt-28">
          <div className="container-max px-6 md:px-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: project.title },
              ]}
            />
          </div>

          {/* Hero banner */}
          <section className="px-6 py-12 md:px-10">
            <div className="container-max">
              <ProjectHero gradient={project.heroGradient}>
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="relative">
                  <Badge className="mb-4 border-white/20 bg-white/10 text-white backdrop-blur">
                    {project.category}
                  </Badge>
                  <h1 className="max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {project.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg text-white/80">
                    {project.tagline}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-foreground hover:bg-white/90"
                    >
                      <Link href={project.demoPath}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Launch Interactive Demo
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </ProjectHero>
            </div>
          </section>

          {/* Preview image */}
          <section className="px-6 pb-12 md:px-10">
            <div className="container-max">
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-border/60">
                  <img
                    src={`/images/projects/${project.slug}.svg`}
                    alt={`${project.title} interface preview`}
                    width={600}
                    height={420}
                    className="w-full"
                  />
                </div>
              </Reveal>
            </div>
          </section>

          {/* Description + Problem + Solution */}
          <section className="section-pad pt-4">
            <div className="container-max grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Reveal className="lg:col-span-1">
                <div className="glass rounded-3xl p-8">
                  <h2 className="text-xl font-bold">Overview</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-semibold">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="space-y-6 lg:col-span-2">
                <Reveal>
                  <div className="glass card-glow rounded-3xl p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                        <Target className="h-5 w-5" />
                      </span>
                      <h2 className="text-xl font-bold">Business Problem</h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {project.businessProblem}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="glass card-glow rounded-3xl p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Lightbulb className="h-5 w-5" />
                      </span>
                      <h2 className="text-xl font-bold">Solution</h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {project.solution}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="section-pad pt-4">
            <div className="container-max">
              <SectionHeading
                eyebrow="Results"
                title="Measurable business impact"
                description="Real outcomes delivered through this project."
              />
              <ProjectResults>
                {project.results.map((result) => (
                  <div
                    key={result.metric}
                    className="card-glow group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <div className="text-4xl font-bold text-gradient sm:text-5xl">
                      {result.value}
                    </div>
                    <div className="mt-2 text-sm font-semibold">{result.metric}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {result.description}
                    </div>
                    <CheckCircle2 className="mx-auto mt-4 h-6 w-6 text-primary/40" />
                  </div>
                ))}
              </ProjectResults>
            </div>
          </section>

          {/* CTA */}
          <section className="section-pad pt-4">
            <div className="container-max">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center md:p-12">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="relative">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      Want to see it in action?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                      Explore the fully interactive demo and experience the product
                      for yourself.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-brand-gradient text-white shadow-lg shadow-primary/25 hover:opacity-90"
                      >
                        <Link href={project.demoPath}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Launch Demo
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link href="/contact">Start a Project</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Other projects */}
          <section className="section-pad pt-4">
            <div className="container-max">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">More projects</h2>
                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All projects
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {otherProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/project/${p.slug}`}
                    className="card-glow group overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md transition-colors hover:border-primary/40"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={`/images/projects/${p.slug}.svg`}
                        alt={`${p.title} preview`}
                        width={600}
                        height={420}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
