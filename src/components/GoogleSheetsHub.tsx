import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Image } from './Image';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Plus, 
  LogOut, 
  Download, 
  Sparkles, 
  X,
  ShieldCheck,
  AlertCircle,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { 
  googleSignIn, 
  logoutGoogle, 
  initAuth, 
  getAccessToken, 
  createLeadsSpreadsheet, 
  syncAllLocalMessagesToSheet, 
  fetchUserSheets,
  GoogleSheetFile,
  SheetRow
} from '../services/googleSheets';
import { getGoogleScriptUrl, saveGoogleScriptUrl } from '../services/googleAppsScript';

interface GoogleSheetsHubProps {
  isOpen: boolean;
  onClose: () => void;
  onAutoSyncToggle?: (enabled: boolean) => void;
}

const APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var contents = {};
    if (e.postData && e.postData.contents) {
      contents = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      contents = e.parameter;
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Company", "Service", "Subject", "Message", "Status"]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#0f172a").setFontColor("#f8fafc");
    }

    var timestamp = contents.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = contents.name || "Valued Client";
    var email = contents.email || "N/A";
    var phone = contents.phone || "N/A";
    var company = contents.company || "Individual / N/A";
    var service = contents.service || contents.serviceCategory || "General Inquiry";
    var subject = contents.subject || "Project Inquiry";
    var message = contents.message || "";
    var status = contents.status || "New";

    sheet.appendRow([timestamp, name, email, phone, company, service, subject, message, status]);

    if (email && email.indexOf("@") !== -1) {
      try {
        var autoReplySubject = "Thank You for Contacting MUCO Labs";
        var autoReplyBody = "Hello " + name + ",\\n\\n" +
          "Thank you for contacting MUCO Labs.\\n\\n" +
          "We have successfully received your inquiry.\\n\\n" +
          "Our team will review your request and contact you shortly.\\n\\n" +
          "We appreciate your interest in working with us.\\n\\n" +
          "Regards,\\n\\n" +
          "MUCO Labs\\n" +
          "Innovation in Digital Technology\\n\\n" +
          "Email:\\ncontact@mucolabs.in\\n\\n" +
          "Website:\\nhttps://mucolabs.in";

        GmailApp.sendEmail(email, autoReplySubject, autoReplyBody, {
          name: "MUCO Labs Team",
          replyTo: "contact@mucolabs.in"
        });
      } catch (emailErr) {
        Logger.log("Auto reply notice: " + emailErr.toString());
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "success": true, "message": "Lead appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export const GoogleSheetsHub: React.FC<GoogleSheetsHubProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userSheets, setUserSheets] = useState<GoogleSheetFile[]>([]);
  const [activeSheetId, setActiveSheetId] = useState<string>('');
  const [activeSheetUrl, setActiveSheetUrl] = useState<string>('');
  const [scriptUrl, setScriptUrl] = useState<string>('');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [customSheetName, setCustomSheetName] = useState('MUCO Labs - Client Inquiries 2026');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setScriptUrl(getGoogleScriptUrl());
  }, []);

  const handleSaveScriptUrl = () => {
    saveGoogleScriptUrl(scriptUrl);
    setStatusMessage({ type: 'success', text: 'Google Apps Script Web App URL updated successfully!' });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        loadSheets(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load stored active sheet ID
  useEffect(() => {
    const savedId = localStorage.getItem('muco_active_sheets_id');
    const savedUrl = localStorage.getItem('muco_active_sheets_url');
    if (savedId) setActiveSheetId(savedId);
    if (savedUrl) setActiveSheetUrl(savedUrl);
  }, []);

  const loadSheets = async (accessToken: string) => {
    const sheets = await fetchUserSheets(accessToken);
    setUserSheets(sheets);
    if (sheets.length > 0 && !activeSheetId) {
      setActiveSheetId(sheets[0].id);
      setActiveSheetUrl(sheets[0].webViewLink);
      localStorage.setItem('muco_active_sheets_id', sheets[0].id);
      localStorage.setItem('muco_active_sheets_url', sheets[0].webViewLink);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadSheets(result.accessToken);
        setStatusMessage({ type: 'success', text: `Successfully connected Google Account (${result.user.email})` });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatusMessage({ type: 'error', text: msg || 'Google Sign-In failed.' });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setStatusMessage({ type: 'info', text: 'Signed out from Google Sheets.' });
  };

  const handleCreateNewSheet = async () => {
    const currentToken = token || getAccessToken();
    if (!currentToken) {
      setStatusMessage({ type: 'error', text: 'Please sign in with Google first.' });
      return;
    }

    setIsCreatingSheet(true);
    setStatusMessage(null);
    try {
      const newSheet = await createLeadsSpreadsheet(customSheetName, currentToken);
      setActiveSheetId(newSheet.id);
      setActiveSheetUrl(newSheet.webViewLink);
      localStorage.setItem('muco_active_sheets_id', newSheet.id);
      localStorage.setItem('muco_active_sheets_url', newSheet.webViewLink);

      setUserSheets((prev) => [newSheet, ...prev]);
      setStatusMessage({ 
        type: 'success', 
        text: `Created new Google Sheet "${newSheet.name}"! Client inquiries will sync here.` 
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatusMessage({ type: 'error', text: msg || 'Failed to create Google Sheet.' });
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSyncLocalMessages = async () => {
    const currentToken = token || getAccessToken();
    if (!currentToken) {
      setStatusMessage({ type: 'error', text: 'Please sign in with Google to sync.' });
      return;
    }

    let sheetId = activeSheetId;
    if (!sheetId) {
      // Create one if none exists
      setIsCreatingSheet(true);
      try {
        const newSheet = await createLeadsSpreadsheet(customSheetName, currentToken);
        sheetId = newSheet.id;
        setActiveSheetId(newSheet.id);
        setActiveSheetUrl(newSheet.webViewLink);
        localStorage.setItem('muco_active_sheets_id', newSheet.id);
        localStorage.setItem('muco_active_sheets_url', newSheet.webViewLink);
        setUserSheets((prev) => [newSheet, ...prev]);
      } catch (err: unknown) {
        setStatusMessage({ type: 'error', text: 'Could not create spreadsheet for sync.' });
        setIsCreatingSheet(false);
        return;
      }
      setIsCreatingSheet(false);
    }

    setIsSyncing(true);
    setStatusMessage(null);

    try {
      const rawMsgs = localStorage.getItem('muco_contact_messages');
      const messages: SheetRow[] = rawMsgs ? JSON.parse(rawMsgs) : [];

      if (messages.length === 0) {
        setStatusMessage({ type: 'info', text: 'No local lead entries to sync right now.' });
        setIsSyncing(false);
        return;
      }

      const count = await syncAllLocalMessagesToSheet(sheetId, messages, currentToken);
      setStatusMessage({ 
        type: 'success', 
        text: `Exported ${count} client lead inquiry record(s) directly to Google Sheets!` 
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatusMessage({ type: 'error', text: msg || 'Error exporting to Google Sheets.' });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 text-white rounded-3xl border border-amber-500/30 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                Google Sheets Lead Integration
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live OAuth 2.0
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Sync project inquiries & client proposals directly to your Google Workspace account.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                : 'bg-blue-950/60 border-blue-500/40 text-blue-200'
            }`}
          >
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Authentication Card */}
        <div className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Google Connection Status
            </span>
            {user && (
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Connected
              </span>
            )}
          </div>

          {!user ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Sign in with your Google Account to authorize MUCO Labs to create spreadsheets and append project proposals automatically.
              </p>

              {/* Official Google Sign In Button */}
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all border border-slate-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{isLoggingIn ? 'Connecting Google Account...' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-900 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-amber-500/40"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-white">{user.displayName || 'Google Account User'}</p>
                  <p className="text-[11px] text-slate-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Disconnect Google Account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Spreadsheet Actions */}
        {user && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Create New Google Spreadsheet
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSheetName}
                  onChange={(e) => setCustomSheetName(e.target.value)}
                  placeholder="Sheet Title..."
                  className="flex-1 bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleCreateNewSheet}
                  disabled={isCreatingSheet}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isCreatingSheet ? 'Creating...' : 'Create Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Sync Local Messages */}
            <div className="pt-2">
              <button
                onClick={handleSyncLocalMessages}
                disabled={isSyncing}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSyncing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{isSyncing ? 'Exporting Leads to Google Sheet...' : 'Export All Inquiries to Google Sheet'}</span>
              </button>
            </div>

            {/* Existing Spreadsheets List */}
            {userSheets.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Your Google Sheets ({userSheets.length})
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {userSheets.map((sheet) => (
                    <div
                      key={sheet.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        activeSheetId === sheet.id
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold truncate">{sheet.name}</span>
                      </div>
                      <a
                        href={sheet.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:underline shrink-0"
                      >
                        Open Sheet <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Google Workspace OAuth 2.0 API • Built for MUCO Labs Client Proposal Management
        </div>
      </div>
    </div>
  );
};
