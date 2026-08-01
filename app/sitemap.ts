import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/services', '/projects', '/contact'];
  const projectPages = projects.map((p) => `/project/${p.slug}`);
  const demoPages = projects.map((p) => p.demoPath);

  const allPages = [...staticPages, ...projectPages, ...demoPages];

  return allPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/project/') ? 0.8 : 0.7,
  }));
}
