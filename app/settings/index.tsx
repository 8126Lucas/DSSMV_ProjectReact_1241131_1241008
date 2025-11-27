import {Appearance, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Navbar from "@/components/Navbar";
import {Colors, FontFamily, FontSize} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import AppButton from "@/components/homepage/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";


const setAsyncUsername = async (value: string) => {
    await AsyncStorage.setItem('username', value);
};
const getAsyncUsername = async () => {
    return await AsyncStorage.getItem('username');
}



export default function SettingsScreen() {
    const [username, setUsername] = useState<string | null>(null);
    const [dark_mode, setDarkMode] = useState(false);

    const toggleAppMode = () => {
        setDarkMode(previous_state => !previous_state);
    };

    useEffect(()=>{
        if (dark_mode) {
            Appearance.setColorScheme("dark");
        }
        else {
            Appearance.setColorScheme("light");
        }
    },[dark_mode]);

    useEffect(() => {
        const fetchUsername = async () => {
            const stored_username = await getAsyncUsername();
            setUsername(stored_username);
        };
        fetchUsername();
    }, []);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ImagePicker width={200} height={200}/>
                <View style={styles.user_token_container}>
                    <TextInput
                        style={styles.title}
                        placeholder={username || 'Username'}
                        underlineColorAndroid={Colors.light.text}
                        textContentType={'username'}
                        onSubmitEditing={event => {
                            setAsyncUsername(event.nativeEvent.text);
                            setUsername(event.nativeEvent.text);
                        }}
                    />
                    <TouchableOpacity style={styles.clipboard_button}>
                        <FontAwesome6 name="clipboard" size={30} color={Colors.light.backgroundColor} />
                    </TouchableOpacity>
                </View>
                <AppButton title={'Theme'} color={Colors.light.backgroundColor} onPress={toggleAppMode}/>
                <AppButton title={'Export Data'} color={Colors.light.backgroundColor}/>
                <AppButton title={'Logout'} color={Colors.default.primaryAction2}/>
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
        color: Colors.light.text
    },
    user_token_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: 20,
    },
    clipboard_button: {
        backgroundColor: Colors.light.text,
        padding: 4,
        borderRadius: 100,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
});