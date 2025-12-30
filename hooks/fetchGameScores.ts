import {REST_DB_ENDPOINT_LEADERBOARD} from "@/constants/RestDBEndpoints";
import {GameScore} from "@/src/types/GameScore";

export const fetchGameScores = async (user_token: string | null) => {
    let url: string = REST_DB_ENDPOINT_LEADERBOARD;
    if(user_token) {
        const filter = {'user_token': user_token};
        url += `?q=${JSON.stringify(filter)}`;
    }
    let reviewed_data: GameScore[] = [];
    await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'x-apikey': process.env.EXPO_PUBLIC_RESTDB_API,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(let i = 0; i < data.length; i++) {
                reviewed_data.push({
                    _id: data[i]._id,
                    game_date: data[i].game_date,
                    score: data[i].score,
                    time: data[i].time,
                    metadata: data[i].metadata,
                });
            }
            console.log(reviewed_data);
        });
    return reviewed_data;
}