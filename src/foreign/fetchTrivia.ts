import {APIResponse} from "@/src/types/APIResponse";
import {TriviaResponse} from "@/src/types/TriviaResponse";

export default async function fetchTrivia() {
    const res = await fetch("https://opentdb.com/api.php?amount=50", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const result = (await res.json()) as APIResponse;
    return result.results as TriviaResponse;
}