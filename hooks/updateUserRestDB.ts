import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";

export default async function updateUserRestDB(token: string, column: string, value: string | number | {"$inc": number}) {
    const filter = {'user_token': token};
    await fetch(REST_DB_ENDPOINT_USER + `?q=${JSON.stringify(filter)}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'x-apikey': RESTDB_API_KEY!,
        }
    })
        .then(response => response.json())
        .then(async data => {

            let final_value = value;

            if(typeof value === 'object' && value != null && '$inc' in value){
                const current_value = data[0][column] || 0;

                final_value = current_value + value["$inc"];
            }

            await fetch(REST_DB_ENDPOINT_USER + `/${data[0]._id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    [column]: final_value,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'x-apikey': RESTDB_API_KEY!,
                },
            });
        });
}
