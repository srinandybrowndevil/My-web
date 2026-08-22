import { PageId, LocationData, ServiceLocationCombo } from '../types';
import { FAQ_DATA } from '../data/faqData';
import { TeamMember } from '../data/galleryData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';

const SCHEMA_SCRIPT_ID = 'muco-jsonld-schema';

/**
 * Safely injects JSON-LD structured schema script into the document head
 */
export function injectJsonLdSchema(schemas: Record<string, unknown> | Array<Record<string, unknown>>) {
  if (typeof document === 'undefined') return;

  // Remove existing schema script if present
  const existingScript = document.getElementById(SCHEMA_SCRIPT_ID);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = SCHEMA_SCRIPT_ID;
  script.type = 'application/ld+json';
  
  const schemaPayload = Array.isArray(schemas) ? schemas : [schemas];
  script.textContent = JSON.stringify(schemaPayload, null, 2);

  document.head.appendChild(script);
}

/**
 * Core Organization Schema for MUCO Labs
 */
export function getOrganizationSchema() {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${origin}/#organization`,
    name: 'MUCO Labs',
    legalName: 'MUCO Labs Technology & Digital Innovations',
    url: origin,
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    description: 'MUCO Labs delivers high-performance enterprise web applications, mobile apps, custom software, AI solutions, and local SEO in Erode and across Tamil Nadu.',
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: 'Srinivash Mahalingam',
      jobTitle: 'Founder & Managing Director',
      telephone: '+91 6381809844',
      email: 'contact@mucolabs.com'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Erode Headquarters',
      addressLocality: 'Erode',
      addressRegion: 'Tamil Nadu',
      postalCode: '638001',
      addressCountry: 'IN'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 6381809844',
        contactType: 'customer service',
        email: 'contact@mucolabs.com',
        areaServed: ['Erode', 'Tamil Nadu', 'India', 'Worldwide'],
        availableLanguage: ['English', 'Tamil']
      }
    ],
    sameAs: [
      'https://linkedin.com/company/muco-labs',
      'https://x.com/muco_labs'
    ]
  };
}

/**
 * Generates verified LocalBusiness schema for a target location
 */
export function getLocationSchema(location: LocationData): Array<Record<string, unknown>> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';
  const orgSchema = getOrganizationSchema();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#localbusiness-${location.id}`,
    name: `MUCO Labs - ${location.name}`,
    image: location.heroImage,
    url: `${origin}/#locations?city=${location.id}`,
    telephone: '+91 6381809844',
    email: 'contact@mucolabs.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.state,
      postalCode: location.pincode,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:30'
      }
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: location.name
      },
      {
        '@type': 'AdministrativeArea',
        name: location.district
      },
      ...location.nearbyAreas.map((near) => ({
        '@type': 'AdministrativeArea',
        name: near.name
      }))
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${location.name} Digital & Software Solutions`,
      itemListElement: location.recommendedServices.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${svc.serviceName} in ${location.name}`,
          description: svc.description
        }
      }))
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations Served',
        item: `${origin}/#locations`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.name,
        item: `${origin}/#locations?city=${location.id}`
      }
    ]
  };

  return [orgSchema, localBusinessSchema, faqSchema, breadcrumb];
}

/**
 * Generates verified Service-Location Combination schema
 */
export function getServiceLocationSchema(combo: ServiceLocationCombo): Array<Record<string, unknown>> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';
  const orgSchema = getOrganizationSchema();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/#service-${combo.id}`,
    name: `${combo.serviceName} in ${combo.locationName}`,
    serviceType: combo.serviceName,
    provider: { '@id': `${origin}/#organization` },
    description: combo.metaDescription,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: combo.locationName
    },
    offers: {
      '@type': 'Offer',
      price: combo.startingPrice.replace(/[^0-9]/g, '') || '14999',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: combo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: combo.locationName,
        item: `${origin}/#locations?city=${combo.locationId}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${combo.serviceName} in ${combo.locationName}`,
        item: `${origin}/#locations?combo=${combo.id}`
      }
    ]
  };

  return [orgSchema, serviceSchema, faqSchema, breadcrumb];
}

/**
 * BreadcrumbList Schema for navigation context
 */
export function getBreadcrumbSchema(page: PageId, pageTitle: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin
      },
      ...(page !== 'home' ? [{
        '@type': 'ListItem',
        position: 2,
        name: pageTitle,
        item: `${origin}/#${page}`
      }] : [])
    ]
  };
}

/**
 * Generates page-specific JSON-LD schemas
 */
export function getPageSchemaMarkup(page: PageId): Array<Record<string, unknown>> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';
  const orgSchema = getOrganizationSchema();

  const schemas: Array<Record<string, unknown>> = [orgSchema];

  switch (page) {
    case 'home':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: 'MUCO Labs',
          description: 'Premier Enterprise Software Development, AI Integrations & Local SEO in Erode & Tamil Nadu',
          publisher: { '@id': `${origin}/#organization` }
        },
        getBreadcrumbSchema('home', 'Home')
      );
      break;

    case 'about':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About MUCO Labs',
          description: 'Leadership board, executive vision, and headquarters of MUCO Labs in Erode, Tamil Nadu.',
          mainEntity: { '@id': `${origin}/#organization` }
        },
        getBreadcrumbSchema('about', 'About Us')
      );
      break;

    case 'locations':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Locations Served | Erode District & Tamil Nadu Technology Hubs | MUCO Labs',
          description: 'Explore custom software development, web applications, and AI automation tailored to Erode, Perundurai, Bhavani, Gobi, Chennimalai, and Sathyamangalam.',
          mainEntity: {
            '@type': 'ItemList',
            name: 'Strategic Locations Served in Tamil Nadu',
            itemListElement: Object.values(LOCATIONS_DATA).map((loc, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: `${loc.name} Hub`,
              url: `${origin}/#locations?city=${loc.id}`
            }))
          }
        },
        getBreadcrumbSchema('locations', 'Locations Served')
      );
      break;

    case 'services':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Software & Digital Engineering Services',
          provider: { '@id': `${origin}/#organization` },
          areaServed: ['Erode', 'Tamil Nadu', 'Worldwide'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'MUCO Labs Technology & Digital Capabilities',
            itemListElement: [
              'Website Development',
              'Mobile App Development',
              'Custom Software Development',
              'CRM & ERP Solutions',
              'SaaS Platform Development',
              'AI Chatbots & Automation',
              'Cloud Service Management',
              'AutoCAD Design & Drafting',
              'Digital Marketing & SEO'
            ].map((serviceName) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: serviceName
              }
            }))
          }
        },
        getBreadcrumbSchema('services', 'Services')
      );
      break;

    case 'courses':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          name: 'MUCO Labs & Way2Me Software Engineering & AI Masterclasses',
          description: 'Hands-on training courses and 1-on-1 mentorship programs in Full-Stack Web Development, Mobile Apps, Generative AI, SaaS Architecture, AutoCAD, and Digital Marketing.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Way2Me Academy in association with MUCO Labs',
            url: 'https://way2me.co.in',
            founder: {
              '@type': 'Person',
              name: 'Yogaharikaran'
            },
            telephone: '+91 9566596501',
            email: 'admin@way2me.in'
          },
          educationalCredentialAwarded: 'Joint Certificate of Engineering Mastery from MUCO Labs & Way2Me'
        },
        getBreadcrumbSchema('courses', 'Mastery Courses')
      );
      break;

    case 'portfolio':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'MUCO Labs Project Portfolio & Success Stories',
          description: 'Showcase of live client software solutions, mobile apps, and SaaS platforms built by MUCO Labs.',
          mainEntity: {
            '@type': 'ItemList',
            name: 'Featured Client Projects',
            numberOfItems: 6
          }
        },
        getBreadcrumbSchema('portfolio', 'Portfolio')
      );
      break;

    case 'pricing':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'MUCO Labs Software Development Packages',
          description: 'Transparent web, mobile app, and SaaS development package pricing tiers.',
          brand: { '@id': `${origin}/#organization` },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: '14999',
            highPrice: '149999',
            offerCount: 10
          }
        },
        getBreadcrumbSchema('pricing', 'Pricing & Packages')
      );
      break;

    case 'maintenance':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Annual Maintenance Contracts (AMC) & Cloud DevOps',
          serviceType: 'IT Maintenance & Server Infrastructure',
          provider: { '@id': `${origin}/#organization` },
          description: '24/7 server health monitoring, security patch updates, automated backups, and SLA support.'
        },
        getBreadcrumbSchema('maintenance', 'Maintenance Plans')
      );
      break;

    case 'faq':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        },
        getBreadcrumbSchema('faq', 'Frequently Asked Questions')
      );
      break;

    case 'contact':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact MUCO Labs',
          description: 'Get in touch with MUCO Labs engineering team for custom quotes and project consultations in Erode, Tamil Nadu.',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: 'MUCO Labs Headquarters',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            telephone: '+91 6381809844',
            email: 'contact@mucolabs.com',
            priceRange: '₹₹',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Erode Headquarters',
              addressLocality: 'Erode',
              addressRegion: 'Tamil Nadu',
              postalCode: '638001',
              addressCountry: 'IN'
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '19:00'
            }
          }
        },
        getBreadcrumbSchema('contact', 'Contact Us')
      );
      break;

    case 'apps':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'App Store & Play Store Publishing Services',
          operatingSystem: 'iOS, Android',
          applicationCategory: 'BusinessApplication',
          author: { '@id': `${origin}/#organization` }
        },
        getBreadcrumbSchema('apps', 'App Store Publishing')
      );
      break;

    case 'blog':
      schemas.push(
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'MUCO Labs Tech Blog & Engineering Insights',
          description: 'Official tech blog covering AI automation, software engineering, cloud architecture, and local business digital transformation.',
          publisher: { '@id': `${origin}/#organization` }
        },
        getBreadcrumbSchema('blog', 'Blog & Insights')
      );
      break;

    case 'notfound':
      schemas.push(
        getBreadcrumbSchema('notfound', '404 - Page Not Found')
      );
      break;

    default:
      schemas.push(getBreadcrumbSchema(page, page.toUpperCase()));
      break;
  }

  return schemas;
}

/**
 * Generates Person schema markup for team member inspection
 */
export function getMemberSchemaMarkup(member: TeamMember): Array<Record<string, unknown>> {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mucolabs.com';
  const orgSchema = getOrganizationSchema();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.titleRole,
    worksFor: { '@id': `${origin}/#organization` },
    description: member.bio,
    image: member.image,
    knowsAbout: member.skills
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Team Directory',
        item: `${origin}/#gallery`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: member.name,
        item: `${origin}/#gallery?member=${encodeURIComponent(member.id)}`
      }
    ]
  };

  return [orgSchema, personSchema, breadcrumb];
}
