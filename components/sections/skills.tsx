'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Code2, Workflow } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Reveal, fadeUp, stagger } from '@/components/anim';

const skillGroups = [
  {
    icon: BarChart3,
    title: 'Business Analytics',
    gradient: 'from-violet-500 to-purple-600',
    skills: [
      { name: 'Excel', level: 95 },
      { name: 'SQL', level: 88 },
      { name: 'Power BI', level: 90 },
      { name: 'Tableau', level: 85 },
      { name: 'Data Visualization', level: 92 },
      { name: 'KPI Reporting', level: 90 },
    ],
  },
  {
    icon: Code2,
    title: 'Development',
    gradient: 'from-indigo-500 to-violet-600',
    skills: [
      { name: 'HTML', level: 98 },
      { name: 'CSS', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Node.js', level: 80 },
    ],
  },
  {
    icon: Workflow,
    title: 'Automation',
    gradient: 'from-purple-500 to-fuchsia-600',
    skills: [
      { name: 'GoHighLevel', level: 95 },
      { name: 'Zapier', level: 90 },
      { name: 'Make', level: 85 },
      { name: 'APIs', level: 82 },
      { name: 'CRM Automation', level: 93 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const }}
          className="h-full rounded-full bg-brand-gradient"
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Skills"
          title="Tools & technologies I work with"
          description="A comprehensive toolkit spanning analytics, development, and automation — built to deliver end-to-end solutions."
        />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="card-glow group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-md transition-colors hover:border-primary/40"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${group.gradient} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
              />
              <div className="relative">
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${group.gradient} shadow-lg shadow-primary/20`}
                >
                  <group.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-6 text-lg font-bold">{group.title}</h3>
                <div className="space-y-4">
                  {group.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 0.08}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
