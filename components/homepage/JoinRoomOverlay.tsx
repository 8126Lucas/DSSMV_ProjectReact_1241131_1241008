import {
    StyleSheet,
    Modal,
    Text,
    Dimensions,
    Pressable,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import React, {useState} from "react";
import {Colors} from "@/constants/theme";
import AppButton from "@/components/homepage/AppButton";
import {createClient} from "@supabase/supabase-js";
import {router} from "expo-router";
import {supabase_client} from "@/constants/supabaseClient";

interface JoinRoomOverlayProps {
    jrVisible: boolean;
    setJRVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function joinRoom(typed_token: string): void {
    router.navigate({
        pathname: './waiting_room',
        params: {
            room_token: typed_token,
            user_type: 'guest',
        },
    });
}

const JoinRoomOverlay = ({jrVisible, setJRVisible}: JoinRoomOverlayProps) => {
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
                                <Text style={styles.title}>Join Room</Text>
                                <TextInput style={styles.input} placeholder="ENTER ROOM CODE" returnKeyType="done"
                                           keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"} maxLength={6}
                                           placeholderTextColor={Colors.dark.backgroundColor}
                                            onChangeText={event => setTypedToken(event)}/>
                            </View>
                            <AppButton title="Join Room" color={Colors.default.primaryAction1} onPress={() => {
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

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    },
    container: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.5,
        backgroundColor: Colors.light.backgroundColor,
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
        color: Colors.dark.backgroundColor,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: Colors.dark.backgroundColor,
        backgroundColor: Colors.light.backgroundColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

export default JoinRoomOverlay;