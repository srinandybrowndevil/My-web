import React from 'react';
import { PricingItem, MaintenanceTier } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { Check, ArrowRight, Star } from 'lucide-react';

interface PricingCardProps {
  item: PricingItem | MaintenanceTier;
  onSelect: (item: PricingItem | MaintenanceTier) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ item, onSelect }) => {
  const isPopular = item.popular;

  return (
    <div
      className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between bento-card ${
        isPopular
          ? 'bg-gradient-to-b from-blue-900/10 via-white to-blue-50/30 dark:from-blue-950/60 dark:via-slate-900/80 dark:to-slate-900/80 border-2 border-blue-500 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/10 ring-1 ring-blue-400/30 glass-light dark:glass'
          : 'bg-white/80 dark:bg-slate-900/60 glass-light dark:glass border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl hover:border-blue-500/40'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
          <Star className="w-3 h-3 fill-current text-amber-300" />
          Most Popular Choice
        </div>
      )}

      <div>
        {/* Card Header with Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isPopular
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50'
              }`}
            >
              <DynamicIcon name={item.iconName || 'Sparkles'} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {item.category}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-900 dark:text-slate-200 mb-5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        )}

        {/* Price Display */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-baseline justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              {item.price}
            </span>
            {item.period && (
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 ml-1">
                {item.period}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
            GST Extra
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6">
          <p className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-400 tracking-wider">
            What's Included:
          </p>
          <ul className="space-y-2">
            {item.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-950 dark:text-slate-100 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="leading-tight">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onSelect(item)}
        className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
          isPopular
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-md'
        }`}
      >
        <span>Get Started / Inquire</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
