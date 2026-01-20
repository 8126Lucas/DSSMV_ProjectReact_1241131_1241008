import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ImagePicker from "@/components/homepage/ImagePicker";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {FontAwesome6} from "@expo/vector-icons";
import AppButton from "@/components/AppButton";
import {useState, useMemo} from "react";
import * as Clipboard from "expo-clipboard";
import {router} from "expo-router";
import updateUserRestDB from "@/hooks/updateUserRestDB";
import exportUserData from "@/hooks/exportUserData";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {setUser, logout} from "@/src/flux/userSlice";
import {setTheme} from "@/src/flux/themeSlice";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import LanguageOverlay from "@/components/settings/LanguageOverlay";
import {storage} from "@/constants/storage";
import {deleteAccount} from "@/hooks/deleteAccount";
import {NAVBAR_HEIGHT} from "@/constants/NavbarHeight";

export default function SettingsScreen() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useSelector((state: RootState) => state.theme);
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [loVisible, setLOVisible] = useState(false);
    const insets = useSafeAreaInsets();

    const saveUsername = async (value: string) => {
        dispatch(setUser({
            username: value,
            user_token: (user.user_token ? user.user_token : ''),
            games_played: (user.games_played ? user.games_played : 0),
            profile_picture: (user.profile_picture ? user.profile_picture : ''),
            language: (user.language ? user.language : 'en'),
        }));
        if(user.user_token) {
            await updateUserRestDB(user.user_token, 'username', value);
        }
    };

    const copyUserToken = async () => {
        if (user.user_token) {
            await Clipboard.setStringAsync(user.user_token);
            Alert.alert(`${t('Copied')}!`, `${t('Your Token')} ${user.user_token} ${t('has been copied to your clipboard.')}`);
        }
    };

     const toggleAppMode = async (current_theme: 'light' | 'dark') => {
        const new_theme = (current_theme === 'light' ? 'dark' : 'light')
        dispatch(setTheme({
            theme: new_theme,
        }));
        try {
            storage.set('app_theme', new_theme);
            console.log(`Theme saved: ${new_theme}`);
        } catch (error) {
            console.log('Failed to save app theme:', error);
        }
    };

    const logoutApp = () => {
        dispatch(logout());
        storage.clearAll();
        router.replace('/login');
    }

    return (
        <SafeAreaView style={styles.wrapper} edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                <LanguageOverlay lo_visible={loVisible} setLOVisible={setLOVisible} />
                <ImagePicker width={200} height={200}/>
                <View style={styles.user_token_container}>
                    <TextInput
                        style={styles.title}
                        placeholder={user.username || t('Username')}
                        placeholderTextColor={colors.secondaryText}
                        underlineColorAndroid={colors.text}
                        textContentType={'username'}
                        clearButtonMode={'while-editing'}
                        maxLength={15}
                        returnKeyType={'send'}
                        onSubmitEditing={async (event) => {
                            const typed_username = event.nativeEvent.text;
                            await saveUsername(typed_username);
                        }}
                    />
                    <TouchableOpacity style={styles.clipboard_button} onPress={copyUserToken} >
                        <FontAwesome6 name="clipboard" size={30} color={colors.backgroundColor} />
                    </TouchableOpacity>
                </View>
                <AppButton title={t('THEME')} color={colors.surface} onPress={async () => await toggleAppMode(theme.theme)}/>
                <AppButton title={t('LANGUAGE')} color={colors.surface} onPress={() => setLOVisible(true)}/>
                <AppButton title={t('EXPORT DATA')} color={colors.surface} onPress={async () => {
                    if (user.user_token) {
                        await exportUserData(user.user_token);
                    }
                }}/>
                <AppButton title={t('LOGOUT')} color={colors.incorrect} onPress={logoutApp}/>
                <Text style={[styles.bottom_text, {marginBottom: insets.bottom}]} onPress={async () => {
                    Alert.alert(t('Delete Account'), t('Are you sure you want to delete your Challengers account?'), [
                        {
                            text: t('No'),
                            onPress: () => {},
                            style: 'cancel',
                        },
                        {
                            text: t('Yes, please'),
                            onPress: async () => {
                                if(user.user_token) {
                                    await deleteAccount(user.user_token);
                                    logoutApp();
                                }
                            },
                            style: 'default',
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => {},
                    });
                }}>{t("DELETE ACCOUNT")}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flexGrow: 1,
        width: '100%',
        padding: 10,
        height: "auto",
        justifyContent: 'flex-start',
        paddingBottom: NAVBAR_HEIGHT,
        alignItems: 'center',
        marginTop: 20,
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
    bottom_text: {
        color: colors.incorrect,
        fontSize: 14,
        justifyContent: "space-between",
        marginTop: 26,
        textDecorationLine: 'underline',
    }
});