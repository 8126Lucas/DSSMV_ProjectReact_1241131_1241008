import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {Colors} from "@/constants/theme";
import {router, useRouter} from "expo-router";
import AppButton from "@/components/homepage/AppButton";
import {SafeAreaView} from "react-native-safe-area-context";
export default function WaitingRoomScreen () {
    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

                <Text style={styles.text}>Waiting Other {"\n"} Player to Join </Text>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.dark.backgroundColor} style={{transform: [{scale: 3}]}}/>
                </View>

                <AppButton title={"Cancel"} color={Colors.default.red} onPress={() => router.navigate("/")}/>
            </SafeAreaView>
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
});