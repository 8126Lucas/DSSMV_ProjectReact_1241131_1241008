import {useCallback, useEffect, useState} from "react";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";
import {supabase_client} from "@/constants/supabaseClient";
import {ActivityIndicator, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {calculateScore} from "@/hooks/calculateScore";
import {REALTIME_POSTGRES_CHANGES_LISTEN_EVENT} from "@supabase/realtime-js";
import {REALTIME_LISTEN_TYPES} from "@supabase/supabase-js";
import QuestionPointsOverlay from "@/components/game/QuestionPointsOverlay";
import GamePointsOverlay from "@/components/game/GamePointsOverlay";
import updateUserRestDB from "@/hooks/updateUserRestDB";
import uploadGameScore from "@/hooks/uploadGameScore";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {useTheme} from "@/hooks/useTheme";
import {setUser} from "@/src/flux/userSlice";
import {GameScoreMetadata} from "@/src/types/GameScoreMetadata";
import * as Haptics from 'expo-haptics';
import {storage} from "@/constants/storage";
import {TriviaResponse} from "@/src/types/TriviaResponse";
import {TriviaObject} from "@/src/types/TriviaObject";
import searchSupabase from "@/hooks/searchSupabase";
import {useAudioPlayer} from "expo-audio";
import {clearGameConfig} from "@/src/flux/gameSlice";

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

async function uploadAnswer(room_token: string, question_index: number, player_uuid: string, username: string, score: number) {
    const { error } = await supabase_client
        .from('in_game_answer_state')
        .insert({
            room: room_token,
            question_index: question_index,
            player_uuid: player_uuid,
            player_name: username,
            total_points: score,
        });
    if(error) {throw error;}
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
    const user = useSelector((state: RootState) => state.user);
    const game_config = useSelector((state: RootState) => state.game);
    const {colors} = useTheme();
    const params = useLocalSearchParams();
    const dispatch = useDispatch();
    const audio_source = require('@/assets/audio/Correct_Choice.mp3');
    const audio_player = useAudioPlayer(audio_source);
    const [trivia, setTrivia] = useState<TriviaResponse | null>(null);
    const [score, setScore] = useState(0);
    const [question_points, setQuestionPoints] = useState(0);
    const [current_question, setCurrentQuestion] = useState(0);
    const [shuffled_answers, setShuffledAnswers] = useState<{[key: number]: string[]}>({});
    const [is_correct, setIsCorrect] = useState<boolean>(false);
    const [points_overlay, setPointsOverlay] = useState<boolean>(false);
    const [leaderboard_data, setLeaderboardData] = useState<{name: string, points: number, user_token: string}[]>([]);
    const [leaderboard_overlay, setLeaderboardOverlay] = useState<boolean>(false);
    const [is_submitting_points, setIsSubmittingPoints] = useState(false);

    const downloadTrivia  = async (room_token: string, retries = 6): Promise<TriviaResponse | null> => {
        console.log("room_token: ", room_token);
        for(let attempt = 0; attempt < retries; attempt++) {
            const {data, error} = await supabase_client
                .from('rooms')
                .select('questions')
                .eq('room', room_token);
            if(error) {throw error;}
            if(data && data.length > 0 && data[0]?.questions) {
                if(user.language !== 'en') {
                    let objects: TriviaObject[] = [];
                    for(let question of data[0]?.questions) {
                        const hash: string = question.question + question.correct_answer + question.incorrect_answers + question.difficulty;
                        if(!(await searchSupabase(hash))) {
                            if(user.language === 'es') {
                                const {data, error} = await supabase_client
                                    .from('question_translation_bank')
                                    .select('es')
                                    .eq('hash', hash);
                                if (error) {throw error;}
                                if (data && data.length > 0 && data[0]?.es) {objects.push(data[0]?.es);}
                            }
                            else if(user.language === 'pt') {
                                const {data, error} = await supabase_client
                                    .from('question_translation_bank')
                                    .select('pt')
                                    .eq('hash', hash);
                                if(error) {throw error;}
                                if (data && data.length > 0 && data[0]?.pt) {objects.push(data[0]?.pt);}
                            }
                        }
                        else {
                            objects.push(question);
                        }
                    }
                    return {data: objects} as TriviaResponse;
                }
                return {data: data[0].questions} as TriviaResponse;
            }
            if(attempt < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        return null;
    }


    const handleAnswer = useCallback(async (answer: string, time_left: number) => {
        setPointsOverlay(true);
        let new_score = score;
        if (answer === data.correct_answer) {
            await audio_player.seekTo(0);
            audio_player.play();
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setIsCorrect(true);
            const points = calculateScore(time_left, data.difficulty, data.type);
            setQuestionPoints(points);
            const old_score = score;
            setScore(score + points);
            new_score += points;
            console.log(`${old_score} + ${points}`);
        } else {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setIsCorrect(false);
            const points = 0;
            setQuestionPoints(0);
            console.log(`${score} + ${points}`);
        }
        try {
            if (user.user_token) {
                await uploadAnswer(params.room_token.toString(), current_question, user.user_token, (user.username ? user.username : "Unknown Player"), new_score);
            } else {
                console.error('No user token found!');
            }
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    }, [trivia, current_question, score]);

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
        let timeout_id: number;
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
                        timeout_id = setTimeout(() => {
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
                    timeout_id = setTimeout(() => {
                        setCurrentQuestion(payload.payload.question_index + 1);
                    }, Math.max(0, delay));
                }
            ).subscribe();
        }
        return () => {
            if (timeout_id) {
                clearTimeout(timeout_id);
            }
            answer_channel.unsubscribe();
        };
    }, [params.number_of_players, params.room_token, params.user_type]);

    useEffect(() => {
        const fetchData = async () => {
            if (trivia && trivia.data && current_question >= trivia.data.length) {
                const {data, error} = await supabase_client
                    .from('in_game_answer_state')
                    .select('name: player_name, points: total_points, user_token: player_uuid')
                    .eq('room', params.room_token)
                    .eq('question_index', current_question-1);
                console.log(data);
                if (error) {
                    throw error;
                }
                setLeaderboardData(data);
                setLeaderboardOverlay(true);
            }
        }
        fetchData();
    }, [current_question, trivia]);

    if(!trivia || !trivia.data || !Array.isArray(trivia.data)) {
        return <ActivityIndicator size={"large"} color={colors.text} style={{flex: 1}} />
    }
    if(current_question >= trivia.data.length && leaderboard_data.length === 0) {
        return <ActivityIndicator size={"large"} color={colors.text} style={{flex: 1}} />
    }
    else if (current_question >= trivia.data.length) {
        return <GamePointsOverlay
            player_scores={leaderboard_data}
            isVisible={leaderboard_overlay}
            onClose={async () => {
                if(is_submitting_points) {return;}
                if(leaderboard_data[0].name === user.username) {await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}
                setIsSubmittingPoints(true);
                try {
                    const token = storage.getString('user_token');
                    if (token) {
                        const game_metadata: GameScoreMetadata = {
                            room_token: params.room_token.toString(),
                            category: game_config.category,
                            difficulty: game_config.difficulty,
                            type: game_config.type,
                            number_of_questions: game_config.number_of_questions,
                            data: leaderboard_data,
                        }
                        await updateUserRestDB(token, "games_played", { "$inc": 1 });
                        await uploadGameScore(token, score, game_metadata);
                        dispatch(setUser({
                            username: user.username,
                            user_token: user.user_token,
                            games_played: user.games_played! + 1,
                            profile_picture: user.profile_picture,
                            language: user.language,
                        }));
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    dispatch(clearGameConfig());
                    setLeaderboardOverlay(false);
                    router.replace('/home');
                }
            }}
            duration={200} />
    }

    const data = trivia.data[current_question];
    if(data.type === 'multiple') {
        return (
            <View style={{flex: 1}}>
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
                <QuestionPointsOverlay
                    points={question_points}
                    correct={is_correct}
                    isVisible={points_overlay}
                    onClose={() => setPointsOverlay(false)}
                    duration={2000} />
            </View>
        );
    } else if(data.type === 'boolean') {
        return (
            <View style={{flex: 1}}>
                    <BooleanQuestion
                    difficulty={data.difficulty}
                    category={data.category}
                    question={data.question}
                    correct_answer={data.correct_answer}
                    question_i={current_question+1}
                    size={trivia.data.length}
                    onPress={handleAnswer}/>
                <QuestionPointsOverlay
                    points={question_points}
                    correct={is_correct}
                    isVisible={points_overlay}
                    onClose={() => setPointsOverlay(false)}
                    duration={2000} />
            </View>
        );
    }
}