/**
 * MUCO Labs WhatsApp Business Integration Utility
 * Direct Phone: +91 6381809844
 * 
 * Features:
 * - Robust URL length validation & smart truncation
 * - Centralized error logging & telemetry
 * - Malformed URL & surrogate pair protection
 * - Popup blocker detection & clipboard fallback
 * - Contextual user feedback & toast messaging
 */

import {
  logWhatsAppEvent,
  notifyUser,
  WhatsAppErrorCode,
  WhatsAppLogEntry
} from './whatsappLogger';
import { logWhatsAppInquiryToGoogleSheets } from '../services/whatsAppSheetsLogger';

export const WHATSAPP_NUMBER = '916381809844';

// Standard maximum safe length for wa.me URL query parameters across browsers & WhatsApp Web/Mobile
export const MAX_SAFE_URL_LENGTH = 1800;

export interface LeadCaptureFormData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  serviceName?: string;
  service?: string;
  subject?: string;
  budgetRange?: string;
  budget?: string;
  message?: string;
  sourcePage?: string;
  requirements?: string;
}

export interface WhatsAppContext {
  serviceName?: string;
  pageName?: string;
  path?: string;
  projectBudget?: string;
  customMessage?: string;
  leadData?: LeadCaptureFormData;
}

export interface PathHeuristicConfig {
  greeting: string;
  suggestedQuestions: string[];
  pageTitle: string;
}

/**
 * Local heuristic mapping of URL paths and route identifiers to contextual initial greetings
 * and suggested prompt questions.
 */
export const PATH_HEURISTICS: Record<string, PathHeuristicConfig> = {
  services: {
    pageTitle: 'Software & Cloud Services',
    greeting: 'Hello MUCO Labs! 👋 I am browsing your *Software & Web Engineering Services*. Could you provide details on your tech stack, scope of work, and project availability?',
    suggestedQuestions: [
      'Custom Full-Stack Web Application Quote',
      'Cloud Architecture & API Microservices',
      'Enterprise Software Modernization',
      'What is your typical project timeline?'
    ]
  },
  pricing: {
    pageTitle: 'Pricing & Estimator',
    greeting: 'Hello MUCO Labs! 👋 I am on your *Pricing & Estimator* page and would like to calculate a custom quote and timeline for my software/MVP idea.',
    suggestedQuestions: [
      'MVP Cost & Timeline Calculation',
      'Monthly Cloud AMC & Maintenance Plans',
      'Fixed-Bid vs Dedicated Team Inquiry',
      'Request custom milestone quotation'
    ]
  },
  portfolio: {
    pageTitle: 'Client Portfolio & Case Studies',
    greeting: 'Hello MUCO Labs! 👋 I was reviewing your *Client Portfolio & Case Studies* and would like to discuss building a high-performance platform similar to your work.',
    suggestedQuestions: [
      'Inquire about a project similar to your case studies',
      'Request technical portfolio walkthrough',
      'NDA & proprietary IP development',
      'Client reference & delivery timeline inquiry'
    ]
  },
  systems: {
    pageTitle: 'Autonomous AI & Intelligence Systems',
    greeting: 'Hello MUCO Labs! 👋 I am exploring your *Autonomous AI & Intelligence Systems*. How can MUCO Labs help integrate custom AI workflows and automation into our business?',
    suggestedQuestions: [
      'Autonomous AI Workflow Consultation',
      'Custom LLM & AI Agent Integration',
      'Enterprise Automation Feasibility Study',
      'Schedule Live AI Architecture Demo'
    ]
  },
  courses: {
    pageTitle: 'Way2Me Mastery Academy',
    greeting: 'Hello MUCO Labs! 👋 I am interested in the *Way2Me Mastery Academy* curriculum and mentorship programs. Could you share enrollment details and upcoming cohort schedules?',
    suggestedQuestions: [
      'Way2Me Full Stack Mastery Syllabus',
      'Upcoming Cohort Dates & Fees',
      '1-on-1 Mentorship & Placement Support',
      'Book a Free Career Counseling Call'
    ]
  },
  apps: {
    pageTitle: 'Mobile & Web App Studio',
    greeting: 'Hello MUCO Labs! 👋 I am exploring your *App Studio & Publishing* services. I have an iOS/Android or web application idea I would like to design and launch.',
    suggestedQuestions: [
      'Mobile App Development (iOS & Android)',
      'App Store & Play Store Publishing',
      'Cross-Platform React Native / Flutter Inquiry',
      'App UI/UX Prototype & Architecture'
    ]
  },
  maintenance: {
    pageTitle: 'Cloud Infrastructure & AMC Maintenance',
    greeting: 'Hello MUCO Labs! 👋 I am looking into your *Cloud Infrastructure & AMC Maintenance* packages to keep our systems secure, updated, and high-performing.',
    suggestedQuestions: [
      'Annual Maintenance Contract (AMC) Plans',
      'Server Security & Performance Audit',
      '24/7 Cloud Monitoring & DevOps Support',
      'Legacy Software Migration & Optimization'
    ]
  },
  process: {
    pageTitle: 'Engineering Process & Standards',
    greeting: 'Hello MUCO Labs! 👋 I am reviewing your 4-phase agile engineering process (Discovery, Architecture, Sprint Delivery, Launch) and would like to discuss my project timeline.',
    suggestedQuestions: [
      'Discovery & Technical Specification Sprint',
      'Sprint Milestones & Agile Deliverables',
      'Code Review & Quality Assurance Standards',
      'Deployment & Production Launch Timeline'
    ]
  },
  about: {
    pageTitle: 'About MUCO Labs',
    greeting: 'Hello MUCO Labs! 👋 I was reading about MUCO Labs\' engineering philosophy and leadership. I\'d love to connect with your team regarding a technical partnership.',
    suggestedQuestions: [
      'Schedule a meeting with Founder Srinivash M.',
      'Technical Partnership & Vendor Onboarding',
      'Engineering Hub Visit in Erode, Tamil Nadu',
      'Explore Technology Collaboration'
    ]
  },
  contact: {
    pageTitle: 'Contact & Proposals',
    greeting: 'Hello MUCO Labs! 👋 I would like to schedule a project consultation and request a technical proposal for our engineering roadmap.',
    suggestedQuestions: [
      'Schedule 15-Minute Strategy Call',
      'Request Custom Technical Proposal',
      'Immediate Project Kickoff Discussion',
      'General Software Engineering Inquiry'
    ]
  },
  locations: {
    pageTitle: 'Regional Hubs & Locations',
    greeting: 'Hello MUCO Labs! 👋 I noticed your engineering hubs in Erode, Perundurai, and across Tamil Nadu. I\'d like to inquire about local or remote software consulting.',
    suggestedQuestions: [
      'Software Consulting in Erode / Perundurai Hub',
      'On-site vs Remote Engineering Engagement',
      'Industrial SIPCOT Automation Solutions',
      'Regional Digital Transformation Inquiry'
    ]
  },
  faq: {
    pageTitle: 'Frequently Asked Questions',
    greeting: 'Hello MUCO Labs! 👋 I have a few questions about your development process, payment milestones, and ongoing support guarantees.',
    suggestedQuestions: [
      'Payment Milestones & Billing Terms',
      'Source Code Ownership & IP Protection',
      'Post-Launch Support & Warranty',
      'Technology Stack & Architecture Consultation'
    ]
  },
  blog: {
    pageTitle: 'Engineering Blog & Insights',
    greeting: 'Hello MUCO Labs! 👋 I was reading your technical articles and insights, and would like to discuss implementing similar software architectures for our company.',
    suggestedQuestions: [
      'Discuss architecture from tech blog',
      'Enterprise AI & Full-Stack Tech Stack',
      'Best practices for scalable cloud apps',
      'Collaborate on technical research'
    ]
  },
  sheets: {
    pageTitle: 'Google Sheets & Cloud Hub',
    greeting: 'Hello MUCO Labs! 👋 I am exploring your *Google Sheets & Cloud Data Integration* and would like to connect our operational workflows with custom software.',
    suggestedQuestions: [
      'Google Sheets API Integration',
      'Automated Lead Capture & CRM Sync',
      'Cloud Database to Spreadsheet Pipeline',
      'Custom Google Workspace Automation'
    ]
  },
  home: {
    pageTitle: 'MUCO Labs Architecture',
    greeting: 'Hello MUCO Labs! 👋 I am interested in your software engineering & AI services.',
    suggestedQuestions: [
      'Website Development Inquiry',
      'Mobile App Development Quote',
      'AI Chatbot & Automation Demo',
      'Cloud Service Management / AMC'
    ]
  }
};

/**
 * Resolves a normalized route key from a pathname, hash, or route string.
 */
export function resolvePathKey(input?: string): string {
  if (!input) {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^[#/]+|[#/]+$/g, '').split('?')[0].split('/')[0].toLowerCase();
      if (hash) {
        if (hash === 'calculator') return 'pricing';
        if (PATH_HEURISTICS[hash]) return hash;
      }
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').split('?')[0].split('/')[0].toLowerCase();
      if (pathname && PATH_HEURISTICS[pathname]) return pathname;
      if (pathname === 'calculator' || pathname === 'estimate') return 'pricing';
      if (pathname === 'ai' || pathname === 'intelligence') return 'systems';
      if (pathname === 'academy' || pathname === 'learn') return 'courses';
      if (pathname === 'case-studies') return 'portfolio';
      if (pathname === 'amc') return 'maintenance';
    }
    return 'home';
  }

  const clean = input.toLowerCase().replace(/^[#/]+|[#/]+$/g, '').split('?')[0].split('/')[0];
  
  // Specific alias mappings
  if (clean === 'calculator' || clean === 'estimate' || clean === 'pricing & estimates') return 'pricing';
  if (clean === 'ai' || clean === 'intelligence' || clean === 'ai systems') return 'systems';
  if (clean === 'academy' || clean === 'learn' || clean === 'mastery academy' || clean === 'way2me mastery academy') return 'courses';
  if (clean === 'case-studies' || clean === 'client portfolio') return 'portfolio';
  if (clean === 'amc' || clean === 'cloud & amc maintenance') return 'maintenance';
  if (clean === 'software services' || clean === 'software & cloud services') return 'services';
  if (clean === 'about muco labs') return 'about';
  if (clean === 'contact & proposals') return 'contact';
  if (clean === 'app studio & publishing') return 'apps';
  if (clean === 'blog & tech articles' || clean === 'engineering blog & insights') return 'blog';
  if (clean === 'regional hubs & locations' || clean === 'locations') return 'locations';
  if (clean === 'frequently asked questions') return 'faq';
  if (clean === 'engineering process & standards') return 'process';
  if (clean === 'google sheets & cloud hub' || clean === 'google sheets hub') return 'sheets';

  if (PATH_HEURISTICS[clean]) return clean;

  // Substring match check
  for (const key of Object.keys(PATH_HEURISTICS)) {
    if (clean.includes(key)) return key;
  }

  return 'home';
}

/**
 * Returns the heuristic configuration (greeting, suggested questions, title) for any path or page.
 */
export function getPathHeuristic(pathOrPage?: string): PathHeuristicConfig {
  const key = resolvePathKey(pathOrPage);
  return PATH_HEURISTICS[key] || PATH_HEURISTICS.home;
}

/**
 * Returns suggested questions tailored to the current path.
 */
export function getSuggestedQuestionsForPath(pathOrPage?: string): string[] {
  return getPathHeuristic(pathOrPage).suggestedQuestions;
}

export interface WhatsAppUrlResult {
  url: string;
  message: string;
  isTruncated: boolean;
  rawLength: number;
  urlLength: number;
  error?: string;
  errorCode?: WhatsAppErrorCode;
}

export interface WhatsAppActionResult extends WhatsAppUrlResult {
  success: boolean;
  popupBlocked?: boolean;
}

/**
 * Sanitizes raw text to prevent URI malformed exceptions from unmatched Unicode surrogates.
 */
function sanitizeUnicode(text: string): string {
  try {
    // Attempt standard encode to check validity
    encodeURIComponent(text);
    return text;
  } catch {
    // Replace broken surrogate pairs
    return text.replace(
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,
      ''
    );
  }
}

/**
 * Cleans phone number to ensure only international standard digits
 */
export function sanitizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (!cleaned || cleaned.length < 7) {
    logWhatsAppEvent({
      level: 'warning',
      code: 'INVALID_PHONE',
      title: 'Suspicious WhatsApp Phone Number',
      message: `Provided phone number "${phone}" was resolved to "${cleaned}", falling back to default ${WHATSAPP_NUMBER}.`
    });
    return WHATSAPP_NUMBER;
  }
  return cleaned;
}

/**
 * Builds the textual message payload based on provided context or lead data.
 */
export function formatWhatsAppMessage(context?: WhatsAppContext | LeadCaptureFormData): string {
  let message = 'Hello MUCO Labs! 👋 I am interested in your software engineering & AI services.';

  const leadData: LeadCaptureFormData | null =
    context && 'leadData' in context && context.leadData
      ? context.leadData
      : context && ('name' in context || 'email' in context || 'serviceCategory' in context || 'service' in context || 'phone' in context)
      ? (context as LeadCaptureFormData)
      : null;

  const ctx: WhatsAppContext | undefined =
    context && !('name' in context || 'email' in context || 'serviceCategory' in context)
      ? (context as WhatsAppContext)
      : undefined;

  if (leadData) {
    const name = leadData.name?.trim();
    const email = leadData.email?.trim();
    const phone = leadData.phone?.trim();
    const company = leadData.company?.trim();
    const service = leadData.serviceCategory || leadData.serviceName || leadData.service || ctx?.serviceName;
    const budget = leadData.budgetRange || leadData.budget || ctx?.projectBudget;
    const details = leadData.message || leadData.requirements || ctx?.customMessage;

    const lines: string[] = ['Hello MUCO Labs! 👋 I am sharing my project lead inquiry:'];

    if (name) lines.push(`👤 *Name:* ${name}`);
    if (email) lines.push(`📧 *Email:* ${email}`);
    if (phone) lines.push(`📞 *Phone:* ${phone}`);
    if (company) lines.push(`🏢 *Company:* ${company}`);
    if (service) lines.push(`🛠️ *Service Required:* ${service}`);
    if (budget) lines.push(`💰 *Estimated Budget:* ${budget}`);
    if (details) lines.push(`📝 *Project Details:* ${details}`);

    message = lines.join('\n');
  } else if (ctx?.customMessage) {
    message = ctx.customMessage;
  } else if (ctx?.serviceName) {
    message = `Hello MUCO Labs! 👋 I am visiting your website and would like a quote and details regarding *${ctx.serviceName}*. Could you please assist me?`;
  } else if ((ctx?.pageName?.toLowerCase().includes('pricing') || ctx?.path?.toLowerCase().includes('pricing')) && ctx?.projectBudget) {
    message = `Hello MUCO Labs! 👋 I am looking for a project estimate around *${ctx.projectBudget}*. Could we discuss custom software options?`;
  } else {
    // Local URL path heuristic: dynamically resolves initial greeting based on path, pageName, or window location
    const pathKey = ctx?.path || ctx?.pageName;
    const heuristic = getPathHeuristic(pathKey);
    message = heuristic.greeting;
  }

  return sanitizeUnicode(message.trim() || 'Hello MUCO Labs! 👋');
}

/**
 * Generates and validates a safe WhatsApp deep link URL.
 * Automatically catches and logs errors (malformed strings, excessive length, invalid characters).
 */
export function generateSafeWhatsAppUrl(
  context?: WhatsAppContext | LeadCaptureFormData,
  phone: string = WHATSAPP_NUMBER
): WhatsAppUrlResult {
  const cleanPhone = sanitizePhoneNumber(phone);
  let message = formatWhatsAppMessage(context);
  const rawLength = message.length;
  let isTruncated = false;

  let encodedMessage = '';
  try {
    encodedMessage = encodeURIComponent(message);
  } catch (encodeErr) {
    logWhatsAppEvent({
      level: 'error',
      code: 'ENCODING_ERROR',
      title: 'WhatsApp URI Encoding Failed',
      message: 'Failed to encode WhatsApp message with encodeURIComponent. Applying sanitized fallback.',
      rawTextLength: rawLength,
      recoveryAction: 'sanitized_characters',
      details: { error: String(encodeErr) }
    });

    // Fallback safe string
    message = message.replace(/[^\x00-\x7F]/g, '');
    encodedMessage = encodeURIComponent(message);
  }

  let fullUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  // Check URL Length limit
  if (fullUrl.length > MAX_SAFE_URL_LENGTH) {
    isTruncated = true;
    const overflowChars = fullUrl.length - MAX_SAFE_URL_LENGTH;
    const truncateNotice = '\n\n[... Note: Truncated for WhatsApp URL safety. Full specs can be shared in this chat.]';
    const targetMessageLen = Math.max(100, message.length - Math.ceil(overflowChars * 1.2) - truncateNotice.length);
    
    message = message.substring(0, targetMessageLen) + truncateNotice;
    encodedMessage = encodeURIComponent(message);
    fullUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    logWhatsAppEvent({
      level: 'warning',
      code: 'URL_TOO_LONG',
      title: 'WhatsApp URL Exceeded Safe Limits',
      message: `Generated WhatsApp URL was ${fullUrl.length + overflowChars} characters. Automatically trimmed message to prevent browser failure.`,
      urlLength: fullUrl.length,
      rawTextLength: rawLength,
      urlPreview: fullUrl.substring(0, 120) + '...',
      recoveryAction: 'truncated_payload',
      contextSummary: typeof context === 'object' ? JSON.stringify(context).substring(0, 150) : undefined
    });
  }

  // Final sanity check for valid URL syntax
  try {
    new URL(fullUrl);
  } catch (urlErr) {
    logWhatsAppEvent({
      level: 'error',
      code: 'MALFORMED_URL',
      title: 'Malformed WhatsApp URL Generated',
      message: `Resulting URL "${fullUrl}" failed standard URL parsing.`,
      urlLength: fullUrl.length,
      details: { error: String(urlErr) }
    });

    return {
      url: `https://wa.me/${cleanPhone}`,
      message,
      isTruncated,
      rawLength,
      urlLength: fullUrl.length,
      error: 'Malformed URL structure',
      errorCode: 'MALFORMED_URL'
    };
  }

  return {
    url: fullUrl,
    message,
    isTruncated,
    rawLength,
    urlLength: fullUrl.length
  };
}

/**
 * Backwards-compatible link getter
 */
export function getWhatsAppLink(context?: WhatsAppContext | LeadCaptureFormData): string {
  const result = generateSafeWhatsAppUrl(context);
  return result.url;
}

/**
 * Direct WhatsApp trigger function that safely opens WhatsApp in a new tab.
 * 
 * Includes comprehensive error handling:
 * - Catches malformed URLs and provides user feedback
 * - Detects and recovers from browser pop-up blockers
 * - Automatically copies inquiry text to clipboard if window cannot open
 * - Logs all execution details to the centralized logger
 */
export function openWhatsApp(context?: WhatsAppContext | LeadCaptureFormData): WhatsAppActionResult {
  const generated = generateSafeWhatsAppUrl(context);

  // Automatically log every WhatsApp inquiry to the Google Sheets integration
  try {
    const leadData: LeadCaptureFormData | null =
      context && 'leadData' in context && context.leadData
        ? context.leadData
        : context && ('name' in context || 'email' in context || 'serviceCategory' in context || 'service' in context || 'phone' in context)
        ? (context as LeadCaptureFormData)
        : null;

    const ctx: WhatsAppContext | undefined =
      context && !('name' in context || 'email' in context || 'serviceCategory' in context)
        ? (context as WhatsAppContext)
        : undefined;

    logWhatsAppInquiryToGoogleSheets({
      name: leadData?.name,
      email: leadData?.email,
      phone: leadData?.phone,
      company: leadData?.company,
      serviceCategory: leadData?.serviceCategory || leadData?.serviceName || leadData?.service || ctx?.serviceName,
      serviceName: ctx?.serviceName,
      pageName: ctx?.pageName || leadData?.sourcePage,
      projectBudget: leadData?.budgetRange || leadData?.budget || ctx?.projectBudget,
      budgetRange: leadData?.budgetRange || leadData?.budget || ctx?.projectBudget,
      customMessage: ctx?.customMessage || leadData?.message,
      message: generated.message,
      sourceButton: 'Chat Now'
    }).catch((err) => {
      console.warn('[WhatsApp Sheet Auto-Log Notice]', err);
    });
  } catch (logErr) {
    console.warn('[WhatsApp Sheet Auto-Log Exception]', logErr);
  }

  if (generated.error) {
    notifyUser(
      'Could not generate formatted WhatsApp link. Opening default WhatsApp chat.',
      'warning',
      'WhatsApp Link Warning'
    );
  } else if (generated.isTruncated) {
    notifyUser(
      'Your project message was safely formatted to fit WhatsApp link limits.',
      'info',
      'Message Formatted'
    );
  }

  let popupBlocked = false;
  let success = false;

  try {
    const newWindow = window.open(generated.url, '_blank', 'noopener,noreferrer');

    // Detect if popup blocker prevented the window from opening
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      popupBlocked = true;
      logWhatsAppEvent({
        level: 'warning',
        code: 'POPUP_BLOCKED',
        title: 'WhatsApp Pop-up Was Blocked',
        message: 'Browser popup blocker prevented automatic tab opening. Copying message to clipboard and prompting user.',
        urlLength: generated.urlLength,
        urlPreview: generated.url.substring(0, 100) + '...',
        recoveryAction: 'clipboard_copy_and_toast'
      });

      // Attempt automatic clipboard copy so user has the text ready
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(generated.message)
          .then(() => {
            logWhatsAppEvent({
              level: 'info',
              code: 'CLIPBOARD_SUCCESS',
              title: 'Inquiry Text Copied to Clipboard',
              message: 'Message copied automatically following popup blockage.'
            });
            notifyUser(
              'Pop-up was blocked. Your inquiry message has been copied to your clipboard! Click to open WhatsApp directly.',
              'warning',
              'Pop-up Blocked',
              6000
            );
          })
          .catch(() => {
            notifyUser(
              'Pop-up blocked. Please enable pop-ups for this site to chat on WhatsApp.',
              'error',
              'Pop-up Blocked'
            );
          });
      } else {
        notifyUser(
          'Pop-up was blocked by browser. Please allow popups or contact us at +91 6381809844.',
          'error',
          'Pop-up Blocked'
        );
      }
    } else {
      success = true;
      logWhatsAppEvent({
        level: 'success',
        code: 'SUCCESSFUL_LAUNCH',
        title: 'WhatsApp Launched Successfully',
        message: `Dispatched WhatsApp deep link (${generated.urlLength} chars).`,
        urlLength: generated.urlLength
      });
    }
  } catch (err) {
    logWhatsAppEvent({
      level: 'error',
      code: 'WINDOW_OPEN_EXCEPTION',
      title: 'Window Open Exception',
      message: `Failed to execute window.open: ${String(err)}`,
      details: { error: String(err) },
      recoveryAction: 'toast_error'
    });

    notifyUser(
      'Could not open WhatsApp link directly. Please contact us directly at +91 6381809844 or contact@mucolabs.in.',
      'error',
      'Connection Error'
    );
  }

  return {
    ...generated,
    success,
    popupBlocked
  };
}
