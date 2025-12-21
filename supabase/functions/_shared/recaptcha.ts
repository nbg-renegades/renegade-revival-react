const verifyRecaptcha = async (token: string): Promise<boolean> => {
  const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("Missing RECAPTCHA_SECRET_KEY environment variable");
    throw new Error("Server configuration error");
  }

  const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
  const response = await fetch(verificationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const result = await response.json();
  console.log("reCAPTCHA verification result:", { success: result.success, score: result.score });
  
  return result.success && result.score >= 0.5;
};

export { verifyRecaptcha };
