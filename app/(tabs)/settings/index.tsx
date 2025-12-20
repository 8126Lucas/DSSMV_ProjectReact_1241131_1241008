import {Alert, Appearance, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome6} from "@expo/vector-icons";
import AppButton from "@/components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect, useMemo} from "react";
import * as Clipboard from "expo-clipboard";
import {router} from "expo-router";
import updateUserRestDB from "@/hooks/updateUserRestDB";
import exportUserData from "@/hooks/exportUserData";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {setUser, logout} from "@/src/flux/store/userSlice";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {setTheme} from "@/src/flux/store/themeSlice";
import {useTheme} from "@/hooks/useTheme";

export default function SettingsScreen() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
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

     const toggleAppMode = async (current_theme: 'light' | 'dark') => {
        const new_theme = (current_theme === 'light' ? 'dark' : 'light')
        dispatch(setTheme({
            theme: new_theme,
        }));
        try {
            await AsyncStorage.setItem('app_theme', new_theme);
            console.log(`Theme saved: ${new_theme}`);
        } catch (error) {
            console.log('Failed to save app theme:', error);
        }
    };

    const logoutApp = () => {
        dispatch(logout());
        router.replace('/login');
    }

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ImagePicker width={200} height={200}/>
                <View style={styles.user_token_container}>
                    <TextInput
                        style={styles.title}
                        placeholder={user.username || 'Username'}
                        placeholderTextColor={colors.text}
                        underlineColorAndroid={colors.text}
                        textContentType={'username'}
                        onSubmitEditing={async (event) => {
                            const typed_username = event.nativeEvent.text;
                            await saveUsername(typed_username);
                        }}
                    />
                    <TouchableOpacity style={styles.clipboard_button} onPress={copyUserToken} >
                        <FontAwesome6 name="clipboard" size={30} color={colors.backgroundColor} />
                    </TouchableOpacity>
                </View>
                <AppButton title={'Theme'} color={colors.backgroundColor} onPress={async () => await toggleAppMode(theme.theme)}/>
                <AppButton title={'Export Data'} color={colors.backgroundColor} onPress={async () => {
                    if (user.user_token) {
                        await exportUserData(user.user_token);
                    }
                }}/>
                <AppButton title={'Logout'} color={colors.incorrect} onPress={logoutApp}/>
            </SafeAreaView>
        </View>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
        color: colors.text
    },
    user_token_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: 20,
    },
    clipboard_button: {
        backgroundColor: colors.text,
        padding: 4,
        borderRadius: 100,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
});