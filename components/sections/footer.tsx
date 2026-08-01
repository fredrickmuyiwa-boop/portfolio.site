'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Linkedin, Github, Mail, Twitter, ArrowUp } from 'lucide-react';
import { siteConfig } from '@/lib/site';

const footerLinks = [
  {
    title: 'Business Analytics',
    links: ['KPI Dashboards', 'Power BI', 'Data Visualization', 'Reporting'],
  },
  {
    title: 'Web Development',
    links: ['Business Websites', 'Landing Pages', 'SEO Optimization', 'Next.js'],
  },
  {
    title: 'GoHighLevel Automation',
    links: ['CRM Setup', 'Sales Funnels', 'Workflow Automation', 'Lead Nurturing'],
  },
];

const socials = [
  { icon: Linkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
  { icon: Github, href: siteConfig.github, label: 'GitHub' },
  { icon: Twitter, href: siteConfig.twitter, label: 'X (Twitter)' },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
      </div>

      <div className="container-max px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-lg shadow-primary/30">
                FM
              </span>
              <span className="text-base font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Business Analyst, Web Developer, and GoHighLevel Automation Expert
              helping businesses grow through data, technology, and intelligent
              automation.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/services"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-card/40">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
