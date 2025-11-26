import { Text, View, StyleSheet } from "react-native";
import Navbar from "@/components/Navbar";
import AppButton from "@/components/homepage/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
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
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ProfileOverview/>
                <View style={styles.sneaklbContainer}>
                    <Text style={styles.sneaklbText}>Leaderboard Status</Text>
                </View>
                <AppButton title={"Join"} color={Colors.default.green} onPress={() => setJRVisible(true)}/>
                <AppButton title={"Create"} color={Colors.default.webstormBlue} onPress={() => setCRVisible(true)}/>
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
        borderColor: Colors.dark.backgroundColor,
        backgroundColor: Colors.light.backgroundColor,
        borderRadius: 10,
        marginVertical: 10,
    },
    sneaklbText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
});