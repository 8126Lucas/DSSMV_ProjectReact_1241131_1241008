import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Navbar from "@/components/Navbar";
import {Colors, FontFamily, FontSize} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import AppButton from "@/components/homepage/AppButton";

export default function SettingsScreen() {
    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ImagePicker width={200} height={200}/>
                <View style={styles.user_token_container}>
                    <TextInput style={styles.title} placeholder={'Username'} underlineColorAndroid="black" textContentType={'username'}/>
                    <TouchableOpacity style={styles.clipboard_button}>
                        <FontAwesome6 name="clipboard" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <AppButton title={'Theme'} color={Colors.light.backgroundColor}/>
                <AppButton title={'Export Data'} color={Colors.light.backgroundColor}/>
                <AppButton title={'Logout'} color={Colors.default.red}/>
            </SafeAreaView>
            <Navbar/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.light.backgroundColor,
    },
    container: {
        flex: 1,
        width: '100%',
        padding: 10,
        height: "auto",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginEnd: 5,
    },
    user_token_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: 20,
    },
    clipboard_button: {
        backgroundColor: "black",
        padding: 4,
        borderRadius: 100,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
});