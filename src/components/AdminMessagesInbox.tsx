import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Trash2, CheckCircle, Search, Clock, User, Phone, Building, DollarSign, X, ExternalLink, ShieldCheck, Inbox, Download, FileSpreadsheet, Zap, TrendingUp, Activity } from 'lucide-react';
import { GoogleSheetsHub } from './GoogleSheetsHub';
import { PerformanceTrendsDashboard } from './PerformanceTrendsDashboard';
import { getPerformanceAverages } from '../services/analytics';

export interface SavedMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceCategory: string;
  budgetRange: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Closed';
}

interface AdminMessagesInboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminMessagesInbox: React.FC<AdminMessagesInboxProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'performance'>('inbox');
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedMessage, setSelectedMessage] = useState<SavedMessage | null>(null);
  const [showSheetsModal, setShowSheetsModal] = useState<boolean>(false);
  const [perfSummary, setPerfSummary] = useState(getPerformanceAverages());

  useEffect(() => {
    if (isOpen) {
      setPerfSummary(getPerformanceAverages());
    }
  }, [isOpen, activeTab]);

  const handleExportCSV = () => {
    if (!messages || messages.length === 0) return;
    const headers = ['ID', 'Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service Category', 'Budget Range', 'Message', 'Status'];
    const rows = messages.map(m => [
      m.id,
      `"${(m.timestamp || '').replace(/"/g, '""')}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${(m.company || '').replace(/"/g, '""')}"`,
      `"${(m.serviceCategory || '').replace(/"/g, '""')}"`,
      `"${(m.budgetRange || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${(m.status || 'New').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MUCO_Labs_Client_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      // 1. Fetch from server API
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          // Merge with local storage if any local messages exist
          const localStr = localStorage.getItem('muco_contact_messages');
          let localMsgs: SavedMessage[] = [];
          if (localStr) {
            try {
              localMsgs = JSON.parse(localStr);
            } catch {
              localMsgs = [];
            }
          }

          // Combine and deduplicate by ID
          const combined = [...data.messages];
          localMsgs.forEach((lm) => {
            if (!combined.some((c) => c.id === lm.id)) {
              combined.push(lm);
            }
          });

          setMessages(combined);
          localStorage.setItem('muco_contact_messages', JSON.stringify(combined));
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback to localStorage if API endpoint fails
    }

    const localStr = localStorage.getItem('muco_contact_messages');
    if (localStr) {
      try {
        setMessages(JSON.parse(localStr));
      } catch {
        setMessages([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/contact/messages/${id}`, { method: 'DELETE' });
    } catch {
      // ignore server error
    }

    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem('muco_contact_messages', JSON.stringify(updated));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.map((m) => {
      if (m.id === id) {
        const newStatus = m.status === 'New' ? ('Contacted' as const) : m.status === 'Contacted' ? ('Closed' as const) : ('New' as const);
        return { ...m, status: newStatus };
      }
      return m;
    });

    setMessages(updated);
    localStorage.setItem('muco_contact_messages', JSON.stringify(updated));
    if (selectedMessage?.id === id) {
      const current = updated.find((m) => m.id === id);
      if (current) setSelectedMessage(current);
    }
  };

  if (!isOpen) return null;

  const filtered = messages.filter((m) => {
    const matchesFilter = filterStatus === 'All' || m.status === filterStatus;
    const matchesSearch =
      !search.trim() ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.toLowerCase().includes(search.toLowerCase()) ||
      m.serviceCategory.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] flex flex-col justify-between relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              {activeTab === 'inbox' ? <Inbox className="w-5 h-5" /> : <Zap className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  {activeTab === 'inbox' ? 'Client Lead Inbox' : 'Performance & Web Vitals Trends'}
                </h2>
                {activeTab === 'inbox' ? (
                  <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
                    Admin Messages ({messages.length})
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {perfSummary.goodPercentage}% Good Vitals
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {activeTab === 'inbox'
                  ? 'Direct inquiries sent to Founder Srinivash Mahalingam & MUCO Labs team.'
                  : 'Real-time First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Layout Shift (CLS) logs.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeTab === 'inbox' && (
              <>
                <button
                  onClick={handleExportCSV}
                  disabled={messages.length === 0}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Export all client leads to a CSV file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowSheetsModal(true)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  title="Open Google Sheets Hub to sync lead data"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Google Sheets Sync</span>
                </button>

                <button
                  onClick={fetchMessages}
                  disabled={loading}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                  title="Refresh Messages"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Client Leads ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'performance'
                ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Performance & Web Vitals Trends</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 text-amber-300 border border-amber-500/30">
              {perfSummary.goodPercentage}% Good
            </span>
          </button>
        </div>

        {activeTab === 'performance' ? (
          <div className="flex-1 overflow-y-auto pr-1 min-h-[350px]">
            <PerformanceTrendsDashboard />
          </div>
        ) : (
          <>
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads by name, email, phone..."
                  className="w-full bg-slate-800/80 text-white font-medium text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                {['All', 'New', 'Contacted', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      filterStatus === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[300px]">
              {filtered.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-slate-800/40 rounded-2xl border border-slate-800">
                  <Mail className="w-10 h-10 text-slate-500 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-300">No received messages found</h3>
                  <p className="text-xs text-slate-500">
                    Any inquiry submitted through the Contact page form will appear here in real time.
                  </p>
                </div>
              ) : (
                filtered.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      selectedMessage?.id === msg.id
                        ? 'bg-blue-950/40 border-blue-500/60 shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-sm text-white">{msg.name}</span>
                        {msg.company && (
                          <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold">
                            {msg.company}
                          </span>
                        )}
                        <span
                          onClick={(e) => handleToggleStatus(msg.id, e)}
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            msg.status === 'New'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : msg.status === 'Contacted'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-blue-400" />
                          {msg.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          {msg.phone}
                        </span>
                        <span className="text-amber-400 font-semibold">{msg.serviceCategory}</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        "{msg.message}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 border-t md:border-t-0 border-slate-700/50 pt-2 md:pt-0">
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.timestamp}
                      </span>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(msg.name)}%2C%20thank%20you%20for%20contacting%20MUCO%20Labs!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={(e) => handleDelete(msg.id, e)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Delete lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Lead Processing • MUCO Labs Internal Dashboard</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              disabled={messages.length === 0}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition-all"
            >
              Close Inbox
            </button>
          </div>
        </div>
      </div>

      <GoogleSheetsHub isOpen={showSheetsModal} onClose={() => setShowSheetsModal(false)} />
    </div>
  );
};
