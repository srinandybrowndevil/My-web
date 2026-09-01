export interface KeywordMapping {
  keyword: string;
  category: 'Commercial' | 'Service' | 'Problem-Solving' | 'Industry-Specific' | 'Local-Intent' | 'Long-Tail';
  location: string;
  searchIntent: 'Transactional' | 'Commercial Investigation' | 'Informational' | 'Navigational';
  primaryUrl: string;
  primaryTargetPage: string;
  secondaryKeywords: string[];
  suggestedAnchorText: string;
  internalLinkTargets: string[];
  searchVolumeTier: 'High' | 'Medium' | 'Low (High-Intent)';
}

export const SEO_KEYWORD_DATABASE: KeywordMapping[] = [
  // Commercial Keywords - Erode Core
  {
    keyword: 'website development company in Erode',
    category: 'Commercial',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-erode',
    primaryTargetPage: 'Locations (Website Development in Erode)',
    secondaryKeywords: [
      'best web development company Erode',
      'web design company in Erode',
      'website design services Erode',
      'top web designers in Erode',
      'custom website maker in Erode'
    ],
    suggestedAnchorText: 'Website Development in Erode',
    internalLinkTargets: ['#services', '#pricing', '#portfolio', '#contact'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'best website development company in Erode',
    category: 'Commercial',
    location: 'Erode',
    searchIntent: 'Commercial Investigation',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-erode',
    primaryTargetPage: 'Locations (Website Development in Erode)',
    secondaryKeywords: [
      'top rated web development firm Erode',
      'professional web development agency Erode',
      'number 1 website company Erode'
    ],
    suggestedAnchorText: 'best website development company in Erode',
    internalLinkTargets: ['#portfolio', '#about', '#contact'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'software development company in Erode',
    category: 'Commercial',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=custom-software-erode',
    primaryTargetPage: 'Locations (Custom Software in Erode)',
    secondaryKeywords: [
      'custom software development Erode',
      'IT company in Erode',
      'software companies in Erode district',
      'enterprise ERP developers Erode'
    ],
    suggestedAnchorText: 'Software Development Company in Erode',
    internalLinkTargets: ['#services', '#pricing', '#maintenance'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'mobile app development company in Erode',
    category: 'Commercial',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=mobile-app-development-erode',
    primaryTargetPage: 'Locations (Mobile App Development in Erode)',
    secondaryKeywords: [
      'Android app developers in Erode',
      'iOS app development company Erode',
      'Flutter app development Erode',
      'React Native developers in Erode'
    ],
    suggestedAnchorText: 'Mobile App Development in Erode',
    internalLinkTargets: ['#apps', '#services', '#pricing'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'SEO company in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=seo-services-erode',
    primaryTargetPage: 'Locations (SEO & Local SEO in Erode)',
    secondaryKeywords: [
      'local SEO services in Erode',
      'SEO agency Erode',
      'Google Maps ranking Erode',
      'digital marketing company in Erode'
    ],
    suggestedAnchorText: 'SEO Company in Erode',
    internalLinkTargets: ['#services', '#pricing', '#contact'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'digital marketing agency in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=digital-marketing-erode',
    primaryTargetPage: 'Locations (Digital Marketing in Erode)',
    secondaryKeywords: [
      'social media marketing agency Erode',
      'Google Ads agency Erode',
      'lead generation company Erode',
      'online marketing services Erode'
    ],
    suggestedAnchorText: 'Digital Marketing Agency in Erode',
    internalLinkTargets: ['#services', '#pricing'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'AI development company in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Commercial Investigation',
    primaryUrl: 'https://mucolabs.in/#locations?combo=ai-development-erode',
    primaryTargetPage: 'Locations (AI Development in Erode)',
    secondaryKeywords: [
      'AI chatbot development Erode',
      'WhatsApp AI automation company Erode',
      'LLM integration services Erode',
      'business automation company in Erode'
    ],
    suggestedAnchorText: 'AI Development in Erode',
    internalLinkTargets: ['#services', '#courses', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'ecommerce development company in Erode',
    category: 'Commercial',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=ecommerce-development-erode',
    primaryTargetPage: 'Locations (E-commerce Development in Erode)',
    secondaryKeywords: [
      'online store maker in Erode',
      'Shopify web designer Erode',
      'Next.js ecommerce agency Erode',
      'saree online store development Erode'
    ],
    suggestedAnchorText: 'E-commerce Development Company in Erode',
    internalLinkTargets: ['#services', '#pricing'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'UI UX design company in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Commercial Investigation',
    primaryUrl: 'https://mucolabs.in/#locations?combo=ui-ux-design-erode',
    primaryTargetPage: 'Locations (UI/UX Design in Erode)',
    secondaryKeywords: [
      'Figma designer Erode',
      'product UI design agency Erode',
      'mobile app UI design Erode',
      'website redesign Erode'
    ],
    suggestedAnchorText: 'UI/UX Design in Erode',
    internalLinkTargets: ['#services', '#portfolio'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'AutoCAD design company in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=autocad-design-erode',
    primaryTargetPage: 'Locations (AutoCAD Design in Erode)',
    secondaryKeywords: [
      '2D 3D CAD drafting Erode',
      'architectural floor plans CAD Erode',
      'mechanical 3D modeling Erode',
      'MEP drafting services Erode',
      'DWG drawing conversion Erode'
    ],
    suggestedAnchorText: 'AutoCAD Design & CAD Drafting in Erode',
    internalLinkTargets: ['#services', '#pricing', '#contact'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'logo design and branding agency in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=branding-erode',
    primaryTargetPage: 'Locations (Branding & Logo Design in Erode)',
    secondaryKeywords: [
      'best logo designer in Erode',
      'corporate branding agency Erode',
      'packaging design company Erode',
      'graphic design services Erode',
      'business card designer Erode'
    ],
    suggestedAnchorText: 'Branding & Logo Design in Erode',
    internalLinkTargets: ['#services', '#portfolio', '#pricing'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'WhatsApp Business API and IT consulting in Erode',
    category: 'Service',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=it-consulting-erode',
    primaryTargetPage: 'Locations (IT Consulting in Erode)',
    secondaryKeywords: [
      'WhatsApp API integration company Erode',
      'official WhatsApp green tick Erode',
      'IT consulting firm in Erode',
      'cloud migration consultant Erode',
      'business automation consultant Erode'
    ],
    suggestedAnchorText: 'IT Consulting & WhatsApp Business API in Erode',
    internalLinkTargets: ['#services', '#contact'],
    searchVolumeTier: 'High'
  },

  // Industry-Specific Keywords
  {
    keyword: 'website development for textile businesses Erode',
    category: 'Industry-Specific',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-erode',
    primaryTargetPage: 'Locations (Website Development in Erode)',
    secondaryKeywords: [
      'spinning mill website design Erode',
      'garment exporter web portal Erode',
      'powerloom catalog website Erode',
      'textile ERP software Erode'
    ],
    suggestedAnchorText: 'Textile Website Development in Erode',
    internalLinkTargets: ['#portfolio', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'turmeric export website development Erode',
    category: 'Industry-Specific',
    location: 'Erode',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?city=erode',
    primaryTargetPage: 'Locations (Erode Hub)',
    secondaryKeywords: [
      'mandi trading software Erode',
      'agro commodity export website Erode',
      'spices online store development Erode'
    ],
    suggestedAnchorText: 'Agro & Turmeric Trade Portals in Erode',
    internalLinkTargets: ['#services', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'hospital management software in Erode',
    category: 'Industry-Specific',
    location: 'Erode',
    searchIntent: 'Commercial Investigation',
    primaryUrl: 'https://mucolabs.in/#locations?combo=custom-software-erode',
    primaryTargetPage: 'Locations (Custom Software in Erode)',
    secondaryKeywords: [
      'clinic appointment booking app Erode',
      'hospital website design in Erode',
      'diagnostic lab software Erode'
    ],
    suggestedAnchorText: 'Healthcare Software in Erode',
    internalLinkTargets: ['#services', '#portfolio'],
    searchVolumeTier: 'Medium'
  },

  // Regional Surrounding Hubs Keywords
  {
    keyword: 'website development company in Perundurai',
    category: 'Commercial',
    location: 'Perundurai',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-perundurai',
    primaryTargetPage: 'Locations (Website Development in Perundurai)',
    secondaryKeywords: [
      'SIPCOT web development company',
      'industrial software developers Perundurai',
      'manufacturing ERP software Perundurai'
    ],
    suggestedAnchorText: 'Website Development in Perundurai',
    internalLinkTargets: ['#services', '#pricing'],
    searchVolumeTier: 'High'
  },
  {
    keyword: 'web design company in Bhavani',
    category: 'Commercial',
    location: 'Bhavani',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-bhavani',
    primaryTargetPage: 'Locations (Website Development in Bhavani)',
    secondaryKeywords: [
      'Bhavani carpet online store development',
      'Jamakkalam ecommerce website Bhavani',
      'local SEO services in Bhavani'
    ],
    suggestedAnchorText: 'Web Design in Bhavani',
    internalLinkTargets: ['#services', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'handloom export website development Chennimalai',
    category: 'Industry-Specific',
    location: 'Chennimalai',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-chennimalai',
    primaryTargetPage: 'Locations (Website Development in Chennimalai)',
    secondaryKeywords: [
      'bedsheet exporter website Chennimalai',
      'weaver co-operative portal Chennimalai',
      'textile digital showroom Chennimalai'
    ],
    suggestedAnchorText: 'Handloom Export Portals in Chennimalai',
    internalLinkTargets: ['#services', '#pricing'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'website development in Gobichettipalayam',
    category: 'Commercial',
    location: 'Gobichettipalayam',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-gobichettipalayam',
    primaryTargetPage: 'Locations (Website Development in Gobichettipalayam)',
    secondaryKeywords: [
      'web design Gobi',
      'silk agro commerce website Gobi',
      'school college website design Gobichettipalayam'
    ],
    suggestedAnchorText: 'Website Development in Gobichettipalayam',
    internalLinkTargets: ['#services', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'paper mill ERP software Sathyamangalam',
    category: 'Industry-Specific',
    location: 'Sathyamangalam',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=custom-software-sathyamangalam',
    primaryTargetPage: 'Locations (Custom Software in Sathyamangalam)',
    secondaryKeywords: [
      'industrial software developers Sathyamangalam',
      'factory weightbridge integration software Sathy',
      'web design Sathyamangalam'
    ],
    suggestedAnchorText: 'Industrial Software in Sathyamangalam',
    internalLinkTargets: ['#services', '#maintenance'],
    searchVolumeTier: 'Low (High-Intent)'
  },
  {
    keyword: 'hotel booking website development Kodumudi',
    category: 'Industry-Specific',
    location: 'Kodumudi',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-kodumudi',
    primaryTargetPage: 'Locations (Website Development in Kodumudi)',
    secondaryKeywords: [
      'lodge room reservation website Kodumudi',
      'temple tourism website design Kodumudi',
      'local SEO Kodumudi'
    ],
    suggestedAnchorText: 'Hospitality Web Development in Kodumudi',
    internalLinkTargets: ['#services', '#contact'],
    searchVolumeTier: 'Low (High-Intent)'
  },
  {
    keyword: 'cold pressed oil ecommerce website Modakurichi',
    category: 'Industry-Specific',
    location: 'Modakurichi',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?combo=website-development-modakurichi',
    primaryTargetPage: 'Locations (Website Development in Modakurichi)',
    secondaryKeywords: [
      'oil mill online store Modakurichi',
      'powerloom billing software Modakurichi',
      'web design Modakurichi'
    ],
    suggestedAnchorText: 'E-commerce & Web Design in Modakurichi',
    internalLinkTargets: ['#services', '#pricing'],
    searchVolumeTier: 'Low (High-Intent)'
  },

  // Problem-Solving Keywords
  {
    keyword: 'how to get my business on Google Erode',
    category: 'Problem-Solving',
    location: 'Erode',
    searchIntent: 'Informational',
    primaryUrl: 'https://mucolabs.in/#blog?post=local-seo-google-maps-erode-guide',
    primaryTargetPage: 'Blog (Local SEO Guide for Erode Businesses)',
    secondaryKeywords: [
      'Google Maps listing for business in Erode',
      'Google Business Profile setup Erode',
      'local pack SEO steps Erode'
    ],
    suggestedAnchorText: 'Guide to Ranking on Google in Erode',
    internalLinkTargets: ['#locations?combo=seo-services-erode', '#contact'],
    searchVolumeTier: 'Medium'
  },
  {
    keyword: 'how to increase website traffic Erode',
    category: 'Problem-Solving',
    location: 'Erode',
    searchIntent: 'Informational',
    primaryUrl: 'https://mucolabs.in/#blog?post=how-erode-businesses-generate-leads-online',
    primaryTargetPage: 'Blog (Lead Generation & Traffic Blueprint)',
    secondaryKeywords: [
      'generate leads online Erode',
      'digital marketing strategy Erode SMEs',
      'website conversion tips Erode'
    ],
    suggestedAnchorText: 'Online Lead Generation Guide',
    internalLinkTargets: ['#locations?combo=digital-marketing-erode', '#services'],
    searchVolumeTier: 'Medium'
  },

  // Local-Intent ("Near Me") Keywords
  {
    keyword: 'web developer near me',
    category: 'Local-Intent',
    location: 'Erode & Tamil Nadu',
    searchIntent: 'Transactional',
    primaryUrl: 'https://mucolabs.in/#locations?city=erode',
    primaryTargetPage: 'Locations (Erode Headquarters)',
    secondaryKeywords: [
      'website design company near me',
      'software developers near me',
      'SEO agency near me',
      'mobile app developers near me'
    ],
    suggestedAnchorText: 'Local Web Developers Near You',
    internalLinkTargets: ['#services', '#pricing', '#contact'],
    searchVolumeTier: 'High'
  }
];

export const TOTAL_INDEXED_KEYWORDS = SEO_KEYWORD_DATABASE.length;
