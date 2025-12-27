import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontSize } from "@/constants/theme";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const insets = useSafeAreaInsets();

    const pathname = usePathname();
    const isActive = (route: string) => pathname.includes(route);

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/leaderboard")}>
                <FontAwesome6 name="trophy" size={isActive('/leaderboard') ? 24 : 20} color={isActive('/leaderboard') ? colors.primaryAction4 : colors.backgroundColor}/>
                {isActive('/leaderboard') && (<Text style={[styles.button_text, { color: colors.primaryAction4 }]}>{t('LEADERBOARD')}</Text>)}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/home")}>
                <FontAwesome6 name="house-chimney" size={isActive('/home') ? 24 : 20} color={isActive('/home') ? colors.primaryAction4 : colors.backgroundColor}/>
                {isActive('/home') && (<Text style={[styles.button_text, { color: colors.primaryAction4 }]}>{t('HOME')}</Text>)}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/settings")}>
                <Ionicons name="settings-sharp" size={isActive('/settings') ? 26 : 22} color={isActive('/settings') ? colors.primaryAction4 : colors.backgroundColor}/>
                {isActive('/settings') && (<Text style={[styles.button_text, { color: colors.primaryAction4 }]}>{t('SETTINGS')}</Text>)}
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 15,
        backgroundColor: colors.primaryAction2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    button_text: {
        textTransform: 'uppercase',
        fontSize: FontSize.small,
        fontWeight: "bold",
    },
});

export default Navbar;