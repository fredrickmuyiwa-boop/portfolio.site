'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, stagger } from '@/components/anim';

interface ProjectHeroProps {
  children: ReactNode;
  gradient: string;
}

export function ProjectHero({ children, gradient }: ProjectHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br ${gradient} p-8 md:p-12`}
    >
      {children}
    </motion.div>
  );
}

interface ProjectResultsProps {
  children: ReactNode[];
}

export function ProjectResults({ children }: { children: ReactNode[] }) {
  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
