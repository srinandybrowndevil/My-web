import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from './Image';
import {
  Building2,
  Users,
  Cpu,
  Cloud,
  Code2,
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Monitor
} from 'lucide-react';

interface VisualCard {
  id: string;
  category: string;
  title: string;
  story: string;
  image: string;
  tags: string[];
  metrics: string;
  iconName: string;
}

const COMPANY_VISUALS: VisualCard[] = [
  {
    id: 'ai-engineers',
    category: 'AI Engineering',
    title: 'Autonomous AI & Neural Models',
    story: 'Our AI engineers train, tune, and deploy custom LLMs, RAG knowledge bases, and multi-agent systems for enterprise client workflows.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Gemini API', 'PyTorch', 'Vector Search', 'LangChain'],
    metrics: '99.8% AI Model Accuracy',
    iconName: 'Bot'
  },
  {
    id: 'cloud-architecture',
    category: 'Cloud Infrastructure',
    title: 'Multi-Region High Availability Cloud',
    story: 'Engineering resilient cloud topologies across GCP and AWS with automated failover, load balancing, and Kubernetes orchestration.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['Google Cloud', 'Kubernetes', 'Docker', 'Terraform'],
    metrics: '99.99% Uptime Guarantee',
    iconName: 'Cloud'
  },
  {
    id: 'dev-collaboration',
    category: 'Engineering Team',
    title: 'Agile Code Sprints & Code Audits',
    story: 'Our software engineering teams conduct rigorous peer reviews, automated CI/CD pipeline deployments, and clean architectural testing.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: ['React 18', 'TypeScript', 'Node.js', 'Express'],
    metrics: 'Zero-Downtime Releases',
    iconName: 'Code2'
  },
  {
    id: 'client-meetings',
    category: 'Client Partnerships',
    title: 'Strategic Technical Architecture',
    story: 'Direct architectural strategy sessions with corporate executives, mapping out full digital transformation blueprints.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    tags: ['Enterprise Roadmap', 'ROI Strategy', 'SLA Design'],
    metrics: '100% On-Time Delivery',
    iconName: 'Users'
  },
  {
    id: 'office-workspace',
    category: 'Office Culture',
    title: 'Innovation Lab & Workspace',
    story: 'A collaborative, modern technology hub in Tamil Nadu equipped with high-speed fiber, dual-display workstations, and dev servers.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Erode Hub', '24/7 Operations', 'High-Speed Infra'],
    metrics: 'Modern Tech Hub',
    iconName: 'Building2'
  },
  {
    id: 'cybersecurity',
    category: 'Cybersecurity',
    title: 'Zero-Trust Defense & Shield',
    story: 'Continuous vulnerability scanning, automated threat prevention, penetration testing, and encrypted data pipeline safeguarding.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    tags: ['OAuth 2.0', 'AES-256', 'OWASP Top 10', 'SOC2'],
    metrics: 'Enterprise Security Compliance',
    iconName: 'ShieldCheck'
  }
];

export const AuthenticCompanyVisuals: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVisuals = selectedCategory === 'all'
    ? COMPANY_VISUALS
    : COMPANY_VISUALS.filter(v => v.id === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Authentic Enterprise Culture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Behind the Scenes at MUCO Labs
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
          Inside our digital engineering studio: real developers, AI architects, cloud engineers, and collaborative innovation powering global client success.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All Visual Stories
        </button>
        {COMPANY_VISUALS.map(v => (
          <button
            key={v.id}
            onClick={() => setSelectedCategory(v.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === v.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {v.category}
          </button>
        ))}
      </div>

      {/* Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisuals.map((visual) => (
          <motion.div
            key={visual.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Image Container */}
            <div className="relative h-56 overflow-hidden bg-slate-950">
              <Image
                src={visual.image}
                alt={visual.title}
                fallbackSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  {visual.category}
                </span>
              </div>

              {/* Metric Badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <span className="bg-blue-600/90 backdrop-blur-md text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-lg border border-blue-400/30">
                  {visual.metrics}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {visual.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {visual.story}
                </p>
              </div>

              {/* Tag Chips */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {visual.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
