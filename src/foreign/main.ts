import fetchTrivia from "@/src/foreign/fetchTrivia";
import parseTrivia from "@/src/foreign/parseTrivia";
import searchSupabase from "@/hooks/searchSupabase";
import parseTranslate from "@/src/foreign/parseTranslate";
import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";
import uploadSupabase from "@/src/foreign/uploadSupabase";
import {TriviaResponse} from "@/src/types/TriviaResponse";

async function main() {
    let stop: boolean = false;
    let zero_count = 0;
	while(!stop) {
	    let translated_count: number = 0;
		console.log("-> fetchTrivia");
		const trivia_response: TriviaResponse = await fetchTrivia();
		console.log("trivia_response:", trivia_response);
		console.log("-> parseTrivia");
		const pre_translated_trivia: TranslatedTrivia[] = parseTrivia(trivia_response as any);
		console.log("pre_translated_trivia:", pre_translated_trivia);
		let translations: TranslatedTrivia[] = [];
		for(let pre_object of pre_translated_trivia) {
			console.log("-> searchSupabase:", pre_object.hash);
			if(await searchSupabase(pre_object.hash)) {
				translated_count++;
				console.log("-> parseTranslate")
				const translated_trivia = await parseTranslate(pre_object);
				translations.push(translated_trivia);
			}
		}
		console.log("translations:", translations);
		await uploadSupabase(translations);
		console.log(`Translated ${translated_count}/50 trivia objects!`);
        if(translated_count === 0) {zero_count++;}
        if(zero_count === 10) {stop = true;}
        console.log("Zero Count:", zero_count);
	}
}

main().catch((error) => console.error(error));