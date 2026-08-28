export type Language = 'en' | 'ta';

export interface TranslationDictionary {
  // Navigation
  nav: {
    home: string;
    work: string;
    services: string;
    systems: string;
    process: string;
    about: string;
    learn: string;
    pricing: string;
    apps: string;
    maintenance: string;
    locations: string;
    blog: string;
    faq: string;
    contact: string;
    startProject: string;
    searchPlaceholder: string;
    more: string;
    signIn: string;
    signUp: string;
    signOut: string;
    myAccount: string;
    profile: string;
    privacy: string;
    terms: string;
  };
  // Hero & Global
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    subtitle: string;
    startProjectBtn: string;
    exploreWorkBtn: string;
    interactiveConsoleTitle: string;
  };
  // Common CTAs & Labels
  common: {
    loading: string;
    submit: string;
    submitting: string;
    save: string;
    cancel: string;
    close: string;
    viewAll: string;
    explore: string;
    learnMore: string;
    readMore: string;
    getStarted: string;
    contactUs: string;
    sendRfp: string;
    bookConsultation: string;
    success: string;
    error: string;
    required: string;
    email: string;
    phone: string;
    name: string;
    company: string;
    message: string;
    budget: string;
    timeline: string;
    paymentTermNotice: string;
  };
  // Sections
  sections: {
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    featuredWorkTitle: string;
    featuredWorkSubtitle: string;
    whyMucoTitle: string;
    whyMucoSubtitle: string;
    processTitle: string;
    processSubtitle: string;
    founderTitle: string;
    founderSubtitle: string;
    pricingTitle: string;
    pricingSubtitle: string;
    estimatorTitle: string;
    estimatorSubtitle: string;
  };
  // Auth
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    fullNameLabel: string;
    forgotPassword: string;
    resetPassword: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    signInWithGoogle: string;
    orWithEmail: string;
    agreeToTerms: string;
    termsAndConditions: string;
    privacyPolicy: string;
    marketingConsent: string;
    emailVerificationNotice: string;
    sendResetLink: string;
    resetLinkSent: string;
  };
  // Legal
  legal: {
    privacyTitle: string;
    privacySubtitle: string;
    termsTitle: string;
    termsSubtitle: string;
    lastUpdated: string;
    dpdpNotice: string;
    advancePaymentClause: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      services: 'Services',
      systems: 'Systems',
      process: 'Process',
      about: 'About',
      learn: 'Learn',
      pricing: 'Pricing',
      apps: 'Publish Apps',
      maintenance: 'Maintenance',
      locations: 'Regional Hubs',
      blog: 'Blog',
      faq: 'FAQ',
      contact: 'Contact',
      startProject: 'Start a Project',
      searchPlaceholder: 'Search services, portfolio, pages...',
      more: 'More',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      myAccount: 'My Account',
      profile: 'User Profile',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions'
    },
    hero: {
      badge: 'MUCO LABS • SYSTEMS & AI ENGINEERING',
      headlinePart1: 'We build digital systems,',
      headlinePart2: 'custom software & AI.',
      subtitle: 'Intelligent systems engineering, web & mobile applications, autonomous AI agents, and business automation built for forward-thinking enterprises.',
      startProjectBtn: 'Start a Project',
      exploreWorkBtn: 'Explore Selected Work',
      interactiveConsoleTitle: 'MUCO Live Autonomous Systems Visualizer'
    },
    common: {
      loading: 'Loading...',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      save: 'Save Changes',
      cancel: 'Cancel',
      close: 'Close',
      viewAll: 'View All',
      explore: 'Explore',
      learnMore: 'Learn More',
      readMore: 'Read More',
      getStarted: 'Get Started',
      contactUs: 'Contact Us',
      sendRfp: 'Submit Formal RFP',
      bookConsultation: 'Book Architecture Call',
      success: 'Success',
      error: 'An error occurred. Please try again.',
      required: 'Required',
      email: 'Email Address',
      phone: 'Phone Number',
      name: 'Full Name',
      company: 'Company / Organization',
      message: 'Project Details / Message',
      budget: 'Estimated Budget',
      timeline: 'Expected Timeline',
      paymentTermNotice: 'Unless otherwise agreed in the written project proposal or agreement, custom projects require a 50% advance payment before project commencement, with the remaining balance billed according to agreed milestones.'
    },
    sections: {
      capabilitiesTitle: 'Three Core Engineering Disciplines',
      capabilitiesSubtitle: 'From zero-to-one software development to self-operating AI agent swarms and scalable cloud backends.',
      featuredWorkTitle: 'Selected Production Work',
      featuredWorkSubtitle: 'Production-grade applications engineered for mission-critical reliability, performance, and commercial scale.',
      whyMucoTitle: 'Why Forward-Thinking Enterprises Choose MUCO Labs',
      whyMucoSubtitle: 'Four foundational engineering principles that separate technical craftsmanship from generic agency templates.',
      processTitle: 'Our 5-Step Engineering Methodology',
      processSubtitle: 'A structured, transparent delivery pipeline from architectural diagnosis to high-uptime scaling.',
      founderTitle: 'Leadership & Engineering Vision',
      founderSubtitle: 'Built and led by engineers dedicated to transparent execution and long-term digital architecture.',
      pricingTitle: 'Transparent Investment & Modular Packages',
      pricingSubtitle: 'Clear upfront pricing with no hidden markups, detailed deliverables, and guaranteed SLA terms.',
      estimatorTitle: 'Interactive Project Quote Builder',
      estimatorSubtitle: 'Calculate an instant, itemized estimate for your custom software and AI requirements.'
    },
    auth: {
      signInTitle: 'Welcome Back to MUCO Labs',
      signInSubtitle: 'Access your saved project estimates, requests, and architecture consultations.',
      signUpTitle: 'Create Your MUCO Account',
      signUpSubtitle: 'Manage your enterprise project requests, saved estimates, and technical consultations.',
      emailLabel: 'Work Email Address',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      fullNameLabel: 'Full Name',
      forgotPassword: 'Forgot password?',
      resetPassword: 'Reset Password',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signInWithGoogle: 'Continue with Google',
      orWithEmail: 'or continue with email',
      agreeToTerms: 'I agree to the Terms & Conditions and acknowledge the Privacy Policy.',
      termsAndConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy',
      marketingConsent: 'I would like to receive MUCO Labs engineering insights and platform updates (Optional).',
      emailVerificationNotice: 'A verification link has been sent to your email. Please verify your account for full access.',
      sendResetLink: 'Send Password Reset Link',
      resetLinkSent: 'Password reset link has been dispatched to your email.'
    },
    legal: {
      privacyTitle: 'Privacy Policy & Data Protection Notice',
      privacySubtitle: 'Designed in alignment with the Digital Personal Data Protection Act, 2023 (DPDP) and applicable rules.',
      termsTitle: 'Master Terms of Service & Commercial Engagement',
      termsSubtitle: 'Clear, transparent commercial and legal terms governing all MUCO Labs client engineering engagements.',
      lastUpdated: 'Last Updated: August 2026',
      dpdpNotice: 'MUCO Labs handles personal and business data strictly under purpose limitation, data minimization, and secure authorization standards in alignment with the DPDP Act, 2023.',
      advancePaymentClause: 'Commercial Terms: Unless otherwise agreed in the written project proposal or agreement, custom projects require a 50% advance payment before project commencement. The remaining balance is billed according to mutually agreed milestones.'
    }
  },
  ta: {
    nav: {
      home: 'முகப்பு',
      work: 'பணிகள்',
      services: 'சேவைகள்',
      systems: 'AI அமைப்புகள்',
      process: 'செயல்முறை',
      about: 'எங்களை பற்றி',
      learn: 'பயிற்சிகள்',
      pricing: 'விலைப்பட்டியல்',
      apps: 'செயலி வெளியீடு',
      maintenance: 'பராமரிப்பு',
      locations: 'மண்டல மையங்கள்',
      blog: 'வலைப்பதிவு',
      faq: 'கேள்வி பதில்',
      contact: 'தொடர்புக்கு',
      startProject: 'திட்டத்தை துவங்குங்கள்',
      searchPlaceholder: 'சேவைகள், திட்டங்கள், பக்கங்களைத் தேடுங்கள்...',
      more: 'மேலும்',
      signIn: 'உள்நுழைக',
      signUp: 'பதிவு செய்க',
      signOut: 'வெளியேறுக',
      myAccount: 'என் கணக்கு',
      profile: 'சுயவிவரம்',
      privacy: 'தனியுரிமைக் கொள்கை',
      terms: 'விதிமுறைகள் & நிபந்தனைகள்'
    },
    hero: {
      badge: 'முகோ லேப்ஸ் • சிஸ்டம்ஸ் & AI பொறியியல்',
      headlinePart1: 'நவீன டிஜிட்டல் அமைப்புகள்,',
      headlinePart2: 'மென்பொருள் & AI உருவாக்குகிறோம்.',
      subtitle: 'நவீன நிறுவனங்களுக்கான அதிவேக வெப் & மொபைல் செயலிகள், தன்னாட்சி AI ஏஜெண்டுகள் மற்றும் வணிக ஆட்டோமேஷன் பொறியியல்.',
      startProjectBtn: 'திட்டத்தை துவங்குங்கள்',
      exploreWorkBtn: 'எங்கள் பணிகளை காண்க',
      interactiveConsoleTitle: 'MUCO நேரடி தன்னாட்சி AI சிஸ்டம் கன்சோல்'
    },
    common: {
      loading: 'ஏற்றுகிறது...',
      submit: 'விண்ணப்பிக்கவும்',
      submitting: 'அனுப்பப்படுகிறது...',
      save: 'சேமிக்க',
      cancel: 'ரத்து செய்',
      close: 'மூடு',
      viewAll: 'அனைத்தையும் காண்க',
      explore: 'ஆராய்க',
      learnMore: 'மேலும் அறிய',
      readMore: 'முழுமையாக படிக்க',
      getStarted: 'தொடங்குங்கள்',
      contactUs: 'எங்களை தொடர்பு கொள்ள',
      sendRfp: 'திட்ட கோரிக்கை சமர்ப்பிக்க',
      bookConsultation: 'ஆலோசனைக்கு முன்பதிவு செய்',
      success: 'வெற்றிகரமாக முடிந்தது',
      error: 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
      required: 'கட்டாயம்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      name: 'முழு பெயர்',
      company: 'நிறுவனத்தின் பெயர்',
      message: 'திட்ட விவரங்கள் / செய்தி',
      budget: 'மதிப்பிடப்பட்ட பட்ஜெட்',
      timeline: 'எதிர்பார்க்கப்படும் கால அளவு',
      paymentTermNotice: 'எழுத்துப்பூர்வ திட்ட ஒப்பந்தத்தில் குறிப்பிடப்படாவிட்டால், அனைத்து தனிப்பயன் திட்டங்களுக்கும் தொடங்குவதற்கு முன் 50% முன்பணம் தேவைப்படுகிறது, மீதமுள்ள தொகை ஒப்புக்கொள்ளப்பட்ட மைல்கல் அடிப்படையில் செலுத்தப்படும்.'
    },
    sections: {
      capabilitiesTitle: 'மூன்று முக்கிய பொறியியல் துறைகள்',
      capabilitiesSubtitle: 'முழுமையான மென்பொருள் உருவாக்கம் முதல் தன்னாட்சி AI அமைப்புகள் மற்றும் பாதுகாப்பான கிளவுட் கட்டமைப்பு வரை.',
      featuredWorkTitle: 'தேர்ந்தெடுக்கப்பட்ட உற்பத்தி திட்டங்கள்',
      featuredWorkSubtitle: 'நிறுவனங்களின் வணிக வளர்ச்சிக்காக உருவாக்கப்பட்ட அதிவேக, நம்பகமான உற்பத்தி மென்பொருட்கள்.',
      whyMucoTitle: 'முன்னணி நிறுவனங்கள் MUCO Labs-ஐ ஏன் தேர்ந்தெடுக்கின்றன?',
      whyMucoSubtitle: 'வழக்கமான ஏஜென்சிகளை விட எங்களை தனித்துவப்படுத்தும் நான்கு அடிப்படை பொறியியல் கொள்கைகள்.',
      processTitle: 'எங்களின் 5-படிநிலை பொறியியல் முறை',
      processSubtitle: 'துல்லியமான திட்டமிடல் முதல் தடையற்ற வெளியீடு மற்றும் தொடர் பராமரிப்பு வரை வெளிப்படையான செயல்முறை.',
      founderTitle: 'தலைமை & பொறியியல் பார்வை',
      founderSubtitle: 'வெளிப்படையான செயல்பாடு மற்றும் நீண்டகால டிஜிட்டல் அமைப்புகளுக்காக அர்ப்பணிக்கப்பட்ட பொறியாளர்களால் வழிநடத்தப்படுகிறது.',
      pricingTitle: 'வெளிப்படையான முதலீடு & விலை தொகுப்புகள்',
      pricingSubtitle: 'எந்தவொரு மறைமுக கட்டணமும் இல்லாத நேரடி விலைப்பட்டியல் மற்றும் உத்தரவாதமளிக்கப்பட்ட SLA ஆதரவு.',
      estimatorTitle: 'திட்ட செலவு கணக்கீட்டு கருவி',
      estimatorSubtitle: 'உங்கள் மென்பொருள் மற்றும் AI தேவைகளுக்கான உடனடி மதிப்பீட்டை துல்லியமாக கணக்கிடுங்கள்.'
    },
    auth: {
      signInTitle: 'MUCO Labs-ல் மீண்டும் உள்நுழையவும்',
      signInSubtitle: 'உங்கள் சேமிக்கப்பட்ட திட்ட மதிப்பீடுகள் மற்றும் தொழில்நுட்ப ஆலோசனைகளை அணுகவும்.',
      signUpTitle: 'உங்கள் MUCO கணக்கை உருவாக்குங்கள்',
      signUpSubtitle: 'திட்ட கோரிக்கைகள், கணக்கீடுகள் மற்றும் நேரடி பொறியியல் ஆதரவை நிர்வகியுங்கள்.',
      emailLabel: 'மின்னஞ்சல் முகவரி',
      passwordLabel: 'கடவுச்சொல்',
      confirmPasswordLabel: 'கடவுச்சொல்லை உறுதிப்படுத்துக',
      fullNameLabel: 'முழு பெயர்',
      forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
      resetPassword: 'கடவுச்சொல்லை மீட்டமைக்கவும்',
      dontHaveAccount: 'கணக்கு இல்லையா?',
      alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      signInWithGoogle: 'Google மூலம் உள்நுழைக',
      orWithEmail: 'அல்லது மின்னஞ்சல் மூலம் தொடரவும்',
      agreeToTerms: 'நான் விதிமுறைகள் & நிபந்தனைகளை ஒப்புக்கொள்கிறேன் மற்றும் தனியுரிமைக் கொள்கையை ஏற்கிறேன்.',
      termsAndConditions: 'விதிமுறைகள் & நிபந்தனைகள்',
      privacyPolicy: 'தனியுரிமைக் கொள்கை',
      marketingConsent: 'MUCO Labs புதிய தொழில்நுட்ப செய்திகள் மற்றும் புதுப்பிப்புகளைப் பெற விரும்புகிறேன் (விருப்பத்தேர்வு).',
      emailVerificationNotice: 'உங்கள் மின்னஞ்சலுக்கு சரிபார்ப்பு இணைப்பு அனுப்பப்பட்டுள்ளது. முழு அணுகலுக்கு மின்னஞ்சலை சரிபார்க்கவும்.',
      sendResetLink: 'மீட்டமைப்பு இணைப்பை அனுப்பவும்',
      resetLinkSent: 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டுள்ளது.'
    },
    legal: {
      privacyTitle: 'தனியுரிமைக் கொள்கை & தரவு பாதுகாப்பு அறிவிப்பு',
      privacySubtitle: 'இந்திய டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம் 2023 (DPDP) மற்றும் விதிகளுக்கு ஏற்ப வடிவமைக்கப்பட்டுள்ளது.',
      termsTitle: 'சேவை விதிமுறைகள் & வணிக ஒப்பந்தம்',
      termsSubtitle: 'MUCO Labs-ன் அனைத்து வாடிக்கையாளர் திட்டங்களுக்கும் பொருந்தும் வெளிப்படையான வணிக மற்றும் சட்ட விதிமுறைகள்.',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2026',
      dpdpNotice: 'MUCO Labs உங்கள் தனிப்பட்ட மற்றும் வணிகத் தகவல்களை உரிய அனுமதியுடனும், குறைந்தபட்ச தரவு சேகரிப்பு மற்றும் அதிநவீன பாதுகாப்புடன் மட்டுமே கையாள்கிறது.',
      advancePaymentClause: 'வணிக விதிமுறை: எழுத்துப்பூர்வ ஒப்பந்தத்தில் வேறுவிதமாகக் குறிப்பிடப்படாவிட்டால், அனைத்து தனிப்பயன் திட்டங்களுக்கும் பணியைத் தொடங்குவதற்கு முன் 50% முன்பணம் கட்டாயமாகும். மீதித் தொகை ஒப்புக்கொள்ளப்பட்ட மைல்கல் அடிப்படையில் பெறப்படும்.'
    }
  }
};
