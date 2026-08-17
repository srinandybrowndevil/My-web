import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Video, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { PageId } from '../types';
import { openWhatsApp } from '../utils/whatsapp';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: PageId;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
  currentPage
}) => {
  // Calendar states
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  const [callTopic, setCallTopic] = useState<string>(
    currentPage === 'pricing' 
      ? 'Pricing & Project Estimate Scoping'
      : currentPage === 'services'
      ? 'Custom Software Architecture Review'
      : 'Initial 15-Minute Founder Discovery'
  );

  // Form info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Generate the next 7 available business days
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i === 0 ? 1 : i + 1)); // start tomorrow
    return {
      dateObj: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDateStr: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    };
  });

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:15 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 600);
  };

  const handleLaunchWhatsAppConfirmed = () => {
    const selectedDate = availableDates[selectedDateIndex]?.fullDateStr || 'Upcoming Business Day';
    openWhatsApp({
      pageName: 'Scheduled 15m Discovery Call',
      serviceName: callTopic,
      customMessage: `Hi Srinivash! I scheduled a 15-minute Founder Call on ${selectedDate} at ${selectedTimeSlot} (${callTopic}). My contact info: ${name} (${email}, ${phone || 'N/A'}).`
    });
    onClose();
    setIsBooked(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/40 overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                      Schedule 15-Min Discovery Call
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Live Calendar
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Direct technical consultation with Founder <strong>Srinivash M.</strong> via Google Meet / Zoom
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {!isBooked ? (
              <form onSubmit={handleBooking} className="space-y-6">
                {/* 1. Date Selector Track */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-cyan-500" />
                    <span>1. Select Date (Upcoming Available Days)</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableDates.map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          selectedDateIndex === idx
                            ? 'bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-md ring-2 ring-cyan-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className="block text-[10px] font-bold uppercase">{item.dayName}</span>
                        <span className="block text-base font-black my-0.5">{item.dayNumber}</span>
                        <span className="block text-[9px] text-slate-400">{item.monthName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Time Slot Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" />
                      <span>2. Choose 15-Minute Time Slot</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">Timezone: IST (UTC+5:30)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          selectedTimeSlot === slot
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Clock className="w-3 h-3 opacity-60" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Call Topic & Meeting Type */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>3. Primary Agenda / Topic</span>
                  </label>
                  <select
                    value={callTopic}
                    onChange={(e) => setCallTopic(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="Initial 15-Minute Founder Discovery">Initial 15-Minute Founder Discovery</option>
                    <option value="Pricing & Project Estimate Scoping">Pricing & Project Estimate Scoping</option>
                    <option value="Custom Software Architecture Review">Custom Software Architecture Review</option>
                    <option value="AI Chatbot & Automation Feasibility">AI Chatbot & Automation Feasibility</option>
                    <option value="Mobile App (Android/iOS) Launch Strategy">Mobile App (Android/iOS) Launch Strategy</option>
                    <option value="Enterprise AMC & Cloud Maintenance">Enterprise AMC & Cloud Maintenance</option>
                  </select>
                </div>

                {/* 4. Attendee Details */}
                <div className="space-y-3 pt-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-500" />
                    <span>4. Your Contact Information</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name *"
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work / Personal Email *"
                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="WhatsApp / Phone Number (Optional, for instant SMS reminder)"
                      className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <Video className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Google Meet link dispatched automatically</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Confirming Slot...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm 15m Discovery Call</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success / Confirmed Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    15-Minute Discovery Call Confirmed!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    We have reserved your slot with Founder <strong>Srinivash M.</strong> for:
                  </p>
                </div>

                {/* Booking Summary Ticket */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Date & Time:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {availableDates[selectedDateIndex]?.fullDateStr} @ {selectedTimeSlot} IST
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Agenda:</span>
                    <strong className="text-slate-900 dark:text-white font-medium">{callTopic}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Attendee:</span>
                    <strong className="text-slate-900 dark:text-white font-medium">{name} ({email})</strong>
                  </div>
                </div>

                {/* Immediate WhatsApp Connect Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleLaunchWhatsAppConfirmed}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Open in WhatsApp for Fast Pre-Briefing</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsBooked(false);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
