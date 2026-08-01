'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Code2,
  Target,
  Workflow,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { fadeUp, stagger } from '@/components/anim';
import { AnimatedCounter } from '@/components/animated-counter';

const reasons = [
  {
    icon: Database,
    title: 'Data-Driven Decisions',
    description: 'Every recommendation is backed by data, not guesswork.',
    stat: 100,
    suffix: '%',
    statLabel: 'Evidence-based',
  },
  {
    icon: Code2,
    title: 'Modern Development',
    description: 'Cutting-edge tech stack for fast, scalable, maintainable sites.',
    stat: 95,
    suffix: '+',
    statLabel: 'Lighthouse score',
  },
  {
    icon: Target,
    title: 'Business-Focused Solutions',
    description: 'Technology that serves your business goals, not the other way around.',
    stat: 3,
    suffix: 'x',
    statLabel: 'Avg. ROI',
  },
  {
    icon: Workflow,
    title: 'Automation Expertise',
    description: 'Save hours every week with intelligent, reliable workflows.',
    stat: 40,
    suffix: '+',
    statLabel: 'Hours saved/mo',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile process that ships quality work on schedule, every time.',
    stat: 100,
    suffix: '%',
    statLabel: 'On-time delivery',
  },
  {
    icon: MessageSquare,
    title: 'Reliable Communication',
    description: 'Clear updates, quick responses, and full transparency throughout.',
    stat: 24,
    suffix: 'h',
    statLabel: 'Response time',
  },
];

export function WhyWorkWithMe() {
  return (
    <section id="why-me" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-brand-accent/15 blur-[120px]" />
      </div>
      <div className="container-max">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="The advantage of working with a specialist"
          description="I bring a rare combination of business acumen, technical skill, and automation expertise to every project."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="card-glow group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-md transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <reason.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gradient">
                    <AnimatedCounter to={reason.stat} suffix={reason.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {reason.statLabel}
                  </div>
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
