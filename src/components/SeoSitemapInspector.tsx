import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllSitemapEntries, getSitemapStats, generateSitemapXml, generateRobotsTxt, DOMAIN, SitemapUrlEntry } from '../lib/sitemapGenerator';
import { 
  FileCode, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Layers, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Filter, 
  Download,
  Terminal,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { OgImageStudio } from './OgImageStudio';

export const SeoSitemapInspector: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'routes' | 'xml' | 'robots' | 'architecture' | 'og-studio'>('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedType, setCopiedType] = useState<'xml' | 'robots' | null>(null);

  const stats = useMemo(() => getSitemapStats(), []);
  const allEntries = useMemo(() => getAllSitemapEntries(), []);

  const categories = useMemo(() => {
    return ['All', ...Object.keys(stats.breakdown)];
  }, [stats]);

  const filteredEntries = useMemo(() => {
    return allEntries.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = 
        item.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allEntries, selectedCategory, searchQuery]);

  const rawXml = useMemo(() => generateSitemapXml(allEntries), [allEntries]);
  const rawRobots = useMemo(() => generateRobotsTxt(), []);

  const handleCopy = (text: string, type: 'xml' | 'robots') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    showToast(
      type === 'xml' ? 'Sitemap XML copied to clipboard' : 'Robots.txt content copied to clipboard',
      'success'
    );
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, 'info');
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'Core Page':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Location Hub':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Service x Location':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      case 'Service':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'Course':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Project':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Blog Article':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stat Cards */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical SEO & Dynamic Sitemap Engine</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Sitemap.xml & Robots.txt Crawler Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time dynamically generated sitemap indexing all Core Services, Erode & Regional Hubs, Service × Location combos, and Blog authority guides.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Live /sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Live /robots.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Breakdown Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total URLs</span>
            <span className="text-xl font-black text-cyan-300">{stats.totalUrls}</span>
          </div>
          {Object.entries(stats.breakdown).map(([cat, count]) => (
            <div key={cat} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">{cat}</span>
              <span className="text-xl font-black text-white">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'routes'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Indexed Routes ({allEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'xml'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Raw Sitemap XML</span>
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'robots'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Robots.txt Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SEO Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('og-studio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'og-studio'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>OG Canvas Studio</span>
            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
              New
            </span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT: Indexed Routes Explorer */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search indexed URLs or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800/80 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">#</th>
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Category</th>
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Page / Keyword Target Title</th>
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Canonical Location URL</th>
                    <th className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300 text-center">Priority</th>
                    <th className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300 text-center">Freq</th>
                    <th className="py-3 px-3 font-bold text-slate-700 dark:text-slate-300 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredEntries.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeColor(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-blue-600 dark:text-blue-400 max-w-sm truncate">
                        {item.loc}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
                        {item.priority}
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">
                        {item.changefreq}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <a
                          href={item.loc.replace('https://mucolabs.in', '') || '/'}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>Showing {filteredEntries.length} of {allEntries.length} indexed URLs</span>
              <span className="font-mono text-[11px]">Domain: {DOMAIN}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Raw XML Code */}
      {activeTab === 'xml' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Valid XML conforming to standard <code className="text-blue-500">http://www.sitemaps.org/schemas/sitemap/0.9</code> schema
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(rawXml, 'xml')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedType === 'xml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'xml' ? 'Copied XML' : 'Copy XML'}</span>
              </button>
              <button
                onClick={() => handleDownload(rawXml, 'sitemap.xml', 'application/xml')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .xml</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[500px]">
            <pre className="whitespace-pre">{rawXml}</pre>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Robots.txt */}
      {activeTab === 'robots' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Robots Exclusion Protocol directives allowing indexation of public routes and disallowing private API routes
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(rawRobots, 'robots')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedType === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'robots' ? 'Copied Robots.txt' : 'Copy Robots.txt'}</span>
              </button>
              <button
                onClick={() => handleDownload(rawRobots, 'robots.txt', 'text/plain')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-400 overflow-x-auto max-h-[460px]">
            <pre className="whitespace-pre">{rawRobots}</pre>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SEO Architecture */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Regional SEO Hierarchy & Local Hubs</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every city and town across the Erode Kongu corridor has dedicated landing pages mapping local commercial belts, PIN codes, and primary industries:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block">Erode (HQ)</span>
                <span className="text-[11px] text-slate-400">PIN 638001 • Textiles & Turmeric</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block">Perundurai</span>
                <span className="text-[11px] text-slate-400">PIN 638052 • SIPCOT Industrial</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block">Bhavani</span>
                <span className="text-[11px] text-slate-400">PIN 638301 • Carpets & Dyeing</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block">Gobichettipalayam</span>
                <span className="text-[11px] text-slate-400">PIN 638452 • Agro & Silk</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Technical SEO & Structured Schema Rules</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every indexed route dynamically mounts Google-compliant Schema.org JSON-LD microdata:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><code>ProfessionalService</code> & <code>PostalAddress</code> (Erode, 638001)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><code>GeoCoordinates</code> (11.3410° N, 77.7172° E) for Local 3-Pack</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><code>areaServed</code> mapping 8 Kongu regional taluks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><code>FAQPage</code> & <code>Service</code> schemas for rich Google search snippets</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Automated Open Graph Canvas Studio */}
      {activeTab === 'og-studio' && (
        <OgImageStudio />
      )}
    </div>
  );
};
