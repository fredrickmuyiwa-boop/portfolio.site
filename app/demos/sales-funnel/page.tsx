'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  Moon,
  Sun,
  Plus,
  Mail,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Users,
  DollarSign,
  Filter,
  X,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const funnelStages = [
  { label: 'Leads', count: 1200, pct: 100, color: '#8B5CF6' },
  { label: 'Qualified', count: 740, pct: 62, color: '#6366F1' },
  { label: 'Demo', count: 420, pct: 35, color: '#A855F7' },
  { label: 'Proposal', count: 180, pct: 15, color: '#7C3AED' },
  { label: 'Closed', count: 72, pct: 6, color: '#C026D3' },
];

const crmColumns = [
  { title: 'New', deals: [
    { company: 'Acme Corp', value: '$12,000', owner: 'FM', color: '#8B5CF6' },
    { company: 'TechFlow', value: '$8,500', owner: 'FM', color: '#6366F1' },
  { company: 'BrightPath', value: '$15,000', owner: 'FM', color: '#A855F7' },
  ]},
  { title: 'Contacted', deals: [
    { company: 'Nexa Digital', value: '$22,000', owner: 'FM', color: '#7C3AED' },
    { company: 'Vertex Labs', value: '$9,800', owner: 'FM', color: '#C026D3' },
  ]},
  { title: 'Qualified', deals: [
    { company: 'Meridian Group', value: '$34,000', owner: 'FM', color: '#8B5CF6' },
    { company: 'Apex Realty', value: '$18,500', owner: 'FM', color: '#6366F1' },
    { company: 'Lumen Co.', value: '$27,000', owner: 'FM', color: '#A855F7' },
  ]},
  { title: 'Negotiation', deals: [
    { company: 'GlobalTech', value: '$45,000', owner: 'FM', color: '#7C3AED' },
    { company: 'Summit Inc', value: '$31,000', owner: 'FM', color: '#C026D3' },
  ]},
  { title: 'Won', deals: [
    { company: 'Pinnacle Co', value: '$52,000', owner: 'FM', color: '#8B5CF6' },
  ]},
];

const emailSequence = [
  { day: 'Day 0', subject: 'Welcome & Introduction', status: 'Sent' },
  { day: 'Day 2', subject: 'Follow-up & Value Proposition', status: 'Sent' },
  { day: 'Day 5', subject: 'Case Study & Social Proof', status: 'Sent' },
  { day: 'Day 8', subject: 'Product Demo Offer', status: 'Pending' },
  { day: 'Day 12', subject: 'Final Offer & Discount', status: 'Pending' },
];

const analytics = [
  { label: 'Total Leads', value: '1,200', icon: Users, color: '#8B5CF6' },
  { label: 'Conversion Rate', value: '6%', icon: TrendingUp, color: '#6366F1' },
  { label: 'Avg Deal Size', value: '$24K', icon: DollarSign, color: '#A855F7' },
  { label: 'Revenue (MTD)', value: '$182K', icon: DollarSign, color: '#7C3AED' },
];

const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const dates = ['Mon 15', 'Tue 16', 'Wed 17', 'Thu 18', 'Fri 19'];

export default function SalesFunnelDemo() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [leads, setLeads] = useState<{ name: string; email: string; company: string }[]>([]);
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBooking, setShowBooking] = useState(false);

  const captureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please fill in name and email');
      return;
    }
    setLeads((l) => [...l, form]);
    setForm({ name: '', email: '', company: '' });
    toast.success('Lead captured successfully!');
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }
    toast.success(`Appointment booked for ${selectedDate} at ${selectedTime}`);
    setShowBooking(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Demo bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-xl">
        <Link href="/projects" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Live Demo</span>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Sales Funnel Automation</h1>
            <p className="mt-1 text-sm text-muted-foreground">From lead capture to closed deal — fully automated</p>
          </div>
          <button
            onClick={() => toast.success('New campaign wizard opened')}
            className="flex h-10 items-center gap-2 rounded-lg bg-brand-gradient px-4 text-sm font-medium text-white shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>

        {/* Analytics */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {analytics.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Funnel Visualization */}
        <div className="mt-8 glass rounded-3xl p-6">
          <h2 className="mb-6 text-lg font-bold">Sales Funnel</h2>
          <div className="space-y-3">
            {funnelStages.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-medium">{s.label}</div>
                <div className="flex-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    className="flex h-12 items-center justify-between rounded-xl px-4"
                    style={{ backgroundColor: `${s.color}30`, border: `1px solid ${s.color}50` }}
                  >
                    <span className="text-sm font-semibold" style={{ color: s.color }}>{s.count}</span>
                    <span className="text-xs text-muted-foreground">{s.pct}%</span>
                  </motion.div>
                </div>
                {i < funnelStages.length - 1 && (
                  <div className="hidden w-16 flex-shrink-0 text-right text-xs text-muted-foreground sm:block">
                    {Math.round((funnelStages[i + 1].count / s.count) * 100)}% convert
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CRM Pipeline */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">CRM Pipeline</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {crmColumns.map((col) => (
              <div key={col.title} className="rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-sm font-semibold">{col.title}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{col.deals.length}</span>
                </div>
                <div className="space-y-2">
                  {col.deals.map((deal) => (
                    <div key={deal.company} className="rounded-xl border border-border/40 bg-background/50 p-3 transition-all hover:border-primary/40">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium">{deal.company}</p>
                        <span className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: deal.color }}>
                          {deal.owner}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-primary">{deal.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Capture + Email Sequence */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Lead capture */}
          <div className="glass rounded-3xl p-6">
            <h2 className="mb-4 text-lg font-bold">Lead Capture</h2>
            <form onSubmit={captureLead} className="space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email address"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="Company (optional)"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button type="submit" className="w-full rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20">
                Capture Lead
              </button>
            </form>
            {leads.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent Leads</p>
                {leads.slice(-3).map((lead, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Email sequence */}
          <div className="glass rounded-3xl p-6">
            <h2 className="mb-4 text-lg font-bold">Email Sequence</h2>
            <div className="space-y-3">
              {emailSequence.map((email, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                      email.status === 'Sent' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    )}>
                      {email.status === 'Sent' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    {i < emailSequence.length - 1 && <div className="my-1 h-6 w-px bg-border" />}
                  </div>
                  <div className="flex-1 rounded-lg border border-border/40 bg-background/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary">{email.day}</span>
                      <span className={cn(
                        'rounded-full px-2 py-0.5 text-xs',
                        email.status === 'Sent' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      )}>
                        {email.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{email.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Booking */}
        <div className="mt-8 glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Appointment Booking</h2>
            <button
              onClick={() => setShowBooking(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-4 py-2 text-sm font-medium hover:border-primary/40"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBooking(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowBooking(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="text-lg font-bold">Book an Appointment</h3>
              <p className="mt-1 text-sm text-muted-foreground">Select a date and time that works for you.</p>
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select Date</p>
                <div className="grid grid-cols-5 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={cn(
                        'rounded-lg border px-2 py-3 text-sm transition-colors',
                        selectedDate === d ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/50 hover:border-primary/40'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select Time</p>
                <div className="grid grid-cols-5 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={cn(
                        'rounded-lg border px-2 py-3 text-xs transition-colors',
                        selectedTime === t ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/50 hover:border-primary/40'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={confirmBooking}
                className="mt-6 w-full rounded-lg bg-brand-gradient px-4 py-3 text-sm font-medium text-white shadow-md shadow-primary/20"
              >
                Confirm Booking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
