import type { NextApiRequest, NextApiResponse } from 'next';
import { corsHeaders } from './_shared/cors';
import { verifyRecaptcha } from './_shared/recaptcha';
import {
  sanitizeHtml,
  validateEmail,
  validatePhone,
  validateIban,
  validateBic,
  validateStringLength,
  validateDate,
  ValidationError,
} from './_shared/validation';
import { PDFDocument } from 'pdf-lib';

const PDF_FORM_URL =
  'https://ftgcbmthbwwcumvqnuof.supabase.co/storage/v1/object/public/static//Mitgliedsantrag_25-08.pdf';

type MembershipApplication = {
  membership_active: boolean;
  membership_support: boolean;
  name: string;
  firstname: string;
  birthday: string;
  birthplace: string;
  profession: string;
  nationality: string;
  street: string;
  plz_town: string;
  tel: string;
  fax: string;
  mobile: string;
  email: string;
  joindate_month: string;
  joindate_year: string;
  sepa_account_holder_name: string;
  sepa_account_holder_firstname: string;
  sepa_iban: string;
  sepa_bic: string;
  sepa_bank: string;
  recaptchaToken: string;
};

const validateMembershipApplication = (app: MembershipApplication): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!validateStringLength(app.name, 1, 100)) {
    errors.push({ field: 'name', message: 'Last name must be between 1 and 100 characters' });
  }

  if (!validateStringLength(app.firstname, 1, 100)) {
    errors.push({ field: 'firstname', message: 'First name must be between 1 and 100 characters' });
  }

  if (!validateDate(app.birthday)) {
    errors.push({ field: 'birthday', message: 'Invalid date of birth format' });
  }

  if (!validateStringLength(app.birthplace, 0, 100)) {
    errors.push({ field: 'birthplace', message: 'Birthplace must be less than 100 characters' });
  }

  if (!validateStringLength(app.profession, 0, 100)) {
    errors.push({ field: 'profession', message: 'Profession must be less than 100 characters' });
  }

  if (!validateStringLength(app.nationality, 0, 100)) {
    errors.push({ field: 'nationality', message: 'Nationality must be less than 100 characters' });
  }

  if (!validateStringLength(app.street, 1, 200)) {
    errors.push({ field: 'street', message: 'Street address must be between 1 and 200 characters' });
  }

  if (!validateStringLength(app.plz_town, 1, 100)) {
    errors.push({ field: 'plz_town', message: 'ZIP/City must be between 1 and 100 characters' });
  }

  if (!validatePhone(app.tel)) {
    errors.push({ field: 'tel', message: 'Invalid telephone number format' });
  }

  if (!validatePhone(app.mobile)) {
    errors.push({ field: 'mobile', message: 'Invalid mobile number format' });
  }

  if (!validateEmail(app.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (!validateIban(app.sepa_iban)) {
    errors.push({ field: 'sepa_iban', message: 'Invalid IBAN format' });
  }

  if (!validateBic(app.sepa_bic)) {
    errors.push({ field: 'sepa_bic', message: 'Invalid BIC format' });
  }

  if (!validateStringLength(app.sepa_bank, 0, 100)) {
    errors.push({ field: 'sepa_bank', message: 'Bank name must be less than 100 characters' });
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
    const { application } = req.body as { application: MembershipApplication };
    if (!application) {
      res.status(400).json({ error: 'Missing application body' });
      return;
    }

    if (!application.recaptchaToken) {
      res.status(400).json({ error: 'Missing reCAPTCHA token' });
      return;
    }

    const isValid = await verifyRecaptcha(application.recaptchaToken);
    if (!isValid) {
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
      return;
    }

    const validationErrors = validateMembershipApplication(application);
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

    // Download the blank PDF form
    const formPdfRes = await fetch(PDF_FORM_URL);
    if (!formPdfRes.ok) throw new Error('Failed to fetch PDF form template');
    const formPdfBytes = new Uint8Array(await formPdfRes.arrayBuffer());

    const filledPdfBytes = await fillMembershipPdfForm(formPdfBytes, application).catch((err) => {
      console.error('Error filling PDF form:', err);
      throw err;
    });

    const base64Pdf = Buffer.from(filledPdfBytes).toString('base64');

    const safeName = sanitizeHtml(application.name.trim());
    const safeFirstname = sanitizeHtml(application.firstname.trim());
    const safeBirthday = sanitizeHtml(application.birthday);
    const safeBirthplace = sanitizeHtml(application.birthplace?.trim() || '');
    const safeProfession = sanitizeHtml(application.profession?.trim() || '');
    const safeNationality = sanitizeHtml(application.nationality?.trim() || '');
    const safeStreet = sanitizeHtml(application.street.trim());
    const safePlzTown = sanitizeHtml(application.plz_town.trim());
    const safeTel = sanitizeHtml(application.tel?.trim() || '');
    const safeFax = sanitizeHtml(application.fax?.trim() || '');
    const safeMobile = sanitizeHtml(application.mobile?.trim() || '');
    const safeEmail = sanitizeHtml(application.email.trim());
    const safeSepaName = sanitizeHtml(application.sepa_account_holder_name?.trim() || '');
    const safeSepaFirstname = sanitizeHtml(application.sepa_account_holder_firstname?.trim() || '');
    const safeIban = sanitizeHtml(application.sepa_iban?.trim() || '');
    const safeBic = sanitizeHtml(application.sepa_bic?.trim() || '');
    const safeBank = sanitizeHtml(application.sepa_bank?.trim() || '');

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
          subject: `New Membership Application - ${safeName} ${safeFirstname}`,
          html: `
            <h2>New Membership Application</h2>
            <p><strong>Membership Type:</strong> ${application.membership_active ? 'Active' : ''} ${application.membership_support ? 'Supporting' : ''}</p>
            <p><strong>Name:</strong> ${safeName} ${safeFirstname}</p>
            <p><strong>Birth Date:</strong> ${safeBirthday}</p>
            <p><strong>Birth Place:</strong> ${safeBirthplace}</p>
            <p><strong>Profession:</strong> ${safeProfession}</p>
            <p><strong>Nationality:</strong> ${safeNationality}</p>
            <p><strong>Address:</strong> ${safeStreet}, ${safePlzTown}</p>
            <p><strong>Contact:</strong><br>
               Tel: ${safeTel}<br>
               Fax: ${safeFax}<br>
               Mobile: ${safeMobile}<br>
               Email: ${safeEmail}</p>
            <p><strong>Join Date:</strong> ${application.joindate_month}/${application.joindate_year}</p>
            <p><strong>SEPA Information:</strong><br>
               Account Holder: ${safeSepaName} ${safeSepaFirstname}<br>
               IBAN: ${safeIban}<br>
               BIC: ${safeBic}<br>
               Bank: ${safeBank}</p>
            <hr>
            <p>PDF is attached.</p>
          `,
          attachments: [
            {
              filename: `membership-application-${safeName}-${safeFirstname}.pdf`,
              content: base64Pdf,
              content_type: 'application/pdf',
            },
          ],
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
    console.error('Error in membership function:', err);
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    res.status(500).json({ error: 'An error occurred processing your request' });
  }
}

async function fillMembershipPdfForm(formPdfBytes: Uint8Array, application: MembershipApplication) {
  const pdfDoc = await PDFDocument.load(formPdfBytes as any);
  const form = pdfDoc.getForm();

  if (application.membership_active) {
    form.getTextField('membership_active').setText('X');
  }
  if (application.membership_support) {
    form.getTextField('membership_support').setText('X');
  }
  form.getTextField('name').setText(application.name);
  form.getTextField('firstname').setText(application.firstname);

  const [year, month, day] = application.birthday.split('-');
  form.getTextField('birthday').setText(`${day}.${month}.${year}`);
  form.getTextField('birthplace').setText(application.birthplace || '');
  form.getTextField('profession').setText(application.profession || '');
  form.getTextField('nationality').setText(application.nationality || '');
  form.getTextField('street').setText(application.street);
  form.getTextField('plz_town').setText(application.plz_town);
  form.getTextField('tel').setText(application.tel || '');
  form.getTextField('fax').setText(application.fax || '');
  form.getTextField('mobile').setText(application.mobile || '');
  form.getTextField('email').setText(application.email);

  const germanMonths: { [key: string]: string } = {
    '01': 'Januar',
    '02': 'Februar',
    '03': 'März',
    '04': 'April',
    '05': 'Mai',
    '06': 'Juni',
    '07': 'Juli',
    '08': 'August',
    '09': 'September',
    '10': 'Oktober',
    '11': 'November',
    '12': 'Dezember',
  };
  form.getTextField('joindate_month').setText(germanMonths[application.joindate_month] || '');

  const yearLastTwo = application.joindate_year.toString().slice(-2);
  form.getTextField('joindate_year').setText(yearLastTwo);

  form.getTextField('sepa_account_holder_name').setText(application.sepa_account_holder_name || '');
  form.getTextField('sepa_account_holder_firstname').setText(application.sepa_account_holder_firstname || '');
  form.getTextField('sepa_iban').setText(application.sepa_iban || '');
  form.getTextField('sepa_bic').setText(application.sepa_bic || '');
  form.getTextField('sepa_bank').setText(application.sepa_bank || '');

  form.flatten();
  return await pdfDoc.save();
}
