import fs from 'fs';
import path from 'path';
import { CORE_SERVICES } from '../src/data/servicesData.js';
import { INITIAL_PROJECTS } from '../src/data/projectsData.js';
import { BLOG_POSTS } from '../src/data/blogData.js';

const DOMAIN = 'https://mucolabs.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const mainPages: SitemapUrl[] = [
  { loc: `${DOMAIN}/`, lastmod: CURRENT_DATE, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN}/#about`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#services`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/#portfolio`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#pricing`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#apps`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#maintenance`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#gallery`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: '0.7' },
  { loc: `${DOMAIN}/#blog`, lastmod: CURRENT_DATE, changefreq: 'weekly', priority: '0.8' },
  { loc: `${DOMAIN}/#faq`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: '0.7' },
  { loc: `${DOMAIN}/#contact`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: '0.9' },
  { loc: `${DOMAIN}/#sheets`, lastmod: CURRENT_DATE, changefreq: 'monthly', priority: '0.6' },
];

// Generate URLs for Core Services
const servicePages: SitemapUrl[] = CORE_SERVICES.map((service) => ({
  loc: `${DOMAIN}/#services?id=${encodeURIComponent(service.id)}`,
  lastmod: CURRENT_DATE,
  changefreq: 'weekly',
  priority: '0.85',
}));

// Generate URLs for Portfolio Projects
const projectPages: SitemapUrl[] = INITIAL_PROJECTS.map((project) => ({
  loc: `${DOMAIN}/#portfolio?id=${encodeURIComponent(project.id)}`,
  lastmod: CURRENT_DATE,
  changefreq: 'weekly',
  priority: '0.8',
}));

// Generate URLs for Blog Articles
const blogPages: SitemapUrl[] = BLOG_POSTS.map((post) => ({
  loc: `${DOMAIN}/#blog?slug=${encodeURIComponent(post.slug)}`,
  lastmod: CURRENT_DATE,
  changefreq: 'weekly',
  priority: '0.75',
}));

const allUrls: SitemapUrl[] = [
  ...mainPages,
  ...servicePages,
  ...projectPages,
  ...blogPages,
];

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlNodes = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlNodes}
</urlset>
`;
}

function run() {
  const xmlContent = generateSitemapXml(allUrls);
  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
  console.log(`[Sitemap Generator] Successfully generated ${allUrls.length} routes to ${sitemapPath}`);
}

run();
