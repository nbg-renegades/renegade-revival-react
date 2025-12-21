import { corsHeaders } from '../_shared/cors.ts';
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { verifyRecaptcha } from "../_shared/recaptcha.ts";
import { 
  sanitizeHtml, 
  validateEmail, 
  validatePhone,
  validateStringLength,
  ValidationError,
  createValidationError 
} from "../_shared/validation.ts";

interface TryoutRequest {
  name: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  message: string;
  recaptchaToken: string;
}

interface EmailData {
  request: TryoutRequest;
}

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { request } = await req.json() as EmailData;

    console.log("Processing tryout request submission");

    // Validate reCAPTCHA token presence
    if (!request.recaptchaToken) {
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
    const isValid = await verifyRecaptcha(request.recaptchaToken);
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
    const validationErrors = validateTryoutRequest(request);
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
    const safeName = sanitizeHtml(request.name.trim());
    const safeEmail = sanitizeHtml(request.email.trim());
    const safePhone = sanitizeHtml(request.phone?.trim() || '');
    const safeAge = sanitizeHtml(request.age.trim());
    const safeExperience = sanitizeHtml(request.experience?.trim() || '');
    const safeMessage = sanitizeHtml(request.message?.trim() || '');

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
          subject: `New Tryout Request`,
          html: `
            <h2>New Tryout Request</h2>
            <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Age:</strong> ${safeAge}</p>
            <p><strong>Experience:</strong> ${safeExperience}</p>
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

    console.log("Tryout email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-tryout-email:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
