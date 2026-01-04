import {TriviaObject} from "@/src/types/TriviaObject";
import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";

export default function parseTrivia(objects: TriviaObject[]) {
    let ready_to_translate: TranslatedTrivia[] = [];
    for(let object of objects) {
        const hash: string = object.question + object.correct_answer + object.incorrect_answers + object.difficulty;
        ready_to_translate.push({
            hash: hash,
            en: object,
        });
    }
    return ready_to_translate;
}