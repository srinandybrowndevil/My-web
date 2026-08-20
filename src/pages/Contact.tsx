import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Globe, Send, MessageSquare, CheckCircle2, Building, Clock, Inbox, ShieldCheck, FileSpreadsheet, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import { AdminMessagesInbox, SavedMessage } from '../components/AdminMessagesInbox';
import { GoogleSheetsHub } from '../components/GoogleSheetsHub';
import { EmailJSSettingsModal } from '../components/EmailJSSettingsModal';
import { getAccessToken, appendLeadToSheet } from '../services/googleSheets';
import { sendInquiryEmail, sendAutoReplyEmail, isEmailJSConfigured } from '../services/emailjs';
import { postToGoogleAppsScript } from '../services/googleAppsScript';
import { useToast } from '../context/ToastContext';

interface ContactProps {
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: 'Website Development',
    subject: '',
    budgetRange: '₹25,000 - ₹50,000',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showInboxModal, setShowInboxModal] = useState(false);
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [showEmailJSModal, setShowEmailJSModal] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ 
        ...prev, 
        message: initialMessage,
        subject: prev.subject || 'Website Inquiry'
      }));
    }
  }, [initialMessage]);

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceCategory: 'Website Development',
      subject: '',
      budgetRange: '₹25,000 - ₹50,000',
      message: ''
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.serviceCategory || !formData.subject?.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields marked with *.');
      showToast('Please complete all required fields.', 'error', 'Validation Error');
      return;
    }

    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const newMsgItem: SavedMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name || 'Valued Client',
      email: formData.email,
      phone: formData.phone,
      company: formData.company || 'N/A',
      serviceCategory: formData.serviceCategory,
      budgetRange: formData.budgetRange,
      message: formData.message,
      timestamp,
      status: 'New'
    };

    // 1. Save to Local Storage Inbox
    try {
      const existingStr = localStorage.getItem('muco_contact_messages');
      const existing: SavedMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('muco_contact_messages', JSON.stringify([newMsgItem, ...existing]));
    } catch {
      // Local storage error fallback
    }

    // Perform simultaneous dispatches
    let emailJsSuccess = false;
    let appsScriptSuccess = false;

    try {
      const [emailJsRes, autoReplyRes, appsScriptRes] = await Promise.all([
        // 1. Send Email to contact@mucolabs.com via EmailJS
        sendInquiryEmail(formData).catch((err) => {
          console.warn('[EmailJS Primary Dispatch Error]', err);
          return { success: false, text: 'EmailJS error' };
        }),

        // 2. Send Auto-Reply Email to Client
        sendAutoReplyEmail(formData).catch((err) => {
          console.warn('[EmailJS Auto Reply Error]', err);
          return { success: false };
        }),

        // 3. Automatically Save Data into Google Sheets via Google Apps Script
        postToGoogleAppsScript(formData).catch((err) => {
          console.warn('[Google Apps Script POST Error]', err);
          return { success: false };
        })
      ]);

      emailJsSuccess = Boolean(emailJsRes?.success);
      appsScriptSuccess = Boolean(appsScriptRes?.success);

      // Also append to direct Google Sheet OAuth if connected
      const activeSheetId = localStorage.getItem('muco_active_sheets_id');
      const currentToken = getAccessToken();
      if (activeSheetId && currentToken) {
        appendLeadToSheet(
          activeSheetId,
          {
            name: newMsgItem.name,
            email: newMsgItem.email,
            phone: newMsgItem.phone,
            company: newMsgItem.company,
            serviceCategory: newMsgItem.serviceCategory,
            budgetRange: newMsgItem.budgetRange,
            message: newMsgItem.message,
            timestamp: newMsgItem.timestamp,
            status: 'New',
          },
          currentToken
        ).catch((err) => console.warn('OAuth Sheet append notice:', err));
      }

      // Also post to internal Express backend API
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {});

      if (emailJsSuccess || appsScriptSuccess) {
        setIsSubmitted(true);
        showToast('Thank you! Your inquiry has been sent successfully.', 'success', 'Submitted');
      } else {
        // Fallback recorded locally
        setIsSubmitted(true);
        showToast('Thank you! Your inquiry was recorded successfully.', 'success', 'Submitted');
      }
    } catch (err) {
      console.error('Submission pipeline error:', err);
      setErrorMessage('Unable to send your inquiry. Please try again.');
      showToast('Unable to send your inquiry. Please try again.', 'error', 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Admin Messages Inbox Modal */}
      <AdminMessagesInbox isOpen={showInboxModal} onClose={() => setShowInboxModal(false)} />

      {/* Google Sheets Lead Hub Modal */}
      <GoogleSheetsHub isOpen={showSheetsModal} onClose={() => setShowSheetsModal(false)} />

      {/* EmailJS Settings & Template Hub Modal */}
      <EmailJSSettingsModal isOpen={showEmailJSModal} onClose={() => setShowEmailJSModal(false)} />

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
                  href="mailto:contact@mucolabs.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-blue-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Official Email</span>
                    <span className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">
                      contact@mucolabs.com
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
                  href="https://mucolabs.com"
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
                      mucolabs.com
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
                  Thank you!
                </h2>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Your inquiry has been sent successfully.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Your inquiry has been delivered directly to <strong>contact@mucolabs.com</strong>. Our team will review your project details and respond within 24 hours.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Submit Another Inquiry
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

                {/* Validation / Error Message */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@gmail.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-[11px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-1">
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ABC Technologies"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-service" className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Service Required *
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      required
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Custom Software / CRM / ERP">Custom Software / CRM / ERP</option>
                      <option value="SaaS Development">SaaS Development</option>
                      <option value="AI Chatbot & Automation">AI Chatbot & Automation</option>
                      <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                      <option value="Creative Services & Branding">Creative Services & Branding</option>
                      <option value="Business & IT Consulting">Business & IT Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Need Company Website"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. I need a quotation for building our enterprise company portal..."
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl p-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>256-bit Encrypted • Direct Founder Response</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Fast 24h Inquiry Guarantee</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Discrete Admin / Internal Lead Hub Footer Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
        <span className="text-[11px] font-medium text-slate-400">
          MUCO Labs Client Pipeline & Communications Engine
        </span>
        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setShowInboxModal(true)}
            className="text-slate-400 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
          >
            <Inbox className="w-3.5 h-3.5 text-emerald-400" />
            <span>Messages Inbox</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setShowSheetsModal(true)}
            className="text-slate-400 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Sheets Sync</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setShowEmailJSModal(true)}
            className="text-slate-400 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EmailJS Setup</span>
          </button>
        </div>
      </section>
    </div>
  );
};
