'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3,
  Code2,
  Workflow,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { fadeUp, stagger } from '@/components/anim';

const services = [
  {
    icon: BarChart3,
    title: 'Business Analytics',
    tagline: 'Turn data into decisions',
    gradient: 'from-violet-500 to-purple-600',
    features: [
      'KPI Dashboards',
      'Data Cleaning',
      'Reporting',
      'Power BI',
      'Excel Analytics',
      'Business Intelligence',
      'Decision Support',
    ],
  },
  {
    icon: Code2,
    title: 'Web Development',
    tagline: 'Build fast, convert better',
    gradient: 'from-indigo-500 to-violet-600',
    features: [
      'Business Websites',
      'Landing Pages',
      'Portfolio Sites',
      'Responsive Development',
      'SEO Optimization',
      'Performance Optimization',
    ],
  },
  {
    icon: Workflow,
    title: 'GoHighLevel (GHL)',
    tagline: 'Automate everything',
    gradient: 'from-purple-500 to-fuchsia-600',
    features: [
      'CRM Setup',
      'Sales Funnels',
      'Workflow Automation',
      'Appointment Booking',
      'Email Automation',
      'SMS Automation',
      'Lead Nurturing',
      'Pipeline Management',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-20" />
      <div className="container-max">
        <SectionHeading
          eyebrow="Services"
          title="What I can do for your business"
          description="Three core areas of expertise, each designed to help your business grow, scale, and operate more efficiently."
        />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-md transition-colors hover:border-primary/40"
            >
              {/* Gradient glow on hover */}
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
              />

              <div className="relative">
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg shadow-primary/20 transition-transform group-hover:scale-110`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-1 text-sm text-primary">{service.tagline}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
