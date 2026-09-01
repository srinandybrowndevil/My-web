import React from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, Globe, ArrowUpRight, ShieldCheck, Heart, Sparkles, Scale, Shield } from 'lucide-react';
import { MucoLogo } from './MucoLogo';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';

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

const REGIONAL_HUBS = [
  { name: 'Erode (HQ)', cityId: 'erode' },
  { name: 'Perundurai (SIPCOT)', cityId: 'perundurai' },
  { name: 'Bhavani (Textiles)', cityId: 'bhavani' },
  { name: 'Gobichettipalayam', cityId: 'gobichettipalayam' },
  { name: 'Sathyamangalam', cityId: 'sathyamangalam' },
  { name: 'Chennimalai (Handloom)', cityId: 'chennimalai' },
  { name: 'Kodumudi', cityId: 'kodumudi' },
  { name: 'Modakurichi', cityId: 'modakurichi' }
];

const TOP_LOCAL_COMBOS = [
  { name: 'Website Development in Erode', comboId: 'website-development-erode' },
  { name: 'SEO Company in Erode', comboId: 'seo-services-erode' },
  { name: 'Custom ERP Software in Erode', comboId: 'custom-software-erode' },
  { name: 'Mobile App Developers Erode', comboId: 'mobile-app-development-erode' },
  { name: 'AI Development in Erode', comboId: 'ai-development-erode' },
  { name: 'E-commerce Stores in Erode', comboId: 'ecommerce-development-erode' }
];

interface FooterProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleNav = (page: PageId, hash?: string) => {
    onNavigate(page, undefined, hash);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLocationNav = (cityId?: string, comboId?: string) => {
    if (comboId) {
      window.location.hash = `#locations?combo=${comboId}`;
    } else if (cityId) {
      window.location.hash = `#locations?city=${cityId}`;
    } else {
      window.location.hash = '#locations';
    }
    onNavigate('locations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <MucoLogo variant="full" size="md" lightText={true} showTagline={true} />

            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              MUCO Labs architectures intelligent software, cloud infrastructure, and AI automation engines for ambitious startups and enterprises in Erode, Tamil Nadu, and worldwide. We turn bold ideas into high-performance, scalable digital reality.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">Founder:</span>
                <span>Srinivash Mahalingam</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">Standard SLA:</span>
                <span className="text-orange-400">50% Advance / Milestone</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'systems', label: t.nav.systems },
                { id: 'services', label: t.nav.services },
                { id: 'portfolio', label: t.nav.work },
                { id: 'process', label: t.nav.process },
                { id: 'about', label: t.nav.about },
                { id: 'locations', label: t.nav.locations },
                { id: 'courses', label: t.nav.learn },
                { id: 'apps', label: t.nav.apps },
                { id: 'pricing', label: t.nav.pricing },
                { id: 'maintenance', label: t.nav.maintenance },
                { id: 'blog', label: t.nav.blog },
                { id: 'faq', label: t.nav.faq },
                { id: 'terms', label: t.nav.terms },
                { id: 'privacy', label: t.nav.privacy },
                { id: 'contact', label: t.nav.contact }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id as PageId)}
                    className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-1 group text-left cursor-pointer"
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
                    className="text-slate-400 hover:text-orange-400 transition-colors text-left group flex items-start gap-1.5 leading-snug cursor-pointer"
                  >
                    <span className="text-orange-500/60 group-hover:text-orange-400 transition-colors">•</span>
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
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="flex items-start gap-2.5 text-slate-300 hover:text-orange-400 transition-colors group text-left cursor-pointer"
              >
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">+91 63818 09844</span>
                  <span className="text-[10px] text-slate-500">Direct Phone &amp; WhatsApp</span>
                </div>
              </button>

              <a
                href="mailto:contact@mucolabs.in"
                className="flex items-start gap-2.5 text-slate-300 hover:text-orange-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">contact@mucolabs.in</span>
                  <span className="text-[10px] text-slate-500">24h Email Response</span>
                </div>
              </a>

              <a
                href="https://mucolabs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-medium">mucolabs.in</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-slate-300">Erode &amp; Perundurai Hub</span>
                  <span className="text-[10px] text-slate-500">Tamil Nadu, India - 638052</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Hubs & Local SEO Bar */}
        <div className="py-8 border-b border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Regional Technology Hubs & Local SEO</span>
            </span>
            <button
              onClick={() => handleLocationNav()}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
            >
              View All Locations Directory →
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {REGIONAL_HUBS.map((hub, idx) => (
              <button
                key={idx}
                onClick={() => handleLocationNav(hub.cityId)}
                className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 text-slate-300 hover:text-orange-400 transition-all cursor-pointer"
              >
                {hub.name}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
            <span className="text-slate-400 font-medium">Popular Searches:</span>
            {TOP_LOCAL_COMBOS.map((combo, idx) => (
              <button
                key={idx}
                onClick={() => handleLocationNav(undefined, combo.comboId)}
                className="hover:text-orange-400 transition-colors underline-offset-2 hover:underline text-left cursor-pointer"
              >
                {combo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar with Legal & DPDP Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MUCO Labs Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              {t.nav.terms}
            </button>
            <span className="text-slate-700">&bull;</span>
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              {t.nav.privacy}
            </button>
            <span className="text-slate-700">&bull;</span>
            <span className="text-slate-400 font-medium">Founder: Srinivash Mahalingam</span>
            <span className="text-slate-700">&bull;</span>
            <span className="text-slate-500">Erode, TN, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
