import React from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, Globe, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-base tracking-wider">
                  M<span className="text-blue-400">L</span>
                </div>
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  MUCO <span className="text-blue-400">Labs</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Your Vision. Our Technology.</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 pr-4">
              MUCO Labs is a premier full-stack software development and digital transformation agency. We engineer high-performance web applications, native mobile apps, custom SaaS products, enterprise AI automations, and strategic digital marketing engines.
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
                { id: 'pricing', label: 'Pricing Calculator' },
                { id: 'maintenance', label: 'Maintenance Plans' },
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

          {/* Col 3: Key Offerings */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Services</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  Website Development (from ₹14,999)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  Mobile App Development (from ₹49,999)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  Custom Software & CRM/ERP (from ₹79,999)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  SaaS Platform Development (from ₹149,999)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  AI Chatbots & Automation (from ₹24,999)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors text-left">
                  Digital Marketing & SEO (from ₹7,999/mo)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('maintenance')} className="hover:text-blue-400 transition-colors text-left">
                  Maintenance & SLA Plans (from ₹2,999/mo)
                </button>
              </li>
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
                href="mailto:mucolabs2026@gmail.com"
                className="flex items-start gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">mucolabs2026@gmail.com</span>
                  <span className="text-[10px] text-slate-500">24h Email Response</span>
                </div>
              </a>

              <a
                href="https://mucolabs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-medium">mucolabs.in</span>
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
            <span className="text-slate-400 font-medium">Founder & Managing Director: Srinivash Mahalingam</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Erode, TN, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
