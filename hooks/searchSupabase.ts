import {supabase_client} from "@/constants/supabaseClient";

export default async function searchSupabase(hash: string) {
    const {data, error} = await supabase_client
        .from('question_translation_bank')
        .select('hash')
        .eq('hash', hash)
    if(error) {throw error;}
    return (data?.length === 0);
}