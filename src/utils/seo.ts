import { PageId, LocationData, ServiceLocationCombo, ProjectItem } from '../types';
import { TeamMember, TEAM_MEMBERS } from '../data/galleryData';
import { BlogPost, BLOG_POSTS } from '../data/blogData';
import { CORE_SERVICES, DetailedService } from '../data/servicesData';
import { COURSES_DATA, CourseItem } from '../data/coursesData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { injectJsonLdSchema, getPageSchemaMarkup, getMemberSchemaMarkup, getLocationSchema, getServiceLocationSchema } from './schemaMarkup';
import { 
  generateServiceLocationOgImage, 
  generateLocationOgImage, 
  generateServiceOgImage, 
  generateCourseOgImage, 
  generateProjectOgImage, 
  generateBlogPostOgImage 
} from './ogImageGenerator';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary_large_image' | 'summary';
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
    title: 'Best Website Development in Erode | Top Web Design, SEO & Software Company | MUCO Labs',
    description: 'Looking for the best website development company in Erode? MUCO Labs delivers top-rated web design, local SEO optimization, mobile apps, custom ERP software, AI solutions, AutoCAD drafting & digital marketing in Erode, Tamil Nadu.',
    keywords: 'best website development in erode, website development company in erode, web design in erode, web development erode, SEO company in erode, SEO optimization erode, local SEO services in erode, mobile app development company in erode, android app developers in erode, software development company in erode, custom software erode, enterprise ERP developers erode, AI solutions erode, AI chatbot development erode, AutoCAD design in erode, 2D 3D CAD drafting erode, digital marketing company in erode, Google Ads agency erode, logo design branding erode, IT consulting erode, MUCO Labs Erode, top web designers in erode',
    ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Enterprise Software & Web Development HQ Erode',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  about: {
    title: 'About MUCO Labs | Top Technology Firm in Erode, Tamil Nadu | Leadership',
    description: 'Discover MUCO Labs, founded by Srinivash Mahalingam in Erode, Tamil Nadu, India. Explore our engineering philosophy, corporate leadership, core values, and rapid technological innovation.',
    keywords: 'MUCO Labs team, Srinivash Mahalingam, Erode software company, MUCO Labs India, software development company India, IT consulting Tamil Nadu, web development company Erode, leadership vision',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Executive Team and Collaborative Tech Workspace',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  locations: {
    title: 'Locations Served | Best Website Development, SEO & Software in Erode & Tamil Nadu | MUCO Labs',
    description: 'Explore custom software development, mobile apps, enterprise ERP, web design, and local SEO services across Erode, Perundurai, Bhavani, Gobichettipalayam, Sathyamangalam, and Chennimalai.',
    keywords: 'best website development in erode, software company Erode, web design Erode, web development Perundurai, software company Bhavani, web development Gobichettipalayam, SEO company Erode, AI development Erode, AutoCAD design Erode',
    ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Regional Technology and Local SEO Hubs across Tamil Nadu',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  services: {
    title: 'Services in Erode | Website Development, Mobile Apps, SEO, AI & Software | MUCO Labs',
    description: 'Explore MUCO Labs full suite of services in Erode: Next.js website development, Android/iOS mobile apps, local SEO & Google ranking, AI automation, custom ERP software, AutoCAD drafting, and performance marketing in Erode.',
    keywords: 'Website Development Erode, Mobile App Development Erode, SEO Services Erode, AI Development Erode, Cloud Service Management, AutoCAD Design Erode, CAD Drafting Erode, CRM Development Erode, ERP Solutions Erode, Digital Marketing Erode, IT Consulting Erode',
    ogImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Advanced Code Architecture and AI Software Engineering Services',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  systems: {
    title: 'Autonomous AI Systems & Neural Workflows | MUCO AI Studio',
    description: 'Explore MUCO AI Studio proprietary intelligence stack: multi-agent swarms, RAG vector knowledge graphs, zero-data-retention security, and sub-100ms autonomous business workflows.',
    keywords: 'AI Systems, Autonomous AI Agents, RAG Vector Search, Multi-Agent Swarms, Enterprise LLMs, WhatsApp AI Bot, AI Automation Workflows, Private VPC AI',
    ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Autonomous AI Systems Architecture',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  process: {
    title: 'Our 8-Step Engineering & Delivery Process | MUCO Labs',
    description: 'Discover how MUCO Labs transforms complex business problems into scalable software systems through our structured 8-step delivery methodology with predictable milestones.',
    keywords: 'MUCO Labs process, software development lifecycle, engineering methodology, discovery sprint, agile milestones, software delivery framework, SLA support',
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs 8-Step Engineering & Delivery Process',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  courses: {
    title: 'Mastery Courses & Engineering Bootcamps | MUCO Labs & Way2Me Academy',
    description: 'Master in-demand industry skills with practical training in Full-Stack Web Development, Mobile Apps (Flutter/React Native), Generative AI & LLMs, Cloud Infrastructure, and AutoCAD Drafting led by Way2Me CEO Yogaharikaran & MUCO Labs.',
    keywords: 'MUCO Labs courses, Way2Me Academy, Yogaharikaran, Web Development course, React Nextjs course, AI Bootcamp, Flutter training, AutoCAD course, Tamil Nadu tech institute, software engineering mentorship',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Interactive Software Engineering Bootcamp and Tech Mentorship',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  portfolio: {
    title: 'Portfolio & Case Studies | Featured Software Engineering & AI Projects | MUCO Labs',
    description: 'Explore live client projects, scalable SaaS architectures, AI platforms, and enterprise solutions developed by MUCO Labs for global and regional enterprises.',
    keywords: 'MUCO Labs portfolio, software case studies, web development showcase, mobile app portfolio, client success stories, SaaS case studies, enterprise software showcase',
    ogImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Client Success Showcase and Interactive Project Grid',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  apps: {
    title: 'App Store & Google Play Store Publishing Services | MUCO Labs',
    description: 'End-to-end mobile application publishing, compliance review, App Store Optimization (ASO), and release management for iOS and Android platforms by MUCO Labs.',
    keywords: 'App Store submission, Google Play publishing, Android App Development, iOS release management, mobile app deployment, MUCO Labs apps, ASO optimization',
    ogImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Mobile App Store Deployment and Multi-Platform Device Testing',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  pricing: {
    title: 'Software Development Pricing & Transparent Packages | MUCO Labs',
    description: 'Explore crystal-clear, transparent pricing packages for Web Apps, Mobile Development, AI Integration, and Enterprise Custom Software with detailed timelines and deliverables.',
    keywords: 'software development cost, website design pricing, app development estimate, MUCO Labs packages, IT consulting pricing India, web app quote',
    ogImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Transparent Pricing Packages and Cost Estimation for Software Engineering',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  maintenance: {
    title: 'Cloud Service Management & Annual Maintenance Contracts (AMC) | MUCO Labs',
    description: 'Ensure 99.9% application uptime, continuous security patching, database optimization, automated backups, and 24/7 DevOps technical monitoring with MUCO AMC plans.',
    keywords: 'Cloud Service Management, Cloud Computing, software AMC, server maintenance, Technical Support, IT maintenance contract, DevOps management, uptime monitoring',
    ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Cloud Infrastructure Health Monitoring and 24/7 Server Maintenance',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  gallery: {
    title: 'Executive Roster & Workplace Gallery | MUCO Labs India',
    description: 'Meet the executive leadership team, software architects, AI researchers, and explore the creative engineering labs of MUCO Labs in Erode, Tamil Nadu, India.',
    keywords: 'MUCO Labs executive team, team gallery, software engineering labs, MUCO Labs photo gallery, tech leadership India, workplace culture',
    ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Leadership Directory and Engineering Workspace',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | MUCO Labs Software Engineering',
    description: 'Get answers to essential questions regarding code ownership, development methodologies, payment milestones, security compliance, and ongoing support.',
    keywords: 'MUCO Labs FAQ, software development questions, web app development process, project timeline FAQ, IT support FAQ, code ownership FAQ',
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Enterprise Support and Comprehensive FAQ Center',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  contact: {
    title: 'Contact MUCO Labs | Get a Free Technical Consultation & Quote',
    description: 'Connect with MUCO Labs engineering leadership to discuss your software, AI automation, or cloud initiative. Email: contact@mucolabs.com | Direct: +91 6381809844.',
    keywords: 'contact MUCO Labs, hire software developers, software development company contact, IT consulting Erode, request proposal MUCO, start a project',
    ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Direct Communication and Project Consultation with MUCO Labs Specialists',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  sheets: {
    title: 'Google Sheets CRM Sync & Real-Time Lead Hub | MUCO Labs',
    description: 'Securely sync and export client inquiries, service requests, and project estimations directly into Google Spreadsheets with OAuth integration.',
    keywords: 'Google Sheets integration, Google Drive API, export leads to sheets, MUCO Labs spreadsheet manager, CRM automation',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'Google Sheets Automation and Secure Data Syncing Interface',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  blog: {
    title: 'MUCO Labs Insights & Blog | AI Trends, Web Engineering & Cloud Architecture',
    description: 'Read the latest technical articles, AI automation benchmarks, full-stack tutorials, and digital strategy insights published by MUCO Labs engineers.',
    keywords: 'MUCO Labs blog, software development blog, AI trends, cloud computing tutorials, web design articles, IT insights, tech guides',
    ogImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Technology Publication and Software Engineering Articles',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  terms: {
    title: 'Terms and Conditions | MUCO Labs Commercial Master Agreement',
    description: 'Official terms and commercial conditions governing custom software engineering, standard 50% advance milestone agreements, and code ownership with MUCO Labs.',
    keywords: 'MUCO Labs terms of service, software development agreement, payment milestones, code IP ownership, legal terms',
    ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Terms of Service and Commercial Agreement',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  privacy: {
    title: 'Privacy Policy & DPDP Act 2023 Compliance | MUCO Labs',
    description: 'Our data protection commitments, client privacy rights, DPDP Act 2023 compliance, and zero third-party telemetry selling standards at MUCO Labs.',
    keywords: 'MUCO Labs privacy policy, DPDP Act 2023, data protection, privacy compliance India, client confidentiality',
    ogImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs Privacy Policy and Data Protection',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  notfound: {
    title: '404 - Page Not Found | MUCO Labs',
    description: 'The requested page could not be located on MUCO Labs. Navigate back to explore our custom software, AI solutions, and engineering services.',
    keywords: 'MUCO Labs 404, page not found, software engineering',
    ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=630&q=85',
    ogImageAlt: 'MUCO Labs 404 Page Navigation',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
};

/**
 * Dynamically generate and apply full Open Graph and Twitter Card social sharing meta tags for any page
 */
export function updatePageSEO(page: PageId) {
  const metadata = PAGE_METADATA[page] || PAGE_METADATA.home;
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/#${page}` : `https://mucolabs.com/#${page}`;
  const ogImage = metadata.ogImage;
  const ogImageAlt = metadata.ogImageAlt || `${metadata.title} - MUCO Labs`;
  const ogType = metadata.ogType || 'website';
  const twitterCard = metadata.twitterCard || 'summary_large_image';

  // Update browser document title
  document.title = metadata.title;

  // Standard SEO Meta Tags
  setMetaTag('name', 'description', metadata.description);
  setMetaTag('name', 'keywords', metadata.keywords);
  setMetaTag('name', 'author', 'MUCO Labs - Srinivash Mahalingam');

  // Open Graph / Facebook / LinkedIn / WhatsApp Tags
  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', metadata.title);
  setMetaTag('property', 'og:description', metadata.description);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:url', currentUrl);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:image:secure_url', ogImage);
  setMetaTag('property', 'og:image:type', 'image/jpeg');
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', ogImageAlt);
  setMetaTag('property', 'og:locale', 'en_US');

  // Twitter Cards Meta Tags
  setMetaTag('name', 'twitter:card', twitterCard);
  setMetaTag('name', 'twitter:site', '@muco_labs');
  setMetaTag('name', 'twitter:creator', '@srinivash_m');
  setMetaTag('name', 'twitter:title', metadata.title);
  setMetaTag('name', 'twitter:description', metadata.description);
  setMetaTag('name', 'twitter:image', ogImage);
  setMetaTag('name', 'twitter:image:alt', ogImageAlt);

  // Set Canonical Link
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
 * Dynamically update SEO and Schema for a specific location hub
 */
export function updateLocationSEO(location: LocationData) {
  const locTitle = `${location.headline} | MUCO Labs ${location.name}`;
  const locDesc = location.overview;
  const locUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#locations?city=${location.id}` 
    : `https://mucolabs.com/#locations?city=${location.id}`;
  const locKeywords = `software company in ${location.name}, website development ${location.name}, web design ${location.name}, mobile app development ${location.name}, SEO company ${location.name}, ERP software ${location.name}, AI development ${location.name}, ${location.district} software agency`;

  document.title = locTitle;

  setMetaTag('name', 'description', locDesc);
  setMetaTag('name', 'keywords', locKeywords);
  setMetaTag('name', 'author', 'MUCO Labs');

  // Geo Specific Meta Tags
  setMetaTag('name', 'geo.region', 'IN-TN');
  setMetaTag('name', 'geo.placename', `${location.name}, Tamil Nadu`);
  setMetaTag('name', 'geo.position', `${location.coordinates.lat};${location.coordinates.lng}`);
  setMetaTag('name', 'ICBM', `${location.coordinates.lat}, ${location.coordinates.lng}`);

  // Initial Open Graph fallback
  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', locTitle);
  setMetaTag('property', 'og:description', locDesc);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', locUrl);
  setMetaTag('property', 'og:image', location.heroImage);
  setMetaTag('property', 'og:image:secure_url', location.heroImage);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', `${location.name} Technology Hub - MUCO Labs`);

  // Twitter
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', locTitle);
  setMetaTag('name', 'twitter:description', locDesc);
  setMetaTag('name', 'twitter:image', location.heroImage);

  setCanonicalUrl(locUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card
  generateLocationOgImage(location)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });

  try {
    const schemas = getLocationSchema(location);
    injectJsonLdSchema(schemas);
  } catch (err) {
    console.warn('Unable to inject location schema:', err);
  }
}

/**
 * Dynamically update SEO and Schema for a high-intent Service x Location combination
 */
export function updateServiceLocationSEO(combo: ServiceLocationCombo) {
  const pageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#locations?combo=${combo.id}`
    : `https://mucolabs.com/#locations?combo=${combo.id}`;
  const keywords = `${combo.serviceName} in ${combo.locationName}, ${combo.serviceName} company ${combo.locationName}, best ${combo.serviceName} in ${combo.locationName}, ${combo.targetIndustries.join(', ')}`;

  document.title = combo.seoTitle;

  setMetaTag('name', 'description', combo.metaDescription);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('name', 'author', 'MUCO Labs');

  // Geo Specific Meta Tags
  setMetaTag('name', 'geo.region', 'IN-TN');
  setMetaTag('name', 'geo.placename', `${combo.locationName}, Tamil Nadu`);

  // Open Graph
  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', combo.seoTitle);
  setMetaTag('property', 'og:description', combo.metaDescription);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', pageUrl);
  setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=630&q=85');
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');

  // Twitter
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', combo.seoTitle);
  setMetaTag('name', 'twitter:description', combo.metaDescription);

  setCanonicalUrl(pageUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card for this Service x Location combo
  generateServiceLocationOgImage(combo)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });

  try {
    const schemas = getServiceLocationSchema(combo);
    injectJsonLdSchema(schemas);
  } catch (err) {
    console.warn('Unable to inject service-location schema:', err);
  }
}

/**
 * Dynamically inject unique Open Graph and Twitter social sharing metadata for team member profiles
 */
export function updateMemberSEO(member: TeamMember) {
  const memberTitle = `${member.name} - ${member.titleRole} | MUCO Labs Executive Roster`;
  const memberDesc = `${member.name} serves as ${member.titleRole} (${member.affiliation}) at MUCO Labs. Discover leadership insights, responsibilities, and professional background.`;
  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#gallery?member=${encodeURIComponent(member.id)}` 
    : `https://mucolabs.com/#gallery?member=${member.id}`;
  const memberImage = member.image;
  const imageAlt = `${member.name} - ${member.titleRole} at MUCO Labs`;

  // Update browser document title
  document.title = memberTitle;

  // Standard Meta Tags
  setMetaTag('name', 'description', memberDesc);
  setMetaTag('name', 'keywords', `${member.name}, ${member.titleRole}, MUCO Labs executive, ${member.keyResponsibilities.join(', ')}, software engineering India`);
  setMetaTag('name', 'author', member.name);

  // Open Graph Meta Tags for Social Previews
  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', memberTitle);
  setMetaTag('property', 'og:description', memberDesc);
  setMetaTag('property', 'og:type', 'profile');
  setMetaTag('property', 'og:url', profileUrl);
  setMetaTag('property', 'og:image', memberImage);
  setMetaTag('property', 'og:image:secure_url', memberImage);
  setMetaTag('property', 'og:image:alt', imageAlt);
  setMetaTag('property', 'og:locale', 'en_US');

  // Open Graph Profile-Specific Extensions
  const cleanName = member.name.replace(/^Mr\.\s*|^Ms\.\s*|^Dr\.\s*/i, '').trim();
  const nameParts = cleanName.split(' ');
  const firstName = nameParts[0] || member.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  setMetaTag('property', 'profile:first_name', firstName);
  if (lastName) {
    setMetaTag('property', 'profile:last_name', lastName);
  }
  setMetaTag('property', 'profile:username', member.id);

  // Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@muco_labs');
  setMetaTag('name', 'twitter:creator', '@srinivash_m');
  setMetaTag('name', 'twitter:title', memberTitle);
  setMetaTag('name', 'twitter:description', memberDesc);
  setMetaTag('name', 'twitter:image', memberImage);
  setMetaTag('name', 'twitter:image:alt', imageAlt);

  setCanonicalUrl(profileUrl);

  // Inject Team Member JSON-LD Structured Schema Markup
  try {
    const memberSchemas = getMemberSchemaMarkup(member);
    injectJsonLdSchema(memberSchemas);
  } catch (err) {
    console.warn('Unable to inject team member JSON-LD schema:', err);
  }
}

/**
 * Dynamically inject unique Open Graph and Twitter social sharing metadata for Blog Posts
 */
export function updateBlogPostSEO(post: BlogPost) {
  const postTitle = `${post.title} | MUCO Labs Blog`;
  const postDesc = post.excerpt;
  const postUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#blog?post=${encodeURIComponent(post.slug)}`
    : `https://mucolabs.com/#blog?post=${post.slug}`;
  const postImage = post.image;
  const imageAlt = `${post.title} - Article by ${post.author.name}`;

  // Update browser document title
  document.title = postTitle;

  // Standard Meta Tags
  setMetaTag('name', 'description', postDesc);
  setMetaTag('name', 'keywords', `${post.keywords.join(', ')}, ${post.category}, MUCO Labs Blog, Software Engineering`);
  setMetaTag('name', 'author', post.author.name);

  // Open Graph / Facebook / LinkedIn
  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', postTitle);
  setMetaTag('property', 'og:description', postDesc);
  setMetaTag('property', 'og:type', 'article');
  setMetaTag('property', 'og:url', postUrl);
  setMetaTag('property', 'og:image', postImage);
  setMetaTag('property', 'og:image:secure_url', postImage);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', imageAlt);
  setMetaTag('property', 'og:locale', 'en_US');

  // Article Specific Open Graph tags
  setMetaTag('property', 'article:author', post.author.name);
  setMetaTag('property', 'article:section', post.category);
  setMetaTag('property', 'article:published_time', new Date().toISOString());

  // Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:site', '@muco_labs');
  setMetaTag('name', 'twitter:creator', '@srinivash_m');
  setMetaTag('name', 'twitter:title', postTitle);
  setMetaTag('name', 'twitter:description', postDesc);
  setMetaTag('name', 'twitter:image', postImage);
  setMetaTag('name', 'twitter:image:alt', imageAlt);

  setCanonicalUrl(postUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card
  generateBlogPostOgImage(post)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });
}

/**
 * Dynamically inject SEO metadata for an individual IT service
 */
export function updateServiceSEO(service: DetailedService) {
  const serviceTitle = `${service.title} | ${service.tagline} | MUCO Labs`;
  const serviceDesc = service.description.length > 155 
    ? `${service.description.slice(0, 155)}...` 
    : service.description;
  const serviceUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#services?id=${encodeURIComponent(service.id)}`
    : `https://mucolabs.com/#services?id=${service.id}`;
  const keywords = `${service.title}, ${service.technologies.join(', ')}, software development Erode, MUCO Labs ${service.title}`;

  document.title = serviceTitle;

  setMetaTag('name', 'description', serviceDesc);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('name', 'author', 'MUCO Labs');

  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', serviceTitle);
  setMetaTag('property', 'og:description', serviceDesc);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', serviceUrl);
  setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&h=630&q=85');
  setMetaTag('property', 'og:image:alt', `${service.title} - MUCO Labs Engineering`);

  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', serviceTitle);
  setMetaTag('name', 'twitter:description', serviceDesc);
  setMetaTag('name', 'twitter:image', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&h=630&q=85');

  setCanonicalUrl(serviceUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card
  generateServiceOgImage(service)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });
}

/**
 * Dynamically inject SEO metadata for a tech course/bootcamp
 */
export function updateCourseSEO(course: CourseItem) {
  const courseTitle = `${course.title} (${course.duration}) | Way2Me & MUCO Labs Bootcamp`;
  const courseDesc = course.description;
  const courseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#courses?id=${encodeURIComponent(course.id)}`
    : `https://mucolabs.com/#courses?id=${course.id}`;
  const keywords = `${course.title}, ${course.technologies.join(', ')}, ${course.category}, Way2Me Academy, Yogaharikaran, tech training Tamil Nadu`;

  document.title = courseTitle;

  setMetaTag('name', 'description', courseDesc);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('name', 'author', 'Way2Me & MUCO Labs');

  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', courseTitle);
  setMetaTag('property', 'og:description', courseDesc);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', courseUrl);
  setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=630&q=85');

  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', courseTitle);
  setMetaTag('name', 'twitter:description', courseDesc);

  setCanonicalUrl(courseUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card
  generateCourseOgImage(course)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });
}

/**
 * Dynamically inject SEO metadata for a client portfolio project
 */
export function updateProjectSEO(project: ProjectItem) {
  const projTitle = `${project.title} (${project.category}) | MUCO Labs Portfolio`;
  const projDesc = project.description;
  const projUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#portfolio?id=${encodeURIComponent(project.id)}`
    : `https://mucolabs.com/#portfolio?id=${project.id}`;

  document.title = projTitle;

  setMetaTag('name', 'description', projDesc);
  setMetaTag('name', 'keywords', `${project.title}, ${project.category}, ${project.techStack.join(', ')}, MUCO Labs client case study`);
  setMetaTag('name', 'author', 'MUCO Labs');

  setMetaTag('property', 'og:site_name', 'MUCO Labs');
  setMetaTag('property', 'og:title', projTitle);
  setMetaTag('property', 'og:description', projDesc);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', projUrl);
  setMetaTag('property', 'og:image', project.image);

  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', projTitle);
  setMetaTag('name', 'twitter:description', projDesc);

  setCanonicalUrl(projUrl);

  // Generate and inject dynamic customized Canvas Open Graph Card
  generateProjectOgImage(project)
    .then((customOgUrl) => {
      setMetaTag('property', 'og:image', customOgUrl);
      setMetaTag('property', 'og:image:secure_url', customOgUrl);
      setMetaTag('name', 'twitter:image', customOgUrl);
    })
    .catch((err) => {
      console.warn('Canvas OG card generation skipped:', err);
    });
}

/**
 * Global URL Hash & Route SEO Synchronizer:
 * Inspects hash query parameters (?combo=..., ?city=..., ?id=..., ?post=..., ?member=...)
 * and automatically sets exact unique metadata, schema markup, and canonical tags.
 */
export function syncUrlSEO(targetHash?: string, fallbackPage?: PageId): void {
  if (typeof window === 'undefined') return;

  const currentHash = targetHash !== undefined ? targetHash : window.location.hash;
  const [routePart, queryPart] = currentHash.replace(/^#\/?/, '').split('?');
  const pageCandidate = (routePart || fallbackPage || 'home').toLowerCase() as PageId;
  const urlParams = new URLSearchParams(queryPart || '');

  // 1. High-Intent Service x Location Combination
  const comboParam = urlParams.get('combo');
  if (comboParam) {
    const matchingCombo = SERVICE_LOCATIONS_DATA.find(
      (c) => c.id.toLowerCase() === comboParam.toLowerCase()
    );
    if (matchingCombo) {
      updateServiceLocationSEO(matchingCombo);
      return;
    }
  }

  // 2. Specific Regional Location Hub
  const cityParam = urlParams.get('city') || urlParams.get('loc');
  if (cityParam && LOCATIONS_DATA[cityParam.toLowerCase() as any]) {
    updateLocationSEO(LOCATIONS_DATA[cityParam.toLowerCase() as any]);
    return;
  }

  // 3. Blog Article
  const postParam = urlParams.get('post');
  if (postParam) {
    const matchingPost = BLOG_POSTS.find(
      (p) => p.slug.toLowerCase() === postParam.toLowerCase()
    );
    if (matchingPost) {
      updateBlogPostSEO(matchingPost);
      return;
    }
  }

  // 4. Core Service Detail
  const serviceIdParam = urlParams.get('id');
  if (pageCandidate === 'services' && serviceIdParam) {
    const matchingService = CORE_SERVICES.find(
      (s) => s.id.toLowerCase() === serviceIdParam.toLowerCase()
    );
    if (matchingService) {
      updateServiceSEO(matchingService);
      return;
    }
  }

  // 5. Course Detail
  if (pageCandidate === 'courses' && serviceIdParam) {
    const matchingCourse = COURSES_DATA.find(
      (c) => c.id.toLowerCase() === serviceIdParam.toLowerCase()
    );
    if (matchingCourse) {
      updateCourseSEO(matchingCourse);
      return;
    }
  }

  // 6. Portfolio Project Detail
  if (pageCandidate === 'portfolio' && serviceIdParam) {
    const matchingProject = INITIAL_PROJECTS.find(
      (p) => p.id.toLowerCase() === serviceIdParam.toLowerCase()
    );
    if (matchingProject) {
      updateProjectSEO(matchingProject);
      return;
    }
  }

  // 7. Team Member Profile
  const memberParam = urlParams.get('member');
  if (pageCandidate === 'gallery' && memberParam) {
    const matchingMember = TEAM_MEMBERS.find(
      (m) => m.id.toLowerCase() === memberParam.toLowerCase()
    );
    if (matchingMember) {
      updateMemberSEO(matchingMember);
      return;
    }
  }

  // 8. Fallback to standard top-level page SEO
  const validPages: PageId[] = [
    'home', 'about', 'services', 'courses', 'pricing', 'portfolio',
    'apps', 'maintenance', 'gallery', 'contact', 'faq', 'sheets', 'blog', 'locations'
  ];
  const targetPage: PageId = validPages.includes(pageCandidate) ? pageCandidate : (fallbackPage || 'home');
  updatePageSEO(targetPage);
}
