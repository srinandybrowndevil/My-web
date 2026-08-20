import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  COURSES_DATA,
  WAY2ME_PARTNER_INFO,
  CourseItem
} from '../data/coursesData';
import {
  GraduationCap,
  BookOpen,
  Code2,
  Smartphone,
  Bot,
  Cpu,
  Layers,
  TrendingUp,
  Palette,
  Briefcase,
  Phone,
  Mail,
  Globe,
  Instagram,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  Share2
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CoursesProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<CourseItem | null>(null);
  const [activeModuleAccordion, setActiveModuleAccordion] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quick Enrollment / Inquiry Form State
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    courseId: COURSES_DATA[0].id,
    batchPreference: 'Live Online Interactive',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Categories list
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(COURSES_DATA.map((c) => c.category)))];
    return cats;
  }, []);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.tagline.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.technologies.some((t) => t.toLowerCase().includes(q)) ||
        course.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Icon mapping
  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-pink-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
    }
  };

  // WhatsApp Inquiry Generator directly to Yogahariharan (+91 9566596501)
  const handleWhatsAppCourseInquiry = (courseTitle: string) => {
    const text = encodeURIComponent(
      `Hello Mr. Yogahariharan (Founder & CEO, Way2Me),\n\nI am interested in enrolling for the "${courseTitle}" course offered in partnership with MUCO Labs.\n\nPlease share the detailed fee structure, syllabus brochure, and upcoming batch timings.\n\nThank you!`
    );
    window.open(`https://wa.me/${WAY2ME_PARTNER_INFO.cleanPhone1}?text=${text}`, '_blank');
  };

  const handleGeneralWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Mr. Yogahariharan (Founder & CEO, Way2Me),\n\nI visited the MUCO Labs & Way2Me Courses portal and would like to speak with you regarding course admissions, fee structures, and customized training programs.\n\nPlease let me know a convenient time to discuss.`
    );
    window.open(`https://wa.me/${WAY2ME_PARTNER_INFO.cleanPhone1}?text=${text}`, '_blank');
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      showToast('Enrollment inquiry received! Founder Yogahariharan will contact you shortly.', 'success');

      // Also open WhatsApp pre-filled with this student's inquiry
      const targetCourse = COURSES_DATA.find((c) => c.id === formState.courseId)?.title || formState.courseId;
      const text = encodeURIComponent(
        `*New Course Inquiry via MUCO Labs Portal*\n\n` +
          `*Student Name:* ${formState.name}\n` +
          `*Phone:* ${formState.phone}\n` +
          `*Email:* ${formState.email || 'Not provided'}\n` +
          `*Selected Course:* ${targetCourse}\n` +
          `*Batch Preference:* ${formState.batchPreference}\n` +
          `*Note / Questions:* ${formState.message || 'Interested in fee details and batch start date'}`
      );
      window.open(`https://wa.me/${WAY2ME_PARTNER_INFO.cleanPhone1}?text=${text}`, '_blank');
    }, 800);
  };

  const faqs = [
    {
      q: 'How do I know the exact price and fee structure for each course?',
      a: `To get customized course pricing, scholarship options, and batch fee details, please contact Way2Me Founder & CEO Yogahariharan directly by calling or messaging on WhatsApp at +91 9566596501 or +91 8807578299. Individual 1-on-1 mentorship, student group discounts, and corporate batch options are available.`
    },
    {
      q: 'Who conducts the classes and mentorship sessions?',
      a: `Classes and live practical labs are conducted jointly by S. Yogahariharan (Founder & CEO, Way2Me) and Srinivash Mahalingam (Founder, MUCO Labs) along with experienced senior software architects and CAD design specialists.`
    },
    {
      q: 'Are these courses suitable for absolute beginners without prior coding experience?',
      a: `Yes! Courses such as Full-Stack Web Engineering, AutoCAD Drafting, UI/UX Design, and Digital Marketing start with fundamental building blocks before advancing to production-level capstones. We provide pre-course fundamentals and step-by-step guidance.`
    },
    {
      q: 'Will I receive a verified certificate upon completion?',
      a: `Yes, all graduating students receive an official, verifiable Certificate of Completion jointly issued by MUCO Labs and Way2Me Academy, along with a portfolio review and resume endorsement.`
    },
    {
      q: 'What learning formats and batch timings are offered?',
      a: `We offer flexible learning options including Live Interactive Online Batches (Weekday Evenings & Weekends), 1-on-1 Intensive Mentorship, and In-Person Training Workshops at the Way2Me Campus in Kavettipatty, Namakkal, Tamil Nadu.`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs currentPage="courses" onNavigate={onNavigate} />

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/80 border border-slate-800 p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MUCO Labs & Way2Me Academy Training Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Master High-Income Tech Skills Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300">
                Live Production Engineering
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              We have transformed MUCO Labs' industry services into hands-on mastery courses. Learn Full-Stack Web Development, Mobile Apps, Generative AI & LLMs, Custom SaaS Architecture, AutoCAD Drafting, UI/UX Design, and WhatsApp Business API automation with direct 1-on-1 mentorship.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#courses-list"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore All 8 Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleGeneralWhatsAppInquiry}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Founder Yogahariharan</span>
              </button>

              <a
                href={`tel:${WAY2ME_PARTNER_INFO.cleanPhone1}`}
                className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {WAY2ME_PARTNER_INFO.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Official Admissions & Way2Me Contact Spotlight Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/70 border-2 border-indigo-500/30 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider border border-indigo-500/30">
                  Official Educational Partner
                </span>
                <span className="text-xs text-slate-400">• Direct Admissions & Course Delivery</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Way2Me Academy &mdash; Led by Yogahariharan
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Courses are conducted and managed through <strong>Way2Me Academy</strong> under the leadership of{' '}
                <strong>Founder & CEO Yogahariharan</strong> in partnership with MUCO Labs. All course fee pricing, custom student packages, and live batch schedules are handled directly through the official Way2Me contact desk.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span><strong>Founder & CEO:</strong> Yogahariharan</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span><strong>Campus:</strong> Namakkal, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span><strong>Fees:</strong> Contact Direct Number for Pricing</span>
                </div>
              </div>
            </div>

            {/* Contact Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href={`tel:${WAY2ME_PARTNER_INFO.cleanPhone1}`}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-700/30"
              >
                <Phone className="w-4 h-4" />
                <span>Call Yogahariharan ({WAY2ME_PARTNER_INFO.primaryPhone})</span>
              </a>

              <a
                href={`tel:${WAY2ME_PARTNER_INFO.cleanPhone2}`}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Alt Line: {WAY2ME_PARTNER_INFO.secondaryPhone}</span>
              </a>

              <a
                href={WAY2ME_PARTNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: {WAY2ME_PARTNER_INFO.instagramHandle}</span>
              </a>

              <a
                href={WAY2ME_PARTNER_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Visit way2me.co.in</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Benefits Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WAY2ME_PARTNER_INFO.keyBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 flex items-start gap-3.5 hover:border-slate-600 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Search & Category Filter Section */}
        <div id="courses-list" className="scroll-mt-24 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <span>Available Training Courses ({filteredCourses.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select a domain or search by specific framework, tool, or engineering concept.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search React, AI, AutoCAD, Flutter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center my-8">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No matching courses found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              We couldn't find any course matching "{searchQuery}". Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-950/30 transition-all group relative overflow-hidden"
              >
                {course.badge && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[10px] rounded-full shadow-sm uppercase tracking-wider">
                    {course.badge}
                  </div>
                )}

                <div>
                  {/* Category & Level Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                      {getCourseIcon(course.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{course.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-snug mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {course.tagline}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-5">
                    {course.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {course.technologies.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-900/90 text-slate-300 border border-slate-700/60 rounded-md text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 5 && (
                      <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                        +{course.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Controls */}
                <div className="pt-4 border-t border-slate-700/70">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Course Pricing
                      </span>
                      <span className="text-xs font-bold text-amber-400">
                        Contact Yogahariharan for Fee Details
                      </span>
                    </div>
                    <span className="text-[10px] bg-slate-900 px-2.5 py-1 rounded text-slate-300 border border-slate-700">
                      {course.modules.length} Detailed Modules
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedCourseForModal(course);
                        setActiveModuleAccordion(0);
                      }}
                      className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>View Syllabus</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppCourseInquiry(course.title)}
                      className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire / Enroll</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Enrollment & Direct Admissions Inquiry Section */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-8 sm:p-10 mb-16 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Admissions Desk</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Enroll or Need Guidance?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Fill out the quick inquiry below or reach out directly to{' '}
                <strong>Way2Me Founder & CEO Yogahariharan</strong>. We will share the complete syllabus PDF, pricing breakdown, and upcoming batch calendar.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{WAY2ME_PARTNER_INFO.primaryPhone}</span>
                    <span className="text-[11px] text-slate-400">Direct Call & WhatsApp (Yogahariharan)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{WAY2ME_PARTNER_INFO.primaryEmail}</span>
                    <span className="text-[11px] text-slate-400">Admissions Email Inquiries</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700">
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">{WAY2ME_PARTNER_INFO.instagramHandle}</span>
                    <span className="text-[11px] text-slate-400">Official Way2Me Instagram Hub</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you! We have opened WhatsApp to connect you directly with Founder Yogahariharan (+91 9566596501).
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormState({
                        name: '',
                        phone: '',
                        email: '',
                        courseId: COURSES_DATA[0].id,
                        batchPreference: 'Live Online Interactive',
                        message: ''
                      });
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number (WhatsApp) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Select Course of Interest
                      </label>
                      <select
                        value={formState.courseId}
                        onChange={(e) => setFormState({ ...formState, courseId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {COURSES_DATA.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Batch Preference
                    </label>
                    <select
                      value={formState.batchPreference}
                      onChange={(e) => setFormState({ ...formState, batchPreference: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Live Online Interactive (Evening / Weekend)">
                        Live Online Interactive (Evening / Weekend)
                      </option>
                      <option value="1-on-1 Dedicated Mentorship">1-on-1 Dedicated Mentorship</option>
                      <option value="Fast-Track Weekend Bootcamp">Fast-Track Weekend Bootcamp</option>
                      <option value="In-Person Classroom at Namakkal Campus">
                        In-Person Classroom at Namakkal Campus
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Questions / Special Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please share batch start date, laptop requirements, and student discount details..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry & Open WhatsApp to Founder</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <span>Frequently Asked Questions</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Everything you need to know about course fees, batch schedules, and certifications.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-800 rounded-2xl bg-slate-800/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left font-semibold text-sm text-slate-200 hover:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Course Syllabus Modal */}
      <AnimatePresence>
        {selectedCourseForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourseForModal(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[11px] font-bold rounded-md uppercase">
                    {selectedCourseForModal.category}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedCourseForModal.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {selectedCourseForModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  {selectedCourseForModal.description}
                </p>
              </div>

              {/* Technologies Taught */}
              <div className="mb-6 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Tools, Frameworks & Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourseForModal.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-800 text-cyan-300 border border-slate-700 rounded-lg text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syllabus Modules Accordion */}
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Curriculum Breakdown ({selectedCourseForModal.modules.length} Modules)</span>
                </h4>

                {selectedCourseForModal.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-xl bg-slate-800/60 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setActiveModuleAccordion(activeModuleAccordion === idx ? null : idx)
                      }
                      className="w-full px-4 py-3 text-left font-semibold text-xs sm:text-sm text-white flex items-center justify-between gap-3 hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-blue-300 font-bold">
                        {mod.title}
                      </span>
                      {activeModuleAccordion === idx ? (
                        <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {activeModuleAccordion === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-300 space-y-2.5 border-t border-slate-800">
                        <p>{mod.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {mod.skillsLearned.map((s, si) => (
                            <span
                              key={si}
                              className="px-2 py-0.5 bg-slate-900 text-emerald-400 rounded text-[10px] font-medium border border-emerald-500/20"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Capstone Projects & Prerequisites */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
                  <span className="font-bold text-white block mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Capstone Real-World Projects:</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                    {selectedCourseForModal.capstoneProjects.map((p, pi) => (
                      <li key={pi}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
                  <span className="font-bold text-white block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Prerequisites:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    {selectedCourseForModal.prerequisites}
                  </p>

                  <span className="font-bold text-white block mb-1">Career Opportunities:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCourseForModal.careerOpportunities.map((c, ci) => (
                      <span key={ci} className="px-1.5 py-0.5 bg-slate-900 rounded text-[10px] text-slate-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="p-4 bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Contact Way2Me for Fees & Enrollment:
                  </span>
                  <span className="text-xs text-blue-300">
                    Yogahariharan (Founder & CEO): {WAY2ME_PARTNER_INFO.primaryPhone}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleWhatsAppCourseInquiry(selectedCourseForModal.title)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <a
                    href={`tel:${WAY2ME_PARTNER_INFO.cleanPhone1}`}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
