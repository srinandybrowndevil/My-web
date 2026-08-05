import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEAM_MEMBERS, GALLERY_ITEMS, GalleryItem, TeamMember } from '../data/galleryData';
import { PageId } from '../types';
import { updateMemberSEO } from '../utils/seo';
import { useToast } from '../context/ToastContext';
import { 
  Users, 
  Award, 
  Crown, 
  CheckCircle2, 
  Share2, 
  Check, 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Briefcase, 
  Phone, 
  Mail, 
  Building2, 
  Maximize2,
  Tag
} from 'lucide-react';

interface GalleryProps {
  onNavigate?: (page: PageId, msg?: string) => void;
}

// Official Brand SVGs
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
  </svg>
);

const XTwitterIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const MailIconSVG: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const [copiedMemberId, setCopiedMemberId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'team' | 'hq_photos'>('team');
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null);

  const departments = ['All', 'Leadership', 'Engineering & Design', 'Marketing & Growth', 'Finance & Operations'];

  const handleInspectMember = (member: TeamMember) => {
    setActiveMember(member);
    updateMemberSEO(member);
    showToast(
      `Profile loaded for ${member.name} (${member.titleRole}). Open Graph meta tags injected!`,
      'info',
      'Profile Active'
    );
  };

  const handleShareMember = (e: React.MouseEvent, member: TeamMember) => {
    e.stopPropagation();
    updateMemberSEO(member);
    const profileUrl = `${window.location.origin}/#gallery?member=${encodeURIComponent(member.id)}`;
    navigator.clipboard.writeText(profileUrl);
    setCopiedMemberId(member.id);
    setTimeout(() => setCopiedMemberId(null), 2500);

    showToast(
      `Profile link & Open Graph meta snippet generated for ${member.name}! Link copied to clipboard.`,
      'success',
      'OG Snippet Generated'
    );
  };

  // Helper to check if a social link is active (not empty and not '#')
  const isSocialActive = (url?: string) => {
    return !!url && url.trim() !== '' && url.trim() !== '#';
  };

  // Filter team members by department & search query
  const filteredTeam = TEAM_MEMBERS.filter((member) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      member.name.toLowerCase().includes(q) ||
      member.titleRole.toLowerCase().includes(q) ||
      member.bio.toLowerCase().includes(q) ||
      member.skills.some((skill) => skill.toLowerCase().includes(q));

    let matchesDept = true;
    if (selectedDepartment === 'Leadership') {
      matchesDept = member.isFounder || member.titleRole.includes('Advisor') || member.titleRole.includes('Chairman');
    } else if (selectedDepartment === 'Engineering & Design') {
      matchesDept = member.titleRole.includes('Developer') || member.titleRole.includes('AutoCAD') || member.skills.some((s) => s.includes('Full-Stack') || s.includes('Architecture'));
    } else if (selectedDepartment === 'Marketing & Growth') {
      matchesDept = member.titleRole.includes('Marketing') || member.titleRole.includes('Digital');
    } else if (selectedDepartment === 'Finance & Operations') {
      matchesDept = member.titleRole.includes('Accounts') || member.titleRole.includes('Telecalling') || member.titleRole.includes('Resource');
    }

    return matchesSearch && matchesDept;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-6 sm:pt-10 space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-cyan-400 font-extrabold text-xs shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span>MUCO Labs Roster • Innovation & Leadership</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600">Our Team</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          The software architects, engineering leads, digital strategists, and executive leaders driving enterprise-grade innovation at MUCO Labs.
        </p>

        {/* View Switcher: Our Team vs HQ Photo Archives */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={() => setViewMode('team')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              viewMode === 'team'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Directory ({TEAM_MEMBERS.length})</span>
          </button>

          <button
            onClick={() => setViewMode('hq_photos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              viewMode === 'hq_photos'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>HQ & Lab Gallery ({GALLERY_ITEMS.length})</span>
          </button>
        </div>
      </section>

      {/* VIEW MODE 1: OUR TEAM */}
      {viewMode === 'team' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar: Search & Department Filters */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, role, skill tag..."
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium text-xs rounded-xl pl-10 pr-8 py-2.5 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Department Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none w-full lg:w-auto">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/25 font-black'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Team Cards Grid */}
          {filteredTeam.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No team members match your criteria</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">
                Try resetting your search query or selecting a different department filter.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredTeam.map((member) => {
                const linkedinUrl = member.socialLinks?.linkedin;
                const twitterUrl = member.socialLinks?.twitter;
                const emailUrl = member.socialLinks?.email;

                const hasLinkedin = isSocialActive(linkedinUrl);
                const hasTwitter = isSocialActive(twitterUrl);
                const hasEmail = isSocialActive(emailUrl);

                return (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-blue-500/50 relative overflow-hidden"
                  >
                    {/* Founder / Leader Background Highlight */}
                    {member.isFounder && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    )}

                    <div className="space-y-4">
                      {/* Top Header: Badge Tag & Share OG button */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm ${
                            member.isFounder
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {member.isFounder ? (
                            <Crown className="w-3 h-3 text-white" />
                          ) : (
                            <Award className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                          )}
                          <span>{member.badgeTag}</span>
                        </span>

                        <button
                          onClick={(e) => handleShareMember(e, member)}
                          title="Copy direct profile link & Open Graph meta snippet"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          {copiedMemberId === member.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3 h-3" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Member Photo & Core Info */}
                      <div className="flex items-start gap-4 pt-1">
                        <div className="relative shrink-0">
                          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700/80 group-hover:border-blue-500/50 transition-colors shadow-md bg-slate-950 w-24 h-28 sm:w-26 sm:h-32">
                            <img
                              src={member.image}
                              alt={member.name}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                              }}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-xs font-extrabold text-blue-600 dark:text-cyan-400 leading-tight">
                            {member.titleRole}
                          </p>
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-0.5">
                            {member.affiliation}
                          </p>
                        </div>
                      </div>

                      {/* Bio Paragraph */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                        "{member.bio}"
                      </p>

                      {/* Skills (Technology Tags) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                          Skills & Technology:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-bold text-[10px] px-2.5 py-1 rounded-lg border border-slate-200/90 dark:border-slate-700/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Social Media Icons (LinkedIn, X, Email) & Inspect Action */}
                    <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                      {/* Social Media Row */}
                      <div className="flex items-center gap-2">
                        {/* LinkedIn */}
                        {hasLinkedin ? (
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`LinkedIn Profile - ${member.name}`}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all duration-300 shadow-sm hover:scale-105"
                          >
                            <LinkedInIcon className="w-4 h-4" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              LinkedIn Profile
                            </span>
                          </a>
                        ) : (
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/60 dark:border-slate-800 opacity-50 cursor-not-allowed"
                          >
                            <LinkedInIcon className="w-4 h-4" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              Profile will be added soon
                            </span>
                          </button>
                        )}

                        {/* X (Twitter) */}
                        {hasTwitter ? (
                          <a
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`X Profile - ${member.name}`}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all duration-300 shadow-sm hover:scale-105"
                          >
                            <XTwitterIcon className="w-3.5 h-3.5" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              X Profile
                            </span>
                          </a>
                        ) : (
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/60 dark:border-slate-800 opacity-50 cursor-not-allowed"
                          >
                            <XTwitterIcon className="w-3.5 h-3.5" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              Profile will be added soon
                            </span>
                          </button>
                        )}

                        {/* Email */}
                        {hasEmail ? (
                          <a
                            href={emailUrl?.startsWith('mailto:') ? emailUrl : `mailto:${emailUrl}`}
                            title={`Email ${member.name}`}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all duration-300 shadow-sm hover:scale-105"
                          >
                            <MailIconSVG className="w-4 h-4" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              Send Email
                            </span>
                          </a>
                        ) : (
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="relative group/tooltip flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/60 dark:border-slate-800 opacity-50 cursor-not-allowed"
                          >
                            <MailIconSVG className="w-4 h-4" />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg pointer-events-none z-20">
                              Profile will be added soon
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Inspect Details Trigger */}
                      <button
                        onClick={() => handleInspectMember(member)}
                        className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Join Our Team CTA Box */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 border border-blue-500/30 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-500/30">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Careers & Tech Collaborations</span>
              </span>
              <h3 className="text-2xl font-black">Want to build the future with MUCO Labs?</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                We are constantly looking for talented full-stack engineers, AI researchers, UI/UX designers, and growth partners. Explore open positions or reach out directly to our leadership team.
              </p>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('contact', 'Career Application / Tech Collaboration Inquiry')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 shrink-0 flex items-center gap-2"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* VIEW MODE 2: HQ & LAB PHOTO GALLERY */}
      {viewMode === 'hq_photos' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryItem(item)}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 p-2 bg-slate-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{item.location}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MEMBER DETAILS MODAL */}
      <AnimatePresence>
        {activeMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveMember(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                    {activeMember.badgeTag}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {activeMember.name}
                  </h2>
                  <p className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                    {activeMember.titleRole}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {activeMember.affiliation}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                "{activeMember.bio}"
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Core Mandate & Key Responsibilities:
                </h4>
                <div className="space-y-1.5">
                  {activeMember.keyResponsibilities.map((resp, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Technology & Skill Matrix:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeMember.skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={(e) => handleShareMember(e, activeMember)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>Share OG Profile Link</span>
                </button>

                {onNavigate && (
                  <button
                    onClick={() => {
                      setActiveMember(null);
                      onNavigate('contact', `Direct Inquiry regarding ${activeMember.name} (${activeMember.titleRole})`);
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Send Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY PHOTO INSPECT MODAL */}
      <AnimatePresence>
        {activeGalleryItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden max-w-2xl w-full shadow-2xl relative"
            >
              <button
                onClick={() => setActiveGalleryItem(null)}
                className="absolute top-4 right-4 z-10 p-2 text-white bg-slate-950/60 hover:bg-slate-950 rounded-full backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-80 bg-slate-950">
                <img
                  src={activeGalleryItem.image}
                  alt={activeGalleryItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-cyan-400">
                  <span>{activeGalleryItem.category}</span>
                  <span>{activeGalleryItem.date} • {activeGalleryItem.location}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeGalleryItem.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeGalleryItem.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeGalleryItem.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
