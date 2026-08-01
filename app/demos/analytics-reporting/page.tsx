'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  ArrowLeft,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Download,
  Eye,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const periods = ['Today', '7D', '30D', '90D', '1Y'] as const;
type Period = (typeof periods)[number];

const dataSets: Record<Period, {
  kpis: { label: string; value: string; change: string; up: boolean; icon: typeof DollarSign }[];
  revenue: { month: string; value: number }[];
  users: { month: string; new: number; returning: number }[];
  traffic: { name: string; value: number; color: string }[];
  financials: { month: string; revenue: string; expenses: string; profit: string; margin: string }[];
}> = {
  Today: {
    kpis: [
      { label: 'Total Revenue', value: '$42K', change: '+8.2%', up: true, icon: DollarSign },
      { label: 'Active Users', value: '1,240', change: '+3.1%', up: true, icon: Users },
      { label: 'Avg Session', value: '4m 12s', change: '-0.5%', up: false, icon: Eye },
      { label: 'Bounce Rate', value: '38.2%', change: '-2.1%', up: true, icon: TrendingDown },
    ],
    revenue: [
      { month: '12AM', value: 8 }, { month: '4AM', value: 5 }, { month: '8AM', value: 12 },
      { month: '12PM', value: 18 }, { month: '4PM', value: 22 }, { month: '8PM', value: 28 },
    ],
    users: [
      { month: '12AM', new: 30, returning: 50 }, { month: '4AM', new: 20, returning: 40 },
      { month: '8AM', new: 60, returning: 80 }, { month: '12PM', new: 90, returning: 120 },
      { month: '4PM', new: 110, returning: 140 }, { month: '8PM', new: 130, returning: 160 },
    ],
    traffic: [
      { name: 'Organic', value: 45, color: '#8B5CF6' },
      { name: 'Direct', value: 25, color: '#6D28D9' },
      { name: 'Referral', value: 18, color: '#A855F7' },
      { name: 'Social', value: 12, color: '#7C3AED' },
    ],
    financials: [
      { month: 'Today', revenue: '$42K', expenses: '$18K', profit: '$24K', margin: '57%' },
    ],
  },
  '7D': {
    kpis: [
      { label: 'Total Revenue', value: '$284K', change: '+12.5%', up: true, icon: DollarSign },
      { label: 'Active Users', value: '8,420', change: '+6.8%', up: true, icon: Users },
      { label: 'Avg Session', value: '4m 32s', change: '+1.2%', up: true, icon: Eye },
      { label: 'Bounce Rate', value: '42.3%', change: '-1.8%', up: true, icon: TrendingDown },
    ],
    revenue: [
      { month: 'Mon', value: 32 }, { month: 'Tue', value: 45 }, { month: 'Wed', value: 38 },
      { month: 'Thu', value: 52 }, { month: 'Fri', value: 61 }, { month: 'Sat', value: 48 },
      { month: 'Sun', value: 35 },
    ],
    users: [
      { month: 'Mon', new: 800, returning: 1200 }, { month: 'Tue', new: 950, returning: 1400 },
      { month: 'Wed', new: 880, returning: 1300 }, { month: 'Thu', new: 1100, returning: 1600 },
      { month: 'Fri', new: 1250, returning: 1800 }, { month: 'Sat', new: 980, returning: 1500 },
      { month: 'Sun', new: 760, returning: 1100 },
    ],
    traffic: [
      { name: 'Organic', value: 42, color: '#8B5CF6' },
      { name: 'Direct', value: 28, color: '#6D28D9' },
      { name: 'Referral', value: 20, color: '#A855F7' },
      { name: 'Social', value: 10, color: '#7C3AED' },
    ],
    financials: [
      { month: 'Week 1', revenue: '$284K', expenses: '$112K', profit: '$172K', margin: '61%' },
    ],
  },
  '30D': {
    kpis: [
      { label: 'Total Revenue', value: '$1.2M', change: '+18.3%', up: true, icon: DollarSign },
      { label: 'Active Users', value: '24,580', change: '+14.2%', up: true, icon: Users },
      { label: 'Avg Session', value: '4m 48s', change: '+2.5%', up: true, icon: Eye },
      { label: 'Bounce Rate', value: '39.8%', change: '-3.2%', up: true, icon: TrendingDown },
    ],
    revenue: [
      { month: 'W1', value: 180 }, { month: 'W2', value: 220 }, { month: 'W3', value: 260 },
      { month: 'W4', value: 310 },
    ],
    users: [
      { month: 'W1', new: 3200, returning: 4800 }, { month: 'W2', new: 3800, returning: 5200 },
      { month: 'W3', new: 4500, returning: 5800 }, { month: 'W4', new: 5100, returning: 6400 },
    ],
    traffic: [
      { name: 'Organic', value: 48, color: '#8B5CF6' },
      { name: 'Direct', value: 22, color: '#6D28D9' },
      { name: 'Referral', value: 18, color: '#A855F7' },
      { name: 'Social', value: 12, color: '#7C3AED' },
    ],
    financials: [
      { month: 'Week 1', revenue: '$280K', expenses: '$105K', profit: '$175K', margin: '63%' },
      { month: 'Week 2', revenue: '$310K', expenses: '$118K', profit: '$192K', margin: '62%' },
      { month: 'Week 3', revenue: '$340K', expenses: '$125K', profit: '$215K', margin: '63%' },
      { month: 'Week 4', revenue: '$370K', expenses: '$132K', profit: '$238K', margin: '64%' },
    ],
  },
  '90D': {
    kpis: [
      { label: 'Total Revenue', value: '$3.8M', change: '+24.1%', up: true, icon: DollarSign },
      { label: 'Active Users', value: '68,200', change: '+22.5%', up: true, icon: Users },
      { label: 'Avg Session', value: '5m 02s', change: '+3.8%', up: true, icon: Eye },
      { label: 'Bounce Rate', value: '37.5%', change: '-4.5%', up: true, icon: TrendingDown },
    ],
    revenue: [
      { month: 'M1', value: 920 }, { month: 'M2', value: 1180 }, { month: 'M3', value: 1620 },
    ],
    users: [
      { month: 'M1', new: 12000, returning: 18000 }, { month: 'M2', new: 15000, returning: 21000 },
      { month: 'M3', new: 19000, returning: 25000 },
    ],
    traffic: [
      { name: 'Organic', value: 52, color: '#8B5CF6' },
      { name: 'Direct', value: 20, color: '#6D28D9' },
      { name: 'Referral', value: 16, color: '#A855F7' },
      { name: 'Social', value: 12, color: '#7C3AED' },
    ],
    financials: [
      { month: 'Month 1', revenue: '$1.1M', expenses: '$380K', profit: '$720K', margin: '65%' },
      { month: 'Month 2', revenue: '$1.3M', expenses: '$420K', profit: '$880K', margin: '68%' },
      { month: 'Month 3', revenue: '$1.6M', expenses: '$480K', profit: '$1.12M', margin: '70%' },
    ],
  },
  '1Y': {
    kpis: [
      { label: 'Total Revenue', value: '$14.2M', change: '+32.8%', up: true, icon: DollarSign },
      { label: 'Active Users', value: '248K', change: '+28.4%', up: true, icon: Users },
      { label: 'Avg Session', value: '5m 24s', change: '+5.2%', up: true, icon: Eye },
      { label: 'Bounce Rate', value: '35.1%', change: '-6.8%', up: true, icon: TrendingDown },
    ],
    revenue: [
      { month: 'Q1', value: 2800 }, { month: 'Q2', value: 3400 },
      { month: 'Q3', value: 3800 }, { month: 'Q4', value: 4200 },
    ],
    users: [
      { month: 'Q1', new: 45000, returning: 62000 }, { month: 'Q2', new: 58000, returning: 78000 },
      { month: 'Q3', new: 72000, returning: 95000 }, { month: 'Q4', new: 88000, returning: 112000 },
    ],
    traffic: [
      { name: 'Organic', value: 55, color: '#8B5CF6' },
      { name: 'Direct', value: 18, color: '#6D28D9' },
      { name: 'Referral', value: 15, color: '#A855F7' },
      { name: 'Social', value: 12, color: '#7C3AED' },
    ],
    financials: [
      { month: 'Q1', revenue: '$3.2M', expenses: '$1.1M', profit: '$2.1M', margin: '66%' },
      { month: 'Q2', revenue: '$3.6M', expenses: '$1.2M', profit: '$2.4M', margin: '67%' },
      { month: 'Q3', revenue: '$3.8M', expenses: '$1.3M', profit: '$2.5M', margin: '66%' },
      { month: 'Q4', revenue: '$4.2M', expenses: '$1.4M', profit: '$2.8M', margin: '67%' },
    ],
  },
};

const tabs = ['Overview', 'Users', 'Financials'] as const;
type Tab = (typeof tabs)[number];

export default function AnalyticsReportingDemo() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<Period>('30D');
  const [tab, setTab] = useState<Tab>('Overview');

  useEffect(() => setMounted(true), []);

  const data = dataSets[period];

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
            <h1 className="text-2xl font-bold sm:text-3xl">Analytics Reporting Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Automated insights from every data source</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Date range */}
            <div className="flex rounded-lg border border-border bg-card/40 p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                    period === p ? 'bg-brand-gradient text-white' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => toast.success('Report exported as PDF')}
              className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card/40 px-4 text-sm font-medium hover:border-primary/40"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <kpi.icon className="h-5 w-5" />
                </span>
                <span className={cn(
                  'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                  kpi.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                )}>
                  {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </span>
              </div>
              <div className="mt-3 text-2xl font-bold">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                tab === t ? 'bg-brand-gradient text-white' : 'border border-border bg-card/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {tab === 'Overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Revenue */}
              <div className="glass rounded-3xl p-6">
                <h3 className="mb-4 text-sm font-semibold">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={data.revenue}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                    <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} />
                    <YAxis stroke="#A1A1AA" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#13131D', border: '1px solid #2a2a3e', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Traffic sources */}
              <div className="glass rounded-3xl p-6">
                <h3 className="mb-4 text-sm font-semibold">Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={data.traffic} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                      {data.traffic.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#13131D', border: '1px solid #2a2a3e', borderRadius: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === 'Users' && (
            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-sm font-semibold">User Analytics — New vs Returning</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data.users}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} />
                  <YAxis stroke="#A1A1AA" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#13131D', border: '1px solid #2a2a3e', borderRadius: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="new" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="returning" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {tab === 'Financials' && (
            <div className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-sm font-semibold">Financial Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">Period</th>
                      <th className="pb-3 pr-4 font-medium">Revenue</th>
                      <th className="pb-3 pr-4 font-medium">Expenses</th>
                      <th className="pb-3 pr-4 font-medium">Profit</th>
                      <th className="pb-3 font-medium">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.financials.map((row) => (
                      <tr key={row.month} className="border-b border-border/40 last:border-0">
                        <td className="py-3 pr-4 font-medium">{row.month}</td>
                        <td className="py-3 pr-4 text-green-400">{row.revenue}</td>
                        <td className="py-3 pr-4 text-red-400">{row.expenses}</td>
                        <td className="py-3 pr-4 font-semibold text-primary">{row.profit}</td>
                        <td className="py-3">{row.margin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
