import {useTheme} from "@/hooks/useTheme";
import {useCallback, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import * as Network from "expo-network";
import {NetworkStateType} from "expo-network";
import {setAvailable, setNoInternet, setRetryOn} from "@/src/flux/appSlice";
import {useDispatch} from "react-redux";

export default function OfflineRoom() {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(setRetryOn());
        setRefreshing(false);
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            contentContainerStyle={styles.container}>
                <Text style={[styles.text, {color: colors.text, fontSize: 34}]}>{t("YOU ARE OFFLINE!")}</Text>
                <Text style={[styles.text, {color: colors.secondaryText, fontSize: 24}]}>{t("THE APP REQUIRES AN INTERNET CONNECTION")}</Text>
                <Feather name="wifi-off" size={100} color={colors.primaryAction2} />
        </ScrollView>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        rowGap: 50,
        padding: 20,
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
    },
});