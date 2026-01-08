import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setTheme} from "@/src/flux/themeSlice";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {setUser} from "@/src/flux/userSlice";
import i18n from "i18next";
import {ActivityIndicator, View} from "react-native";
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";
import {setMaintenance} from "@/src/flux/appSlice";
import {storage} from "@/constants/storage";

export default function AppInitializer({children}: {children: React.ReactNode}) {
    const [has_token, setHasToken] = useState<boolean | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loginStatus = async () => {
            const saved_theme = storage.getString('app_theme');
            if(saved_theme === 'light' || saved_theme === 'dark') {
                dispatch(setTheme({
                    theme: saved_theme,
                }));
            }

            const user_token = storage.getString("user_token");
            if(user_token) {
                const filter = {'user_token': user_token};
                await fetch(REST_DB_ENDPOINT_USER + `?q=${JSON.stringify(filter)}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json",
                        'x-apikey': RESTDB_API_KEY!,
                    }
                })
                    .then(response => {
                        if(response.status === 429) {dispatch(setMaintenance());}
                        return response.json();
                    })
                    .then(async data => {
                        dispatch(setUser({
                            username: data[0].username,
                            user_token: user_token,
                            games_played: data[0].games_played,
                            profile_picture: data[0].profile_picture,
                            language: data[0].language,
                        }));
                        await i18n.changeLanguage(data[0].language);
                        setHasToken(true);
                    })
                    .catch((error) => {
                        console.log("Error getting user data from database:", error);
                        setHasToken(false);
                    });
            }
            else {setHasToken(false);}
        };
        loginStatus();
    }, []);

    if (has_token === null) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={50} />
            </View>
        );
    }

    return <>{children}</>;
}