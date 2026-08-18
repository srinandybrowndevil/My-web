import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbsProps {
  currentPage: PageId;
  subItem?: string;
  onNavigate: (page: PageId) => void;
  className?: string;
}

const PAGE_NAMES: Record<PageId, string> = {
  home: 'Home',
  about: 'About Us',
  services: 'Services & Solutions',
  pricing: 'Pricing & Plans',
  portfolio: 'Client Portfolio',
  apps: 'App Studio & Play Store',
  maintenance: 'AMC & Maintenance',
  gallery: 'Our Team & Leadership',
  contact: 'Contact & Inquiry',
  faq: 'Frequently Asked Questions',
  sheets: 'Google Sheets CRM',
  blog: 'Engineering Blog',
  notfound: '404 Error'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage,
  subItem,
  onNavigate,
  className = ''
}) => {
  if (currentPage === 'home') return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-3 mb-6 border-b border-slate-200/60 dark:border-slate-800/80 overflow-x-auto whitespace-nowrap ${className}`}
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1.5 hover:text-amber-500 transition-colors font-medium cursor-pointer shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

      {subItem ? (
        <>
          <button
            onClick={() => onNavigate(currentPage)}
            className="hover:text-amber-500 transition-colors font-medium cursor-pointer shrink-0"
          >
            {PAGE_NAMES[currentPage] || currentPage}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 dark:text-slate-200 font-semibold truncate shrink-0">
            {subItem}
          </span>
        </>
      ) : (
        <span className="text-slate-900 dark:text-slate-200 font-semibold truncate shrink-0">
          {PAGE_NAMES[currentPage] || currentPage}
        </span>
      )}
    </nav>
  );
};
