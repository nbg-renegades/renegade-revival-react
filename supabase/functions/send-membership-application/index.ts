import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { verifyRecaptcha } from "../_shared/recaptcha.ts";
import { 
  sanitizeHtml, 
  validateEmail, 
  validatePhone,
  validateIban,
  validateBic,
  validateStringLength,
  validateDate,
  ValidationError,
  createValidationError 
} from "../_shared/validation.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

const PDF_FORM_URL =
  "https://ftgcbmthbwwcumvqnuof.supabase.co/storage/v1/object/public/static//Mitgliedsantrag_25-08.pdf";

interface MembershipApplication {
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
}

interface EmailData {
  application: MembershipApplication;
}

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { application } = await req.json() as EmailData;

    console.log("Processing membership application");

    // Validate reCAPTCHA token presence
    if (!application.recaptchaToken) {
      console.warn("Missing reCAPTCHA token");
      return new Response(
        JSON.stringify({ error: "Missing reCAPTCHA token" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Verify reCAPTCHA token server-side
    const isValid = await verifyRecaptcha(application.recaptchaToken);
    if (!isValid) {
      console.warn("Invalid reCAPTCHA token");
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Validate input data
    const validationErrors = validateMembershipApplication(application);
    if (validationErrors.length > 0) {
      console.warn("Validation errors:", validationErrors);
      return createValidationError(validationErrors);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAILS = Deno.env.get("NOTIFICATION_EMAILS");
    if (!RESEND_API_KEY || !NOTIFICATION_EMAILS) {
      console.error("Missing required environment variables");
      throw new Error("Server configuration error");
    }
    const notificationEmails = NOTIFICATION_EMAILS.split(",").map((email) =>
      email.trim()
    );

    // Download the blank PDF form
    const formPdfRes = await fetch(PDF_FORM_URL);
    if (!formPdfRes.ok) throw new Error("Failed to fetch PDF form template");
    const formPdfBytes = new Uint8Array(await formPdfRes.arrayBuffer());

    // Fill PDF form fields using pdf-lib
    const filledPdfBytes = await fillMembershipPdfForm(
      formPdfBytes,
      application,
    ).catch((err) => {
      console.error("Error filling PDF form:", err);
      throw err;
    });

    // Convert Uint8Array to base64 in chunks to avoid call stack size exceeded
    const chunks = [];
    const chunkSize = 0x8000; // 32K chunks
    for (let i = 0; i < filledPdfBytes.length; i += chunkSize) {
      const chunk = filledPdfBytes.subarray(i, i + chunkSize);
      chunks.push(String.fromCharCode(...Array.from(chunk)));
    }
    const base64Pdf = btoa(chunks.join(''));

    // Sanitize user input for email HTML
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

    // Send the email with the filled PDF as attachment
    const emailPromises = notificationEmails.map(async (to) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "info@nuernberg-renegades.de",
          to,
          subject:
            `New Membership Application - ${safeName} ${safeFirstname}`,
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
              filename:
                `membership-application-${safeName}-${safeFirstname}.pdf`,
              content: base64Pdf,
              content_type: "application/pdf",
            },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`Failed to send email to ${to}:`, data);
        throw new Error(`Failed to send email`);
      }
      return data;
    });

    await Promise.all(emailPromises);

    console.log("Membership application email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in membership function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

/**
 * Fills the pre-generated PDF form fields using pdf-lib
 */
async function fillMembershipPdfForm(
  formPdfBytes: Uint8Array,
  application: MembershipApplication,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(formPdfBytes);

  // Access the PDF form
  const form = pdfDoc.getForm();

  // Fill fields by their exact name as defined in the PDF editor
  if (application.membership_active) {
    form.getTextField("membership_active").setText('X');
  } 
  if (application.membership_support) {
    form.getTextField("membership_support").setText('X');
  } 
  form.getTextField("name").setText(application.name);
  form.getTextField("firstname").setText(application.firstname);
  
  // Convert birthday from ISO (YYYY-MM-DD) to German format (DD.MM.YYYY)
  const [year, month, day] = application.birthday.split('-');
  form.getTextField("birthday").setText(`${day}.${month}.${year}`);
  form.getTextField("birthplace").setText(application.birthplace || '');
  form.getTextField("profession").setText(application.profession || '');
  form.getTextField("nationality").setText(application.nationality || '');
  form.getTextField("street").setText(application.street);
  form.getTextField("plz_town").setText(application.plz_town);
  form.getTextField("tel").setText(application.tel || '');
  form.getTextField("fax").setText(application.fax || '');
  form.getTextField("mobile").setText(application.mobile || '');
  form.getTextField("email").setText(application.email);
  
  // Convert month number to German month name
  const germanMonths: { [key: string]: string } = {
    "01": "Januar",
    "02": "Februar",
    "03": "März",
    "04": "April",
    "05": "Mai",
    "06": "Juni",
    "07": "Juli",
    "08": "August",
    "09": "September",
    "10": "Oktober",
    "11": "November",
    "12": "Dezember"
  };
  form.getTextField("joindate_month").setText(germanMonths[application.joindate_month] || "");
  
  // Take only last 2 digits of the year
  const yearLastTwo = application.joindate_year.toString().slice(-2);
  form.getTextField("joindate_year").setText(yearLastTwo);
  
  form.getTextField("sepa_account_holder_name").setText(application.sepa_account_holder_name || '');
  form.getTextField("sepa_account_holder_firstname").setText(application.sepa_account_holder_firstname || '');
  form.getTextField("sepa_iban").setText(application.sepa_iban || '');
  form.getTextField("sepa_bic").setText(application.sepa_bic || '');
  form.getTextField("sepa_bank").setText(application.sepa_bank || '');

  // Flatten to make fields un-editable
  form.flatten();

  return await pdfDoc.save();
}
