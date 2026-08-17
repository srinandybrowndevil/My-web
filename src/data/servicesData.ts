export interface DetailedService {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  iconName: string;
  highlights: string[];
  deliverables: string[];
  technologies: string[];
  startingPrice: string;
}

export const CORE_SERVICES: DetailedService[] = [
  {
    id: 'web-dev',
    title: 'Website & Web Application Development',
    tagline: 'High-speed, SEO-optimized, custom web applications built for conversion.',
    category: 'Development',
    description: 'We craft high-performance websites and web applications with Next.js, React, Node.js, and modern UI frameworks. From company sites to complex web platforms, our solutions combine lightning-fast load times with striking design.',
    iconName: 'Globe',
    highlights: [
      'Sub-second page loading speeds',
      'Mobile-first responsive architecture',
      'Advanced technical SEO baked-in',
      'Custom animations and seamless transitions'
    ],
    deliverables: [
      'Custom UI/UX Design System',
      'Production React / Next.js Source Code',
      'CMS / Admin Dashboard',
      'Domain & Cloud Hosting Deployment'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MongoDB'],
    startingPrice: '₹14,999'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    tagline: 'Native performance mobile apps for iOS & Android built with React Native & Flutter.',
    category: 'Development',
    description: 'Build native-grade mobile applications that run smoothly on iOS and Android. We handle the full product life cycle from user wireframing and interactive prototypes to App Store & Play Store publishing.',
    iconName: 'Smartphone',
    highlights: [
      'Cross-platform efficiency with single codebase',
      'Native device capability access (GPS, Camera, Biometrics)',
      'Offline caching & real-time sync',
      'App Store & Play Store approval guarantee'
    ],
    deliverables: [
      'iOS & Android App Bundles',
      'Backend API Architecture',
      'Push Notification Server',
      'App Store Listing Assets'
    ],
    technologies: ['React Native', 'Flutter', 'iOS / Android', 'Firebase', 'GraphQL', 'REST APIs'],
    startingPrice: '₹49,999'
  },
  {
    id: 'custom-software',
    title: 'Custom Software & SaaS Development',
    tagline: 'Scalable CRM, ERP, and SaaS products tailored to your exact operational workflow.',
    category: 'Development',
    description: 'Automate complex operational workflows with custom software, enterprise CRM/ERP systems, and multi-tenant SaaS products engineered for high scalability, security, and performance.',
    iconName: 'Cpu',
    highlights: [
      'Multi-tenant cloud architecture',
      'Role-based access control & military security',
      'Automated billing & subscription engine',
      'Real-time analytics and custom PDF report generators'
    ],
    deliverables: [
      'Enterprise Backend & Microservices',
      'Super-Admin Management Console',
      'User Portal & Stripe/Razorpay Payments',
      'API Documentation & Webhooks'
    ],
    technologies: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS / Cloud Run'],
    startingPrice: '₹79,999'
  },
  {
    id: 'ai-solutions',
    title: 'AI Chatbots & Intelligent Automation',
    tagline: 'Harness custom LLMs, RAG, and AI agents to transform customer support and ops.',
    category: 'AI Services',
    description: 'Deploy AI chatbots trained specifically on your company documents and product data. Automate repetitive document parsing, email processing, and operational workflows with state-of-the-art AI.',
    iconName: 'Bot',
    highlights: [
      'Custom Retrieval-Augmented Generation (RAG)',
      'Omnichannel deployment (Website, WhatsApp, Telegram)',
      'Automated document extraction (OCR, PDF, Invoices)',
      'Seamless human agent fallback'
    ],
    deliverables: [
      'Trained AI Model / Agent Endpoint',
      'Embeddable Chatbot Widget',
      'WhatsApp API Bot Integration',
      'AI Analytics & Training Dashboard'
    ],
    technologies: ['Gemini AI API', 'OpenAI', 'Python', 'LangChain', 'Vector DB (Pinecone/Chroma)', 'FastAPI'],
    startingPrice: '₹24,999'
  },
  {
    id: 'autocad-design',
    title: 'AutoCAD Design & 2D/3D CAD Drafting',
    tagline: 'Precision CAD drafting, 2D architectural blueprints, and 3D industrial mechanical modeling.',
    category: 'Engineering Services',
    description: 'Delivering architectural blueprints, MEP engineering drawings, 2D floor plans, and 3D industrial mechanical modeling. We convert sketches, PDFs, and point clouds into DWG/DXF files conforming to international standards.',
    iconName: 'Layers',
    highlights: [
      'High-precision DWG / DXF vector drawings',
      'Architectural 2D plans & elevation layouts',
      'Industrial 3D mechanical component modeling',
      'Fast turnaround with error-free dimensioning'
    ],
    deliverables: [
      'Layered DWG & DXF Source Files',
      'Print-ready Scaled PDF Drawings',
      '3D STEP / IGES Mechanical Models',
      'Bill of Materials (BOM) Schedules'
    ],
    technologies: ['AutoCAD', 'SolidWorks', 'Revit', 'Fusion 360', '3ds Max'],
    startingPrice: '₹3,999'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Performance Ads',
    tagline: 'Data-driven SEO, Google Ads, Meta Ads, and Social Media growth campaigns.',
    category: 'Marketing',
    description: 'Scale your revenue with structured digital marketing. We handle search engine optimization (SEO), high-converting Google Ads, Meta Ads campaigns, and strategic social media growth.',
    iconName: 'TrendingUp',
    highlights: [
      'Laser-targeted audience demographic mapping',
      'Data-backed Keyword & Competitor Analysis',
      'Continuous Conversion Rate Optimization (CRO)',
      'Transparent weekly & monthly ROI dashboards'
    ],
    deliverables: [
      'Monthly Content & Ad Calendar',
      'Custom Ad Creatives & Video Shorts',
      'Meta Pixel & Conversion API Setup',
      'Executive Performance Reports'
    ],
    technologies: ['Google Ads', 'Meta Ads', 'Google Search Console', 'GA4 Analytics', 'Semrush', 'Ahrefs'],
    startingPrice: '₹7,999/mo'
  },
  {
    id: 'creative-branding',
    title: 'Branding, Copywriting & Media Production',
    tagline: 'Unforgettable brand identity, high-converting copy, and corporate media production.',
    category: 'Creative',
    description: 'Build a memorable visual brand with custom logo design, full brand identity guidelines, persuasive website & sales copywriting, and professional corporate video/photo production.',
    iconName: 'Palette',
    highlights: [
      'Distinctive vector logo design concepts',
      'Comprehensive brand guideline books',
      'Persuasive conversion-driven sales copy',
      'High-definition corporate media production'
    ],
    deliverables: [
      'Logo Vector Files (SVG, AI, EPS)',
      'Brand Style Guide & Stationery Kit',
      'SEO Articles & Sales Page Copy',
      'Edited Video Shorts & Ad Creatives'
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects'],
    startingPrice: '₹2,999'
  },
  {
    id: 'business-consulting',
    title: 'IT Consulting & WhatsApp Business Solutions',
    tagline: 'Official WhatsApp Business API integration, cloud architecture, and IT consulting.',
    category: 'Business Services',
    description: 'Elevate your business operations with official WhatsApp API broadcasting, lead generation funnels, cloud infrastructure setup, and strategic IT consultation from experienced technologists.',
    iconName: 'Briefcase',
    highlights: [
      'Official WhatsApp Green Tick support & API setup',
      'B2B / B2C Lead generation pipelines',
      'Cloud cost optimization and security audits',
      '1-on-1 CTO advisory for growth'
    ],
    deliverables: [
      'WhatsApp API Portal Access',
      'Verified Business Prospect Lists',
      'Cloud Architecture Map',
      'IT Security & Audit Report'
    ],
    technologies: ['WhatsApp Business API', 'AWS Cloud', 'Google Cloud Platform', 'Docker', 'Kubernetes'],
    startingPrice: '₹4,999'
  }
];

export const TECH_STACK: { name: string; category: string; description: string; iconName: string }[] = [
  { name: 'React 19 & Next.js 15', category: 'Frontend', description: 'Server components, fast client hydration, and SSR', iconName: 'Code2' },
  { name: 'TypeScript', category: 'Frontend', description: 'End-to-end static type safety and maintainability', iconName: 'FileCode' },
  { name: 'Tailwind CSS', category: 'Design', description: 'Utility-first styling with sleek responsive aesthetics', iconName: 'Palette' },
  { name: 'Node.js & Express', category: 'Backend', description: 'High-concurrency event-driven server runtime', iconName: 'Server' },
  { name: 'Python & FastAPI', category: 'Backend', description: 'Performant AI microservices and data pipelines', iconName: 'Terminal' },
  { name: 'Google Gemini AI', category: 'AI & ML', description: 'Advanced LLM reasoning, multimodal processing, and RAG', iconName: 'Sparkles' },
  { name: 'PostgreSQL & MongoDB', category: 'Database', description: 'Relational & document databases for scale', iconName: 'Database' },
  { name: 'AWS & Cloud Run', category: 'Cloud & DevOps', description: 'Auto-scaling serverless containers & cloud hosting', iconName: 'Cloud' },
  { name: 'Flutter & React Native', category: 'Mobile', description: 'High-performance cross-platform mobile apps', iconName: 'Smartphone' },
  { name: 'Docker & Microservices', category: 'DevOps', description: 'Isolated containerization & seamless deployments', iconName: 'Layers' }
];
