import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Navbar from "@/components/Navbar";
import AppButton from "@/components/homepage/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useRouter} from "expo-router";
import {useState} from "react";
import CreateRoomOverlay from "@/components/homepage/CreateRoomOverlay";
import JoinRoomOverlay from "@/components/homepage/JoinRoomOverlay";

export default function HomePageScreen() {
    const router = useRouter();
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
                <AppButton title={"Join"} color={Colors.default.primaryAction1} onPress={() => setJRVisible(true)}/>
                <AppButton title={"Create"} color={Colors.default.primaryAction4} onPress={() => setCRVisible(true)}/>
                <AppButton title={"Login Teste"} color={Colors.default.primaryAction4} onPress={() => router.navigate("./login")}/>
            </SafeAreaView>
            <Navbar/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.light.backgroundColor,
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
        borderColor: Colors.light.border,
        backgroundColor: Colors.light.surface,
        borderRadius: 10,
        marginVertical: 10,
    },
    sneaklbText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Colors.light.text,
    },
});