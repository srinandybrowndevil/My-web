import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../types';
import { FOUNDER_INFO } from '../data/galleryData';
import { Image } from '../components/Image';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Code2,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  Smartphone,
  Layout,
  Bot,
  Cloud,
  Layers,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  Database,
  Cpu,
  Lightbulb,
  MessageCircle,
  Clock,
  Compass,
  FileCode2,
  Terminal,
  Shield,
  HeartHandshake,
  GraduationCap,
  Users,
  Award,
  Lock,
  Server,
  Network,
  Activity,
  Workflow,
  Eye,
  Rocket,
  Binary,
  GitBranch,
  Building2,
  BookOpen,
  Quote,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

interface AboutProps {
  onNavigate: (page: PageId, msg?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'company' | 'founder'>('company');
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<number>(0);
  const [activeTechCategory, setActiveTechCategory] = useState<number>(0);
  const [activeInnovationStep, setActiveInnovationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);

  // Auto-simulation timer for Innovation Pipeline
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setActiveInnovationStep((prev) => (prev < 4 ? prev + 1 : 0));
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  // PART 1 DATA: INNOVATION PIPELINE (Problem -> Technology -> Intelligence -> Automation -> Business Impact)
  const innovationPipeline = [
    {
      id: 'problem',
      step: '01',
      name: 'Problem',
      title: 'Problem Identification & Friction Discovery',
      phaseLabel: 'Stage 01: Diagnostics & Scoping',
      icon: <Target className="w-5 h-5 text-rose-400" />,
      color: 'rose',
      accentBg: 'bg-rose-500/10',
      accentBorder: 'border-rose-500/30',
      accentText: 'text-rose-400',
      tagline: 'Diagnosing root operational bottlenecks before writing code',
      summary: 'Every engagement begins with systematic discovery. We dissect workflow bottlenecks, manual spreadsheet redundancies, user friction points, and legacy system limitations to define quantifiable engineering objectives.',
      input: 'Fragmented operations, manual re-entries, unmeasured latency, and user drop-offs',
      transformation: 'Deep stakeholder mapping, friction scoring, data flow audits, and security vulnerability scans',
      output: 'Validated Problem Dossier, Cost-per-Inefficiency calculation, and clear architectural requirements',
      metric: '28% Inefficiency Identified',
      metricLabel: 'Average operational waste mapped prior to coding',
      techStack: ['Process Mining', 'Root-Cause Discovery', 'Flow Mapping', 'Security Scans'],
      details: [
        'Stakeholder interviews and operational mapping',
        'Data flow and friction point identification',
        'Edge case and compliance vulnerability assessment',
        'Clear quantification of cost-per-inefficiency'
      ],
      caseExample: {
        scenario: 'High manual overhead in B2B order processing',
        solution: 'Isolated 4 manual data re-entries causing 28% fulfillment delays and 6% data corruption.',
        verifiedImpact: '-28% fulfillment latency'
      }
    },
    {
      id: 'technology',
      step: '02',
      name: 'Technology',
      title: 'Modern Architecture & Full-Stack Engineering',
      phaseLabel: 'Stage 02: Infrastructure & Foundation',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      color: 'amber',
      accentBg: 'bg-amber-500/10',
      accentBorder: 'border-amber-500/30',
      accentText: 'text-amber-400',
      tagline: 'Hardened, type-safe full-stack foundations tailored to scale',
      summary: 'We architect robust digital engines using strict TypeScript, normalized relational/NoSQL schemas, low-latency APIs, and battle-tested cloud frameworks on Google Cloud & Firebase.',
      input: 'Validated technical specifications and business domain models',
      transformation: 'Type-safe schema design, decoupled API routes, responsive 60FPS UI, and zero-trust security rules',
      output: 'Modular TypeScript codebase, index-optimized database, and high-throughput serverless API',
      metric: '99.9% Type Determinism',
      metricLabel: 'Zero runtime crash rate on core business pathways',
      techStack: ['TypeScript', 'React 18', 'Tailwind CSS', 'Firebase / Cloud SQL', 'Node.js'],
      details: [
        'Modular, componentized TypeScript architectures',
        'Optimized Firestore / relational database schemas',
        'Responsive 60FPS client-side interfaces and native mobile apps',
        'Zero-trust security rules and encrypted payload bridges'
      ],
      caseExample: {
        scenario: 'Database latency under peak concurrent traffic',
        solution: 'Built index-optimized data models, server-side caching, and decoupled API endpoints.',
        verifiedImpact: '<45ms API response time'
      }
    },
    {
      id: 'intelligence',
      step: '03',
      name: 'Intelligence',
      title: 'Google Gemini AI & Smart Workflows',
      phaseLabel: 'Stage 03: Cognitive Enhancement',
      icon: <Bot className="w-5 h-5 text-cyan-400" />,
      color: 'cyan',
      accentBg: 'bg-cyan-500/10',
      accentBorder: 'border-cyan-500/30',
      accentText: 'text-cyan-400',
      tagline: 'Infusing contextual LLM decision-making into core systems',
      summary: 'We integrate Google Gemini APIs and machine intelligence to automate high-cognitive tasks—such as intelligent query routing, dynamic document parsing, contextual summarization, and predictive analytics.',
      input: 'Unstructured user queries, incoming support tickets, and raw business documents',
      transformation: 'Structured schema prompting, contextual RAG embeddings, server-side proxying, and validation guards',
      output: 'Deterministic JSON outputs, autonomous triage decisions, and instant AI-assisted workflows',
      metric: '94% Autonomous Triage',
      metricLabel: 'Accuracy in intent routing without human intervention',
      techStack: ['Google Gemini API', 'Contextual RAG', 'Structured JSON', 'Embeddings', 'Multi-Modal'],
      details: [
        'Google Gemini 2.5/Flash model integration with server-side proxying',
        'Contextual RAG (Retrieval-Augmented Generation) knowledge engines',
        'Structured JSON schema enforcement for deterministic outputs',
        'Multi-modal asset processing (text, voice, image recognition)'
      ],
      caseExample: {
        scenario: 'Complex multilingual customer triage requests',
        solution: 'Autonomous AI triage routing requests to correct departments with 94% accuracy.',
        verifiedImpact: 'Instant 24/7 resolution'
      }
    },
    {
      id: 'automation',
      step: '04',
      name: 'Automation',
      title: 'Autonomous Pipelines & Webhook Bridges',
      phaseLabel: 'Stage 04: Event-Driven Automation',
      icon: <Workflow className="w-5 h-5 text-blue-400" />,
      color: 'blue',
      accentBg: 'bg-blue-500/10',
      accentBorder: 'border-blue-500/30',
      accentText: 'text-blue-400',
      tagline: 'Eliminating repetitive human labor through event-driven systems',
      summary: 'We connect disparate systems into self-governing pipelines. Trigger-based webhooks, scheduled background workers, and automated CRM syncs replace hours of manual administrative labor.',
      input: 'Asynchronous system events, payment webhooks, database triggers, and form submissions',
      transformation: 'Event listeners, retry queues, automated payload transformations, and error-recovery handlers',
      output: 'Zero-touch end-to-end synchronization across CRM, payment gateways, and client communications',
      metric: '85% Labor Hours Saved',
      metricLabel: 'Reduction in repetitive manual data entry tasks',
      techStack: ['Serverless Webhooks', 'Event Listeners', 'Async Queues', 'WhatsApp Automation', 'CRMs'],
      details: [
        'Event-driven serverless functions and real-time webhook listeners',
        'Bi-directional synchronization across CRM, payment gateways & ERPs',
        'Automated error-recovery pipelines and telemetry alert systems',
        'Instant WhatsApp and multi-channel notification dispatchers'
      ],
      caseExample: {
        scenario: 'Fragmented lead notification, contract dispatch, and invoicing',
        solution: 'Zero-touch webhook pipelines converting bookings to verified invoices and dispatching receipts in real time.',
        verifiedImpact: '100% automated lifecycle'
      }
    },
    {
      id: 'impact',
      step: '05',
      name: 'Business Impact',
      title: 'Measurable Commercial ROI & Scaling',
      phaseLabel: 'Stage 05: Revenue & Scalability',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
      accentBg: 'bg-emerald-500/10',
      accentBorder: 'border-emerald-500/30',
      accentText: 'text-emerald-400',
      tagline: 'Transforming technical execution into tangible business revenue',
      summary: 'Technology is only successful if it drives measurable commercial outcomes. We ensure our software directly reduces operational expenditure, accelerates customer conversions, and unlocks new digital revenue streams.',
      input: 'Hardened software pipelines, automated intelligence, and live production users',
      transformation: 'High-availability uptime monitoring, conversion rate optimization, and multi-tenant SaaS scaling',
      output: 'Measurable EBITDA growth, zero downtime, long-term brand authority, and defensible market moat',
      metric: '10x Traffic Scalability',
      metricLabel: 'Proven platform throughput capacity with zero structural debt',
      techStack: ['Analytics Telemetry', 'Conversion Tracking', '99.9% Uptime SLAs', 'Multi-Tenant SaaS'],
      details: [
        'Drastic reduction in manual operating costs and labor overhead',
        'Accelerated customer conversion and engagement metrics',
        'Hardened stability with 99.9% uptime and zero placeholder debt',
        'Long-term digital brand authority and defensible market advantage'
      ],
      caseExample: {
        scenario: 'Scaling from regional operations to enterprise national market',
        solution: 'Deployed scalable multi-tenant SaaS architecture supporting 10x traffic growth without performance degradation.',
        verifiedImpact: '3.4x Annualized ROI'
      }
    }
  ];

  const futureTechnologies = [
    {
      title: 'Enterprise AI & Intelligent Agents',
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      desc: 'Deploying autonomous AI agents powered by modern LLMs to handle customer inquiry triage, contextual search, document summarization, and data extraction.',
      tags: ['Google Gemini API', 'Contextual RAG', 'Autonomous Agents', 'Natural Language Workflows']
    },
    {
      title: 'Intelligent Business Automation',
      icon: <Workflow className="w-6 h-6 text-amber-400" />,
      desc: 'Eliminating repetitive human error and manual spreadsheet transfers by integrating intelligent triggers, automated CRM pipelines, and real-time webhook listeners.',
      tags: ['Serverless Jobs', 'Event-Driven Webhooks', 'CRM/ERP Sync', 'Autonomous Pipelines']
    },
    {
      title: 'Full-Stack Modern Cloud Architectures',
      icon: <Cloud className="w-6 h-6 text-blue-400" />,
      desc: 'Engineering low-latency web platforms with instant SSR/SPA rendering, multi-region database replication, edge caching, and automated container orchestration.',
      tags: ['Google Cloud', 'Firebase Firestore', 'Edge CDN', 'Docker & Microservices']
    },
    {
      title: 'Next-Gen Mobile & Cross-Platform',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      desc: 'Crafting responsive mobile experiences for Android and iOS with native device sensors, offline-first SQLite caching, push notification hubs, and biometric auth.',
      tags: ['Android Kotlin', 'iOS Ecosystem', 'Offline Cache', '60FPS Native UI']
    },
    {
      title: 'Hardened Security & Data Integrity',
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      desc: 'Enforcing zero-trust security postures, end-to-end payload encryption, automated secret rotation, and enterprise audit logging for high-consequence applications.',
      tags: ['Zero-Trust', 'Data Encryption', 'OAuth2/JWT', 'Audit SIEM']
    },
    {
      title: 'Custom SaaS & Scalable Infrastructure',
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      desc: 'Building bespoke multi-tenant SaaS engines, subscription billing systems, real-time analytics dashboards, and modular architectural foundations.',
      tags: ['Multi-Tenant SaaS', 'Subscription Billing', 'Real-time D3/Charts', 'Scalable APIs']
    }
  ];

  const companyPillars = [
    {
      title: 'What is MUCO Labs?',
      answer: 'MUCO Labs is a forward-thinking technology company and digital product engineering studio headquartered in Erode, Tamil Nadu. We specialize in transforming complex ideas into intelligent, production-ready digital products across web, mobile, AI, and cloud software.'
    },
    {
      title: 'Why does MUCO Labs exist?',
      answer: 'MUCO Labs was founded to bridge the critical gap between conceptual vision and hardened software execution. We eliminate fragile agency code and placeholder stubs by delivering reliable, enterprise-grade digital solutions built to scale effortlessly.'
    },
    {
      title: 'What does MUCO Labs build?',
      answer: 'We engineer custom web applications, native Android/iOS mobile apps, intelligent AI automations, scalable SaaS platforms, robust cloud backend architectures, and high-conversion digital experiences for founders and growing businesses.'
    },
    {
      title: 'What makes MUCO Labs different?',
      answer: 'Every project at MUCO Labs is spearheaded with hands-on architectural rigor. We maintain a zero-compromise engineering standard: strictly typed code, robust error handling, high-contrast visual design, and direct founder accountability.'
    }
  ];

  // PART 2 DATA: THE FOUNDER (SRINIVASH MAHALINGAM)
  const technicalCategories = [
    {
      category: 'Programming & Software Engineering',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      summary: 'Deep practical proficiency across low-level and high-level programming paradigms, designing modular and memory-safe software architectures.',
      skills: ['Python', 'JavaScript / TypeScript', 'C / C++', 'Java', 'SQL & Database Schemas', 'Full-Stack Architecture', 'Object-Oriented & Functional Paradigms']
    },
    {
      category: 'Cybersecurity, SIEM & Auditing',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      summary: 'Comprehensive hands-on background in security assessment, vulnerability remediation, penetration testing, cryptographic protocols, and incident response.',
      skills: ['Cybersecurity Assessment', 'Network Security', 'Penetration Testing', 'Incident Response', 'Security Auditing', 'Cryptography', 'SIEM Operations']
    },
    {
      category: 'Cloud, Infrastructure & DevOps',
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      summary: 'Architecting multi-cloud environments, automated deployment pipelines, containerized microservices, and reliable server-side configurations.',
      skills: ['Google Cloud Platform (GCP)', 'AWS', 'Microsoft Azure', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Git Workflow']
    },
    {
      category: 'Systems, Networking & Virtualization',
      icon: <Server className="w-5 h-5 text-amber-400" />,
      summary: 'Rigorous operating system administration, network protocol diagnostics, virtualized sandboxes, and enterprise infrastructure management.',
      skills: ['Linux / Unix Kernel & Shell', 'Windows Server', 'Virtualization (VMware/KVM)', 'Networking Protocols (TCP/IP, DNS, VPN)', 'Hardware & IT Support']
    },
    {
      category: 'Automation, Workflows & Scripting',
      icon: <Workflow className="w-5 h-5 text-emerald-400" />,
      summary: 'Engineering custom scripts and autonomous pipelines that eliminate manual operational overhead and automate complex data exchanges.',
      skills: ['Python Automation Scripts', 'Bash / Shell Scripting', 'API Webhooks & Bridges', 'Automated Testing', 'Process Orchestration']
    }
  ];

  const founderEvolutionMilestones = [
    {
      step: '01',
      phase: 'Core Programming & Computer Science Foundations',
      period: 'Foundation Years',
      badge: 'Academic & Self-Taught',
      role: 'Software Developer & Algorithmic Thinker',
      description: 'Built a deep foundation in computer science principles, writing deterministic code in C, C++, Java, Python, and SQL. Mastered low-level memory allocation, object-oriented paradigms, data structures, and relational schema normalization.',
      keyCompetencies: ['Python & JavaScript', 'C / C++ & Java', 'Data Structures & Algorithms', 'Relational SQL Design', 'Linux Shell & POSIX'],
      activities: 'Wrote core algorithmic routines, parsed multi-format data, and designed relational database schemas without reliance on heavyweight black-box abstractions.',
      engineeringImpact: 'Instilled a zero-shortcut engineering standard at MUCO Labs—every data layer is strongly typed, memory efficient, and structurally sound.'
    },
    {
      step: '02',
      phase: 'Systems Engineering, Networking & IT Infrastructure',
      period: 'Infrastructure Phase',
      badge: 'Systems & Hardware',
      role: 'Infrastructure & Support Specialist',
      description: 'Gained hands-on practical depth in computer hardware diagnostics, local area networking, TCP/IP protocol routing, server administration, virtualization environments (VMware/KVM), and enterprise technical support.',
      keyCompetencies: ['Network Protocols (TCP/IP, DNS, VPN)', 'Virtualization & Hypervisors', 'Linux/Unix Server Admin', 'Hardware Diagnostics', 'System Troubleshooting'],
      activities: 'Configured local area network backbones, deployed virtualized server clusters, and diagnosed high-consequence hardware and network bottlenecks.',
      engineeringImpact: 'Provides MUCO Labs with end-to-end hardware-to-cloud awareness, ensuring web and mobile apps run with ultra-low latency on physical and virtual infrastructure.'
    },
    {
      step: '03',
      phase: 'Teaching & Mentoring 1,000+ Students',
      period: 'Mentorship Era',
      badge: 'Educational Leadership',
      role: 'Technical Instructor & Mentor',
      description: 'Conducted structured technical workshops and interactive bootcamps, training more than 1,000 students in programming languages, logical problem-solving, and cybersecurity principles. Developed deep communication clarity and architectural empathy.',
      keyCompetencies: ['Pedagogical Clarity', 'Technical Communication', 'Curriculum Architecture', 'Interactive Live Coding', 'Mentorship & Empathy'],
      activities: 'Mentored diverse cohorts of students, broke down complex cryptographic and algorithmic concepts into intuitive models, and fostered a culture of patient, high-rigor engineering.',
      engineeringImpact: 'Directly shapes MUCO Labs client relationships—ensuring transparent architectural communication, comprehensive documentation, and zero obfuscation.'
    },
    {
      step: '04',
      phase: 'Cybersecurity, Security Auditing & SIEM Defense',
      period: 'Cyber Defense Specialization',
      badge: 'Security Specialist',
      role: 'Cybersecurity Auditor & Specialist',
      description: 'Deepened specialization in enterprise defense, vulnerability assessment, penetration testing, cryptographic protocols, incident response, SIEM event monitoring, and automated defense scripting.',
      keyCompetencies: ['Penetration Testing', 'SIEM & Event Log Auditing', 'Cryptographic Security', 'Zero-Trust Architecture', 'Incident Response Playbooks'],
      activities: 'Executed vulnerability scans, validated network defenses against threat vectors, and crafted automated Python scripts for security log aggregation and intrusion detection.',
      engineeringImpact: 'Establishes MUCO Labs security-first mandate—every API, database rule, authentication token, and cloud storage bucket is protected by zero-trust policies.'
    },
    {
      step: '05',
      phase: 'Executive Coordination & Multi-Domain Execution',
      period: 'Professional Role',
      badge: 'Current Role @ KKBN',
      role: 'Personal Assistant at KKBN',
      description: 'Currently serving as Personal Assistant at KKBN, orchestrating executive communications, high-stakes organizational coordination, multi-stakeholder management, and cross-functional operations with meticulous precision.',
      keyCompetencies: ['Executive Coordination', 'Multi-Stakeholder Management', 'Operational Efficiency', 'Strategic Communication', 'Multi-Domain Multitasking'],
      activities: 'Coordinates executive schedules, structures cross-departmental communications, and delivers high-reliability organizational support in fast-paced operational environments.',
      engineeringImpact: 'Reinforces MUCO Labs executive discipline, punctual project delivery schedules, rigorous accountability, and client-first communication.'
    },
    {
      step: '06',
      phase: 'Founding MUCO Labs & Leading Digital Product Engineering',
      period: '2026 – Present',
      badge: 'Founder & Architect',
      role: 'Founder, MUCO Labs',
      description: 'Established MUCO Labs in 2026 to unite technical engineering depth, cybersecurity rigor, Google Gemini AI intelligence, and full-stack software development into a premier digital product studio headquartered in Erode, Tamil Nadu.',
      keyCompetencies: ['Product Architecture', 'Google Gemini AI Integration', 'Full-Stack Software Engineering', 'Venture Strategy', 'Founder Accountability'],
      activities: 'Leads product design, software engineering, AI workflow integration, and strategic client engagements for visionary founders and scaling businesses.',
      engineeringImpact: 'Delivers hardened, production-grade web, mobile, and SaaS platforms that scale effortlessly and drive tangible business revenue.'
    }
  ];

  const founderPhilosophy = [
    {
      id: 'architecture',
      title: 'Code is Infrastructure, Not Disposable Scrap',
      pillar: 'Structural Rigor',
      domain: 'Engineering Mindset',
      tagline: 'Deterministic typing, modular abstractions, and zero technical debt',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      color: 'cyan',
      coreTenet: 'Software must be built with the permanence and load-bearing strength of civil engineering.',
      text: 'True software craftsmanship rejects rushed spaghetti code. I write and review software with the mindset of multi-year operational reliability—clean TypeScript, normalized database schemas, zero memory leaks, and resilient error recovery. Every component is engineered to scale without unexpected architectural collapses.',
      heuristic: 'If a data structure is untyped or an edge case is unhandled, it is not finished code.',
      industryAntiPattern: 'Deploying fragile prototype shortcuts that crumble under moderate user load.',
      founderStandard: 'Strong typing, decoupled API layers, and fully deterministic error boundaries across the entire stack.'
    },
    {
      id: 'security',
      title: 'Zero-Trust Architecture by Default',
      pillar: 'Security Posture',
      domain: 'Cybersecurity & Auditing',
      tagline: 'Treating data integrity and least-privilege access as mandatory baseline requirements',
      icon: <Lock className="w-5 h-5 text-rose-400" />,
      color: 'rose',
      coreTenet: 'Security is not an add-on feature—it is the foundational boundary that protects client trust.',
      text: 'Drawing from extensive experience in cybersecurity, security auditing, and SIEM analysis, I enforce zero-trust principles at every software layer. APIs are server-isolated, database security rules are rigorously hardened, and cryptographic verification guards all transactional interactions.',
      heuristic: 'Never trust client-side state; validate and authorize every single mutation on hardened server boundaries.',
      industryAntiPattern: 'Exposing backend keys in client bundles and deferring security rules until after a vulnerability is exploited.',
      founderStandard: 'Strict server-side API proxying, granular role-based access rules, encrypted payloads, and automated secret rotation.'
    },
    {
      id: 'mentorship',
      title: 'Mastery is Proven Through Educational Clarity',
      pillar: 'Clarity & Empathy',
      domain: 'Mentorship & Communication',
      tagline: 'Demystifying complex systems so founders can make confident, high-leverage decisions',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      color: 'amber',
      coreTenet: 'If you cannot explain a software architecture plainly, you do not understand it deeply enough.',
      text: 'Having mentored and trained more than 1,000 students in computer programming and cybersecurity, I believe technical leadership is defined by empathy and lucid communication. We eliminate condescending developer jargon, providing our clients with transparent system diagrams and clear technical rationale.',
      heuristic: 'Transparent documentation and simple architectural models always outperform opaque, convoluted codebases.',
      industryAntiPattern: 'Using buzzword-heavy jargon to intimidate clients and create artificial vendor lock-in.',
      founderStandard: 'Crystal-clear architectural documentation, modular codebases, and direct founder-level communication.'
    },
    {
      id: 'business_roi',
      title: 'Pragmatic Innovation with Measurable Business ROI',
      pillar: 'Business Problem-Solving',
      domain: 'Economic Utility',
      tagline: 'Deploying AI and cloud automation strictly where it eliminates real operational cost',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
      coreTenet: 'Technology is only justified when it eliminates operational friction or generates tangible revenue.',
      text: 'We reject vanity engineering and hype-driven development. We integrate Google Gemini APIs, automated webhooks, and modern cloud pipelines specifically where they cut human labor hours, accelerate transaction throughput, or unlock new monetization channels for our partners.',
      heuristic: 'Never deploy a complex AI model where a deterministic rule or clean database query solves the problem faster and cheaper.',
      industryAntiPattern: 'Charging clients for expensive AI integrations that provide zero measurable economic or UX improvement.',
      founderStandard: 'Strategic, high-impact AI agents and event-driven automations tied directly to measurable operational KPIs.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* TOP SEO BREADCRUMBS */}
      <div className="pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumbs
          currentPage="about"
          subItem={activeTab === 'founder' ? 'Founder & Leadership Profile' : 'Company Overview'}
          onNavigate={onNavigate}
        />
      </div>

      {/* SECTION NAVIGATOR / TOP TOGGLE */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 dark:bg-[#070b16]/90 border border-slate-800 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">About Page Explorer</span>
              <h2 className="text-xs sm:text-sm font-black text-white">Two Distinct Identities. One Shared Vision.</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('company');
                document.getElementById('part-company')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'company'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Part 1: MUCO Labs</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('founder');
                document.getElementById('part-founder')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'founder'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Part 2: The Founder</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PART 1 — MUCO LABS (THE COMPANY) */}
      {/* ========================================================================= */}
      <div id="part-company" className="space-y-20 sm:space-y-28">

        {/* 1.1 COMPANY HERO & POSITIONING */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-slate-900/90 dark:bg-[#070b16]/95 border border-slate-800/90 p-6 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-2xl overflow-hidden text-left">
            {/* Ambient Background Glows */}
            <div 
              className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 dark:opacity-60"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.16) 0%, transparent 70%)' }}
            />
            <div 
              className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 dark:opacity-60"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.16) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Part 1 • The Technology Company</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Transforming Visionary Ideas Into <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">Intelligent Digital Products</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-normal">
                <strong>MUCO Labs</strong> is a modern software engineering and digital transformation studio based in Erode, Tamil Nadu. We partner with founders, fast-scaling startups, and established enterprises to engineer bespoke web platforms, native mobile applications, intelligent AI workflows, and resilient cloud architectures.
              </p>

              {/* Core Philosophy Statement */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-950 border-l-4 border-cyan-400 border-y border-r border-slate-800/80">
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  "We believe technology should not exist merely for the sake of novelty. Technology must solve tangible business problems, eliminate operational friction, and deliver measurable commercial value."
                </p>
              </div>

              {/* Quick Company Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">Established</span>
                  <span className="text-xs font-extrabold text-white">Year 2026</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Headquarters</span>
                  <span className="text-xs font-extrabold text-white">Erode, Tamil Nadu</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">Domain Focus</span>
                  <span className="text-xs font-extrabold text-white">AI, Web & Mobile</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block">Standard</span>
                  <span className="text-xs font-extrabold text-white">Production-Ready</span>
                </div>
              </div>

              {/* Company CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Explore What We Build</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('founder');
                    document.getElementById('part-founder')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-800 transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Meet Founder Srinivash</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 1.2 COMPANY IDENTITY: FOUR CORE QUESTIONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
              Core Identity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Understanding MUCO Labs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers defining our purpose, capabilities, and long-term commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/70 dark:bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Key Principle 0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1.3 MUCO LABS — INNOVATION ENGINE (Problem -> Technology -> Intelligence -> Automation -> Business Impact) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Editorial Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-400 text-[11px] font-black uppercase tracking-widest">
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              <span>Proprietary 5-Stage Engineering Lifecycle</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              From Friction to Verified <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Commercial Impact
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              How MUCO Labs systematically transforms raw operational bottlenecks into hardened architectures, autonomous intelligence, and compounding business ROI.
            </p>
          </div>

          {/* Interactive Flow Pipeline Bar & Graphic Flowchart */}
          <div className="p-4 sm:p-8 rounded-3xl bg-slate-900/90 dark:bg-[#070b16]/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-8">
            
            {/* Simulation Toolbar & Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isSimulating ? 'bg-cyan-500' : 'bg-amber-500'}`} />
                </span>
                <div>
                  <span className="text-xs font-black text-white tracking-wide block">
                    Interactive Methodology Flowchart
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isSimulating ? 'Automated Simulation Active • Cycling Pipeline' : `Inspecting Stage 0${activeInnovationStep + 1}: ${innovationPipeline[activeInnovationStep].name}`}
                  </span>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSimulating
                      ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Simulation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-amber-400" />
                      <span>Auto-Simulate Flow</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveInnovationStep(0);
                  }}
                  title="Reset to Stage 01"
                  className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Graphic Flowchart Track with Connective Conduits */}
            <div className="relative">
              {/* Connecting Desktop SVG Conduits */}
              <div className="hidden lg:block absolute top-9 left-10 right-10 h-0.5 bg-slate-800 z-0" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
                {innovationPipeline.map((stage, idx) => {
                  const isActive = activeInnovationStep === idx;
                  const isPassed = activeInnovationStep > idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => {
                        setIsSimulating(false);
                        setActiveInnovationStep(idx);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                        isActive
                          ? 'bg-slate-800/95 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50 scale-[1.02]'
                          : isPassed
                          ? 'bg-slate-950/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                          : 'bg-slate-950/70 border-slate-900 hover:border-slate-800 hover:bg-slate-900/40 opacity-80'
                      }`}
                    >
                      {/* Top Row: Icon, Step & Arrow Connector */}
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl border transition-colors ${
                          isActive
                            ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {stage.icon}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <span className={`text-[10px] font-mono font-black ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                            {stage.step}
                          </span>
                          {idx < innovationPipeline.length - 1 && (
                            <ChevronRight className="hidden sm:inline w-3 h-3 text-slate-600" />
                          )}
                        </div>
                      </div>

                      {/* Stage Name & Metric Snippet */}
                      <div>
                        <span className={`text-[9px] font-black uppercase tracking-wider block ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                          Phase {idx + 1}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-black transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {stage.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                          {stage.metric}
                        </span>
                      </div>

                      {/* Bottom Active Glow Indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-amber-400 via-cyan-400 to-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Stage Deep-Dive Card with Stream Transformation Architecture */}
            {(() => {
              const current = innovationPipeline[activeInnovationStep];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0f22] to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    
                    {/* Left Column: Stage Summary, Stream Pipeline & Deliverables */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${current.accentBg} ${current.accentText} border ${current.accentBorder} uppercase`}>
                            {current.phaseLabel}
                          </span>
                          <span className="text-xs font-bold text-amber-400">
                            {current.tagline}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                          {current.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                          {current.summary}
                        </p>
                      </div>

                      {/* Stream Transformation Architecture (Input -> Engine -> Output) */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-inner">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Binary className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Transformation Pipeline Architecture</span>
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400">Input ➔ Engine ➔ Output</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          {/* Input */}
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block">
                              Incoming Input:
                            </span>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                              {current.input}
                            </p>
                          </div>

                          {/* Engine */}
                          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 block">
                              MUCO Engine:
                            </span>
                            <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                              {current.transformation}
                            </p>
                          </div>

                          {/* Output */}
                          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 block">
                              Hardened Output:
                            </span>
                            <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                              {current.output}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Execution Deliverables */}
                      <div className="space-y-2.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                          Concrete Stage Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {current.details.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Empirical Metric & Practical Case Study Box */}
                    <div className="lg:col-span-5 space-y-5">
                      
                      {/* Telemetry Metric Badge */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 shadow-xl space-y-1">
                        <div className="flex items-center justify-between text-amber-400">
                          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5" />
                            <span>Empirical Telemetry Metric</span>
                          </span>
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight pt-1">
                          {current.metric}
                        </div>
                        <p className="text-xs text-slate-400">
                          {current.metricLabel}
                        </p>
                      </div>

                      {/* Real-World Case Study Box */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Practical Enterprise Application</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {current.caseExample.verifiedImpact}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                              Client Scenario:
                            </span>
                            <p className="text-xs font-semibold text-slate-200 mt-0.5">
                              {current.caseExample.scenario}
                            </p>
                          </div>
                          
                          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/20">
                            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400 block">
                              MUCO Labs Engineering Execution:
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                              {current.caseExample.solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Technology Stack Tags */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          Associated Core Technologies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {current.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Step Controller */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => {
                            setIsSimulating(false);
                            setActiveInnovationStep((prev) => (prev > 0 ? prev - 1 : innovationPipeline.length - 1));
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                        >
                          ← Previous Stage
                        </button>
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {activeInnovationStep + 1} / {innovationPipeline.length}
                        </span>
                        <button
                          onClick={() => {
                            setIsSimulating(false);
                            setActiveInnovationStep((prev) => (prev < innovationPipeline.length - 1 ? prev + 1 : 0));
                          }}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/25 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          Next Stage →
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })()}

            {/* Static Bird's-Eye Flowchart Summary Table (Connecting All 5 Stages) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Complete Methodology Stream (At A Glance)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Full 5-Phase End-to-End Cycle
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {innovationPipeline.map((st, sIdx) => (
                  <div
                    key={st.id}
                    onClick={() => {
                      setIsSimulating(false);
                      setActiveInnovationStep(sIdx);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      activeInnovationStep === sIdx
                        ? 'bg-slate-900 border-amber-400/70 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black text-slate-500">
                        0{sIdx + 1}
                      </span>
                      <span className="text-[9px] font-bold text-amber-400">
                        {st.name}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">
                      {st.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {st.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 1.4 MUCO LABS — FUTURE TECHNOLOGY DIRECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-400 block">
                Next-Gen Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Building For Today & The Future Landscape
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Engineering practical AI, resilient cloud systems, and high-performance digital architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureTechnologies.map((tech, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 dark:bg-[#080d1a]/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-105 transition-transform">
                    {tech.icon}
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tech.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1.5 MUCO LABS — COMPANY LONG-TERM VISION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#070d1d] to-slate-950 border border-cyan-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden text-left">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest">
                <Rocket className="w-3.5 h-3.5" />
                <span>The Long-Term Destination</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Our Ambition: Becoming India's Premier Benchmark In Software & AI Innovation
              </h2>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                MUCO Labs is structured to become an enduring technology powerhouse. We aim to support hundreds of visionary entrepreneurs, automate complex corporate processes with enterprise AI, and create a collaborative technology ecosystem rooted in Erode, Tamil Nadu with a global reach.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Empowering Emerging Founders:</strong> Equipping startups with high-grade architectures from MVP launch to series scaling.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Democratizing Enterprise Intelligence:</strong> Integrating production Gemini AI into everyday operational tools to unlock unprecedented efficiency.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Uniting the Tech Community:</strong> Fostering a vibrant culture of software craftsmanship, open workshops, and developer growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* TRANSITION DIVIDER: FROM COMPANY TO FOUNDER */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-8 flex items-center justify-center">
          <div className="w-full border-t border-slate-800" />
          <div className="absolute px-6 py-2 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
            <User className="w-4 h-4 text-amber-400" />
            <span>Part 2: The Founder Behind The Vision</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 2 — THE FOUNDER (SRINIVASH MAHALINGAM) */}
      {/* ========================================================================= */}
      <div id="part-founder" className="space-y-20 sm:space-y-28">

        {/* 2.1 FOUNDER HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-slate-900/90 dark:bg-[#070b16]/95 border border-slate-800/90 p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Ambient Background Glows */}
            <div 
              className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 dark:opacity-60"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.16) 0%, transparent 70%)' }}
            />
            <div 
              className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-40 dark:opacity-60"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.16) 0%, transparent 70%)' }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left: Founder Portrait Card */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
                <div className="relative group w-full max-w-sm">
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
                  
                  <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 shadow-2xl">
                    {/* Portrait Image */}
                    <div className="relative h-96 sm:h-[420px] w-full overflow-hidden bg-slate-950">
                      <img
                        src={FOUNDER_INFO.image}
                        alt="Srinivash Mahalingam, Founder of MUCO Labs"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Floating Verified Badge */}
                      <div className="absolute top-3.5 right-3.5 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Sole Founder & Architect</span>
                      </div>

                      {/* Image Overlay Details */}
                      <div className="absolute bottom-3 left-4 right-4 text-left">
                        <p className="text-xl font-black text-white tracking-tight">Srinivash Mahalingam</p>
                        <p className="text-xs font-bold text-amber-400">Founder, MUCO Labs</p>
                        <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>Erode, Tamil Nadu, India</span>
                        </p>
                      </div>
                    </div>

                    {/* Direct Contact Links */}
                    <div className="p-3.5 bg-slate-950/95 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-bold">
                      <a
                        href={`tel:${FOUNDER_INFO.phone.replace(/\s+/g, '')}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all text-[11px]"
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Call Founder</span>
                      </a>
                      <a
                        href={`mailto:${FOUNDER_INFO.email}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-amber-500/40 flex items-center justify-center gap-1.5 transition-all text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Email Founder</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Founder Introduction & Positioning */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
                  <User className="w-3.5 h-3.5" />
                  <span>The Person Behind MUCO Labs</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Srinivash Mahalingam
                  </h2>
                  <p className="text-sm sm:text-lg font-extrabold uppercase tracking-widest bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                    Founder, MUCO Labs • Software Architect & Technologist
                  </p>
                </div>

                {/* Core Ethos Quote */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border-l-4 border-amber-400 border-y border-r border-slate-800/80 shadow-lg">
                  <blockquote className="text-base sm:text-xl font-bold text-slate-100 italic leading-snug">
                    "{FOUNDER_INFO.quote}"
                  </blockquote>
                  <p className="text-[11px] font-extrabold text-amber-400 mt-2 uppercase tracking-wider">
                    — Srinivash Mahalingam (srinandy), Founder of MUCO Labs
                  </p>
                </div>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                  Srinivash Mahalingam is a technologist, software engineer, cybersecurity specialist, and educator who founded MUCO Labs to create high-impact software solutions. Combining rigorous technical fluency across programming, systems security, and cloud infrastructure with practical leadership, he steers the architectural and strategic vision of MUCO Labs.
                </p>

                {/* Founder Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-left">
                    <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider block">Education & Impact</span>
                    <span className="text-xs font-bold text-white">1,000+ Students Mentored</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-left">
                    <span className="text-[10px] uppercase font-black text-cyan-400 tracking-wider block">Security Depth</span>
                    <span className="text-xs font-bold text-white">Cybersecurity & SIEM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-left col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider block">Current Role</span>
                    <span className="text-xs font-bold text-white">Personal Assistant @ KKBN</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openWhatsApp({ customMessage: 'Hello Srinivash, I would like to discuss a project with you and MUCO Labs.' })}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Founder Srinivash</span>
                  </button>

                  <button
                    onClick={() => onNavigate('contact', 'Direct inquiry for Founder Srinivash Mahalingam')}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
                  >
                    <span>Direct Inquiry Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.2 FOUNDER STORY / JOURNEY NARRATIVE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
              Narrative & Evolution
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              The Founder’s Technical Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How hands-on coding, cybersecurity audits, and teaching laid the bedrock for MUCO Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Binary className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">1. Deep Technical Grounding</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Srinivash began with an exhaustive immersion into computer programming languages (Python, C/C++, Java, JavaScript) and relational databases. Rather than relying on superficial templates, he developed a deep appreciation for low-level memory handling, data structures, and deterministic logic.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">2. Cybersecurity & System Defense</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Expanding into infrastructure defense, he mastered penetration testing, cryptographic protocols, SIEM monitoring, and security auditing. This gave him a rare security-first architectural mindset that guarantees every MUCO Labs application is built like a digital fortress.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">3. Mentoring 1,000+ Students</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Believing that true mastery comes from the ability to teach, Srinivash trained more than 1,000 students in coding and cybersecurity. This massive mentorship background honed his communication, patient leadership, and capacity to articulate complex systems clearly.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">4. Cloud & Automation Pipelines</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Working across AWS, Azure, Google Cloud Platform, Docker, and Kubernetes, Srinivash engineered automated CI/CD deployment routines and script-based automations, eliminating manual fragility and scaling application throughput.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">5. Broad Professional Execution</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Currently working as Personal Assistant at KKBN, Srinivash manages diverse organizational tasks, high-level correspondence, and multi-domain operations, reinforcing his disciplined work ethic, attention to detail, and multi-stakeholder management.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/80 dark:bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-white">6. Building MUCO Labs</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Uniting deep technical literacy, cybersecurity discipline, educational clarity, and entrepreneurial vision, Srinivash launched MUCO Labs to create world-class digital products and lead India’s next technology renaissance.
              </p>
            </div>
          </div>
        </section>

        {/* 2.3 FOUNDER'S PROFESSIONAL PROGRESSION TIMELINE (HIGH-END INTERACTIVE TIMELINE) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
              Factual Professional Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              The Evolution of Srinivash Mahalingam
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tracing the factual journey from technical foundations and 1,000+ student mentorship to founding MUCO Labs.
            </p>
          </div>

          <div className="p-4 sm:p-8 rounded-3xl bg-slate-900/90 dark:bg-[#070b16]/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-8">
            
            {/* Timeline Progress Bar & Milestone Selectors */}
            <div className="relative">
              {/* Desktop Progress Line */}
              <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-slate-800 z-0" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
                {founderEvolutionMilestones.map((milestone, idx) => {
                  const isActive = activeMilestoneIdx === idx;
                  return (
                    <button
                      key={milestone.step}
                      onClick={() => setActiveMilestoneIdx(idx)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 group relative overflow-hidden ${
                        isActive
                          ? 'bg-slate-800/95 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center border transition-colors ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md'
                            : 'bg-slate-900 text-slate-400 border-slate-800 group-hover:text-white'
                        }`}>
                          {milestone.step}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 font-mono">
                          {milestone.period}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-amber-400/90 uppercase tracking-widest block truncate">
                          {milestone.badge}
                        </span>
                        <h4 className={`text-xs font-black leading-snug line-clamp-2 mt-0.5 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {milestone.phase}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Milestone Deep-Dive Dossier */}
            {(() => {
              const current = founderEvolutionMilestones[activeMilestoneIdx];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0f20] to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    
                    {/* Left Details: Phase, Role & Description */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Milestone {current.step} / 06
                          </span>
                          <span className="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                            {current.period}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {current.badge}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                          {current.phase}
                        </h3>

                        <p className="text-xs sm:text-sm font-semibold text-amber-400">
                          Role: {current.role}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {current.description}
                      </p>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Hands-On Focus & Core Responsibilities:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {current.activities}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                          Key Technical Competencies Mastered:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {current.keyCompetencies.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Impact Box & Stepper Controls */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/30 shadow-xl space-y-3">
                        <div className="flex items-center gap-2 text-amber-400">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-black uppercase tracking-widest">
                            Direct Impact on MUCO Labs
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          "{current.engineeringImpact}"
                        </p>
                      </div>

                      {/* Step Controller */}
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <button
                          onClick={() => setActiveMilestoneIdx((prev) => (prev > 0 ? prev - 1 : founderEvolutionMilestones.length - 1))}
                          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                        >
                          ← Previous Phase
                        </button>
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {activeMilestoneIdx + 1} / {founderEvolutionMilestones.length}
                        </span>
                        <button
                          onClick={() => setActiveMilestoneIdx((prev) => (prev < founderEvolutionMilestones.length - 1 ? prev + 1 : 0))}
                          className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
                        >
                          Next Phase →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

          </div>
        </section>

        {/* 2.4 DEDICATED TEACHING & MENTORSHIP SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">1,000+</span>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-amber-400 mt-1">
                    Students Mentored & Trained
                  </p>
                </div>
                <p className="text-xs text-slate-400 max-w-xs">
                  In practical computer programming, algorithmic problem-solving, and cybersecurity principles.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Educational Leadership</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  How Mentorship Shaped The Founder's Architectural Leadership
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Teaching programming and cybersecurity to over 1,000 students required more than technical expertise—it demanded clear communication, structured problem breakdown, and empathy. At MUCO Labs, this mentorship background translates directly into transparent client communication, clean code documentation, and collaborative client relationships.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-white block">Structured Clarity</span>
                    <span className="text-[11px] text-slate-400">Simplifying complex architectures for stakeholders.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-white block">Patience & Precision</span>
                    <span className="text-[11px] text-slate-400">Detailed code reviews and zero-shortcut engineering.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-white block">Continuous Learning</span>
                    <span className="text-[11px] text-slate-400">Staying ahead of modern AI and cloud tooling.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2.5 FOUNDER TECHNICAL DEPTH & CAPABILITIES MATRIX */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block">
                Hands-On Engineering Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Technical Depth & Core Proficiencies
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Hands-on mastery across software development, cybersecurity, cloud DevOps, and systems administration.
            </p>
          </div>

          {/* Technical Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/70 dark:bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 w-fit group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2.6 FOUNDER ENTREPRENEURIAL MINDSET & PHILOSOPHY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Editorial Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-400 text-[11px] font-black uppercase tracking-widest">
              <Quote className="w-3.5 h-3.5 text-cyan-400" />
              <span>Authentic Engineering Ethos & Mentorship Manifesto</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Srinivash Mahalingam’s <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Operating Philosophy
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A synthesis of architectural rigor, zero-trust security defense, and pedagogical empathy forged through mentoring 1,000+ students and engineering mission-critical software.
            </p>
          </div>

          {/* Triad of Foundational Convictions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 dark:bg-[#070b16]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Axiom 01</span>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                  Architectural Permanence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Software is load-bearing infrastructure. We write code with mathematical precision—deterministic TypeScript, normalized database schemas, and zero unhandled edge cases.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <span>Rule:</span>
                <span className="text-slate-400">No brittle shortcuts in production.</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 dark:bg-[#070b16]/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Axiom 02</span>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                  The Mentorship Standard
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Having guided 1,000+ students, true mastery means translating dense, complex architectures into intuitive, transparent mental models without condescending jargon.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-400 flex items-center gap-1.5">
                <span>Rule:</span>
                <span className="text-slate-400">Mastery is proven through clarity.</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 dark:bg-[#070b16]/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Axiom 03</span>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                  Pragmatic Economic ROI
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Zero vanity AI. We integrate Google Gemini APIs and autonomous webhooks strictly where they eliminate manual overhead, accelerate conversions, or unlock revenue.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span>Rule:</span>
                <span className="text-slate-400">Technology must drive business value.</span>
              </div>
            </div>
          </div>

          {/* Interactive 4-Pillar Deep-Dive Dossier */}
          <div className="p-4 sm:p-8 rounded-3xl bg-slate-900/90 dark:bg-[#070b16]/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-8">
            
            {/* Pillar Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {founderPhilosophy.map((phil, idx) => {
                const isActive = activePhilosophyTab === idx;
                return (
                  <button
                    key={phil.id}
                    onClick={() => setActivePhilosophyTab(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                      isActive
                        ? 'bg-slate-800/95 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-amber-500/20 border-amber-400/40 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                        {phil.icon}
                      </div>
                      <span className={`text-[10px] font-mono font-black ${isActive ? 'text-amber-400' : 'text-slate-600'}`}>
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-400/90 block">
                        {phil.pillar}
                      </span>
                      <h4 className={`text-xs sm:text-sm font-black leading-snug mt-0.5 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {phil.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Philosophy Deep-Dive Card */}
            {(() => {
              const current = founderPhilosophy[activePhilosophyTab];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-[#0a0e1c] to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    
                    {/* Left Column: Narrative Synthesis & Core Heuristic */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                            {current.domain}
                          </span>
                          <span className="text-xs font-bold text-cyan-400">
                            {current.pillar}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                          {current.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-amber-300/90">
                          {current.tagline}
                        </p>
                      </div>

                      {/* Core Tenet Callout with Quotation Typography */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border-l-4 border-amber-400 border-y border-r border-slate-800 shadow-md relative overflow-hidden">
                        <Quote className="absolute -bottom-2 right-2 w-16 h-16 text-amber-500/10 pointer-events-none" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-100 italic leading-relaxed relative z-10">
                          "{current.coreTenet}"
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {current.text}
                      </p>

                      {/* Decision Heuristic Box */}
                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Srinivash's Direct Engineering Heuristic:</span>
                        </span>
                        <p className="text-xs text-slate-200 font-mono font-medium pt-0.5">
                          "{current.heuristic}"
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Industry Anti-Pattern vs. Srinivash Standard Comparison */}
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        The Standard in Practice:
                      </span>

                      {/* Anti-Pattern Box */}
                      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            <span>Common Industry Anti-Pattern</span>
                          </span>
                          <span className="text-[10px] font-mono text-rose-400/70">What We Avoid</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {current.industryAntiPattern}
                        </p>
                      </div>

                      {/* Srinivash / MUCO Labs Standard Box */}
                      <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>The Srinivash & MUCO Standard</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400/70">Hardened Execution</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          {current.founderStandard}
                        </p>
                      </div>

                      {/* Quick Pagination / Tab Selector */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setActivePhilosophyTab((prev) => (prev > 0 ? prev - 1 : founderPhilosophy.length - 1))}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                        >
                          ← Previous Principle
                        </button>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          {activePhilosophyTab + 1} / {founderPhilosophy.length}
                        </span>
                        <button
                          onClick={() => setActivePhilosophyTab((prev) => (prev < founderPhilosophy.length - 1 ? prev + 1 : 0))}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
                        >
                          Next Principle →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

          </div>

          {/* Dedicated Mentorship Manifesto Showcase Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a0f24] to-slate-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>The 1,000+ Student Blueprint</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Why Mentorship Shapes Every Product We Build
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Teaching complex computer science and cybersecurity to over 1,000 students removed any desire for convoluted code or opaque technical gatekeeping.
                </p>
                <div className="pt-2">
                  <blockquote className="border-l-2 border-cyan-400 pl-3 italic text-xs text-cyan-200 font-medium">
                    "If a client cannot understand why an architectural choice was made, the failure is in our communication, not their technical literacy."
                  </blockquote>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">— Srinivash Mahalingam</span>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-xs font-black text-white">Mental Models First</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Syntax changes; algorithmic logic and low-level memory lifecycles remain eternal.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-xs font-black text-white">Zero Gatekeeping</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Transparent system diagrams, clear documentation, and founder-direct access on every build.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-xs font-black text-white">Defensive By Design</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Teaching security at the data schema layer prevents catastrophic post-launch vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* 2.7 FOUNDER'S VISION FOR MUCO LABS & CLOSING */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-[#070b16] to-slate-950 border border-amber-500/30 p-8 sm:p-14 shadow-2xl space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Founder Commitment & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              "MUCO Labs Is My Commitment To Building Technology That Lasts."
            </h2>

            <p className="text-xs sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              When you partner with MUCO Labs, you are not engaging an anonymous agency. You are collaborating directly with a dedicated founder and engineer who takes personal pride in the security, speed, and elegance of your product. Let’s build something remarkable together.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-3.5">
              <button
                onClick={() => openWhatsApp({ customMessage: 'Hello Srinivash! I am interested in building a project with MUCO Labs.' })}
                className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Start WhatsApp Chat with Srinivash</span>
              </button>

              <button
                onClick={() => onNavigate('contact', 'Project consultation inquiry for Founder Srinivash Mahalingam')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Schedule Founder Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('pricing')}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-extrabold text-xs sm:text-sm border border-slate-700 shadow-md transition-all"
              >
                <span>View Transparent Pricing</span>
              </button>
            </div>

            {/* Public Business Contact Info */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Erode, Tamil Nadu, India</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 6381809844</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>contact@mucolabs.in</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>mucolabs.in</span>
              </span>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};
