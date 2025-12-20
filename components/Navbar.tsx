import {Dimensions, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Colors, FontFamily, Fonts, FontSize} from "@/constants/theme";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useTheme} from "@/hooks/useTheme";
import {useMemo} from "react";

const Navbar = () => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/leaderboard")}>
                <FontAwesome6 name="trophy" size={14} color={colors.backgroundColor} />
                <Text style={styles.button_text}>Leaderboard</Text>
            </TouchableOpacity>
            <View style={styles.vertical_line}/>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/home")}>
                <FontAwesome6 name="house-chimney" size={14} color={colors.backgroundColor} />
                <Text style={styles.button_text}>Home</Text>
            </TouchableOpacity>
            <View style={styles.vertical_line}/>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/settings")}>
                <Ionicons name="settings-sharp" size={16} color={colors.backgroundColor} />
                <Text style={styles.button_text}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 'auto',
        backgroundColor: colors.primaryAction2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        gap: 5,
    },
    button_text: {
        textTransform: 'uppercase',
        color: colors.backgroundColor,
        textAlign: "center",
        fontSize: FontSize.small,
    },
    vertical_line: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 1,
        backgroundColor: colors.backgroundColor,
        margin: 5,
        alignSelf: "center",
    },
});


export default Navbar;