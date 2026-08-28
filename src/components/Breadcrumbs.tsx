import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronRight, Home, Layers, MapPin, BookOpen, Briefcase, FileText, Users, HelpCircle, Phone, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/servicesData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { COURSES_DATA } from '../data/coursesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { BLOG_POSTS } from '../data/blogData';
import { TEAM_MEMBERS } from '../data/galleryData';

export interface BreadcrumbStep {
  name: string;
  page?: PageId;
  hash?: string;
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  isCurrent?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  currentPage?: PageId;
  subItem?: string;
  onNavigate?: (page: PageId, customMsg?: string, hash?: string) => void;
  className?: string;
  // Specific hierarchical props for /services/[service]/[location]
  serviceName?: string;
  serviceId?: string;
  locationName?: string;
  locationId?: string;
  serviceLocationTitle?: string;
  comboId?: string;
  customTrail?: BreadcrumbStep[];
  // If true, forces showing on home page as well
  showOnHome?: boolean;
}

const PAGE_NAMES: Record<PageId, string> = {
  home: 'Home',
  about: 'About Us',
  locations: 'Locations & Regional Hubs',
  services: 'Services & Solutions',
  systems: 'Autonomous AI Systems',
  process: 'Our Process',
  courses: 'Mastery Courses & Bootcamps',
  pricing: 'Pricing & Plans',
  portfolio: 'Client Portfolio',
  apps: 'App Studio & Play Store',
  maintenance: 'AMC & Maintenance',
  gallery: 'Leadership & Team',
  contact: 'Contact & Inquiry',
  faq: 'Frequently Asked Questions',
  sheets: 'Google Sheets CRM',
  blog: 'Engineering Blog',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  notfound: '404 Error'
};

const PAGE_ICONS: Partial<Record<PageId, React.ReactNode>> = {
  services: <Layers className="w-3.5 h-3.5" />,
  systems: <Sparkles className="w-3.5 h-3.5" />,
  locations: <MapPin className="w-3.5 h-3.5" />,
  courses: <BookOpen className="w-3.5 h-3.5" />,
  portfolio: <Briefcase className="w-3.5 h-3.5" />,
  blog: <FileText className="w-3.5 h-3.5" />,
  gallery: <Users className="w-3.5 h-3.5" />,
  faq: <HelpCircle className="w-3.5 h-3.5" />,
  contact: <Phone className="w-3.5 h-3.5" />
};

/**
 * Normalizes slug or string to readable title
 */
function humanizeSlug(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Breadcrumbs Component:
 * Automatically parses current URL path, search params, and hash to generate
 * SEO-optimized navigation links, Schema.org JSON-LD microdata, and bot-crawlable
 * hierarchical anchors.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPage: propCurrentPage,
  subItem,
  onNavigate,
  className = '',
  serviceName,
  serviceId,
  locationName,
  locationId,
  serviceLocationTitle,
  comboId,
  customTrail,
  showOnHome = false
}) => {
  // Track location state dynamically for client navigation
  const [urlState, setUrlState] = useState<{
    pathname: string;
    hash: string;
    search: string;
  }>({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    search: typeof window !== 'undefined' ? window.location.search : ''
  });

  useEffect(() => {
    const handleUrlUpdate = () => {
      setUrlState({
        pathname: window.location.pathname,
        hash: window.location.hash,
        search: window.location.search
      });
    };

    window.addEventListener('popstate', handleUrlUpdate);
    window.addEventListener('hashchange', handleUrlUpdate);
    window.addEventListener('muco:route_changed', handleUrlUpdate);

    return () => {
      window.removeEventListener('popstate', handleUrlUpdate);
      window.removeEventListener('hashchange', handleUrlUpdate);
      window.removeEventListener('muco:route_changed', handleUrlUpdate);
    };
  }, []);

  // Internal navigation handler
  const handleNavigate = useCallback(
    (page: PageId, targetHash?: string, customClick?: (e?: React.MouseEvent) => void) => (e?: React.MouseEvent) => {
      if (customClick) {
        customClick(e);
        return;
      }

      if (e) {
        // Allow middle clicks / cmd+clicks for opening in new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
          return;
        }
        e.preventDefault();
      }

      if (onNavigate) {
        onNavigate(page, undefined, targetHash);
      } else {
        if (targetHash) {
          window.location.hash = targetHash.replace(/^#/, '');
        } else {
          window.location.hash = page === 'home' ? '' : page;
        }
      }
    },
    [onNavigate]
  );

  // Automatically compute the hierarchical breadcrumb trail
  const trail: BreadcrumbStep[] = useMemo(() => {
    // 1. Direct custom trail override
    if (customTrail && customTrail.length > 0) {
      return [
        {
          name: 'Home',
          page: 'home',
          hash: '#home',
          href: '/#home',
          icon: <Home className="w-3.5 h-3.5" />
        },
        ...customTrail
      ];
    }

    const items: BreadcrumbStep[] = [
      {
        name: 'Home',
        page: 'home',
        hash: '#home',
        href: '/#home',
        icon: <Home className="w-3.5 h-3.5" />
      }
    ];

    // Combine parameters from URL query string and hash query string
    const currentHash = urlState.hash;
    const currentPath = urlState.pathname;
    const queryPart = currentHash.includes('?') 
      ? currentHash.split('?')[1] 
      : (urlState.search ? urlState.search.replace(/^\?/, '') : '');
    
    const params = new URLSearchParams(queryPart);

    // Determine the active page either from prop or URL
    let resolvedPage: PageId = propCurrentPage || 'home';
    if (!propCurrentPage) {
      const rawHashPage = currentHash.replace(/^#\/?/, '').split('?')[0].split('/')[0].toLowerCase();
      if (rawHashPage && PAGE_NAMES[rawHashPage as PageId]) {
        resolvedPage = rawHashPage as PageId;
      } else {
        const pathSegments = currentPath.split('/').filter(Boolean);
        if (pathSegments[0] && PAGE_NAMES[pathSegments[0] as PageId]) {
          resolvedPage = pathSegments[0] as PageId;
        }
      }
    }

    // Resolve URL query IDs
    const resolvedComboId = comboId || params.get('combo');
    const resolvedServiceId = serviceId || params.get('id') || params.get('service');
    const resolvedCityId = locationId || params.get('city') || params.get('loc');
    const resolvedPostSlug = params.get('post');
    const resolvedMemberId = params.get('member');

    // --------------------------------------------------------------------------
    // CASE A: Hierarchical /services/[service]/[location] (Service x Location Combo)
    // --------------------------------------------------------------------------
    if (resolvedComboId) {
      const combo = SERVICE_LOCATIONS_DATA.find((c) => c.id === resolvedComboId);
      if (combo) {
        // 1. Services Hub Link
        items.push({
          name: 'Services',
          page: 'services',
          hash: '#services',
          href: '/#services',
          icon: <Layers className="w-3.5 h-3.5" />,
          onClick: handleNavigate('services', '#services')
        });

        // 2. Specific Service Category Link
        items.push({
          name: combo.serviceName,
          page: 'services',
          hash: `#services?id=${combo.serviceId}`,
          href: `/#services?id=${combo.serviceId}`,
          onClick: handleNavigate('services', `#services?id=${combo.serviceId}`)
        });

        // 3. Current Location Terminal Node
        items.push({
          name: `${combo.locationName} Hub`,
          page: 'locations',
          hash: `#locations?combo=${combo.id}`,
          href: `/#locations?combo=${combo.id}`,
          isCurrent: true,
          icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" />
        });

        return items;
      }
    }

    // Explicit service + location props passed
    if ((serviceName || serviceLocationTitle) && locationName) {
      const srvTitle = serviceName || serviceLocationTitle || 'Service';
      items.push({
        name: 'Services',
        page: 'services',
        hash: '#services',
        href: '/#services',
        icon: <Layers className="w-3.5 h-3.5" />,
        onClick: handleNavigate('services', '#services')
      });

      items.push({
        name: srvTitle,
        page: 'services',
        hash: serviceId ? `#services?id=${serviceId}` : '#services',
        href: serviceId ? `/#services?id=${serviceId}` : '/#services',
        onClick: handleNavigate('services', serviceId ? `#services?id=${serviceId}` : '#services')
      });

      items.push({
        name: `${locationName} Hub`,
        page: 'locations',
        hash: comboId ? `#locations?combo=${comboId}` : (locationId ? `#locations?city=${locationId}` : '#locations'),
        href: comboId ? `/#locations?combo=${comboId}` : (locationId ? `/#locations?city=${locationId}` : '/#locations'),
        isCurrent: true,
        icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" />
      });

      return items;
    }

    // --------------------------------------------------------------------------
    // CASE B: Locations & Regional Hubs (/locations or #locations)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'locations') {
      const locKey = (resolvedCityId as keyof typeof LOCATIONS_DATA) || locationId;
      const matchedLoc = locKey && LOCATIONS_DATA[locKey as keyof typeof LOCATIONS_DATA]
        ? LOCATIONS_DATA[locKey as keyof typeof LOCATIONS_DATA]
        : null;

      const locDisplayName = locationName || matchedLoc?.name;

      if (locDisplayName) {
        items.push({
          name: 'Locations & Regional Hubs',
          page: 'locations',
          hash: '#locations',
          href: '/#locations',
          icon: <MapPin className="w-3.5 h-3.5" />,
          onClick: handleNavigate('locations', '#locations')
        });

        items.push({
          name: `${locDisplayName} Technology Hub`,
          page: 'locations',
          hash: `#locations?city=${locKey || ''}`,
          href: `/#locations?city=${locKey || ''}`,
          isCurrent: true,
          icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" />
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // CASE C: Services & Solutions (/services or #services)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'services') {
      const matchedSrv = resolvedServiceId 
        ? CORE_SERVICES.find((s) => s.id === resolvedServiceId) 
        : null;
      const srvDisplayName = serviceName || subItem || matchedSrv?.title;

      if (srvDisplayName) {
        items.push({
          name: 'Services & Solutions',
          page: 'services',
          hash: '#services',
          href: '/#services',
          icon: <Layers className="w-3.5 h-3.5" />,
          onClick: handleNavigate('services', '#services')
        });

        items.push({
          name: srvDisplayName,
          page: 'services',
          hash: matchedSrv ? `#services?id=${matchedSrv.id}` : '#services',
          href: matchedSrv ? `/#services?id=${matchedSrv.id}` : '/#services',
          isCurrent: true
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // CASE D: Mastery Courses & Bootcamps (/courses or #courses)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'courses') {
      const courseIdParam = resolvedServiceId || params.get('course') || subItem;
      const matchedCourse = courseIdParam
        ? COURSES_DATA.find((c) => c.id === courseIdParam || c.title.toLowerCase() === courseIdParam.toLowerCase())
        : null;

      if (matchedCourse || subItem) {
        items.push({
          name: 'Mastery Courses & Bootcamps',
          page: 'courses',
          hash: '#courses',
          href: '/#courses',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          onClick: handleNavigate('courses', '#courses')
        });

        items.push({
          name: matchedCourse ? matchedCourse.title : subItem!,
          page: 'courses',
          hash: matchedCourse ? `#courses?id=${matchedCourse.id}` : '#courses',
          href: matchedCourse ? `/#courses?id=${matchedCourse.id}` : '/#courses',
          isCurrent: true
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // CASE E: Client Portfolio Case Studies (/portfolio or #portfolio)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'portfolio') {
      const projIdParam = resolvedServiceId || params.get('project') || subItem;
      const matchedProj = projIdParam
        ? INITIAL_PROJECTS.find((p) => p.id === projIdParam || p.title.toLowerCase() === projIdParam.toLowerCase())
        : null;

      if (matchedProj || subItem) {
        items.push({
          name: 'Client Portfolio',
          page: 'portfolio',
          hash: '#portfolio',
          href: '/#portfolio',
          icon: <Briefcase className="w-3.5 h-3.5" />,
          onClick: handleNavigate('portfolio', '#portfolio')
        });

        items.push({
          name: matchedProj ? matchedProj.title : subItem!,
          page: 'portfolio',
          hash: matchedProj ? `#portfolio?id=${matchedProj.id}` : '#portfolio',
          href: matchedProj ? `/#portfolio?id=${matchedProj.id}` : '/#portfolio',
          isCurrent: true
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // CASE F: Engineering Blog Articles (/blog or #blog)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'blog') {
      const matchedPost = resolvedPostSlug
        ? BLOG_POSTS.find((b) => b.slug === resolvedPostSlug || b.id === resolvedPostSlug)
        : null;

      if (matchedPost || subItem) {
        items.push({
          name: 'Engineering Blog',
          page: 'blog',
          hash: '#blog',
          href: '/#blog',
          icon: <FileText className="w-3.5 h-3.5" />,
          onClick: handleNavigate('blog', '#blog')
        });

        items.push({
          name: matchedPost ? matchedPost.title : subItem!,
          page: 'blog',
          hash: matchedPost ? `#blog?post=${matchedPost.slug}` : '#blog',
          href: matchedPost ? `/#blog?post=${matchedPost.slug}` : '/#blog',
          isCurrent: true
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // CASE G: Leadership & Team Profiles (/gallery or #gallery)
    // --------------------------------------------------------------------------
    if (resolvedPage === 'gallery') {
      const matchedMember = resolvedMemberId
        ? TEAM_MEMBERS.find((m) => m.id === resolvedMemberId)
        : null;

      if (matchedMember || subItem) {
        items.push({
          name: 'Leadership & Team',
          page: 'gallery',
          hash: '#gallery',
          href: '/#gallery',
          icon: <Users className="w-3.5 h-3.5" />,
          onClick: handleNavigate('gallery', '#gallery')
        });

        items.push({
          name: matchedMember ? `${matchedMember.name} (${matchedMember.titleRole})` : subItem!,
          page: 'gallery',
          hash: matchedMember ? `#gallery?member=${matchedMember.id}` : '#gallery',
          href: matchedMember ? `/#gallery?member=${matchedMember.id}` : '/#gallery',
          isCurrent: true
        });
        return items;
      }
    }

    // --------------------------------------------------------------------------
    // DEFAULT: Standard Page Level
    // --------------------------------------------------------------------------
    const pageDisplayName = PAGE_NAMES[resolvedPage] || humanizeSlug(resolvedPage);
    
    items.push({
      name: pageDisplayName,
      page: resolvedPage,
      hash: `#${resolvedPage}`,
      href: `/#${resolvedPage}`,
      icon: PAGE_ICONS[resolvedPage],
      onClick: subItem ? handleNavigate(resolvedPage, `#${resolvedPage}`) : undefined,
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
    customTrail,
    urlState,
    propCurrentPage,
    comboId,
    serviceId,
    locationId,
    serviceName,
    serviceLocationTitle,
    locationName,
    subItem,
    handleNavigate
  ]);

  // Hide on homepage unless explicit showOnHome is passed
  const isHomePage = trail.length <= 1;
  if (isHomePage && !showOnHome) {
    return null;
  }

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
        item: item.href
          ? `${origin}${item.href.startsWith('/') ? item.href : `/${item.href}`}`
          : (item.hash ? `${origin}/${item.hash}` : `${origin}/#${item.page || ''}`)
      }))
    };
  }, [trail]);

  return (
    <div className={`w-full ${className}`} aria-label="Breadcrumbs Section">
      {/* Schema.org JSON-LD Microdata Injected into DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        aria-label="Breadcrumb Navigation"
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
                    className="flex items-center gap-1.5 text-slate-900 dark:text-cyan-400 font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-xs"
                  >
                    {step.icon}
                    <span>{step.name}</span>
                  </span>
                ) : (
                  <a
                    href={step.href || step.hash || `/#${step.page || ''}`}
                    itemProp="item"
                    onClick={step.onClick || handleNavigate(step.page || 'home', step.hash)}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 hover:underline transition-colors cursor-pointer py-1"
                  >
                    {step.icon}
                    <span itemProp="name">{step.name}</span>
                  </a>
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
