import { ProjectItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = [
  // ------------------- 1. WEB DEVELOPMENT (3 Projects) -------------------
  {
    id: 'proj-web-1',
    title: 'Enterprise ERP & Supply Chain Portal',
    category: 'Web Development',
    client: 'Textile Manufacturers Erode',
    year: '2026',
    description: 'Cloud-based inventory management, real-time dispatch tracking, automated GST billing, and supplier vendor portal built with React, Node.js, and PostgreSQL.',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Reduced order dispatch latency by 45%', 'Automated GST invoice generation', 'Multi-user role access controls']
  },
  {
    id: 'proj-web-2',
    title: 'Multi-Vendor B2B E-Commerce Portal',
    category: 'Web Development',
    client: 'South Indian Organic Spices & Exports',
    year: '2026',
    description: 'High-concurrency B2B marketplace allowing agricultural producers to list bulk inventory, accept international wire payments, and track freight logistics.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Redis'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['3.2x growth in online B2B buyer inquiries', 'Sub-second search filtering across 10,000+ SKUs', 'Integrated multi-currency pricing']
  },
  {
    id: 'proj-web-3',
    title: 'Ultra-Fast Real Estate Portal',
    category: 'Web Development',
    client: 'Prime Properties Coimbatore',
    year: '2026',
    description: 'Modern property listing website with interactive 3D virtual tour viewer, neighborhood GIS mapping, and automated lead capture form.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'GraphQL', 'PostgreSQL'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Lighthouse performance score 99/100', '15,000+ monthly property searchers', 'Instant WhatsApp inquiry integration']
  },

  // ------------------- 2. MOBILE APP (3 Projects) -------------------
  {
    id: 'proj-mobile-1',
    title: 'Cross-Platform Mobile Fleet Manager',
    category: 'Mobile App',
    client: 'Logistics Enterprise India',
    year: '2026',
    description: 'Native iOS & Android mobile application for real-time GPS fleet tracking, driver route optimization, proof-of-delivery signatures, and offline log syncing.',
    techStack: ['React Native', 'Expo', 'Google Maps API', 'Firebase', 'TypeScript'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['100% Play Store & App Store compliance', 'Background GPS location tracking', 'Offline-first SQLite storage sync']
  },
  {
    id: 'proj-mobile-2',
    title: 'On-Demand Quick Commerce Delivery App',
    category: 'Mobile App',
    client: 'Erode Fresh Grocery Network',
    year: '2026',
    description: 'Consumer ordering app and driver partner mobile app with real-time order status, push notifications, and Razorpay UPI payments.',
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Razorpay SDK', 'Node.js'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['15-minute quick delivery order routing', '4.8 star average rating on Google Play Store', '50,000+ completed local deliveries']
  },
  {
    id: 'proj-mobile-3',
    title: 'Fitness & Gym Member Companion App',
    category: 'Mobile App',
    client: 'FitPulse Wellness Studio',
    year: '2026',
    description: 'Mobile health companion featuring QR code gym check-ins, custom workout plans, trainer chat, and automated monthly subscription renewals.',
    techStack: ['React Native', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Reduced membership churn by 28%', 'Automated QR attendance check-in', 'Integrated diet calculator']
  },

  // ------------------- 3. SAAS PLATFORM (3 Projects) -------------------
  {
    id: 'proj-saas-1',
    title: 'Automated SaaS Billing & Subscription Engine',
    category: 'SaaS Platform',
    client: 'MUCO Labs Internal & Partner SaaS',
    year: '2026',
    description: 'Multi-tenant subscription recurring payments platform featuring usage-based billing, Razorpay & Stripe webhooks, auto-invoicing, and telemetry dashboard.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'Stripe', 'Razorpay', 'Drizzle ORM'],
    status: 'In Active Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Multi-currency support (INR, USD)', 'Automated GST tax calculation', 'Self-serve customer billing portal']
  },
  {
    id: 'proj-saas-2',
    title: 'Multi-Tenant Hospital & Diagnostic SaaS',
    category: 'SaaS Platform',
    client: 'Apex Healthcare Network',
    year: '2026',
    description: 'Cloud hospital information system handling patient electronic health records, lab report PDF generators, doctor appointment booking, and billing.',
    techStack: ['React 18', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['DISHA / HIPAA privacy compliant', 'Automated SMS & WhatsApp report links', 'Used across 12 diagnostic clinics']
  },
  {
    id: 'proj-saas-3',
    title: 'Academy & Student LMS SaaS Platform',
    category: 'SaaS Platform',
    client: 'Horizon Educational Trust',
    year: '2026',
    description: 'All-in-one learning management system for schools and coaching institutes, supporting online video lectures, quizzes, fee collection, and parent portals.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'Node.js'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Serves 8,000+ active students', 'Automated online test grading', 'Parent attendance notification system']
  },

  // ------------------- 4. AI & AUTOMATION (3 Projects) -------------------
  {
    id: 'proj-ai-1',
    title: 'AI Smart Customer Support Bot',
    category: 'AI & Automation',
    client: 'South-India Retail Group',
    year: '2026',
    description: 'Custom Gemini-powered customer assistant integrated with WhatsApp Business API and web chat widget for automated catalog search, FAQs, and lead routing.',
    techStack: ['Gemini 2.5 Flash', 'Node.js', 'WhatsApp API', 'Tailwind CSS', 'Express'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['24/7 instant customer responses', 'Handled 15,000+ customer queries/mo', 'Seamless human agent handover']
  },
  {
    id: 'proj-ai-2',
    title: 'AI Document & Invoice OCR Parsing Engine',
    category: 'AI & Automation',
    client: 'Regional Accounting & Tax Advisory',
    year: '2026',
    description: 'Automated invoice and receipt extraction pipeline using Gemini Vision AI and Python to parse scanned paper bills into structured Tally / GST JSON data.',
    techStack: ['Gemini Vision API', 'Python', 'FastAPI', 'React 18', 'Tailwind CSS'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['99.2% OCR extraction accuracy', 'Saved 120+ manual data entry hours/mo', 'One-click Tally XML export']
  },
  {
    id: 'proj-ai-3',
    title: 'AI Real Estate Lead Qualification Agent',
    category: 'AI & Automation',
    client: 'Urban Realty Group',
    year: '2026',
    description: 'Intelligent AI phone and chat sales assistant that engages website visitors, qualifies buyers based on budget and preferred location, and books site visits.',
    techStack: ['Gemini 2.5 Flash', 'Node.js', 'Twilio API', 'Webhooks'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['3.5x boost in qualified site visit bookings', 'Automated CRM lead sync', 'Zero response lag for web inquiries']
  },

  // ------------------- 5. DIGITAL MARKETING & SEO (3 Projects) -------------------
  {
    id: 'proj-mktg-1',
    title: 'Omnichannel E-Commerce SEO Growth Campaign',
    category: 'Digital Marketing & SEO',
    client: 'Handloom Heritage Stores',
    year: '2026',
    description: 'Comprehensive technical SEO audit, high-volume keyword optimization, content marketing strategy, and Google Search Console backlink campaign.',
    techStack: ['Google Search Console', 'GA4 Analytics', 'Semrush', 'Ahrefs'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['+240% organic search traffic growth', '#1 Google rank for 18 target keywords', 'Zero-to-100k organic visitors in 6 months']
  },
  {
    id: 'proj-mktg-2',
    title: 'High-ROI Meta & Google Performance Ads',
    category: 'Digital Marketing & SEO',
    client: 'Multi-Specialty Dental & Eye Clinic',
    year: '2026',
    description: 'Precision Meta Ads and Google Search PPC campaign targeting local healthcare patients with custom landing pages and conversion tracking.',
    techStack: ['Google Ads', 'Meta Ads Manager', 'Meta Pixel', 'GA4'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['4.8x Return on Ad Spend (ROAS)', '120+ qualified patient appointments monthly', '₹180 average cost per lead']
  },
  {
    id: 'proj-mktg-3',
    title: 'Local SEO & B2B Lead Engine Overhaul',
    category: 'Digital Marketing & SEO',
    client: 'Industrial Machinery Manufacturers Erode',
    year: '2026',
    description: 'Google Business Profile optimization, local citation building, and targeted B2B Google Ads funnel for textile machine exporters.',
    techStack: ['Google Business Profile', 'Google Ads', 'Looker Studio'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Dominates top 3 local map pack', '+180% increase in direct phone calls', 'Consistent flow of high-value industrial RFQs']
  },

  // ------------------- 6. UI/UX & BRANDING (3 Projects) -------------------
  {
    id: 'proj-brand-1',
    title: 'Complete Corporate Brand Identity & Design System',
    category: 'UI/UX & Branding',
    client: 'NextGen Clean Energy Solutions',
    year: '2026',
    description: 'End-to-end brand strategy including vector logo design, brand style guidelines, color token palettes, typography pairings, and stationery mockups.',
    techStack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Tailwind Design System'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Award-winning visual identity', 'Comprehensive 40-page brand guide book', '100% scalable Figma token library']
  },
  {
    id: 'proj-brand-2',
    title: 'Fintech Mobile App UI/UX Redesign',
    category: 'UI/UX & Branding',
    client: 'PayFlow Technologies',
    year: '2026',
    description: 'User research, wireframing, interactive prototyping, and micro-interaction animations for a modern mobile payment and digital wallet app.',
    techStack: ['Figma', 'Protopie', 'Lottie Animations', 'User Testing'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Usability testing task completion rate 98%', 'Reduced payment checkout steps from 5 to 2', 'Clean dark mode UI system']
  },
  {
    id: 'proj-brand-3',
    title: 'SaaS Landing Page Design & Copywriting',
    category: 'UI/UX & Branding',
    client: 'CloudMetrics Software',
    year: '2026',
    description: 'Conversion-rate optimized landing page design paired with high-impact sales copywriting, custom iconography, and hero graphics.',
    techStack: ['Figma', 'Tailwind CSS', 'Copywriting', 'Illustrator'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Doubled visitor-to-trial conversion rate', 'Clear value proposition messaging', 'Responsive layout for all screen sizes']
  },

  // ------------------- 7. CLOUD & IT CONSULTING (3 Projects) -------------------
  {
    id: 'proj-consult-1',
    title: 'Official WhatsApp Business API Automation Portal',
    category: 'Cloud & IT Consulting',
    client: 'Retail Chain Network South India',
    year: '2026',
    description: 'Enterprise setup of Meta WhatsApp Business API with official Green Tick verification, automated promotional broadcasting, and multi-agent inbox.',
    techStack: ['WhatsApp Business API', 'Node.js', 'Redis', 'Express', 'Docker'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Official Meta Green Tick badge obtained', 'Broadcasted 100,000+ offer messages', '45% open rate on promotional messages']
  },
  {
    id: 'proj-consult-2',
    title: 'AWS Cloud Migration & Infrastructure Security Audit',
    category: 'Cloud & IT Consulting',
    client: 'Enterprise Solutions Ltd',
    year: '2026',
    description: 'Seamless migration of legacy physical servers to AWS Cloud (ECS, RDS, S3, CloudFront) with zero downtime and hardened CIS security benchmarks.',
    techStack: ['AWS', 'Docker', 'Terraform', 'PostgreSQL', 'CloudFront'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Reduced monthly cloud infrastructure cost by 35%', '99.99% uptime guarantee achieved', 'Automated daily backup & disaster recovery']
  },
  {
    id: 'proj-consult-3',
    title: 'Docker & Microservices DevOps Architecture Advisory',
    category: 'Cloud & IT Consulting',
    client: 'FinTech Scaleup India',
    year: '2026',
    description: 'CTO-level consultation and implementation of containerized microservices architecture with automated GitHub Actions CI/CD deployment pipelines.',
    techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Node.js', 'Go'],
    status: 'Completed & Live',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    liveUrl: '#',
    highlights: ['Zero-downtime rolling deployments', 'Deployment time reduced from 2 hours to 3 minutes', 'Scales automatically up to 10k req/sec']
  }
];
