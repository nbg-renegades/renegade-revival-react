export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('Missing RECAPTCHA_SECRET_KEY environment variable');
    throw new Error('Server configuration error');
  }

  const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
  const params = new URLSearchParams();
  params.append('secret', RECAPTCHA_SECRET_KEY);
  params.append('response', token);

  const response = await fetch(verificationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const result = await response.json();
  console.log('reCAPTCHA verification result:', { success: result.success, score: result.score });

  return result.success && result.score >= 0.5;
};
