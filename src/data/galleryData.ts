import founderPortrait from '../assets/images/founder_ceo_portrait_1785845079526.jpg';

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

export const FOUNDER_INFO = {
  name: 'Srinivash Mahalingam',
  role: 'Founder & CEO / Managing Director',
  company: 'MUCO Labs',
  foundedYear: '2026',
  location: 'Erode, Tamil Nadu, India',
  phone: '+91 6381809844',
  email: 'mucolabs2026@gmail.com',
  website: 'mucolabs.in',
  image: founderPortrait,
  bio: 'Visionary software engineer and founder of MUCO Labs. Established in 2026 in Erode, Tamil Nadu to deliver world-class enterprise web applications, mobile apps, custom SaaS engines, AI chatbots, and IT consulting to global businesses with 100% upfront pricing and transparent engineering.'
};

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
    description: 'Founder & CEO Srinivash Mahalingam leading a system design sprint for a multi-tenant cloud SaaS deployment.',
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
