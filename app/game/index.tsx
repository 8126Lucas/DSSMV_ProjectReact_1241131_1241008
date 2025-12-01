import {Component} from "react";
import {useLocalSearchParams} from "expo-router";
import {TriviaResponse} from "@/hooks/requestTrivia";
import ChoiceQuestion from "@/components/game/ChoiceQuestion";
import BooleanQuestion from "@/components/game/BooleanQuestion";

class GameScreen extends Component {
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
        // const params = useLocalSearchParams();
        // const trivia_data = (params.trivia) as TriviaResponse;
        let trivia_data: any;
        for(let i = 0; i < Object.keys(trivia_data.data).length; i++) {
            const data = trivia_data.data[i];
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
                        size={Object.keys(trivia_data.data).length} />
                );
            } else if(data.type === 'boolean') {
                return (
                    <BooleanQuestion
                        difficulty={data.difficulty}
                        category={data.category}
                        question={data.question}
                        correct_answer={data.correct_answer}
                        question_i={i+1}
                        size={Object.keys(trivia_data.data).length} />
                );
            }
        }
    }
}