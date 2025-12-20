export interface QuestionProps {
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    question_i: number;
    size: number;
    onPress: (answer: string, time: number) => void;
}