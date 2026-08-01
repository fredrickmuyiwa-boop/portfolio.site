'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  Globe,
  Workflow,
  Gauge,
  LineChart,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal, fadeUp, stagger } from '@/components/anim';
import { AnimatedCounter } from '@/components/animated-counter';

const highlights = [
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Turning raw data into actionable insights that drive decisions.',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Building fast, responsive, conversion-focused websites.',
  },
  {
    icon: Workflow,
    title: 'CRM Automation',
    description: 'Streamlining customer relationships with automated workflows.',
  },
  {
    icon: Gauge,
    title: 'Process Optimization',
    description: 'Eliminating bottlenecks to make operations run smoother.',
  },
  {
    icon: LineChart,
    title: 'Data Visualization',
    description: 'Creating clear dashboards that make complex data simple.',
  },
  {
    icon: Cpu,
    title: 'Workflow Automation',
    description: 'Connecting tools and automating repetitive tasks end-to-end.',
  },
];

const aboutStats = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 15, suffix: '+', label: 'Industries Served' },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="About Me"
          title="Turning business problems into scalable solutions"
          description="I'm passionate about solving real business problems using technology and data. From uncovering insights to building automation systems, I help organizations work smarter and grow faster."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Bio card */}
          <Reveal className="lg:col-span-1">
            <div className="glass card-glow relative h-full overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-2xl font-bold text-white shadow-lg shadow-primary/30">
                  FM
                </div>
                <h3 className="text-xl font-bold">Fredrick Muyiwa</h3>
                <p className="mt-1 text-sm text-primary">
                  Business Analyst • Web Developer • GHL Automation Expert
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  I help businesses transform ideas into scalable digital
                  solutions through data-driven business analytics,
                  high-performance websites, and intelligent automation systems.
                  My goal is to help organizations increase efficiency, generate
                  more revenue, and create exceptional customer experiences.
                </p>
                <div className="mt-6 space-y-2">
                  {[
                    'Data-driven decision making',
                    'End-to-end project delivery',
                    'Clear, reliable communication',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Highlight cards */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="card-glow group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {aboutStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-gradient sm:text-4xl">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
