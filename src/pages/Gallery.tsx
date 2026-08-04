import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS, GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { PageId } from '../types';
import { 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Tag, 
  Search, 
  X, 
  Maximize2, 
  ArrowRight, 
  Award,
  Crown,
  CheckCircle2,
  Users
} from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-300 font-bold text-xs shadow-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span>MUCO Labs Executive Roster & Gallery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Executive Leadership & <span className="gold-text-gradient">Team Roster</span>
        </h1>

        <p className="text-sm text-slate-300 font-medium max-w-2xl mx-auto">
          Meet the executive board, advisors, and senior department leads steering MUCO Labs, followed by a photo showcase of our headquarters, labs, and client milestones.
        </p>
      </section>

      {/* Ordered Team Leadership Directory (Order Wise: Founder, 1st, 2nd, 3rd, 4th, 5th) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Company Structure & Hierarchy
            </span>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Order-Wise Leadership & Team Directory</span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-amber-500/20 text-xs font-bold text-slate-300">
            <Users className="w-4 h-4 text-amber-400" />
            <span>6 Key Leadership Pillars</span>
          </div>
        </div>

        {/* 6-Card Ordered Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className={`bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 border shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 ${
                member.isFounder
                  ? 'border-amber-500/40 shadow-amber-500/10'
                  : 'border-slate-800 hover:border-amber-500/30'
              }`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Header Badge with Order Number */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    member.isFounder
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                      : 'bg-slate-900 text-amber-400 border-amber-500/30'
                  }`}>
                    {member.isFounder ? <Crown className="w-3 h-3 text-slate-950" /> : <Award className="w-3 h-3 text-amber-400" />}
                    <span>Rank: {member.orderNumber}</span>
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-md border border-slate-800">
                    MUCO Labs
                  </span>
                </div>

                {/* Profile Avatar & Name Info */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300" />
                    <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl bg-slate-950 w-24 h-32 sm:w-28 sm:h-36">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-black text-amber-400 leading-tight">
                      {member.titleRole}
                    </p>
                    <p className="text-[11px] font-bold text-slate-400 pt-0.5">
                      {member.affiliation}
                    </p>
                  </div>
                </div>

                {/* Bio paragraph */}
                <p className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  "{member.bio}"
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Core Mandate:
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {member.keyResponsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Contact Button */}
              {onNavigate && (
                <div className="pt-5 relative z-10">
                  <button
                    onClick={() => onNavigate('contact', `Inquiry regarding ${member.name} (${member.titleRole})`)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-2 group-hover:border-amber-400"
                  >
                    <span>Connect with {member.name.split(' ')[1] || member.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Gallery Photo Showcase Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="border-t border-slate-800/80 pt-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Visual Archives
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              HQ Labs, Tech Workshops & Client Milestones
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 shadow-xl backdrop-blur-md">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
                className="w-full bg-slate-950 text-white font-medium text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Expand overlay button */}
                <div className="absolute top-3 right-3 bg-slate-950/70 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
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
                <X className="w-5 h-5 text-amber-400" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
                    {activeItem.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                    {activeItem.title}
                  </h2>
                </div>

                <div className="text-xs text-slate-400 space-y-1 text-right">
                  <p className="flex items-center gap-1 justify-end font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {activeItem.location}
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
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition-all"
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
