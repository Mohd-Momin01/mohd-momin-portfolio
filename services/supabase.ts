import { createClient } from '@supabase/supabase-js';
import { ContactFormData, Certificate } from '../types';

// ------------------------------------------------------------------
// SUPABASE CONFIGURATION
// ------------------------------------------------------------------
// Project URL provided for the migration
const SUPABASE_URL = 'https://qpwdkiymrwfhrxkkhgyf.supabase.co';

// Configured with the provided Anon Public Key
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwd2RraXltcndmaHJ4a2toZ3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzQyNTMsImV4cCI6MjA4MTIxMDI1M30.HWl_k1x0CjE7MnzJ7iNV-LTp52sSB_4yp46ncZl24YM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ------------------------------------------------------------------
// SERVICES
// ------------------------------------------------------------------

/**
 * Submits contact form data to the 'contact_messages' table.
 */
export const submitContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    // We let Supabase handle the 'created_at' timestamp automatically via default values
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: data.name,
          email: data.email,
          message: data.message
        }
      ]);

    if (error) {
      // Log full error object for debugging
      console.error("Supabase Insert Error:", JSON.stringify(error, null, 2));
      throw new Error(error.message || "Database insertion failed");
    }

    return true;
  } catch (err: any) {
    console.error("Submission failed:", err.message || err);
    throw err;
  }
};

/**
 * Fetches certificates from the 'certificates' table.
 */
export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching certificates:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error fetching certificates:", err);
    return [];
  }
};