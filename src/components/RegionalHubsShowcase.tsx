import React from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../types';
import { ALL_LOCATIONS } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { MapPin, ArrowRight, Building2, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface RegionalHubsShowcaseProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const RegionalHubsShowcase: React.FC<RegionalHubsShowcaseProps> = ({ onNavigate }) => {
  const navigateToCity = (cityId: string) => {
    window.location.hash = `#locations?city=${cityId}`;
    onNavigate('locations');
  };

  const navigateToCombo = (comboId: string) => {
    window.location.hash = `#locations?combo=${comboId}`;
    onNavigate('locations');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20">
          <MapPin className="w-3.5 h-3.5" />
          <span>Erode & Kongu Region Local SEO Network</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Regional Technology Hubs & Local Expertise
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          From high-speed Next.js websites for Erode textile exporters to manufacturing ERPs in SIPCOT Perundurai, explore our dedicated local engineering hubs.
        </p>
      </div>

      {/* Grid of Regional City Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ALL_LOCATIONS.map((loc) => (
          <motion.div
            key={loc.id}
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-cyan-500 dark:hover:border-cyan-400 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  📍 {loc.district}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{loc.pincode}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {loc.name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {loc.tagline}
              </p>

              <div className="pt-1">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">Primary Sectors:</span>
                <div className="flex flex-wrap gap-1">
                  {loc.majorIndustries.slice(0, 2).map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300"
                    >
                      {ind.name.split('&')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => navigateToCity(loc.id)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>{loc.name} Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured High-Intent Service x Location Combos */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-cyan-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>High-Intent Commercial Pages</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Popular Localized Search Queries & Services
            </h3>
          </div>

          <button
            onClick={() => onNavigate('locations')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-2 self-start md:self-auto transition-all"
          >
            <span>Explore All 17+ Service Combos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SERVICE_LOCATIONS_DATA.slice(0, 6).map((combo) => (
            <div
              key={combo.id}
              onClick={() => navigateToCombo(combo.id)}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-semibold text-cyan-400">📍 {combo.locationName}</span>
                  <span className="font-mono text-[11px] text-slate-300">{combo.startingPrice}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {combo.serviceName}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                  {combo.localizedSummary}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>{combo.timeline}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Page →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
