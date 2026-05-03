import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseUrl = Boolean(supabaseUrl);
const hasSupabaseAnonKey = Boolean(supabaseAnonKey);

console.log("URL existe:", hasSupabaseUrl);
console.log("Anon key existe:", hasSupabaseAnonKey);
console.log("Supabase configurado:", hasSupabaseUrl && hasSupabaseAnonKey);

export const supabase =
  hasSupabaseUrl && hasSupabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
