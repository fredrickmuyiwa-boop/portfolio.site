'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Download,
  ArrowLeft,
  Sun,
  Moon,
  Activity,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type RangeKey = '7D' | '30D' | '90D' | '1Y';

interface Kpi {
  label: string;
  value: string;
  delta: number; // percentage change, e.g. 12.5
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind classes for the icon chip
}

interface ChartPoint {
  label: string;
  revenue: number;
  customers: number;
  performance: number;
}

interface RegionRow {
  region: string;
  sales: number;
  share: number; // 0-100
  trend: number; // percentage
}

interface Dataset {
  kpis: Kpi[];
  chart: ChartPoint[];
  regions: RegionRow[];
}

/* ------------------------------------------------------------------ */
/*  Mock data — one realistic dataset per time range                   */
/* ------------------------------------------------------------------ */

const datasets: Record<RangeKey, Dataset> = {
  '7D': {
    kpis: [
      {
        label: 'Revenue',
        value: '$48,920',
        delta: 6.2,
        icon: DollarSign,
        accent: 'bg-primary/10 text-primary',
      },
      {
        label: 'Customers',
        value: '1,284',
        delta: 3.4,
        icon: Users,
        accent: 'bg-chart-2/10 text-chart-2',
      },
      {
        label: 'Avg Order Value',
        value: '$322',
        delta: 2.1,
        icon: ShoppingCart,
        accent: 'bg-chart-3/10 text-chart-3',
      },
      {
        label: 'Conversion Rate',
        value: '3.0%',
        delta: 0.3,
        icon: Activity,
        accent: 'bg-chart-4/10 text-chart-4',
      },
    ],
    chart: [
      { label: 'Mon', revenue: 6200, customers: 180, performance: 58 },
      { label: 'Tue', revenue: 7100, customers: 205, performance: 64 },
      { label: 'Wed', revenue: 6800, customers: 198, performance: 61 },
      { label: 'Thu', revenue: 8200, customers: 232, performance: 72 },
      { label: 'Fri', revenue: 9400, customers: 261, performance: 81 },
      { label: 'Sat', revenue: 7600, customers: 214, performance: 67 },
      { label: 'Sun', revenue: 6620, customers: 194, performance: 60 },
    ],
    regions: [
      { region: 'North America', sales: 18420, share: 38, trend: 4.2 },
      { region: 'Europe', sales: 12880, share: 26, trend: 3.1 },
      { region: 'Asia Pacific', sales: 9650, share: 20, trend: 5.8 },
      { region: 'Latin America', sales: 5240, share: 11, trend: -1.4 },
      { region: 'Middle East & Africa', sales: 2730, share: 5, trend: 2.0 },
    ],
  },
  '30D': {
    kpis: [
      {
        label: 'Revenue',
        value: '$184,750',
        delta: 12.5,
        icon: DollarSign,
        accent: 'bg-primary/10 text-primary',
      },
      {
        label: 'Customers',
        value: '8,847',
        delta: 8.2,
        icon: Users,
        accent: 'bg-chart-2/10 text-chart-2',
      },
      {
        label: 'Avg Order Value',
        value: '$340',
        delta: 5.1,
        icon: ShoppingCart,
        accent: 'bg-chart-3/10 text-chart-3',
      },
      {
        label: 'Conversion Rate',
        value: '3.2%',
        delta: 0.4,
        icon: Activity,
        accent: 'bg-chart-4/10 text-chart-4',
      },
    ],
    chart: [
      { label: 'W1', revenue: 38200, customers: 1820, performance: 62 },
      { label: 'W2', revenue: 42100, customers: 2010, performance: 68 },
      { label: 'W3', revenue: 40600, customers: 1944, performance: 65 },
      { label: 'W4', revenue: 63850, customers: 3073, performance: 78 },
    ],
    regions: [
      { region: 'North America', sales: 72450, share: 39, trend: 5.1 },
      { region: 'Europe', sales: 48230, share: 26, trend: 4.0 },
      { region: 'Asia Pacific', sales: 36120, share: 20, trend: 7.4 },
      { region: 'Latin America', sales: 18890, share: 10, trend: -2.1 },
      { region: 'Middle East & Africa', sales: 9060, share: 5, trend: 3.2 },
    ],
  },
  '90D': {
    kpis: [
      {
        label: 'Revenue',
        value: '$612,400',
        delta: 18.9,
        icon: DollarSign,
        accent: 'bg-primary/10 text-primary',
      },
      {
        label: 'Customers',
        value: '18,204',
        delta: 14.6,
        icon: Users,
        accent: 'bg-chart-2/10 text-chart-2',
      },
      {
        label: 'Avg Order Value',
        value: '$358',
        delta: 7.8,
        icon: ShoppingCart,
        accent: 'bg-chart-3/10 text-chart-3',
      },
      {
        label: 'Conversion Rate',
        value: '3.4%',
        delta: 0.6,
        icon: Activity,
        accent: 'bg-chart-4/10 text-chart-4',
      },
    ],
    chart: [
      { label: 'M1', revenue: 168000, customers: 5200, performance: 60 },
      { label: 'M2', revenue: 192400, customers: 5840, performance: 67 },
      { label: 'M3', revenue: 252000, customers: 7164, performance: 74 },
    ],
    regions: [
      { region: 'North America', sales: 236800, share: 39, trend: 6.4 },
      { region: 'Europe', sales: 159224, share: 26, trend: 5.2 },
      { region: 'Asia Pacific', sales: 122480, share: 20, trend: 9.1 },
      { region: 'Latin America', sales: 61240, share: 10, trend: -3.0 },
      { region: 'Middle East & Africa', sales: 32656, share: 5, trend: 4.1 },
    ],
  },
  '1Y': {
    kpis: [
      {
        label: 'Revenue',
        value: '$2,847,500',
        delta: 24.3,
        icon: DollarSign,
        accent: 'bg-primary/10 text-primary',
      },
      {
        label: 'Customers',
        value: '12,847',
        delta: 19.7,
        icon: Users,
        accent: 'bg-chart-2/10 text-chart-2',
      },
      {
        label: 'Avg Order Value',
        value: '$340',
        delta: 5.1,
        icon: ShoppingCart,
        accent: 'bg-chart-3/10 text-chart-3',
      },
      {
        label: 'Conversion Rate',
        value: '3.2%',
        delta: 0.4,
        icon: Activity,
        accent: 'bg-chart-4/10 text-chart-4',
      },
    ],
    chart: [
      { label: 'Jan', revenue: 182000, customers: 6800, performance: 58 },
      { label: 'Feb', revenue: 198400, customers: 7240, performance: 61 },
      { label: 'Mar', revenue: 214200, customers: 7820, performance: 63 },
      { label: 'Apr', revenue: 206800, customers: 7560, performance: 60 },
      { label: 'May', revenue: 234600, customers: 8410, performance: 66 },
      { label: 'Jun', revenue: 251200, customers: 8980, performance: 69 },
      { label: 'Jul', revenue: 268400, customers: 9520, performance: 71 },
      { label: 'Aug', revenue: 281600, customers: 9940, performance: 73 },
      { label: 'Sep', revenue: 274200, customers: 9710, performance: 72 },
      { label: 'Oct', revenue: 296800, customers: 10420, performance: 76 },
      { label: 'Nov', revenue: 318400, customers: 11180, performance: 79 },
      { label: 'Dec', revenue: 342000, customers: 12047, performance: 82 },
    ],
    regions: [
      { region: 'North America', sales: 1110600, share: 39, trend: 8.2 },
      { region: 'Europe', sales: 740350, share: 26, trend: 6.8 },
      { region: 'Asia Pacific', sales: 569500, share: 20, trend: 12.4 },
      { region: 'Latin America', sales: 284750, share: 10, trend: -1.9 },
      { region: 'Middle East & Africa', sales: 142300, share: 5, trend: 5.6 },
    ],
  },
};

const ranges: RangeKey[] = ['7D', '30D', '90D', '1Y'];

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 backdrop-blur-md shadow-xl">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-sm font-semibold text-foreground">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== 'light';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ExecutiveDashboardPage() {
  const [range, setRange] = useState<RangeKey>('30D');
  const data = useMemo(() => datasets[range], [range]);

  const handleExport = () => {
    toast.success('Report exported successfully', {
      description: `Executive summary for the ${range} period is ready to download.`,
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-chart-2/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-chart-3/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        {/* Top bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Live Demo
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Executive Business Dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Real-time overview of revenue, customer growth, and regional
              performance across your organization.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Date range selector */}
            <div className="inline-flex rounded-2xl border border-border/60 bg-card/40 p-1 backdrop-blur-md">
              {ranges.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    range === r
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range === r && (
                    <motion.span
                      layoutId="range-pill"
                      className="absolute inset-0 rounded-xl bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{r}</span>
                </button>
              ))}
            </div>

            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </motion.div>

        {/* KPI cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-glow relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-5 backdrop-blur-md"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${kpi.accent}`}
                >
                  <kpi.icon className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    kpi.delta >= 0
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {kpi.delta >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.delta >= 0 ? '+' : ''}
                  {kpi.delta}%
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                vs. previous {range}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts row 1: Revenue + Customer growth */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Revenue area chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Revenue Trend</h2>
                <p className="text-xs text-muted-foreground">
                  Monthly revenue over the selected period
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <DollarSign className="h-3 w-3" />
                {range}
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.chart}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    fill="url(#revGrad)"
                    dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Customer growth line chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Customer Growth</h2>
                <p className="text-xs text-muted-foreground">
                  New customers acquired per period
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-chart-2/10 px-2.5 py-1 text-xs font-medium text-chart-2">
                <Users className="h-3 w-3" />
                {range}
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.chart}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => v.toLocaleString()}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    name="Customers"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'hsl(var(--chart-2))', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Charts row 2: Performance bar + Regional breakdown */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Monthly performance bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Monthly Performance</h2>
                <p className="text-xs text-muted-foreground">
                  Performance index per period (0–100)
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-chart-3/10 px-2.5 py-1 text-xs font-medium text-chart-3">
                <Activity className="h-3 w-3" />
                {range}
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.chart}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--primary))', fillOpacity: 0.06 }} />
                  <Bar
                    dataKey="performance"
                    name="Performance"
                    fill="hsl(var(--chart-3))"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Regional sales breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Regional Sales Breakdown</h2>
                <p className="text-xs text-muted-foreground">
                  Revenue distribution by region
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-chart-4/10 px-2.5 py-1 text-xs font-medium text-chart-4">
                <ShoppingCart className="h-3 w-3" />
                {range}
              </span>
            </div>
            <div className="space-y-3">
              {data.regions.map((row, i) => (
                <motion.div
                  key={row.region}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group"
                >
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{row.region}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        ${row.sales.toLocaleString()}
                      </span>
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                          row.trend >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {row.trend >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {row.trend >= 0 ? '+' : ''}
                        {row.trend}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.share}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2"
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {row.share}% of total revenue
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Demo dashboard · All figures are illustrative mock data · Built with
          Next.js, Recharts &amp; Framer Motion
        </p>
      </div>
    </div>
  );
}
