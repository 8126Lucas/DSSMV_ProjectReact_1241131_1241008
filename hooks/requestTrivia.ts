import {supabase_client} from "@/constants/supabaseClient";
import {TriviaResponse} from "@/src/types/TriviaResponse";
import {APIResponse} from "@/src/types/APIResponse";


export async function requestTrivia(room_token: string, url: string): Promise<TriviaResponse | null> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const result = (await response.json()) as APIResponse;
        const trivia = result.results as TriviaResponse;

        console.log('result is: ', JSON.stringify(trivia, null, 4));

        const { error } = await supabase_client.from('rooms')
            .insert({room: room_token, questions: trivia});

        console.log(error);

        return trivia;
    } catch (error) {
        console.error(error);
        return null;
    }
}