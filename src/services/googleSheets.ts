import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/drive.readonly');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface SheetRow {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceCategory: string;
  budgetRange: string;
  message: string;
  timestamp: string;
  status: string;
}

export interface GoogleSheetFile {
  id: string;
  name: string;
  webViewLink: string;
  createdTime?: string;
}

/**
 * Creates a new Google Spreadsheet specifically for MUCO Labs Client Leads
 */
export const createLeadsSpreadsheet = async (
  title: string,
  accessToken: string
): Promise<GoogleSheetFile> => {
  const headers = [
    'Timestamp',
    'Client Name',
    'Email Address',
    'Phone / WhatsApp',
    'Company Name',
    'Service Category',
    'Budget Range',
    'Project Message',
    'Status'
  ];

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title || 'MUCO Labs - Client Inquiries & Proposals',
      },
      sheets: [
        {
          properties: {
            title: 'Inquiries',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: headers.map((header) => ({
                    userEnteredValue: { stringValue: header },
                    userEnteredFormat: {
                      textFormat: { bold: true, foregroundColorStyle: { rgbColor: { red: 1, green: 1, blue: 1 } } },
                      backgroundColorStyle: { rgbColor: { red: 0.08, green: 0.12, blue: 0.22 } },
                    },
                  })),
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create spreadsheet: ${errorText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  return {
    id: spreadsheetId,
    name: title,
    webViewLink,
  };
};

/**
 * Appends a lead row to an existing Google Spreadsheet
 */
export const appendLeadToSheet = async (
  spreadsheetId: string,
  lead: SheetRow,
  accessToken: string
): Promise<boolean> => {
  const rowValues = [
    lead.timestamp,
    lead.name,
    lead.email,
    lead.phone,
    lead.company,
    lead.serviceCategory,
    lead.budgetRange,
    lead.message,
    lead.status || 'New',
  ];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A:I:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!response.ok) {
    // Fallback if sheet tab name differs
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:I:append?valueInputOption=USER_ENTERED`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    });

    if (!fallbackRes.ok) {
      const err = await fallbackRes.text();
      throw new Error(`Failed to append row: ${err}`);
    }
  }

  return true;
};

/**
 * Syncs multiple local messages to a Google Sheet
 */
export const syncAllLocalMessagesToSheet = async (
  spreadsheetId: string,
  leads: SheetRow[],
  accessToken: string
): Promise<number> => {
  if (!leads || leads.length === 0) return 0;

  const rows = leads.map((lead) => [
    lead.timestamp,
    lead.name,
    lead.email,
    lead.phone,
    lead.company,
    lead.serviceCategory,
    lead.budgetRange,
    lead.message,
    lead.status || 'New',
  ]);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Inquiries!A:I:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows,
    }),
  });

  if (!response.ok) {
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:I:append?valueInputOption=USER_ENTERED`;
    await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: rows,
      }),
    });
  }

  return leads.length;
};

/**
 * Retrieves existing Google Sheets created by the app or user
 */
export const fetchUserSheets = async (accessToken: string): Promise<GoogleSheetFile[]> => {
  try {
    const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,createdTime)&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.files || [];
  } catch (err) {
    console.error('Error fetching Google Sheets:', err);
    return [];
  }
};
