import React, { useState } from 'react';
import { PageId } from '../types';
import { FAQ_DATA } from '../data/faqData';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare, Phone } from 'lucide-react';

interface FAQProps {
  onNavigate: (page: PageId) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Company' },
    { id: 'development', label: 'Web & Mobile Dev' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'marketing', label: 'Digital Marketing' },
    { id: 'maintenance', label: 'Maintenance & SLA' }
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs mb-3">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Got Questions? We Have Answers.
        </h1>
        <p className="text-sm text-slate-900 dark:text-slate-200 mt-2 font-medium">
          Learn about our development timeline, payment milestones, code ownership, and AI services.
        </p>
      </section>

      {/* Search & Category Filter */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any question (e.g., payment, source code, timeline)..."
            className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm rounded-2xl pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section className="max-w-4xl mx-auto px-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No matching questions found.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords or contact founder Srinivash Mahalingam directly.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleOpen(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-black text-slate-950 dark:text-white text-xs sm:text-sm focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-950 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-3">
          <h3 className="text-xl font-bold">Have a question not listed here?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Contact MUCO Labs directly. We respond to all inquiries within 24 hours.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md"
            >
              Ask a Question
            </button>
            <a
              href="tel:+916381809844"
              className="flex items-center gap-1.5 bg-slate-800 text-slate-200 font-bold text-xs py-2.5 px-5 rounded-xl border border-slate-700 hover:bg-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              Call +91 6381809844
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
