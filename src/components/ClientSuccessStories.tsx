import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Quote,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  Award,
  Layers,
  ExternalLink,
  Target
} from 'lucide-react';
import { PageId, SuccessStory } from '../types';
import { CLIENT_SUCCESS_STORIES } from '../data/successStoriesData';

interface ClientSuccessStoriesProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
  title?: string;
  subtitle?: string;
  showCategoryFilters?: boolean;
}

export const ClientSuccessStories: React.FC<ClientSuccessStoriesProps> = ({
  onNavigate,
  title = "Client Success Stories",
  subtitle = "Real-world project transformations, measurable impact, and client results achieved by MUCO Labs.",
  showCategoryFilters = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(1); // 1 for right, -1 for left
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Filter stories based on selected category
  const categories = ['All', 'Enterprise ERP', 'Web Development', 'Mobile App', 'AI & Automation', 'SaaS Platform'];

  const filteredStories = selectedCategory === 'All'
    ? CLIENT_SUCCESS_STORIES
    : CLIENT_SUCCESS_STORIES.filter(s => s.category === selectedCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const currentStory: SuccessStory = filteredStories[currentIndex] || filteredStories[0];

  // Auto-play interval
  useEffect(() => {
    if (isPlaying && filteredStories.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
      }, 6500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, filteredStories.length, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const handleSelectStory = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Variants for slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-amber-500/10 dark:from-blue-500/15 dark:via-indigo-500/15 dark:to-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Proven Business Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {/* Carousel Playback & Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Auto-play toggle button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Carousel Auto-play" : "Start Carousel Auto-play"}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Slide Count Indicator */}
            <div className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <span className="text-blue-600 dark:text-blue-400 font-black">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span>{String(filteredStories.length).padStart(2, '0')}</span>
            </div>

            {/* Next / Prev Navigation */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={handlePrev}
                disabled={filteredStories.length <= 1}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Success Story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={filteredStories.length <= 1}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Success Story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters Pill Bar */}
        {showCategoryFilters && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md shadow-slate-900/10'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat === 'All' && <Layers className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Carousel Primary Showcase Slide */}
        <div
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentStory && (
              <motion.div
                key={currentStory.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Left Side: Client & Project Info with Hero Banner */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/50">
                          {currentStory.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
                          {currentStory.year}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span>{currentStory.clientLocation}</span>
                      </div>
                    </div>

                    {/* Client Name & Industry */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{currentStory.clientName}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-slate-500 dark:text-slate-400">{currentStory.clientIndustry}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {currentStory.projectTitle}
                      </h3>
                    </div>

                    {/* Project Image Banner */}
                    <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 group border border-slate-200/60 dark:border-slate-800">
                      <img
                        src={currentStory.image}
                        alt={currentStory.projectTitle}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                        <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-md">
                          {currentStory.summary}
                        </p>
                      </div>
                    </div>

                    {/* Challenge & Solution Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 flex items-center gap-1">
                          <Target className="w-3 h-3" /> The Challenge
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {currentStory.challenge}
                        </p>
                      </div>

                      <div className="bg-blue-50/50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/50 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> MUCO Labs Solution
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {currentStory.solution}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Technologies Deployed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentStory.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('contact', `Inquiry regarding similar project as ${currentStory.projectTitle}`)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
                    >
                      <span>Request Similar Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onNavigate('portfolio')}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>View Full Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Key Outcomes & Executive Testimonial */}
                <div className="lg:col-span-5 bg-slate-50/70 dark:bg-slate-950/70 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    {/* Key Outcomes Header */}
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-base font-extrabold uppercase tracking-wider">
                        Key Outcomes Achieved
                      </h4>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-1 gap-3.5">
                      {currentStory.keyOutcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-emerald-500/50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-black text-lg group-hover:scale-110 transition-transform">
                            <Award className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                              {outcome.metric}
                            </div>
                            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              {outcome.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Executive Testimonial Box */}
                    {currentStory.testimonial && (
                      <div className="relative bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                        <Quote className="w-7 h-7 text-blue-500/30 absolute top-4 right-4 pointer-events-none" />

                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10 font-normal">
                          "{currentStory.testimonial.quote}"
                        </p>

                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          {currentStory.testimonial.avatar && (
                            <img
                              src={currentStory.testimonial.avatar}
                              alt={currentStory.testimonial.author}
                              loading="lazy"
                              decoding="async"
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <div>
                            <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                              {currentStory.testimonial.author}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {currentStory.testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Micro Indicator Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                      <span>Story Navigation</span>
                      <span>{currentIndex + 1} of {filteredStories.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / filteredStories.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Thumbnail Selector Row for Instant Jumping */}
        {filteredStories.length > 1 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredStories.map((story, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(idx)}
                  className={`text-left p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-24 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/50 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400/50'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {story.clientName.slice(0, 18)}...
                  </span>
                  <span className={`text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                    {story.projectTitle}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
