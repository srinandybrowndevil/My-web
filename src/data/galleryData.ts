import founderPortrait from '../assets/images/srinivash.png';
import advisorPortrait from '../assets/images/yogahari.png';
import vinothPortrait from '../assets/images/vinoth_senior_dev_portrait_1785869920426.jpg';
import chandruPortrait from '../assets/images/chandru_marketing_head_portrait_1785869936811.jpg';
import marimuthuPortrait from '../assets/images/marimuthu_accounts_head_portrait_1785869947861.jpg';
import venkateshPortrait from '../assets/images/venkatesh_hr_manager_portrait_1785869957512.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Office & HQ' | 'Engineering Lab' | 'Team & Culture' | 'Client Milestones' | 'Tech Workshops';
  description: string;
  image: string;
  date: string;
  location: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  orderNumber: string;
  name: string;
  titleRole: string;
  affiliation: string;
  badgeTag: string;
  image: string;
  bio: string;
  keyResponsibilities: string[];
  phone: string;
  email: string;
  location: string;
  isFounder?: boolean;
}

export const FOUNDER_INFO = {
  name: 'Mr. Srinivash Mahalingam',
  role: 'Founder & Chairman',
  company: 'MUCO Labs',
  foundedYear: '2026',
  location: 'Erode, Tamil Nadu, India',
  phone: '+91 6381809844',
  email: 'mucolabs2026@gmail.com',
  website: 'mucolabs.in',
  image: founderPortrait,
  bio: 'Visionary software engineer and founder of MUCO Labs. Established in 2026 in Erode, Tamil Nadu to deliver world-class enterprise web applications, mobile apps, custom SaaS engines, AI chatbots, and IT consulting to global businesses with 100% upfront pricing and transparent engineering.'
};

export const ADVISOR_INFO = {
  name: 'Mr. Yogahariharan',
  role: 'Managing Director & Company Advisor',
  company: 'Way2Me & MUCO Labs',
  founderOf: 'Way2Me',
  location: 'Tamil Nadu, India',
  image: advisorPortrait,
  bio: 'Strategic business leader and Founder of Way2Me. Serving as Managing Director & Company Advisor at MUCO Labs, Yogahariharan guides enterprise growth, tech venture scalability, product strategy, and key corporate advisories.'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-founder',
    orderNumber: 'Founder',
    name: 'Mr. Srinivash Mahalingam',
    titleRole: 'Founder & Chairman',
    affiliation: 'Founder of MUCO Labs',
    badgeTag: 'Founder & Chairman',
    image: founderPortrait,
    bio: 'Visionary software architect and founder of MUCO Labs. Leads full-stack web, mobile app development, Gemini AI integration, and company expansion across global markets.',
    keyResponsibilities: ['Architectural System Design', 'Product Engineering Leadership', 'Global Client Partnerships', 'Technology Strategy'],
    phone: '+91 6381809844',
    email: 'mucolabs2026@gmail.com',
    location: 'Erode, Tamil Nadu',
    isFounder: true
  },
  {
    id: 'team-1',
    orderNumber: '1st',
    name: 'Mr. Yogahariharan',
    titleRole: 'MD & Company Advisor',
    affiliation: 'Founder of Way2Me & Advisor at MUCO Labs',
    badgeTag: 'Managing Director & Company Advisor',
    image: advisorPortrait,
    bio: 'Founder of Way2Me and Managing Director & Company Advisor at MUCO Labs. Mentors high-level corporate growth, venture strategy, cross-border operations, and business advisories.',
    keyResponsibilities: ['Venture Strategy & Scale', 'Managing Director Advisories', 'Corporate Growth & Governance', 'Strategic Alliances'],
    phone: '+91 6381809844',
    email: 'advisor@mucolabs.in',
    location: 'Tamil Nadu, India'
  },
  {
    id: 'team-2',
    orderNumber: '2nd',
    name: 'Mr. Vinoth',
    titleRole: 'Senior Developer & AutoCAD Designer',
    affiliation: 'MUCO Labs Technical Lead',
    badgeTag: 'Senior Developer & AutoCAD Designer',
    image: vinothPortrait,
    bio: 'Expert full-stack senior developer and 2D/3D AutoCAD design lead. Oversees complex web architectures, database schemas, industrial CAD drawings, and elevation modeling.',
    keyResponsibilities: ['Full-Stack Core Development', '2D/3D AutoCAD Blueprinting', 'Database Architecture', 'Code Quality & Security'],
    phone: '+91 6381809844',
    email: 'tech@mucolabs.in',
    location: 'Erode, Tamil Nadu'
  },
  {
    id: 'team-3',
    orderNumber: '3rd',
    name: 'Mr. Chandru',
    titleRole: 'Digital Marketing Head & Company Handler',
    affiliation: 'MUCO Labs Marketing Operations',
    badgeTag: 'Digital Marketing Head & Company Handler',
    image: chandruPortrait,
    bio: 'Drives performance digital marketing campaigns, SEO indexing, brand growth, social media strategy, and day-to-day company operations management at MUCO Labs.',
    keyResponsibilities: ['SEO & Organic Search Growth', 'Performance Marketing & Ads', 'Brand & Media Strategy', 'Company Operations Handling'],
    phone: '+91 6381809844',
    email: 'marketing@mucolabs.in',
    location: 'Erode, Tamil Nadu'
  },
  {
    id: 'team-4',
    orderNumber: '4th',
    name: 'Mr. Marimuthu',
    titleRole: 'Telecalling Head & Accounts Head',
    affiliation: 'MUCO Labs Financial & Client Support',
    badgeTag: 'Telecalling Head & Accounts Head',
    image: marimuthuPortrait,
    bio: 'Manages enterprise client communications, telecalling operations, billing, invoicing, 100% transparent upfront pricing quotes, and financial accounts at MUCO Labs.',
    keyResponsibilities: ['Telecalling & Client Support', 'Corporate Financial Accounting', 'Upfront Invoice Audits', 'Billing & Retainers'],
    phone: '+91 6381809844',
    email: 'accounts@mucolabs.in',
    location: 'Erode, Tamil Nadu'
  },
  {
    id: 'team-5',
    orderNumber: '5th',
    name: 'Mr. Venkatesh',
    titleRole: 'Marketing & Human Resource Manager',
    affiliation: 'MUCO Labs HR & Field Marketing',
    badgeTag: 'Marketing & Human Resource Manager',
    image: venkateshPortrait,
    bio: 'Leads talent acquisition, human resource development, internal engineering culture, campus outreach, and field marketing initiatives for MUCO Labs.',
    keyResponsibilities: ['Human Resources & Recruitment', 'Field Marketing & Outreach', 'Team Culture & Mentorship', 'Talent Onboarding'],
    phone: '+91 6381809844',
    email: 'hr@mucolabs.in',
    location: 'Erode, Tamil Nadu'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'MUCO Labs Innovation Headquarters',
    category: 'Office & HQ',
    description: 'Our modern software engineering center in Erode, Tamil Nadu, equipped with high-performance workstations and fiber connectivity for non-stop development.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    date: 'August 2026',
    location: 'Erode, Tamil Nadu',
    tags: ['HQ', 'Software Lab', 'Workstation', 'Infrastructure']
  },
  {
    id: 'gal-2',
    title: 'Founder & Engineering Architectural Session',
    category: 'Engineering Lab',
    description: 'Founder & Chairman Srinivash Mahalingam leading a system design sprint for a multi-tenant cloud SaaS deployment.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    date: 'July 2026',
    location: 'MUCO Labs HQ',
    tags: ['System Design', 'Architecture', 'SaaS', 'Engineering']
  },
  {
    id: 'gal-3',
    title: 'Cross-Platform Mobile App Design Sprint',
    category: 'Engineering Lab',
    description: 'Interactive React Native & Flutter UI/UX prototyping session for on-demand logistics delivery client.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    date: 'July 2026',
    location: 'App Design Studio',
    tags: ['Mobile App', 'UI/UX', 'Figma', 'React Native']
  },
  {
    id: 'gal-4',
    title: 'AI & Machine Learning Model Training Lab',
    category: 'Engineering Lab',
    description: 'Developing custom Gemini AI agents, OCR document processing pipelines, and WhatsApp automated bots.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
    date: 'August 2026',
    location: 'AI Research Unit',
    tags: ['Gemini AI', 'Automation', 'OCR', 'Python']
  },
  {
    id: 'gal-5',
    title: 'Enterprise Client Project Launch Milestone',
    category: 'Client Milestones',
    description: 'Celebrating the successful live release of textile B2B ERP platform with client leadership team.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    date: 'June 2026',
    location: 'Coimbatore, TN',
    tags: ['Client Success', 'ERP', 'Live Launch', 'Milestone']
  },
  {
    id: 'gal-6',
    title: 'Cloud DevOps Monitoring & Telemetry',
    category: 'Engineering Lab',
    description: 'Real-time server health, latency tracking, and AWS Cloud security benchmarks monitoring hub.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    date: 'August 2026',
    location: 'DevOps Command Center',
    tags: ['Cloud', 'DevOps', 'AWS', 'Telemetry']
  },
  {
    id: 'gal-7',
    title: 'Team Code Review & Peer Mentorship',
    category: 'Team & Culture',
    description: 'Weekly technical code review enforcing strict TypeScript type-safety and performance standards.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    date: 'July 2026',
    location: 'MUCO Labs HQ',
    tags: ['Code Review', 'Quality Assurance', 'Mentorship', 'Culture']
  },
  {
    id: 'gal-8',
    title: 'South India Tech & Developer Community Meetup',
    category: 'Tech Workshops',
    description: 'Hosting local developers and student engineers for a hands-on workshop on Full-Stack Web Development & AI.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    date: 'May 2026',
    location: 'Erode Conference Center',
    tags: ['Community', 'Workshop', 'Developer Meetup', 'Education']
  },
  {
    id: 'gal-9',
    title: 'Digital Marketing & SEO Strategy Hub',
    category: 'Engineering Lab',
    description: 'Analyzing performance metrics, keyword indexing, and conversion funnels for client e-commerce portals.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    date: 'August 2026',
    location: 'Marketing Studio',
    tags: ['SEO', 'GA4 Analytics', 'Conversion', 'E-Commerce']
  }
];
