/**
 * Dynamic SEO Meta Tags Management for MUCO Labs
 * Provides page-specific meta tags, Open Graph, and Twitter cards
 */

import { useEffect } from 'react';
import { PageId } from '../types';

export interface PageMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

const BASE_URL = 'https://mucolabs.in';

const PAGE_META_DATA: Record<PageId, PageMetaTags> = {
  home: {
    title: 'MUCO Labs | Custom Software, Web & AI Engineering',
    description: 'MUCO Labs engineers custom software applications, web & mobile platforms, autonomous AI agents, and business automation for forward-thinking enterprises in Erode, Tamil Nadu.',
    keywords: 'MUCO Labs, enterprise software, custom web development, mobile app development, autonomous AI systems, AI automation, cloud architecture, Next.js, React Native',
    ogTitle: 'MUCO Labs | Custom Software, Web & AI Engineering',
    ogDescription: 'Intelligent systems engineering, web & mobile applications, autonomous AI agents, and business automation built with mathematical precision.',
    ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=630&q=85',
    twitterTitle: 'MUCO Labs | Custom Software, Web & AI Engineering',
    twitterDescription: 'We build digital systems, custom software, AI & automation for forward-thinking enterprises.',
    twitterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/`
  },
  about: {
    title: 'About MUCO Labs | Founder Srinivash Mahalingam & Engineering Excellence',
    description: 'Learn about MUCO Labs\' founder Srinivash Mahalingam, our engineering philosophy, and how we deliver high-precision software solutions for enterprises in Erode and Tamil Nadu.',
    keywords: 'MUCO Labs about, Srinivash Mahalingam, software engineering company Erode, web development company Tamil Nadu',
    ogTitle: 'About MUCO Labs | Engineering Excellence in Erode',
    ogDescription: 'Discover our founder\'s vision and our commitment to building high-precision digital systems.',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#about`
  },
  services: {
    title: 'Services | MUCO Labs Web Development, AI & Mobile Apps in Erode',
    description: 'Comprehensive technology services including web development, mobile apps, AI automation, cloud architecture, and custom software solutions for businesses in Erode, Tamil Nadu.',
    keywords: 'web development Erode, mobile app development Tamil Nadu, AI automation, custom software, cloud architecture, ERP development',
    ogTitle: 'MUCO Labs Services | Complete Technology Solutions',
    ogDescription: 'From web development to AI automation, we provide end-to-end technology services.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#services`
  },
  systems: {
    title: 'AI Systems & Automation | MUCO Labs Intelligent Solutions',
    description: 'Autonomous AI agents, workflow automation, custom LLMs, and intelligent systems engineering for businesses looking to leverage artificial intelligence in Erode and Tamil Nadu.',
    keywords: 'AI systems Erode, automation Tamil Nadu, custom LLM, AI chatbots, workflow automation, intelligent systems',
    ogTitle: 'AI Systems & Automation | Intelligent Solutions',
    ogDescription: 'Build autonomous AI agents and workflow automation with our intelligent systems.',
    ogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#systems`
  },
  process: {
    title: 'Our Process | MUCO Labs Development Methodology',
    description: 'Our proven development process from discovery to deployment. Learn how MUCO Labs delivers high-quality software solutions with transparency and precision.',
    keywords: 'software development process, development methodology, project management, agile development',
    ogTitle: 'Our Development Process | Proven Methodology',
    ogDescription: 'From discovery to deployment, our process ensures quality and transparency.',
    ogImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#process`
  },
  courses: {
    title: 'Way2Me Mastery Academy | Learn Software Development & AI',
    description: 'Master software development, AI, and modern technologies with comprehensive courses from MUCO Labs. Practical training for aspiring developers in Erode and Tamil Nadu.',
    keywords: 'software development courses, AI training, programming courses Erode, web development training, React Native course',
    ogTitle: 'Way2Me Mastery Academy | Learn Software Development',
    ogDescription: 'Practical training in software development, AI, and modern technologies.',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#courses`
  },
  pricing: {
    title: 'Pricing | MUCO Labs Transparent Software Development Pricing',
    description: 'Transparent pricing for web development, mobile apps, AI solutions, and custom software. No hidden costs, clear deliverables, and flexible packages for businesses in Erode.',
    keywords: 'software development pricing, web development cost, mobile app pricing, AI solutions cost, transparent pricing',
    ogTitle: 'Transparent Pricing | Clear Costs, Quality Results',
    ogDescription: 'No hidden costs. Transparent pricing for all our technology services.',
    ogImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#pricing`
  },
  portfolio: {
    title: 'Portfolio | MUCO Labs Software Development Projects',
    description: 'Explore our portfolio of successful software development projects including web applications, mobile apps, AI systems, and enterprise solutions delivered for clients in Erode and Tamil Nadu.',
    keywords: 'software development portfolio, web development projects, mobile app portfolio, AI projects, client work',
    ogTitle: 'Our Portfolio | Successful Projects & Case Studies',
    ogDescription: 'Explore our successful software development projects and client success stories.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#portfolio`
  },
  apps: {
    title: 'App Studio | iOS & Android App Development',
    description: 'Professional iOS and Android app development services. From concept to App Store and Play Store publishing, we build high-performance mobile applications.',
    keywords: 'iOS app development, Android app development, React Native, Flutter, mobile app publishing, App Store optimization',
    ogTitle: 'App Studio | Professional Mobile App Development',
    ogDescription: 'From concept to App Store publishing, we build high-performance mobile apps.',
    ogImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#apps`
  },
  maintenance: {
    title: 'Maintenance & Support | 24/7 Software Support Services',
    description: 'Comprehensive software maintenance and support services including 24/7 monitoring, security updates, performance optimization, and dedicated technical support.',
    keywords: 'software maintenance, technical support, 24/7 monitoring, security updates, performance optimization',
    ogTitle: 'Maintenance & Support | 24/7 Technical Excellence',
    ogDescription: 'Comprehensive maintenance and support services for your software systems.',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#maintenance`
  },
  gallery: {
    title: 'Gallery | MUCO Labs Visual Portfolio & Technology Showcase',
    description: 'Visual showcase of our technology solutions, development process, and team at work. See the MUCO Labs difference in action through our gallery.',
    keywords: 'technology gallery, software development visuals, team showcase, development process',
    ogTitle: 'Gallery | Visual Portfolio & Technology Showcase',
    ogDescription: 'See the MUCO Labs difference through our visual portfolio.',
    ogImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#gallery`
  },
  contact: {
    title: 'Contact MUCO Labs | Start Your Software Project',
    description: 'Ready to start your software project? Contact MUCO Labs for custom software development, web applications, mobile apps, and AI solutions in Erode, Tamil Nadu.',
    keywords: 'contact MUCO Labs, software development inquiry, web development quote, mobile app development contact',
    ogTitle: 'Contact MUCO Labs | Start Your Project Today',
    ogDescription: 'Ready to transform your business? Let\'s discuss your software project.',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#contact`
  },
  faq: {
    title: 'FAQ | Common Questions About MUCO Labs Services',
    description: 'Frequently asked questions about our software development services, pricing, process, and support. Get answers to common questions about working with MUCO Labs.',
    keywords: 'FAQ, software development questions, pricing questions, support questions, common queries',
    ogTitle: 'FAQ | Answers to Your Questions',
    ogDescription: 'Get answers to common questions about our services and process.',
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#faq`
  },
  sheets: {
    title: 'Google Sheets Integration | Data Management Solutions',
    description: 'Professional Google Sheets integration and data management solutions. Connect your business data, automate workflows, and streamline operations with Sheets integration.',
    keywords: 'Google Sheets integration, data management, workflow automation, business automation, spreadsheet solutions',
    ogTitle: 'Google Sheets Integration | Data Management',
    ogDescription: 'Connect and automate your business data with professional Sheets integration.',
    ogImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#sheets`
  },
  blog: {
    title: 'Blog | Technology Insights & Tutorials from MUCO Labs',
    description: 'Stay updated with the latest technology insights, tutorials, and industry news from MUCO Labs. Learn about software development, AI, and digital transformation.',
    keywords: 'technology blog, software development insights, AI tutorials, tech news, digital transformation',
    ogTitle: 'Blog | Technology Insights & Tutorials',
    ogDescription: 'Latest insights on software development, AI, and digital transformation.',
    ogImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#blog`
  },
  locations: {
    title: 'Locations | MUCO Labs Technology Hubs in Tamil Nadu',
    description: 'MUCO Labs serves clients across Tamil Nadu with technology hubs in Erode, Coimbatore, Salem, and surrounding regions. Local expertise with global standards.',
    keywords: 'MUCO Labs locations, technology hubs Erode, software development Coimbatore, web development Salem, Tamil Nadu IT services',
    ogTitle: 'Locations | Technology Hubs Across Tamil Nadu',
    ogDescription: 'Local expertise with global standards. Serving clients across Tamil Nadu.',
    ogImage: 'https://images.unsplash.com/photo-1522053464064-60c7bfddfd28?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#locations`
  },
  terms: {
    title: 'Terms of Service | MUCO Labs Service Agreement',
    description: 'Terms of service and master service agreement for MUCO Labs software development services. Understand our service terms, payment terms, and project policies.',
    keywords: 'terms of service, service agreement, master service agreement, software development terms',
    ogTitle: 'Terms of Service | Service Agreement',
    ogDescription: 'Clear terms for transparent business relationships.',
    ogImage: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#terms`
  },
  privacy: {
    title: 'Privacy Policy | MUCO Labs Data Protection Policy',
    description: 'Privacy policy and data protection practices at MUCO Labs. Learn how we protect your data, comply with DPDP Act 2023, and ensure privacy in our software solutions.',
    keywords: 'privacy policy, data protection, DPDP Act 2023, data security, privacy compliance',
    ogTitle: 'Privacy Policy | Data Protection',
    ogDescription: 'Your data security and privacy are our top priorities.',
    ogImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=630&q=85',
    canonical: `${BASE_URL}/#privacy`
  },
  notfound: {
    title: 'Page Not Found | MUCO Labs',
    description: 'The page you are looking for could not be found. Please navigate to our homepage or contact us if you need assistance.',
    noIndex: true,
    canonical: `${BASE_URL}/`
  }
};

/**
 * Get meta tags for a specific page
 */
export function getPageMetaTags(pageId: PageId): PageMetaTags {
  return PAGE_META_DATA[pageId] || PAGE_META_DATA.home;
}

/**
 * Update document meta tags dynamically
 */
export function updatePageMetaTags(pageId: PageId): void {
  const meta = getPageMetaTags(pageId);
  
  // Update basic meta tags
  document.title = meta.title;
  updateMetaTag('description', meta.description);
  if (meta.keywords) {
    updateMetaTag('keywords', meta.keywords);
  }

  // Update Open Graph tags
  updateMetaTag('og:title', meta.ogTitle || meta.title, 'property');
  updateMetaTag('og:description', meta.ogDescription || meta.description, 'property');
  if (meta.ogImage) {
    updateMetaTag('og:image', meta.ogImage, 'property');
    updateMetaTag('og:image:secure_url', meta.ogImage, 'property');
  }
  updateMetaTag('og:url', meta.canonical || window.location.href, 'property');
  updateMetaTag('og:type', 'website', 'property');

  // Update Twitter card tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', meta.twitterTitle || meta.title, 'name');
  updateMetaTag('twitter:description', meta.twitterDescription || meta.description, 'name');
  if (meta.twitterImage) {
    updateMetaTag('twitter:image', meta.twitterImage, 'name');
  }

  // Update canonical URL
  if (meta.canonical) {
    updateLinkTag('canonical', meta.canonical);
  }

  // Handle noindex
  if (meta.noIndex) {
    updateMetaTag('robots', 'noindex, nofollow', 'name');
  } else {
    updateMetaTag('robots', 'index, follow', 'name');
  }

  // Update structured data if provided
  if (meta.structuredData) {
    updateStructuredData(meta.structuredData);
  }
}

/**
 * Helper function to update meta tags
 */
function updateMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
): void {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

/**
 * Helper function to update link tags
 */
function updateLinkTag(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.href = href;
}

/**
 * Helper function to update structured data
 */
function updateStructuredData(data: Record<string, unknown>): void {
  let element = document.querySelector('#structured-data') as HTMLScriptElement;
  
  if (!element) {
    element = document.createElement('script');
    element.id = 'structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  
  element.textContent = JSON.stringify(data);
}

/**
 * React hook for managing page meta tags
 */
export function usePageMetaTags(pageId: PageId) {
  useEffect(() => {
    updatePageMetaTags(pageId);
  }, [pageId]);
}
