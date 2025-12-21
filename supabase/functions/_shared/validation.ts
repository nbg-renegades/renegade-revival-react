// Input validation utilities for edge functions
// Provides sanitization and validation without external dependencies

export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

export const validatePhone = (phone: string): boolean => {
  // Allow empty or valid phone formats
  if (!phone) return true;
  const phoneRegex = /^[\d\s\-+()]{0,30}$/;
  return phoneRegex.test(phone);
};

export const validateIban = (iban: string): boolean => {
  // Basic IBAN format validation (German format: DE + 20 alphanumeric chars)
  if (!iban) return true;
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  return ibanRegex.test(iban.replace(/\s/g, '').toUpperCase());
};

export const validateBic = (bic: string): boolean => {
  // BIC format: 8 or 11 alphanumeric characters
  if (!bic) return true;
  const bicRegex = /^[A-Z0-9]{8}([A-Z0-9]{3})?$/;
  return bicRegex.test(bic.replace(/\s/g, '').toUpperCase());
};

export const validateStringLength = (
  str: string,
  minLength: number,
  maxLength: number
): boolean => {
  const trimmed = str?.trim() || '';
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

export const validateDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

export interface ValidationError {
  field: string;
  message: string;
}

export const createValidationError = (errors: ValidationError[]): Response => {
  return new Response(
    JSON.stringify({ 
      error: "Validation failed", 
      details: errors 
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
};
