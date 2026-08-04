import React, { useState } from 'react';
import { PageId, ProjectItem } from '../types';
import { INITIAL_PROJECTS } from '../data/projectsData';
import {
  Briefcase,
  FolderPlus,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  Code,
  Filter,
  Search,
  ArrowRight,
  PlusCircle,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PortfolioProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // New Project Form Modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<{
    title: string;
    category: ProjectItem['category'];
    client: string;
    description: string;
    techStack: string;
    highlights: string;
    status: ProjectItem['status'];
    image: string;
  }>({
    title: '',
    category: 'Web Development',
    client: '',
    description: '',
    techStack: 'React, TypeScript, Tailwind CSS',
    highlights: 'Responsive UI, High Performance, Enterprise Security',
    status: 'In Active Development',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  });

  const categories = [
    'All',
    'Web Development',
    'Mobile App',
    'SaaS Platform',
    'AI & Automation',
    'Digital Marketing & SEO',
    'UI/UX & Branding',
    'Cloud & IT Consulting'
  ];

  const filteredProjects = projects.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.client.trim()) return;

    const created: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      category: newProject.category,
      client: newProject.client,
      year: new Date().getFullYear().toString(),
      description: newProject.description || 'Custom software solution built by MUCO Labs.',
      techStack: newProject.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      status: newProject.status,
      image: newProject.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      highlights: newProject.highlights.split(',').map((s) => s.trim()).filter(Boolean)
    };

    setProjects([created, ...projects]);
    setShowAddModal(false);
    // Reset form
    setNewProject({
      title: '',
      category: 'Web Development',
      client: '',
      description: '',
      techStack: 'React, TypeScript, Tailwind CSS',
      highlights: 'Responsive UI, High Performance, Enterprise Security',
      status: 'In Active Development',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-6 space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-extrabold text-xs">
          <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>MUCO Labs Portfolio & Future Roadmap</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Our Projects & Engineering Showcase
        </h1>

        <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 leading-relaxed font-medium max-w-2xl mx-auto">
          Explore completed client applications, active software builds, and upcoming projects. Add your future project to our pipeline!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3 px-5 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Future Project</span>
          </button>

          <button
            onClick={() => onNavigate('contact', 'Request Proposal for New Project Idea')}
            className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Submit Your Project Idea</span>
          </button>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack, or client..."
              className="w-full bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-medium text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Layers className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No projects found matching criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or selected category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/80 dark:bg-slate-900/60 glass-light dark:glass rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bento-card flex flex-col justify-between group hover:border-blue-500/40"
              >
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${
                        project.status === 'Completed & Live'
                          ? 'bg-emerald-500/90 text-white'
                          : project.status === 'In Active Development'
                          ? 'bg-blue-600/90 text-white'
                          : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {project.status === 'Completed & Live' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
                      {project.category} • {project.year}
                    </span>
                    <h3 className="text-base font-black leading-tight drop-shadow-sm">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>Client / Sector:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-200">{project.client}</span>
                    </div>

                    <p className="text-xs text-slate-900 dark:text-slate-200 line-clamp-3 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onNavigate('contact', `Inquiry regarding project: ${project.title}`)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-[11px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-all"
                    >
                      Request Similar App
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Submit Future Project CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-widest rounded-full">
              Future Roadmap Expansion
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">Have a future project idea to build?</h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Partner with founder Srinivash Mahalingam and MUCO Labs engineering team to design, build, and publish your mobile app or SaaS platform to app stores.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow-xl transition-all"
            >
              Add Project To Showcase
            </button>
            <button
              onClick={() => onNavigate('contact', 'Discussion for Future Project Roadmap')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3.5 px-6 rounded-2xl border border-white/20 backdrop-blur-md transition-all"
            >
              Schedule Technical Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {selectedProject.category} • {selectedProject.year}
              </span>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                {selectedProject.title}
              </h2>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Client: {selectedProject.client}
              </p>
            </div>

            <div className="h-48 rounded-2xl overflow-hidden bg-slate-800">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Overview & Architecture
              </h3>
              <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-medium">
                {selectedProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Key Deliverables & Milestones
              </h3>
              <ul className="space-y-2">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-950 dark:text-slate-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onNavigate('contact', `Proposal request for project similar to: ${title}`);
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md"
              >
                Request Custom Version
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Add Future Project
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Add upcoming projects to the MUCO Labs public portfolio roadmap.
              </p>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. AI-Powered Smart Hospital Portal"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="UI/UX & Branding">UI/UX & Branding</option>
                    <option value="Cloud & IT Consulting">Cloud & IT Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                    Status *
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="In Active Development">In Active Development</option>
                    <option value="Planned / Q3 2026">Planned / Q3 2026</option>
                    <option value="Completed & Live">Completed & Live</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Client / Industry *
                </label>
                <input
                  type="text"
                  required
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  placeholder="e.g. Healthcare Enterprise"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief summary of project scope, objectives, and deliverables..."
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  placeholder="React Native, Node.js, PostgreSQL"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md"
                >
                  Save Project To Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
