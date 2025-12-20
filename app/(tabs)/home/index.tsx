import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import AppButton from "@/components/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useRouter} from "expo-router";
import {useMemo, useState} from "react";
import CreateRoomOverlay from "@/components/homepage/CreateRoomOverlay";
import JoinRoomOverlay from "@/components/homepage/JoinRoomOverlay";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTheme} from "@/hooks/useTheme";

export default function HomePageScreen() {
    const router = useRouter();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [cr_visible, setCRVisible] = useState(false);
    const [jrVisible, setJRVisible] = useState(false);

    return (
        <View style={styles.wrapper}>
            <CreateRoomOverlay cr_visible={cr_visible} setCRVisible={setCRVisible} />
            <JoinRoomOverlay jrVisible={jrVisible} setJRVisible={setJRVisible} />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
                <ProfileOverview/>
                <View style={styles.sneaklbContainer}>
                    <Text style={styles.sneaklbText}>Leaderboard Status</Text>
                </View>
                <AppButton title={"Join"} color={colors.primaryAction3} onPress={() => setJRVisible(true)}/>
                <AppButton title={"Create"} color={colors.primaryAction1} onPress={() => setCRVisible(true)}/>
            </SafeAreaView>
        </View>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flex: 1,
        margin: 10,
        paddingBottom: 70,
        alignItems: 'center',
    },
    sneaklbContainer: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        borderRadius: 10,
        marginVertical: 10,
    },
    sneaklbText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.text,
    },
});