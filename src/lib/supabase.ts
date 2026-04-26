import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isValidUrl = typeof supabaseUrl === "string" && /^(https?:)\/\//i.test(supabaseUrl);

export const supabase =
  isValidUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
        },
      })
    : null;