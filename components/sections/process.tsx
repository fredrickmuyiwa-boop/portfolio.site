'use client';

import { motion } from 'framer-motion';
import { Search, Lightbulb, Palette, Code2, Gauge, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { fadeUp, stagger } from '@/components/anim';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description:
      'We start by understanding your business, goals, challenges, and what success looks like for this project.',
    number: '01',
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    description:
      'I develop a clear plan with defined objectives, scope, timeline, and the right tools to get the job done.',
    number: '02',
  },
  {
    icon: Palette,
    title: 'Design',
    description:
      'From wireframes to polished visuals, I craft an experience that looks great and works even better.',
    number: '03',
  },
  {
    icon: Code2,
    title: 'Development',
    description:
      'I build with clean, modern, well-tested code — fast, responsive, and built to scale with your business.',
    number: '04',
  },
  {
    icon: Gauge,
    title: 'Optimization',
    description:
      'I refine, test, and optimize for performance, SEO, and conversions before anything goes live.',
    number: '05',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description:
      'We go live with confidence, backed by documentation, training, and ongoing support when you need it.',
    number: '06',
  },
];

export function Process() {
  return (
    <section id="process" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-edges opacity-20" />
      <div className="container-max">
        <SectionHeading
          eyebrow="Process"
          title="How I take your project from idea to launch"
          description="A proven, transparent process that keeps you informed and confident at every step."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative mt-16"
        >
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="card-glow group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
