import { Text, View, StyleSheet, Image, ImageURISource } from "react-native";
import Navbar from "@/components/Navbar";
import AppButton from "@/components/homepage/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomePageScreen() {

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ProfileOverview/>
                <AppButton title={"Join"} color={Colors.default.green}/>
                <AppButton title={"Create"} color={Colors.default.webstormBlue}/>
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
