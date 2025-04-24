
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// The Supabase URL and anon key are safe to include in client-side code
// These are public values that allow users to connect to your Supabase project
const supabaseUrl = 'https://bywxnsuovfnqsegrizsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5d3huc3VvdmZucXNlZ3JpenNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNzMzNDksImV4cCI6MjA2MDg0OTM0OX0.h46ZjDE6Gv_Wj9-lff6jiOVJERu-2NWPM2Z_q1QVko0';

// Initialize the Supabase client with proper configuration for auth
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
