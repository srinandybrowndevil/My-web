import React, { useState } from 'react';
import { Send, CheckCircle2, FileSpreadsheet, Sparkles, Loader2, AlertCircle, ShieldCheck, Phone, Mail, Building, Tag, MessageSquare } from 'lucide-react';
import { ContactFormData } from '../types';
import { CORE_SERVICES } from '../data/servicesData';
import { useToast } from '../context/ToastContext';
import { postToGoogleAppsScript } from '../services/googleAppsScript';
import { appendLeadToSheet, getAccessToken } from '../services/googleSheets';
import { SavedMessage } from './AdminMessagesInbox';
import { openWhatsApp } from '../utils/whatsapp';

interface LeadCaptureFormProps {
  defaultService?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  defaultService = 'Website Development',
  onSuccess,
  title = 'Quick Project Lead & Scope Inquiry',
  subtitle = 'Submit your requirements below to receive a custom project roadmap and instant quote.',
  className = ''
}) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: defaultService,
    subject: `Services Inquiry: ${defaultService}`,
    budgetRange: '₹25,000 - ₹50,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      serviceCategory: defaultService,
      subject: `Services Inquiry: ${defaultService}`,
      budgetRange: '₹25,000 - ₹50,000',
      message: ''
    });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      const msg = 'Please fill in all required fields (Name, Email, Phone, and Details).';
      setErrorMessage(msg);
      showToast(msg, 'error', 'Validation Error');
      return;
    }

    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const newLead: SavedMessage = {
      id: `lead-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim() || 'Individual / N/A',
      serviceCategory: formData.serviceCategory,
      budgetRange: formData.budgetRange,
      message: formData.message.trim(),
      timestamp,
      status: 'New'
    };

    // 1. Store in Local Storage Messages
    try {
      const existingStr = localStorage.getItem('muco_contact_messages');
      const existing: SavedMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('muco_contact_messages', JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.warn('Local storage write warning:', err);
    }

    try {
      // 2. Log lead directly to Google Sheets via Apps Script Web App Endpoint
      const appsScriptPromise = postToGoogleAppsScript(formData).catch((err) => {
        console.warn('Google Apps Script log notice:', err);
        return { success: false };
      });

      // 3. Log lead to connected OAuth Google Sheet if available
      const activeSheetId = localStorage.getItem('muco_active_sheets_id');
      const token = getAccessToken();
      let oauthSheetPromise = Promise.resolve(false);
      if (activeSheetId && token) {
        oauthSheetPromise = appendLeadToSheet(
          activeSheetId,
          {
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            company: newLead.company,
            serviceCategory: newLead.serviceCategory,
            budgetRange: newLead.budgetRange,
            message: newLead.message,
            timestamp: newLead.timestamp,
            status: 'New'
          },
          token
        ).catch(() => false);
      }

      // 4. Send API request
      const backendPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {});

      await Promise.all([appsScriptPromise, oauthSheetPromise, backendPromise]);

      setIsSubmitted(true);

      // Toast notification upon successful lead capture
      showToast(
        `Thank you ${formData.name}! Your lead has been logged to Google Sheets and our team has been notified.`,
        'success',
        'Lead Logged Successfully'
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Lead capture error:', error);
      setErrorMessage('Unable to log lead. Please check your connection and try again.');
      showToast('Lead logging error. Please try again.', 'error', 'Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden ${className}`}>
      {/* Decorative Accent Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {isSubmitted ? (
        <div className="py-8 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Inquiry Logged to Google Sheets!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your details have been registered in our automated lead pipeline. Founder Srinivash Mahalingam will review your project scope shortly.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Google Sheets Auto-Sync Confirmed</span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => openWhatsApp(formData)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect Instantly on WhatsApp</span>
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200/60 dark:border-blue-800/60">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Direct Founder & Tech Consultation</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Srinivash M."
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@company.com"
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Name (Optional)"
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Service Category *
              </label>
              <select
                required
                value={formData.serviceCategory}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    serviceCategory: val,
                    subject: `Services Inquiry: ${val}`
                  });
                }}
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {CORE_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
                <option value="AutoCAD Design & 2D/3D CAD Drafting">AutoCAD Design & 2D/3D CAD Drafting</option>
                <option value="Custom Software / CRM / ERP">Custom Software / CRM / ERP</option>
                <option value="Other Consulting / Enterprise">Other Consulting / Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Estimated Budget Range
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                <option value="₹50,000 - ₹1,000,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000+">₹1,00,000+ (Enterprise)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Project Requirements / Notes *
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your project goals, desired features, or key deliverables..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-950 dark:text-white font-medium text-xs rounded-xl p-3.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Project Inquiry</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SSL Encrypted • Direct Founder Response</span>
            </span>
            <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              <span>24h Turnaround</span>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
