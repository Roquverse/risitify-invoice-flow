import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// The Supabase URL and anon key are safe to include in client-side code
// These are public values that allow users to connect to your Supabase project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Initialize the Supabase client with proper configuration for auth
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
