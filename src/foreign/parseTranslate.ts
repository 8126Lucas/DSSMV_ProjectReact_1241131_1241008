import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";
import translate from "@/src/foreign/translate";
import {decode} from "html-entities";

export default async function parseTranslate(object: TranslatedTrivia)  {
    const object_question = decode(object.en.question);
    const object_question_es = (await translate(object_question, 'es')).translatedText;
    const object_question_pt = (await translate(object_question, 'pt')).translatedText;
    const object_correct_answer = decode(object.en.correct_answer);
    const object_correct_answer_es = (await translate(object_correct_answer, 'es')).translatedText;
    const object_correct_answer_pt = (await translate(object_correct_answer, 'pt')).translatedText;
    const object_incorrect_answers = object.en.incorrect_answers;
    const object_incorrect_answers_decoded: string[] = []
    const object_incorrect_answers_es: string[] = [];
    const object_incorrect_answers_pt: string[] = [];
    for(let answer of object_incorrect_answers) {
        const answer_decoded = decode(answer);
        object_incorrect_answers_decoded.push(answer_decoded);
        const answer_es = (await translate(answer_decoded, 'es')).translatedText;
        object_incorrect_answers_es.push(answer_es);
        const answer_pt = (await translate(answer_decoded, 'pt')).translatedText;
        object_incorrect_answers_pt.push(answer_pt);
    }
    const object_category = decode(object.en.category);
    const object_category_es = (await translate(object_category, 'es')).translatedText;
    const object_category_pt = (await translate(object_category, 'pt')).translatedText;

    return {
        hash: object.hash,
        en: {
            question: object_question,
            difficulty: object.en.difficulty,
            category: object_category,
            correct_answer: object_correct_answer,
            incorrect_answers: object_incorrect_answers_decoded,
            type: object.en.type,
        },
        es: {
            question: object_question_es,
            difficulty: object.en.difficulty,
            category: object_category_es,
            correct_answer: object_correct_answer_es,
            incorrect_answers: object_incorrect_answers_es,
            type: object.en.type,
        },
        pt: {
            question: object_question_pt,
            difficulty: object.en.difficulty,
            category: object_category_pt,
            correct_answer: object_correct_answer_pt,
            incorrect_answers: object_incorrect_answers_pt,
            type: object.en.type,
        },
    } as TranslatedTrivia;
}