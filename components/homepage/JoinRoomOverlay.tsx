import {StyleSheet, Modal, Text, Dimensions, Pressable, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import React, {useMemo, useState} from "react";
import {Colors} from "@/constants/theme";
import AppButton from "@/components/AppButton";
import {createClient} from "@supabase/supabase-js";
import {router} from "expo-router";
import {supabase_client} from "@/constants/supabaseClient";
import {JoinRoomOverlayProps} from "@/src/types/JoinRoomOverlayProps";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";

function joinRoom(typed_token: string): void {
    router.navigate({
        pathname: '/waiting_room',
        params: {
            room_token: typed_token,
            user_type: 'guest',
        },
    });
}

const JoinRoomOverlay = ({jrVisible, setJRVisible}: JoinRoomOverlayProps) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [typed_token, setTypedToken] = useState("");

    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={jrVisible}
            onRequestClose={() => setJRVisible(false)}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <Pressable style={styles.root} onPress={() => setJRVisible(false)}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container} onStartShouldSetResponder={() => true}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.title}>{t('JOIN ROOM')}</Text>
                                <TextInput style={styles.input} placeholder={t("ENTER ROOM CODE")} returnKeyType="done"
                                           keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"} maxLength={6}
                                           placeholderTextColor={colors.text}
                                            onChangeText={event => setTypedToken(event)}/>
                            </View>
                            <AppButton title={t("JOIN ROOM")} color={colors.primaryAction3} onPress={() => {
                                setJRVisible(false);
                                joinRoom(typed_token);
                            }}/>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.semi_transparent,
    },
    container: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.5,
        backgroundColor: colors.backgroundColor,
        borderRadius: 20,
        padding: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
    inputGroup: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.text,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: colors.text,
        backgroundColor: colors.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.text,
    }
});

export default JoinRoomOverlay;