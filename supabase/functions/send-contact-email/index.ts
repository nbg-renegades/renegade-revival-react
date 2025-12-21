import { corsHeaders } from '../_shared/cors.ts';
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { verifyRecaptcha } from "../_shared/recaptcha.ts";
import { 
  sanitizeHtml, 
  validateEmail, 
  validateStringLength,
  ValidationError,
  createValidationError 
} from "../_shared/validation.ts";

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

interface EmailData {
  message: ContactMessage;
}

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { message } = await req.json() as EmailData;

    console.log("Processing contact form submission");

    // Validate reCAPTCHA token presence
    if (!message.recaptchaToken) {
      console.warn("Missing reCAPTCHA token");
      return new Response(
        JSON.stringify({ error: "Missing reCAPTCHA token" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify reCAPTCHA token server-side
    const isValid = await verifyRecaptcha(message.recaptchaToken);
    if (!isValid) {
      console.warn("Invalid reCAPTCHA token");
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate input data
    const validationErrors = validateContactMessage(message);
    if (validationErrors.length > 0) {
      console.warn("Validation errors:", validationErrors);
      return createValidationError(validationErrors);
    }

    // Get environment variables
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAILS = Deno.env.get("NOTIFICATION_EMAILS");

    if (!RESEND_API_KEY || !NOTIFICATION_EMAILS) {
      console.error("Missing required environment variables");
      throw new Error("Server configuration error");
    }

    // Parse notification emails (comma-separated list)
    const notificationEmails = NOTIFICATION_EMAILS.split(",").map((email) =>
      email.trim()
    );

    // Sanitize user input for email HTML
    const safeName = sanitizeHtml(message.name.trim());
    const safeEmail = sanitizeHtml(message.email.trim());
    const safeSubject = sanitizeHtml(message.subject.trim());
    const safeMessage = sanitizeHtml(message.message.trim());

    // Send email to each recipient
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
          subject: `New Contact Form Submission: ${safeSubject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Failed to send email to ${to}:`, data);
        throw new Error(`Failed to send email`);
      }

      return data;
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    console.log("Contact email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-contact-email:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
