import { Resend } from 'resend';
import { checkRateLimit, clientIp } from './rateLimit';
import { parseContactPayload } from './contactPayload';
import { brandedInquiryHtml, clientAutoReplyHtml } from './emailTemplates';
import { authorizeAdmin } from './requireAdmin';
import { jsonBody, queryValue, type ApiRequest, type ApiResponse } from './http';
import {
  deleteContactMessageServer,
  getContactMessagesServer,
  submitContactFormServer
} from '../../server-firebase';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

function fromEmail() {
  return process.env.RESEND_FROM_EMAIL || 'MUCO Labs <onboarding@resend.dev>';
}

function toEmail() {
  return process.env.RESEND_TO_EMAIL || 'contact@mucolabs.in';
}

export async function handleHealth(_req: ApiRequest, res: ApiResponse) {
  return res.status(200).json({ status: 'ok', company: 'MUCO Labs' });
}

export async function handleEmailStatus(req: ApiRequest, res: ApiResponse) {
  const auth = await authorizeAdmin(req.headers);
  if (!auth.ok) return res.status(auth.status).json({ success: false, error: auth.error });
  return res.status(200).json({
    configured: Boolean(getResend()),
    provider: 'resend',
    fromEmail: fromEmail(),
    toEmail: toEmail()
  });
}

export async function handleEmailTest(req: ApiRequest, res: ApiResponse) {
  const auth = await authorizeAdmin(req.headers);
  if (!auth.ok) return res.status(auth.status).json({ success: false, error: auth.error });

  const resend = getResend();
  const body = jsonBody(req);
  const target = String(body.toEmail || toEmail());
  if (!resend) {
    return res.status(503).json({
      success: false,
      isSimulated: true,
      error: 'RESEND_API_KEY is not configured.'
    });
  }

  try {
    const response = await resend.emails.send({
      from: fromEmail(),
      to: [target],
      subject: 'MUCO Labs - Resend Integration Verification Test',
      html: `<p>Resend test from MUCO Labs at ${new Date().toISOString()}</p>`
    });
    return res.status(200).json({
      success: true,
      isSimulated: false,
      message: 'Live test email dispatched via Resend.',
      data: response
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to dispatch test email';
    return res.status(502).json({ success: false, error: message });
  }
}

export async function handleSendEmail(req: ApiRequest, res: ApiResponse) {
  const ip = clientIp(req);
  const limit = checkRateLimit(`contact:${ip}`, Number(process.env.RATE_LIMIT_PER_MINUTE || 8));
  if (!limit.allowed) {
    return res.status(429).json({ success: false, error: 'Too many inquiries. Please wait a minute and try again.' });
  }

  const parsed = parseContactPayload(jsonBody(req));
  if (!parsed.ok) return res.status(400).json({ success: false, error: parsed.error });

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  let storedId = '';
  try {
    storedId = await submitContactFormServer(parsed.data);
  } catch (error) {
    console.warn('[Firebase Storage Warning]', error);
  }

  const resend = getResend();
  if (!resend) {
    return res.status(storedId ? 202 : 503).json({
      success: Boolean(storedId),
      isSimulated: true,
      message: storedId
        ? 'Inquiry stored. Email delivery is not configured.'
        : 'Unable to store or email this inquiry. Try again later.',
      id: storedId || undefined
    });
  }

  try {
    const primary = await resend.emails.send({
      from: fromEmail(),
      to: [toEmail()],
      replyTo: parsed.data.email,
      subject: `[MUCO Labs Inquiry] ${parsed.data.serviceCategory} - ${parsed.data.name}`,
      html: brandedInquiryHtml({ ...parsed.data, timestamp })
    });

    resend.emails.send({
      from: fromEmail(),
      to: [parsed.data.email],
      subject: `Thank you for contacting MUCO Labs - ${parsed.data.serviceCategory}`,
      html: clientAutoReplyHtml(parsed.data.name, parsed.data.serviceCategory)
    }).catch((err) => console.warn('[Resend Auto-Reply Error]', err));

    return res.status(200).json({
      success: true,
      isSimulated: false,
      message: 'Inquiry sent to MUCO Labs.',
      id: storedId || undefined,
      data: primary
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Email dispatch failed';
    if (storedId) {
      return res.status(202).json({
        success: true,
        warning: `Saved the inquiry, but email dispatch failed: ${message}`,
        id: storedId
      });
    }
    return res.status(502).json({ success: false, error: message });
  }
}

export async function handleListMessages(req: ApiRequest, res: ApiResponse) {
  const auth = await authorizeAdmin(req.headers);
  if (!auth.ok) return res.status(auth.status).json({ success: false, error: auth.error });

  try {
    const messages = await getContactMessagesServer();
    return res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    console.error('[Firebase Messages Error]', error);
    return res.status(503).json({ success: false, error: 'Failed to fetch messages.' });
  }
}

export async function handleDeleteMessage(req: ApiRequest, res: ApiResponse) {
  const auth = await authorizeAdmin(req.headers);
  if (!auth.ok) return res.status(auth.status).json({ success: false, error: auth.error });

  const id = queryValue(req, 'id');
  if (!id) return res.status(400).json({ success: false, error: 'Message id is required.' });

  try {
    await deleteContactMessageServer(id);
    return res.status(200).json({ success: true, deletedId: id });
  } catch (error) {
    console.error('[Firebase Delete Error]', error);
    return res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
}
