'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { fadeUp, stagger } from '@/components/anim';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/projects';

export function Portfolio() {
  return (
    <section id="portfolio" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work & case studies"
          description="A look at some of the projects I've delivered across analytics, development, and automation."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={`card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md transition-colors hover:border-primary/40 ${
                i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <Link href={`/project/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={`/images/projects/${project.slug}.svg`}
                    alt={`${project.title} preview`}
                    width={600}
                    height={420}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge className="border-primary/30 bg-background/70 text-primary backdrop-blur">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <Link href={`/project/${project.slug}`}>
                  <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="bg-brand-gradient text-white shadow-md shadow-primary/20 hover:opacity-90"
                  >
                    <Link href={project.demoPath}>
                      Live Demo
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-border bg-background/50"
                  >
                    <Link href={`/project/${project.slug}`}>View Case Study</Link>
                  </Button>
                </div>
              </div>

              <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-primary opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline" className="group border-border bg-background/50">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
