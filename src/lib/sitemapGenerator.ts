import { CORE_SERVICES } from '../data/servicesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { BLOG_POSTS } from '../data/blogData';
import { ALL_LOCATIONS } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { COURSES_DATA } from '../data/coursesData';

export const DOMAIN = 'https://mucolabs.com';

// Executive leadership and key team profiles
export const TEAM_MEMBERS_SITEMAP = [
  { id: 'team-founder', name: 'Srinivash Mahalingam (Founder & Chairman)' },
  { id: 'team-2', name: 'Mr. Vinoth (Senior Developer & AutoCAD Designer)' },
  { id: 'team-3', name: 'Mr. Chandru (Digital Marketing Head & Company Operations)' },
  { id: 'team-4', name: 'Mr. Marimuthu (Telecalling Head & Accounts Head)' },
  { id: 'team-5', name: 'Mr. Venkatesh (Marketing & HR Manager)' }
];

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

  // 1. Core Top-Level Pillar Pages (Hash-based SPA routes)
  const mainPages: SitemapUrlEntry[] = [
    {
      loc: `${DOMAIN}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0',
      category: 'Core Page',
      title: 'MUCO Labs | Custom Software, Web & AI Engineering'
    },
    {
      loc: `${DOMAIN}/#about`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'About MUCO Labs | Software & AI Engineering Firm'
    },
    {
      loc: `${DOMAIN}/#locations`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      category: 'Core Page',
      title: 'Locations Served | Web & Software Services | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      category: 'Core Page',
      title: 'Services in Erode | Web, Mobile, SEO & AI | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#systems`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Autonomous AI Systems & Neural Workflows | MUCO AI'
    },
    {
      loc: `${DOMAIN}/#process`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'Our 8-Step Engineering & Delivery Process | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#courses`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Tech Courses & Coding Bootcamps | MUCO Labs & Way2Me'
    },
    {
      loc: `${DOMAIN}/#portfolio`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'Portfolio & Case Studies | Software Projects | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#pricing`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.85',
      category: 'Core Page',
      title: 'Software Development Pricing & Packages | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#apps`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.80',
      category: 'Core Page',
      title: 'App Store & Play Store Publishing Services | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#maintenance`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.80',
      category: 'Core Page',
      title: 'Cloud Management & Software AMC Services | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#gallery`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.75',
      category: 'Core Page',
      title: 'Executive Roster & Workplace Gallery | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.90',
      category: 'Core Page',
      title: 'MUCO Labs Blog | AI Trends & Software Engineering'
    },
    {
      loc: `${DOMAIN}/#faq`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.70',
      category: 'Core Page',
      title: 'FAQ | Software Engineering & Development | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.90',
      category: 'Core Page',
      title: 'Contact MUCO Labs | Free Consultation & Project Quote'
    },
    {
      loc: `${DOMAIN}/#terms`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.50',
      category: 'Core Page',
      title: 'Terms and Conditions | Master Agreement | MUCO Labs'
    },
    {
      loc: `${DOMAIN}/#privacy`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.50',
      category: 'Core Page',
      title: 'Privacy Policy & DPDP Act Compliance | MUCO Labs'
    }
  ];

  // 2. Regional Town & City Hub Pages (8 Regional Hubs) - using hash-based routes
  const locationPages: SitemapUrlEntry[] = ALL_LOCATIONS.map((loc) => ({
    loc: `${DOMAIN}/#locations?city=${encodeURIComponent(loc.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.95',
    category: 'Location Hub',
    title: `${loc.name} Technology Hub • ${loc.district}, TN`
  }));

  // 3. High-Intent Commercial Service x Location Combos (17+ Combinations) - using hash-based routes
  const serviceLocationPages: SitemapUrlEntry[] = SERVICE_LOCATIONS_DATA.map((combo) => ({
    loc: `${DOMAIN}/#locations?combo=${encodeURIComponent(combo.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.92',
    category: 'Service x Location',
    title: `${combo.serviceName} in ${combo.locationName} | MUCO Labs`
  }));

  // 4. Core Detailed IT Services (12+ Services) - using hash-based routes
  const servicePages: SitemapUrlEntry[] = CORE_SERVICES.map((service) => ({
    loc: `${DOMAIN}/#services?id=${encodeURIComponent(service.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.90',
    category: 'Service',
    title: `${service.title} - ${service.tagline}`
  }));

  // 5. Mastery Courses & Bootcamps (7+ Courses) - using hash-based routes
  const coursePages: SitemapUrlEntry[] = COURSES_DATA.map((course) => ({
    loc: `${DOMAIN}/#courses?id=${encodeURIComponent(course.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.88',
    category: 'Course',
    title: `${course.title} (${course.duration}) - Way2Me & MUCO Labs`
  }));

  // 6. Portfolio Projects - using hash-based routes
  const projectPages: SitemapUrlEntry[] = INITIAL_PROJECTS.map((project) => ({
    loc: `${DOMAIN}/#portfolio?id=${encodeURIComponent(project.id)}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.80',
    category: 'Project',
    title: `${project.title} (${project.category}) - ${project.client}`
  }));

  // 7. Blog Articles & Technical Guides - using hash-based routes
  const blogPages: SitemapUrlEntry[] = BLOG_POSTS.map((post) => ({
    loc: `${DOMAIN}/#blog?post=${encodeURIComponent(post.slug)}`,
    lastmod: post.publishedDate ? new Date(post.publishedDate).toISOString().split('T')[0] || currentDate : currentDate,
    changefreq: 'weekly',
    priority: '0.85',
    category: 'Blog Article',
    title: post.title
  }));

  // 8. Leadership & Key Team Members - using hash-based routes
  const teamPages: SitemapUrlEntry[] = TEAM_MEMBERS_SITEMAP.map((member) => ({
    loc: `${DOMAIN}/#gallery?member=${encodeURIComponent(member.id)}`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.75',
    category: 'Leadership',
    title: `${member.name} - MUCO Labs Leadership`
  }));

  // Combine all entries for comprehensive sitemap
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
# Focus: Custom Software, Web Development, Mobile Apps & AI Automation
# ==============================================================================

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/
Disallow: /sheets
Disallow: /sheets/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Disallow AI scrapers
User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

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
