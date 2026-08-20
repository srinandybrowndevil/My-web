import { LocationData, LocationId } from '../types';

export const LOCATIONS_DATA: Record<LocationId, LocationData> = {
  erode: {
    id: 'erode',
    name: 'Erode',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638001',
    coordinates: {
      lat: 11.3410,
      lng: 77.7172
    },
    headline: 'Enterprise Software, Web Development & AI Solutions in Erode',
    tagline: 'Empowering Erode\'s textile mills, turmeric traders, healthcare institutions, and B2B enterprises with high-speed digital technology.',
    overview: 'As the industrial heartbeat of the Kongu region and the global turmeric capital ("Yellow City"), Erode is undergoing a rapid digital evolution. MUCO Labs delivers world-class custom web development, mobile applications, enterprise ERP/CRM automation, and local SEO services tailored directly to the commercial dynamics of Erode.',
    majorIndustries: [
      {
        name: 'Textiles, Garments & Powerloom Clusters',
        description: 'Over 5,000+ powerlooms, spinning mills, and textile processing units requiring automated production management, digital B2B catalogs, and export portals.',
        solutionsNeeded: ['B2B Export Websites', 'Production Tracking ERP', 'Yarn Inventory Software', 'Global SEO']
      },
      {
        name: 'Turmeric Trading & Agro-Commodities',
        description: 'Erode Agricultural Producers Co-operative Marketing Society and wholesale mandi traders transitioning from manual ledgers to digital trade desks.',
        solutionsNeeded: ['Commodity Pricing Portals', 'Auction Management Software', 'WhatsApp Order Automation']
      },
      {
        name: 'Hospitals, Clinics & Healthcare Hubs',
        description: 'Major multi-specialty hospitals and diagnostic laboratories serving patients across Western Tamil Nadu needing digital patient booking and telemedicine.',
        solutionsNeeded: ['Hospital Management Systems', 'Patient Appointment Portals', 'Local SEO & Google Maps Ranking']
      },
      {
        name: 'Educational Institutions & Engineering Colleges',
        description: 'Premier universities, polytechnics, and schools requiring modern LMS platforms, student admission portals, and fast institutional websites.',
        solutionsNeeded: ['Admission Lead Portals', 'Campus ERP', 'Interactive Mobile Apps']
      }
    ],
    keyCommercialHubs: [
      'Brough Road Commercial District',
      'Perundurai Road IT & Corporate Corridor',
      'Nethaji Daily Market & Wholesale Textile Mandi',
      'Solar New Bus Terminus Business Zone',
      'Moolapalayam & Chithode Industrial Belts'
    ],
    localChallenges: [
      'Reliance on outdated legacy websites that load slowly on mobile devices and fail to convert search traffic.',
      'Lack of automated order tracking between yarn spinning, dyeing, and finished garment delivery.',
      'Low visibility on Google Search and Google Maps when international and interstate buyers look for suppliers in Erode.',
      'Manual, phone-call-heavy customer inquiries leading to missed leads during peak business hours.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'Custom Website & Web App Development',
        description: 'Sub-second loading Next.js & React web platforms engineered for maximum conversion, lead generation, and Google search dominance.',
        pricingEstimate: 'Starting from ₹14,999'
      },
      {
        serviceId: 'custom-software',
        serviceName: 'Enterprise Textile ERP & Production Software',
        description: 'Tailored manufacturing workflows, inventory control, automated invoice generation, and GST-compliant billing modules.',
        pricingEstimate: 'Starting from ₹79,999'
      },
      {
        serviceId: 'ai-solutions',
        serviceName: 'Multilingual AI & WhatsApp Support Agents',
        description: '24/7 automated Tamil & English customer support agents connected directly to official WhatsApp Business API.',
        pricingEstimate: 'Starting from ₹24,999'
      },
      {
        serviceId: 'digital-marketing',
        serviceName: 'Erode Local SEO & Google Business Profile Optimization',
        description: 'Dominant local pack rankings for "near me" and commercial B2B searches across Erode and Tamil Nadu.',
        pricingEstimate: 'Starting from ₹7,999/mo'
      }
    ],
    faqs: [
      {
        question: 'Why should an Erode business choose MUCO Labs over generic out-of-state agencies?',
        answer: 'MUCO Labs is headquartered right here in Erode. We understand the specific regional business landscape—from textile production cycles to local payment workflows—and provide in-person consultations, rapid response times, and tailored engineering rather than outsourced templates.'
      },
      {
        question: 'How long does it take to develop a professional business website in Erode?',
        answer: 'Standard high-performance business websites are delivered in 7 to 14 business days. Complex custom web applications, e-commerce stores, and enterprise ERP systems typically take 3 to 6 weeks with continuous milestone previews.'
      },
      {
        question: 'Can you help our Erode company rank #1 on Google Search and Google Maps?',
        answer: 'Yes. We engineer comprehensive technical on-page SEO, localized Schema markup, optimized Google Business Profile listings, and local citation architectures to maximize visibility for high-intent search terms like "website development company in Erode" and "textile manufacturers Erode".'
      },
      {
        question: 'Do you provide on-site technical support and training for our staff in Erode?',
        answer: 'Absolutely. Our local team conducts hands-on on-site training sessions for your management and staff in Erode, ensuring seamless adoption of your custom software or CMS.'
      }
    ],
    nearbyAreas: [
      { id: 'perundurai', name: 'Perundurai (SIPCOT Hub)', distance: '19 km' },
      { id: 'bhavani', name: 'Bhavani (Cauvery Basin)', distance: '14 km' },
      { id: 'chennimalai', name: 'Chennimalai (Handloom Capital)', distance: '28 km' },
      { id: 'gobichettipalayam', name: 'Gobichettipalayam', distance: '38 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  perundurai: {
    id: 'perundurai',
    name: 'Perundurai',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638052',
    coordinates: {
      lat: 11.2758,
      lng: 77.5828
    },
    headline: 'Industrial Web, ERP Software & Cloud Solutions in Perundurai SIPCOT',
    tagline: 'Engineered for manufacturing plants, chemical processing units, logistics carriers, and academic colleges in Perundurai.',
    overview: 'Home to the massive SIPCOT Industrial Growth Estate and reputed educational institutions, Perundurai is a manufacturing and logistics powerhouse. MUCO Labs engineers robust, secure ERP platforms, automated warehouse management portals, and high-converting B2B industrial websites.',
    majorIndustries: [
      {
        name: 'SIPCOT Heavy Manufacturing & Engineering',
        description: 'Automotive component fabricators, pump manufacturers, and heavy engineering facilities requiring real-time inventory tracking and CAD drawing repositories.',
        solutionsNeeded: ['Industrial ERP Software', 'AutoCAD Drafting & 3D Modeling', 'IoT Dashboard Integrations']
      },
      {
        name: 'Chemical, Leather & Dyeing Processing',
        description: 'Process chemical manufacturing requiring strict batch tracking, quality assurance reporting, and environmental compliance logging.',
        solutionsNeeded: ['Batch Tracking Systems', 'Compliance Management Software', 'Secure Client Portals']
      },
      {
        name: 'Logistics, Freight & Fleet Operators',
        description: 'Highway-connected freight forwarders transporting industrial goods across India needing real-time dispatch systems.',
        solutionsNeeded: ['GPS Fleet Tracking Portals', 'Online Booking Systems', 'Automated Driver Dispatch']
      }
    ],
    keyCommercialHubs: [
      'SIPCOT Industrial Complex (Phase I & II)',
      'Perundurai Bypass National Highway (NH 544) Logistic Hub',
      'Kongu Engineering College Academic Zone',
      'Perundurai Daily Market Commercial Area'
    ],
    localChallenges: [
      'Industrial units struggling with fragmented spreadsheets for complex supply chains.',
      'B2B manufacturing companies with outdated brochure websites failing to attract global RFP inquiries.',
      'High downtime in field operations due to lack of mobile-accessible plant status dashboards.'
    ],
    recommendedServices: [
      {
        serviceId: 'custom-software',
        serviceName: 'Manufacturing Execution & Inventory ERP',
        description: 'Automate raw material intake, production milestones, scrap rate analytics, and dispatch logistics.',
        pricingEstimate: 'Starting from ₹79,999'
      },
      {
        serviceId: 'web-dev',
        serviceName: 'B2B Industrial & Corporate Web Portals',
        description: 'High-speed technical product catalogs with interactive quote request forms and downloadable PDF specifications.',
        pricingEstimate: 'Starting from ₹19,999'
      },
      {
        serviceId: 'autocad-design',
        serviceName: 'Precision 2D/3D CAD Modeling & Drafting',
        description: 'Mechanical drafting, plant layout schematics, and DWG/DXF component vectorization.',
        pricingEstimate: 'Starting from ₹3,999'
      }
    ],
    faqs: [
      {
        question: 'Can MUCO Labs develop custom software for SIPCOT Perundurai manufacturing units?',
        answer: 'Yes. We specialize in building tailored Manufacturing Execution Systems (MES), raw material tracking tools, and production ERPs engineered specifically for SIPCOT industrial workflows.'
      },
      {
        question: 'Do you offer technical AMC maintenance for Perundurai companies?',
        answer: 'Yes. Our Cloud Service Management & AMC packages provide 24/7 server monitoring, automated database backups, and rapid on-site technical resolution.'
      }
    ],
    nearbyAreas: [
      { id: 'erode', name: 'Erode City Center', distance: '19 km' },
      { id: 'chennimalai', name: 'Chennimalai', distance: '14 km' },
      { id: 'bhavani', name: 'Bhavani', distance: '22 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  bhavani: {
    id: 'bhavani',
    name: 'Bhavani',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638301',
    coordinates: {
      lat: 11.4504,
      lng: 77.6836
    },
    headline: 'E-commerce, Web Design & Digital Growth in Bhavani',
    tagline: 'Modernizing Bhavani\'s famous Jamakkalam carpet weavers, commercial traders, and river basin enterprises.',
    overview: 'Located at the sacred confluence of the Cauvery and Bhavani rivers, Bhavani is internationally celebrated for the GI-tagged Bhavani Jamakkalam (woven carpets) and vibrant commercial commerce. MUCO Labs crafts direct-to-consumer e-commerce portals, local branding, and SEO engines.',
    majorIndustries: [
      {
        name: 'Bhavani Jamakkalam & Carpet Weaving',
        description: 'Traditional master weavers and modern manufacturing societies scaling their reach to pan-India and export markets.',
        solutionsNeeded: ['Direct-to-Consumer E-commerce', 'Payment Gateway Integration', 'Product Photography & Branding']
      },
      {
        name: 'Agro-Trade & River Basin Commerce',
        description: 'Agricultural produce marketing, irrigation equipment supplies, and wholesale food grain distributors.',
        solutionsNeeded: ['Wholesale Ordering Web Apps', 'Local SEO & Google Search Setup']
      }
    ],
    keyCommercialHubs: [
      'Bhavani Main Bazaar Commercial Street',
      'Sangameswarar Temple Tourism Corridor',
      'Anthiyur Junction Commercial Market',
      'Komarapalayam Bridge Industrial Link'
    ],
    localChallenges: [
      'Middlemen taking high margins from traditional weavers due to lack of direct online sales channels.',
      'Local retail businesses lacking modern Google Business Profiles and digital payment workflows.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'High-Converting E-commerce Stores',
        description: 'Modern online stores powered by Next.js, Razorpay payment gateways, and automated Shiprocket shipping.',
        pricingEstimate: 'Starting from ₹24,999'
      },
      {
        serviceId: 'digital-marketing',
        serviceName: 'Social Media & Performance Ads',
        description: 'Targeted Instagram, Facebook, and Google Shopping ads driving retail orders across India.',
        pricingEstimate: 'Starting from ₹7,999/mo'
      }
    ],
    faqs: [
      {
        question: 'Can you help Bhavani carpet weavers sell directly to customers across India and abroad?',
        answer: 'Yes. We build full-stack e-commerce stores with multi-currency payment processing, automated shipping label generation, and high-resolution product showcases that eliminate intermediary costs.'
      }
    ],
    nearbyAreas: [
      { id: 'erode', name: 'Erode City', distance: '14 km' },
      { id: 'gobichettipalayam', name: 'Gobichettipalayam', distance: '28 km' },
      { id: 'perundurai', name: 'Perundurai', distance: '22 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  gobichettipalayam: {
    id: 'gobichettipalayam',
    name: 'Gobichettipalayam',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638452',
    coordinates: {
      lat: 11.4550,
      lng: 77.4422
    },
    headline: 'Agri-Tech, Educational Portals & Web Development in Gobichettipalayam',
    tagline: 'Accelerating digital innovation across Gobi\'s silk reeling, agro-processing, and premier educational institutions.',
    overview: 'Known as the "Mini Hollywood" of Tamil cinema and an agricultural powerhouse, Gobichettipalayam leads in silk cultivation, paddy fields, and sugarcane processing. MUCO Labs builds agro-commerce platforms, institutional portals, and custom mobile apps for Gobi entrepreneurs.',
    majorIndustries: [
      {
        name: 'Silk Reeling & Agro-Processing',
        description: 'Leading producer of raw silk, mulberry farming, and automated agro-processing units.',
        solutionsNeeded: ['Silk Mandi Online Bidding', 'Agri Supply Chain Apps', 'Export Websites']
      },
      {
        name: 'Schools, Colleges & Healthcare',
        description: 'Prominent educational trusts and hospitals requiring streamlined digital admissions and telemedicine.',
        solutionsNeeded: ['School Admission Portals', 'Hospital SEO', 'Campus Management Systems']
      }
    ],
    keyCommercialHubs: [
      'Katchery Medu Central Commercial Area',
      'Sathy Main Road Business Center',
      'Gobi Bus Stand Commercial Plaza'
    ],
    localChallenges: [
      'Agro-exporters needing modern international web showcases to close European and Asian buyers.',
      'Schools and colleges experiencing slow inquiry turnaround on outdated websites.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'Agro-Business & Corporate Websites',
        description: 'Sleek, ultra-fast web platforms with product catalogs, inquiry funnels, and dynamic video showcases.',
        pricingEstimate: 'Starting from ₹14,999'
      },
      {
        serviceId: 'mobile-dev',
        serviceName: 'Farmer & Supply Chain Mobile Apps',
        description: 'Flutter and React Native apps supporting offline data entry, Tamil language localization, and push alerts.',
        pricingEstimate: 'Starting from ₹49,999'
      }
    ],
    faqs: [
      {
        question: 'Do you build Tamil language-friendly apps for rural agro-businesses in Gobi?',
        answer: 'Yes! We design intuitive bilingual user interfaces in both Tamil and English with voice-assisted input and clean iconography.'
      }
    ],
    nearbyAreas: [
      { id: 'sathyamangalam', name: 'Sathyamangalam', distance: '26 km' },
      { id: 'erode', name: 'Erode', distance: '38 km' },
      { id: 'bhavani', name: 'Bhavani', distance: '28 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  sathyamangalam: {
    id: 'sathyamangalam',
    name: 'Sathyamangalam',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638401',
    coordinates: {
      lat: 11.5034,
      lng: 77.2411
    },
    headline: 'Industrial Tech, Paper Mills & Engineering Software in Sathyamangalam',
    tagline: 'Empowering Sathy\'s paper mills, Bannari Amman engineering ecosystem, and agricultural enterprises.',
    overview: 'Located at the foothills of the Western Ghats, Sathyamangalam is renowned for major paper manufacturing mills, large-scale sugar factories, and high-tech engineering institutions. MUCO Labs delivers enterprise software, automated dashboards, and digital marketing.',
    majorIndustries: [
      {
        name: 'Paper & Board Manufacturing',
        description: 'Large-scale Kraft paper and packaging board manufacturers requiring raw material supply chain software.',
        solutionsNeeded: ['Paper Mill ERP', 'Weightbridge Automation', 'B2B Client Portals']
      },
      {
        name: 'Engineering Institutions & Tech Research',
        description: 'Academic hubs cultivating software developers and engineers needing modern development partnerships.',
        solutionsNeeded: ['Student Hackathon Platforms', 'EdTech LMS', 'Research Portals']
      }
    ],
    keyCommercialHubs: [
      'Sathy Main Bazaar Commercial Hub',
      'Bannari Amman Institute Knowledge Corridor',
      'Coimbatore-Mysore Highway Commercial Zone'
    ],
    localChallenges: [
      'Complex manufacturing plants needing centralized dashboards for multiple production shifts.',
      'Local businesses needing strong Google Maps presence for travelers on the Mysore highway.'
    ],
    recommendedServices: [
      {
        serviceId: 'custom-software',
        serviceName: 'Paper Mill & Factory Automation Software',
        description: 'Real-time production scheduling, shift output logs, downtime alerts, and automated customer dispatch.',
        pricingEstimate: 'Starting from ₹79,999'
      },
      {
        serviceId: 'web-dev',
        serviceName: 'Corporate & Institutional Web Portals',
        description: 'Interactive high-speed websites with dynamic event calendars, video hero banners, and CRM capture.',
        pricingEstimate: 'Starting from ₹14,999'
      }
    ],
    faqs: [
      {
        question: 'Can MUCO Labs integrate weightbridge hardware with our factory software in Sathy?',
        answer: 'Yes. We develop backend middleware and serial communication APIs that sync electronic weightbridge readings directly into your billing and dispatch ERP in real time.'
      }
    ],
    nearbyAreas: [
      { id: 'gobichettipalayam', name: 'Gobichettipalayam', distance: '26 km' },
      { id: 'erode', name: 'Erode', distance: '55 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  chennimalai: {
    id: 'chennimalai',
    name: 'Chennimalai',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638051',
    coordinates: {
      lat: 11.1667,
      lng: 77.6167
    },
    headline: 'Handloom Export Portals, E-commerce & Web Design in Chennimalai',
    tagline: 'Bringing Chennimalai\'s world-famous handloom bedsheets and textile weavers directly to international buyers.',
    overview: 'Chennimalai is globally celebrated as the handloom capital of South India, famous for woven bedspreads, cotton furnishing, and weaver co-operative federations. MUCO Labs empowers Chennimalai manufacturers with direct export websites, wholesale portals, and global SEO.',
    majorIndustries: [
      {
        name: 'Handloom & Powerloom Textile Weaving',
        description: 'Over 20,000+ handloom and powerloom weavers producing premium home furnishings and export fabrics.',
        solutionsNeeded: ['Global Export Showrooms', 'Wholesale Buyer Portals', 'Direct-to-Consumer E-commerce']
      },
      {
        name: 'Weaver Co-operative Societies',
        description: 'Large-scale co-operatives requiring member dividend management, yarn issue tracking, and online retail stores.',
        solutionsNeeded: ['Co-operative Management ERP', 'Point-of-Sale Billing', 'Inventory Sync']
      }
    ],
    keyCommercialHubs: [
      'Chennimalai Handloom Weavers Bazaar',
      'Murugan Temple Commercial Street',
      'Perundurai-Chennimalai Road Textile Corridor'
    ],
    localChallenges: [
      'Exporters relying solely on physical textile trade fairs instead of a 24/7 digital showroom with global SEO.',
      'Inventory errors between physical retail showrooms and wholesale order books.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'Textile Export & E-commerce Portals',
        description: 'Multi-currency digital showrooms featuring high-resolution fabric texture zooms, swatch ordering, and secure payments.',
        pricingEstimate: 'Starting from ₹19,999'
      },
      {
        serviceId: 'digital-marketing',
        serviceName: 'International B2B & Export SEO',
        description: 'Targeted Google Search ranking for global home textile buyers in the USA, Europe, and UAE.',
        pricingEstimate: 'Starting from ₹9,999/mo'
      }
    ],
    faqs: [
      {
        question: 'How can Chennimalai textile exporters get international client inquiries online?',
        answer: 'We build SEO-optimized export portals with structured product specifications, high-res fabric zoom viewers, downloadable spec sheets, and WhatsApp RFQ integration that rank for terms like "handloom bedspreads manufacturer India".'
      }
    ],
    nearbyAreas: [
      { id: 'perundurai', name: 'Perundurai', distance: '14 km' },
      { id: 'erode', name: 'Erode', distance: '28 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  kodumudi: {
    id: 'kodumudi',
    name: 'Kodumudi',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638151',
    coordinates: {
      lat: 11.0833,
      lng: 77.8833
    },
    headline: 'Web Development & Local Business Digitization in Kodumudi',
    tagline: 'Modern digital solutions for Kodumudi\'s agro-trade, hospitality, and temple tourism ecosystem.',
    overview: 'Nestled along the banks of the Cauvery River and famous for the Magudeswarar temple pilgrimage, Kodumudi is a thriving center for agriculture, tourism hospitality, and retail. MUCO Labs crafts booking portals, business websites, and local SEO setups.',
    majorIndustries: [
      {
        name: 'Temple Tourism & Hospitality',
        description: 'Hotels, lodges, travel operators, and heritage services welcoming thousands of pilgrims weekly.',
        solutionsNeeded: ['Hotel Booking Engines', 'Local Google Maps Optimization', 'WhatsApp Reservation Systems']
      },
      {
        name: 'Agriculture & Banana / Coconut Plantations',
        description: 'Extensive agricultural plantations requiring direct farmer-to-buyer sales links and logistics coordination.',
        solutionsNeeded: ['Agro-Commodity Catalogs', 'Direct Farmer Portals']
      }
    ],
    keyCommercialHubs: [
      'Kodumudi Temple Sannathi Street',
      'Cauvery Riverbank Commercial Area',
      'Erode-Karur Highway Commercial Link'
    ],
    localChallenges: [
      'Hotels and lodges losing bookings to third-party travel aggregators with high commission cuts.',
      'Agro-enterprises lacking online discoverability.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'Hospitality & Business Web Design',
        description: 'Mobile-first booking websites with zero-commission direct reservations and Google Maps integration.',
        pricingEstimate: 'Starting from ₹14,999'
      }
    ],
    faqs: [
      {
        question: 'Can MUCO Labs set up a direct room booking website for our lodge in Kodumudi?',
        answer: 'Yes! We create direct booking engines with instant WhatsApp booking notifications and UPI payments, eliminating OTA commission fees.'
      }
    ],
    nearbyAreas: [
      { id: 'erode', name: 'Erode', distance: '38 km' },
      { id: 'modakurichi', name: 'Modakurichi', distance: '22 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=630&q=85'
  },
  modakurichi: {
    id: 'modakurichi',
    name: 'Modakurichi',
    district: 'Erode District',
    state: 'Tamil Nadu',
    pincode: '638104',
    coordinates: {
      lat: 11.2333,
      lng: 77.7833
    },
    headline: 'Software, Web Design & Agro-Commerce in Modakurichi',
    tagline: 'Supporting Modakurichi\'s powerloom units, oil mills, and retail stores with modern web technology.',
    overview: 'Modakurichi is an active agricultural and textile assembly belt situated close to Erode. MUCO Labs provides local retail digitization, billing software, and custom websites.',
    majorIndustries: [
      {
        name: 'Oil Mills & Agro-Processing',
        description: 'Sesame, groundnut, and coconut oil expelling units seeking direct online retail distribution.',
        solutionsNeeded: ['Oil Brand E-commerce Store', 'FSSAI Compliance Display', 'Subscription Ordering']
      },
      {
        name: 'Powerloom Garment Sub-Contractors',
        description: 'Textile job-work units needing automated worker wage tracking and fabric processing logs.',
        solutionsNeeded: ['Worker Wage & Loom ERP', 'Order Job Work Trackers']
      }
    ],
    keyCommercialHubs: [
      'Modakurichi Main Market Square',
      'Erode-Modakurichi Road Commercial Belt'
    ],
    localChallenges: [
      'Manual bookkeeping for daily loom output and piece-rate labor wages causing accounting discrepancies.',
      'Local food and oil brands struggling to sell outside the local weekly shandy.'
    ],
    recommendedServices: [
      {
        serviceId: 'web-dev',
        serviceName: 'E-commerce & Direct Brand Websites',
        description: 'Sleek storefronts with subscription re-ordering, customer reviews, and automated courier tracking.',
        pricingEstimate: 'Starting from ₹19,999'
      }
    ],
    faqs: [
      {
        question: 'Can you help our cold-pressed oil brand in Modakurichi sell online across South India?',
        answer: 'Yes. We develop complete e-commerce stores equipped with recurring subscription options, Razorpay/PhonePe payment gateways, and automated logistics.'
      }
    ],
    nearbyAreas: [
      { id: 'erode', name: 'Erode', distance: '15 km' },
      { id: 'kodumudi', name: 'Kodumudi', distance: '22 km' },
      { id: 'chennimalai', name: 'Chennimalai', distance: '18 km' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=630&q=85'
  }
};

export const ALL_LOCATIONS = Object.values(LOCATIONS_DATA);
