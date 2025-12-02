import {Component, useEffect, useState} from "react";
import {TriviaResponse} from "@/hooks/requestTrivia";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";
import {supabase_client} from "@/constants/supabaseClient";
import {ActivityIndicator} from "react-native";
import {useLocalSearchParams} from "expo-router";

async function uploadTrivia(room_token: string, retries = 6): Promise<TriviaResponse | null> {
    console.log("room_token: ", room_token);
    for(let attempt = 0; attempt < retries; attempt++) {
        const {data, error} = await supabase_client
            .from('rooms')
            .select('questions')
            .eq('room', room_token);
        if(error) {throw error;}
        if(data && data.length > 0 && data[0]?.questions) {
            return {data: data[0].questions} as TriviaResponse;
        }
        if(attempt < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    return null;
}

function shuffle(data: string[]): string[] {
    let current_index = data.length;
    let random_index;
    while (current_index !== 0) {
        random_index = Math.floor(Math.random() * current_index);
        current_index--;

        [data[current_index], data[random_index]] = [data[random_index], data[current_index]];
    }
    return data;
}

export default function GameScreen() {
    const params = useLocalSearchParams();
    const [trivia, setTrivia] = useState<TriviaResponse | null>(null);

    useEffect(() => {
        const getTrivia = async () => {
            const trivia_response = await uploadTrivia(params.room_token as string);
            setTrivia(trivia_response);
        };
        getTrivia()
    }, [params.room_token]);

    if(!trivia || !trivia.data || !Array.isArray(trivia.data)) {
        return <ActivityIndicator size={"large"} color={'black'} style={{flex: 1}} />
    }

    for(let i = 0; i < trivia.data.length; i++) {
        const data = trivia.data[i];
        if(data.type === 'multiple') {
            let data_shuffled = data.incorrect_answers;
            data_shuffled.push(data.correct_answer);
            data_shuffled = shuffle(data_shuffled);
            return (
                <ChoiceQuestion
                    difficulty={data.difficulty}
                    category={data.category}
                    question={data.question}
                    correct_answer={data.correct_answer}
                    incorrect_answers={data.incorrect_answers}
                    answers={data_shuffled}
                    question_i={i+1}
                    size={trivia.data.length} />
            );
        } else if(data.type === 'boolean') {
            return (
                <BooleanQuestion
                    difficulty={data.difficulty}
                    category={data.category}
                    question={data.question}
                    correct_answer={data.correct_answer}
                    question_i={i+1}
                    size={trivia.data.length} />
            );
        }
    }
}