import {REST_DB_ENDPOINT_LEADERBOARD, REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import { File, Paths } from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";

export default async function exportUserData(token: string) {
    let json_data: {user_data: any, leaderboard_data: any};
    try {
        const filter = {'user_token': token};
        const user_fetch = await fetch(REST_DB_ENDPOINT_USER + `?q=${JSON.stringify(filter)}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'x-apikey': RESTDB_API_KEY!,
            }
        });
        const user_data = await user_fetch.json();
        const leaderboard_fetch = await fetch(REST_DB_ENDPOINT_LEADERBOARD + `?q=${JSON.stringify(filter)}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'x-apikey': RESTDB_API_KEY!,
            }
        });
        const leaderboard_data = await leaderboard_fetch.json();
        json_data = {user_data, leaderboard_data};
        const file = new File(Paths.document, 'challengers.json');
        file.write(JSON.stringify(json_data));
        await shareAsync(file.uri);
    } catch (error) {
        console.log(error);
    }
}