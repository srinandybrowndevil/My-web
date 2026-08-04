import React, { useState } from 'react';
import { PricingItem, MaintenanceTier } from '../types';
import {
  DEVELOPMENT_PRICING,
  AI_SERVICES_PRICING,
  DIGITAL_MARKETING_PRICING,
  CREATIVE_SERVICES_PRICING,
  BUSINESS_SERVICES_PRICING,
  MAINTENANCE_SERVICES_PRICING
} from '../data/pricingData';
import { PricingCard } from './PricingCard';
import {
  Tag,
  ShieldCheck,
  Clock,
  Wrench,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calculator,
  Calendar,
  Headphones,
  Zap,
  FileText,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Layers,
  DollarSign,
  Server,
  Smartphone,
  Globe,
  Building2,
  ShoppingBag,
  Code2,
  Check,
  Plus,
  RefreshCw,
  Info
} from 'lucide-react';

interface PricingMaintenanceViewProps {
  initialSection?: 'all' | 'pricing' | 'maintenance' | 'terms' | 'calculator';
  onNavigateToContactWithItem: (itemTitle: string) => void;
}

type PricingCategoryTab = 'all' | 'development' | 'ai' | 'marketing' | 'creative' | 'business';
type MaintenanceCategoryTab = 'all' | 'Website Maintenance' | 'Mobile App Maintenance' | 'Software & SaaS Maintenance' | 'Cloud & Server Maintenance';

export const PricingMaintenanceView: React.FC<PricingMaintenanceViewProps> = ({
  initialSection = 'all',
  onNavigateToContactWithItem
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'pricing' | 'maintenance' | 'terms' | 'calculator'>(initialSection);
  const [pricingTab, setPricingTab] = useState<PricingCategoryTab>('all');
  const [maintenanceTab, setMaintenanceTab] = useState<MaintenanceCategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Calculator State
  const [calcProjectType, setCalcProjectType] = useState<'website' | 'app' | 'saas' | 'ecommerce'>('website');
  const [calcBuildTier, setCalcBuildTier] = useState<number>(24999); // default business website
  const [calcMaintenanceTier, setCalcMaintenanceTier] = useState<number>(5999); // default business maintenance
  const [calcAddOns, setCalcAddOns] = useState<{ [key: string]: boolean }>({
    emergencySla: false,
    devopsHours: false,
    domainSsl: true,
  });
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Search filtering logic for pricing
  const filterPricingItems = (items: PricingItem[]) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.features.some((f) => f.toLowerCase().includes(q))
    );
  };

  const devFiltered = filterPricingItems(DEVELOPMENT_PRICING);
  const aiFiltered = filterPricingItems(AI_SERVICES_PRICING);
  const mktFiltered = filterPricingItems(DIGITAL_MARKETING_PRICING);
  const creativeFiltered = filterPricingItems(CREATIVE_SERVICES_PRICING);
  const bizFiltered = filterPricingItems(BUSINESS_SERVICES_PRICING);

  // Maintenance filtering
  const filteredMaintenanceItems = MAINTENANCE_SERVICES_PRICING.filter(
    (item) => {
      const categoryMatch = maintenanceTab === 'all' || item.category === maintenanceTab;
      if (!searchQuery.trim()) return categoryMatch;
      const q = searchQuery.toLowerCase();
      const textMatch =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.features.some((f) => f.toLowerCase().includes(q));
      return categoryMatch && textMatch;
    }
  );

  const handleSelectPricingItem = (item: PricingItem) => {
    onNavigateToContactWithItem(`Inquiry regarding Build Package: ${item.title} (${item.price}${item.period || ''})`);
  };

  const handleSelectMaintenanceItem = (item: MaintenanceTier) => {
    onNavigateToContactWithItem(`Inquiry regarding Maintenance SLA Plan: ${item.title} (${item.price}/month)`);
  };

  // Calculate totals for calculator
  const projectBuildOptions = [
    { type: 'website', title: 'Basic Website', price: 14999, category: 'Website Development' },
    { type: 'website', title: 'Business Website', price: 24999, category: 'Website Development', popular: true },
    { type: 'ecommerce', title: 'E-Commerce Store', price: 39999, category: 'Website Development' },
    { type: 'website', title: 'Custom Web App', price: 59999, category: 'Website Development' },
    { type: 'app', title: 'Basic Mobile App', price: 49999, category: 'Mobile App' },
    { type: 'app', title: 'Business Mobile App', price: 99999, category: 'Mobile App', popular: true },
    { type: 'saas', title: 'Custom SaaS Platform', price: 149999, category: 'SaaS Platform' },
  ];

  const maintenancePlanOptions = [
    { title: 'No Monthly Maintenance (On-Demand Only)', price: 0 },
    { title: 'Basic Website Maintenance', price: 2999 },
    { title: 'Business Website Maintenance', price: 5999, popular: true },
    { title: 'Enterprise Website Maintenance', price: 12999 },
    { title: 'Basic App Maintenance', price: 7999 },
    { title: 'Professional App Maintenance', price: 14999 },
    { title: 'Enterprise SaaS Maintenance', price: 49999 },
  ];

  const addOnOptions = [
    { id: 'domainSsl', title: 'Managed Domain & SSL Certificate Renewal', priceMonthly: 199, label: '₹199 / mo' },
    { id: 'devopsHours', title: '5 Extra Dedicated Developer Hours / Month', priceMonthly: 4999, label: '₹4,999 / mo' },
    { id: 'emergencySla', title: '24/7 Sub-2-Hour Emergency Incident SLA', priceMonthly: 7999, label: '₹7,999 / mo' },
  ];

  const calcAddOnsTotalMonthly = addOnOptions.reduce((acc, addon) => {
    return calcAddOns[addon.id] ? acc + addon.priceMonthly : acc;
  }, 0);

  const totalMonthlyMaintenance = calcMaintenanceTier + calcAddOnsTotalMonthly;
  const estimatedFirstYearTco = calcBuildTier + (totalMonthlyMaintenance * 12);

  const toggleAddOn = (id: string) => {
    setCalcAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCalculatorSubmit = () => {
    const selectedBuildObj = projectBuildOptions.find((b) => b.price === calcBuildTier);
    const selectedMaintObj = maintenancePlanOptions.find((m) => m.price === calcMaintenanceTier);

    const msg = `Custom Combined Quote Request:
• Upfront Build: ${selectedBuildObj?.title || 'Custom'} (₹${calcBuildTier.toLocaleString('en-IN')})
• Maintenance Plan: ${selectedMaintObj?.title || 'None'} (₹${calcMaintenanceTier.toLocaleString('en-IN')}/mo)
• Monthly Add-ons Total: ₹${calcAddOnsTotalMonthly.toLocaleString('en-IN')}/mo
• Estimated 1st Year Total: ₹${estimatedFirstYearTco.toLocaleString('en-IN')}`;

    onNavigateToContactWithItem(msg);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/80 dark:to-indigo-950/80 border border-blue-200 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Unified Pricing & Maintenance Hub • Est. 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Product Pricing & Maintenance Single Page
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-normal max-w-3xl mx-auto">
          Compare transparent upfront project costs, additional fee terms, and comprehensive monthly SLA maintenance retainer packages—including exact schedules, support levels, and service coverage boundaries—all without switching pages.
        </p>
      </section>

      {/* Main Section Anchor / Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 text-white p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All-in-One Hub</span>
          </button>

          <button
            onClick={() => setActiveSection('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'pricing'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Product Pricing & Costs</span>
          </button>

          <button
            onClick={() => setActiveSection('maintenance')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'maintenance'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Maintenance Retainers</span>
          </button>

          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'terms'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedules & Support Terms</span>
          </button>

          <button
            onClick={() => setActiveSection('calculator')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'calculator'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Cost & Maintenance Estimator</span>
          </button>
        </div>
      </section>

      {/* Global Search Bar (Filter across both pricing & maintenance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search any service, feature, or maintenance tier (e.g., 'E-Commerce', 'Backup', 'SLA', 'SEO', 'Security')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* SECTION 1: DETAILED PRICING PLANS & COSTS */}
      {(activeSection === 'all' || activeSection === 'pricing') && (
        <div className="space-y-10">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Tag className="w-4 h-4" />
                  <span>Section 1: Detailed Pricing Plans</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Product & Service Upfront Costs
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Upfront fixed-rate packages for custom web development, mobile apps, AI integrations, marketing retainers, and IT consulting.
                </p>
              </div>

              {/* Sub-Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'development', label: 'Development' },
                  { id: 'ai', label: 'AI Services' },
                  { id: 'marketing', label: 'Marketing' },
                  { id: 'creative', label: 'Creative' },
                  { id: 'business', label: 'Consulting' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPricingTab(tab.id as PricingCategoryTab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      pricingTab === tab.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Development Packages */}
            {(pricingTab === 'all' || pricingTab === 'development') && devFiltered.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Website & Mobile App Development Tiers</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {devFiltered.map((item) => (
                    <PricingCard key={item.id} item={item} onSelect={handleSelectPricingItem} />
                  ))}
                </div>
              </div>
            )}

            {/* AI Services */}
            {(pricingTab === 'all' || pricingTab === 'ai') && aiFiltered.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Enterprise AI & Automation Solutions</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiFiltered.map((item) => (
                    <PricingCard key={item.id} item={item} onSelect={handleSelectPricingItem} />
                  ))}
                </div>
              </div>
            )}

            {/* Digital Marketing */}
            {(pricingTab === 'all' || pricingTab === 'marketing') && mktFiltered.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Digital Marketing & Performance SEO</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mktFiltered.map((item) => (
                    <PricingCard key={item.id} item={item} onSelect={handleSelectPricingItem} />
                  ))}
                </div>
              </div>
            )}

            {/* Creative & Consulting */}
            {((pricingTab === 'all' || pricingTab === 'creative') && creativeFiltered.length > 0) && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-500" />
                  <span>Creative Design & Branding</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creativeFiltered.map((item) => (
                    <PricingCard key={item.id} item={item} onSelect={handleSelectPricingItem} />
                  ))}
                </div>
              </div>
            )}

            {((pricingTab === 'all' || pricingTab === 'business') && bizFiltered.length > 0) && (
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-500" />
                  <span>Business IT & Cloud Consulting</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bizFiltered.map((item) => (
                    <PricingCard key={item.id} item={item} onSelect={handleSelectPricingItem} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Additional Fees & Pricing Disclaimers Callout Box */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Important Cost Structure & Additional Fees Transparency
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clear guidance on what is included versus third-party costs and optional add-ons.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs border-t border-slate-800 pt-6">
                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Government GST (18%)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    All listed package prices are exclusive of 18% GST as per Indian Tax Regulations. Tax invoices provided for all B2B transactions with GST input credit.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <span>Domain & Cloud Server Hosting</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Domain registrations (.com/.in ~₹999/yr) and cloud infrastructure (AWS / GCP / Vercel ~₹500 - ₹3,500/mo) are billed directly to your cloud provider or bundled in MUCO Cloud.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>App Store Developer Accounts</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Apple App Store Developer Account ($99/year) and Google Play Console ($25 one-time) fees are paid directly to Apple & Google. MUCO Labs handles complete setup.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Third-Party API & Gateway Fees</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    LLM API keys (Gemini / OpenAI), WhatsApp Business API tokens, SMS gateways, and Payment Gateway transaction fees (Razorpay 2%) are billed at actual provider rates.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Ad-Hoc Development Rate</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Custom features outside original Scope of Work (SOW) or additional developer hours outside maintenance retainers are billed transparently at ₹1,500 / hour.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Post-Launch Free Support</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    All new development builds include 1 to 6 months of complimentary bug-fix support. You can transition seamlessly to a monthly maintenance retainer afterward.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SECTION 2: COMPREHENSIVE MAINTENANCE DETAILS */}
      {(activeSection === 'all' || activeSection === 'maintenance' || activeSection === 'terms') && (
        <div className="space-y-12 pt-6">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Section 2: Maintenance Plans & Retainers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  SLA Guaranteed System & App Maintenance
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Monthly SLA plans for zero downtime, continuous security patch management, automated backups, and guaranteed developer SLA availability.
                </p>
              </div>

              {/* Maintenance Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Maintenance Plans' },
                  { id: 'Website Maintenance', label: 'Web' },
                  { id: 'Mobile App Maintenance', label: 'Mobile Apps' },
                  { id: 'Software & SaaS Maintenance', label: 'SaaS' },
                  { id: 'Cloud & Server Maintenance', label: 'Cloud' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMaintenanceTab(tab.id as MaintenanceCategoryTab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      maintenanceTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaintenanceItems.map((item) => (
                <PricingCard key={item.id} item={item} onSelect={handleSelectMaintenanceItem} />
              ))}
            </div>
          </section>

          {/* SECTION 2B & 2C: MAINTENANCE SCHEDULES & SUPPORT SLA TERMS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Service Level Agreements & Execution Cadence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Comprehensive Maintenance Details
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understanding your maintenance schedule, support response SLAs, and exact service coverage.
              </p>
            </div>

            {/* Maintenance Schedules Cadence Matrix */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Automated Maintenance Schedules & Tasks
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Proactive technical maintenance performed automatically on your systems.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Daily Cadence */}
                <div className="bg-slate-50 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                      Daily Cadence
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      Every 24 Hrs
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Automated Database Cloud Backup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Continuous Uptime Pings (60s loop)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Security & Firewall Attack Log Monitoring</span>
                    </li>
                  </ul>
                </div>

                {/* Weekly Cadence */}
                <div className="bg-slate-50 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      Weekly Cadence
                    </span>
                    <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                      Every Sunday
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>SSL/TLS Security Certificate Audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>Minor Server OS Security Patching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>Database Index Optimization & Defrag</span>
                    </li>
                  </ul>
                </div>

                {/* Monthly Cadence */}
                <div className="bg-slate-50 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                      Monthly Cadence
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      End of Month
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Third-Party Package & SDK Upgrades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Core Page Speed & CWV Audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Monthly SLA & Analytics Health Report</span>
                    </li>
                  </ul>
                </div>

                {/* Quarterly Cadence */}
                <div className="bg-slate-50 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                      Quarterly Cadence
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                      Every 90 Days
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>Full Penetration Vulnerability Scan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>Frontend Code Refactoring & Cleanup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>Disaster Recovery Failover Simulation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support Options & Response SLA Levels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Standard SLA */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                  <Headphones className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Included in Basic Plans
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Standard Support SLA
                  </h3>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Guaranteed Response:</span>
                  <span className="text-slate-900 dark:text-white font-black">&lt; 24 Hours</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Support Ticket & Email Desk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Business Hours: Mon - Fri (9 AM - 6 PM IST)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Includes 2 to 5 hours edit support</span>
                  </li>
                </ul>
              </div>

              {/* Priority SLA */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border-2 border-blue-500 shadow-lg shadow-blue-500/10 space-y-4 relative">
                <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                    Included in Pro Plans
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Priority Support SLA
                  </h3>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>Guaranteed Response:</span>
                  <span className="text-blue-400 font-black">&lt; 8 Hours</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>Dedicated WhatsApp & Slack Private Channel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>Extended Hours: Mon - Sat (8 AM - 10 PM IST)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>Includes 10 to 15 hours custom edit support</span>
                  </li>
                </ul>
              </div>

              {/* Enterprise Emergency SLA */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    Enterprise SLA Tier
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    24/7 Emergency Incident SLA
                  </h3>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Guaranteed Response:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">&lt; 2 Hours (24/7)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span>24/7 Emergency Phone Hotline & Lead DevOps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span>99.99% Uptime SLA Guarantee with credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500" />
                    <span>Includes 25+ hours developer availability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Service Terms & Coverage Boundaries (Included vs Excluded) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Service Terms & Coverage Boundaries
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparent terms detailing exactly what is covered under monthly maintenance contracts vs what requires a separate SOW.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
                  <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>What IS Covered Under Maintenance</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Bug fixes, broken link resolution, and layout glitch patching.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Security vulnerability patching and framework dependency upgrades.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Minor content updates (text revisions, image updates, blog publishing).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Database backups, cloud server monitoring, and SSL renewal management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile OS compatibility updates for iOS & Android App Store policy compliance.</span>
                    </li>
                  </ul>
                </div>

                {/* Excluded */}
                <div className="bg-rose-50/50 dark:bg-rose-950/30 p-6 rounded-2xl border border-rose-200/80 dark:border-rose-800/50 space-y-3">
                  <h4 className="text-sm font-black text-rose-800 dark:text-rose-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>What is NOT Covered (Requires New SOW)</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>Building entirely new application modules or new database architecture.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>Full UI/UX brand overhauls or website redesigns.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>Third-party API subscription costs (e.g. OpenAI keys, Twilio SMS balance).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>Paid advertising ad spend or third-party premium plugin license fees.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>Hardware physical repairs or end-user IT desktop device setup.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SECTION 3: INTERACTIVE COST & MAINTENANCE CALCULATOR */}
      {(activeSection === 'all' || activeSection === 'calculator') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Pricing & Maintenance Estimator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Calculate Total Cost of Ownership (TCO)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Combine your initial build package with monthly maintenance and optional add-ons to see estimated 1-year total costs.
                </p>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Estimated 1st Year Total</span>
                <span className="text-3xl font-black text-emerald-400">
                  ₹{estimatedFirstYearTco.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Select Build Tier */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>1. Select Upfront Development Build Tier:</span>
                    <span className="text-blue-400 font-bold">₹{calcBuildTier.toLocaleString('en-IN')}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projectBuildOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCalcBuildTier(opt.price)}
                        className={`p-3 rounded-2xl text-left border transition-all text-xs flex items-center justify-between ${
                          calcBuildTier === opt.price
                            ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-md'
                            : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{opt.title}</p>
                          <p className="text-[10px] opacity-75">{opt.category}</p>
                        </div>
                        <span className="font-extrabold">₹{opt.price.toLocaleString('en-IN')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Maintenance Tier */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>2. Select Monthly Maintenance Retainer:</span>
                    <span className="text-emerald-400 font-bold">₹{calcMaintenanceTier.toLocaleString('en-IN')} / mo</span>
                  </label>
                  <div className="space-y-2">
                    {maintenancePlanOptions.map((mOpt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCalcMaintenanceTier(mOpt.price)}
                        className={`w-full p-3 rounded-2xl text-left border transition-all text-xs flex items-center justify-between ${
                          calcMaintenanceTier === mOpt.price
                            ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
                            : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-medium">{mOpt.title}</span>
                        <span className="font-black shrink-0 ml-2">
                          {mOpt.price === 0 ? '₹0 / mo' : `₹${mOpt.price.toLocaleString('en-IN')} / mo`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Optional SLA Add-ons */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                    3. Optional Infrastructure & SLA Add-Ons:
                  </label>
                  <div className="space-y-2">
                    {addOnOptions.map((addon) => (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                          calcAddOns[addon.id]
                            ? 'bg-slate-800 border-indigo-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!calcAddOns[addon.id]}
                            onChange={() => toggleAddOn(addon.id)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                          />
                          <span className="font-medium">{addon.title}</span>
                        </div>
                        <span className="font-bold text-indigo-400 shrink-0">{addon.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instant Summary Breakdown Card */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>Estimated Quote Summary</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-900">
                      <span>Upfront Project Build Cost:</span>
                      <span className="font-bold text-white">₹{calcBuildTier.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-900">
                      <span>Monthly Maintenance Base:</span>
                      <span className="font-bold text-white">₹{calcMaintenanceTier.toLocaleString('en-IN')} / mo</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-900">
                      <span>Monthly Add-ons Total:</span>
                      <span className="font-bold text-indigo-400">₹{calcAddOnsTotalMonthly.toLocaleString('en-IN')} / mo</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-200 font-bold pt-2 text-sm">
                      <span>Combined Monthly Retainer:</span>
                      <span className="text-emerald-400 font-black">₹{totalMonthlyMaintenance.toLocaleString('en-IN')} / mo</span>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1 mt-4">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Estimated 1st Year Total Investment</span>
                      <div className="text-2xl font-black text-emerald-400">
                        ₹{estimatedFirstYearTco.toLocaleString('en-IN')}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Includes Upfront Build + 12 Months Maintenance SLA + Selected Add-ons. (Excludes 18% GST).
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculatorSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Custom Combined Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: UNIFIED PRICING & MAINTENANCE FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Pricing & Maintenance Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Answers to essential questions regarding billing, SLA response times, and service terms.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Can I sign up for a MUCO Labs maintenance plan if my app was built by another company?",
                a: "Yes! We perform an initial Code Audit & Security Assessment (₹4,999 one-time) to review your existing repository and server environment, after which we onboard your application directly into our monthly maintenance SLA retainers."
              },
              {
                q: "What happens if we do not use all dedicated developer hours in a month?",
                a: "Unused dedicated developer maintenance hours roll over for up to 60 days so your team never loses value. You can apply them toward minor enhancements, speed optimization, or custom feature tweaks."
              },
              {
                q: "Are hosting and domain costs included in the monthly maintenance prices?",
                a: "Basic maintenance focuses on system administration, patch updates, and developer availability. For clients who prefer an all-in-one hands-off solution, we offer MUCO Managed Cloud hosting add-ons covering domain SSL and server hosting directly."
              },
              {
                q: "How do emergency response SLAs work if our server goes down at night?",
                a: "Enterprise tier clients receive access to our 24/7 emergency incident hotline. Our automated monitoring system alerts on-call senior DevOps engineers immediately, guaranteeing initial response and incident mitigation within 2 hours."
              },
              {
                q: "Is there a long-term contract requirement for monthly maintenance?",
                a: "No lock-in contracts! All MUCO Labs maintenance plans operate on flexible month-to-month retainers with a simple 30-day notice period for cancellation."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/40"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === `faq-${idx}` ? null : `faq-${idx}`)}
                  className="w-full text-left p-4 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      expandedFaq === `faq-${idx}` ? 'rotate-180 text-blue-500' : ''
                    }`}
                  />
                </button>
                {expandedFaq === `faq-${idx}` && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Need a Tailored Enterprise Contract or SOW?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Our engineering leadership will design a customized build + maintenance package with tailored SLA terms for your organization.
            </p>
          </div>
          <button
            onClick={() => onNavigateToContactWithItem('Enterprise Combined Pricing & SLA Inquiry')}
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <span>Consulting & Custom Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
