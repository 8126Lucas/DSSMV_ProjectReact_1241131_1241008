import {supabase_client} from "@/hooks/supabaseClient";

interface TriviaObject {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answer: string[],
}

export interface TriviaResponse {
    data: TriviaObject[];
}

export async function requestTrivia(url: string): Promise<TriviaResponse | null> {
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
        const result = (await response.json()) as TriviaResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        const { error } = await supabase_client.from('rooms')
            .insert({ questions: result });

        console.log(error);

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}