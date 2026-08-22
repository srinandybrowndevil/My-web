import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  ShieldCheck,
  Clock,
  Wrench,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calculator,
  Calendar,
  Headphones,
  Zap,
  FileText,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Layers,
  Globe,
  Building2,
  ShoppingBag,
  Code2,
  Check,
  Plus,
  RefreshCw,
  Info,
  Compass,
  Cpu,
  MessageSquare,
  Bot,
  Layout,
  Smartphone,
  Palette,
  BarChart3,
  SearchCheck,
  Target,
  Megaphone,
  Briefcase,
  PenTool,
  Layers3,
  Box,
  Compass as CompassIcon,
  Ruler,
  Maximize2,
  Sliders,
  FileSpreadsheet,
  CheckSquare,
  PhoneCall,
  Server,
  Key,
  Shield,
  CreditCard,
  Flame,
  Award
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from './Breadcrumbs';

interface PricingMaintenanceViewProps {
  initialSection?: string;
  onNavigateToContactWithItem: (itemTitle: string) => void;
}

// Data Structures
interface PricingCardItem {
  id: string;
  targetIds?: string[];
  title: string;
  price: string;
  numericPrice: number;
  period?: string;
  category: string;
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

interface AutoCADItem {
  id: string;
  targetIds?: string[];
  title: string;
  price: string;
  numericPrice: number;
  unit?: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
}

export const PricingMaintenanceView: React.FC<PricingMaintenanceViewProps> = ({
  initialSection = 'all',
  onNavigateToContactWithItem,
}) => {
  const { showToast } = useToast();

  const handleSelectItem = (itemTitle: string) => {
    showToast(`Selected "${itemTitle}". Redirecting to Inquiry Form...`, 'info', 'Package Selected');
    onNavigateToContactWithItem(itemTitle);
  };

  const [activeTab, setActiveTab] = useState<string>(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Deep-link hash navigation effect
  useEffect(() => {
    const handleHashScroll = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash) return;

      // Ensure all tabs and items are visible
      setActiveTab('all');
      setSearchQuery('');

      setTimeout(() => {
        const el = document.getElementById(rawHash);
        if (el) {
          const headerOffset = 95; // Account for fixed header height
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });

          setHighlightedId(rawHash);

          const timer = setTimeout(() => {
            setHighlightedId(null);
          }, 3200);

          return () => clearTimeout(timer);
        }
      }, 150);
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  // Calculator state
  const [calcDevTier, setCalcDevTier] = useState<number>(24999);
  const [calcMaintTier, setCalcMaintTier] = useState<number>(7999);
  const [calcHostingTier, setCalcHostingTier] = useState<number>(3000);
  const [calcDomainTier, setCalcDomainTier] = useState<number>(1200);
  const [calcSslTier, setCalcSslTier] = useState<number>(0);
  const [calcAiApiTier, setCalcAiApiTier] = useState<number>(2500);

  // SECTION 4 - Product Pricing Data
  const websitePricing: PricingCardItem[] = [
    {
      id: 'web-landing',
      title: 'Landing Page',
      price: '₹9,999',
      numericPrice: 9999,
      period: 'onwards',
      category: 'Website Development',
      description: 'High-converting single-page website with fast load speeds and modern animations.',
      features: ['1 Custom Page', 'Responsive Mobile Design', 'Lead Capture Form', 'SEO Meta Tags', '1 Month Free Support'],
      icon: <Globe className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'web-business',
      title: 'Business Website',
      price: '₹24,999',
      numericPrice: 24999,
      period: 'onwards',
      category: 'Website Development',
      popular: true,
      badge: 'Most Popular',
      description: 'Multi-page corporate web application with blog integration and analytics.',
      features: ['Up to 10 Pages', 'CMS / Blog Setup', 'WhatsApp Chat Integration', 'Advanced On-Page SEO', '3 Months Free Support'],
      icon: <Building2 className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'web-ecom',
      title: 'E-Commerce Website',
      price: '₹49,999',
      numericPrice: 49999,
      period: 'onwards',
      category: 'Website Development',
      description: 'Full-featured online store with Razorpay/Stripe checkout, order, and inventory management.',
      features: ['Unlimited Products', 'Payment Gateway Integration', 'Order Management Portal', 'Automated Email/SMS Alerts', '3 Months Free Support'],
      icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'web-custom-app',
      targetIds: ['custom-software', 'saas-platform'],
      title: 'Custom Web Application',
      price: '₹79,999',
      numericPrice: 79999,
      period: 'onwards',
      category: 'Website Development',
      description: 'Tailor-made SaaS web app built with React, Node.js, and Cloud SQL/Firestore database.',
      features: ['Custom Database & API', 'User Auth & Role Control', 'Real-time Dashboard', 'Cloud Deployment & CI/CD', '6 Months Free Support'],
      icon: <Code2 className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'web-crm',
      targetIds: ['crm-erp'],
      title: 'CRM Development',
      price: '₹1,20,000',
      numericPrice: 120000,
      period: 'onwards',
      category: 'Website Development',
      description: 'Custom Customer Relationship Management software built for your business sales pipeline.',
      features: ['Lead & Deal Pipeline', 'Automated Lead Assignment', 'Custom Reporting & Charts', 'WhatsApp & Email Automation', '1 Year Free Support'],
      icon: <BarChart3 className="w-5 h-5 text-cyan-500" />
    },
    {
      id: 'web-erp',
      title: 'ERP Development',
      price: '₹2,50,000',
      numericPrice: 250000,
      period: 'onwards',
      category: 'Website Development',
      description: 'Enterprise Resource Planning software for inventory, HR, payroll, and billing management.',
      features: ['Inventory & Warehouse Control', 'GST Billing & Invoicing', 'HR & Payroll Management', 'Role-based Permissions', '1 Year Dedicated SLA Support'],
      icon: <Layers3 className="w-5 h-5 text-amber-500" />
    }
  ];

  const mobileAppsPricing: PricingCardItem[] = [
    {
      id: 'app-android',
      title: 'Android App',
      price: '₹49,999',
      numericPrice: 49999,
      period: 'onwards',
      category: 'Mobile Apps',
      description: 'Native Kotlin/Flutter Android application published on Google Play Store.',
      features: ['Native Performance', 'Push Notifications', 'Offline Caching', 'Play Store Publishing Support', '3 Months Free Maintenance'],
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'app-ios',
      title: 'iOS App',
      price: '₹69,999',
      numericPrice: 69999,
      period: 'onwards',
      category: 'Mobile Apps',
      description: 'Premium Swift/Flutter iOS app built specifically for iPhone & iPad ecosystem.',
      features: ['Apple Design Guidelines', 'In-App Purchases', 'Apple Wallet/Pay Setup', 'App Store Review Guidance', '3 Months Free Maintenance'],
      icon: <Smartphone className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'app-cross',
      title: 'Cross Platform App',
      price: '₹89,999',
      numericPrice: 89999,
      period: 'onwards',
      category: 'Mobile Apps',
      popular: true,
      badge: 'Best Value',
      description: 'Dual iOS & Android mobile application with a single code base for maximum cost efficiency.',
      features: ['iOS + Android Dual Release', 'Shared Firebase/Node Backend', 'Push Notifications & Analytics', 'Biometric Auth Integration', '6 Months Free Maintenance'],
      icon: <Smartphone className="w-5 h-5 text-purple-500" />
    }
  ];

  const aiPricing: PricingCardItem[] = [
    {
      id: 'ai-chatbot',
      targetIds: ['ai-chatbots'],
      title: 'AI Chatbot',
      price: '₹29,999',
      numericPrice: 29999,
      period: 'onwards',
      category: 'AI & Automation',
      description: 'Custom trained Gemini AI chatbot for website lead capture and support automation.',
      features: ['Trained on Business Docs', 'Instant 24/7 Customer Answers', 'Lead Capture to CRM', 'Custom Brand Styling', '3 Months Support'],
      icon: <Bot className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'ai-whatsapp',
      title: 'WhatsApp Automation',
      price: '₹19,999',
      numericPrice: 19999,
      period: 'onwards',
      category: 'AI & Automation',
      description: 'Official WhatsApp Business Cloud API integration for automated order alerts and broadcasts.',
      features: ['Green Tick Application Help', 'Automated Instant Replies', 'Bulk Broadcast Engine', 'Payment Link Integration', '3 Months Support'],
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'ai-crm-auto',
      title: 'CRM Automation',
      price: '₹39,999',
      numericPrice: 39999,
      period: 'onwards',
      category: 'AI & Automation',
      description: 'Automate sales workflows, follow-up emails, and WhatsApp reminders automatically.',
      features: ['Lead Auto-Assignment', 'Email & SMS Nurturing Sequences', 'AI Lead Quality Scoring', 'Slack/Team Notifications', '3 Months Support'],
      icon: <Cpu className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'ai-assistant',
      targetIds: ['ai-agents'],
      title: 'AI Business Assistant',
      price: '₹99,999',
      numericPrice: 99999,
      period: 'onwards',
      category: 'AI & Automation',
      popular: true,
      badge: 'Enterprise AI',
      description: 'Autonomous AI agent to automate data entry, document processing, and report generation.',
      features: ['Multimodal Document Extraction', 'RAG Knowledge Base Integration', 'Automated Daily Reports', 'Custom API Connectors', '6 Months Dedicated SLA'],
      icon: <Sparkles className="w-5 h-5 text-purple-500" />
    }
  ];

  const marketingPricing: PricingCardItem[] = [
    {
      id: 'mkt-seo',
      targetIds: ['seo'],
      title: 'SEO (Search Engine Optimization)',
      price: '₹10,000',
      numericPrice: 10000,
      period: '/month',
      category: 'Digital Marketing',
      description: 'Rank on Page 1 of Google with technical, on-page, and keyword-driven backlink strategies.',
      features: ['Keyword Research & Strategy', 'On-Page & Speed Optimization', 'Monthly Backlink Building', 'Google Business Profile Setup', 'Monthly Keyword Rank Reports'],
      icon: <SearchCheck className="w-5 h-5 text-cyan-500" />
    },
    {
      id: 'mkt-gads',
      title: 'Google Ads',
      price: '₹15,000',
      numericPrice: 15000,
      period: '/month',
      category: 'Digital Marketing',
      description: 'High-ROI Google Search, Display, and Shopping PPC campaigns to capture ready buyers.',
      features: ['Campaign Setup & Structure', 'High-Intent Keyword Targeting', 'Negative Keyword Management', 'A/B Ad Copy Testing', 'Weekly Performance Analytics'],
      icon: <Target className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'mkt-meta',
      title: 'Meta Ads (FB & Instagram)',
      price: '₹15,000',
      numericPrice: 15000,
      period: '/month',
      category: 'Digital Marketing',
      description: 'Targeted Instagram & Facebook lead generation and retargeting visual campaigns.',
      features: ['Audience Persona Targeting', 'Ad Creative & Video Design', 'Lead Form Setup', 'Retargeting Pixel Campaigns', 'Weekly Optimization'],
      icon: <Megaphone className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'mkt-smm',
      title: 'Social Media Management',
      price: '₹12,000',
      numericPrice: 12000,
      period: '/month',
      category: 'Digital Marketing',
      description: 'Build brand presence with 12-15 custom monthly social graphics, reels, and community management.',
      features: ['12 Custom Graphics / Month', '4 Engaging Reels / Shorts', 'Caption Writing & Hashtags', 'Profile Bio Optimization', 'Monthly Audience Growth Report'],
      icon: <Palette className="w-5 h-5 text-rose-500" />
    }
  ];

  const creativePricing: PricingCardItem[] = [
    {
      id: 'creative-logo',
      title: 'Logo Design',
      price: '₹2,999',
      numericPrice: 2999,
      period: 'onwards',
      category: 'Creative Branding',
      description: 'Vector logo design crafted by professional graphic designers.',
      features: ['3 Initial Design Concepts', 'High-Res Vector Files (SVG, PNG, AI)', 'Full Ownership Rights', 'Color & Monochromatic Variants'],
      icon: <PenTool className="w-5 h-5 text-pink-500" />
    },
    {
      id: 'creative-identity',
      targetIds: ['branding'],
      title: 'Brand Identity',
      price: '₹9,999',
      numericPrice: 9999,
      period: 'onwards',
      category: 'Creative Branding',
      popular: true,
      description: 'Complete brand guide including color palettes, typography, business cards, and stationery.',
      features: ['Logo + Brand Guidelines Book', 'Business Card & Letterhead', 'Social Media Branding Kit', 'Font & Color System'],
      icon: <Palette className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'creative-uiux',
      targetIds: ['ui-ux'],
      title: 'UI/UX Design',
      price: '₹14,999',
      numericPrice: 14999,
      period: 'onwards',
      category: 'Creative Branding',
      description: 'Figma wireframes and high-fidelity interactive UI design for web or mobile apps.',
      features: ['User Journey Mapping', 'Figma Interactive Prototypes', 'Design System Components', 'Developer Handoff Ready'],
      icon: <Layout className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'creative-marketing',
      title: 'Marketing Creatives',
      price: '₹999',
      numericPrice: 999,
      period: 'onwards',
      category: 'Creative Branding',
      description: 'High-impact banners, brochures, flyers, or social media promo graphics.',
      features: ['Single High-Res Banner / Poster', 'Print Ready CMYK PDF', 'Source File Delivery', '2 Free Revisions'],
      icon: <Megaphone className="w-5 h-5 text-emerald-500" />
    }
  ];

  const consultingPricing: PricingCardItem[] = [
    {
      id: 'consult-startup',
      targetIds: ['it-consulting'],
      title: 'Startup Consulting',
      price: '₹5,000',
      numericPrice: 5000,
      period: '/session',
      category: 'Business Consulting',
      description: '1-on-1 strategic session on MVP roadmap, tech stack choice, and architecture design.',
      features: ['60-Minute Deep Dive Video Call', 'MVP Architecture Roadmap', 'Tech Stack Evaluation', 'Written Action Plan Report'],
      icon: <Briefcase className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'consult-tech',
      title: 'Technology Consulting',
      price: '₹7,500',
      numericPrice: 7500,
      period: '/session',
      category: 'Business Consulting',
      description: 'Cloud migration, security compliance, and scalability audit for existing tech stacks.',
      features: ['60-Minute Expert Technical Audit', 'Security & Bottleneck Identification', 'Cloud Cost Optimization Tips', 'Architecture Diagram'],
      icon: <Cpu className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'consult-auto',
      title: 'Business Automation',
      price: '₹15,000',
      numericPrice: 15000,
      period: 'onwards',
      category: 'Business Consulting',
      description: 'End-to-end automation of manual business tasks via Zapier, Make.com, or custom Python scripts.',
      features: ['Workflow Discovery & Mapping', 'Multi-App Integration Setup', 'Automated Email/Sheet Sync', 'Staff Training & Docs'],
      icon: <Zap className="w-5 h-5 text-emerald-500" />
    }
  ];

  // SECTION 5 - AutoCAD Design Services Data
  const autoCadServices: AutoCADItem[] = [
    {
      id: 'cad-2d-floor',
      title: 'AutoCAD 2D Floor Plan',
      price: '₹999',
      numericPrice: 999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Accurate 2D architectural floor plan with room dimensions, door/window schedules, and wall layouts.',
      deliverables: ['DWG & High-Res PDF Output', 'Dimensioned Room Layouts', '2 Free Revisions'],
      icon: <Ruler className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'cad-2d-house',
      title: 'AutoCAD 2D House Plan',
      price: '₹1,999',
      numericPrice: 1999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Comprehensive residential house plan including site plan, floor layout, and structural grid lines.',
      deliverables: ['Complete Architectural Drawings', 'Vastu Compliant Layouts', 'Plot Boundary Grid'],
      icon: <Box className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'cad-3d-floor',
      targetIds: ['cad-modeling'],
      title: 'AutoCAD 3D Floor Plan',
      price: '₹2,999',
      numericPrice: 2999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Realistic 3D isometric views showing furniture placement, wall depths, and spatial flow.',
      deliverables: ['3D Isometric Renderings', 'Material & Texture Mockups', 'Multiple Viewing Angles'],
      icon: <Maximize2 className="w-5 h-5 text-purple-500" />
    },
    {
      id: 'cad-elevation',
      title: 'Building Elevation Design',
      price: '₹3,999',
      numericPrice: 3999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Front, rear, and side elevation CAD drawings detailing exterior facade materials and heights.',
      deliverables: ['Front & Side Facade Detail', 'Material Callouts', 'Color Scheme Options'],
      icon: <Building2 className="w-5 h-5 text-cyan-500" />
    },
    {
      id: 'cad-interior',
      title: 'Interior Layout Design',
      price: '₹2,499',
      numericPrice: 2499,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Detailed interior spatial drawings including ceiling plans, wall paneling, and custom joinery.',
      deliverables: ['False Ceiling Layouts', 'Furniture Placement Map', 'Lighting Point Coordinates'],
      icon: <Layout className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'cad-electrical',
      title: 'Electrical Layout',
      price: '₹1,999',
      numericPrice: 1999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Full electrical circuit schematic showing switchboard locations, wiring conduits, and DB boxes.',
      deliverables: ['Power & Lighting Circuits', 'Switchboard Legend', 'Load Balancing Wire Map'],
      icon: <Zap className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'cad-plumbing',
      title: 'Plumbing Layout',
      price: '₹1,999',
      numericPrice: 1999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Water supply line and drainage CAD drawings with pipe sizing, slopes, and fixture connections.',
      deliverables: ['Inlet & Outlet Pipe Routes', 'Septic & Overhead Tank Map', 'Sanitary Fixture Callouts'],
      icon: <Sliders className="w-5 h-5 text-teal-500" />
    },
    {
      id: 'cad-structural',
      title: 'Structural Drafting',
      price: '₹2,999',
      numericPrice: 2999,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Foundation, column, beam, and slab rebar structural drawings based on engineer specifications.',
      deliverables: ['Footing & Column Detail', 'Beam Reinforcement Plan', 'Bar Bending Schedule (BBS)'],
      icon: <Layers3 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
    },
    {
      id: 'cad-shop',
      title: 'Shop Drawings',
      price: '₹2,499',
      numericPrice: 2499,
      unit: 'starting',
      category: 'AutoCAD Design',
      description: 'Detailed fabrication drawings for contractors, steel fabricators, and woodworking shops.',
      deliverables: ['Precise Fabrication Dimensions', 'Assembly Connection Views', 'Material Bill of Quantities'],
      icon: <FileSpreadsheet className="w-5 h-5 text-rose-500" />
    },
    {
      id: 'cad-pdf2cad',
      title: 'PDF/Image to AutoCAD',
      price: '₹499',
      numericPrice: 499,
      unit: 'per sheet',
      category: 'AutoCAD Design',
      description: 'Convert scanned PDF blueprints or hand-drawn images into editable 1:1 scale DWG vectors.',
      deliverables: ['Layered .DWG File', 'Cleaned Vector Lines', 'Exact Dimensional Verification'],
      icon: <RefreshCw className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 'cad-sketch2cad',
      title: 'Hand Sketch to CAD',
      price: '₹799',
      numericPrice: 799,
      unit: 'per sheet',
      category: 'AutoCAD Design',
      description: 'Transform rough paper sketches or site measurements into crisp professional CAD drawings.',
      deliverables: ['CAD Standard Layers & Block', 'Dimensioned CAD Drawing', 'Print Ready PDF Sheet'],
      icon: <PenTool className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'cad-mechanical',
      title: 'Mechanical CAD Drafting',
      price: '₹2,499',
      numericPrice: 2499,
      unit: 'onwards',
      category: 'AutoCAD Design',
      description: 'Machine part 2D/3D modeling, assembly drawings, GD&T tolerances, and sheet metal layouts.',
      deliverables: ['Part 2D Orthographic Views', 'Bill of Materials (BOM)', 'STEP / IGES / DWG Format'],
      icon: <Cpu className="w-5 h-5 text-blue-500" />
    },
    {
      id: 'cad-furniture',
      title: 'Furniture CAD Drawing',
      price: '₹999',
      numericPrice: 999,
      unit: 'onwards',
      category: 'AutoCAD Design',
      description: 'Custom furniture carpentry drawings with cut lists, joint details, and hardware placement.',
      deliverables: ['Detailed Carpentry Elevations', 'Plywood Cut List Efficiency', 'Hardware Spec Callouts'],
      icon: <Box className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'cad-revisions',
      title: 'Drawing Revisions',
      price: '₹299',
      numericPrice: 299,
      unit: 'onwards',
      category: 'AutoCAD Design',
      description: 'Quick alterations or dimension adjustments on existing client CAD files.',
      deliverables: ['Fast 24-Hour Turnaround', 'Redline Correction Updates', 'Updated PDF Delivery'],
      icon: <CheckSquare className="w-5 h-5 text-cyan-500" />
    }
  ];

  // Helper search filter across all data
  const filterListBySearch = <T extends { title: string; category: string; description?: string }>(items: T[]) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  };

  const searchedWeb = useMemo(() => filterListBySearch(websitePricing), [searchQuery]);
  const searchedApps = useMemo(() => filterListBySearch(mobileAppsPricing), [searchQuery]);
  const searchedAi = useMemo(() => filterListBySearch(aiPricing), [searchQuery]);
  const searchedMkt = useMemo(() => filterListBySearch(marketingPricing), [searchQuery]);
  const searchedCreative = useMemo(() => filterListBySearch(creativePricing), [searchQuery]);
  const searchedConsulting = useMemo(() => filterListBySearch(consultingPricing), [searchQuery]);
  const searchedAutoCad = useMemo(() => filterListBySearch(autoCadServices), [searchQuery]);

  // Combined product cards total search results check
  const totalProductResults =
    searchedWeb.length +
    searchedApps.length +
    searchedAi.length +
    searchedMkt.length +
    searchedCreative.length +
    searchedConsulting.length;

  // FAQ Items
  const faqData = [
    {
      q: 'Is hosting included in software development packages?',
      a: 'Basic hosting setup is guided for free on Vercel, Firebase, or your AWS account. Dedicated cloud server hosting is billed separately based on server specs (starts at ₹3,000/year) or can be bundled into your monthly maintenance retainer.'
    },
    {
      q: 'Can unused maintenance support hours roll over to the next month?',
      a: 'Maintenance retainer developer hours are allocated per monthly billing cycle to guarantee SLA availability. Unused hours do not roll over, but we perform proactive server optimization and security audits during quiet months.'
    },
    {
      q: 'Can I upgrade my maintenance plan at any time?',
      a: 'Yes! You can upgrade your support tier (e.g. from Basic to Professional or Enterprise) at any time. Changes take effect immediately with pro-rated billing for the remainder of the month.'
    },
    {
      q: 'Do you provide 24/7 emergency support for system outages?',
      a: 'Yes, our Enterprise Maintenance plan includes 24x7 real-time uptime monitoring and a sub-2-hour emergency hotline SLA for critical server or website down events.'
    },
    {
      q: 'Do you perform security audits and vulnerability scans?',
      a: 'Yes! All Professional and Enterprise plans receive monthly dependency updates, SSL health checks, and quarterly penetration vulnerability testing.'
    },
    {
      q: 'Are third-party API costs (like OpenAI, WhatsApp, Google Maps) included?',
      a: 'No, third-party API usage fees (e.g., OpenAI tokens, WhatsApp API charges, Google Maps API queries) are billed directly by the respective service providers based on your actual consumption.'
    }
  ];

  // Real-time Calculator Computations
  const calcDevObj = [...websitePricing, ...mobileAppsPricing, ...aiPricing].find(p => p.numericPrice === calcDevTier);
  const calcGstAmount = Math.round((calcDevTier + calcHostingTier + calcDomainTier + calcSslTier + calcAiApiTier) * 0.18);
  const calcOneTimeDevTotal = calcDevTier;
  const calcMonthlyCost = calcMaintTier + calcAiApiTier;
  const calcAnnualInfra = calcHostingTier + calcDomainTier + calcSslTier;
  const calcGrandTotal1stYear = calcOneTimeDevTotal + (calcMonthlyCost * 12) + calcAnnualInfra + calcGstAmount;

  // Render Single Pricing Card
  const renderPricingCard = (item: PricingCardItem) => {
    const isCardHighlighted = Boolean(
      highlightedId && (
        highlightedId === item.id ||
        (item.targetIds && item.targetIds.includes(highlightedId))
      )
    );

    return (
      <motion.div
        key={item.id}
        id={item.id}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`relative bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between ${
          isCardHighlighted
            ? 'border-2 border-blue-500 ring-4 ring-blue-500/80 shadow-2xl shadow-blue-500/25 bg-blue-50/80 dark:bg-blue-950/80 scale-[1.01]'
            : item.popular
            ? 'border-2 border-blue-500/80 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/5'
            : 'border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md'
        }`}
      >
        {/* Invisible anchor elements for target alias IDs */}
        {item.targetIds?.map((aliasId) => (
          <span
            key={aliasId}
            id={aliasId}
            className="absolute -top-24 left-0 w-0 h-0 pointer-events-none opacity-0"
          />
        ))}

        {/* Target Highlight Floating Badge */}
        {isCardHighlighted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-xl z-30 flex items-center gap-1.5 animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Target Package Selected</span>
          </motion.div>
        )}

        {item.badge && !isCardHighlighted && (
          <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
            {item.badge}
          </span>
        )}

        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {item.category}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 min-h-[36px]">
            {item.description}
          </p>

          <div className="bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 mb-5">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block mb-0.5">
              Pricing
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.price}
              </span>
              {item.period && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {item.period}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Key Features Included:
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {item.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => onNavigateToContactWithItem(`Inquiry regarding ${item.title} (${item.price})`)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group ${
            item.popular || isCardHighlighted
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
          }`}
        >
          <span>Get Free Quote</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic SEO Breadcrumbs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          currentPage={initialSection === 'maintenance' ? 'maintenance' : 'pricing'}
          subItem={activeTab !== 'all' ? (activeTab === 'pricing' ? 'Product Pricing Tiers' : activeTab === 'maintenance' ? 'AMC Maintenance Plans' : activeTab.toUpperCase()) : undefined}
        />
      </div>

      {/* SECTION 1 – HERO */}
      <section className="relative overflow-hidden pt-10 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/80 dark:to-indigo-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>MUCO Labs • Premier Tech & Engineering Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Pricing & Maintenance Hub
          </h1>

          <p className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Transparent Pricing. Reliable Support. Long-Term Success.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose the right software development package and maintenance plan for your business. View pricing, compare plans, estimate costs, and understand exactly what is included.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => onNavigateToContactWithItem('General Pricing & Custom Quote Request')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigateToContactWithItem('Contact Us regarding Pricing & SLA')}
              className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl text-xs font-bold shadow-sm transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 – QUICK NAVIGATION (Sticky Tabs) */}
      <section className="sticky top-16 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-2 rounded-2xl shadow-lg flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Services', icon: <Layers className="w-4 h-4" /> },
            { id: 'pricing', label: 'Product Pricing', icon: <Tag className="w-4 h-4" /> },
            { id: 'autocad', label: 'AutoCAD Design', icon: <Ruler className="w-4 h-4" /> },
            { id: 'maintenance', label: 'Maintenance Plans', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'sla', label: 'Support SLA', icon: <Headphones className="w-4 h-4" /> },
            { id: 'calculator', label: 'Cost Estimator', icon: <Calculator className="w-4 h-4" /> },
            { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 – GLOBAL SEARCH */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search packages, maintenance plans, AutoCAD services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* SECTION 4 – PRODUCT PRICING */}
      {(activeTab === 'all' || activeTab === 'pricing') && (
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Product & Software Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Software Development Packages
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Transparent fixed-cost development tiers for web, mobile, AI, marketing, and enterprise consulting.
            </p>
          </div>

          {totalProductResults === 0 && searchQuery && (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching software development packages found for "{searchQuery}".
            </div>
          )}

          {/* Website Development */}
          {searchedWeb.length > 0 && (
            <div
              id="website-development"
              className={`space-y-4 rounded-2xl transition-all duration-500 p-2 ${
                highlightedId === 'website-development'
                  ? 'ring-4 ring-blue-500/80 bg-blue-50/60 dark:bg-blue-950/60 shadow-lg'
                  : ''
              }`}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Website Development</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedWeb.map(renderPricingCard)}
              </div>
            </div>
          )}

          {/* Mobile Apps */}
          {searchedApps.length > 0 && (
            <div
              id="mobile-app-development"
              className={`space-y-4 pt-4 rounded-2xl transition-all duration-500 p-2 ${
                highlightedId === 'mobile-app-development'
                  ? 'ring-4 ring-blue-500/80 bg-blue-50/60 dark:bg-blue-950/60 shadow-lg'
                  : ''
              }`}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-500" />
                <span>Mobile Apps</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchedApps.map(renderPricingCard)}
              </div>
            </div>
          )}

          {/* AI & Automation */}
          {searchedAi.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>AI & Automation</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchedAi.map(renderPricingCard)}
              </div>
            </div>
          )}

          {/* Digital Marketing */}
          {searchedMkt.length > 0 && (
            <div
              id="digital-marketing"
              className={`space-y-4 pt-4 rounded-2xl transition-all duration-500 p-2 ${
                highlightedId === 'digital-marketing'
                  ? 'ring-4 ring-blue-500/80 bg-blue-50/60 dark:bg-blue-950/60 shadow-lg'
                  : ''
              }`}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span>Digital Marketing</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchedMkt.map(renderPricingCard)}
              </div>
            </div>
          )}

          {/* Creative Branding */}
          {searchedCreative.length > 0 && (
            <div
              id="branding"
              className={`space-y-4 pt-4 rounded-2xl transition-all duration-500 p-2 ${
                highlightedId === 'branding'
                  ? 'ring-4 ring-blue-500/80 bg-blue-50/60 dark:bg-blue-950/60 shadow-lg'
                  : ''
              }`}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-500" />
                <span>Creative Branding</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchedCreative.map(renderPricingCard)}
              </div>
            </div>
          )}

          {/* Business Consulting */}
          {searchedConsulting.length > 0 && (
            <div
              id="it-consulting"
              className={`space-y-4 pt-4 rounded-2xl transition-all duration-500 p-2 ${
                highlightedId === 'it-consulting'
                  ? 'ring-4 ring-blue-500/80 bg-blue-50/60 dark:bg-blue-950/60 shadow-lg'
                  : ''
              }`}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span>Business Consulting</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {searchedConsulting.map(renderPricingCard)}
              </div>
            </div>
          )}
        </section>
      )}

      {/* SECTION 5 – AUTOCAD DESIGN SERVICES */}
      {(activeTab === 'all' || activeTab === 'autocad') && (
        <section
          id="autocad"
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 transition-all duration-500 rounded-3xl ${
            highlightedId === 'autocad'
              ? 'ring-4 ring-indigo-500/80 bg-indigo-50/40 dark:bg-indigo-950/40 p-4 shadow-xl'
              : ''
          }`}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Architectural & Engineering Drafting
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              AutoCAD Design Services
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Professional 2D/3D CAD drafting, architectural floor plans, electrical schematics, and vector conversion.
            </p>
          </div>

          {searchedAutoCad.length === 0 && searchQuery ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching AutoCAD services found for "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {searchedAutoCad.map((cad) => {
                const isCadHighlighted =
                  highlightedId === cad.id ||
                  (cad.targetIds && cad.targetIds.includes(highlightedId ?? ''));

                return (
                  <motion.div
                    key={cad.id}
                    id={cad.id}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`relative bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                      isCadHighlighted
                        ? 'border-2 border-indigo-500 ring-4 ring-indigo-500/80 bg-indigo-50/80 dark:bg-indigo-950/80 scale-[1.01]'
                        : 'border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    {cad.targetIds?.map((aliasId) => (
                      <span
                        key={aliasId}
                        id={aliasId}
                        className="absolute -top-24 left-0 w-0 h-0 pointer-events-none opacity-0"
                      />
                    ))}

                    {isCadHighlighted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-lg z-30 flex items-center gap-1 animate-bounce"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-300" />
                        <span>Focused CAD Service</span>
                      </motion.div>
                    )}

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          {cad.icon}
                        </div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                          {cad.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                        {cad.description}
                      </p>

                      <div className="bg-slate-50 dark:bg-slate-950/70 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 mb-3 flex items-baseline justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Cost:</span>
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {cad.price}
                          </span>
                          {cad.unit && (
                            <span className="text-[10px] text-slate-500 ml-1">
                              ({cad.unit})
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 mb-4">
                        {cad.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                            <Check className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToContactWithItem(`Inquiry regarding AutoCAD Service: ${cad.title} (${cad.price})`)}
                      className="w-full py-2 px-3 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 group"
                    >
                      <span>Order CAD Service</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* SECTION 6 – ADDITIONAL COSTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Additional Costs & Infrastructure Transparency
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Clear guidelines on third-party licenses, developer store accounts, and government taxes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs border-t border-slate-800 pt-6">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>18% GST Applicable</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                All development and maintenance quotes are exclusive of 18% GST. Tax invoices provided for B2B input credit.
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="font-extrabold text-blue-400 flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>Domain Registration</span>
              </div>
              <p className="text-slate-200 font-bold">₹800 – ₹1,500 / year</p>
              <p className="text-slate-400 leading-relaxed">
                Billed directly via domain registrar (.com, .in, .co.in). Complete DNS configuration included.
              </p>
            </div>

            <div
              id="cloud-services"
              className={`bg-slate-950/70 p-4 rounded-2xl border transition-all duration-500 space-y-1.5 ${
                highlightedId === 'cloud-services'
                  ? 'border-blue-500 ring-4 ring-blue-500/80 bg-blue-950/90 scale-[1.02] shadow-xl'
                  : 'border-slate-800'
              }`}
            >
              <div className="font-extrabold text-indigo-400 flex items-center gap-1.5">
                <Server className="w-4 h-4" />
                <span>Cloud Hosting & Management</span>
              </div>
              <p className="text-slate-200 font-bold">Starts ₹3,000 / year</p>
              <p className="text-slate-400 leading-relaxed">
                Cloud Run, Vercel, or AWS server capacity depending on your website traffic and database scale.
              </p>
            </div>

            <div
              id="database-management"
              className={`bg-slate-950/70 p-4 rounded-2xl border transition-all duration-500 space-y-1.5 ${
                highlightedId === 'database-management'
                  ? 'border-emerald-500 ring-4 ring-emerald-500/80 bg-emerald-950/90 scale-[1.02] shadow-xl'
                  : 'border-slate-800'
              }`}
            >
              <div className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>Developer Accounts & Databases</span>
              </div>
              <p className="text-slate-200 font-bold">Apple: $99/yr | Google: $25</p>
              <p className="text-slate-400 leading-relaxed">
                Official store account fees and managed database architecture (Cloud SQL / Firestore / PostgreSQL).
              </p>
            </div>

            <div
              id="api-development"
              className={`bg-slate-950/70 p-4 rounded-2xl border transition-all duration-500 space-y-1.5 lg:col-span-2 ${
                highlightedId === 'api-development'
                  ? 'border-purple-500 ring-4 ring-purple-500/80 bg-purple-950/90 scale-[1.02] shadow-xl'
                  : 'border-slate-800'
              }`}
            >
              <div className="font-extrabold text-purple-400 flex items-center gap-1.5">
                <Key className="w-4 h-4" />
                <span>API Development & Third Party APIs</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Custom REST/GraphQL APIs plus integrations with <strong className="text-slate-200">OpenAI, Twilio, Google Maps, Razorpay, WhatsApp API</strong>.
              </p>
            </div>

            <div
              id="devops"
              className={`bg-slate-950/70 p-4 rounded-2xl border transition-all duration-500 space-y-1.5 lg:col-span-2 ${
                highlightedId === 'devops'
                  ? 'border-cyan-500 ring-4 ring-cyan-500/80 bg-cyan-950/90 scale-[1.02] shadow-xl'
                  : 'border-slate-800'
              }`}
            >
              <div className="font-extrabold text-cyan-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>DevOps, CI/CD & Additional Development</span>
              </div>
              <p className="text-slate-200 font-bold">₹800 – ₹2,500 / hour</p>
              <p className="text-slate-400 leading-relaxed">
                Automated CI/CD pipelines, Docker containerization, cloud infrastructure deployment, and feature enhancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 – MAINTENANCE PLANS */}
      {(activeTab === 'all' || activeTab === 'maintenance') && (
        <section
          id="maintenance"
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 transition-all duration-500 rounded-3xl ${
            highlightedId === 'maintenance'
              ? 'ring-4 ring-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/40 p-4 shadow-xl'
              : ''
          }`}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Post-Launch SLA Retainers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Maintenance Plans
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Proactive system monitoring, zero downtime backups, bug fixes, and SLA support guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  Starter Retainer
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Basic
                </h3>
                <div className="my-4 p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">₹2,999</span>
                  <span className="text-xs text-slate-500 font-bold"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Bug Fixes & Glitch Patching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Daily Cloud Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Security & Dependency Updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Email Support Desk</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateToContactWithItem('Inquiry regarding Basic Maintenance Plan (₹2,999/mo)')}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
              >
                Choose Basic
              </button>
            </motion.div>

            {/* Professional */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-blue-500 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative"
            >
              <span className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Most Popular
              </span>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                  Recommended for Businesses
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Professional
                </h3>
                <div className="my-4 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-3xl font-black text-white">₹7,999</span>
                  <span className="text-xs text-slate-400 font-bold"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Priority Support (&lt;8 hrs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Performance Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Database Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Monthly Health Reports</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateToContactWithItem('Inquiry regarding Professional Maintenance Plan (₹7,999/mo)')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Choose Professional
              </button>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-500">
                  Mission-Critical Systems
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Enterprise
                </h3>
                <div className="my-4 p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">₹19,999</span>
                  <span className="text-xs text-slate-500 font-bold"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span>Dedicated Engineer Assigned</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span>24x7 Real-time Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span>Emergency Hotline Support (&lt;2 hrs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    <span>Quarterly Security Audits</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateToContactWithItem('Inquiry regarding Enterprise Maintenance Plan (₹19,999/mo)')}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
              >
                Choose Enterprise
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 8 – MAINTENANCE SCHEDULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Automated Execution Cadence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Maintenance Schedule
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clear timetable of automated maintenance tasks performed by our automated tools & devops team.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            {/* Daily */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Daily
                </span>
                <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                  24 Hours
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Automated Database Backups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Server Monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Uptime Checks</span>
                </li>
              </ul>
            </div>

            {/* Weekly */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Weekly
                </span>
                <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                  Every Sunday
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>SSL Health Check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Security Patch Audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Database Cleanup</span>
                </li>
              </ul>
            </div>

            {/* Monthly */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Monthly
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  End of Month
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Framework Updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>SDK Updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Performance Reports</span>
                </li>
              </ul>
            </div>

            {/* Quarterly */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Quarterly
                </span>
                <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                  Every 90 Days
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Security Audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Penetration Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Code Refactoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 – SUPPORT SLA */}
      {(activeTab === 'all' || activeTab === 'sla') && (
        <section id="sla" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Response Speed Guarantees
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Support SLA Comparison
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Guaranteed turnaround times and communication channels based on your plan level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Included in Basic
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Standard SLA
              </h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Response Time:</span>
                <span className="text-slate-900 dark:text-white font-black">Within 24 Hours</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Email support desk assistance for non-critical bug reports and content updates.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl border-2 border-blue-500 shadow-xl shadow-blue-500/10 space-y-4 relative">
              <span className="absolute -top-3.5 right-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Recommended
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                Included in Professional
              </span>
              <h3 className="text-lg font-black text-white">
                Priority SLA
              </h3>
              <div className="p-3 bg-slate-950 rounded-xl text-xs font-bold text-slate-200 flex justify-between border border-slate-800">
                <span>Response Time:</span>
                <span className="text-blue-400 font-black">Within 8 Hours</span>
              </div>
              <p className="text-xs text-slate-300">
                Email + Dedicated WhatsApp Group + Slack Channel for direct developer communication.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-500">
                Included in Enterprise
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Enterprise SLA
              </h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Response Time:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">Within 2 Hours</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                24x7 Emergency Phone Hotline & Dedicated Lead Engineer assigned to your account.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10 – SERVICE COVERAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Scope Boundaries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Service Coverage
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clear contrast between tasks covered under monthly retainer vs items requiring a separate project quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Covered */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 space-y-4">
            <h3 className="text-base font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Covered Under Maintenance Retainer</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bug Fixes & Code Debugging</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Security & Dependency Updates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Performance Optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated Daily Cloud Backups</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Server & Uptime Monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Minor UI Fixes & Text Revisions</span>
              </li>
            </ul>
          </div>

          {/* Not Covered */}
          <div className="bg-rose-50/60 dark:bg-rose-950/20 p-6 rounded-3xl border border-rose-200 dark:border-rose-800/60 space-y-4">
            <h3 className="text-base font-black text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Not Covered (Requires New Quote / SOW)</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Building Completely New Features</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Major UI/UX Website Redesign</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Platform Framework Migration</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Developing New Software Modules</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Third-Party API & License Subscriptions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 11 – COST ESTIMATOR */}
      {(activeTab === 'all' || activeTab === 'calculator') && (
        <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Real-Time Estimator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Cost Estimator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Customize your development package, maintenance plan, and infrastructure to calculate your 1st Year Total Cost of Ownership (TCO).
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Estimated 1st Year TCO</span>
                <span className="text-3xl font-black text-emerald-400">
                  ₹{calcGrandTotal1stYear.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* Dev Tier */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                    <span>1. Development Package:</span>
                    <span className="text-blue-400">₹{calcDevTier.toLocaleString('en-IN')}</span>
                  </label>
                  <select
                    value={calcDevTier}
                    onChange={(e) => setCalcDevTier(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...websitePricing, ...mobileAppsPricing, ...aiPricing].map((p) => (
                      <option key={p.id} value={p.numericPrice}>
                        {p.title} ({p.price}) - {p.category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Maintenance Tier */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                    <span>2. Maintenance Plan:</span>
                    <span className="text-emerald-400">₹{calcMaintTier.toLocaleString('en-IN')} / mo</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { title: 'Basic', price: 2999 },
                      { title: 'Professional', price: 7999 },
                      { title: 'Enterprise', price: 19999 },
                    ].map((m) => (
                      <button
                        key={m.title}
                        type="button"
                        onClick={() => setCalcMaintTier(m.price)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                          calcMaintTier === m.price
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {m.title} (₹{m.price.toLocaleString('en-IN')}/m)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hosting & Domain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                      <span>Hosting:</span>
                      <span className="text-indigo-400">₹{calcHostingTier.toLocaleString('en-IN')}/yr</span>
                    </label>
                    <select
                      value={calcHostingTier}
                      onChange={(e) => setCalcHostingTier(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs"
                    >
                      <option value={3000}>Shared Cloud (₹3,000/yr)</option>
                      <option value={8000}>Dedicated VPS (₹8,000/yr)</option>
                      <option value={18000}>AWS Server Cluster (₹18,000/yr)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                      <span>Domain Registration:</span>
                      <span className="text-cyan-400">₹{calcDomainTier.toLocaleString('en-IN')}/yr</span>
                    </label>
                    <select
                      value={calcDomainTier}
                      onChange={(e) => setCalcDomainTier(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs"
                    >
                      <option value={1200}>Standard .com / .in (₹1,200/yr)</option>
                      <option value={2500}>Premium TLD (₹2,500/yr)</option>
                      <option value={0}>I have my own domain (₹0)</option>
                    </select>
                  </div>
                </div>

                {/* SSL & AI APIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                      <span>SSL Certificate:</span>
                      <span className="text-teal-400">₹{calcSslTier.toLocaleString('en-IN')}</span>
                    </label>
                    <select
                      value={calcSslTier}
                      onChange={(e) => setCalcSslTier(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs"
                    >
                      <option value={0}>Free Let's Encrypt SSL (₹0)</option>
                      <option value={2499}>Wildcard Commercial SSL (₹2,499/yr)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-300 flex justify-between">
                      <span>AI APIs & Third-Party:</span>
                      <span className="text-amber-400">₹{calcAiApiTier.toLocaleString('en-IN')}/mo</span>
                    </label>
                    <select
                      value={calcAiApiTier}
                      onChange={(e) => setCalcAiApiTier(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs"
                    >
                      <option value={0}>None / Standard (₹0)</option>
                      <option value={2500}>Gemini / OpenAI API Tier (₹2,500/mo)</option>
                      <option value={6000}>Enterprise Multimodal AI Tier (₹6,000/mo)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Real-time Summary Card */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Cost Breakdown Summary
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Development Cost (Upfront):</span>
                      <span className="font-bold text-white">₹{calcOneTimeDevTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Monthly Maintenance ({calcMaintTier.toLocaleString('en-IN')} x 12):</span>
                      <span className="font-bold text-emerald-400">₹{(calcMaintTier * 12).toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Hosting Cost (Annual):</span>
                      <span className="font-bold text-indigo-400">₹{calcHostingTier.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Infrastructure (Domain + SSL):</span>
                      <span className="font-bold text-cyan-400">₹{(calcDomainTier + calcSslTier).toLocaleString('en-IN')}</span>
                    </div>

                    {calcAiApiTier > 0 && (
                      <div className="flex justify-between text-slate-300">
                        <span>AI API Costs ({calcAiApiTier.toLocaleString('en-IN')} x 12):</span>
                        <span className="font-bold text-amber-400">₹{(calcAiApiTier * 12).toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                      <span>Estimated 18% GST Tax:</span>
                      <span>₹{calcGstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-400">Grand Total (First Year TCO)</span>
                    <div className="text-2xl font-black text-emerald-300">
                      ₹{calcGrandTotal1stYear.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onNavigateToContactWithItem(
                      `Custom Calculated Quote: Build=${calcDevObj?.title || 'Custom'} (₹${calcDevTier}), Maint=₹${calcMaintTier}/mo, 1st Year TCO=₹${calcGrandTotal1stYear.toLocaleString('en-IN')}`
                    )
                  }
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12 – FAQ */}
      {(activeTab === 'all' || activeTab === 'faq') && (
        <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Clear answers regarding pricing, maintenance terms, hosting, and emergency SLAs.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 13 – CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-blue-800/50">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-400">
              Start Your Digital Transformation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Let's Build Your Next Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have unique software specifications or need a enterprise SLA maintenance contract? Speak directly with our lead engineering team.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigateToContactWithItem('Request Free Project Quote')}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateToContactWithItem('Schedule Consultation')}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white border border-slate-800 hover:border-slate-700 rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SUMMARY */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs text-center space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-bold text-slate-700 dark:text-slate-300">
          <span>MUCO Labs</span>
          <span>•</span>
          <span>Software Development</span>
          <span>•</span>
          <span>AI Solutions</span>
          <span>•</span>
          <span>Website Development</span>
          <span>•</span>
          <span>Mobile Apps</span>
          <span>•</span>
          <span>CRM & ERP</span>
          <span>•</span>
          <span>AutoCAD Design</span>
          <span>•</span>
          <span>Digital Marketing</span>
          <span>•</span>
          <span>Business Consulting</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Copyright © 2026 MUCO Labs. Founded by Srinivash Mahalingam in Erode, Tamil Nadu. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
