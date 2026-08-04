import { PageId } from '../types';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
}

export const PAGE_METADATA: Record<PageId, PageMetadata> = {
  home: {
    title: 'MUCO Labs | Premier Enterprise Software Development & Cloud Solutions',
    description: 'MUCO Labs delivers high-performance custom web applications, mobile apps, ERP systems, AI integrations, and cloud infrastructure for modern enterprises.',
    keywords: 'MUCO Labs, software development, web apps, mobile app development, custom software, Cloud solutions, Erode software company',
  },
  about: {
    title: 'About Us | MUCO Labs Executive Board & Engineering HQ',
    description: 'Discover MUCO Labs\' leadership, company vision, executive board members, and engineering HQ driving software excellence.',
    keywords: 'MUCO Labs team, Srinivashni, Yogahariharan, software leaders, Erode technology HQ, company vision',
  },
  services: {
    title: 'Engineering & Software Development Services | MUCO Labs',
    description: 'Explore MUCO Labs\' full-suite engineering services: full-stack web applications, cross-platform mobile apps, cloud DevOps, and enterprise ERPs.',
    keywords: 'web development, React TypeScript, Node.js, mobile app development, cloud infrastructure, AMC services, enterprise ERP',
  },
  portfolio: {
    title: 'Client Portfolio & Live Success Stories | MUCO Labs',
    description: 'View case studies, live production apps, and client milestones built with precision by the MUCO Labs engineering team.',
    keywords: 'software case studies, web app portfolio, client success stories, live software showcase, MUCO Labs projects',
  },
  apps: {
    title: 'App Store & Google Play Store Publishing | MUCO Labs',
    description: 'Hassle-free iOS App Store and Google Play Store submission, compliance verification, policy audit, and app release management.',
    keywords: 'App Store submission, Google Play publishing, mobile app deployment, iOS compliance, Android release manager',
  },
  pricing: {
    title: 'Transparent Project Pricing & Custom Quotes | MUCO Labs',
    description: 'Compare transparent software development tiers, retainer options, AMC plans, and request custom project estimates.',
    keywords: 'software development cost, app development pricing, web design quotes, IT maintenance plans, MUCO Labs pricing',
  },
  maintenance: {
    title: 'Annual Maintenance Contracts (AMC) & Cloud Ops | MUCO Labs',
    description: '24/7 server health monitoring, security patch management, automated backups, and guaranteed SLA support for production systems.',
    keywords: 'software AMC, server maintenance, cloud monitoring, IT support contract, DevOps management, SLA support',
  },
  gallery: {
    title: 'Executive Leadership Directory & Gallery | MUCO Labs',
    description: 'Explore MUCO Labs\' order-wise executive directory and visual photo archives of our headquarters, engineering labs, and events.',
    keywords: 'MUCO Labs executive team, team directory, tech workshop photos, HQ engineering lab, company culture',
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | MUCO Labs',
    description: 'Answers to essential questions regarding project timelines, source code ownership, security guarantees, and payment structures.',
    keywords: 'MUCO Labs FAQ, software development process, project timeline FAQ, IT consulting questions',
  },
  contact: {
    title: 'Contact MUCO Labs | Request Custom Proposal & Consultations',
    description: 'Connect directly with MUCO Labs engineering leaders. Get custom project proposals, technical consultations, or schedule a callback.',
    keywords: 'contact MUCO Labs, software consulting, request proposal, hire developers, Erode TN software office',
  },
  sheets: {
    title: 'Google Sheets Integrator & Lead Exporter | MUCO Labs',
    description: 'Connect Google Sheets to MUCO Labs to read, write, and export client inquiries and custom software proposals in real time.',
    keywords: 'Google Sheets integration, Google Drive API, export leads to sheets, MUCO Labs spreadsheet manager',
  },
};

export function updatePageSEO(page: PageId) {
  const metadata = PAGE_METADATA[page] || PAGE_METADATA.home;

  // Update document title
  document.title = metadata.title;

  // Update or create meta description tag
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', metadata.description);

  // Update or create meta keywords tag
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', metadata.keywords);
}
