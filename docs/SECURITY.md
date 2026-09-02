# MUCO Labs security notes

## What changed

- Contact, inbox, and email-test APIs now fail closed.
- Listing or deleting leads requires a Firebase ID token for an admin user, or `ADMIN_API_KEY`.
- Server Firestore access uses the **Firebase Admin SDK**, not the public web SDK.
- Inquiry emails HTML-escape every user field.
- Failed email/storage attempts no longer return a fake `success: true`.
- Testimonials can no longer be created by anonymous clients.
- Vercel `/api/*` functions share the same handlers as `server.ts`.

## Production environment

Set these in Vercel (or `.env` for the Express host):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Send inquiry mail |
| `RESEND_FROM_EMAIL` | Verified sender |
| `RESEND_TO_EMAIL` | Inbox destination |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Admin SDK service account JSON (single line) |
| `FIREBASE_PROJECT_ID` | `company-office-96shk` |
| `ADMIN_EMAILS` | Comma-separated admin emails |
| `ADMIN_API_KEY` | Optional shared secret for `x-admin-key` |
| `RATE_LIMIT_PER_MINUTE` | Public inquiry cap (default 8) |
| `VITE_ADMIN_EMAILS` | Same emails, used only to hide admin UI |

Create a Firebase service account under Project settings → Service accounts. Put that UID into the `admins/{uid}` document, or set the user `role` to `ADMIN` / `SUPER_ADMIN`.

Deploy `firestore.rules` after pulling this change.

## Local

```bash
cp .env.example .env
# fill RESEND_*, FIREBASE_SERVICE_ACCOUNT_JSON, ADMIN_EMAILS
npm install
npm run dev
```
