import { Stack } from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store} from "@/src/flux/store/store";
import "@/src/i18n";
import AppInitializer from "@/components/AppInitializer";
import * as QuickActions from "expo-quick-actions";
import {useQuickAction} from "expo-quick-actions/hooks";
import {useEffect} from "react";
import {Platform, Share} from "react-native";
import MaintenanceRoom from "@/components/MaintenanceRoom";

export default function RootLayout() {
    const quick_action = useQuickAction();

    useEffect(() => {
        QuickActions.setItems([{
            id: "share_challengers",
            title: "Share Challengers",
            icon: Platform.OS === "ios" ? "symbol:square.and.arrow.up" : null,
            params: { href: "/share" },
        },]);
    }, []);

    useEffect(() => {
        if (quick_action?.id === "share_challengers") {
            setTimeout(() => {
                Share.share({
                    message: "Come play Challengers! Download the app: https://8126lucas.github.io/projects/Challengers",
                });
            }, 500);
        }
    }, [quick_action]);
    
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AppInitializer>
                    {store.getState().app.app_state === 'available'
                        ? <Stack screenOptions={{headerShown: false}}/>
                        : <MaintenanceRoom/>
                    }
                </AppInitializer>
            </Provider>
        </SafeAreaProvider>
    );
}