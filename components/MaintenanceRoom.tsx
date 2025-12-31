import {View, Text, ActivityIndicator, StyleSheet} from "react-native";
import {useTheme} from "@/hooks/useTheme";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function MaintenanceRoom() {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {t} = useTranslation();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {color: colors.text, fontSize: 34}]}>{t("THE APP IS CURRENTLY ON MAINTENANCE")}</Text>
            <Text style={[styles.text, {color: colors.secondaryText, fontSize: 24}]}>{t("WE ARE SORRY FOR THE INCONVENIENCE")}</Text>
            <ActivityIndicator size={100} color={colors.primaryAction1} />
            <Text style={[styles.bottom_text, {marginBottom: insets.bottom}]}>{t("HOPEFULLY, IT WILL END")}</Text>
        </View>
    )
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
    bottom_text: {
        color: colors.secondaryText,
        fontSize: 14,
        position: "absolute",
        bottom: 0,
    }
});