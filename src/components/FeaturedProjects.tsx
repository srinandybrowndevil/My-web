import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { ProjectItem, PageId } from '../types';
import { Image } from './Image';
import { CaseStudyDetailModal } from './CaseStudyDetailModal';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  ChevronRight, 
  ExternalLink,
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
      // Pick 6 key flagship projects
      return ['proj-web-1', 'proj-mobile-1', 'proj-saas-1', 'proj-ai-1', 'proj-web-2', 'proj-mobile-2'].includes(proj.id);
    }
    return proj.category === selectedCategory;
  }).slice(0, 6);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Code2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'Mobile App':
        return <Cpu className="w-3.5 h-3.5 text-blue-400" />;
      case 'SaaS Platform':
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
      case 'AI & Automation':
        return <Bot className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <section id="featured-projects" className="py-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 font-bold text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Showcase of Engineering Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Featured <span className="gold-text-gradient">Projects & Case Studies</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Explore production-grade software applications, mobile platforms, enterprise SaaS engines, and AI solutions engineered by MUCO Labs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-amber-500/20 backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with Framer Motion Staggered Entrance */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12
            }
          }
        }}
      >
        {featuredList.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onMouseEnter={() => setHoveredProjectId(project.id)}
            onMouseLeave={() => setHoveredProjectId(null)}
            className="group relative glass-morphism-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            {/* Card Image Header with Overlay */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-950">
              <Image
                src={project.image}
                alt={project.title}
                fallbackSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase text-amber-300">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-black">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{project.year}</span>
                </span>
              </div>

              {/* Hover Quick Overlay Action */}
              <motion.div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm p-5 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto"
                animate={{ opacity: hoveredProjectId === project.id ? 1 : 0 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Key Impact</span>
                <p className="text-xs font-bold text-white max-w-xs mb-3 line-clamp-2">
                  "{project.highlights[0] || project.description}"
                </p>
                
                <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-w-xs">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-[9px] font-extrabold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('portfolio')}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg transition-transform transform active:scale-95"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            </div>

            {/* Card Content Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{project.client}</span>
                </div>

                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedModalProject(project)}
                  className="text-[11px] font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Deep Dive</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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

      {/* Footer Navigation CTA to full Portfolio */}
      {onNavigate && (
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 font-black text-xs px-6 py-3 rounded-2xl border border-amber-500/30 shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore All 15+ Projects in Portfolio</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      )}
    </section>
  );
};
