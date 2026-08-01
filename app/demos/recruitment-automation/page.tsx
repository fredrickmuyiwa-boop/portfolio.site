'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  Bell,
  Briefcase,
  Calendar,
  CheckCircle2,
  Users,
  Clock,
  X,
  MapPin,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Candidate {
  id: number;
  name: string;
  role: string;
  stage: 'Applied' | 'Screened' | 'Interview' | 'Offer' | 'Hired';
  initials: string;
  color: string;
  experience: string;
  location: string;
  email: string;
  skills: string[];
}

const candidates: Candidate[] = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Frontend Engineer', stage: 'Applied', initials: 'SC', color: '#8B5CF6', experience: '6 years', location: 'San Francisco', email: 'sarah@example.com', skills: ['React', 'TypeScript', 'Next.js'] },
  { id: 2, name: 'Marcus Johnson', role: 'Product Designer', stage: 'Applied', initials: 'MJ', color: '#6366F1', experience: '4 years', location: 'Remote', email: 'marcus@example.com', skills: ['Figma', 'Design Systems', 'Prototyping'] },
  { id: 3, name: 'Priya Sharma', role: 'Data Analyst', stage: 'Screened', initials: 'PS', color: '#A855F7', experience: '5 years', location: 'New York', email: 'priya@example.com', skills: ['SQL', 'Power BI', 'Python'] },
  { id: 4, name: 'James Okonkwo', role: 'Backend Engineer', stage: 'Screened', initials: 'JO', color: '#7C3AED', experience: '7 years', location: 'Lagos', email: 'james@example.com', skills: ['Node.js', 'PostgreSQL', 'AWS'] },
  { id: 5, name: 'Amara Johnson', role: 'Marketing Manager', stage: 'Interview', initials: 'AJ', color: '#C026D3', experience: '8 years', location: 'London', email: 'amara@example.com', skills: ['SEO', 'Content', 'Analytics'] },
  { id: 6, name: 'David Kim', role: 'DevOps Engineer', stage: 'Interview', initials: 'DK', color: '#6D28D9', experience: '5 years', location: 'Seattle', email: 'david@example.com', skills: ['Docker', 'Kubernetes', 'CI/CD'] },
  { id: 7, name: 'Lisa Wang', role: 'Product Manager', stage: 'Offer', initials: 'LW', color: '#8B5CF6', experience: '9 years', location: 'Toronto', email: 'lisa@example.com', skills: ['Strategy', 'Roadmaps', 'Analytics'] },
  { id: 8, name: 'Tom Wilson', role: 'Sales Lead', stage: 'Hired', initials: 'TW', color: '#6366F1', experience: '6 years', location: 'Austin', email: 'tom@example.com', skills: ['CRM', 'Pipeline', 'Negotiation'] },
  { id: 9, name: 'Nina Patel', role: 'UX Researcher', stage: 'Applied', initials: 'NP', color: '#A855F7', experience: '3 years', location: 'Remote', email: 'nina@example.com', skills: ['Research', 'Interviews', 'Analysis'] },
  { id: 10, name: 'Chris Brown', role: 'Full Stack Engineer', stage: 'Screened', initials: 'CB', color: '#7C3AED', experience: '4 years', location: 'Berlin', email: 'chris@example.com', skills: ['React', 'Node.js', 'GraphQL'] },
];

const stages = ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'] as const;

const stats = [
  { label: 'Active Candidates', value: '120', icon: Users, color: '#8B5CF6' },
  { label: 'Interviews This Week', value: '28', icon: Calendar, color: '#6366F1' },
  { label: 'Offers Extended', value: '12', icon: CheckCircle2, color: '#A855F7' },
  { label: 'Time-to-Hire', value: '18 days', icon: Clock, color: '#7C3AED' },
];

const jobPostings = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 45, status: 'Open' },
  { title: 'Product Designer', dept: 'Design', applicants: 32, status: 'Open' },
  { title: 'Data Analyst', dept: 'Analytics', applicants: 28, status: 'Open' },
  { title: 'DevOps Engineer', dept: 'Engineering', applicants: 19, status: 'Paused' },
];

const funnelStages = [
  { label: 'Applied', count: 120, pct: 100 },
  { label: 'Screened', count: 80, pct: 67 },
  { label: 'Interview', count: 45, pct: 38 },
  { label: 'Offer', count: 20, pct: 17 },
  { label: 'Hired', count: 12, pct: 10 },
];

const notifications = [
  { text: 'Sarah Chen submitted an application', time: '2m ago' },
  { text: 'Interview scheduled with Amara Johnson', time: '1h ago' },
  { text: 'Lisa Wang accepted the offer', time: '3h ago' },
  { text: 'New candidate matched: Chris Brown', time: '5h ago' },
];

export default function RecruitmentDemo() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return candidates;
    return candidates.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            <h1 className="text-2xl font-bold sm:text-3xl">Recruitment Automation Platform</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your hiring pipeline end-to-end</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates..."
                className="h-10 w-64 rounded-lg border border-border bg-card/40 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotifs((s) => !s)}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/40 text-muted-foreground hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-border bg-card p-2 shadow-xl backdrop-blur-xl"
                  >
                    {notifications.map((n, i) => (
                      <div key={i} className="rounded-lg px-3 py-2.5 hover:bg-secondary/50">
                        <p className="text-sm">{n.text}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => toast.success('Job posting form opened')}
              className="flex h-10 items-center gap-2 rounded-lg bg-brand-gradient px-4 text-sm font-medium text-white shadow-md shadow-primary/20"
            >
              <Briefcase className="h-4 w-4" />
              Post Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  <stat.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-3 text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Candidate Pipeline</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage) => {
              const stageCandidates = filtered.filter((c) => c.stage === stage);
              return (
                <div key={stage} className="rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur-md">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span className="text-sm font-semibold">{stage}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{stageCandidates.length}</span>
                  </div>
                  <div className="space-y-2">
                    {stageCandidates.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelected(c)}
                        className="w-full rounded-xl border border-border/40 bg-background/50 p-3 text-left transition-all hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: c.color }}>
                            {c.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{c.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    {stageCandidates.length === 0 && (
                      <p className="px-2 py-4 text-center text-xs text-muted-foreground">No candidates</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel + Job Postings */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Hiring funnel */}
          <div className="glass rounded-3xl p-6">
            <h2 className="mb-4 text-lg font-bold">Hiring Funnel</h2>
            <div className="space-y-3">
              {funnelStages.map((s, i) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">{s.count} ({s.pct}%)</span>
                  </div>
                  <div className="h-8 overflow-hidden rounded-lg bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                      className="flex h-full items-center justify-end rounded-lg bg-brand-gradient pr-3 text-xs font-medium text-white"
                    >
                      {s.count}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job postings */}
          <div className="glass rounded-3xl p-6">
            <h2 className="mb-4 text-lg font-bold">Job Postings</h2>
            <div className="space-y-3">
              {jobPostings.map((job) => (
                <div key={job.title} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/50 p-4 transition-colors hover:border-primary/40">
                  <div>
                    <p className="text-sm font-semibold">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.dept} • {job.applicants} applicants</p>
                  </div>
                  <span className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    job.status === 'Open' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                  )}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white" style={{ backgroundColor: selected.color }}>
                  {selected.initials}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{selected.name}</h3>
                  <p className="text-sm text-primary">{selected.role}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" /> {selected.experience} experience
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {selected.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {selected.email}
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span key={skill} className="rounded-lg border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Stage: {selected.stage}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => { toast.success(`Interview scheduled with ${selected.name}`); setSelected(null); }}
                  className="flex-1 rounded-lg bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => { toast.success(`${selected.name} moved to next stage`); setSelected(null); }}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  Advance Stage
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
