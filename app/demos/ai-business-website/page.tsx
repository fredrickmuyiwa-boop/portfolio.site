'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Brain,
  Workflow,
  BarChart3,
  Code2,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

/* ----------------------------- mock data ----------------------------- */

const services = [
  {
    icon: Brain,
    title: 'AI Consulting',
    description:
      'Strategy sessions to identify high-impact AI opportunities across your operations and map a clear path to value.',
  },
  {
    icon: Workflow,
    title: 'Automation Solutions',
    description:
      'Replace repetitive manual work with reliable, AI-powered workflows that run 24/7 and scale with your business.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description:
      'Turn raw data into decisions with predictive models, dashboards, and natural-language reporting built for your team.',
  },
  {
    icon: Code2,
    title: 'Custom AI Development',
    description:
      'Bespoke models and integrations engineered to fit your stack — from retrieval pipelines to copilots and agents.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$299',
    period: '/mo',
    description: 'For teams exploring their first AI workflow.',
    features: [
      '1 AI workflow',
      'Up to 5,000 actions / mo',
      'Email support',
      'Basic analytics dashboard',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$599',
    period: '/mo',
    description: 'For growing teams that need real automation.',
    features: [
      'Up to 5 AI workflows',
      '25,000 actions / mo',
      'Priority support',
      'Advanced analytics & exports',
      'Custom integrations',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with scale and security needs.',
    features: [
      'Unlimited workflows',
      'Custom action volume',
      'Dedicated success manager',
      'SSO, audit logs & SLAs',
      'On-prem / VPC deployment',
    ],
    highlighted: false,
  },
];

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

type ChatMessage = { role: 'assistant' | 'user'; content: string };

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      "Hi! I'm Nexus, your AI assistant. Ask me anything about our services or pricing. 👋",
  },
  {
    role: 'user',
    content: 'What kind of businesses do you work with?',
  },
  {
    role: 'assistant',
    content:
      "We work with startups and enterprises alike — from first AI workflow to full-scale automation. Want me to point you to a relevant plan?",
  },
];

/* ----------------------------- helpers ----------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ----------------------------- page ----------------------------- */

export default function AiBusinessWebsiteDemo() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const reduceMotion = useReducedMotion();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, chatOpen]);

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "Thanks for your question! Our team will get back to you shortly. In the meantime, check out our pricing page.",
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields before sending.');
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setForm({ name: '', email: '', message: '' });
      toast.success('Message sent! Our team will reach out within 24 hours.', {
        description: `Thanks, ${form.name.split(' ')[0]} — we've received your inquiry.`,
      });
    }, 700);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-[120px] animate-blob-float" />
        <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-brand-accent/20 blur-[140px] animate-blob-float-slow" />
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-brand-secondary/15 blur-[120px] animate-blob-float" />
        <div className="absolute inset-0 bg-grid mask-fade-edges opacity-40" />
      </div>

      {/* top demo bar */}
      <div className="sticky top-0 z-40 border-b border-border/60 glass-strong">
        <div className="container-max flex h-14 items-center justify-between px-4 sm:px-6">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Portfolio
          </Link>
          <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:block">
            Demo · NexusAI
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-colors hover:bg-card/80"
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* nav bar */}
      <header className="sticky top-14 z-30 border-b border-border/40 glass">
        <nav className="container-max flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-lg shadow-brand/30">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Nexus<span className="text-gradient">AI</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>
      </header>

      <main id="top">
        {/* hero */}
        <section className="section-pad relative">
          <div className="container-max grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="show"
              variants={reduceMotion ? undefined : stagger}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
                </span>
                Now with on-device AI agents
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              >
                Transform Your Business with{' '}
                <span className="text-gradient">AI</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-lg text-muted-foreground"
              >
                NexusAI helps modern teams automate the busywork, decode their
                data, and ship intelligent products — without hiring a full ML
                team. From first workflow to full-scale deployment.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card/80"
                >
                  Explore Services
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-accent" />
                  No credit card
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-accent" />
                  14-day trial
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-accent" />
                  Cancel anytime
                </div>
              </motion.div>
            </motion.div>

            {/* hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="card-glow relative overflow-hidden rounded-3xl glass-strong p-6 shadow-2xl shadow-brand/10">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    nexus-orchestrator.ts
                  </span>
                </div>
                <div className="mt-4 space-y-3 font-mono text-xs leading-relaxed text-muted-foreground">
                  <p>
                    <span className="text-brand-accent">const</span> agent ={' '}
                    <span className="text-brand-secondary">await</span> nexus.
                    <span className="text-foreground">deploy</span>({'{'}{' '}
                    <span className="text-brand-accent">goal</span>:{' '}
                    <span className="text-green-400">&quot;reduce churn&quot;</span>
                    {'}'}); 
                  </p>
                  <p className="pl-4 text-foreground/70">
                    ↳ analyzing 1.2M customer records…
                  </p>
                  <p className="pl-4 text-foreground/70">
                    ↳ identified 3 high-risk segments
                  </p>
                  <p className="pl-4 text-foreground/70">
                    ↳ drafted 12 retention playbooks
                  </p>
                  <p>
                    <span className="text-brand-secondary">return</span>{' '}
                    <span className="text-green-400">&quot;shipped ✦&quot;</span>;
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Tasks automated', value: '4,820' },
                    { label: 'Hours saved', value: '1,140h' },
                    { label: 'Uptime', value: '99.9%' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border/60 bg-card/40 p-3"
                    >
                      <p className="text-lg font-semibold text-foreground">
                        {s.value}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl glass-strong p-4 shadow-xl shadow-brand/10 sm:block">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient">
                    <Zap className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Live deployment</p>
                    <p className="text-xs text-muted-foreground">
                      3 agents running
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* services */}
        <section id="services" className="section-pad relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={reduceMotion ? undefined : stagger}
            className="container-max"
          >
            <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Services
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to ship AI
              </h2>
              <p className="mt-4 text-muted-foreground">
                Four focused offerings that take you from strategy to a
                production-grade AI stack — without the overhead.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {services.map((s) => (
                <motion.article
                  key={s.title}
                  variants={fadeUp}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="card-glow group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-xl hover:shadow-brand/10"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-accent transition-transform group-hover:scale-110">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* pricing */}
        <section id="pricing" className="section-pad relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={reduceMotion ? undefined : stagger}
            className="container-max"
          >
            <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Pricing
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, transparent plans
              </h2>
              <p className="mt-4 text-muted-foreground">
                Start free, scale when you&apos;re ready. No hidden fees, cancel
                anytime.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
            >
              {pricing.map((tier) => (
                <motion.article
                  key={tier.name}
                  variants={fadeUp}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className={`card-glow relative flex flex-col overflow-hidden rounded-2xl p-7 transition-shadow hover:shadow-xl hover:shadow-brand/10 ${
                    tier.highlighted
                      ? 'glass-strong ring-2 ring-brand/50 lg:-mt-4 lg:mb-4'
                      : 'glass'
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-brand/30">
                      <Sparkles className="h-3 w-3" /> Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="mb-1 text-sm text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3 text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gradient-soft text-brand-accent">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 ${
                      tier.highlighted
                        ? 'bg-brand-gradient text-white shadow-lg shadow-brand/30'
                        : 'border border-border/60 bg-card/40 text-foreground hover:bg-card/80'
                    }`}
                  >
                    {tier.price === 'Custom' ? 'Contact sales' : 'Get started'}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* about */}
        <section id="about" className="section-pad relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={reduceMotion ? undefined : stagger}
            className="container-max grid items-center gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                About
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                We build the AI layer for modern teams
              </h2>
              <p className="mt-4 text-muted-foreground">
                Founded in 2021, NexusAI has shipped over 400 production AI
                systems for companies across fintech, healthcare, and
                e-commerce. Our mission is simple: make powerful AI accessible,
                reliable, and genuinely useful — no hype, just outcomes.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '400+', label: 'AI systems shipped' },
                  { value: '98%', label: 'Client retention' },
                  { value: '24/7', label: 'Support coverage' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/60 bg-card/40 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-gradient">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="card-glow relative overflow-hidden rounded-3xl glass-strong p-8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient">
                  <Sparkles className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="font-semibold">Our principles</p>
                  <p className="text-sm text-muted-foreground">
                    What we promise every customer.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    t: 'Outcomes over hype',
                    d: 'We measure success by your metrics, not model benchmarks.',
                  },
                  {
                    t: 'Reliability first',
                    d: 'Every workflow ships with monitoring, fallbacks, and SLAs.',
                  },
                  {
                    t: 'Your data stays yours',
                    d: 'No training on your data. VPC and on-prem options available.',
                  },
                ].map((p) => (
                  <li key={p.t} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-gradient-soft text-brand-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{p.t}</p>
                      <p className="text-sm text-muted-foreground">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </section>

        {/* contact */}
        <section id="contact" className="section-pad relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={reduceMotion ? undefined : stagger}
            className="container-max grid items-center gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Contact
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s build something intelligent
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your project and we&apos;ll get back within 24
                hours with a tailored plan — no sales pressure, just a clear
                next step.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-card/40">
                    <MessageSquare className="h-4 w-4 text-brand-accent" />
                  </span>
                  hello@nexusai.demo
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-card/40">
                    <Bot className="h-4 w-4 text-brand-accent" />
                  </span>
                  Or chat with our AI assistant →
                </p>
              </div>
            </motion.div>

            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="card-glow rounded-3xl glass-strong p-7 sm:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project…"
                    className="w-full resize-none rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {submitting ? (
                    <>Sending…</>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </motion.div>
        </section>

        {/* footer */}
        <footer className="border-t border-border/60 py-10">
          <div className="container-max flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="font-semibold">
                Nexus<span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NexusAI — a demo page. All data is
              mock.
            </p>
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* AI assistant widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 right-0 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl glass-strong shadow-2xl shadow-brand/20"
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-border/60 bg-brand-gradient-soft px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient">
                    <Bot className="h-5 w-5 text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-green-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">AI Assistant</p>
                    <p className="text-[11px] text-muted-foreground">
                      Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  aria-label="Close chat"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        m.role === 'user'
                          ? 'bg-brand-gradient text-white'
                          : 'border border-border/60 bg-card/60 text-foreground'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-card/60 px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* input */}
              <div className="border-t border-border/60 p-3">
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 pl-4 pr-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder="Type a message…"
                    className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground/60"
                  />
                  <button
                    onClick={handleSend}
                    aria-label="Send message"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* floating button */}
        <motion.button
          onClick={() => setChatOpen((o) => !o)}
          aria-label="Open AI assistant"
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-xl shadow-brand/40"
        >
          <AnimatePresence mode="wait" initial={false}>
            {chatOpen ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Bot className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
          {!chatOpen && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-card bg-green-400" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
