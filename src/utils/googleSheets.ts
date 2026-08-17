export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
  createdTime?: string;
}

export interface SheetGridData {
  range: string;
  majorDimension: string;
  values: string[][];
}

export interface SpreadsheetDetails {
  spreadsheetId: string;
  properties: {
    title: string;
  };
  sheets: {
    properties: {
      sheetId: number;
      title: string;
      gridProperties: {
        rowCount: number;
        columnCount: number;
      };
    };
  }[];
}

/**
  * List all Google Spreadsheets from user's Google Drive.
  */
export async function listSpreadsheets(accessToken: string): Promise<DriveFile[]> {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'+and+trashed=false&fields=files(id,name,mimeType,webViewLink,modifiedTime,createdTime)&orderBy=modifiedTime+desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list Google Sheets: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
  * Create a brand new Google Spreadsheet with title and optional initial header row.
  */
export async function createSpreadsheet(
  accessToken: string,
  title: string,
  headers: string[] = ['Name', 'Email', 'Phone', 'Service Category', 'Budget Range', 'Message', 'Submitted At']
): Promise<SpreadsheetDetails> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Sheet1',
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: headers.map((h) => ({
                    userEnteredValue: { stringValue: h },
                    userEnteredFormat: {
                      textFormat: { bold: true },
                      backgroundColor: { red: 0.96, green: 0.77, blue: 0.2 }, // Golden MUCO accent
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
    throw new Error(`Failed to create Google Sheet: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
  * Fetch details and sheet names of a spreadsheet.
  */
export async function getSpreadsheetDetails(
  accessToken: string,
  spreadsheetId: string
): Promise<SpreadsheetDetails> {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch spreadsheet details: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
  * Fetch cell values from a specified range in a Google Sheet.
  */
export async function getSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string = 'Sheet1!A1:Z100'
): Promise<SheetGridData> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch spreadsheet values: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
  * Append rows of values to a Google Sheet.
  */
export async function appendSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: (string | number)[][]
): Promise<any> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to append values to Google Sheet: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
  * Update cell values in a Google Sheet.
  */
export async function updateSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: (string | number)[][]
): Promise<any> {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update values in Google Sheet: ${response.status} - ${errorText}`);
  }

  return await response.json();
}
