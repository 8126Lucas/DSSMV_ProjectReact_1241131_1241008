import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert} from "react-native";
import React, {useMemo, useState} from "react";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import {REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import {useDispatch} from "react-redux";
import {setUser} from "@/src/flux/store/userSlice";
import {setTheme} from "@/src/flux/store/themeSlice";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import {RESTDB_API_KEY} from "@/constants/RestDBChooseKey";

export default function LoginScreen() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const dispatch = useDispatch();
    const [input_token, setInputToken] = useState("");

    const handleGenerateToken = async () => {
        try {
            const token = Crypto.randomUUID();
            await AsyncStorage.setItem("user_token", token);
            dispatch(setUser({
                username: '',
                user_token: token,
                games_played: 0,
                profile_picture: '',
                language: 'en',
            }));
            dispatch(setTheme({
                theme: 'light',
            }));
            await AsyncStorage.setItem("app_theme", 'light');
            await fetch(REST_DB_ENDPOINT_USER, {
                method: 'POST',
                body: JSON.stringify({
                    user_token: token,
                    username: '',
                    games_played: 0,
                    profile_picture: '',
                    language: 'en',
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': RESTDB_API_KEY,
                }
            }).then(response => console.log(response));
            router.replace("/home");
        } catch (error) {
            console.log(error);
        }
    };

    const handleTokenInput = async (token: string) => {
        try {
            console.log(token);
            const filter = {'user_token': token};
            await fetch(REST_DB_ENDPOINT_USER + `?q=${JSON.stringify(filter)}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'x-apikey': RESTDB_API_KEY,
                }
            })
                .then(response => {
                    if(!response.ok) {
                        throw Alert.alert(t('There was an error whilst talking to the database.'));
                    }
                    else {
                        return response.json();
                    }
                })
                .then(async data => {
                    if(data.length === 0) {
                        throw Alert.alert(t('Your token does not exist!'), t('You\'ve inserted a token that does not belong to anyone yet.'));
                    }
                    else {
                        await AsyncStorage.setItem("user_token", token);
                        dispatch(setUser({
                            username: data[0].username,
                            user_token: token,
                            games_played: data[0].games_played,
                            profile_picture: data[0].profile_picture,
                            language: data[0].language,
                        }));
                        dispatch(setTheme({
                            theme: 'light',
                        }));
                        await AsyncStorage.setItem('app_theme', 'light');
                    }
                });
            router.replace("/home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image style={styles.img} source={require('@/assets/images/icon.png')} />

                        <Text style={styles.text}>{t('Welcome to Challengers')}</Text>
                        <Text style={styles.subtext}>{t('Generate an unique token or put your existing token to access your data.')}</Text>

                        <View style={styles.generate_view}>
                            <Text style={styles.generate_title}>{t('New Token')}</Text>
                            <Text style={styles.generate_subtitle}>{t('Generate your unique token to access your data.')}</Text>

                            <TouchableOpacity style={styles.button_view} onPress={handleGenerateToken}>
                                <Text style={styles.generate_title2}>{t('Generate New Token')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.put_token_view}>
                            <Text style={styles.generate_title}>{t('Already Have Token')}</Text>
                            <Text style={styles.generate_subtitle}>{t('Put your existing token to access your data.')}</Text>

                            <TextInput style={styles.input} placeholder="Token UUID" returnKeyType="done"
                                       placeholderTextColor={colors.secondaryText}
                                        onChangeText={setInputToken}
                                        value={input_token}/>

                            <Text style={styles.generate_title3}>{t('Format')}: 550e8400-e29b-41d4-a716-446655440000</Text>

                            <TouchableOpacity style={styles.button_view} onPress={() => handleTokenInput(input_token)}>
                                <Text style={styles.generate_title2}>{t('Login With My Token')}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flex: 1,
        margin: 8,
        marginTop: -8,
    },
    img: {
        alignSelf: 'center',
        borderRadius: 60,
        paddingTop: 10,
        width: 120,
        height: 125,
        resizeMode: 'cover',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.text,
    },
    generate_view: {
      width: Dimensions.get('window').width * 0.9,
      borderRadius: 30,
      alignSelf: 'center',
      borderWidth: 2,
      margin: 12,
      marginTop: -4,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      padding: 15,
    },
    put_token_view: {
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 30,
        alignSelf: 'center',
        borderWidth: 2,
        margin: 12,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        padding: 15,
    },
    generate_title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        textTransform: 'uppercase',
        color: colors.text,
    },
    generate_title2: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: colors.text,
    },
    generate_title3: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 10,
        color: colors.secondaryText,
    },
    generate_subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: colors.text,
    },
    button_view: {
        width: Dimensions.get('window').width * 0.67,
        height: 60,
        borderRadius: 15,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.primaryAction1,
        padding: 15,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: colors.text,
    },
    subtext: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: colors.text,
    }
});