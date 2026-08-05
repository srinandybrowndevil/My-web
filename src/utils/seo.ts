import { PageId } from '../types';
import { TeamMember } from '../data/galleryData';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

/**
 * Helper function to create or update meta tags in document head
 */
export function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper function to set canonical URL tag
 */
export function setCanonicalUrl(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export const PAGE_METADATA: Record<PageId, PageMetadata> = {
  home: {
    title: 'MUCO Labs | Premier Enterprise Software Development & Cloud Solutions',
    description: 'MUCO Labs delivers high-performance custom web applications, mobile apps, ERP systems, AI integrations, and cloud infrastructure for modern enterprises.',
    keywords: 'MUCO Labs, software development, web apps, mobile app development, custom software, Cloud solutions, Erode software company',
    ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  about: {
    title: 'About Us | MUCO Labs Executive Board & Engineering HQ',
    description: 'Discover MUCO Labs\' leadership, company vision, executive board members, and engineering HQ driving software excellence.',
    keywords: 'MUCO Labs team, Srinivashni, Yogahariharan, software leaders, Erode technology HQ, company vision',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  services: {
    title: 'Engineering & Software Development Services | MUCO Labs',
    description: 'Explore MUCO Labs\' full-suite engineering services: full-stack web applications, cross-platform mobile apps, cloud DevOps, and enterprise ERPs.',
    keywords: 'web development, React TypeScript, Node.js, mobile app development, cloud infrastructure, AMC services, enterprise ERP',
    ogImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
  },
  portfolio: {
    title: 'Client Portfolio & Live Success Stories | MUCO Labs',
    description: 'View case studies, live production apps, and client milestones built with precision by the MUCO Labs engineering team.',
    keywords: 'software case studies, web app portfolio, client success stories, live software showcase, MUCO Labs projects',
    ogImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  },
  apps: {
    title: 'App Store & Google Play Store Publishing | MUCO Labs',
    description: 'Hassle-free iOS App Store and Google Play Store submission, compliance verification, policy audit, and app release management.',
    keywords: 'App Store submission, Google Play publishing, mobile app deployment, iOS compliance, Android release manager',
    ogImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
  pricing: {
    title: 'Transparent Project Pricing & Custom Quotes | MUCO Labs',
    description: 'Compare transparent software development tiers, retainer options, AMC plans, and request custom project estimates.',
    keywords: 'software development cost, app development pricing, web design quotes, IT maintenance plans, MUCO Labs pricing',
    ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  },
  maintenance: {
    title: 'Annual Maintenance Contracts (AMC) & Cloud Ops | MUCO Labs',
    description: '24/7 server health monitoring, security patch management, automated backups, and guaranteed SLA support for production systems.',
    keywords: 'software AMC, server maintenance, cloud monitoring, IT support contract, DevOps management, SLA support',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  gallery: {
    title: 'Executive Leadership Directory & Gallery | MUCO Labs',
    description: 'Explore MUCO Labs\' order-wise executive directory and visual photo archives of our headquarters, engineering labs, and events.',
    keywords: 'MUCO Labs executive team, team directory, tech workshop photos, HQ engineering lab, company culture',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | MUCO Labs',
    description: 'Answers to essential questions regarding project timelines, source code ownership, security guarantees, and payment structures.',
    keywords: 'MUCO Labs FAQ, software development process, project timeline FAQ, IT consulting questions',
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  contact: {
    title: 'Contact MUCO Labs | Request Custom Proposal & Consultations',
    description: 'Connect directly with MUCO Labs engineering leaders. Get custom project proposals, technical consultations, or schedule a callback.',
    keywords: 'contact MUCO Labs, software consulting, request proposal, hire developers, Erode TN software office',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80',
  },
  sheets: {
    title: 'Google Sheets Integrator & Lead Exporter | MUCO Labs',
    description: 'Connect Google Sheets to MUCO Labs to read, write, and export client inquiries and custom software proposals in real time.',
    keywords: 'Google Sheets integration, Google Drive API, export leads to sheets, MUCO Labs spreadsheet manager',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
};

export function updatePageSEO(page: PageId) {
  const metadata = PAGE_METADATA[page] || PAGE_METADATA.home;
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/#${page}` : 'https://mucolabs.in';
  const defaultOgImage = metadata.ogImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';

  // Update document title
  document.title = metadata.title;

  // Standard Meta Tags
  setMetaTag('name', 'description', metadata.description);
  setMetaTag('name', 'keywords', metadata.keywords);

  // Open Graph Meta Tags
  setMetaTag('property', 'og:title', metadata.title);
  setMetaTag('property', 'og:description', metadata.description);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', currentUrl);
  setMetaTag('property', 'og:image', defaultOgImage);
  setMetaTag('property', 'og:site_name', 'MUCO Labs');

  // Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', metadata.title);
  setMetaTag('name', 'twitter:description', metadata.description);
  setMetaTag('name', 'twitter:image', defaultOgImage);

  setCanonicalUrl(currentUrl);
}

/**
 * Inject unique Open Graph and social metadata for team member profiles
 */
export function updateMemberSEO(member: TeamMember) {
  const memberTitle = `${member.name} - ${member.titleRole} | MUCO Labs Executive Roster`;
  const memberDesc = `${member.name} is ${member.titleRole} (${member.affiliation}) at MUCO Labs. ${member.bio}`;
  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#gallery?member=${encodeURIComponent(member.id)}` 
    : `https://mucolabs.in/#gallery?member=${member.id}`;

  // Update document title
  document.title = memberTitle;

  // Standard Meta Tags
  setMetaTag('name', 'description', memberDesc);
  setMetaTag('name', 'keywords', `${member.name}, ${member.titleRole}, MUCO Labs executive, ${member.keyResponsibilities.join(', ')}`);

  // Open Graph Meta Tags for Social Snippets
  setMetaTag('property', 'og:title', memberTitle);
  setMetaTag('property', 'og:description', memberDesc);
  setMetaTag('property', 'og:type', 'profile');
  setMetaTag('property', 'og:url', profileUrl);
  setMetaTag('property', 'og:image', member.image);
  setMetaTag('property', 'og:site_name', 'MUCO Labs');

  // Open Graph Profile-Specific Tags
  const cleanName = member.name.replace(/^Mr\.\s*|^Ms\.\s*|^Dr\.\s*/i, '').trim();
  const nameParts = cleanName.split(' ');
  const firstName = nameParts[0] || member.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  setMetaTag('property', 'profile:first_name', firstName);
  if (lastName) {
    setMetaTag('property', 'profile:last_name', lastName);
  }
  setMetaTag('property', 'profile:username', member.id);

  // Twitter Card Snippet Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', memberTitle);
  setMetaTag('name', 'twitter:description', memberDesc);
  setMetaTag('name', 'twitter:image', member.image);

  setCanonicalUrl(profileUrl);
}

