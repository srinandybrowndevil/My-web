import React, { useState } from 'react';
import { PageId } from '../types';
import { MucoLogo } from '../components/MucoLogo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  Bell,
  CreditCard,
  MapPin,
  Lock,
  Download,
  Check,
  Cpu,
  Star,
  User,
  Search,
  ChevronRight
} from 'lucide-react';

interface AppStudioProps {
  onNavigateToContactWithItem: (itemTitle: string) => void;
  onNavigate: (page: PageId) => void;
}

export const AppStudio: React.FC<AppStudioProps> = ({
  onNavigateToContactWithItem,
  onNavigate
}) => {
  // Simulator State
  const [activeAppPreset, setActiveAppPreset] = useState<'ecommerce' | 'ai' | 'services'>('ecommerce');
  const [phoneTab, setPhoneTab] = useState<'home' | 'explore' | 'chat' | 'profile'>('home');
  const [phoneTheme, setPhoneTheme] = useState<'dark' | 'light'>('dark');

  // Configurator State
  const [appType, setAppType] = useState<'mvp' | 'business' | 'ecommerce' | 'enterprise'>('business');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['android', 'ios']);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['push', 'payment']);

  const basePrices = {
    mvp: 49999,
    business: 99999,
    ecommerce: 149999,
    enterprise: 249999
  };

  const addonPrices: Record<string, { label: string; price: number; icon: React.ReactNode }> = {
    push: { label: 'Push Notifications & Firebase FCM', price: 9999, icon: <Bell className="w-3.5 h-3.5 text-blue-500" /> },
    payment: { label: 'Payment Gateway (Razorpay/Stripe)', price: 14999, icon: <CreditCard className="w-3.5 h-3.5 text-emerald-500" /> },
    gps: { label: 'Live Location & GPS Tracking', price: 19999, icon: <MapPin className="w-3.5 h-3.5 text-amber-500" /> },
    ai: { label: 'Integrated Gemini AI Assistant', price: 24999, icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> },
    auth: { label: 'Social & Biometric Authentication', price: 7999, icon: <Lock className="w-3.5 h-3.5 text-cyan-500" /> }
  };

  const toggleAddon = (key: string) => {
    if (selectedAddons.includes(key)) {
      setSelectedAddons(selectedAddons.filter((k) => k !== key));
    } else {
      setSelectedAddons([...selectedAddons, key]);
    }
  };

  const calculateTotalCost = () => {
    let base = basePrices[appType];
    selectedAddons.forEach((k) => {
      if (addonPrices[k]) {
        base += addonPrices[k].price;
      }
    });
    return base;
  };

  const handleOrderApp = () => {
    const platformStr = selectedPlatforms.join(' + ').toUpperCase();
    const addonsStr = selectedAddons.map((k) => addonPrices[k]?.label).join(', ');
    const msg = `Mobile App Project Order (${appType.toUpperCase()} Tier - ₹${calculateTotalCost().toLocaleString('en-IN')}) | Platforms: ${platformStr} | Add-ons: ${addonsStr || 'None'}`;
    onNavigateToContactWithItem(msg);
  };

  return (
    <div className="space-y-12 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Dynamic SEO Breadcrumbs Navigation */}
      <Breadcrumbs
        currentPage="apps"
        subItem={appType ? `${appType.toUpperCase()} Mobile App Tier` : undefined}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-extrabold text-xs">
          <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>MUCO Labs Mobile App Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          iOS & Android Apps Built For Growth
        </h1>
        <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 font-medium leading-relaxed">
          Experience interactive mobile app mockups, customize your project specifications, get transparent instant quotes, and publish to the Google Play Store & Apple App Store.
        </p>
      </section>

      {/* Main Interactive Bento Section: Simulator + Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Smartphone Device Frame */}
        <div className="lg:col-span-6 bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xl bento-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 tracking-wider uppercase">
                INTERACTIVE APP SIMULATOR
              </span>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                Live Prototype Simulator
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPhoneTheme(phoneTheme === 'dark' ? 'light' : 'dark')}
                className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {phoneTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          {/* App Preset Tabs */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveAppPreset('ecommerce')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeAppPreset === 'ecommerce'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              E-Commerce App
            </button>
            <button
              onClick={() => setActiveAppPreset('ai')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeAppPreset === 'ai'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              AI Assistant App
            </button>
            <button
              onClick={() => setActiveAppPreset('services')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeAppPreset === 'services'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              Service Booking App
            </button>
          </div>

          {/* Device Frame */}
          <div className="flex justify-center py-4">
            <div className="w-[300px] h-[580px] bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col justify-between overflow-hidden">
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              </div>

              {/* Phone Content Screen */}
              <div
                className={`w-full h-full rounded-[30px] pt-8 pb-14 px-3.5 flex flex-col justify-between overflow-y-auto transition-colors duration-200 ${
                  phoneTheme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
                }`}
              >
                {/* Simulated App Header */}
                <div className="flex items-center justify-between py-2 border-b border-slate-700/30">
                  <div className="flex items-center gap-1.5">
                    <MucoLogo variant="mark" customSize={22} />
                    <span className="font-extrabold text-xs tracking-tight">
                      MUCO <span className="text-blue-500">Mobile</span>
                    </span>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    Live Demo
                  </span>
                </div>

                {/* Simulated Screen Content based on phoneTab & Preset */}
                <div className="flex-1 py-3 space-y-3 overflow-y-auto scrollbar-none">
                  {phoneTab === 'home' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white space-y-1.5 shadow-md">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-80">
                          Welcome Back
                        </span>
                        <h4 className="text-xs font-black">
                          {activeAppPreset === 'ecommerce'
                            ? 'Summer Sale 40% OFF'
                            : activeAppPreset === 'ai'
                            ? 'Gemini 2.5 Turbo Active'
                            : 'Book Services in Erode'}
                        </h4>
                        <p className="text-[10px] opacity-90 leading-tight">
                          Custom engineered by MUCO Labs with real-time sync.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Featured Modules
                        </span>

                        {activeAppPreset === 'ecommerce' ? (
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: 'SaaS Platform', price: '₹24,999', icon: '💻' },
                              { name: 'AI Chatbot', price: '₹14,999', icon: '🤖' },
                              { name: 'Mobile App', price: '₹49,999', icon: '📱' },
                              { name: 'SEO Retainer', price: '₹7,999', icon: '📈' }
                            ].map((prod, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1"
                              >
                                <div className="text-base">{prod.icon}</div>
                                <p className="text-[10px] font-bold leading-tight">{prod.name}</p>
                                <p className="text-[9px] text-blue-400 font-extrabold">{prod.price}</p>
                              </div>
                            ))}
                          </div>
                        ) : activeAppPreset === 'ai' ? (
                          <div className="space-y-2">
                            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[10px] space-y-1">
                              <p className="text-blue-400 font-bold">👤 Client:</p>
                              <p className="opacity-90">"Can you automate my customer support on WhatsApp?"</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-blue-900/40 border border-blue-500/30 text-[10px] space-y-1">
                              <p className="text-indigo-400 font-bold">🤖 MUCO AI:</p>
                              <p className="opacity-90">"Yes! We integrate Gemini AI with Twilio & Meta APIs directly."</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            {['Mobile App Dev', 'Enterprise Web Portal', 'UI/UX Design'].map((s, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 flex justify-between items-center text-[10px]"
                              >
                                <span className="font-bold">{s}</span>
                                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md font-bold text-[9px]">
                                  Book
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {phoneTab === 'explore' && (
                    <div className="space-y-2.5">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          readOnly
                          value="Search features & specs..."
                          className="w-full bg-slate-800/80 text-[10px] rounded-xl pl-8 pr-3 py-2 border border-slate-700 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2 text-[10px]">
                        <p className="font-extrabold uppercase text-slate-400 text-[9px]">Native Capabilities</p>
                        <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-1">
                          <p className="font-bold text-blue-400">⚡ Offline First Storage</p>
                          <p className="text-[9px] opacity-80">Local SQLite / WatermelonDB sync engine.</p>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-1">
                          <p className="font-bold text-emerald-400">💳 Instant Payments</p>
                          <p className="text-[9px] opacity-80">Razorpay, PhonePe, Google Pay, Stripe SDKs.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {phoneTab === 'chat' && (
                    <div className="space-y-2 text-[10px]">
                      <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40">
                        <p className="font-bold text-blue-300">Live Support Chat</p>
                        <p className="text-[9px] opacity-90 mt-0.5">
                          Engineer Srinivash Mahalingam is ready to review your app specs.
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[9px] text-slate-300">
                        Connected to MUCO Labs Express Backend Server.
                      </div>
                    </div>
                  )}

                  {phoneTab === 'profile' && (
                    <div className="space-y-3 text-center py-2">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-sm mx-auto flex items-center justify-center shadow-lg">
                        SM
                      </div>
                      <div>
                        <h5 className="text-xs font-black">Srinivash Mahalingam</h5>
                        <p className="text-[9px] text-blue-400 font-bold">Founder & Lead Architect</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-800/50 text-[9px] text-left space-y-1">
                        <p className="flex justify-between">
                          <span>Location:</span> <span className="font-bold">Erode, TN</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Phone:</span> <span className="font-bold">+91 6381809844</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated Bottom Navigation Bar inside Phone */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md rounded-2xl py-2 px-3 border border-slate-800 flex justify-around items-center z-20">
                  <button
                    onClick={() => setPhoneTab('home')}
                    className={`flex flex-col items-center text-[9px] ${
                      phoneTab === 'home' ? 'text-blue-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => setPhoneTab('explore')}
                    className={`flex flex-col items-center text-[9px] ${
                      phoneTab === 'explore' ? 'text-blue-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    <span>🔍</span>
                    <span>Explore</span>
                  </button>

                  <button
                    onClick={() => setPhoneTab('chat')}
                    className={`flex flex-col items-center text-[9px] ${
                      phoneTab === 'chat' ? 'text-blue-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    <span>💬</span>
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => setPhoneTab('profile')}
                    className={`flex flex-col items-center text-[9px] ${
                      phoneTab === 'profile' ? 'text-blue-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    <span>👤</span>
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: App Specification & Cost Configurator */}
        <div className="lg:col-span-6 bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-xl bento-card space-y-6">
          <div>
            <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 tracking-wider uppercase">
              INSTANT ESTIMATOR & BUILD CONFIGURATOR
            </span>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Configure Your Mobile App Project
            </h2>
            <p className="text-xs text-slate-900 dark:text-slate-200 font-medium mt-1">
              Select platform requirements and add-ons to generate a transparent price estimate.
            </p>
          </div>

          {/* Step 1: App Development Tier */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase text-slate-900 dark:text-slate-200 tracking-wider">
              1. Select App Development Tier:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'mvp', title: 'Starter MVP', price: '₹49,999', desc: 'Core features & clean UI' },
                { id: 'business', title: 'Business App', price: '₹99,999', desc: 'Full backend & push' },
                { id: 'ecommerce', title: 'E-Commerce App', price: '₹149,999', desc: 'Cart, Payment, Orders' },
                { id: 'enterprise', title: 'Enterprise System', price: '₹249,999+', desc: 'Scale, Security & AI' }
              ].map((tier) => {
                const isSelected = appType === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setAppType(tier.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-600 dark:border-blue-400 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-950 dark:text-white">{tier.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <p className="text-xs font-black text-blue-700 dark:text-blue-400 mt-1">{tier.price}</p>
                    <p className="text-[10px] text-slate-700 dark:text-slate-300 mt-0.5">{tier.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Target Platforms */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase text-slate-900 dark:text-slate-200 tracking-wider">
              2. Target Operating Systems:
            </label>
            <div className="flex gap-3">
              {[
                { id: 'android', label: '🤖 Android (Google Play Store)' },
                { id: 'ios', label: '🍎 iOS (Apple App Store)' }
              ].map((plat) => {
                const isChecked = selectedPlatforms.includes(plat.id);
                return (
                  <button
                    key={plat.id}
                    onClick={() => {
                      if (isChecked && selectedPlatforms.length > 1) {
                        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== plat.id));
                      } else {
                        setSelectedPlatforms([...selectedPlatforms, plat.id]);
                      }
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      isChecked
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {plat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase text-slate-900 dark:text-slate-200 tracking-wider">
              3. Native Features & Integrations:
            </label>
            <div className="space-y-2">
              {Object.keys(addonPrices).map((key) => {
                const addon = addonPrices[key];
                const isSelected = selectedAddons.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleAddon(key)}
                    className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500/60 dark:border-blue-700'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {addon.icon}
                      <span className="text-xs font-bold text-slate-950 dark:text-white">{addon.label}</span>
                    </div>
                    <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400">
                      +₹{addon.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Summary & Submit CTA */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-baseline bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-400 block">
                  Total Project Estimate:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                  ₹{calculateTotalCost().toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-semibold">
                  + Applicable GST • Includes Source Code Transfer
                </span>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] rounded-full border border-emerald-500/20">
                  100% Code Ownership
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderApp}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-xl shadow-blue-600/25 transition-all"
            >
              <span>Submit App Project Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive App Store & Play Store Publishing Suite */}
      <section className="bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-xl bento-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% STORE APPROVAL GUARANTEE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Play Store & App Store Publishing Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-200 font-medium mt-1">
              MUCO Labs handles end-to-end app creation, compilation, policy compliance, and store submission.
            </p>
          </div>

          <button
            onClick={() => onNavigateToContactWithItem("Play Store & App Store Publishing Assistance Request - Free Consultation")}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Get Store Publishing Assistance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Store Comparison & Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Play Store Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-500/5 to-transparent border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
                  🤖
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">Google Play Store</h3>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Android .AAB Release</span>
                </div>
              </div>
              <span className="text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                $25 One-Time
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-900 dark:text-slate-200 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Android App Bundle (.aab):</strong> Built with latest Android API 34+ target compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Play Console Setup:</strong> Developer registration, merchant account configuration & APK signing key.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>App Store Optimization (ASO):</strong> High-converting title, keywords, short & full description.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Asset Generation:</strong> 512x512 Hi-Res Icon, 1024x500 Feature Banner, Phone & Tablet screenshots.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Privacy & Policy Audit:</strong> Data safety questionnaire, Privacy Policy hosting & consent dialogs.</span>
              </li>
            </ul>
          </div>

          {/* Apple App Store Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent border border-blue-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg">
                  🍎
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">Apple App Store</h3>
                  <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">iOS .IPA Release</span>
                </div>
              </div>
              <span className="text-xs font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                $99 / Year
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-900 dark:text-slate-200 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>iOS Archive Build (.ipa):</strong> Signed Xcode / Expo build with production distribution certificates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>App Store Connect:</strong> TestFlight beta distribution setup, App ID creation & Provisioning Profiles.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Human Interface Guidelines:</strong> Apple design & accessibility review to prevent App Review rejection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Retina Screenshots:</strong> 6.7" Super Retina & 5.5" iPhone display frame mockups.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Account Deletion & IAP:</strong> Compliance with in-app purchase guidelines and mandatory user account removal.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mobile App Stack Highlights */}
      <section className="bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl p-8 border border-slate-200/80 dark:border-white/10 shadow-xl bento-card space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">
            Production Quality Guarantee
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Why Build Your App With MUCO Labs?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">App Store & Play Store Support</h3>
            <p className="text-xs text-slate-900 dark:text-slate-300 font-normal leading-relaxed">
              We guide developers and business owners through Apple Developer & Google Play Console account setup, guidelines compliance, and submission.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">30-Day Post Launch Warranty</h3>
            <p className="text-xs text-slate-900 dark:text-slate-300 font-normal leading-relaxed">
              Every app delivered by MUCO Labs comes with a 30-day bug warranty and free hotfix release assistance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-950 dark:text-white">Modern Tech Stack</h3>
            <p className="text-xs text-slate-900 dark:text-slate-300 font-normal leading-relaxed">
              Built using React Native, Expo, Flutter, Node.js Express, Firebase, Supabase, and Tailwind for high fps performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
