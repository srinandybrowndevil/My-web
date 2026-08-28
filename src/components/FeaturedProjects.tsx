import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { ProjectItem, PageId } from '../types';
import { Image } from './Image';
import { CaseStudyDetailModal } from './CaseStudyDetailModal';
import { 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ChevronRight, 
  Code2,
  Cpu,
  Bot,
  Layers,
  Globe,
  Award
} from 'lucide-react';

interface FeaturedProjectsProps {
  onNavigate?: (page: PageId) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  // Filter categories
  const categories = ['All', 'Web Development', 'Mobile App', 'SaaS Platform', 'AI & Automation'];

  // Select top featured projects from each domain
  const featuredList = INITIAL_PROJECTS.filter((proj) => {
    if (selectedCategory === 'All') {
      return ['proj-web-1', 'proj-mobile-1', 'proj-saas-1', 'proj-ai-1', 'proj-web-2', 'proj-mobile-2'].includes(proj.id);
    }
    return proj.category === selectedCategory;
  }).slice(0, 6);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Code2 className="w-3.5 h-3.5 text-orange-500" />;
      case 'Mobile App':
        return <Cpu className="w-3.5 h-3.5 text-orange-500" />;
      case 'SaaS Platform':
        return <Layers className="w-3.5 h-3.5 text-orange-500" />;
      case 'AI & Automation':
        return <Bot className="w-3.5 h-3.5 text-orange-500" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-orange-500" />;
    }
  };

  return (
    <section id="featured-projects" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1 rounded-full text-orange-600 dark:text-orange-400 font-mono font-bold text-xs uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>SELECTED PRODUCTION SYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            SELECTED WORK.
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Explore scalable enterprise platforms, mobile applications, multi-tenant SaaS engines, and autonomous AI systems delivered for global clients.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredList.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onMouseEnter={() => setHoveredProjectId(project.id)}
            onMouseLeave={() => setHoveredProjectId(null)}
            className="group relative rounded-3xl bg-white dark:bg-[#0e131f] border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-2xl"
          >
            {/* Card Image Header */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-950">
              <Image
                src={project.image}
                alt={project.title}
                fallbackSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-slate-200">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">
                  <span>{project.year}</span>
                </span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-semibold">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{project.client}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack & CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedModalProject(project)}
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal
        project={selectedModalProject}
        isOpen={Boolean(selectedModalProject)}
        onClose={() => setSelectedModalProject(null)}
        onNavigateToContact={(msg) => {
          setSelectedModalProject(null);
          if (onNavigate) {
            onNavigate('contact', msg);
          }
        }}
      />

      {/* Footer CTA */}
      {onNavigate && (
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
          >
            <span>Explore All Work in Portfolio</span>
            <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
