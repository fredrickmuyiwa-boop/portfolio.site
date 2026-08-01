'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/animated-counter';
import { fadeUp, stagger } from '@/components/anim';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Retention' },
];

const trustBadges = [
  { icon: Star, label: 'Top Rated' },
  { icon: Zap, label: 'Fast Delivery' },
  { icon: TrendingUp, label: 'Data-Driven' },
  { icon: Sparkles, label: 'GHL Expert' },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-[400px] w-[400px] animate-blob-float rounded-full bg-brand/30 opacity-40 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-[380px] w-[380px] animate-blob-float-slow rounded-full bg-brand-accent/25 opacity-40 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[40%] h-[350px] w-[350px] animate-blob-float rounded-full bg-brand-secondary/25 opacity-30 blur-[120px]" />
      </div>
      {/* Grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-grid mask-fade-b opacity-30" />

      <div className="container-max grid w-full grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* Left content */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Helping Businesses Grow Through{' '}
            <span className="text-gradient">Data, Technology</span> & Automation
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            I build modern websites, uncover insights through business analytics,
            and automate operations with GoHighLevel to help businesses grow
            faster.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="group bg-brand-gradient text-white shadow-lg shadow-primary/25 hover:opacity-90">
              <Link href="/contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-background/50 backdrop-blur hover:bg-secondary">
              <Link href="/projects">View My Work</Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/20" />
            <div className="absolute inset-6 rounded-full border border-primary/10" />

            {/* Profile placeholder */}
            <div className="absolute inset-10 overflow-hidden rounded-full border border-primary/30 bg-brand-gradient-soft">
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-7xl font-bold text-gradient">FM</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-12 glass rounded-2xl px-4 py-3 shadow-xl sm:-left-8"
            >
              <div className="text-2xl font-bold text-gradient">
                <AnimatedCounter to={50} suffix="+" />
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-2 top-1/3 glass rounded-2xl px-4 py-3 shadow-xl sm:-right-6"
            >
              <div className="text-2xl font-bold text-gradient">
                <AnimatedCounter to={98} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-2 left-1/4 glass rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="text-2xl font-bold text-gradient">
                <AnimatedCounter to={30} suffix="+" />
              </div>
              <div className="text-xs text-muted-foreground">Clients</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="container-max px-6 md:px-10">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur-md sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient sm:text-3xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
