import { PricingItem, MaintenanceTier } from '../types';

export const DEVELOPMENT_PRICING: PricingItem[] = [
  // Website Development
  {
    id: 'web-basic',
    category: 'Website Development',
    title: 'Basic Website',
    price: '₹14,999',
    description: 'Ideal for small businesses needing an elegant, responsive online presence.',
    iconName: 'Globe',
    features: [
      'Up to 5 Responsive Pages',
      'Modern Clean UI/UX',
      'Mobile & Tablet Optimized',
      'Basic SEO Setup',
      'Contact Form & Google Maps',
      'Speed Optimization',
      '1 Month Free Support'
    ]
  },
  {
    id: 'web-business',
    category: 'Website Development',
    title: 'Business Website',
    price: '₹24,999',
    popular: true,
    description: 'Comprehensive web solution tailored for growing corporate brands.',
    iconName: 'Building2',
    features: [
      'Up to 10 Custom Pages',
      'Custom Design & Animations',
      'Advanced On-Page SEO',
      'WhatsApp & CRM Integration',
      'Blog / News Section',
      'High-Speed CDN & Hosting Setup',
      '3 Months Free Support'
    ]
  },
  {
    id: 'web-ecommerce',
    category: 'Website Development',
    title: 'E-Commerce Website',
    price: '₹39,999',
    description: 'Full-featured online store with payment gateway & inventory management.',
    iconName: 'ShoppingBag',
    features: [
      'Unlimited Product Listings',
      'Razorpay / Stripe Payment Gateway',
      'Order & Inventory Tracking',
      'Customer Accounts & Dashboard',
      'Coupon & Discount Engine',
      'Automated Email / SMS Alerts',
      '3 Months Free Support'
    ]
  },
  {
    id: 'web-custom',
    category: 'Website Development',
    title: 'Custom Website',
    price: '₹59,999+',
    description: 'Tailor-made web applications engineered for unique enterprise workflows.',
    iconName: 'Code2',
    features: [
      'Bespoke Frontend & Backend',
      'Complex Database Architecture',
      'API Integrations & Webhooks',
      'High Scalability Architecture',
      'Dedicated Server Deployment',
      'Security Audit & SSL Config',
      '6 Months Dedicated Support'
    ]
  },

  // Mobile App Development
  {
    id: 'app-basic',
    category: 'Mobile App Development',
    title: 'Basic Mobile App',
    price: '₹49,999',
    description: 'Essential cross-platform mobile application for Android & iOS.',
    iconName: 'Smartphone',
    features: [
      'iOS & Android (Flutter / React Native)',
      'Up to 6 Core Screens',
      'User Authentication & Profile',
      'Push Notifications',
      'REST API Integration',
      'Play Store & App Store Submission',
      '2 Months Support'
    ]
  },
  {
    id: 'app-business',
    category: 'Mobile App Development',
    title: 'Business Mobile App',
    price: '₹99,999',
    popular: true,
    description: 'Feature-rich mobile solution for expanding business ecosystems.',
    iconName: 'Smartphone',
    features: [
      'iOS & Android Native Performance',
      'Up to 15 Screens with Custom UI',
      'In-App Payments & Subscriptions',
      'Real-time Analytics & Tracking',
      'Admin Dashboard Control Panel',
      'Offline Storage Support',
      '4 Months Support'
    ]
  },
  {
    id: 'app-ecommerce',
    category: 'Mobile App Development',
    title: 'E-Commerce Mobile App',
    price: '₹149,999',
    description: 'High-conversion shopping experience with multi-vendor support capability.',
    iconName: 'ShoppingBag',
    features: [
      'Complete Mobile Commerce Suite',
      'Cart, Wishlist & Instant Checkout',
      'Live Order Location Tracking',
      'Push Marketing Notifications',
      'Multi-currency / Language Ready',
      'Payment Gateway Integration',
      '6 Months Support'
    ]
  },
  {
    id: 'app-enterprise',
    category: 'Mobile App Development',
    title: 'Enterprise Mobile App',
    price: '₹249,999+',
    description: 'Mission-critical enterprise mobile ecosystem with custom integrations.',
    iconName: 'Cpu',
    features: [
      'Scalable Microservices Backend',
      'Biometric Auth & Military Security',
      'Real-time WebSocket Data Sync',
      'AI Recommendation Engines',
      'SLA Guaranteed Maintenance',
      'Custom SDKs & Internal Tools',
      '1 Year Enterprise Support'
    ]
  },

  // Custom Software
  {
    id: 'sw-basic',
    category: 'Custom Software',
    title: 'Basic Custom Software',
    price: '₹79,999',
    description: 'Tailored desktop or web-based software for specific operational tasks.',
    iconName: 'Layers',
    features: [
      'Custom Database Schema',
      'Core Operational Workflows',
      'User Role Permissions',
      'Export to PDF / Excel / CSV',
      'Secure Local / Cloud Deployment',
      '3 Months Tech Support'
    ]
  },
  {
    id: 'sw-crm-erp',
    category: 'Custom Software',
    title: 'CRM / ERP Software',
    price: '₹149,999',
    popular: true,
    description: 'All-in-one business management, inventory, sales & HR software.',
    iconName: 'Database',
    features: [
      'Lead & Sales Pipeline Tracker',
      'Inventory & Order Processing',
      'Invoicing & Billing Automation',
      'Employee & Payroll Management',
      'Custom Reporting & Analytics',
      'Multi-branch Support',
      '6 Months Dedicated Support'
    ]
  },
  {
    id: 'sw-enterprise',
    category: 'Custom Software',
    title: 'Enterprise Software',
    price: '₹299,999+',
    description: 'High-load, fault-tolerant enterprise software system.',
    iconName: 'Server',
    features: [
      'Distributed Microservices Architecture',
      'Legacy System Migration',
      'High Concurrency & Load Balancing',
      'End-to-End Encryption & Compliance',
      '24/7 Monitoring & DevOps Pipeline',
      '1 Year Priority SLA Support'
    ]
  },

  // SaaS Development
  {
    id: 'saas-mvp',
    category: 'SaaS Development',
    title: 'SaaS MVP',
    price: '₹149,999',
    description: 'Rapid MVP development to test market demand and acquire early users.',
    iconName: 'Rocket',
    features: [
      'Core Product Feature Set',
      'Multi-tenant Database Setup',
      'Stripe / Razorpay Recurring Billing',
      'User Auth & Team Management',
      'Landing Page & Onboarding Flow',
      '3 Months Maintenance'
    ]
  },
  {
    id: 'saas-business',
    category: 'SaaS Development',
    title: 'SaaS Business',
    price: '₹299,999',
    popular: true,
    description: 'Fully featured SaaS platform built to scale to thousands of active users.',
    iconName: 'Sparkles',
    features: [
      'Advanced Tiered Billing & Usage Metrics',
      'Admin Super-Control Panel',
      'Webhook & API Access for End-Users',
      'Automated Email Workflows',
      'High-Performance Database Caching',
      '6 Months Tech Support'
    ]
  },
  {
    id: 'saas-enterprise',
    category: 'SaaS Development',
    title: 'SaaS Enterprise',
    price: '₹499,999+',
    description: 'Enterprise SaaS platform engineered for global scale and compliance.',
    iconName: 'ShieldCheck',
    features: [
      'SSO (SAML / Okta) Integration',
      'SOC2 & GDPR Compliance Architecture',
      'Multi-Region Cloud Deployment',
      'Dedicated Customer Success Tech',
      'Custom Enterprise Add-ons',
      '1 Year Full SLA Support'
    ]
  }
];

export const AI_SERVICES_PRICING: PricingItem[] = [
  {
    id: 'ai-chatbot',
    category: 'AI Services',
    title: 'AI Chatbot',
    price: '₹24,999',
    description: 'Smart conversational AI assistant for customer support and lead capture.',
    iconName: 'Bot',
    features: [
      'Custom Trained on Your Business Data',
      'Website & WhatsApp Integration',
      'Multi-lingual Support',
      'Lead Capture & CRM Sync',
      'Human Handoff Trigger',
      'Monthly Retraining & Analytics'
    ]
  },
  {
    id: 'ai-auto',
    category: 'AI Services',
    title: 'AI Automation',
    price: '₹49,999',
    popular: true,
    description: 'Automate repetitive workflows, documents, and data processing tasks.',
    iconName: 'Workflow',
    features: [
      'Document OCR & Parsing (Invoices/PDFs)',
      'Automated Email Responses & Routing',
      'AI Content & Summary Generation',
      'Zapier / Make / Custom API Sync',
      'Error Alerts & Activity Logs',
      '3 Months Tech Support'
    ]
  },
  {
    id: 'ai-advanced',
    category: 'AI Services',
    title: 'Advanced AI Solution',
    price: '₹99,999',
    description: 'Custom AI model fine-tuning, computer vision, or predictive analytics.',
    iconName: 'Brain',
    features: [
      'Custom LLM Fine-tuning or RAG Setup',
      'Predictive Analytics & Forecasting',
      'Computer Vision / Image Processing',
      'High-Throughput Vector DB Pipeline',
      'Dedicated GPU Cloud Hosting Setup',
      '6 Months Support'
    ]
  },
  {
    id: 'ai-enterprise',
    category: 'AI Services',
    title: 'Enterprise AI Ecosystem',
    price: '₹199,999+',
    description: 'End-to-end AI transformation across all internal company workflows.',
    iconName: 'Cpu',
    features: [
      'Enterprise Knowledge Graph Engine',
      'Custom Autonomous AI Agents',
      'Strict On-Prem / VPC AI Deployment',
      'Executive BI Dashboard & Insights',
      'Data Privacy & Security Guarantee',
      '1 Year Dedicated AI Engineering'
    ]
  }
];

export const DIGITAL_MARKETING_PRICING: PricingItem[] = [
  // Digital Marketing Package
  {
    id: 'dm-starter',
    category: 'Digital Marketing',
    title: 'Digital Marketing - Starter',
    price: '₹12,999',
    period: '/month',
    description: 'Kickstart online visibility and audience growth.',
    iconName: 'Megaphone',
    features: [
      'Social Media Management (2 Platforms)',
      '12 Custom Posts per Month',
      'Basic On-Page SEO Maintenance',
      'Google My Business Optimization',
      'Monthly Performance Report'
    ]
  },
  {
    id: 'dm-pro',
    category: 'Digital Marketing',
    title: 'Digital Marketing - Professional',
    price: '₹24,999',
    period: '/month',
    popular: true,
    description: 'Comprehensive digital strategy to drive steady leads & conversions.',
    iconName: 'TrendingUp',
    features: [
      'Social Media Management (4 Platforms)',
      '20 Custom Posts + 4 Reels/Videos',
      'Advanced On-Page & Technical SEO',
      'Ad Campaign Setup & Monitoring',
      'Monthly Strategy Call & Reporting'
    ]
  },
  {
    id: 'dm-enterprise',
    category: 'Digital Marketing',
    title: 'Digital Marketing - Enterprise',
    price: '₹49,999',
    period: '/month',
    description: 'Aggressive multi-channel growth engine for market dominance.',
    iconName: 'Flame',
    features: [
      'Full Digital Omnichannel Presence',
      '30 Posts + 8 High-Quality Reels',
      'Complete SEO & Content Marketing',
      'PPC Ad Management across Google/Meta',
      'Conversion Rate Optimization (CRO)',
      'Dedicated Growth Manager'
    ]
  },

  // Social Media Marketing
  {
    id: 'smm-starter',
    category: 'Social Media Marketing',
    title: 'Social Media - Starter',
    price: '₹9,999',
    period: '/month',
    description: 'Maintain an active, engaging brand presence on social media.',
    iconName: 'Share2',
    features: [
      '2 Platforms (Insta + Facebook/LinkedIn)',
      '10 Designed Graphics/Posts',
      'Hashtag Strategy & Captions',
      'Basic Community Management'
    ]
  },
  {
    id: 'smm-growth',
    category: 'Social Media Marketing',
    title: 'Social Media - Growth',
    price: '₹19,999',
    period: '/month',
    popular: true,
    description: 'Accelerate audience engagement with high-impact short-form video.',
    iconName: 'Video',
    features: [
      '3 Platforms',
      '18 Posts + 4 Short Reels',
      'Custom Motion Graphics',
      'Competitor Benchmarking Report'
    ]
  },
  {
    id: 'smm-premium',
    category: 'Social Media Marketing',
    title: 'Social Media - Premium',
    price: '₹39,999',
    period: '/month',
    description: 'Complete brand storytelling and influencer-grade creative production.',
    iconName: 'Award',
    features: [
      'All Major Platforms',
      '25 Posts + 10 Short Reels/Videos',
      'Influencer Outreach Coordination',
      '24/7 Community & DM Engagement'
    ]
  },

  // SEO
  {
    id: 'seo-basic',
    category: 'SEO',
    title: 'SEO - Basic',
    price: '₹7,999',
    period: '/month',
    description: 'Essential search engine optimization for local visibility.',
    iconName: 'Search',
    features: [
      'Keyword Research (15 Keywords)',
      'On-Page Meta & Heading Optimization',
      'Google Search Console Setup',
      'Monthly Keyword Ranking Report'
    ]
  },
  {
    id: 'seo-pro',
    category: 'SEO',
    title: 'SEO - Professional',
    price: '₹14,999',
    period: '/month',
    popular: true,
    description: 'Target high-intent search traffic and outrank competitors.',
    iconName: 'BarChart2',
    features: [
      'Target 35 High-Value Keywords',
      'Technical SEO & Speed Fixes',
      '4 Optimized Blog Articles / Month',
      'High-Authority Backlink Outreach'
    ]
  },
  {
    id: 'seo-enterprise',
    category: 'SEO',
    title: 'SEO - Enterprise',
    price: '₹24,999',
    period: '/month',
    description: 'National and international SEO dominance for high-volume terms.',
    iconName: 'Target',
    features: [
      'Target 75+ Competitive Keywords',
      'Schema Markup & Voice Search SEO',
      '8 Long-Form SEO Articles / Month',
      'Continuous Link Building & PR'
    ]
  },

  // Google Ads & Meta Ads
  {
    id: 'gads-setup',
    category: 'Google Ads',
    title: 'Google Ads Setup',
    price: '₹7,999',
    period: 'one-time',
    description: 'Professional Search & Display Ad campaign setup.',
    iconName: 'Target',
    features: [
      'Keyword & Audience Research',
      'Ad Copy Creation & Extensions',
      'Conversion Tracking Integration',
      'A/B Testing Setup'
    ]
  },
  {
    id: 'gads-mgmt',
    category: 'Google Ads',
    title: 'Google Ads Management',
    price: '₹9,999',
    period: '/month',
    description: 'Continuous optimization to minimize cost-per-click & maximize ROI.',
    iconName: 'Percent',
    features: [
      'Negative Keyword Filtering',
      'Bid & Budget Optimization',
      'Conversion Tracking Audits',
      'Weekly Optimization & Reporting'
    ]
  },
  {
    id: 'meta-setup',
    category: 'Meta Ads',
    title: 'Meta Ads Setup',
    price: '₹7,999',
    period: 'one-time',
    description: 'Setup high-converting Facebook & Instagram Ad campaigns.',
    iconName: 'Sliders',
    features: [
      'Meta Pixel & Conversion API Setup',
      'Target Audience & Lookalike Creation',
      'Ad Creative & Copy Design',
      'Campaign Structure Setup'
    ]
  },
  {
    id: 'meta-mgmt',
    category: 'Meta Ads',
    title: 'Meta Ads Management',
    price: '₹9,999',
    period: '/month',
    description: 'Ongoing Meta campaign scaling, creative refresh & lead generation.',
    iconName: 'BarChart3',
    features: [
      'Continuous Creative A/B Testing',
      'Audience Fatigue Monitoring',
      'ROAS Optimization',
      'Bi-weekly Performance Reports'
    ]
  }
];

export const CREATIVE_SERVICES_PRICING: PricingItem[] = [
  // Content Creation
  {
    id: 'content-starter',
    category: 'Content Creation',
    title: 'Content Creation - Starter',
    price: '₹4,999',
    period: '/month',
    description: 'Basic social graphics and brand visuals.',
    iconName: 'PenTool',
    features: ['8 Social Media Creatives', 'Source Files Included', '2 Revision Rounds', 'Brand Theme Matching']
  },
  {
    id: 'content-pro',
    category: 'Content Creation',
    title: 'Content Creation - Professional',
    price: '₹9,999',
    period: '/month',
    popular: true,
    description: 'Rich graphic content suite including carousels and banners.',
    iconName: 'Palette',
    features: ['16 Social Media Creatives', '2 Carousel Posts', 'Banner & Header Designs', 'Unlimited Revisions']
  },
  {
    id: 'content-premium',
    category: 'Content Creation',
    title: 'Content Creation - Premium',
    price: '₹19,999',
    period: '/month',
    description: 'High-end visual & motion content pack for premier brands.',
    iconName: 'Sparkles',
    features: ['25 Custom Graphics', '4 Short Motion Videos', 'Custom Illustrations', 'Dedicated Designer']
  },

  // Copywriting
  {
    id: 'copy-web',
    category: 'Copywriting',
    title: 'Website Copywriting',
    price: '₹4,999',
    description: 'Persuasive website copywriting designed to convert visitors.',
    iconName: 'FileText',
    features: ['Up to 5 Pages', 'SEO Keyword Integration', 'Clear Call-to-Actions', '2 Revision Rounds']
  },
  {
    id: 'copy-sales',
    category: 'Copywriting',
    title: 'Sales Copywriting',
    price: '₹7,999',
    description: 'High-converting sales landing page copy for campaigns.',
    iconName: 'DollarSign',
    features: ['In-Depth Audience Research', 'Hook & Value Prop Design', 'Objection Handling Copy', 'Conversion Framework']
  },
  {
    id: 'copy-email',
    category: 'Copywriting',
    title: 'Email Copywriting',
    price: '₹5,999',
    description: 'Email sequence copy for welcome, sales, and nurture campaigns.',
    iconName: 'Mail',
    features: ['Sequence of 5 Emails', 'High Open-rate Subject Lines', 'Spam Filter Optimization', 'CTA Placement']
  },
  {
    id: 'copy-seo-article',
    category: 'Copywriting',
    title: 'SEO Article',
    price: '₹999',
    period: '/article',
    description: 'Engaging, search-optimized long-form blog post.',
    iconName: 'BookOpen',
    features: ['1,000 to 1,200 Words', 'Plagiarism-Free Content', 'Keyword Optimization', 'Royalty-Free Images Included']
  },

  // Logo & Branding
  {
    id: 'logo-design',
    category: 'Logo Design',
    title: 'Logo Design',
    price: '₹2,999',
    description: 'Distinctive, modern logo design for new businesses.',
    iconName: 'Compass',
    features: ['3 Unique Initial Concepts', 'Vector Formats (SVG, AI, PNG)', 'Full Ownership Rights', 'Quick 3-Day Delivery']
  },
  {
    id: 'brand-identity',
    category: 'Brand Identity',
    title: 'Complete Brand Identity',
    price: '₹14,999',
    popular: true,
    description: 'Full brand manual, color schemes, typography & stationery kit.',
    iconName: 'Shield',
    features: ['Logo Design + Concepts', 'Brand Guidelines Book', 'Color Palette & Typography System', 'Business Card & Letterhead', 'Social Media Kit']
  },

  // Graphic Design
  {
    id: 'graphic-social',
    category: 'Graphic Design',
    title: 'Social Media Graphic',
    price: '₹999',
    period: 'per design',
    description: 'Single high-impact social media post design.',
    iconName: 'Image',
    features: ['Custom Graphic Design', 'High Resolution', 'Fast 24-Hour Delivery', '1 Revision']
  },
  {
    id: 'graphic-poster',
    category: 'Graphic Design',
    title: 'Poster Design',
    price: '₹1,499',
    period: 'per design',
    description: 'Professional poster for events, offers, or promotions.',
    iconName: 'File',
    features: ['Print-Ready Resolution (CMYK)', 'Digital Version Included', 'Custom Typography', '2 Revisions']
  },
  {
    id: 'graphic-brochure',
    category: 'Graphic Design',
    title: 'Brochure Design',
    price: '₹4,999',
    period: 'per design',
    description: 'Tri-fold or bi-fold corporate brochure design.',
    iconName: 'Layers',
    features: ['Bi-fold / Tri-fold Layout', 'Print-Ready Formats', 'Custom Infographics', 'Stock Assets Included']
  }
];

export const BUSINESS_SERVICES_PRICING: PricingItem[] = [
  {
    id: 'media-production',
    category: 'Business Services',
    title: 'Media Production',
    price: 'Starting From ₹14,999',
    description: 'Corporate videos, product photography & promotional ad shoots.',
    iconName: 'Video',
    features: [
      'High-Definition Video Shooting',
      'Professional Audio Recording',
      'Color Grading & Editing',
      'Background Music Licensing',
      'Social Media Cutdowns'
    ]
  },
  {
    id: 'whatsapp-biz',
    category: 'Business Services',
    title: 'WhatsApp Business Solutions',
    price: 'Starting From ₹4,999',
    description: 'Official WhatsApp Business API setup, green tick guidance & automated messaging.',
    iconName: 'MessageSquare',
    features: [
      'WhatsApp Business API Onboarding',
      'Automated Welcome & FAQ Bot',
      'Broadcasting & Segmented Messaging',
      'CRM & E-commerce Integration',
      'Green Tick Verification Support'
    ]
  },
  {
    id: 'lead-gen',
    category: 'Business Services',
    title: 'Lead Generation',
    price: 'Starting From ₹14,999',
    period: '/month',
    description: 'B2B & B2C targeted lead generation pipeline with qualified prospects.',
    iconName: 'UserCheck',
    features: [
      'Target ICP Persona Identification',
      'Verified Lead Database Building',
      'Outreach Campaign Execution',
      'Lead Qualification & Scoring',
      'Direct Appointment Booking'
    ]
  },
  {
    id: 'biz-consulting',
    category: 'Business Services',
    title: 'Business Consulting',
    price: 'Starting From ₹9,999',
    description: 'Strategic roadmap for digital transformation & business scaling.',
    iconName: 'Briefcase',
    features: [
      'Process & Workflow Audit',
      'Digital Tech Stack Evaluation',
      'Growth Strategy & KPI Setup',
      '1-on-1 Founder Consultation'
    ]
  },
  {
    id: 'cloud-solutions',
    category: 'Business Services',
    title: 'Cloud Solutions',
    price: 'Custom Pricing',
    description: 'Cloud architecture migration, optimization on AWS, GCP & Azure.',
    iconName: 'Cloud',
    features: [
      'AWS / GCP / Azure Setup',
      'Cloud Server Migration',
      'Cost Optimization & Savings',
      'Auto-scaling & Disaster Recovery'
    ]
  },
  {
    id: 'it-consulting',
    category: 'Business Services',
    title: 'IT Consulting',
    price: 'Starting From ₹19,999',
    description: 'Expert technology advisory for cybersecurity, infrastructure & software.',
    iconName: 'ShieldAlert',
    features: [
      'Infrastructure Vulnerability Assessment',
      'Cybersecurity & Backup Strategy',
      'Vendor & Tool Evaluation',
      'Ongoing CTO-as-a-Service Advisory'
    ]
  }
];

export const MAINTENANCE_SERVICES_PRICING: MaintenanceTier[] = [
  // Website Maintenance
  {
    id: 'maint-web-basic',
    category: 'Website Maintenance',
    title: 'Basic Website Maintenance',
    price: '₹2,999',
    period: '/month',
    description: 'Essential updates and security monitoring for small websites.',
    features: [
      'Weekly Backup & Restore',
      'Security Patching & Updates',
      'Uptime Monitoring (99.9%)',
      '1 Hour Content Update / Month',
      'Email Support'
    ]
  },
  {
    id: 'maint-web-pro',
    category: 'Website Maintenance',
    title: 'Professional Website Maintenance',
    price: '₹5,999',
    period: '/month',
    popular: true,
    description: 'Continuous optimization and priority support for business websites.',
    features: [
      'Daily Backups',
      'Malware Scanning & Removal',
      'Page Speed Optimization',
      '3 Hours Content / Layout Updates',
      'Database Optimization',
      'Priority Support (<4 hrs SLA)'
    ]
  },
  {
    id: 'maint-web-ent',
    category: 'Website Maintenance',
    title: 'Enterprise Website Maintenance',
    price: '₹9,999',
    period: '/month',
    description: 'Comprehensive support for high-traffic and e-commerce websites.',
    features: [
      'Real-time Cloud Backups',
      '24/7 Security Threat Defense',
      'E-commerce Payment Audits',
      '8 Hours Dedicated Custom Edits',
      'Monthly Technical Health Audit',
      'Dedicated Account Manager'
    ]
  },

  // Mobile App Maintenance
  {
    id: 'maint-app-basic',
    category: 'Mobile App Maintenance',
    title: 'Basic App Maintenance',
    price: '₹7,999',
    period: '/month',
    description: 'Bug fixes and OS updates for basic mobile apps.',
    features: [
      'iOS & Android OS Compatibility Checks',
      'Minor Bug Fixes & Patching',
      'Store Listing Information Updates',
      'Server API Health Checks',
      'Monthly Performance Report'
    ]
  },
  {
    id: 'maint-app-pro',
    category: 'Mobile App Maintenance',
    title: 'Professional App Maintenance',
    price: '₹14,999',
    period: '/month',
    popular: true,
    description: 'Active app maintenance, feature enhancements and performance tuning.',
    features: [
      'Third-party SDK & Dependency Upgrades',
      'Crashlytics & Error Logging Review',
      'Minor UI/UX Refinements',
      'Backend Database Optimization',
      'Store Policy Compliance Updates',
      'Priority SLA Support'
    ]
  },
  {
    id: 'maint-app-ent',
    category: 'Mobile App Maintenance',
    title: 'Enterprise App Maintenance',
    price: '₹24,999',
    period: '/month',
    description: 'Mission-critical mobile app maintenance and continuous dev team availability.',
    features: [
      'Dedicated Developer Hours (15 hrs/mo)',
      'Real-Time Security Vulnerability Audits',
      'Scalability & Load Test Inspections',
      'Continuous Integration / Deployment Pipeline Maintenance',
      '24/7 Emergency Hotkey SLA'
    ]
  },

  // Software & SaaS Maintenance
  {
    id: 'maint-saas-basic',
    category: 'Software & SaaS Maintenance',
    title: 'Basic SaaS Maintenance',
    price: '₹14,999',
    period: '/month',
    description: 'Core stability and database maintenance for custom software.',
    features: [
      'Server Monitoring & Incident Alerts',
      'Database Backup & Index Maintenance',
      'Critical Security Patching',
      '5 Hours Maintenance Support'
    ]
  },
  {
    id: 'maint-saas-pro',
    category: 'Software & SaaS Maintenance',
    title: 'Professional SaaS Maintenance',
    price: '₹29,999',
    period: '/month',
    popular: true,
    description: 'Comprehensive software maintenance and proactive feature refinement.',
    features: [
      'API Integration Maintenance',
      'Performance Bottleneck Troubleshooting',
      'User Access & Auth Maintenance',
      '12 Hours Feature Refinement',
      'Guaranteed < 2 Hr Emergency Response'
    ]
  },
  {
    id: 'maint-saas-ent',
    category: 'Software & SaaS Maintenance',
    title: 'Enterprise SaaS Maintenance',
    price: '₹49,999',
    period: '/month',
    description: 'Full SLA enterprise DevOps and continuous application engineering.',
    features: [
      '24/7 Infrastructure & App Monitoring',
      'Dedicated DevOps Engineer Access',
      'Zero-Downtime Deployment Management',
      '25 Hours Custom Feature / Refactor Hours',
      'Compliance & Audit Assurances'
    ]
  },

  // Cloud & Server Maintenance
  {
    id: 'maint-cloud-basic',
    category: 'Cloud & Server Maintenance',
    title: 'Basic Cloud Maintenance',
    price: '₹7,999',
    period: '/month',
    description: 'Fundamental server management and security checks.',
    features: [
      'Linux / Windows Server Patching',
      'Firewall & SSL Certificate Management',
      'Disk Space & CPU Usage Monitoring',
      'Weekly Backup Assurance'
    ]
  },
  {
    id: 'maint-cloud-pro',
    category: 'Cloud & Server Maintenance',
    title: 'Professional Cloud Maintenance',
    price: '₹14,999',
    period: '/month',
    popular: true,
    description: 'Active cloud infrastructure optimization on AWS, GCP or Azure.',
    features: [
      'Cloud Architecture Health Audit',
      'Auto-Scaling & Load Balancer Management',
      'Cloud Cost Optimization Analysis',
      'Automated Failover Verification',
      'Priority SLA Support'
    ]
  },
  {
    id: 'maint-cloud-ent',
    category: 'Cloud & Server Maintenance',
    title: 'Enterprise Cloud Maintenance',
    price: '₹29,999',
    period: '/month',
    description: 'Enterprise-grade multi-region cloud management and security.',
    features: [
      '24/7 SOC / NOC Cloud Monitoring',
      'DDoS Protection & WAF Configuration',
      'Kubernetes / Container Cluster Maintenance',
      'Disaster Recovery Plan Execution Testing',
      'Dedicated Cloud Architect Support'
    ]
  }
];
