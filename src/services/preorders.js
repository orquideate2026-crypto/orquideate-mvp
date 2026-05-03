import { supabase } from "../lib/supabaseClient.js";

export async function createPreorder(preorder) {
  if (!supabase) {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    return { ok: true, demo: true };
  }

  const { error } = await supabase.from("preorders").insert(preorder);

  if (error) {
    return { ok: false, error };
  }

  return { ok: true };
}
