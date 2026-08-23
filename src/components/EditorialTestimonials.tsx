import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Image } from './Image';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  verifiedOutcome: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'MUCO completely re-engineered our web architecture and deployed an autonomous WhatsApp qualification bot. Our lead turnaround dropped from 4 hours to under 30 seconds, and conversions climbed 42% in month one.',
    author: 'K. Senthil Nathan',
    role: 'Managing Director',
    company: 'TexStyle Dynamics Export',
    location: 'Erode, Tamil Nadu',
    verifiedOutcome: '42% Conversion Growth // Sub-Minute Response',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    quote: 'Unlike ordinary digital agencies that push stock templates, MUCO delivered a bespoke Next.js e-commerce portal and an enterprise Google Sheets sync hub. It operates with zero downtime and sub-second page loads.',
    author: 'Priya Ramasamy',
    role: 'Chief Technology Officer',
    company: 'Kongu Medical & Health Tech',
    location: 'Coimbatore, India',
    verifiedOutcome: '100% SLA Uptime // <350ms Page Loads',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    quote: 'The Way2Me training curriculum and enterprise ERP developed by Srinivash and the MUCO team modernized our entire manufacturing facility. We replaced 15 fragmented paper ledgers with one live dashboard.',
    author: 'V. Sundaram',
    role: 'Founder & CEO',
    company: 'Apex Precision Engineering',
    location: 'Salem & Erode',
    verifiedOutcome: '15 Paper Ledgers Replaced // Real-Time ERP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const EditorialTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-14 rounded-3xl bg-slate-950/95 dark:bg-[#070b16] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase">
                VERIFIED CLIENT OUTCOMES // 0{currentIndex + 1} OF 0{TESTIMONIALS_DATA.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Rating stars & verified outcome tag */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{current.verifiedOutcome}</span>
                </div>
              </div>

              {/* Large Quote */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed font-sans">
                "{current.quote}"
              </blockquote>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <Image
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40"
                />
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{current.author}</h4>
                  <p className="text-xs text-slate-400">
                    {current.role} • <strong className="text-cyan-300">{current.company}</strong> ({current.location})
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Progress Indicators */}
          <div className="flex items-center gap-2 pt-2">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
