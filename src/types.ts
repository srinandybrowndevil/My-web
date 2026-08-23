export type PageId = 'home' | 'about' | 'services' | 'systems' | 'courses' | 'pricing' | 'portfolio' | 'apps' | 'maintenance' | 'gallery' | 'contact' | 'faq' | 'sheets' | 'blog' | 'locations' | 'notfound';

export type LocationId = 
  | 'erode' 
  | 'perundurai' 
  | 'bhavani' 
  | 'gobichettipalayam' 
  | 'sathyamangalam' 
  | 'kodumudi' 
  | 'modakurichi' 
  | 'chennimalai';

export interface LocalIndustryData {
  name: string;
  description: string;
  solutionsNeeded: string[];
}

export interface LocalFaqItem {
  question: string;
  answer: string;
}

export interface LocationData {
  id: LocationId;
  name: string;
  district: string;
  state: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  headline: string;
  tagline: string;
  overview: string;
  majorIndustries: LocalIndustryData[];
  keyCommercialHubs: string[];
  localChallenges: string[];
  recommendedServices: {
    serviceId: string;
    serviceName: string;
    description: string;
    pricingEstimate: string;
  }[];
  faqs: LocalFaqItem[];
  nearbyAreas: {
    id: LocationId;
    name: string;
    distance: string;
  }[];
  heroImage: string;
}

export interface ServiceLocationCombo {
  id: string; // e.g. 'website-development-erode'
  serviceId: string; // e.g. 'web-dev'
  serviceSlug: string; // e.g. 'website-development'
  serviceName: string; // e.g. 'Website Development'
  locationId: LocationId;
  locationName: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  localizedSummary: string;
  localBusinessContext: string;
  targetIndustries: string[];
  keyDeliverables: string[];
  localCaseScenario: {
    title: string;
    clientSector: string;
    challenge: string;
    solutionDelivered: string;
    impact: string;
  };
  technologies: string[];
  startingPrice: string;
  timeline: string;
  faqs: LocalFaqItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category:
    | 'Web Development'
    | 'Mobile App'
    | 'SaaS Platform'
    | 'AI & Automation'
    | 'Digital Marketing & SEO'
    | 'UI/UX & Branding'
    | 'Cloud & IT Consulting'
    | 'Upcoming / In Development';
  client: string;
  year: string;
  description: string;
  techStack: string[];
  status: 'Completed & Live' | 'In Active Development' | 'Planned / Q3 2026';
  image: string;
  liveUrl?: string;
  highlights: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: PricingItem[];
}

export interface PricingItem {
  id: string;
  title: string;
  price: string;
  period?: string;
  description?: string;
  popular?: boolean;
  features: string[];
  iconName?: string;
  category: string;
}

export interface MaintenanceTier {
  id: string;
  category: string;
  title: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'development' | 'ai' | 'marketing' | 'maintenance';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceCategory: string;
  subject?: string;
  budgetRange?: string;
  message: string;
}

export interface TechStackItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'AI & ML' | 'Cloud & DevOps' | 'Design';
  description: string;
  iconName: string;
}

export interface SuccessStory {
  id: string;
  clientName: string;
  clientIndustry: string;
  clientLocation: string;
  projectTitle: string;
  category: 'Web Development' | 'Mobile App' | 'SaaS Platform' | 'AI & Automation' | 'Enterprise ERP' | 'UI/UX & Branding';
  summary: string;
  challenge: string;
  solution: string;
  keyOutcomes: {
    metric: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  techStack: string[];
  image: string;
  year: string;
  featured?: boolean;
}

