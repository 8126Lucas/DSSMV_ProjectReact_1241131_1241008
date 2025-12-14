import {Alert, Appearance, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome6} from "@expo/vector-icons";
import AppButton from "@/components/homepage/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";
import * as Clipboard from "expo-clipboard";
import {router} from "expo-router";
import updateUserRestDB from "@/hooks/updateUserRestDB";
import exportUserData from "@/hooks/exportUserData";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {setUser, logout} from "@/src/flux/store/userSlice";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";

export default function SettingsScreen() {
    const [dark_mode, setDarkMode] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const saveUsername = async (value: string) => {
        dispatch(setUser({
            username: value,
            user_token: (user.user_token ? user.user_token : ''),
            games_played: (user.games_played ? user.games_played : 0),
            profile_picture: (user.profile_picture ? user.profile_picture : ''),
        }));
        if(user.user_token) {
            await updateUserRestDB(user.user_token, 'username', value);
        }
    };

    const copyUserToken = async () => {
        if (user.user_token) {
            await Clipboard.setStringAsync(user.user_token);
            Alert.alert('Copied!', 'Your Token ' + user.user_token + ' has been copied to your clipboard.');
        }
    };

    const toggleAppMode = () => {
        setDarkMode(previous_state => !previous_state);
    };

    const logoutApp = () => {
        dispatch(logout());
        router.replace('/login');
    }

    useEffect(()=>{
        if (dark_mode) {
            Appearance.setColorScheme("dark");
        }
        else {
            Appearance.setColorScheme("light");
        }
    },[dark_mode]);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ImagePicker width={200} height={200}/>
                <View style={styles.user_token_container}>
                    <TextInput
                        style={styles.title}
                        placeholder={user.username || 'Username'}
                        underlineColorAndroid={Colors.light.text}
                        textContentType={'username'}
                        onSubmitEditing={async (event) => {
                            const typed_username = event.nativeEvent.text;
                            await saveUsername(typed_username);
                        }}
                    />
                    <TouchableOpacity style={styles.clipboard_button} onPress={copyUserToken} >
                        <FontAwesome6 name="clipboard" size={30} color={Colors.light.backgroundColor} />
                    </TouchableOpacity>
                </View>
                <AppButton title={'Theme'} color={Colors.light.backgroundColor} onPress={toggleAppMode}/>
                <AppButton title={'Export Data'} color={Colors.light.backgroundColor} onPress={async () => {
                    if (user.user_token) {
                        await exportUserData(user.user_token);
                    }
                }}/>
                <AppButton title={'Logout'} color={Colors.default.primaryAction2} onPress={logoutApp}/>
            </SafeAreaView>
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