import {createClient} from "@supabase/supabase-js";

export const supabase_client = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_API,
);