import {REST_DB_ENDPOINT_LEADERBOARD} from "@/constants/RestDBEndpoints";

export default async function uploadGameScore(token: string, final_score: number) {
    const date: Date = new Date();
    const formatted_date: string = date.toLocaleDateString('pt-PT');
    await fetch(REST_DB_ENDPOINT_LEADERBOARD, {
        method: "POST",
        body: JSON.stringify({
            user_token: token,
            game_date: formatted_date,
            score: final_score,
        }),
        headers: {
            "Content-Type": "application/json",
            'x-apikey': process.env.EXPO_PUBLIC_RESTDB_API,
        },
    });
}