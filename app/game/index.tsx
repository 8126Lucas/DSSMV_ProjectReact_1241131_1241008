import {useCallback, useEffect, useState} from "react";
import {TriviaResponse} from "@/hooks/requestTrivia";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";
import {supabase_client} from "@/constants/supabaseClient";
import {ActivityIndicator, Vibration} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {calculateScore} from "@/hooks/calculateScore";
import {REALTIME_POSTGRES_CHANGES_LISTEN_EVENT} from "@supabase/realtime-js";
import {REALTIME_LISTEN_TYPES} from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function checkAnswers(room_token: string, question_index: number): Promise<number> {
    const {data, error} = await supabase_client
        .from('in_game_answer_state')
        .select('created_at')
        .eq('room', room_token)
        .eq('question_index', question_index)
    if(error) {throw error;}
    return data?.length;
}

function toNextQuestion(number_of_players: number, number_of_answers: number): boolean {
    return number_of_answers === number_of_players;
}

async function uploadAnswer(room_token: string, question_index: number, player_uuid: string) {
    const { error } = await supabase_client
        .from('in_game_answer_state')
        .insert({
            room: room_token,
            question_index: question_index,
            player_uuid: player_uuid,
        });
    if(error) {throw error;}
}

async function downloadTrivia(room_token: string, retries = 6): Promise<TriviaResponse | null> {
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

    const handleAnswer = useCallback(async (answer: string, time_left: number) => {
        if (answer === data.correct_answer) {
            const points = calculateScore(time_left, data.difficulty, data.type);
            const old_score = score;
            setScore(score + points);
            console.log(`${old_score} + ${points}`);
        } else {
            const points = 0;
            const old_score = score;
            setScore(score + points);
            console.log(`${old_score} + ${points}`);
        }
        try {
            const player_uuid = await AsyncStorage.getItem('user_token');
            if (player_uuid) {
                await uploadAnswer(params.room_token.toString(), current_question, player_uuid);
            } else {
                console.error('No user token found!');
            }
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    }, [trivia, current_question]);

    useEffect(() => {
        const getTrivia = async () => {
            const trivia_response = await downloadTrivia(params.room_token as string);
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

    useEffect(() => {
        const answer_channel = supabase_client.channel(`answer:${params.room_token}`);
        if(params.user_type === 'host') {
            answer_channel.on(
                'postgres_changes',
                {
                    event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
                    schema: 'public',
                    table: 'in_game_answer_state',
                    filter: `room=eq.${params.room_token}`,
                },
                async (payload) => {
                    const question_index = payload.new.question_index;
                    const number_of_answers = await checkAnswers(params.room_token as string, question_index);
                    if(toNextQuestion(+params.number_of_players, number_of_answers)) {
                        const start_time = Date.now() + 700;
                        await answer_channel.send({
                            type: 'broadcast',
                            event: 'next_question',
                            payload: {start_time, question_index: question_index},
                        });
                        setTimeout(() => {
                            setCurrentQuestion(question_index + 1);
                        }, Math.max(0, start_time - Date.now()));
                    }
                }
            ).subscribe();
        }
        else if(params.user_type === 'guest') {
            answer_channel.on(
                REALTIME_LISTEN_TYPES.BROADCAST,
                { event: 'next_question' },
                (payload) => {
                    const delay = payload.payload.start_time - Date.now();
                    setTimeout(() => {
                        setCurrentQuestion(payload.payload.question_index + 1);
                    }, Math.max(0, delay));
                }
            ).subscribe();
        }
        return () => {
            answer_channel.unsubscribe();
        };
    }, [params.number_of_players, params.room_token, params.user_type]);

    useEffect(() => {
        if (trivia && trivia.data && current_question >= trivia.data.length) {
            router.navigate('./home');
        }
    }, [current_question, trivia]);

    if(!trivia || !trivia.data || !Array.isArray(trivia.data)) {
        return <ActivityIndicator size={"large"} color={'black'} style={{flex: 1}} />
    }
    if(!trivia || !trivia.data || !Array.isArray(trivia.data) || current_question >= trivia.data.length) {
        return <ActivityIndicator size={"large"} color={'black'} style={{flex: 1}} />
    }

    const data = trivia.data[current_question];
    if(data.type === 'multiple') {
        return (
            <ChoiceQuestion
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