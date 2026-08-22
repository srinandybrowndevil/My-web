import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { BLOG_POSTS } from '../data/blogData';
import { ALL_LOCATIONS } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { COURSES_DATA } from '../data/coursesData';

export const DOMAIN = 'https://mucolabs.com';

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  category: 'Core Page' | 'Location Hub' | 'Service x Location' | 'Service' | 'Course' | 'Project' | 'Blog Article' | 'Leadership';
  title: string;
}

export function getCurrentDateFormatted(): string {
  return new Date().toISOString().split('T')[0];
}

export function getAllSitemapEntries(): SitemapUrlEntry[] {
  const currentDate = getCurrentDateFormatted();

  // 1. Core Top-Level Pillar Pages
  const mainPages: SitemapUrlEntry[] = [
    {
      loc: `${DOMAIN}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0',
      category: 'Core Page',
      title: 'MUCO Labs - Custom Software, AI Automation & Web Development Erode'
    },
    {
      loc: `${DOMAIN}/#about`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'About MUCO Labs - Leadership, Mission & Engineering Standards'
    },
    {
      loc: `${DOMAIN}/#locations`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      category: 'Core Page',
      title: 'Regional Technology Hubs & Local SEO Directory (Erode & Kongu Region)'
    },
    {
      loc: `${DOMAIN}/#services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      category: 'Core Page',
      title: 'Enterprise & Startup IT Services Catalog'
    },
    {
      loc: `${DOMAIN}/#courses`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Technology Courses, Bootcamps & Way2Me Academy Partnerships'
    },
    {
      loc: `${DOMAIN}/#portfolio`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'Production Case Studies & Client Project Portfolio'
    },
    {
      loc: `${DOMAIN}/#pricing`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'Transparent Pricing Calculator & Quotation Estimator'
    },
    {
      loc: `${DOMAIN}/#apps`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.80',
      category: 'Core Page',
      title: 'Mobile App Publishing to Google Play Store & Apple App Store'
    },
    {
      loc: `${DOMAIN}/#maintenance`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.80',
      category: 'Core Page',
      title: '24/7 Cloud Support, SLA & Annual Maintenance Contracts (AMC)'
    },
    {
      loc: `${DOMAIN}/#gallery`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.75',
      category: 'Core Page',
      title: 'Our Executive Leadership, Mentors & Engineering Team'
    },
    {
      loc: `${DOMAIN}/#blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Engineering Blog, Tech Insights & Local Business Growth Guides'
    },
    {
      loc: `${DOMAIN}/#faq`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.70',
      category: 'Core Page',
      title: 'Frequently Asked Questions & Client Onboarding Guide'
    },
    {
      loc: `${DOMAIN}/#contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Contact MUCO Labs - Consultation & Direct Quotation'
    }
  ];

  // 2. Regional Town & City Hub Pages (8 Regional Hubs)
  const locationPages: SitemapUrlEntry[] = ALL_LOCATIONS.map((loc) => ({
    loc: `${DOMAIN}/#locations?city=${encodeURIComponent(loc.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.95',
    category: 'Location Hub',
    title: `${loc.name} Technology Hub • ${loc.district}, Tamil Nadu (${loc.pincode})`
  }));

  // 3. High-Intent Commercial Service x Location Combos (17+ Combinations)
  const serviceLocationPages: SitemapUrlEntry[] = SERVICE_LOCATIONS_DATA.map((combo) => ({
    loc: `${DOMAIN}/#locations?combo=${encodeURIComponent(combo.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.92',
    category: 'Service x Location',
    title: `${combo.serviceName} in ${combo.locationName} (${combo.startingPrice})`
  }));

  // 4. Core Detailed IT Services (12+ Services)
  const servicePages: SitemapUrlEntry[] = CORE_SERVICES.map((service) => ({
    loc: `${DOMAIN}/#services?id=${encodeURIComponent(service.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.90',
    category: 'Service',
    title: `${service.title} - ${service.tagline}`
  }));

  // 5. Mastery Courses & Bootcamps (7+ Courses)
  const coursePages: SitemapUrlEntry[] = COURSES_DATA.map((course) => ({
    loc: `${DOMAIN}/#courses?id=${encodeURIComponent(course.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.88',
    category: 'Course',
    title: `${course.title} (${course.duration}) - Way2Me & MUCO Labs`
  }));

  // 6. Portfolio Projects
  const projectPages: SitemapUrlEntry[] = INITIAL_PROJECTS.map((project) => ({
    loc: `${DOMAIN}/#portfolio?id=${encodeURIComponent(project.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.80',
    category: 'Project',
    title: `${project.title} (${project.category}) - ${project.client}`
  }));

  // 7. Blog Articles & Technical Guides
  const blogPages: SitemapUrlEntry[] = BLOG_POSTS.map((post) => ({
    loc: `${DOMAIN}/#blog?post=${encodeURIComponent(post.slug)}`,
    lastmod: post.publishedDate ? new Date(post.publishedDate).toISOString().split('T')[0] || currentDate : currentDate,
    changefreq: 'weekly',
    priority: '0.85',
    category: 'Blog Article',
    title: post.title
  }));

  // 8. Leadership & Key Team Members
  const teamMemberIds = [
    { id: 'team-founder', name: 'Srinivash Mahalingam (Founder & Managing Director)' },
    { id: 'team-vinoth', name: 'Vinoth K (Lead Full-Stack Architect)' },
    { id: 'team-chandru', name: 'Chandru S (Chief AI & Cloud Systems Engineer)' },
    { id: 'team-marimuthu', name: 'Marimuthu R (Head of Mobile App Development)' },
    { id: 'team-venkatesh', name: 'Venkatesh P (Lead UI/UX Designer & Product Strategist)' }
  ];

  const teamPages: SitemapUrlEntry[] = teamMemberIds.map((member) => ({
    loc: `${DOMAIN}/#gallery?member=${encodeURIComponent(member.id)}`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.75',
    category: 'Leadership',
    title: `${member.name} - MUCO Labs Leadership`
  }));

  return [
    ...mainPages,
    ...locationPages,
    ...serviceLocationPages,
    ...servicePages,
    ...coursePages,
    ...projectPages,
    ...blogPages,
    ...teamPages
  ];
}

export function generateSitemapXml(urls: SitemapUrlEntry[] = getAllSitemapEntries()): string {
  const urlNodes = urls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
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

export function generateRobotsTxt(): string {
  return `# ==============================================================================
# MUCO Labs - Official Robots Exclusion Protocol & Crawler Directives
# Canonical Host: https://mucolabs.com
# Founder & Chairman: Srinivash Mahalingam
# Headquarters: Erode, Tamil Nadu, India - 638001
# Focus: Custom Software, Web Development, Mobile Apps, Local SEO & AI Automation
# ==============================================================================

User-agent: *
Allow: /
Allow: /#*
Allow: /dist/
Allow: /images/
Allow: /assets/
Allow: /favicon.ico
Allow: /site.webmanifest
Disallow: /sheets
Disallow: /sheets/
Disallow: /#sheets
Disallow: /#sheets*
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /api/*

# Explicit Crawler Directives for Major Search Engines
User-agent: Googlebot
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /sheets/
Disallow: /#sheets*
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /assets/

User-agent: Bingbot
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /sheets/
Disallow: /#sheets*
Disallow: /admin/
Disallow: /api/

User-agent: Slurp
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /#sheets*
Disallow: /api/

User-agent: DuckDuckBot
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /#sheets*
Disallow: /api/

User-agent: Baiduspider
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /#sheets*
Disallow: /api/

User-agent: YandexBot
Allow: /
Allow: /#*
Disallow: /sheets
Disallow: /#sheets*
Disallow: /api/

# Canonical Domain & Sitemap Reference
Host: https://mucolabs.com
Sitemap: https://mucolabs.com/sitemap.xml
`;
}

export function getSitemapStats() {
  const entries = getAllSitemapEntries();
  const breakdown: Record<string, number> = {};

  entries.forEach((item) => {
    breakdown[item.category] = (breakdown[item.category] || 0) + 1;
  });

  return {
    totalUrls: entries.length,
    generatedAt: new Date().toISOString(),
    domain: DOMAIN,
    breakdown,
    entries
  };
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
