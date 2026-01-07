import { createClient } from '@supabase/supabase-js';

// Read public runtime config from environment. Use NEXT_PUBLIC_* for values
// that are safe to expose to the browser. Keep secrets (server-only) out
// of NEXT_PUBLIC and use them only in API routes or server code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://ftgcbmthbwwcumvqnuof.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Z2NibXRoYnd3Y3VtdnFudW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDQ3MjcsImV4cCI6MjA1MjUyMDcyN30.sfmgAXCpMDpizmM7_kFNX3bSns_Awcl_jRJEe-kwoWk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// reCAPTCHA site key - public (safe) key used on the client. Set this in
// `.env.local` as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '6LfTgr8qAAAAAB6vUF6Y8w5DZSuINMy1uYMYa0TB';
