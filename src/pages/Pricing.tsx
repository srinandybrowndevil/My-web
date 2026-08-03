import React, { useState } from 'react';
import { PageId, PricingItem } from '../types';
import {
  DEVELOPMENT_PRICING,
  AI_SERVICES_PRICING,
  DIGITAL_MARKETING_PRICING,
  CREATIVE_SERVICES_PRICING,
  BUSINESS_SERVICES_PRICING
} from '../data/pricingData';
import { PricingCard } from '../components/PricingCard';
import { Search, Tag, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

interface PricingProps {
  onNavigateToContactWithItem: (itemTitle: string) => void;
  onNavigateToMaintenance: () => void;
}

type TabType = 'all' | 'development' | 'ai' | 'marketing' | 'creative' | 'business';

export const Pricing: React.FC<PricingProps> = ({
  onNavigateToContactWithItem,
  onNavigateToMaintenance
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterItems = (items: PricingItem[]) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.features.some((f) => f.toLowerCase().includes(query))
    );
  };

  const devFiltered = filterItems(DEVELOPMENT_PRICING);
  const aiFiltered = filterItems(AI_SERVICES_PRICING);
  const mktFiltered = filterItems(DIGITAL_MARKETING_PRICING);
  const creativeFiltered = filterItems(CREATIVE_SERVICES_PRICING);
  const bizFiltered = filterItems(BUSINESS_SERVICES_PRICING);

  const tabs: { id: TabType; label: string; count: number }[] = [
    {
      id: 'all',
      label: 'All Services',
      count:
        DEVELOPMENT_PRICING.length +
        AI_SERVICES_PRICING.length +
        DIGITAL_MARKETING_PRICING.length +
        CREATIVE_SERVICES_PRICING.length +
        BUSINESS_SERVICES_PRICING.length
    },
    { id: 'development', label: 'Development', count: DEVELOPMENT_PRICING.length },
    { id: 'ai', label: 'AI Services', count: AI_SERVICES_PRICING.length },
    { id: 'marketing', label: 'Digital Marketing', count: DIGITAL_MARKETING_PRICING.length },
    { id: 'creative', label: 'Creative Services', count: CREATIVE_SERVICES_PRICING.length },
    { id: 'business', label: 'Business Services', count: BUSINESS_SERVICES_PRICING.length }
  ];

  const handleSelectItem = (item: PricingItem) => {
    onNavigateToContactWithItem(`Inquiry regarding: ${item.title} (${item.price}${item.period || ''})`);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs mb-4">
          <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Complete Transparent Pricing • GST Extra</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          MUCO Labs Service Rates
        </h1>
        <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 mt-3 leading-relaxed font-medium">
          Every development package, AI chatbot, digital marketing retainer, creative design, and IT consulting service with exact upfront pricing.
        </p>

        {/* Maintenance Shortcut Banner */}
        <div className="mt-6 inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 p-2.5 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-slate-900 dark:text-slate-200 font-bold">
            Looking for ongoing website or app SLA maintenance plans?
          </span>
          <button
            onClick={onNavigateToMaintenance}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Maintenance Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or pricing..."
              className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </section>

      {/* Pricing Cards Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Development Services */}
        {(activeTab === 'all' || activeTab === 'development') && devFiltered.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                Engineering & Coding
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Development Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Websites, Mobile Apps, Custom Software, and SaaS Platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devFiltered.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          </section>
        )}

        {/* AI Services */}
        {(activeTab === 'all' || activeTab === 'ai') && aiFiltered.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                Artificial Intelligence & LLMs
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                AI Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                AI Chatbots, Workflow Automations, and Enterprise Knowledge Engines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFiltered.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          </section>
        )}

        {/* Digital Marketing */}
        {(activeTab === 'all' || activeTab === 'marketing') && mktFiltered.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                Growth & Performance Retainers
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Digital Marketing Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Social Media Marketing, SEO, Google Ads & Meta Ads Setup and Management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mktFiltered.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          </section>
        )}

        {/* Creative Services */}
        {(activeTab === 'all' || activeTab === 'creative') && creativeFiltered.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                Design & Copywriting
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Creative Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Content Creation, Copywriting, Logo Design, Brand Identity & Graphic Assets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creativeFiltered.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          </section>
        )}

        {/* Business Services */}
        {(activeTab === 'all' || activeTab === 'business') && bizFiltered.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                Advisory & Infrastructure
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Business Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Media Production, WhatsApp API Solutions, Lead Gen, Cloud & IT Consulting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bizFiltered.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
