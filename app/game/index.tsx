import {Component, useCallback, useEffect, useState} from "react";
import {TriviaResponse} from "@/hooks/requestTrivia";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";
import {supabase_client} from "@/constants/supabaseClient";
import {ActivityIndicator} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {calculateScore} from "@/hooks/calculateScore";

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
    const [score, setScore] = useState(0);
    const [current_question, setCurrentQuestion] = useState(0);
    const [shuffled_answers, setShuffledAnswers] = useState<{[key: number]: string[]}>({});

    const handleAnswer = useCallback((answer: string, time_left: number) => {
        if(answer === data.correct_answer) {
            const points = calculateScore(time_left, data.difficulty, data.type);
            const old_score = score;
            setScore(score + points);
            console.log(`${old_score} + ${points} = ${score}`);
            setCurrentQuestion(current_question + 1);

        }
        else {
            const points = 0;
            const old_score = score;
            setScore(score + points);
            console.log(`${old_score} + ${points} = ${score}`);
            setCurrentQuestion(current_question + 1);
        }

    }, [trivia, current_question]);

    useEffect(() => {
        const getTrivia = async () => {
            const trivia_response = await uploadTrivia(params.room_token as string);
            if(trivia_response?.data) {
                const shuffled: {[key: number]: string[]} = {};
                trivia_response.data.forEach((question, index) => {
                    if (question.type === 'multiple') {
                        const answers = [...question.incorrect_answers, question.correct_answer];
                        shuffled[index] = shuffle(answers);
                    }
                });
                setShuffledAnswers(shuffled);
                setTrivia(trivia_response);
            }
        };
        getTrivia()
    }, [params.room_token]);

    if(!trivia || !trivia.data || !Array.isArray(trivia.data)) {
        return <ActivityIndicator size={"large"} color={'black'} style={{flex: 1}} />
    }

    const data = trivia.data[current_question];
    if(data.type === undefined) {
        router.navigate('./home');
    } else if(data.type === 'multiple') {
        return (
            <ChoiceQuestion
                key={current_question}
                difficulty={data.difficulty}
                category={data.category}
                question={data.question}
                correct_answer={data.correct_answer}
                incorrect_answers={data.incorrect_answers}
                answers={shuffled_answers[current_question]}
                question_i={current_question+1}
                size={trivia.data.length}
                onPress={handleAnswer} />
        );
    } else if(data.type === 'boolean') {
        return (
            <BooleanQuestion
                difficulty={data.difficulty}
                category={data.category}
                question={data.question}
                correct_answer={data.correct_answer}
                question_i={current_question+1}
                size={trivia.data.length}
                onPress={handleAnswer}/>
        );
    }
}