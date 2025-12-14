import { Stack } from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store} from "@/src/flux/store/store";


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                    <Stack screenOptions={{headerShown: false}}/>
            </Provider>
        </SafeAreaProvider>
    );
}