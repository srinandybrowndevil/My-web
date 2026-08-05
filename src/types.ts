export type PageId = 'home' | 'about' | 'services' | 'pricing' | 'portfolio' | 'apps' | 'maintenance' | 'gallery' | 'contact' | 'faq' | 'sheets' | 'blog' | 'notfound';

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

