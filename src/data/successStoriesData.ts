import { SuccessStory } from '../types';

export const CLIENT_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-textile-erp',
    clientName: 'Textile Manufacturers Consortium',
    clientIndustry: 'Textile & Manufacturing',
    clientLocation: 'Erode, Tamil Nadu',
    projectTitle: 'Cloud ERP & Automated GST Supply Chain Portal',
    category: 'Enterprise ERP',
    summary: 'Streamlined multi-unit textile manufacturing operations with real-time inventory tracking, dispatch logging, and instant GST e-invoicing.',
    challenge: 'Legacy paper-based billing and fragmented Excel sheets caused frequent inventory mismatches, delayed order dispatches, and manual GST calculation errors across 4 manufacturing units.',
    solution: 'MUCO Labs engineered a unified cloud-native ERP portal using React, Node.js, and PostgreSQL with automated inventory reorder alerts, role-based vendor access, and 1-click GST e-way bill generation.',
    keyOutcomes: [
      { metric: '45%', label: 'Dispatch Latency Reduction' },
      { metric: '100%', label: 'GST Compliance Accuracy' },
      { metric: '₹14L+', label: 'Annual Operational Cost Saved' }
    ],
    testimonial: {
      quote: "MUCO Labs delivered a tailored ERP system that completely digitized our supply chain. What used to take hours of manual reconciling is now automated in seconds.",
      author: 'K. Rajasekar',
      role: 'Managing Director, Textile Manufacturers Consortium',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  },
  {
    id: 'story-spices-b2b',
    clientName: 'South Indian Organic Spices',
    clientIndustry: 'Agri-Tech & Export',
    clientLocation: 'Coimbatore, India',
    projectTitle: 'Multi-Vendor B2B Export Marketplace',
    category: 'Web Development',
    summary: 'Empowered agricultural producers to list bulk organic products and receive international wholesale inquiries with multi-currency checkout.',
    challenge: 'Middlemen and lack of direct digital reach restricted regional spice farmers from expanding into overseas bulk export markets in Europe and the Middle East.',
    solution: 'Built an ultra-fast Next.js 15 export platform featuring real-time FX currency conversions, automated sample booking, freight calculator integrations, and sub-second catalog search.',
    keyOutcomes: [
      { metric: '3.2x', label: 'Growth in Overseas Buyer Enquiries' },
      { metric: '10,000+', label: 'Active Bulk SKUs Managed' },
      { metric: '99/100', label: 'Lighthouse Performance Score' }
    ],
    testimonial: {
      quote: "The B2B export portal built by MUCO Labs allowed us to connect directly with bulk buyers in Dubai and Hamburg. Our sales pipeline tripled within 4 months.",
      author: 'P. Anand',
      role: 'Head of Global Exports, South Indian Organic Spices',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['Next.js 15', 'TypeScript', 'Stripe', 'Redis', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  },
  {
    id: 'story-fleet-app',
    clientName: 'Logistics Enterprise India',
    clientIndustry: 'Transportation & Logistics',
    clientLocation: 'Salem, Tamil Nadu',
    projectTitle: 'Cross-Platform Mobile GPS Fleet Management App',
    category: 'Mobile App',
    summary: 'High-precision iOS & Android mobile fleet tracker providing driver route optimization, proof-of-delivery signatures, and offline log sync.',
    challenge: 'Fleet managers struggled with unverified driver delivery logs, high fuel wastage from inefficient routing, and zero visibility into off-grid highway routes.',
    solution: 'Engineered a React Native mobile application with background GPS positioning, offline SQLite database sync, turn-by-turn route optimization, and digital signature capture.',
    keyOutcomes: [
      { metric: '22%', label: 'Fuel Consumption Saved' },
      { metric: '100%', label: 'Proof-of-Delivery Verification' },
      { metric: '150+', label: 'Active Trucks Tracked Live' }
    ],
    testimonial: {
      quote: "Our drivers love the simplicity of the app, and our dispatchers have 100% live visibility. MUCO Labs delivered a flawless mobile solution on budget.",
      author: 'S. Loganathan',
      role: 'Chief Logistics Officer, Logistics Enterprise India',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['React Native', 'Expo', 'Google Maps API', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  },
  {
    id: 'story-ai-bot',
    clientName: 'Apex HealthCare Clinics',
    clientIndustry: 'Healthcare & Wellness',
    clientLocation: 'Chennai, India',
    projectTitle: '24/7 AI Patient Assistant & Triage Automation',
    category: 'AI & Automation',
    summary: 'AI-driven conversational agent automating appointment bookings, medical inquiry triaging, and automated WhatsApp appointment reminders.',
    challenge: 'Clinic reception staff spent over 5 hours daily handling repetitive phone inquiries, leading to missed patient appointments and delayed urgent care responses.',
    solution: 'Deployed a custom Gemini AI agent integrated with WhatsApp Business API and clinic database, enabling instant multi-lingual patient triaging and automatic Google Calendar booking.',
    keyOutcomes: [
      { metric: '80%', label: 'Routine Phone Inquiries Automated' },
      { metric: '< 5s', label: 'Average Response Time' },
      { metric: '35%', label: 'Reduction in No-Show Appointments' }
    ],
    testimonial: {
      quote: "The AI Assistant handles hundreds of patient inquiries every night in Tamil and English seamlessly. It has transformed our clinic's patient experience.",
      author: 'Dr. M. Vidhya',
      role: 'Medical Director, Apex HealthCare',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['Gemini API', 'Node.js', 'WhatsApp API', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  },
  {
    id: 'story-fresh-delivery',
    clientName: 'Erode Fresh Grocery Network',
    clientIndustry: 'Retail & Quick Commerce',
    clientLocation: 'Erode, Tamil Nadu',
    projectTitle: '15-Minute Hyperlocal Quick Commerce App',
    category: 'Mobile App',
    summary: 'End-to-end mobile app ecosystem with customer ordering app, dark store picker interface, and driver partner routing app with Razorpay UPI.',
    challenge: 'Local grocery chains faced intense competition from national delivery giants but lacked a dedicated mobile app and real-time order dispatch mechanism.',
    solution: 'Designed and launched dual Flutter applications backed by Firebase real-time database, enabling automated order routing to nearest dark stores within 30 seconds.',
    keyOutcomes: [
      { metric: '50,000+', label: 'Deliveries Completed' },
      { metric: '4.8 ★', label: 'Rating on Play Store' },
      { metric: '14 Mins', label: 'Avg Fulfillment Duration' }
    ],
    testimonial: {
      quote: "MUCO Labs helped us compete directly with national delivery apps. Their app speed and UI smoothness received overwhelming praise from our customers.",
      author: 'V. Senthil Kumar',
      role: 'Founder, Erode Fresh Grocery Network',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Razorpay SDK', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  },
  {
    id: 'story-billing-saas',
    clientName: 'SaaSify Enterprise Tech',
    clientIndustry: 'Software & Cloud',
    clientLocation: 'Bengaluru, India',
    projectTitle: 'Multi-Tenant Subscription & Usage Billing Engine',
    category: 'SaaS Platform',
    summary: 'Automated recurring billing infrastructure with usage-based metered invoicing, webhook reconciliations, and self-serve customer management.',
    challenge: 'Manual subscription billing and invoice creation led to revenue leakage and delayed payment collection for growing B2B SaaS tiers.',
    solution: 'Built a robust multi-tenant billing engine with Stripe and Razorpay integrations, automated tax invoices, and real-time revenue analytics dashboards.',
    keyOutcomes: [
      { metric: '$120k+', label: 'Monthly Recurring Revenue Billed' },
      { metric: '0%', label: 'Failed Billing Webhook Losses' },
      { metric: '99.99%', label: 'Platform Uptime Maintained' }
    ],
    testimonial: {
      quote: "The recurring billing architecture designed by MUCO Labs scales flawlessly. Our finance team freed up 20 hours a week previously lost to manual invoicing.",
      author: 'R. Kirthi',
      role: 'Co-Founder & CTO, SaaSify Tech',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    techStack: ['Next.js 15', 'Tailwind CSS', 'Stripe', 'Razorpay', 'Drizzle ORM'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    year: '2026',
    featured: true
  }
];
