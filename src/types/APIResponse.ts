import {TriviaResponse} from "@/src/types/TriviaResponse";

export interface APIResponse {
    response_code: number,
    results: TriviaResponse
}
