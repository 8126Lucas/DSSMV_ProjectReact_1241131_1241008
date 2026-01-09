import {APIResponse} from "@/src/types/APIResponse";
import {TriviaResponse} from "@/src/types/TriviaResponse";

export default async function fetchTrivia() {
    const res = await fetch("https://opentdb.com/api.php?amount=50", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
	if(!res.ok) {
		console.log("!!! fetchTrivia was not ok!");
		console.log(">", res.statusText);
	}
    const result = (await res.json()) as APIResponse;
    return result.results as TriviaResponse;
}