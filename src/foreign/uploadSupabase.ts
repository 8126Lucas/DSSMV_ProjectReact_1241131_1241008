import {supabase_client} from "@/constants/supabaseClient";
import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";

export default async function uploadSupabase(questions: TranslatedTrivia[]) {
    const { error } = await supabase_client
        .from('question_translation_bank')
        .insert(questions);
    if(error) {throw error;}
}