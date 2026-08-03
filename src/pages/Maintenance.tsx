import React, { useState } from 'react';
import { PageId, MaintenanceTier } from '../types';
import { MAINTENANCE_SERVICES_PRICING } from '../data/pricingData';
import { PricingCard } from '../components/PricingCard';
import { ShieldCheck, Wrench, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface MaintenanceProps {
  onNavigateToContactWithItem: (itemTitle: string) => void;
}

type MaintenanceCategory = 'all' | 'Website Maintenance' | 'Mobile App Maintenance' | 'Software & SaaS Maintenance' | 'Cloud & Server Maintenance';

export const Maintenance: React.FC<MaintenanceProps> = ({ onNavigateToContactWithItem }) => {
  const [selectedCat, setSelectedCat] = useState<MaintenanceCategory>('all');

  const categories: MaintenanceCategory[] = [
    'all',
    'Website Maintenance',
    'Mobile App Maintenance',
    'Software & SaaS Maintenance',
    'Cloud & Server Maintenance'
  ];

  const filteredItems = MAINTENANCE_SERVICES_PRICING.filter(
    (item) => selectedCat === 'all' || item.category === selectedCat
  );

  const handleSelect = (item: MaintenanceTier) => {
    onNavigateToContactWithItem(`Maintenance Plan Inquiry: ${item.title} (${item.price}/mo)`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800/80 px-4 py-1.5 rounded-full text-emerald-700 dark:text-emerald-300 font-semibold text-xs mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>SLA Guaranteed Support & Maintenance Retainers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          System & Application Maintenance
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Ensure zero downtime, continuous security patch management, automated backups, and guaranteed developer SLA availability for your digital products.
        </p>
      </section>

      {/* SLA Guarantees Highlights Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Guaranteed Response Time</p>
              <p className="text-[10px] text-slate-400">Under 2-hour emergency SLA for Enterprise tiers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">24/7 Security & Backups</p>
              <p className="text-[10px] text-slate-400">Automated cloud backups & patch management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Dedicated Engineer Hours</p>
              <p className="text-[10px] text-slate-400">Continuous refactoring, edits & improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Maintenance Plans' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Maintenance Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {['Website Maintenance', 'Mobile App Maintenance', 'Software & SaaS Maintenance', 'Cloud & Server Maintenance'].map((catName) => {
          if (selectedCat !== 'all' && selectedCat !== catName) return null;

          const itemsInCat = MAINTENANCE_SERVICES_PRICING.filter((i) => i.category === catName);

          return (
            <div key={catName} className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {catName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Monthly SLA plans for {catName.toLowerCase()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {itemsInCat.map((item) => (
                  <PricingCard key={item.id} item={item} onSelect={handleSelect} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* SLA Inquiry Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Need a Custom Maintenance SLA or Multi-App Plan?</h3>
            <p className="text-xs text-slate-400 mt-1">
              We provide tailored enterprise retainer contracts for organizations with complex infrastructure.
            </p>
          </div>
          <button
            onClick={() => onNavigateToContactWithItem('Custom Maintenance SLA Request')}
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md"
          >
            Request SLA Proposal
          </button>
        </div>
      </section>
    </div>
  );
};
