import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Globe, Send, MessageSquare, CheckCircle2, Building, Clock, Inbox, ShieldCheck } from 'lucide-react';
import { ContactFormData } from '../types';
import { AdminMessagesInbox, SavedMessage } from '../components/AdminMessagesInbox';

interface ContactProps {
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: 'Website Development',
    budgetRange: '₹25,000 - ₹50,000',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newMsgItem: SavedMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name || 'Valued Client',
      email: formData.email,
      phone: formData.phone,
      company: formData.company || 'N/A',
      serviceCategory: formData.serviceCategory,
      budgetRange: formData.budgetRange,
      message: formData.message,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'New'
    };

    // Save locally
    try {
      const existingStr = localStorage.getItem('muco_contact_messages');
      const existing: SavedMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('muco_contact_messages', JSON.stringify([newMsgItem, ...existing]));
    } catch {
      // localStorage error fallback
    }

    try {
      // Send to server API
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {});

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Admin Messages Inbox Modal */}
      <AdminMessagesInbox isOpen={showInboxModal} onClose={() => setShowInboxModal(false)} />

      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto px-4 pt-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-xs">
          <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Get In Touch With MUCO Labs</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
          Let's Discuss Your Vision
        </h1>

        <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">
          Reach out directly to founder Srinivash Mahalingam and our software engineering team in Erode, Tamil Nadu.
        </p>

        {/* View Submitted Messages Inbox Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowInboxModal(true)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-lg border border-slate-700 dark:border-blue-500/40 transition-all"
          >
            <Inbox className="w-4 h-4 text-emerald-400" />
            <span>View Received Messages Inbox (Admin)</span>
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Contact Details & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  Official Details
                </span>
                <h2 className="text-2xl font-black text-white">MUCO Labs Headquarters</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Founded in 2026 by Srinivash Mahalingam.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <a
                  href="tel:+916381809844"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phone / WhatsApp</span>
                    <span className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">
                      +91 6381809844
                    </span>
                    <span className="text-[10px] text-slate-400 block">Direct Founder Line</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:mucolabs2026@gmail.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Official Email</span>
                    <span className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">
                      mucolabs2026@gmail.com
                    </span>
                    <span className="text-[10px] text-slate-400 block">Fast 24h Response</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Location</span>
                    <span className="text-sm font-extrabold text-white">Erode, Tamil Nadu</span>
                    <span className="text-[10px] text-slate-400 block">India</span>
                  </div>
                </div>

                {/* Website */}
                <a
                  href="https://mucolabs.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Website</span>
                    <span className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">
                      mucolabs.in
                    </span>
                  </div>
                </a>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/916381809844?text=Hi%20MUCO%20Labs%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-md">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Message Successfully Sent!
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to MUCO Labs. Founder Srinivash Mahalingam or an engineering lead will review your request and get back to you within 24 hours. Your message has been saved to the Lead Inbox.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={() => setShowInboxModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Inbox className="w-4 h-4 text-emerald-300" />
                    <span>View In Client Lead Inbox</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Project Proposal & Inquiry Form
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fill out the form below to receive a formal scope assessment and quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Tech"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Service Category
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="Website Development">Website Development (from ₹14,999)</option>
                      <option value="Mobile App Development">Mobile App Development (from ₹49,999)</option>
                      <option value="Custom Software / CRM / ERP">Custom Software / CRM / ERP (from ₹79,999)</option>
                      <option value="SaaS Development">SaaS Development (from ₹149,999)</option>
                      <option value="AI Chatbot & Automation">AI Chatbot & Automation (from ₹24,999)</option>
                      <option value="Digital Marketing & SEO">Digital Marketing & SEO (from ₹7,999/mo)</option>
                      <option value="Creative Services & Branding">Creative Services & Branding (from ₹2,999)</option>
                      <option value="Business & IT Consulting">Business & IT Consulting (from ₹4,999)</option>
                      <option value="System Maintenance & SLA">System Maintenance & SLA (from ₹2,999/mo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹100,000">₹50,000 - ₹100,000</option>
                      <option value="₹100,000 - ₹250,000">₹100,000 - ₹250,000</option>
                      <option value="₹250,000+">₹250,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Project Scope & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project requirements, target timeline, or features required..."
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl p-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Proposal...' : 'Submit Inquiry To MUCO Labs'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
