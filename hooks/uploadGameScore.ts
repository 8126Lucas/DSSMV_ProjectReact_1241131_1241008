import {REST_DB_ENDPOINT_LEADERBOARD} from "@/constants/RestDBEndpoints";
import {GameScoreMetadata} from "@/src/types/GameScoreMetadata";
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";

export default async function uploadGameScore(token: string, final_score: number, metadata: GameScoreMetadata) {
    const date: Date = new Date();
    const formatted_date: string = date.toLocaleDateString('pt-PT');
    await fetch(REST_DB_ENDPOINT_LEADERBOARD, {
        method: "POST",
        body: JSON.stringify({
            user_token: token,
            game_date: formatted_date,
            score: final_score,
            time: Date.now(),
            metadata: JSON.stringify(metadata),
        }),
        headers: {
            "Content-Type": "application/json",
            'x-apikey': RESTDB_API_KEY,
        },
    });
}