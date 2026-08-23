import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../types';
import { CORE_SERVICES, DetailedService } from '../data/servicesData';
import { DynamicIcon } from '../components/DynamicIcon';
import { ServiceQuickView } from '../components/ServiceQuickView';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProjectDeliveryRoadmap } from '../components/ProjectDeliveryRoadmap';
import { RoiCalculator } from '../components/RoiCalculator';
import { ArrowRight, CheckCircle2, Sparkles, Layers, Eye, MessageCircle, GraduationCap } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { ServicesSkeleton } from '../components/skeletons/ServicesSkeleton';
import { MoseyRoleSelector } from '../components/MoseyRoleSelector';
import { useUserRole } from '../context/RoleContext';

interface ServicesProps {
  onNavigate: (page: PageId, customMsg?: string) => void;
  isLoading?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, isLoading = false }) => {
  const [selectedService, setSelectedService] = useState<DetailedService | null>(null);

  if (isLoading) {
    return <ServicesSkeleton />;
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Top Breadcrumb Trail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          currentPage="services"
          subItem={selectedService ? selectedService.title : undefined}
          onNavigate={onNavigate}
        />
      </div>

      {/* Service Quick View Modal */}
      <ServiceQuickView
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto px-4 space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs mb-4">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Full-Spectrum Technology & Digital Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Services & Technical Expertise
        </h1>
        <p className="text-sm sm:text-base text-slate-900 dark:text-slate-200 mt-3 leading-relaxed font-medium">
          From custom software architecture and AI chatbots to search engine optimization and corporate branding, MUCO Labs delivers end-to-end digital capabilities.
        </p>

        {/* Way2Me Academy Courses Discovery Banner */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-indigo-900/40 via-blue-900/40 to-slate-900/60 border border-indigo-500/30 px-5 py-3 rounded-2xl text-left shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">Want to learn and build these solutions yourself?</span>
            <span className="text-slate-300">All services are taught as practical masterclasses with 1-on-1 mentorship by Way2Me Founder Yogaharikaran.</span>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="sm:ml-auto whitespace-nowrap px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.section>

      {/* Services List - Scroll Triggered Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {CORE_SERVICES.map((srv, index) => (
          <motion.div
            key={srv.id}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: index % 2 === 0 ? 0 : 0.08,
              ease: [0.21, 0.45, 0.27, 0.9],
            }}
            whileHover={{ y: -4 }}
            className="glass-morphism-card glass-card-hover rounded-3xl p-6 sm:p-8 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-4">
                <div
                  onClick={() => setSelectedService(srv)}
                  className="flex items-center gap-3 cursor-pointer group/title"
                  title="Click to view full summary"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover/title:bg-cyan-500 transition-colors">
                    <DynamicIcon name={srv.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      {srv.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover/title:text-cyan-500 transition-colors">
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {srv.tagline}
                </p>

                <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-normal">
                  {srv.description}
                </p>

                {/* Tech Chips */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-2">
                    Technologies Used:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Deliverables & Pricing */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider mb-3">
                    Key Deliverables:
                  </h3>
                  <ul className="space-y-2">
                    {srv.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-950 dark:text-slate-100 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Starting Rates</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {srv.startingPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedService(srv)}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-extrabold text-xs py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
                      title="Quick summary view"
                    >
                      <Eye className="w-4 h-4 text-cyan-500" />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={() => openWhatsApp({ serviceName: srv.title })}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl shadow-md transition-all"
                      title={`Inquire about ${srv.title} via WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => onNavigate('pricing')}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3.5 rounded-xl shadow-md transition-all"
                    >
                      <span>Pricing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 4-Stage Project Delivery Roadmap */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <ProjectDeliveryRoadmap onNavigate={onNavigate} />
      </motion.section>

      {/* AI Automation ROI Estimator */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <RoiCalculator onNavigateToContact={(msg) => onNavigate('contact', msg)} />
      </motion.section>

      {/* Direct Google Sheets Lead Capture Form */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <LeadCaptureForm
          defaultService="Website Development"
          title="Direct Lead Capture & Proposal Request"
          subtitle="Submit your project details below. Leads are instantly logged to Google Sheets and our team will prepare a formal estimate."
        />
      </motion.section>

      {/* CTA section with scroll reveal */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">
            Need a Custom Architecture or Enterprise Consultation?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Discuss your exact project requirements directly with founder Srinivash Mahalingam (+91 6381809844).
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
