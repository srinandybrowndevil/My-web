import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../utils/googleAuth';
import { 
  listSpreadsheets, 
  createSpreadsheet, 
  getSpreadsheetValues, 
  appendSpreadsheetValues, 
  DriveFile, 
  SheetGridData,
  SpreadsheetDetails
} from '../utils/googleSheets';
import { 
  FileSpreadsheet, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Table, 
  Sparkles, 
  Send, 
  Layers, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { LuxurySpinner } from '../components/LuxurySpinner';
import { useToast } from '../context/ToastContext';

export const GoogleSheetsManager: React.FC = () => {
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  
  const [spreadsheets, setSpreadsheets] = useState<DriveFile[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string | null>(null);
  const [selectedSheetMeta, setSelectedSheetMeta] = useState<DriveFile | null>(null);
  
  const [sheetData, setSheetData] = useState<SheetGridData | null>(null);
  const [isLoadingSheets, setIsLoadingSheets] = useState<boolean>(false);
  const [isLoadingValues, setIsLoadingValues] = useState<boolean>(false);
  
  const [newSheetTitle, setNewSheetTitle] = useState<string>('MUCO Labs - Client Inquiries & Quotes');
  const [isCreatingSheet, setIsCreatingSheet] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New Row Input State
  const [newRowName, setNewRowName] = useState<string>('');
  const [newRowEmail, setNewRowEmail] = useState<string>('');
  const [newRowPhone, setNewRowPhone] = useState<string>('');
  const [newRowCategory, setNewRowCategory] = useState<string>('Web Application');
  const [newRowBudget, setNewRowBudget] = useState<string>('₹50,000 - ₹1,50,000');
  const [newRowMessage, setNewRowMessage] = useState<string>('');
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: 'create_sheet' | 'add_row';
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionType: 'add_row',
  });

  useEffect(() => {
    const unsubscribe = initAuth(
      (currUser, token) => {
        setUser(currUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch spreadsheets when authenticated
  useEffect(() => {
    if (accessToken && !needsAuth) {
      fetchUserSpreadsheets(accessToken);
    }
  }, [accessToken, needsAuth]);

  // Fetch sheet values when a spreadsheet is selected
  useEffect(() => {
    if (accessToken && selectedSheetId) {
      loadSheetValues(accessToken, selectedSheetId);
    }
  }, [selectedSheetId, accessToken]);

  const fetchUserSpreadsheets = async (token: string) => {
    setIsLoadingSheets(true);
    try {
      const files = await listSpreadsheets(token);
      setSpreadsheets(files);
      if (files.length > 0 && !selectedSheetId) {
        setSelectedSheetId(files[0].id);
        setSelectedSheetMeta(files[0]);
      }
    } catch (err: any) {
      console.error('Failed to fetch spreadsheets:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Could not load spreadsheets from Drive.' });
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const loadSheetValues = async (token: string, sheetId: string) => {
    setIsLoadingValues(true);
    setStatusMessage(null);
    try {
      const data = await getSpreadsheetValues(token, sheetId, 'Sheet1!A1:Z100');
      setSheetData(data);
    } catch (err: any) {
      console.error('Failed to load sheet values:', err);
      setStatusMessage({ type: 'error', text: 'Error reading sheet data. Ensure the spreadsheet contains valid ranges.' });
    } finally {
      setIsLoadingValues(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
        setStatusMessage({ type: 'success', text: `Successfully authenticated as ${result.user.email}` });
        showToast(`Connected to Google Account (${result.user.email})`, 'success', 'Google Auth Success');
        fetchUserSpreadsheets(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Sign in failed. Please try again.' });
      showToast(err.message || 'Google authentication failed', 'error', 'Auth Failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
    setSheetData(null);
    setSpreadsheets([]);
    setSelectedSheetId(null);
    setStatusMessage({ type: 'info', text: 'Signed out of Google Account.' });
    showToast('Signed out of Google Account', 'info', 'Disconnected');
  };

  // Request Confirmation for Creating Sheet
  const requestCreateSheetConfirmation = () => {
    if (!newSheetTitle.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid spreadsheet title.' });
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: 'Create New Google Spreadsheet',
      description: `Create "${newSheetTitle}" in your Google Drive with formatted headers for client inquiries?`,
      actionType: 'create_sheet',
    });
  };

  // Execute Create Sheet after user confirmation
  const executeCreateSheet = async () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    if (!accessToken) return;

    setIsCreatingSheet(true);
    setStatusMessage(null);
    try {
      const newSheet: SpreadsheetDetails = await createSpreadsheet(accessToken, newSheetTitle);
      setStatusMessage({
        type: 'success',
        text: `Spreadsheet "${newSheetTitle}" created successfully!`,
      });
      showToast(`Created spreadsheet "${newSheetTitle}" in Google Drive`, 'success', 'Sheet Created');
      // Refresh spreadsheet list
      await fetchUserSpreadsheets(accessToken);
      setSelectedSheetId(newSheet.spreadsheetId);
    } catch (err: any) {
      console.error('Error creating spreadsheet:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to create spreadsheet.' });
      showToast(err.message || 'Failed to create spreadsheet', 'error', 'Creation Error');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  // Request Confirmation for Adding Row
  const requestAddRowConfirmation = () => {
    if (!selectedSheetId) {
      setStatusMessage({ type: 'error', text: 'Please select or create a Google Sheet first.' });
      return;
    }
    if (!newRowName || !newRowEmail) {
      setStatusMessage({ type: 'error', text: 'Please enter at least a Name and Email address.' });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Append Record to Google Sheet',
      description: `Append inquiry for "${newRowName}" (${newRowEmail}) to the active Google Sheet?`,
      actionType: 'add_row',
    });
  };

  // Execute Add Row after user confirmation
  const executeAddRow = async () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    if (!accessToken || !selectedSheetId) return;

    setStatusMessage(null);
    try {
      const timestamp = new Date().toLocaleString();
      const rowValues = [
        [
          newRowName,
          newRowEmail,
          newRowPhone || 'N/A',
          newRowCategory,
          newRowBudget,
          newRowMessage || 'Direct sheet entry',
          timestamp,
        ],
      ];

      await appendSpreadsheetValues(accessToken, selectedSheetId, 'Sheet1!A1', rowValues);
      setStatusMessage({ type: 'success', text: `Record for ${newRowName} successfully appended to Google Sheet!` });
      showToast(`Appended row for "${newRowName}" to active Google Sheet`, 'success', 'Row Appended');
      
      // Clear inputs
      setNewRowName('');
      setNewRowEmail('');
      setNewRowPhone('');
      setNewRowMessage('');

      // Reload sheet values
      await loadSheetValues(accessToken, selectedSheetId);
    } catch (err: any) {
      console.error('Error adding row to sheet:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to append row to spreadsheet.' });
    }
  };

  // Filter values in sheet
  const filteredRows = React.useMemo(() => {
    if (!sheetData || !sheetData.values) return [];
    const rows = sheetData.values;
    if (rows.length <= 1) return rows; // header only or empty

    const headers = rows[0];
    const dataRows = rows.slice(1);

    if (!searchTerm.trim()) return rows;

    const term = searchTerm.toLowerCase();
    const matchingData = dataRows.filter((r) =>
      r.some((cell) => String(cell).toLowerCase().includes(term))
    );

    return [headers, ...matchingData];
  }, [sheetData, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            Google Workspace Integration
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Google Sheets Integrator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect your Google account to seamlessly read, write, sync client inquiries, and export proposal data directly into live Google Spreadsheets in your Drive.
          </p>

          {/* User Auth Status Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-900/90 border border-amber-500/40 px-4 py-2 rounded-2xl">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-amber-400" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-xs">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    {user.displayName || 'Connected Account'}
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  </p>
                  <p className="text-slate-400">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 p-1.5 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl transition-colors"
                  title="Sign out of Google"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-amber-300/80 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>OAuth 2.0 Secure Drive & Sheets permission enabled.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Status Banner */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : statusMessage.type === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {statusMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Not Authenticated Screen */}
      {needsAuth ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Sign in with Google Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To browse spreadsheets, create client lead trackers, or export quotes into Google Sheets, authorize MUCO Labs via secure Google Sign-In.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            {/* Official Material Styled Google Sign-In Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button group relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border border-slate-300 dark:border-slate-700 rounded-xl px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-3"
            >
              {isLoggingIn ? (
                <LuxurySpinner size="sm" label="" />
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Main Google Sheets Dashboard Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spreadsheet Picker & Creator */}
          <div className="lg:col-span-4 space-y-6">
            {/* Create New Sheet Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Plus className="w-4 h-4 text-amber-500" />
                <span>Create New Spreadsheet</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Creates a pre-formatted Google Sheet in your Drive with MUCO inquiry headers.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newSheetTitle}
                  onChange={(e) => setNewSheetTitle(e.target.value)}
                  placeholder="Spreadsheet Title..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                />
                <button
                  onClick={requestCreateSheetConfirmation}
                  disabled={isCreatingSheet}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isCreatingSheet ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                  <span>Create Sheet in Drive</span>
                </button>
              </div>
            </div>

            {/* Existing Spreadsheets List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Your Google Sheets</span>
                </div>
                <button
                  onClick={() => accessToken && fetchUserSpreadsheets(accessToken)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Refresh Drive Spreadsheets"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheets ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {isLoadingSheets ? (
                <div className="py-8 text-center">
                  <LuxurySpinner size="sm" label="Fetching Drive files..." />
                </div>
              ) : spreadsheets.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No spreadsheets found in your Drive. Create one above!
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {spreadsheets.map((sheet) => {
                    const isSelected = selectedSheetId === sheet.id;
                    return (
                      <div
                        key={sheet.id}
                        onClick={() => {
                          setSelectedSheetId(sheet.id);
                          setSelectedSheetMeta(sheet);
                        }}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/50 text-slate-900 dark:text-white font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <FileSpreadsheet className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                          <span className="truncate">{sheet.name}</span>
                        </div>
                        {sheet.webViewLink && (
                          <a
                            href={sheet.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-400 hover:text-amber-500 p-1 shrink-0"
                            title="Open in Google Sheets"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Record Generator Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Send className="w-4 h-4 text-amber-500" />
                <span>Append Inquiry Row</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add a new client quote row to the selected spreadsheet.
              </p>

              <div className="space-y-2.5 text-xs">
                <input
                  type="text"
                  placeholder="Client / Lead Name *"
                  value={newRowName}
                  onChange={(e) => setNewRowName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={newRowEmail}
                  onChange={(e) => setNewRowEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newRowPhone}
                  onChange={(e) => setNewRowPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                />
                <select
                  value={newRowCategory}
                  onChange={(e) => setNewRowCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="ERP & Supply Chain">ERP & Supply Chain</option>
                  <option value="App Store Publishing">App Store Publishing</option>
                  <option value="AMC Support">AMC Support</option>
                </select>
                <textarea
                  placeholder="Project message..."
                  rows={2}
                  value={newRowMessage}
                  onChange={(e) => setNewRowMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-amber-500 font-medium resize-none"
                />
                <button
                  onClick={requestAddRowConfirmation}
                  className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Append Row to Sheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Sheet Viewer */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Sheet Control Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Table className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white truncate max-w-md">
                      {selectedSheetMeta?.name || 'Live Google Sheet Viewer'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time cell data synchronized with Google Cloud Services
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {selectedSheetMeta?.webViewLink && (
                    <a
                      href={selectedSheetMeta.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold text-xs border border-amber-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <span>Open in Sheets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => accessToken && selectedSheetId && loadSheetValues(accessToken, selectedSheetId)}
                    disabled={isLoadingValues || !selectedSheetId}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Refresh Live Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingValues ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>

              {/* Search Bar inside Viewer */}
              {sheetData && (
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search cell contents across rows..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-950/60 rounded-xl text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Data Table */}
              {isLoadingValues ? (
                <div className="py-20 text-center">
                  <LuxurySpinner size="md" label="Reading Google Sheet cells..." />
                </div>
              ) : !selectedSheetId ? (
                <div className="py-20 text-center space-y-3">
                  <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
                  <p className="text-sm font-bold text-slate-400">Select a spreadsheet from the left menu to view live data.</p>
                </div>
              ) : !sheetData || !sheetData.values || sheetData.values.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">Spreadsheet is currently empty.</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Use the "Append Inquiry Row" form on the left to add your first data record to this sheet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-amber-400 font-black uppercase tracking-wider">
                        {filteredRows[0]?.map((header, idx) => (
                          <th key={idx} className="p-3 border-r border-slate-200 dark:border-slate-800/60 whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 bg-white dark:bg-slate-900/60">
                      {filteredRows.slice(1).map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 border-r border-slate-200 dark:border-slate-800/40 whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sheet Stats Footer */}
              {sheetData && sheetData.values && (
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Loaded {sheetData.values.length} rows (including header)
                  </span>
                  <span className="font-mono text-amber-500 font-bold">Range: {sheetData.range}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Required for Workspace Mutating Operations) */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-amber-500/40 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{confirmModal.title}</h3>
                  <p className="text-xs text-slate-400">Google Workspace Security Confirmation</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                {confirmModal.description}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (confirmModal.actionType === 'create_sheet') {
                      executeCreateSheet();
                    } else {
                      executeAddRow();
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all"
                >
                  Confirm & Execute
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
