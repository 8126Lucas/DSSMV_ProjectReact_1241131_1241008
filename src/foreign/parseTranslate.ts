import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";
import translate from "@/src/foreign/translate";
import {decode} from "html-entities";

export default async function parseTranslate(object: TranslatedTrivia) {
    const object_question = decode(object.en.question);
    const object_correct_answer = decode(object.en.correct_answer);
    const object_incorrect_answers = object.en.incorrect_answers;
    const object_incorrect_answers_decoded: string[] = [];
    for(let answer of object_incorrect_answers) {
        const answer_decoded = decode(answer);
        object_incorrect_answers_decoded.push(answer_decoded);
    }
    const object_category = decode(object.en.category);

    const object_to_translate: TranslatedTrivia = {
        hash: object.hash,
        en: {
            question: object_question,
            difficulty: object.en.difficulty,
            category: object_category,
            correct_answer: object_correct_answer,
            incorrect_answers: object_incorrect_answers_decoded,
            type: object.en.type,
        },
    };

    const prompt = `
        You are a professional translator for a Trivia Game.
        Translate the content of the "Input JSON" into Portuguese (pt) and Spanish (es).
        
        RULES:
          1. DO NOT translate any JSON keys. Keep them exactly as they are (e.g., keep "question", "category", "correct_answer").
          2. Keep the "hash" and "en" fields exactly as they are.
          3. Translate the values of the keys "question", "category", "correct_answer", and "incorrect_answers".
          4. Detect context from the "category" and "question" to translate ambiguous words (e.g., "Apple" the company vs "Apple" the fruit).
          5. Output ONLY the valid JSON, matching the "Response Template" below exactly.
        
        Input JSON:
        ${JSON.stringify(object_to_translate)}
        
        Response Template:
          {
            "hash": "${object_to_translate.hash}",
            "en": ${JSON.stringify(object_to_translate.en)},
            "pt": {
              "category": "...",
              "type": "${object_to_translate.en.type}",
              "difficulty": "${object_to_translate.en.difficulty}",
              "question": "...",
              "correct_answer": "...",
              "incorrect_answers": ["...", "...", "..."]
            },
            "es": {
              "category": "...",
              "type": "${object_to_translate.en.type}",
              "difficulty": "${object_to_translate.en.difficulty}",
              "question": "...",
              "correct_answer": "...",
              "incorrect_answers": ["...", "...", "..."]
            }
          }
    `;

    return await translate(prompt);
}