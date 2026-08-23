import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId, LocationId, LocationData, ServiceLocationCombo } from '../types';
import { LOCATIONS_DATA, ALL_LOCATIONS } from '../data/locationsData';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { updatePageSEO, updateLocationSEO, updateServiceLocationSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';
import { openWhatsApp } from '../utils/whatsapp';
import {
  MapPin,
  Building2,
  Cpu,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Phone,
  MessageSquare,
  Search,
  Layers,
  TrendingUp,
  Clock,
  Tag,
  ShieldCheck,
  ChevronDown,
  Navigation,
  ExternalLink,
  SlidersHorizontal,
  Compass,
  Briefcase
} from 'lucide-react';

interface LocationsProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const Locations: React.FC<LocationsProps> = ({ onNavigate }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId | 'all'>('all');
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  // Parse location and combo params from URL hash on mount & hashchange
  useEffect(() => {
    const parseUrlState = () => {
      const hash = window.location.hash;
      const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
      
      const cityParam = urlParams.get('city') || urlParams.get('loc');
      const comboParam = urlParams.get('combo');

      if (comboParam) {
        const matchingCombo = SERVICE_LOCATIONS_DATA.find((c) => c.id === comboParam);
        if (matchingCombo) {
          setSelectedComboId(comboParam);
          setSelectedLocationId(matchingCombo.locationId);
          updateServiceLocationSEO(matchingCombo);
          return;
        }
      }

      if (cityParam && LOCATIONS_DATA[cityParam as LocationId]) {
        setSelectedLocationId(cityParam as LocationId);
        setSelectedComboId(null);
        updateLocationSEO(LOCATIONS_DATA[cityParam as LocationId]);
      } else {
        setSelectedLocationId('all');
        setSelectedComboId(null);
        updatePageSEO('locations');
      }
    };

    parseUrlState();
    window.addEventListener('hashchange', parseUrlState);
    return () => window.removeEventListener('hashchange', parseUrlState);
  }, []);

  // Update SEO when state changes
  useEffect(() => {
    if (selectedComboId) {
      const combo = SERVICE_LOCATIONS_DATA.find((c) => c.id === selectedComboId);
      if (combo) {
        updateServiceLocationSEO(combo);
      }
    } else if (selectedLocationId !== 'all') {
      const loc = LOCATIONS_DATA[selectedLocationId];
      if (loc) {
        updateLocationSEO(loc);
      }
    } else {
      updatePageSEO('locations');
    }
    setOpenFaqIndex(null);
  }, [selectedLocationId, selectedComboId]);

  const activeLocation = selectedLocationId !== 'all' ? LOCATIONS_DATA[selectedLocationId] : null;
  const activeCombo = selectedComboId ? SERVICE_LOCATIONS_DATA.find((c) => c.id === selectedComboId) : null;

  // Filtered Combos for Quick Matrix
  const filteredCombos = useMemo(() => {
    return SERVICE_LOCATIONS_DATA.filter((combo) => {
      const matchesSearch =
        combo.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.targetIndustries.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLocation = selectedLocationId === 'all' || combo.locationId === selectedLocationId;
      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, selectedLocationId]);

  const handleSelectCity = (locId: LocationId | 'all') => {
    setSelectedLocationId(locId);
    setSelectedComboId(null);
    if (locId === 'all') {
      window.history.pushState(null, '', '#locations');
    } else {
      window.history.pushState(null, '', `#locations?city=${locId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCombo = (comboId: string) => {
    const combo = SERVICE_LOCATIONS_DATA.find((c) => c.id === comboId);
    if (combo) {
      setSelectedComboId(comboId);
      setSelectedLocationId(combo.locationId);
      window.history.pushState(null, '', `#locations?combo=${comboId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation Hierarchy: /services/[service]/[location] */}
      <Breadcrumbs
        currentPage="locations"
        onNavigate={onNavigate}
        locationName={activeLocation?.name}
        locationId={activeLocation?.id}
        serviceName={activeCombo?.serviceName}
        serviceId={activeCombo?.serviceId}
        comboId={activeCombo?.id}
      />

      {/* VIEW MODE 1: ACTIVE SERVICE x LOCATION DEDICATED LANDING VIEW */}
      {activeCombo ? (
        <section className="space-y-10">
          {/* Header Banner */}
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-cyan-500/30 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeCombo.locationName}, Tamil Nadu • Local Service Hub</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {activeCombo.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {activeCombo.localizedSummary}
              </p>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                  <Tag className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block font-medium">Starting At</span>
                  <span className="text-sm font-bold text-white">{activeCombo.startingPrice}</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                  <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block font-medium">Turnaround</span>
                  <span className="text-sm font-bold text-white">{activeCombo.timeline}</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block font-medium">Code Guarantee</span>
                  <span className="text-sm font-bold text-white">100% Ownership</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
                  <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block font-medium">Architecture</span>
                  <span className="text-sm font-bold text-white">Next.js & Cloud</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() =>
                    onNavigate(
                      'contact',
                      `Hi MUCO Labs, I would like to inquire about ${activeCombo.serviceName} in ${activeCombo.locationName}.`
                    )
                  }
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Request Free Technical Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    openWhatsApp({
                      serviceName: `${activeCombo.serviceName} in ${activeCombo.locationName}`,
                      pageName: 'locations'
                    })
                  }
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Engineering Lead</span>
                </button>
                <button
                  onClick={() => handleSelectCity(activeCombo.locationId)}
                  className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700 transition-all"
                >
                  ← Back to {activeCombo.locationName} Hub
                </button>
              </div>
            </div>
          </div>

          {/* Local Business Context & Specific Problem Solving */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{activeCombo.locationName} Market & Business Context</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {activeCombo.localBusinessContext}
                </p>

                <div className="pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Targeted Regional Industries & Sectors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeCombo.targetIndustries.map((ind, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-medium"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Key Deliverables & Specifications</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeCombo.keyDeliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar: Real-World Local Case Scenario */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-blue-900/10 via-slate-900/50 to-cyan-900/10 dark:from-slate-900 dark:to-[#091224] border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider mb-4">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Verified Regional Case Scenario</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {activeCombo.localCaseScenario.title}
                </h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                  {activeCombo.localCaseScenario.clientSector}
                </p>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">The Challenge:</span>
                    <p className="text-slate-600 dark:text-slate-300 bg-rose-50/50 dark:bg-rose-950/20 p-3 rounded-xl border border-rose-200/50 dark:border-rose-900/30">
                      {activeCombo.localCaseScenario.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">MUCO Solution:</span>
                    <p className="text-slate-600 dark:text-slate-300 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-200/50 dark:border-blue-900/30">
                      {activeCombo.localCaseScenario.solutionDelivered}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Business Impact:</span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                      {activeCombo.localCaseScenario.impact}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Technology Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCombo.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Localized FAQ Accordion */}
          {activeCombo.faqs && activeCombo.faqs.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Frequently Asked Questions about {activeCombo.serviceName} in {activeCombo.locationName}</span>
              </h2>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeCombo.faqs.map((faq, idx) => (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 group"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Combos in This Location or Other Hubs */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Explore More Services in {activeCombo.locationName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_LOCATIONS_DATA.filter(
                (c) => c.locationId === activeCombo.locationId && c.id !== activeCombo.id
              ).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCombo(c.id)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-left transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">
                      {c.locationName} Hub
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {c.serviceName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {c.localizedSummary}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>{c.startingPrice}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : activeLocation ? (
        /* VIEW MODE 2: ACTIVE CITY DEDICATED HUB */
        <section className="space-y-10">
          {/* City Hero */}
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-cyan-500/30 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeLocation.district}, {activeLocation.state} • Pincode: {activeLocation.pincode}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {activeLocation.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {activeLocation.overview}
              </p>

              {/* Key Commercial Hubs Strip */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300/80 block mb-2">
                  Key Commercial & Industrial Belts in {activeLocation.name}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.keyCommercialHubs.map((hub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 text-xs font-medium"
                    >
                      📍 {hub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() =>
                    onNavigate(
                      'contact',
                      `Hi MUCO Labs, we are an enterprise in ${activeLocation.name} looking for digital and software solutions.`
                    )
                  }
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  <span>Book In-Person Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    openWhatsApp({
                      serviceName: `Software & Digital Solutions in ${activeLocation.name}`,
                      pageName: 'locations'
                    })
                  }
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp MUCO Team</span>
                </button>
                <button
                  onClick={() => handleSelectCity('all')}
                  className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700 transition-all"
                >
                  ← View All Regional Hubs
                </button>
              </div>
            </div>
          </div>

          {/* Major Industries in this Location */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>Major Industries & Business Ecosystem in {activeLocation.name}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeLocation.majorIndustries.map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{ind.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ind.description}
                  </p>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      High-Demand Software & Digital Solutions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.solutionsNeeded.map((sol, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 text-[11px] font-medium"
                        >
                          ✓ {sol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tailored Services Available in this Location */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                <span>Featured Digital Services for {activeLocation.name}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeLocation.recommendedServices.map((svc, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {activeLocation.name} Service Pack
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{svc.serviceName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{svc.pricingEstimate}</span>
                    <button
                      onClick={() =>
                        onNavigate(
                          'contact',
                          `Hi MUCO Labs, I would like to get started with ${svc.serviceName} in ${activeLocation.name}.`
                        )
                      }
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Challenges We Address */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
              <span>Overcoming Local Operational & Search Challenges in {activeLocation.name}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeLocation.localChallenges.map((challenge, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Localized FAQ Accordion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Questions & Answers for {activeLocation.name} Businesses</span>
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {activeLocation.faqs.map((faq, idx) => (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Connected Towns */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Nearby Connected Hubs around {activeLocation.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activeLocation.nearbyAreas.map((near, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCity(near.id)}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-all group"
                >
                  <span className="text-[10px] text-slate-400 block font-medium">Distance: {near.distance}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    {near.name}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* VIEW MODE 3: ALL LOCATIONS & REGIONAL HUBS DIRECTORY */
        <section className="space-y-12">
          {/* Header Banner */}
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-cyan-500/30 shadow-2xl overflow-hidden text-center max-w-5xl mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Erode District & Western Tamil Nadu Local SEO Network</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Software Engineering, Web Development & AI Hubs
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
                MUCO Labs delivers dedicated, localized technology solutions across Erode and surrounding commercial towns. Select your location to explore tailored industry solutions, case studies, and local pricing.
              </p>

              {/* Search Bar */}
              <div className="pt-4 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city (e.g. Erode, Perundurai) or service (e.g. Website, SEO)..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-white placeholder-slate-400 text-sm outline-none backdrop-blur-md transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Regional Hub Cards Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Regional Technology Hubs ({ALL_LOCATIONS.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprehensive local landing pages with verified local economic contexts.
                </p>
              </div>

              {/* City Pill Selectors */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSelectCity('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLocationId === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  All Hubs
                </button>
                {ALL_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectCity(loc.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white text-xs font-medium transition-all"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{loc.district}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {loc.name}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500">
                        {loc.pincode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {loc.tagline}
                    </p>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Key Industries
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {loc.majorIndustries.slice(0, 2).map((ind, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
                          >
                            {ind.name.split('&')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleSelectCity(loc.id)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore {loc.name} Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        openWhatsApp({
                          serviceName: `Tech Consultation for ${loc.name}`,
                          pageName: 'locations'
                        })
                      }
                      className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-medium transition-colors"
                      title="Quick WhatsApp Chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Intent Service x Location Quick Matching Matrix */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span>Service × Location Landing Pages Matrix</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dedicated local search landing pages optimized for commercial intent queries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCombos.map((combo) => (
                <div
                  key={combo.id}
                  onClick={() => handleSelectCombo(combo.id)}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-cyan-500 dark:hover:border-cyan-400 cursor-pointer transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                        📍 {combo.locationName}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {combo.startingPrice}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {combo.serviceName}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {combo.localizedSummary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>{combo.timeline}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Service Page →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
