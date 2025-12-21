import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ftgcbmthbwwcumvqnuof.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Z2NibXRoYnd3Y3VtdnFudW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDQ3MjcsImV4cCI6MjA1MjUyMDcyN30.sfmgAXCpMDpizmM7_kFNX3bSns_Awcl_jRJEe-kwoWk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const RECAPTCHA_SITE_KEY = '6LfTgr8qAAAAAB6vUF6Y8w5DZSuINMy1uYMYa0TB';
