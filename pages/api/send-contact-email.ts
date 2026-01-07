import type { NextApiRequest, NextApiResponse } from 'next';
import { corsHeaders } from './_shared/cors';
import { verifyRecaptcha } from './_shared/recaptcha';
import { sanitizeHtml, validateEmail, validateStringLength, ValidationError } from './_shared/validation';

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
};

const validateContactMessage = (message: ContactMessage): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateStringLength(message.name, 1, 100)) {
    errors.push({ field: 'name', message: 'Name must be between 1 and 100 characters' });
  }

  if (!validateEmail(message.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (!validateStringLength(message.subject, 1, 200)) {
    errors.push({ field: 'subject', message: 'Subject must be between 1 and 200 characters' });
  }

  if (!validateStringLength(message.message, 1, 5000)) {
    errors.push({ field: 'message', message: 'Message must be between 1 and 5000 characters' });
  }

  return errors;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message } = req.body as { message: ContactMessage };

    if (!message) {
      res.status(400).json({ error: 'Missing message' });
      return;
    }

    if (!message.recaptchaToken) {
      res.status(400).json({ error: 'Missing reCAPTCHA token' });
      return;
    }

    const isValid = await verifyRecaptcha(message.recaptchaToken);
    if (!isValid) {
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
      return;
    }

    const validationErrors = validateContactMessage(message);
    if (validationErrors.length > 0) {
      res.status(400).json({ error: 'Validation failed', details: validationErrors });
      return;
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const NOTIFICATION_EMAILS = process.env.NOTIFICATION_EMAILS;

    if (!RESEND_API_KEY || !NOTIFICATION_EMAILS) {
      console.error('Missing required environment variables');
      throw new Error('Server configuration error');
    }

    const notificationEmails = NOTIFICATION_EMAILS.split(',').map((e) => e.trim());

    const safeName = sanitizeHtml(message.name.trim());
    const safeEmail = sanitizeHtml(message.email.trim());
    const safeSubject = sanitizeHtml(message.subject.trim());
    const safeMessage = sanitizeHtml(message.message.trim());

    const emailPromises = notificationEmails.map(async (to) => {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'info@nuernberg-renegades.de',
          to,
          subject: `New Contact Form Submission: ${safeSubject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      const data = await r.json();
      if (!r.ok) {
        console.error(`Failed to send email to ${to}:`, data);
        throw new Error('Failed to send email');
      }
      return data;
    });

    await Promise.all(emailPromises);

    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in send-contact-email:', err);
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.status(500).json({ error: 'An error occurred processing your request' });
  }
}
