import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Support both VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_ANON_KEY
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

// Security Safeguard: Prevent accidental usage of Secret / Service Role keys in browser code
if (supabasePublishableKey.startsWith('sb_secret_') || supabasePublishableKey.includes('service_role')) {
  console.error(
    'CRITICAL SECURITY WARNING: A Supabase Secret Key was detected in your frontend environment. ' +
    'Never expose secret or service_role keys in client-side browser code! ' +
    'Please use the Supabase Publishable / Anon key (starts with "eyJ..." or "sb_publishable_").'
  );
}

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn(
    '[SKILLIO Supabase] Missing configuration. ' +
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env.local file.'
  );
}

// Fallback dummy values to prevent runtime crashes during initial setup if env is pending
const validUrl = supabaseUrl || 'https://placeholder.supabase.co';
const validKey = supabasePublishableKey || 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey);

// Safe, non-destructive connection test helper
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  if (!supabaseUrl || !supabasePublishableKey) {
    return {
      success: false,
      message: 'Supabase URL or Publishable Key is missing in .env.local.'
    };
  }

  if (supabasePublishableKey.startsWith('sb_secret_')) {
    return {
      success: false,
      message: 'Secret key detected! Please replace it with the public Publishable Key in .env.local.'
    };
  }

  try {
    // Perform a lightweight session check without modifying any data
    const { error } = await supabase.auth.getSession();
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connected to Supabase successfully!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Connection failed.' };
  }
}
