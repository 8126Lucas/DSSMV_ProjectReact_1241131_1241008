import {Component} from "react";
import {TriviaResponse} from "@/hooks/requestTrivia";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";
import {supabase_client} from "@/hooks/supabaseClient";
import {ActivityIndicator} from "react-native";

interface GameScreenProps {
    room_token: string;
    trivia: TriviaResponse;
}

interface GameScreenState {
    room_token: string;
    trivia: TriviaResponse | null;
    isLoading: boolean;
}

class GameScreen extends Component<GameScreenProps, GameScreenState> {
    constructor(props: any) {
        super(props);
        const params = new URLSearchParams(window.location.search);
        const room_token = params.get('room_token') || props.room_token;

        this.state = {
            room_token: room_token,
            trivia: null,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getTrivia(this.state.room_token)
            .then(data => {
                this.setState({ trivia: data, isLoading: false });
            })
            .catch(() => {
                this.setState({ isLoading: false, trivia: null });
            });
    }

    async getTrivia(room_token: string): Promise<TriviaResponse | null> {
        console.log("room_token: ", room_token);
        const {data, error} = await supabase_client
            .from('rooms')
            .select('questions')
            .eq('room', room_token);
        if(error) {throw error;}
        return data[0].questions as TriviaResponse;
    }

    shuffle(data: string[]): string[] {
        let current_index = data.length;
        let random_index;
        while (current_index !== 0) {
            random_index = Math.floor(Math.random() * current_index);
            current_index--;

            [data[current_index], data[random_index]] = [data[random_index], data[current_index]];
        }
        return data;
    };

    render() {
        const { trivia, isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }
        console.log(trivia);
        for(let i = 0; i < Object.keys(trivia!.data).length; i++) {
            const data = trivia!.data[i];
            if(data.type === 'multiple') {
                let data_shuffled = data.incorrect_answer;
                data_shuffled.push(data.correct_answer);
                data_shuffled = this.shuffle(data_shuffled);
                return (
                    <ChoiceQuestion
                        difficulty={data.difficulty}
                        category={data.category}
                        question={data.question}
                        correct_answer={data.correct_answer}
                        incorrect_answers={data.incorrect_answer}
                        answers={data_shuffled}
                        question_i={i+1}
                        size={Object.keys(trivia!.data).length} />
                );
            } else if(data.type === 'boolean') {
                return (
                    <BooleanQuestion
                        difficulty={data.difficulty}
                        category={data.category}
                        question={data.question}
                        correct_answer={data.correct_answer}
                        question_i={i+1}
                        size={Object.keys(trivia!.data).length} />
                );
            }
        }
    }
}

export default GameScreen;