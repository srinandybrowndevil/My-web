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
          ? 'bg-slate-900/90 border-2 border-blue-500 shadow-xl shadow-blue-500/20 ring-1 ring-blue-400/30 glass'
          : 'bg-slate-900/80 glass border border-slate-800 hover:border-blue-500/50 shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
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
                  : 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
              }`}
            >
              <DynamicIcon name={item.iconName || 'Sparkles'} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                {item.category}
              </span>
              <h3 className="text-lg font-black text-white leading-snug">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-300 mb-5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        )}

        {/* Price Display */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-baseline justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {item.price}
            </span>
            {item.period && (
              <span className="text-xs font-bold text-slate-400 ml-1">
                {item.period}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
            GST Extra
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6">
          <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
            What's Included:
          </p>
          <ul className="space-y-2">
            {item.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
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
        className={`w-full py-3 px-4 rounded-2xl text-xs font-black transition-all duration-200 flex items-center justify-center gap-2 ${
          isPopular
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25'
            : 'bg-white hover:bg-slate-200 text-slate-950 font-black shadow-md'
        }`}
      >
        <span>Get Started / Inquire</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
