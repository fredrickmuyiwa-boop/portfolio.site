'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { fadeUp, stagger } from '@/components/anim';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

const categories = ['All', 'Business Analytics', 'Web Development', 'Automation'];

export function ProjectsGrid() {
  const [filter, setFilter] = useState('All');

  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="mt-12">
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              filter === cat
                ? 'bg-brand-gradient text-white'
                : 'border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <motion.article
            key={project.slug}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md transition-colors hover:border-primary/40"
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
              <p className="mt-1 text-sm text-primary">{project.tagline}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
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
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Demo
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-border bg-background/50"
                >
                  <Link href={`/project/${project.slug}`}>Case Study</Link>
                </Button>
              </div>
            </div>

            <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-primary opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
