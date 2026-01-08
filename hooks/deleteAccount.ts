import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";

export const deleteAccount = async (token: string) => {
    const filter = {'user_token': token};
    await fetch(REST_DB_ENDPOINT_USER + `?q=${JSON.stringify(filter)}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'x-apikey': RESTDB_API_KEY!,
        }
    });
}