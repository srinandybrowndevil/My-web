import React, { useState } from 'react';
import { FOUNDER_INFO, GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { PageId } from '../types';
import { Image as ImageIcon, MapPin, Calendar, Tag, Search, Filter, X, Maximize2, ExternalLink, ShieldCheck, Phone, Mail, Building, ArrowRight, UserCheck } from 'lucide-react';

interface GalleryProps {
  onNavigate?: (page: PageId) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Office & HQ',
    'Engineering Lab',
    'Team & Culture',
    'Client Milestones',
    'Tech Workshops'
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs">
          <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>MUCO Labs Photo Gallery & Moments</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Life & Engineering at MUCO Labs
        </h1>

        <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">
          A visual glimpse into our software development headquarters, engineering labs, team culture, and client success milestones in Erode, Tamil Nadu.
        </p>
      </section>

      {/* Founder & CEO Spotlight Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Founder Image Column */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-2xl bg-slate-950 max-w-xs">
                  <img
                    src={FOUNDER_INFO.image}
                    alt={FOUNDER_INFO.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-80 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/80">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Founder & CEO
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Bio Column */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Leadership Spotlight
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {FOUNDER_INFO.name}
                </h2>
                <p className="text-xs font-bold text-slate-400">
                  {FOUNDER_INFO.role} • {FOUNDER_INFO.company} (Erode, TN)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                "{FOUNDER_INFO.bio}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Direct Phone</span>
                    <span className="font-bold text-white text-[11px]">{FOUNDER_INFO.phone}</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Official Email</span>
                    <span className="font-bold text-white text-[11px] truncate block">{FOUNDER_INFO.email}</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Location</span>
                    <span className="font-bold text-white text-[11px]">{FOUNDER_INFO.location}</span>
                  </div>
                </div>
              </div>

              {onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
                  >
                    <span>Contact Founder Directly</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Filter & Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery photos..."
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:border-blue-500/50"
            >
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Expand overlay button */}
                <div className="absolute top-3 right-3 bg-slate-950/70 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600/90 text-white px-2.5 py-0.5 rounded-full border border-blue-400/40">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-slate-900/40 rounded-3xl border border-slate-800">
            <ImageIcon className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No matching gallery photos</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your category selection or search keyword.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
          >
            <div className="relative h-72 sm:h-96 bg-slate-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-full border border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                    {activeItem.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                    {activeItem.title}
                  </h2>
                </div>

                <div className="text-xs text-slate-400 space-y-1 text-right">
                  <p className="flex items-center gap-1 justify-end font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> {activeItem.location}
                  </p>
                  <p className="flex items-center gap-1 justify-end font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {activeItem.date}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {activeItem.tags.map((t) => (
                  <span key={t} className="text-[11px] bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">MUCO Labs Official Gallery</span>
                {onNavigate && (
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onNavigate('contact');
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black px-4 py-2 rounded-xl transition-all"
                  >
                    Inquire About This Service
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
