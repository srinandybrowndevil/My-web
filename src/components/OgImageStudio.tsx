import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  MapPin, 
  Code2, 
  Palette, 
  Share2, 
  Eye, 
  RefreshCw, 
  Monitor, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { 
  OgCardOptions, 
  renderOgCardToCanvas, 
  downloadOgCard, 
  generateOgCardDataUrl 
} from '../utils/ogImageGenerator';
import { SERVICE_LOCATIONS_DATA } from '../data/serviceLocationsData';
import { LOCATIONS_DATA } from '../data/locationsData';
import { CORE_SERVICES } from '../data/servicesData';
import { COURSES_DATA } from '../data/coursesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { BLOG_POSTS } from '../data/blogData';
import { useToast } from '../context/ToastContext';

type EntityCategory = 'combos' | 'locations' | 'services' | 'courses' | 'projects' | 'blogs' | 'custom';

export const OgImageStudio: React.FC = () => {
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [category, setCategory] = useState<EntityCategory>('combos');
  const [selectedId, setSelectedId] = useState<string>(SERVICE_LOCATIONS_DATA[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState<'canvas' | 'twitter' | 'linkedin' | 'whatsapp'>('canvas');
  const [isRendering, setIsRendering] = useState(false);
  const [dataUrl, setDataUrl] = useState<string>('');

  // Customizable state fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryBadge, setCategoryBadge] = useState('');
  const [locationTag, setLocationTag] = useState('');
  const [priceTag, setPriceTag] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [themeColor, setThemeColor] = useState<'cyan' | 'indigo' | 'emerald' | 'amber' | 'purple'>('cyan');
  const [brandSubtitle, setBrandSubtitle] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | undefined>(undefined);

  // Synchronize options when entity selection changes
  useEffect(() => {
    if (category === 'combos') {
      const combo = SERVICE_LOCATIONS_DATA.find((c) => c.id === selectedId) || SERVICE_LOCATIONS_DATA[0];
      if (combo) {
        setTitle(`${combo.serviceName} in ${combo.locationName}`);
        setSubtitle(combo.localizedSummary || combo.metaDescription);
        setCategoryBadge('Service × Regional Hub');
        setLocationTag(`${combo.locationName} • Tamil Nadu`);
        setPriceTag(combo.startingPrice);
        setFeatures(combo.targetIndustries.slice(0, 4));
        setThemeColor('cyan');
        setBrandSubtitle(`LOCAL SEO & ENTERPRISE IT • ${combo.locationName.toUpperCase()}`);
        setBackgroundImageUrl(undefined);
      }
    } else if (category === 'locations') {
      const loc = LOCATIONS_DATA[selectedId as keyof typeof LOCATIONS_DATA] || Object.values(LOCATIONS_DATA)[0];
      if (loc) {
        setTitle(`${loc.name} Technology Hub`);
        setSubtitle(loc.overview || loc.headline);
        setCategoryBadge('Regional Technology Hub');
        setLocationTag(`${loc.name} (${loc.pincode}) • ${loc.district} District`);
        setPriceTag('Local Engineering & AI Delivery');
        setFeatures(loc.majorIndustries.map((i) => i.name).slice(0, 4));
        setThemeColor('emerald');
        setBrandSubtitle(`KONGU CORRIDOR REGIONAL HUB • PIN ${loc.pincode}`);
        setBackgroundImageUrl(loc.heroImage);
      }
    } else if (category === 'services') {
      const srv = CORE_SERVICES.find((s) => s.id === selectedId) || CORE_SERVICES[0];
      if (srv) {
        setTitle(srv.title);
        setSubtitle(srv.tagline || srv.description);
        setCategoryBadge('Enterprise IT Solution');
        setLocationTag('Erode HQ • Global Delivery');
        setPriceTag('Custom Architecture & SLA');
        setFeatures(srv.technologies.slice(0, 4));
        setThemeColor('indigo');
        setBrandSubtitle('MUCO LABS CORE ENGINEERING');
        setBackgroundImageUrl(undefined);
      }
    } else if (category === 'courses') {
      const crs = COURSES_DATA.find((c) => c.id === selectedId) || COURSES_DATA[0];
      if (crs) {
        setTitle(crs.title);
        setSubtitle(`${crs.duration} Intensive Bootcamp • Mentored by Practitioners`);
        setCategoryBadge('Way2Me Tech Bootcamp');
        setLocationTag('Way2Me Academy × MUCO Labs');
        setPriceTag(`${crs.level} Level • ${crs.duration}`);
        setFeatures(crs.technologies.slice(0, 4));
        setThemeColor('amber');
        setBrandSubtitle('WAY2ME ACADEMY × MUCO LABS');
        setBackgroundImageUrl(undefined);
      }
    } else if (category === 'projects') {
      const prj = INITIAL_PROJECTS.find((p) => p.id === selectedId) || INITIAL_PROJECTS[0];
      if (prj) {
        setTitle(prj.title);
        setSubtitle(`${prj.category} for ${prj.client} • Full Production Deployment`);
        setCategoryBadge('Client Case Study');
        setLocationTag(prj.client);
        setPriceTag(prj.category);
        setFeatures(prj.techStack.slice(0, 4));
        setThemeColor('purple');
        setBrandSubtitle('PRODUCTION CLIENT DELIVERABLE');
        setBackgroundImageUrl(prj.image);
      }
    } else if (category === 'blogs') {
      const blg = BLOG_POSTS.find((b) => b.id === selectedId || b.slug === selectedId) || BLOG_POSTS[0];
      if (blg) {
        setTitle(blg.title);
        setSubtitle(blg.excerpt);
        setCategoryBadge(`Tech Guide • ${blg.category}`);
        setLocationTag(`By ${blg.author.name} (${blg.readTime})`);
        setPriceTag('Engineering Article');
        setFeatures(blg.keywords.slice(0, 4));
        setThemeColor('cyan');
        setBrandSubtitle('MUCO LABS ENGINEERING BLOG');
        setBackgroundImageUrl(blg.image);
      }
    } else if (category === 'custom') {
      // Default custom state
      setTitle('Custom Enterprise AI Solution in Tamil Nadu');
      setSubtitle('Scalable full-stack systems, mobile applications, and predictive AI engineered for modern business scale.');
      setCategoryBadge('Custom Social Banner');
      setLocationTag('Erode • Coimbatore • Salem • Global');
      setPriceTag('Enterprise SLA');
      setFeatures(['React / TypeScript', 'FastAPI / Python', 'PostgreSQL Cloud', 'Enterprise AI']);
      setThemeColor('cyan');
      setBrandSubtitle('MUCO LABS // CUSTOM OPEN GRAPH CARD');
      setBackgroundImageUrl(undefined);
    }
  }, [category, selectedId]);

  // Current options object
  const currentOptions: OgCardOptions = useMemo(() => ({
    title,
    subtitle,
    categoryBadge,
    locationTag,
    priceTag,
    features,
    themeColor,
    brandSubtitle,
    backgroundImageUrl
  }), [title, subtitle, categoryBadge, locationTag, priceTag, features, themeColor, brandSubtitle, backgroundImageUrl]);

  // Render to canvas whenever options change
  useEffect(() => {
    let isMounted = true;
    setIsRendering(true);

    if (canvasRef.current) {
      renderOgCardToCanvas(currentOptions, canvasRef.current)
        .then((canvas) => {
          if (isMounted) {
            setDataUrl(canvas.toDataURL('image/png', 0.95));
            setIsRendering(false);
          }
        })
        .catch((err) => {
          console.error('Failed to render OG canvas:', err);
          if (isMounted) setIsRendering(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [currentOptions]);

  const handleDownload = async () => {
    try {
      await downloadOgCard(currentOptions, `mucolabs-og-${category}-${selectedId || 'custom'}.png`);
      showToast('Downloaded high-resolution (1200x630) Open Graph card!', 'success');
    } catch (err) {
      showToast('Failed to download image', 'error');
    }
  };

  const handleCopyDataUrl = async () => {
    try {
      if (dataUrl) {
        await navigator.clipboard.writeText(dataUrl);
        setCopied(true);
        showToast('Base64 PNG Data URL copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      showToast('Failed to copy Data URL', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Automated Open Graph Canvas Generator
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                1200 × 630 Standard
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Generates customized, high-contrast social cards with dynamic gradients, cyber brackets, and localized tags via HTML5 Canvas API.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyDataUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied URL' : 'Copy Data URL'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download PNG (1200x630)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Entity Picker & Customizer Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Choose Page Entity
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
              {[
                { id: 'combos', label: 'Service × Loc' },
                { id: 'locations', label: 'Location Hubs' },
                { id: 'services', label: 'IT Services' },
                { id: 'courses', label: 'Bootcamps' },
                { id: 'projects', label: 'Case Studies' },
                { id: 'blogs', label: 'Blog Posts' },
                { id: 'custom', label: 'Custom' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setCategory(tab.id as EntityCategory);
                    if (tab.id === 'combos') setSelectedId(SERVICE_LOCATIONS_DATA[0]?.id || '');
                    if (tab.id === 'locations') setSelectedId(Object.keys(LOCATIONS_DATA)[0] || '');
                    if (tab.id === 'services') setSelectedId(CORE_SERVICES[0]?.id || '');
                    if (tab.id === 'courses') setSelectedId(COURSES_DATA[0]?.id || '');
                    if (tab.id === 'projects') setSelectedId(INITIAL_PROJECTS[0]?.id || '');
                    if (tab.id === 'blogs') setSelectedId(BLOG_POSTS[0]?.id || '');
                  }}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all text-center truncate ${
                    category === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Entity Select Dropdown (if not custom) */}
          {category !== 'custom' && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Specific Entity
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              >
                {category === 'combos' &&
                  SERVICE_LOCATIONS_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.serviceName} in {c.locationName} ({c.id})
                    </option>
                  ))}
                {category === 'locations' &&
                  Object.values(LOCATIONS_DATA).map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} Technology Hub ({l.district})
                    </option>
                  ))}
                {category === 'services' &&
                  CORE_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.tagline})
                    </option>
                  ))}
                {category === 'courses' &&
                  COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                {category === 'projects' &&
                  INITIAL_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.client})
                    </option>
                  ))}
                {category === 'blogs' &&
                  BLOG_POSTS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} ({b.author.name})
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Customizer Panel */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                Theme & Accents
              </h4>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'cyan', bg: 'bg-cyan-500', border: 'border-cyan-400' },
                  { id: 'indigo', bg: 'bg-indigo-500', border: 'border-indigo-400' },
                  { id: 'emerald', bg: 'bg-emerald-500', border: 'border-emerald-400' },
                  { id: 'amber', bg: 'bg-amber-500', border: 'border-amber-400' },
                  { id: 'purple', bg: 'bg-purple-500', border: 'border-purple-400' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeColor(t.id as any)}
                    className={`w-6 h-6 rounded-full ${t.bg} transition-all cursor-pointer ${
                      themeColor === t.id ? `ring-2 ring-white scale-110 shadow-md` : 'opacity-60 hover:opacity-100'
                    }`}
                    title={`${t.id} theme`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Headline Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Subtitle / Pitch</label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Category Badge</label>
                  <input
                    type="text"
                    value={categoryBadge}
                    onChange={(e) => setCategoryBadge(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Location / District</label>
                  <input
                    type="text"
                    value={locationTag}
                    onChange={(e) => setLocationTag(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Pricing / Highlight Tag</label>
                  <input
                    type="text"
                    value={priceTag}
                    onChange={(e) => setPriceTag(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Brand Subtitle</label>
                  <input
                    type="text"
                    value={brandSubtitle}
                    onChange={(e) => setBrandSubtitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Feature / Tech Chips (comma separated)
                </label>
                <input
                  type="text"
                  value={features.join(', ')}
                  onChange={(e) => setFeatures(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Canvas & Social Media Card Previews (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
              {[
                { id: 'canvas', label: '1200×630 Canvas' },
                { id: 'twitter', label: 'Twitter / X Card' },
                { id: 'linkedin', label: 'LinkedIn / FB' },
                { id: 'whatsapp', label: 'WhatsApp Card' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreviewPlatform(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    previewPlatform === p.id
                      ? 'bg-slate-800 text-cyan-300 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              Aspect 1.91:1 • 1200 × 630
            </span>
          </div>

          {/* PREVIEW CONTAINER */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-2xl relative overflow-hidden">
            {/* Live Canvas Viewport */}
            {previewPlatform === 'canvas' && (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-800 aspect-[1200/630] w-full bg-slate-950">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain block"
                    style={{ width: '100%', height: 'auto', aspectRatio: '1200/630' }}
                  />
                  {isRendering && (
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Renderer: HTML5 Canvas 2D API</span>
                  <span className="text-cyan-400 font-mono">100% Client-Side Vector Generation</span>
                </div>
              </div>
            )}

            {/* Simulated Twitter / X Card */}
            {previewPlatform === 'twitter' && (
              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-black border border-slate-800 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                    M
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">MUCO Labs</span>
                      <span className="text-xs text-slate-500 font-mono">@muco_labs · 2h</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      🚀 Discover our latest engineering milestone in {locationTag || 'Tamil Nadu'}: {title}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                  {dataUrl && (
                    <img
                      src={dataUrl}
                      alt="Twitter Card Preview"
                      className="w-full aspect-[1200/630] object-cover"
                    />
                  )}
                  <div className="p-3 bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-mono block">mucolabs.com</span>
                    <h5 className="text-xs font-bold text-slate-100 line-clamp-1">{title}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{subtitle}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Simulated LinkedIn / Facebook Card */}
            {previewPlatform === 'linkedin' && (
              <div className="max-w-lg mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                    ML
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-slate-200">MUCO Labs (Software & AI Solutions)</h6>
                    <span className="text-[10px] text-slate-400">12,400 followers • Promoted</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {subtitle || 'Delivering high-performance software engineering and AI architectures across India.'}
                </p>
                <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                  {dataUrl && (
                    <img
                      src={dataUrl}
                      alt="LinkedIn Card Preview"
                      className="w-full aspect-[1200/630] object-cover"
                    />
                  )}
                  <div className="p-3 bg-slate-900 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">MUCOLABS.COM</span>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{title}</h5>
                  </div>
                </div>
              </div>
            )}

            {/* Simulated WhatsApp / Telegram Card */}
            {previewPlatform === 'whatsapp' && (
              <div className="max-w-sm mx-auto p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-left space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-900/60 text-slate-100 space-y-2 text-xs">
                  {dataUrl && (
                    <img
                      src={dataUrl}
                      alt="WhatsApp Preview"
                      className="w-full rounded-lg aspect-[1200/630] object-cover"
                    />
                  )}
                  <div>
                    <h5 className="text-xs font-bold text-white">{title}</h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{subtitle}</p>
                    <span className="text-[10px] text-emerald-300 font-mono block mt-1">mucolabs.com</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 block text-right font-mono">19:59 ✓✓</span>
              </div>
            )}
          </div>

          {/* Features Highlights bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Output Format</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">PNG / Base64 DataURI</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Render Target</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">1200 × 630 Pixels</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Generation Latency</span>
              <span className="text-xs font-bold text-amber-400 font-mono">&lt; 15 ms Offscreen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
