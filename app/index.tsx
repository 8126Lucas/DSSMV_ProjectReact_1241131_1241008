import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Redirect, router} from "expo-router";
import {ActivityIndicator, View} from "react-native";

export default function App() {
    const [has_token, setHasToken] = useState<boolean | null>(null);

    useEffect(() => {
        const loginStatus = async () => {
            const user_token = await AsyncStorage.getItem("user_token");
            setHasToken(!!user_token);
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

    return <Redirect href={has_token ? './home' : './login'} />;
}