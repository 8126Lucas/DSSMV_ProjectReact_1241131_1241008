import {decode} from "html-entities";

// docker run -ti --rm -p 5000:5000 --env "LT_LOAD_ONLY=en,pt,es" libretranslate/libretranslate

export default async function translate(text: string, output: string) {
    const res = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        body: JSON.stringify({
            q: decode(text),
            source: "en",
            target: output,
            format: "text",
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await res.json();
}