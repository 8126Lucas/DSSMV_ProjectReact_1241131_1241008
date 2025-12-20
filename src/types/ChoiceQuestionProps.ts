import {QuestionProps} from "@/src/types/QuestionProps";

export interface ChoiceQuestionProps extends QuestionProps {
    incorrect_answers: string[];
    answers: string[];
}