export interface CourseModule {
  number: number;
  title: string;
  description: string;
  skillsLearned: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  category:
    | 'Web & Full-Stack'
    | 'Mobile App'
    | 'AI & Automation'
    | 'Cloud & SaaS'
    | 'Engineering & CAD'
    | 'Digital Marketing'
    | 'Design & Creative'
    | 'Business & IT Consulting';
  tagline: string;
  description: string;
  iconName: string;
  level: 'Beginner to Advanced' | 'Intermediate to Pro' | 'Industry-Ready Masterclass' | 'All Levels Welcome';
  duration: string;
  format: string;
  technologies: string[];
  highlights: string[];
  modules: CourseModule[];
  capstoneProjects: string[];
  prerequisites: string;
  whoIsThisFor: string[];
  careerOpportunities: string[];
  badge?: string;
  partner: {
    institution: string;
    mentor: string;
    contactNote: string;
  };
}

export const WAY2ME_PARTNER_INFO = {
  institutionName: 'Way2Me Academy',
  tagline: 'Premier Career & Technology Learning Hub',
  founderName: 'Yogaharikaran',
  founderRole: 'Founder & CEO, Way2Me',
  primaryPhone: '+91 9566596501',
  secondaryPhone: '+91 8807578299',
  cleanPhone1: '919566596501',
  cleanPhone2: '918807578299',
  primaryEmail: 'admin@way2me.in',
  secondaryEmail: 'contact@way2me.co.in',
  website: 'https://way2me.co.in',
  alternativeWebsite: 'https://way2me.in',
  instagramUrl: 'https://www.instagram.com/way2me__/',
  instagramHandle: '@way2me__',
  location: 'Kavettipatty, Namakkal, Tamil Nadu, India - 637017',
  pricingNotice: 'Customized student & batch pricing available. Contact Founder Yogaharikaran directly on WhatsApp or Call for detailed fee structure, live batch schedules, and enrollment discounts.',
  keyBenefits: [
    'Direct 1-on-1 Mentorship from Yogaharikaran (Founder & CEO, Way2Me) & MUCO Labs Senior Architects',
    'Real-World Production Projects (Not Just Toy Code)',
    '100% Verified Certificate of Completion from MUCO Labs & Way2Me',
    'Dedicated Placement Assistance, Portfolio Construction & Mock Tech Interviews',
    'Lifetime Access to Course Code Repositories, Lecture Recordings & Alumni Network',
    'Flexible Weekend & Evening Batches for Students and Working Professionals'
  ]
};

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'web-engineering-mastery',
    title: 'Full-Stack Web Engineering Bootcamp (Next.js 15, React 19 & Node.js)',
    category: 'Web & Full-Stack',
    tagline: 'Master modern full-stack web architecture from design to high-concurrency production deployments.',
    description: 'Transform from a beginner or intermediate coder into an industry-ready full-stack software engineer. Learn the exact modern stack used by high-growth startups: Next.js 15, React 19, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, and Docker containerization.',
    iconName: 'Globe',
    level: 'Beginner to Advanced',
    duration: '12 Weeks (Live Interactive + Project Mentorship)',
    format: 'Live Online Sessions + 1-on-1 Mentorship + Code Reviews',
    badge: 'Most Popular',
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM', 'Docker', 'AWS'],
    highlights: [
      'Build 4 Capstone Production Web Applications',
      '100% Code Review by Senior MUCO Labs Architects',
      'TypeScript end-to-end type safety & clean architectural patterns',
      'Resume & Technical Interview Prep with Way2Me Admissions Team',
      'Official Joint Certification from MUCO Labs & Way2Me'
    ],
    modules: [
      {
        number: 1,
        title: 'Modern JavaScript (ES6+), TypeScript & Async Engineering',
        description: 'Deep dive into closures, prototypes, event loops, async/await, strict TypeScript interfaces, generics, and compiler tooling.',
        skillsLearned: ['ES6+ Syntax', 'TypeScript Generics', 'Async Patterns', 'NPM Tooling']
      },
      {
        number: 2,
        title: 'React 19 Ecosystem, Server Components & State Systems',
        description: 'Build responsive UIs using functional components, custom hooks, React Server Components (RSC), Context API, and Framer Motion transitions.',
        skillsLearned: ['React 19 Hooks', 'Server Components', 'Tailwind Styling', 'Motion Animations']
      },
      {
        number: 3,
        title: 'Next.js 15 App Router, SSR, ISR & Edge Compute',
        description: 'Architect lightning-fast enterprise web portals with dynamic routing, server actions, metadata SEO optimization, and Edge rendering.',
        skillsLearned: ['App Router', 'Server Actions', 'Technical SEO', 'Performance Optimization']
      },
      {
        number: 4,
        title: 'Backend Architecture with Node.js, Express & Databases',
        description: 'Design secure RESTful APIs, JWT/OAuth2 authentication, Prisma ORM queries, and relational database schema design with PostgreSQL.',
        skillsLearned: ['Express.js APIs', 'PostgreSQL', 'Prisma ORM', 'Auth & Security']
      },
      {
        number: 5,
        title: 'Production Deployments, Docker & Microservices',
        description: 'Containerize full-stack apps with Docker, configure CI/CD GitHub Actions, and deploy to AWS, Google Cloud Run, and Vercel.',
        skillsLearned: ['Docker', 'CI/CD Pipelines', 'Cloud Run / AWS', 'Monitoring & Logs']
      }
    ],
    capstoneProjects: [
      'Multi-Vendor E-Commerce Platform with Stripe / Razorpay Checkout',
      'Real-Time Collaborative Workspace with WebSocket Live Cursors',
      'Enterprise SaaS Dashboard with Role-Based Access Control (RBAC)'
    ],
    prerequisites: 'Basic familiarity with computer operations. No prior professional coding experience required.',
    whoIsThisFor: [
      'College students seeking high-paying software developer jobs',
      'Front-end developers wanting to master full-stack and cloud backend',
      'Entrepreneurs and founders building their own tech products'
    ],
    careerOpportunities: ['Full-Stack Developer', 'Frontend Engineer', 'Next.js Specialist', 'Node.js Backend Developer'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran (Founder & CEO) & Srinivash Mahalingam',
      contactNote: 'Contact Yogaharikaran at +91 9566596501 for syllabus details & live batch admissions.'
    }
  },
  {
    id: 'mobile-app-development',
    title: 'Cross-Platform Mobile App Development (Flutter & React Native)',
    category: 'Mobile App',
    tagline: 'Build, test, and publish native-grade iOS & Android applications with smooth 60fps animations.',
    description: 'Master cross-platform mobile app development with Flutter (Dart) and React Native (TypeScript). Learn state management, camera/GPS hardware integrations, push notifications, offline local databases, and complete Google Play Store & Apple App Store publishing compliance.',
    iconName: 'Smartphone',
    level: 'Intermediate to Pro',
    duration: '10 Weeks (Intensive Hands-On)',
    format: 'Live Coding Labs + Physical Device Testing + Store Publishing',
    badge: 'High Demand',
    technologies: ['Flutter', 'Dart', 'React Native', 'Expo', 'Firebase', 'SQLite', 'REST APIs', 'Play Store Console', 'App Store Connect'],
    highlights: [
      'Publish 2 Live Applications directly to Google Play & App Store',
      'Native Device Hardware Integration (Camera, Biometrics, Bluetooth, GPS)',
      'Push Notification server setup & In-App Purchases',
      'Offline-first synchronization with SQLite & Firebase Firestore'
    ],
    modules: [
      {
        number: 1,
        title: 'Mobile UI/UX Principles & Native Navigation Paradigms',
        description: 'Understand mobile-first design guidelines, gesture handling, touch ergonomics, and adaptive screens across iPhone and Android devices.',
        skillsLearned: ['Mobile UX Principles', 'Material Design 3', 'Cupertino Guidelines', 'Screen Layouts']
      },
      {
        number: 2,
        title: 'Flutter Deep-Dive & Reactive State Management',
        description: 'Master Dart programming, widget lifecycle, animations, and industrial state management architectures using Bloc and Riverpod.',
        skillsLearned: ['Dart Programming', 'Flutter Widgets', 'Bloc Pattern', 'Riverpod']
      },
      {
        number: 3,
        title: 'React Native & Native Device Hardware APIs',
        description: 'Build React Native applications using Expo, interfacing directly with device hardware (Camera, Location, Sensors, and Biometrics).',
        skillsLearned: ['React Native Expo', 'Native Modules', 'Device Sensors', 'Biometric Auth']
      },
      {
        number: 4,
        title: 'Backend Integration, Push Notifications & Offline Sync',
        description: 'Connect mobile apps to REST/GraphQL APIs, implement Firebase Cloud Messaging for instant push notifications, and handle offline caching.',
        skillsLearned: ['FCM Push Alerts', 'Firebase Firestore', 'Offline Caching', 'REST API Client']
      },
      {
        number: 5,
        title: 'App Store & Google Play Store Publishing & Compliance',
        description: 'Learn step-by-step app bundling, keystore signing, App Store privacy policies, Google Play data safety forms, and release track management.',
        skillsLearned: ['App Signing', 'Store Policy Compliance', 'TestFlight / Internal Testing', 'Live Deployment']
      }
    ],
    capstoneProjects: [
      'Food Delivery & Live GPS Rider Tracking App',
      'Fintech Expense Tracker with Biometric Login & Offline SQLite Sync',
      'Social Community App with Live Chat and Media Uploads'
    ],
    prerequisites: 'Basic knowledge of any programming language (JavaScript, Python, C++, or Java).',
    whoIsThisFor: [
      'Aspiring mobile application engineers',
      'Web developers transitioning to iOS and Android development',
      'Startups wanting to build MVP mobile apps quickly'
    ],
    careerOpportunities: ['Flutter Developer', 'React Native Engineer', 'Mobile App Architect', 'iOS/Android App Specialist'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran & Way2Me Mobile Faculty',
      contactNote: 'Reach out to Yogaharikaran (+91 9566596501) for seat booking & device requirements.'
    }
  },
  {
    id: 'ai-chatbots-llms',
    title: 'Applied Generative AI, LLMs & Agentic Automation Bootcamp',
    category: 'AI & Automation',
    tagline: 'Harness Google Gemini AI, LangChain, RAG, and multi-agent workflows to automate business operations.',
    description: 'Learn to build production-grade AI systems, Retrieval-Augmented Generation (RAG) pipelines over custom company PDFs/databases, autonomous agentic workflows, and 24/7 automated WhatsApp AI bots using the modern Google Gen AI SDK, Python, and LangChain.',
    iconName: 'Bot',
    level: 'Industry-Ready Masterclass',
    duration: '8 Weeks (Fast-Track Innovation)',
    format: 'Live Interactive Lectures + Hands-on Colab/Cloud Labs',
    badge: 'Trending Skill',
    technologies: ['Google Gemini 2.5', 'LangChain', 'Python', 'FastAPI', 'Pinecone Vector DB', 'ChromaDB', 'WhatsApp Cloud API', 'Docker'],
    highlights: [
      'Deploy live RAG Knowledge Chatbots on WhatsApp and Web',
      'Direct hands-on with Google Gemini 2.5 Flash, Pro & Multimodal SDK',
      'Build Autonomous Multi-Agent Research & Data-Scraping Pipelines',
      'Learn LLM Evaluation, Cost Optimization & Security Guardrails'
    ],
    modules: [
      {
        number: 1,
        title: 'Generative AI Foundations & Prompt Engineering Science',
        description: 'Understand transformer architectures, context windows, few-shot prompting, structured JSON schema outputs, and temperature calibration.',
        skillsLearned: ['LLM Fundamentals', 'Prompt Engineering', 'Structured JSON Mode', 'Context Management']
      },
      {
        number: 2,
        title: 'Embeddings, Vector Databases & RAG Architecture',
        description: 'Convert PDFs, docx, and spreadsheets into vector embeddings. Query high-dimensional spaces using Pinecone and ChromaDB for factual precision.',
        skillsLearned: ['Vector Embeddings', 'Chunking Strategies', 'Pinecone / Chroma', 'Semantic Search']
      },
      {
        number: 3,
        title: 'Autonomous AI Agents & Tool Calling (Function Calling)',
        description: 'Build agents capable of executing external tools (Web Search, SQL queries, Calculator, sending Emails) autonomously to achieve objectives.',
        skillsLearned: ['Function Calling', 'Agentic Workflows', 'Tool Integration', 'ReAct Prompting']
      },
      {
        number: 4,
        title: 'Multimodal AI & Document Processing (Vision, Audio & OCR)',
        description: 'Process scanned invoices, handwritten documents, charts, and audio transcriptions with Gemini multimodal capabilities.',
        skillsLearned: ['Multimodal Analysis', 'Automated OCR', 'Document Intelligence', 'Audio Transcription']
      },
      {
        number: 5,
        title: 'Deploying Production AI Microservices & WhatsApp Bots',
        description: 'Wrap your AI agents into high-throughput FastAPI services, integrate with Meta WhatsApp Business API, and implement rate limits.',
        skillsLearned: ['FastAPI Backend', 'WhatsApp Bot Webhooks', 'Cost Optimization', 'Guardrails & Safety']
      }
    ],
    capstoneProjects: [
      'Enterprise Document RAG Bot that queries 500-page internal company manuals',
      'Autonomous Market Research Agent with web search & PDF report generation',
      '24/7 Intelligent WhatsApp Customer Support Bot with human fallback'
    ],
    prerequisites: 'Basic Python programming fundamentals. No complex machine learning math required.',
    whoIsThisFor: [
      'Software developers wanting to pivot into high-paying AI engineering',
      'Product managers and business analysts automating enterprise workflows',
      'Tech enthusiasts eager to build cutting-edge Generative AI applications'
    ],
    careerOpportunities: ['AI Application Engineer', 'Generative AI Developer', 'LLM Prompt Engineer', 'Automation Consultant'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran (Way2Me) & Srinivash Mahalingam (MUCO Labs)',
      contactNote: 'WhatsApp Yogaharikaran at +91 9566596501 to check next AI cohort start dates.'
    }
  },
  {
    id: 'custom-software-saas',
    title: 'Custom SaaS Architecture & Enterprise Cloud Microservices',
    category: 'Cloud & SaaS',
    tagline: 'Architect and engineer scalable multi-tenant SaaS products, enterprise ERP systems, and cloud pipelines.',
    description: 'Learn how to architect enterprise-grade software products from the ground up: Multi-tenant database isolation, microservices communication, background queues, automated billing cycles (Razorpay/Stripe), role-based permissions (RBAC), and 99.9% uptime cloud deployments.',
    iconName: 'Cpu',
    level: 'Industry-Ready Masterclass',
    duration: '12 Weeks (Deep Architectural Training)',
    format: 'Live System Design Sessions + Real SaaS Codebases',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Razorpay', 'Stripe'],
    highlights: [
      'Complete Multi-Tenant SaaS Architecture from Scratch',
      'High-Concurrency Caching & Message Queues with Redis & BullMQ',
      'Payment Gateway Webhook Architecture & Automated Invoicing',
      'ISO 27001 Security Hardening & Penetration Testing Principles'
    ],
    modules: [
      {
        number: 1,
        title: 'Enterprise System Design & Multi-Tenant Data Isolation',
        description: 'Understand schema-per-tenant vs shared-schema designs, domain-driven design (DDD), and relational database indexing at scale.',
        skillsLearned: ['System Design', 'Multi-Tenancy', 'Database Partitioning', 'Indexing & Speed']
      },
      {
        number: 2,
        title: 'Microservices, Asynchronous Message Queues & Webhooks',
        description: 'Decouple large monolithic apps into agile microservices communicating via Redis Pub/Sub, BullMQ background queues, and webhooks.',
        skillsLearned: ['Microservices', 'Redis Queues', 'Event-Driven Architecture', 'Webhooks']
      },
      {
        number: 3,
        title: 'Subscription Engine, Payment Gateways & Invoicing',
        description: 'Implement complex recurring subscription models, proration, coupon codes, and idempotent webhook handling for Razorpay and Stripe.',
        skillsLearned: ['Payment Gateways', 'Subscription Engines', 'Webhook Idempotency', 'Invoice Generation']
      },
      {
        number: 4,
        title: 'Enterprise RBAC, Security & Audit Trail Logging',
        description: 'Build granular permission engines, session invalidation, rate-limiting DDOS defense, and immutable audit logging for enterprise audits.',
        skillsLearned: ['Role-Based Access Control', 'Security Audits', 'Rate Limiting', 'OAuth2 Standards']
      },
      {
        number: 5,
        title: 'Docker, Kubernetes Orchestration & Cloud Infrastructure',
        description: 'Master Docker container packaging, zero-downtime rolling updates on Kubernetes, load balancers, and AWS/Cloud Run infrastructure.',
        skillsLearned: ['Docker Containers', 'Kubernetes Pods', 'Cloud Hosting', 'Zero-Downtime Deploys']
      }
    ],
    capstoneProjects: [
      'Multi-Tenant School / Hospital ERP Management Platform',
      'B2B SaaS Analytics Dashboard with Automated Monthly PDF Reports',
      'High-Throughput Notification Dispatch Engine capable of 10k msgs/sec'
    ],
    prerequisites: 'Intermediate programming experience with JavaScript/TypeScript, Python, or Java.',
    whoIsThisFor: [
      'Software developers aiming for Senior / Lead / Principal Architect positions',
      'Founders building scalable tech platforms with paying customers',
      'Backend developers upgrading to distributed microservices'
    ],
    careerOpportunities: ['SaaS Architect', 'Cloud Solutions Architect', 'Lead Backend Engineer', 'DevOps & Cloud Engineer'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran & Senior MUCO Labs Engineering Leads',
      contactNote: 'Call/WhatsApp Yogaharikaran (+91 9566596501) for detailed enterprise curriculum.'
    }
  },
  {
    id: 'autocad-engineering-drafting',
    title: 'Professional AutoCAD 2D Drafting & 3D CAD Modeling Masterclass',
    category: 'Engineering & CAD',
    tagline: 'Master civil blueprints, architectural floor plans, mechanical 3D parts, and MEP engineering drawings according to global standards.',
    description: 'Get industry-certified in Computer-Aided Design (CAD). Learn AutoCAD 2026, 2D architectural drafting, elevation drawings, structural detailing, 3D mechanical modeling, and international ISO/ANSI blueprint standards taught by experienced CAD engineers.',
    iconName: 'Layers',
    level: 'Beginner to Advanced',
    duration: '8 Weeks (Practical Drafting Lab)',
    format: 'Hands-on CAD Software Lab + Blueprint Reviews + Industry Projects',
    technologies: ['AutoCAD 2026', 'SolidWorks', 'Revit', 'Fusion 360', 'DWG / DXF', '3ds Max'],
    highlights: [
      'Complete portfolio of 15+ Industry Blueprints & Mechanical CAD Sheets',
      'Hands-on training from real architectural & industrial CAD blueprints',
      'Converts hand-drawn sketches and point clouds into high-precision vector drawings',
      'Direct guidance for AutoCAD Certified Professional credentials'
    ],
    modules: [
      {
        number: 1,
        title: 'AutoCAD Core Commands, Coordinate Systems & Precision Drafting',
        description: 'Master command shortcuts, dynamic input, Cartesian/polar coordinates, object snaps, geometric constraints, and layer setups.',
        skillsLearned: ['AutoCAD Interface', 'Precision Drafting', 'Layer Management', 'Dimensioning Standards']
      },
      {
        number: 2,
        title: 'Architectural 2D Floor Plans, Sections & Elevations',
        description: 'Draft residential & commercial building floor plans, cross-sections, structural door/window schedules, and municipal approval layouts.',
        skillsLearned: ['Floor Plan Drafting', 'Sectional Views', 'Elevations', 'Municipal Drawings']
      },
      {
        number: 3,
        title: 'MEP (Mechanical, Electrical, Plumbing) Drafting & Schedules',
        description: 'Create HVAC duct layouts, electrical circuit blueprints, plumbing schematics, and automated Bill of Materials (BOM) tables.',
        skillsLearned: ['Electrical Blueprints', 'Plumbing Schematics', 'MEP Routing', 'Bill of Materials']
      },
      {
        number: 4,
        title: '3D Solid Modeling, Mechanical Components & Assembly',
        description: 'Extrude, revolve, sweep, and loft complex 3D industrial mechanical components, gear assemblies, and photorealistic rendering.',
        skillsLearned: ['3D Solid Modeling', 'Surface Lofting', 'Mechanical Assemblies', 'Rendering']
      },
      {
        number: 5,
        title: 'Plotting, Sheet Sets, Scale Standards & Client Handoff',
        description: 'Master viewports, annotative text, paper space title blocks, high-resolution PDF exports, and DWG/DXF batch conversions.',
        skillsLearned: ['Sheet Sets', 'Title Blocks', 'Plotting Scales', 'DXF/DWG Exporting']
      }
    ],
    capstoneProjects: [
      'Comprehensive 3-Story Commercial Building Architectural & MEP Blueprint',
      'Complete Industrial Mechanical Gearbox 3D Assembly & Exploded View',
      'Municipal Approval Residential Villa Layout Plan conforming to local building bylaws'
    ],
    prerequisites: 'Open to Civil, Mechanical, Electrical engineering students, diploma holders, and CAD enthusiasts.',
    whoIsThisFor: [
      'Civil, Mechanical, and Electrical engineering students & graduates',
      'Draftsmen and architects wanting to modernize their CAD skills',
      'Professionals seeking high-demand overseas CAD drafting opportunities'
    ],
    careerOpportunities: ['AutoCAD Drafter', 'CAD Design Specialist', 'Civil Draftsman', 'Mechanical CAD Modeler'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran & Way2Me Engineering Faculty',
      contactNote: 'Direct admissions inquiry via WhatsApp: +91 9566596501 / +91 8807578299.'
    }
  },
  {
    id: 'digital-marketing-seo-ads',
    title: 'Performance Digital Marketing, SEO & High-ROI Advertising',
    category: 'Digital Marketing',
    tagline: 'Run profitable Google Ads, Meta Ad funnels, technical search engine optimization (SEO), and lead generation campaigns.',
    description: 'Learn the exact data-driven marketing systems that generate high-paying clients. Master technical SEO audits, high-intent Google Search ads, Meta (Facebook & Instagram) ads, conversion tracking pixels, and automated lead nurturing funnels.',
    iconName: 'TrendingUp',
    level: 'All Levels Welcome',
    duration: '6 Weeks (Practical Campaign Execution)',
    format: 'Live Ad Budget Demos + Campaign Setup + Growth Strategy Sprints',
    technologies: ['Google Ads', 'Meta Ads Manager', 'Google Search Console', 'GA4 Analytics', 'Semrush', 'Ahrefs', 'Canva Pro'],
    highlights: [
      'Launch and manage live ad campaigns with real budget case studies',
      'Perform complete technical SEO audits for client websites',
      'Build automated lead generation and WhatsApp conversion funnels',
      'Gain official Google Ads and Meta certification readiness'
    ],
    modules: [
      {
        number: 1,
        title: 'Technical SEO, Keyword Intent & On-Page / Off-Page Optimization',
        description: 'Master Google ranking factors, keyword research, competitor gap analysis, core web vitals, backlink strategies, and local SEO.',
        skillsLearned: ['Keyword Research', 'Technical SEO Audits', 'Local SEO (Google Business)', 'Backlink Building']
      },
      {
        number: 2,
        title: 'High-Converting Google Search, Display & Performance Max Ads',
        description: 'Setup profitable Google Ads search campaigns, negative keywords, quality score optimization, conversion bid strategies, and PMax campaigns.',
        skillsLearned: ['Google Search Ads', 'Keyword Bidding', 'Conversion Tracking', 'Ad Copywriting']
      },
      {
        number: 3,
        title: 'Meta Ads (Facebook & Instagram) Funnel Strategy & Retargeting',
        description: 'Design captivating video/image ads, configure Meta Pixel and Conversions API (CAPI), audience targeting, and warm retargeting funnels.',
        skillsLearned: ['Meta Ads Manager', 'Pixel / CAPI Setup', 'Custom & Lookalike Audiences', 'Ad Creative Strategy']
      },
      {
        number: 4,
        title: 'Conversion Rate Optimization (CRO) & Landing Page Funnels',
        description: 'Create high-converting landing pages, optimize call-to-action triggers, run A/B headline split tests, and eliminate bounce rates.',
        skillsLearned: ['Landing Page Design', 'A/B Split Testing', 'Heatmap Analysis', 'Copywriting for Sales']
      },
      {
        number: 5,
        title: 'Analytics Reporting (GA4) & Agency Client Acquisition',
        description: 'Build automated Google Looker Studio reports, calculate Customer Acquisition Cost (CAC) & ROAS, and pitch digital marketing services to clients.',
        skillsLearned: ['Google Analytics 4', 'Looker Studio Dashboards', 'ROAS & ROI Tracking', 'Client Proposals']
      }
    ],
    capstoneProjects: [
      'Complete 30-Day Omnichannel Growth Campaign for a Local Business',
      'Technical SEO Audit & 6-Month Keyword Ranking Strategy Report',
      'Lead Generation Ad Funnel Generating Verified Inquiries under ₹50/lead'
    ],
    prerequisites: 'No coding required. A keen interest in digital business, marketing, or entrepreneurship.',
    whoIsThisFor: [
      'Business owners wanting to generate continuous customer inquiries',
      'Marketing professionals looking to master paid performance ads',
      'Freelancers starting their own digital marketing agency'
    ],
    careerOpportunities: ['Digital Marketing Manager', 'Performance Ads Specialist', 'SEO Strategist', 'Growth Marketer'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran & Digital Growth Mentors',
      contactNote: 'Contact Yogaharikaran at +91 9566596501 for marketing batch schedules.'
    }
  },
  {
    id: 'uiux-branding-design',
    title: 'UI/UX Design Systems & Creative Brand Production',
    category: 'Design & Creative',
    tagline: 'Craft world-class digital user experiences in Figma, design systems, vector logos, and compelling corporate media.',
    description: 'Master digital product design from wireframes to polished high-fidelity prototypes. Learn Figma 2026, auto-layout, design tokens, typography scales, user psychology, responsive design systems, vector logo design, and seamless handoff to developers.',
    iconName: 'Palette',
    level: 'Beginner to Advanced',
    duration: '8 Weeks (Design Sprint Based)',
    format: 'Figma Workshops + Interactive Critique Sprints + Portfolio Reviews',
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Design Tokens'],
    highlights: [
      'Build a complete 3-project Dribbble and Behance design portfolio',
      'Master Auto-Layout 5.0, Component Variants, and Interactive Prototyping',
      'Create end-to-end brand guidelines with vector logo typography',
      'Direct 1-on-1 design critique sessions with Way2Me & MUCO Labs design leads'
    ],
    modules: [
      {
        number: 1,
        title: 'UX Foundations, User Research & Information Architecture',
        description: 'Learn empathy mapping, user interview methodologies, user personas, competitor benchmarking, user journey maps, and wireframing.',
        skillsLearned: ['User Research', 'Personas', 'User Journey Maps', 'Low-Fi Wireframing']
      },
      {
        number: 2,
        title: 'Figma Mastery, Auto-Layout & Interactive Prototyping',
        description: 'Deep dive into Figma frames, auto-layout, responsive constraints, micro-interactions, smart animate transitions, and interactive components.',
        skillsLearned: ['Figma Advanced', 'Auto-Layout', 'Smart Animate', 'Component States']
      },
      {
        number: 3,
        title: 'Scalable Design Systems & Token Architecture',
        description: 'Build industrial design systems with standardized color palettes, typography scales, spacing grids, icons, and developer handoff documentation.',
        skillsLearned: ['Design Tokens', 'Atomic Design', 'Design Systems', 'Handoff Specs']
      },
      {
        number: 4,
        title: 'Brand Identity Design, Logos & Visual Assets',
        description: 'Create memorable vector logos in Illustrator, brand guidelines, color psychology palettes, stationery kits, and social media templates.',
        skillsLearned: ['Vector Logo Design', 'Brand Guidelines', 'Adobe Illustrator', 'Visual Hierarchy']
      },
      {
        number: 5,
        title: 'Portfolio Showcase & Pitching to Global Clients',
        description: 'Package your case studies into compelling Behance and Dribbble portfolio presentations, preparing you for top product design roles.',
        skillsLearned: ['Case Study Writing', 'Portfolio Presentation', 'Design Pitching', 'Interview Prep']
      }
    ],
    capstoneProjects: [
      'Complete Mobile Banking App UI/UX Case Study with Interactive Prototype',
      'SaaS Web App Platform Design System with 50+ Reusable Components',
      'Full Corporate Brand Identity Kit with Logo, Typography, and Social Media Kits'
    ],
    prerequisites: 'Creativity and passion for design. No prior coding or design background needed.',
    whoIsThisFor: [
      'Aspiring UI/UX Designers and Product Designers',
      'Graphic designers upgrading to high-paying digital product design',
      'Developers who want to create beautiful, intuitive user interfaces'
    ],
    careerOpportunities: ['UI/UX Designer', 'Product Designer', 'Design System Lead', 'Brand Identity Designer'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran & MUCO Labs Creative Directors',
      contactNote: 'WhatsApp Yogaharikaran (+91 9566596501) for design cohort portfolio reviews.'
    }
  },
  {
    id: 'whatsapp-business-it-consulting',
    title: 'WhatsApp Business API Automation & IT Business Consulting',
    category: 'Business & IT Consulting',
    tagline: 'Learn how to build official Meta WhatsApp Business API bots, broadcast pipelines, Green Tick onboarding, and IT consulting practices.',
    description: 'An accelerated practicum on setting up and monetizing official Meta WhatsApp Business APIs for clients. Learn Cloud API webhooks, verified Green Tick submissions, promotional broadcast funnels, CRM integrations, and how to sell IT consulting packages.',
    iconName: 'Briefcase',
    level: 'All Levels Welcome',
    duration: '4 Weeks (Accelerated Business Practicum)',
    format: 'Live Guided Setups + Production Webhook Demos + Client Templates',
    technologies: ['WhatsApp Cloud API', 'Meta Developers Console', 'Node.js / Python Webhooks', 'CRM Integrations', 'Cloud Hosting'],
    highlights: [
      'Official WhatsApp Cloud API sandbox configuration from scratch',
      'Client onboarding proposal templates, pricing blueprints, and contracts',
      'Ready-to-deploy open-source webhook starter repositories',
      'Learn how to charge monthly recurring retainers for WhatsApp solutions'
    ],
    modules: [
      {
        number: 1,
        title: 'Meta Business Manager Setup & Official Phone Verification',
        description: 'Understand Meta Business Manager, phone number porting, display name approval, and Green Tick official verification requirements.',
        skillsLearned: ['Meta Business Manager', 'Phone Verification', 'Green Tick Criteria', 'API Permissions']
      },
      {
        number: 2,
        title: 'WhatsApp Cloud API Architecture & Webhook Handlers',
        description: 'Create Meta apps, generate permanent system user tokens, build Node.js/Python webhook receivers, and process inbound messages.',
        skillsLearned: ['Cloud API Integration', 'Webhook Receivers', 'Message Parsing', 'Token Management']
      },
      {
        number: 3,
        title: 'Interactive Message Formats & Automated Lead Funnels',
        description: 'Design quick reply buttons, list selection menus, catalog messages, automated FAQs, and document distribution pipelines.',
        skillsLearned: ['Interactive Buttons', 'List Menus', 'Catalog Messaging', 'Lead Capture Funnels']
      },
      {
        number: 4,
        title: 'Broadcast Campaigns, Policy Compliance & CRM Sync',
        description: 'Send bulk utility and marketing notifications safely without phone number bans. Sync inbound WhatsApp leads into Google Sheets and CRMs.',
        skillsLearned: ['Broadcast Messaging', 'Policy Compliance', 'Google Sheets CRM Sync', 'Lead Routing']
      },
      {
        number: 5,
        title: 'Agency Packaging, Pricing Models & Client Retainers',
        description: 'Package WhatsApp API setups as ₹25,000–₹75,000 agency services with monthly recurring maintenance retainers.',
        skillsLearned: ['Agency Pricing Models', 'Client Proposals', 'Monthly Retainers', 'Sales Pitches']
      }
    ],
    capstoneProjects: [
      'End-to-End Automated Clinic Appointment & WhatsApp Reminder Bot',
      'E-Commerce WhatsApp Order Confirmation & Tracking Bot',
      'Agency Consulting Pitch Deck with Ready-to-Sign Client Service Agreement'
    ],
    prerequisites: 'Basic understanding of digital services or web applications.',
    whoIsThisFor: [
      'Agencies and freelancers looking to offer high-ticket WhatsApp services',
      'IT consultants and business analysts advising enterprise clients',
      'Entrepreneurs wanting to automate customer communication channels'
    ],
    careerOpportunities: ['WhatsApp Automation Specialist', 'IT Solutions Consultant', 'Agency Owner', 'Chatbot Architect'],
    partner: {
      institution: 'Way2Me Academy',
      mentor: 'Yogaharikaran (Way2Me) & Srinivash Mahalingam (MUCO Labs)',
      contactNote: 'Direct contact with Yogaharikaran at +91 9566596501 for consulting batch seats.'
    }
  }
];
