import React, { useMemo } from 'react';
import { ChevronRight, Home, Layers, MapPin } from 'lucide-react';
import { PageId } from '../types';

export interface BreadcrumbStep {
  name: string;
  page?: PageId;
  hash?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  currentPage: PageId;
  subItem?: string;
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
  className?: string;
  // Specific hierarchical props for /services/[service]/[location]
  serviceName?: string;
  serviceId?: string;
  locationName?: string;
  locationId?: string;
  serviceLocationTitle?: string;
  comboId?: string;
  customTrail?: BreadcrumbStep[];
}

const PAGE_NAMES: Record<PageId, string> = {
  home: 'Home',
  about: 'About Us',
  locations: 'Locations & Regional Hubs',
  services: 'Services & Solutions',
  courses: 'Mastery Courses & Bootcamps',
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
  className = '',
  serviceName,
  serviceId,
  locationName,
  locationId,
  serviceLocationTitle,
  comboId,
  customTrail
}) => {
  if (currentPage === 'home' && !customTrail) return null;

  // Build the complete hierarchical trail
  const trail: BreadcrumbStep[] = useMemo(() => {
    if (customTrail && customTrail.length > 0) {
      return [{ name: 'Home', page: 'home', hash: '#home' }, ...customTrail];
    }

    const items: BreadcrumbStep[] = [
      { name: 'Home', page: 'home', hash: '#home' }
    ];

    // Check if this is a /services/[service]/[location] hierarchy
    const hasService = Boolean(serviceName || serviceLocationTitle);
    const hasLocation = Boolean(locationName);

    if (hasService && hasLocation) {
      // Step 2: Services Hub
      items.push({
        name: 'Services',
        page: 'services',
        hash: '#services',
        onClick: () => onNavigate('services')
      });

      // Step 3: Specific Service
      const srvTitle = serviceName || serviceLocationTitle || 'Service';
      items.push({
        name: srvTitle,
        page: 'services',
        hash: serviceId ? `#services?id=${serviceId}` : '#services',
        onClick: () => {
          if (serviceId) {
            onNavigate('services', undefined, `#services?id=${serviceId}`);
          } else {
            onNavigate('services');
          }
        }
      });

      // Step 4: Specific Location (Current Node)
      items.push({
        name: locationName || 'Location Hub',
        page: 'locations',
        hash: comboId ? `#locations?combo=${comboId}` : `#locations?city=${locationId || ''}`,
        isCurrent: true
      });

      return items;
    }

    // Single Service Node in /services
    if (currentPage === 'services' && (serviceName || subItem)) {
      items.push({
        name: 'Services',
        page: 'services',
        hash: '#services',
        onClick: () => onNavigate('services')
      });
      items.push({
        name: (serviceName || subItem) as string,
        isCurrent: true
      });
      return items;
    }

    // Single Location Node in /locations
    if (currentPage === 'locations' && locationName) {
      items.push({
        name: 'Locations & Hubs',
        page: 'locations',
        hash: '#locations',
        onClick: () => onNavigate('locations')
      });
      items.push({
        name: locationName,
        isCurrent: true
      });
      return items;
    }

    // Standard Page Level with optional sub-item
    items.push({
      name: PAGE_NAMES[currentPage] || currentPage,
      page: currentPage,
      hash: `#${currentPage}`,
      onClick: subItem ? () => onNavigate(currentPage) : undefined,
      isCurrent: !subItem
    });

    if (subItem) {
      items.push({
        name: subItem,
        isCurrent: true
      });
    }

    return items;
  }, [
    currentPage,
    subItem,
    serviceName,
    serviceId,
    locationName,
    locationId,
    serviceLocationTitle,
    comboId,
    customTrail,
    onNavigate
  ]);

  // Generate Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.hash ? `${origin}/${item.hash}` : `${origin}/#${item.page || ''}`
      }))
    };
  }, [trail]);

  return (
    <div className={`w-full ${className}`}>
      {/* Schema.org Microdata Injected for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 py-3 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none font-medium"
      >
        {trail.map((step, idx) => {
          const isLast = idx === trail.length - 1;
          const isFirst = idx === 0;

          return (
            <React.Fragment key={`${step.name}-${idx}`}>
              <div
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-1.5 shrink-0"
              >
                <meta itemProp="position" content={String(idx + 1)} />

                {isLast ? (
                  <span
                    itemProp="name"
                    aria-current="page"
                    className="flex items-center gap-1 text-slate-900 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-xs"
                  >
                    {locationName && isLast && <MapPin className="w-3 h-3 text-cyan-500" />}
                    {step.name}
                  </span>
                ) : (
                  <button
                    type="button"
                    itemProp="item"
                    onClick={() => {
                      if (step.onClick) {
                        step.onClick();
                      } else if (step.page) {
                        onNavigate(step.page, undefined, step.hash);
                      }
                    }}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 hover:underline transition-colors cursor-pointer"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5" />}
                    <span itemProp="name">{step.name}</span>
                  </button>
                )}
              </div>

              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0"
                />
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};
