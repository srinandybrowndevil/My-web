import React from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, Globe, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { MucoLogo } from './MucoLogo';

// Service Mapping for Pricing page deep-linking
const FOOTER_SERVICES = [
  { name: 'Website Development', targetId: 'website-development' },
  { name: 'Mobile App Development', targetId: 'mobile-app-development' },
  { name: 'Custom Software Development', targetId: 'custom-software' },
  { name: 'CRM & ERP Solutions', targetId: 'crm-erp' },
  { name: 'SaaS Platform Development', targetId: 'saas-platform' },
  { name: 'AI Chatbots & Automation', targetId: 'ai-chatbots' },
  { name: 'AI Agent Development', targetId: 'ai-agents' },
  { name: 'UI/UX Design', targetId: 'ui-ux' },
  { name: 'Cloud Service Management', targetId: 'cloud-services' },
  { name: 'DevOps & CI/CD', targetId: 'devops' },
  { name: 'API Development & Integration', targetId: 'api-development' },
  { name: 'Database Design & Management', targetId: 'database-management' },
  { name: 'AutoCAD Design & Drafting', targetId: 'autocad' },
  { name: 'CAD Conversion & 2D/3D Modeling', targetId: 'cad-modeling' },
  { name: 'Digital Marketing', targetId: 'digital-marketing' },
  { name: 'Search Engine Optimization (SEO)', targetId: 'seo' },
  { name: 'Branding & Graphic Design', targetId: 'branding' },
  { name: 'IT Consulting', targetId: 'it-consulting' },
  { name: 'Technical Support & Maintenance', targetId: 'maintenance' }
];

interface FooterProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, hash?: string) => {
    onNavigate(page, undefined, hash);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <MucoLogo variant="full" size="md" lightText={true} showTagline={true} />

            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              MUCO Labs architectures intelligent software, cloud infrastructure, and AI automation engines for ambitious startups and enterprises worldwide. We turn bold ideas into high-performance, scalable digital reality.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">Founder:</span>
                <span>Srinivash Mahalingam</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">Established:</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About MUCO Labs' },
                { id: 'services', label: 'All Services' },
                { id: 'portfolio', label: 'Project Portfolio' },
                { id: 'apps', label: 'Publish to Play/App Store' },
                { id: 'pricing', label: 'Pricing Calculator' },
                { id: 'maintenance', label: 'Maintenance Plans' },
                { id: 'gallery', label: 'Our Team & Leadership' },
                { id: 'blog', label: 'Blog & Tech Articles' },
                { id: 'faq', label: 'Help & FAQ' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id as PageId)}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group text-left"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (MUCO Labs Offerings - Deep Links to Pricing) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Services</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-400">
              {FOOTER_SERVICES.map((service, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav('pricing', service.targetId)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-left group flex items-start gap-1.5 leading-snug"
                  >
                    <span className="text-blue-500/60 group-hover:text-blue-400 transition-colors">•</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {service.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Official Contact</p>
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:+916381809844"
                className="flex items-start gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">+91 6381809844</span>
                  <span className="text-[10px] text-slate-500">Direct Founder & Support Line</span>
                </div>
              </a>

              <a
                href="mailto:contact@mucolabs.com"
                className="flex items-start gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">contact@mucolabs.com</span>
                  <span className="text-[10px] text-slate-500">24h Email Response</span>
                </div>
              </a>

              <a
                href="https://mucolabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-medium">mucolabs.com</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-slate-300">Erode, Tamil Nadu</span>
                  <span className="text-[10px] text-slate-500">India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MUCO Labs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Founder & Chairman : Srinivash Mahalingam</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Erode, TN, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
