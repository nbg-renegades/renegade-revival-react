import type { NextApiRequest, NextApiResponse } from 'next';
import { corsHeaders } from './_shared/cors';
import { verifyRecaptcha } from './_shared/recaptcha';
import { sanitizeHtml, validateEmail, validatePhone, validateStringLength, ValidationError } from './_shared/validation';

type TryoutRequest = {
  name: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  message: string;
  recaptchaToken: string;
};

const validateTryoutRequest = (request: TryoutRequest): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateStringLength(request.name, 1, 100)) {
    errors.push({ field: 'name', message: 'Name must be between 1 and 100 characters' });
  }

  if (!validateEmail(request.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (!validatePhone(request.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number format' });
  }

  if (!validateStringLength(request.age, 1, 10)) {
    errors.push({ field: 'age', message: 'Age is required and must be valid' });
  }

  if (!validateStringLength(request.experience, 0, 500)) {
    errors.push({ field: 'experience', message: 'Experience must be less than 500 characters' });
  }

  if (!validateStringLength(request.message, 0, 2000)) {
    errors.push({ field: 'message', message: 'Message must be less than 2000 characters' });
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
    const { request } = req.body as { request: TryoutRequest };
    if (!request) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }

    if (!request.recaptchaToken) {
      res.status(400).json({ error: 'Missing reCAPTCHA token' });
      return;
    }

    const isValid = await verifyRecaptcha(request.recaptchaToken);
    if (!isValid) {
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
      return;
    }

    const validationErrors = validateTryoutRequest(request);
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

    const safeName = sanitizeHtml(request.name.trim());
    const safeEmail = sanitizeHtml(request.email.trim());
    const safePhone = sanitizeHtml(request.phone?.trim() || '');
    const safeAge = sanitizeHtml(request.age.trim());
    const safeExperience = sanitizeHtml(request.experience?.trim() || '');
    const safeMessage = sanitizeHtml(request.message?.trim() || '');

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
          subject: `New Tryout Request`,
          html: `
            <h2>New Tryout Request</h2>
            <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Age:</strong> ${safeAge}</p>
            <p><strong>Experience:</strong> ${safeExperience}</p>
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
    console.error('Error in send-tryout-email:', err);
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.status(500).json({ error: 'An error occurred processing your request' });
  }
}
