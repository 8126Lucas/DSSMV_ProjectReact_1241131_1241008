import {Stack} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider, useDispatch} from "react-redux";
import {store} from "@/src/flux/store";
import "@/src/i18n";
import AppInitializer from "@/components/AppInitializer";
import * as QuickActions from "expo-quick-actions";
import {useQuickAction} from "expo-quick-actions/hooks";
import {useEffect} from "react";
import {Platform, Share} from "react-native";
import AppNavigator from "@/components/AppNavigator";

export default function RootLayout() {
    const quick_action = useQuickAction();

    useEffect(() => {
        QuickActions.setItems([{
            id: "share_challengers",
            title: "Share Challengers",
            icon: "share_challengers",
            params: { href: "/share" },
        },]);
    }, []);

    useEffect(() => {
        if (quick_action?.id === "share_challengers") {
            setTimeout(() => {
                Share.share({
                    message: "Come play Challengers! Download the app: https://github.com/8126Lucas/DSSMV_ProjectReact_1241131_1241008/releases",
                });
            }, 500);
        }
    }, [quick_action]);
    
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AppInitializer>
                    <AppNavigator/>
                </AppInitializer>
            </Provider>
        </SafeAreaProvider>
    );
}