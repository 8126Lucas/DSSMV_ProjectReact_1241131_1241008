import {TriviaObject} from "@/src/types/TriviaObject";

export interface TranslatedTrivia {
    hash: string;
    en: TriviaObject;
    es?: TriviaObject;
    pt?: TriviaObject;
}