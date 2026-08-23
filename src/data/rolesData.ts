import React from 'react';
import { PageId } from '../types';

export type UserRoleId = 
  | 'business-owner' 
  | 'ecommerce-merchant' 
  | 'industrial-engineer' 
  | 'tech-startup' 
  | 'growth-marketer' 
  | 'student-aspirant';

export interface UserRoleData {
  id: UserRoleId;
  label: string;
  badge: string;
  iconName: string; // Dynamic icon name
  heroTitle: string;
  heroTagline: string;
  painPoint: string;
  solutionHighlight: string;
  keyMetric: {
    value: string;
    label: string;
  };
  recommendedServices: {
    id: string;
    title: string;
    targetPage: PageId;
    queryParam?: string;
    description: string;
    tag: string;
  }[];
  featuredTech: string[];
  ctaText: string;
  whatsappMessage: string;
}

export const USER_ROLES: UserRoleData[] = [
  {
    id: 'business-owner',
    label: 'Business Owner & Founder',
    badge: 'Enterprise & SMEs',
    iconName: 'Building2',
    heroTitle: 'Scale Operations, Cut Overhead & Automate Workflows',
    heroTagline: 'End-to-end custom ERP systems, cloud architecture, and business process automation built for reliable long-term ROI.',
    painPoint: 'Struggling with fragmented manual spreadsheets, disconnected software tools, and high operational costs.',
    solutionHighlight: 'MUCO Labs engineers tailor-made ERPs and automated workflows that unify accounting, inventory, CRM, and team dispatch into a single high-speed dashboard.',
    keyMetric: {
      value: '3.8x',
      label: 'Average Operational Efficiency Surge'
    },
    recommendedServices: [
      {
        id: 'erp-custom',
        title: 'Custom ERP & Manufacturing Software',
        targetPage: 'services',
        queryParam: 'custom-software',
        description: 'Tailor-made production, inventory, and order tracking systems.',
        tag: 'High ROI'
      },
      {
        id: 'whatsapp-automation',
        title: 'Official WhatsApp Business API & Bots',
        targetPage: 'services',
        queryParam: 'it-consulting',
        description: 'Automated 24/7 client dispatch, invoices, and payment confirmations.',
        tag: 'Automation'
      },
      {
        id: 'enterprise-web',
        title: 'Corporate Website & Brand Portal',
        targetPage: 'services',
        queryParam: 'web-dev',
        description: 'High-converting Next.js enterprise web presence with sub-second loads.',
        tag: 'Lead Gen'
      }
    ],
    featuredTech: ['Next.js', 'PostgreSQL', 'Node.js', 'AWS Cloud', 'WhatsApp Cloud API'],
    ctaText: 'Get Enterprise Consultation',
    whatsappMessage: 'Hi Srinivash, I am a Business Owner interested in custom ERP and operational automation solutions from MUCO Labs.'
  },
  {
    id: 'ecommerce-merchant',
    label: 'E-Commerce & Retail Merchant',
    badge: 'DTC & Retail',
    iconName: 'ShoppingBag',
    heroTitle: 'Boost Mobile Checkouts & Dominate Local Search',
    heroTagline: 'Lightning-fast digital storefronts, automated cart recovery, payment gateway integrations, and multi-channel inventory.',
    painPoint: 'Slow loading web stores, high cart abandonment rates, and low Google visibility in local markets.',
    solutionHighlight: 'Sub-second React & Next.js storefronts with 1-click UPI/card checkouts, automated WhatsApp abandoned cart recovery, and aggressive Local SEO.',
    keyMetric: {
      value: '+140%',
      label: 'Average Mobile Conversion Uplift'
    },
    recommendedServices: [
      {
        id: 'ecommerce-stores',
        title: 'High-Speed E-Commerce Web Stores',
        targetPage: 'services',
        queryParam: 'web-dev',
        description: 'Sub-second page speeds with integrated payment gateways & inventory.',
        tag: 'Conversion'
      },
      {
        id: 'local-seo-ranking',
        title: 'Local SEO & Google Maps Domination',
        targetPage: 'services',
        queryParam: 'digital-marketing',
        description: 'Rank in the Top 3 on Google for high-intent buyer searches in Erode & TN.',
        tag: 'Organic Traffic'
      },
      {
        id: 'mobile-app-store',
        title: 'DTC Mobile Shopping App (Android & iOS)',
        targetPage: 'services',
        queryParam: 'mobile-app',
        description: 'Direct push notifications, flash sales, and customer loyalty.',
        tag: 'Retention'
      }
    ],
    featuredTech: ['Shopify Headless', 'Next.js', 'Razorpay', 'Tailwind CSS', 'Stripe'],
    ctaText: 'Scale Your E-Commerce Store',
    whatsappMessage: 'Hi Srinivash, I run an e-commerce / retail brand and want to upgrade our online storefront and local SEO ranking.'
  },
  {
    id: 'industrial-engineer',
    label: 'Industrial & Manufacturing Leader',
    badge: 'Factories & Builders',
    iconName: 'Compass',
    heroTitle: 'Precision 2D/3D CAD Blueprints & Plant Software',
    heroTagline: 'Architectural drafting, mechanical assembly modeling, MEP schematics, and factory floor digital tracking.',
    painPoint: 'Delays in getting high-precision engineering blueprints, lack of standardized CAD files, and production floor blind spots.',
    solutionHighlight: 'Certified CAD drafting engineers delivering layered DWG/DXF architectural plans, 3D mechanical SolidWorks models, and factory ERPs.',
    keyMetric: {
      value: '100%',
      label: 'ISO & Industry Standard Compliance'
    },
    recommendedServices: [
      {
        id: 'cad-drafting',
        title: 'AutoCAD 2D & 3D CAD Engineering Drafting',
        targetPage: 'services',
        queryParam: 'autocad-design',
        description: 'Architectural floor plans, MEP layouts, and mechanical 3D assemblies.',
        tag: 'Precision CAD'
      },
      {
        id: 'factory-erp',
        title: 'Industrial Production & Sizing ERP',
        targetPage: 'services',
        queryParam: 'custom-software',
        description: 'Real-time loom tracking, dye-batch logs, and dispatch manifests.',
        tag: 'Manufacturing'
      },
      {
        id: 'industrial-branding',
        title: 'Industrial Catalog & Brand Design',
        targetPage: 'services',
        queryParam: 'branding',
        description: 'Technical product catalogs, trade exhibition banners, and logos.',
        tag: 'B2B Sales'
      }
    ],
    featuredTech: ['AutoCAD', 'SolidWorks', 'Revit', 'Fusion 360', 'Python IoT'],
    ctaText: 'Request CAD / Industrial Quote',
    whatsappMessage: 'Hi Srinivash, I represent an industrial / manufacturing enterprise and need CAD drafting and factory management solutions.'
  },
  {
    id: 'tech-startup',
    label: 'Tech Startup & Product Innovator',
    badge: 'Startups & SaaS',
    iconName: 'Zap',
    heroTitle: 'Build & Ship Production-Ready MVPs in Weeks',
    heroTagline: 'From interactive Figma prototypes to scalable Next.js web applications, native mobile apps, and custom AI LLM agents.',
    painPoint: 'Slow development velocity, high agency quotes, and fragile prototypes that cannot scale past seed launch.',
    solutionHighlight: 'Battle-tested tech stack architecture with modular APIs, modern UI/UX design systems, and rapid sprint deployment within 3-6 weeks.',
    keyMetric: {
      value: '3-6 Wks',
      label: 'Average MVP Launch Velocity'
    },
    recommendedServices: [
      {
        id: 'fullstack-saas',
        title: 'Modern SaaS & Web App Engineering',
        targetPage: 'services',
        queryParam: 'web-dev',
        description: 'TypeScript, React, Tailwind, and scalable serverless backend APIs.',
        tag: 'Fast MVP'
      },
      {
        id: 'cross-platform-apps',
        title: 'Cross-Platform Mobile Apps (Flutter / React Native)',
        targetPage: 'services',
        queryParam: 'mobile-app',
        description: 'High-performance iOS and Android apps with Play Store publishing.',
        tag: 'Mobile First'
      },
      {
        id: 'ai-agents-llm',
        title: 'Custom AI Models & LLM Workflow Automation',
        targetPage: 'services',
        queryParam: 'ai-dev',
        description: 'Intelligent AI chatbot agents trained on proprietary company data.',
        tag: 'AI Powered'
      }
    ],
    featuredTech: ['React 18', 'Next.js 14', 'Flutter', 'Gemini AI', 'Tailwind', 'PostgreSQL'],
    ctaText: 'Build Your MVP with MUCO',
    whatsappMessage: 'Hi Srinivash, I am launching a tech startup/SaaS and want to discuss building our MVP with MUCO Labs.'
  },
  {
    id: 'growth-marketer',
    label: 'Growth Marketer & Agency Partner',
    badge: 'Marketing & ROI',
    iconName: 'TrendingUp',
    heroTitle: 'Dominate Search Rankings & Drive High-Converting Traffic',
    heroTagline: 'White-hat SEO keyword domination, high-ROI Google & Meta ad campaigns, and conversion rate optimized landing pages.',
    painPoint: 'High ad acquisition costs, poor landing page conversion rates, and invisible Google search ranking.',
    solutionHighlight: 'Data-backed search engine optimization combined with psychological copywriting, sub-second landing pages, and multi-channel lead funnels.',
    keyMetric: {
      value: '4.6x',
      label: 'Average Client Campaign ROAS'
    },
    recommendedServices: [
      {
        id: 'seo-mastery',
        title: 'Search Engine Optimization (SEO)',
        targetPage: 'services',
        queryParam: 'digital-marketing',
        description: 'Complete technical, on-page, and local SEO to claim #1 search rankings.',
        tag: 'Top 3 Ranking'
      },
      {
        id: 'paid-performance',
        title: 'Google & Meta Performance Ads',
        targetPage: 'services',
        queryParam: 'digital-marketing',
        description: 'High-intent search campaigns, retargeting funnels, and lead generation.',
        tag: 'Paid Ads'
      },
      {
        id: 'cro-landing',
        title: 'Conversion Rate Optimized (CRO) Web Pages',
        targetPage: 'services',
        queryParam: 'web-dev',
        description: 'Laser-focused landing pages engineered for maximum customer inquiry rates.',
        tag: 'High Conversion'
      }
    ],
    featuredTech: ['Google Analytics 4', 'Search Console', 'Meta Pixel', 'Ahrefs', 'Next.js'],
    ctaText: 'Supercharge Your Growth Funnel',
    whatsappMessage: 'Hi Srinivash, I am looking for advanced SEO, Google Ads, and high-converting landing page solutions for our brand.'
  },
  {
    id: 'student-aspirant',
    label: 'Student & Career Aspirant',
    badge: 'Way2Me Academy',
    iconName: 'GraduationCap',
    heroTitle: 'Master Real-World Tech Stacks & Launch Your Career',
    heroTagline: '100% practical, project-based engineering bootcamps in Full-Stack Web Development, AI, Mobile Apps, and AutoCAD.',
    painPoint: 'Outdated college syllabi, lack of live project experience, and difficulty passing technical coding interviews.',
    solutionHighlight: 'Way2Me Mastery Academy provides 1-on-1 mentorship by senior engineers, live production deployment experience, and guaranteed placement assistance.',
    keyMetric: {
      value: '92%',
      label: 'Alumni Placement & Internship Rate'
    },
    recommendedServices: [
      {
        id: 'way2me-courses',
        title: 'Way2Me Mastery Academy Bootcamps',
        targetPage: 'courses',
        description: 'Hands-on courses in Full-Stack, React, Node.js, AI, and AutoCAD.',
        tag: 'Live Mentorship'
      },
      {
        id: 'student-internships',
        title: 'Live Client Project Internships',
        targetPage: 'courses',
        description: 'Work directly on real-world client software projects and build a portfolio.',
        tag: 'Real Experience'
      },
      {
        id: 'certification-hub',
        title: 'Industry Recognized Certifications',
        targetPage: 'courses',
        description: 'Verified skill credentials, GitHub portfolio reviews, and mock interviews.',
        tag: 'Career Ready'
      }
    ],
    featuredTech: ['React', 'TypeScript', 'Node.js', 'Git / GitHub', 'AutoCAD', 'Python'],
    ctaText: 'Explore Academy Courses',
    whatsappMessage: 'Hi Srinivash, I am a student / aspiring engineer interested in enrolling in Way2Me Academy at MUCO Labs.'
  }
];
