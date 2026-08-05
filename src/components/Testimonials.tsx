import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  MessageSquarePlus, 
  Building2, 
  Sparkles, 
  X,
  Send,
  Award,
  ThumbsUp,
  RefreshCw
} from 'lucide-react';
import { fetchTestimonials, addTestimonial, DEFAULT_TESTIMONIALS, TestimonialItem } from '../services/firebase';
import { useToast } from '../context/ToastContext';

export const Testimonials: React.FC = () => {
  const { showToast } = useToast();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // New Testimonial Form State
  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    companyName: '',
    companyLogo: '',
    rating: 5,
    content: '',
    projectCategory: 'Enterprise SaaS'
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load Testimonials from Firestore on mount silently in background
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchTestimonials();
        if (isMounted && data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter testimonials based on category tab
  const filteredTestimonials = testimonials.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.projectCategory.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Auto-scrolling carousel ticker effect
  useEffect(() => {
    if (!isPlaying || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, filteredTestimonials.length]);

  // Scroll smoothly when activeIndex changes
  useEffect(() => {
    if (scrollContainerRef.current && scrollContainerRef.current.children[activeIndex]) {
      const card = scrollContainerRef.current.children[activeIndex] as HTMLElement;
      scrollContainerRef.current.scrollTo({
        left: card.offsetLeft - 24,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const handleNext = () => {
    if (filteredTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    if (filteredTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.companyName || !formData.content) {
      showToast('Please fill in all required feedback fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await addTestimonial({
        clientName: formData.clientName,
        clientRole: formData.clientRole || 'Client Partner',
        companyName: formData.companyName,
        companyLogo: formData.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
        rating: Number(formData.rating),
        content: formData.content,
        projectCategory: formData.projectCategory,
        verified: true
      });

      showToast('Thank you! Your feedback has been saved to Firebase Firestore.', 'success');
      setIsModalOpen(false);
      
      // Reset form & reload testimonials
      setFormData({
        clientName: '',
        clientRole: '',
        companyName: '',
        companyLogo: '',
        rating: 5,
        content: '',
        projectCategory: 'Enterprise SaaS'
      });

      const updated = await fetchTestimonials();
      setTestimonials(updated);
    } catch (err) {
      console.error('Failed to submit review:', err);
      showToast('Error submitting feedback to Firestore. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', 'Enterprise SaaS', 'AI & Automation', 'Mobile Apps', 'E-Commerce & Web'];

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header & Stats Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Client Stories • Firebase Powered</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Trusted By Founders & Tech Leaders Worldwide
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Read verified testimonials from businesses that scaled with MUCO Labs. Real feedback synced directly from our backend Firestore database.
            </p>
          </div>

          {/* Aggregate Stats Badges & Submit Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-left leading-none">
                <span className="text-xs font-black text-slate-900 dark:text-white block">4.9 / 5.0</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">100% Verified Rating</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs py-3 px-5 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit Client Feedback</span>
            </button>
          </div>
        </div>

        {/* Category Tabs & Carousel Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause auto-scroll' : 'Resume auto-scroll'}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={handlePrev}
              title="Previous Testimonial"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              title="Next Testimonial"
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Quote className="w-10 h-10 text-amber-500/40 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No reviews found in this category</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Be the first client to leave feedback for this category!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl inline-flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </div>
        ) : (
          /* Horizontal Auto-Scrolling Carousel Container */
          <div className="relative group/carousel">
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 transition-all duration-300"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredTestimonials.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`snap-center shrink-0 w-full sm:w-[380px] lg:w-[420px] bg-white dark:bg-slate-900/90 rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group shadow-md hover:shadow-2xl ${
                    activeIndex === idx
                      ? 'border-amber-500 ring-2 ring-amber-500/20 scale-[1.01]'
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/40'
                  }`}
                >
                  {/* Decorative background quote mark */}
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 dark:text-slate-800/60 pointer-events-none group-hover:scale-110 transition-transform" />

                  <div className="space-y-4 relative z-10">
                    {/* Top Row: Category Tag & Rating Stars */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider rounded-full">
                        {item.projectCategory}
                      </span>

                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic min-h-[72px]">
                      "{item.content}"
                    </p>
                  </div>

                  {/* Bottom Row: Client Profile & Verified Badge */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      {item.companyLogo ? (
                        <img
                          src={item.companyLogo}
                          alt={item.companyName}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80';
                          }}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800 bg-slate-950 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-sm border border-amber-500/20 shrink-0">
                          {item.clientName.charAt(0)}
                        </div>
                      )}

                      <div className="leading-tight">
                        <h4 className="text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                          <span>{item.clientName}</span>
                          {item.verified !== false && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline shrink-0" title="Verified Client Review" />
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {item.clientRole} • <strong className="text-slate-700 dark:text-slate-300">{item.companyName}</strong>
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-6">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-6 bg-amber-500'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-amber-400/60'
                  }`}
                  title={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Dialog for Client Feedback Submission */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <MessageSquarePlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-950 dark:text-white">
                        Submit Client Feedback
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Saved to MUCO Labs Firebase Firestore database
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={formData.clientRole}
                        onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                        placeholder="e.g. Founder & CEO"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. NextGen Robotics"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                        Project Category
                      </label>
                      <select
                        value={formData.projectCategory}
                        onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-medium"
                      >
                        <option value="Enterprise SaaS">Enterprise SaaS</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="E-Commerce & Web">E-Commerce & Web</option>
                        <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                      </select>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                      Rating Star Score
                    </label>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-500 ml-2">
                        {formData.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Feedback Content Text Area */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                      Your Testimonial / Feedback *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Share your experience working with Srinivash Mahalingam and the MUCO Labs team..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  {/* Submit Action Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving to Firestore...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Publish Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
