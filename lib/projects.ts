export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  businessProblem: string;
  solution: string;
  technologies: string[];
  results: ProjectResult[];
  demoPath: string;
  github: string;
  heroGradient: string;
  accentColor: string;
  icon: string;
}

export const projects: Project[] = [
  {
    slug: 'executive-business-dashboard',
    title: 'Executive Business Dashboard',
    category: 'Business Analytics',
    tagline: 'Real-time KPIs for C-suite decision-making',
    description:
      'A real-time executive dashboard consolidating sales, operations, and finance data into a single interactive view for C-suite decision-making.',
    businessProblem:
      'Leadership teams were making decisions based on scattered spreadsheets and delayed reports. There was no single source of truth, and critical metrics were often days or weeks out of date by the time they reached decision-makers.',
    solution:
      'I built a unified dashboard that pulls data from multiple sources in real time, visualizes KPIs with interactive charts, and provides drill-down capabilities for each metric. Regional sales maps, revenue trends, and customer growth are all visible at a glance.',
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Power BI', 'SQL'],
    results: [
      { metric: 'Reporting Time', value: '85%', description: 'reduction in time to generate reports' },
      { metric: 'Decision Speed', value: '3x', description: 'faster access to critical metrics' },
      { metric: 'Data Sources', value: '12+', description: 'systems unified into one view' },
    ],
    demoPath: '/demos/executive-dashboard',
    github: 'https://github.com/fredrickmuyiwa-boop',
    heroGradient: 'from-violet-600 to-purple-700',
    accentColor: '#8B5CF6',
    icon: 'BarChart3',
  },
  {
    slug: 'recruitment-automation-platform',
    title: 'Recruitment Automation Platform',
    category: 'Automation',
    tagline: 'End-to-end hiring pipeline on autopilot',
    description:
      'An automated recruitment system with candidate screening, interview scheduling, pipeline management, and hiring analytics.',
    businessProblem:
      'Recruiters spent 60% of their time on manual tasks — screening resumes, scheduling interviews, and sending follow-up emails. The hiring process was slow, inconsistent, and candidates were dropping out due to delayed responses.',
    solution:
      'I designed an automated recruitment platform with a visual candidate pipeline, automated screening workflows, interview scheduling, and a recruiter dashboard with hiring funnel analytics. The system nurtures candidates automatically and keeps the entire team aligned.',
    technologies: ['GoHighLevel', 'Zapier', 'React', 'TypeScript', 'CRM', 'Email Automation'],
    results: [
      { metric: 'Time-to-Hire', value: '45%', description: 'reduction in average hiring time' },
      { metric: 'Manual Work', value: '20 hrs', description: 'saved per recruiter each week' },
      { metric: 'Response Rate', value: '40%', description: 'increase in candidate engagement' },
    ],
    demoPath: '/demos/recruitment-automation',
    github: 'https://github.com/fredrickmuyiwa-boop',
    heroGradient: 'from-indigo-600 to-violet-700',
    accentColor: '#6366F1',
    icon: 'Users',
  },
  {
    slug: 'ai-business-website',
    title: 'AI Business Website',
    category: 'Web Development',
    tagline: 'Conversion-optimized site with AI assistant',
    description:
      'A modern, AI-powered business website with an intelligent assistant widget, service pages, pricing, and a seamless contact flow.',
    businessProblem:
      'The company website was outdated, slow, and generated very few leads. Visitors had no way to get instant answers, and the support team was overwhelmed with repetitive questions that could be handled automatically.',
    solution:
      'I built a high-performance website with an AI assistant widget that answers visitor questions in real time, service pages optimized for SEO, a clear pricing structure, and a frictionless contact flow — all wrapped in smooth, modern animations.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI', 'Framer Motion'],
    results: [
      { metric: 'Conversion Rate', value: '3.2x', description: 'increase in lead conversion' },
      { metric: 'Page Speed', value: '98', description: 'Lighthouse performance score' },
      { metric: 'Support Load', value: '60%', description: 'reduction in repetitive inquiries' },
    ],
    demoPath: '/demos/ai-business-website',
    github: 'https://github.com/fredrickmuyiwa-boop',
    heroGradient: 'from-purple-600 to-fuchsia-700',
    accentColor: '#A855F7',
    icon: 'Sparkles',
  },
  {
    slug: 'sales-funnel-automation',
    title: 'Sales Funnel Automation',
    category: 'Automation',
    tagline: 'From lead capture to closed deal, automated',
    description:
      'A complete sales funnel automation system with lead capture, CRM pipeline stages, email sequences, conversion analytics, and appointment booking.',
    businessProblem:
      'Leads were falling through the cracks because follow-ups were manual and inconsistent. The sales team had no visibility into where prospects were in the funnel, and there was no automated nurturing to keep leads engaged.',
    solution:
      'I implemented a full sales funnel with automated lead capture, a visual CRM pipeline with drag-and-drop stages, email and SMS sequences triggered by pipeline movement, conversion analytics, and an appointment booking flow — all running on GoHighLevel.',
    technologies: ['GoHighLevel', 'Zapier', 'CRM', 'Email Automation', 'SMS', 'React'],
    results: [
      { metric: 'Conversion Rate', value: '40%', description: 'increase in lead-to-customer rate' },
      { metric: 'Response Time', value: '5 min', description: 'average automated follow-up time' },
      { metric: 'Pipeline Visibility', value: '100%', description: 'real-time deal tracking' },
    ],
    demoPath: '/demos/sales-funnel',
    github: 'https://github.com/fredrickmuyiwa-boop',
    heroGradient: 'from-fuchsia-600 to-purple-700',
    accentColor: '#C026D3',
    icon: 'Workflow',
  },
  {
    slug: 'analytics-reporting-dashboard',
    title: 'Analytics Reporting Dashboard',
    category: 'Business Analytics',
    tagline: 'Automated insights from every data source',
    description:
      'An automated reporting system that pulls data from multiple sources, generates visual insights, and delivers scheduled reports with interactive filters.',
    businessProblem:
      'Teams spent hours each week manually compiling reports from different platforms. Data was inconsistent, reports were often outdated, and stakeholders had no way to explore the data themselves.',
    solution:
      'I created an analytics reporting dashboard that automatically aggregates data from multiple sources, presents it through interactive charts with date range filters, and allows one-click export. Financial summaries, user analytics, and business metrics are all in one place.',
    technologies: ['Tableau', 'SQL', 'React', 'Recharts', 'Data Viz', 'TypeScript'],
    results: [
      { metric: 'Report Prep Time', value: '90%', description: 'reduction in manual reporting effort' },
      { metric: 'Data Accuracy', value: '99.5%', description: 'improvement in data consistency' },
      { metric: 'Stakeholder Access', value: '24/7', description: 'self-serve dashboard availability' },
    ],
    demoPath: '/demos/analytics-reporting',
    github: 'https://github.com/fredrickmuyiwa-boop',
    heroGradient: 'from-violet-600 to-indigo-700',
    accentColor: '#7C3AED',
    icon: 'LineChart',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
