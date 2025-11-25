import { Text, View, StyleSheet, Image, ImageURISource } from "react-native";
import Navbar from "@/components/Navbar";
import AppButton from "@/components/homepage/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useState} from "react";
import CreateRoomOverlay from "@/components/homepage/CreateRoomOverlay";

export default function HomePageScreen() {
    const router = useRouter();
    const [crVisible, setCRVisible] = useState(false);

    return (
        <View style={styles.wrapper}>
            <CreateRoomOverlay crVisible={crVisible} setCRVisible={setCRVisible} />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ProfileOverview/>
                <AppButton title={"Join"} color={Colors.default.green} onPress={() => router.navigate("./join_room")}/>
                <AppButton title={"Create"} color={Colors.default.webstormBlue} onPress={() => setCRVisible(true)}/>
            </SafeAreaView>
            <Navbar/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        margin: 10,
        paddingBottom: 70,
    },
});
