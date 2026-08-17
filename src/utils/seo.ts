import { PageId } from '../types';
import { TeamMember } from '../data/galleryData';
import { injectJsonLdSchema, getPageSchemaMarkup, getMemberSchemaMarkup } from './schemaMarkup';

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

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'MUCO Labs | AI, Software Development & Digital Transformation Company',
    description: 'MUCO Labs is a leading software development and AI solutions company specializing in web development, mobile apps, cloud service management, AutoCAD design, SaaS platforms, CRM, ERP, UI/UX, and digital transformation for startups and enterprises.',
    keywords: 'MUCO, MUCO Labs, MUCO Labs India, Software Development Company, Website Development, Web Design, Mobile App Development, Android App Development, AI Development, AI Chatbot Development, AI Automation, Cloud Service Management, Cloud Computing, AutoCAD Design, CAD Drafting, CRM Development, ERP Solutions, SaaS Development, UI UX Design, API Development, Digital Marketing, SEO Services, Branding, IT Consulting, Technical Support',
    ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  about: {
    title: 'About MUCO Labs | Leadership, Vision & Software Engineering HQ India',
    description: 'Learn about MUCO Labs, a premier software development company founded by Srinivash Mahalingam in Erode, Tamil Nadu, India. Discover our team, mission, and digital innovation values.',
    keywords: 'MUCO Labs team, Srinivash Mahalingam, Erode software company, MUCO Labs India, software development company India, IT consulting Tamil Nadu',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  services: {
    title: 'Software Development & AI Services | MUCO Labs',
    description: 'Explore MUCO Labs\' full-suite engineering services: Website Development, Mobile App Development, AI Chatbots & Automation, Cloud Computing, AutoCAD Design, CRM & ERP Solutions, and Digital Marketing.',
    keywords: 'Website Development, Mobile App Development, AI Development, Cloud Service Management, AutoCAD Design, CAD Drafting, CRM Development, ERP Solutions, SaaS Development, UI UX Design, Digital Marketing, SEO Services, IT Consulting',
    ogImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
  },
  portfolio: {
    title: 'Portfolio & Case Studies | MUCO Labs Web & Mobile Projects',
    description: 'Browse MUCO Labs\' featured client portfolio, SaaS applications, custom mobile apps, and enterprise software engineering success stories.',
    keywords: 'MUCO Labs portfolio, software case studies, web development showcase, mobile app portfolio, client success stories, SaaS case studies',
    ogImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  },
  apps: {
    title: 'App Store & Play Store Publishing Services | MUCO Labs',
    description: 'Publish your iOS and Android mobile apps on Apple App Store and Google Play Store with MUCO Labs. Complete submission, policy compliance, and release management.',
    keywords: 'App Store submission, Google Play publishing, Android App Development, iOS release management, mobile app deployment, MUCO Labs apps',
    ogImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
  pricing: {
    title: 'Software Development Pricing & Transparent Packages | MUCO Labs',
    description: 'Affordable and transparent pricing packages for Web Development, Mobile Apps, AI Integrations, and Enterprise Software Development by MUCO Labs India.',
    keywords: 'software development cost, website design pricing, app development estimate, MUCO Labs packages, IT consulting pricing India',
    ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  },
  maintenance: {
    title: 'Cloud Service Management & Annual Maintenance Contracts (AMC) | MUCO Labs',
    description: 'Ensure 99.9% uptime with MUCO Labs\' Cloud Service Management, 24/7 server health monitoring, security updates, and IT technical support AMC plans.',
    keywords: 'Cloud Service Management, Cloud Computing, software AMC, server maintenance, Technical Support, IT maintenance contract, DevOps management',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  gallery: {
    title: 'Executive Roster & Photo Gallery | MUCO Labs India',
    description: 'Explore MUCO Labs\' executive directory, team leadership, engineering labs, and company culture in Erode, Tamil Nadu, India.',
    keywords: 'MUCO Labs executive team, team gallery, software engineering labs, MUCO Labs photo gallery, tech leadership India',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | MUCO Labs',
    description: 'Find answers to common questions regarding MUCO Labs\' software development process, project timelines, code ownership, and technical support.',
    keywords: 'MUCO Labs FAQ, software development questions, web app development process, project timeline FAQ, IT support FAQ',
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  contact: {
    title: 'Contact MUCO Labs | Request Custom Quote & IT Consultation',
    description: 'Get in touch with MUCO Labs for custom web development, mobile apps, AI automation, or AutoCAD projects. Email: mucolabs2026@gmail.com | Phone: +91 6381809844.',
    keywords: 'contact MUCO Labs, hire software developers, software development company contact, IT consulting Erode, request proposal MUCO',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80',
  },
  sheets: {
    title: 'Google Sheets Integration & Lead Exporter | MUCO Labs',
    description: 'Connect Google Sheets to MUCO Labs to read, write, and export client inquiries and custom software proposals in real time.',
    keywords: 'Google Sheets integration, Google Drive API, export leads to sheets, MUCO Labs spreadsheet manager',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  blog: {
    title: 'MUCO Labs Blog | Tech Insights, AI Trends & Software Engineering',
    description: 'Read the latest industry insights, software architecture tutorials, AI automation trends, and digital transformation guides from MUCO Labs.',
    keywords: 'MUCO Labs blog, software development blog, AI trends, cloud computing tutorials, web design articles, IT insights',
    ogImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  },
};

export function updatePageSEO(page: PageId) {
  const metadata = PAGE_METADATA[page] || PAGE_METADATA.home;
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/#${page}` : 'https://mucolabs.com';
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

  // Inject Page JSON-LD Structured Schema Markup
  try {
    const schemas = getPageSchemaMarkup(page);
    injectJsonLdSchema(schemas);
  } catch (err) {
    console.warn('Unable to inject page JSON-LD schema:', err);
  }
}

/**
 * Inject unique Open Graph and social metadata for team member profiles
 */
export function updateMemberSEO(member: TeamMember) {
  const memberTitle = `${member.name} - ${member.titleRole} | MUCO Labs Executive Roster`;
  const memberDesc = `${member.name} is ${member.titleRole} (${member.affiliation}) at MUCO Labs. ${member.bio}`;
  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#gallery?member=${encodeURIComponent(member.id)}` 
    : `https://mucolabs.com/#gallery?member=${member.id}`;

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

  // Inject Team Member JSON-LD Structured Schema Markup
  try {
    const memberSchemas = getMemberSchemaMarkup(member);
    injectJsonLdSchema(memberSchemas);
  } catch (err) {
    console.warn('Unable to inject team member JSON-LD schema:', err);
  }
}

