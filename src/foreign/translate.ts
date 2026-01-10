import {TranslatedTrivia} from "@/src/types/TranslatedTrivia";

// docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
// docker exec -it ollama ollama pull phi3

export default async function translate(prompt: string) {
    const res = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
            model: "phi3",
            prompt: prompt,
            format: "json",
            stream: false,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await res.json() as TranslatedTrivia;
}