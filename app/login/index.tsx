import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView
} from "react-native";
import React from "react";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

const handleGenerateToken = async () => {
    const token = Crypto.randomUUID();
    await AsyncStorage.setItem('user_token', token);
    router.navigate("/")
};

export default function LoginScreen() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image style={styles.img} source={require('@/assets/images/icon.png')} />

                        <Text style={styles.text}>Welcome to {"\n"} Challengers</Text>
                        <Text style={styles.subtext}>Generate an unique token or put your existing token {"\n"} to access your data.</Text>

                        <View style={styles.generate_view}>
                            <Text style={styles.generate_title}>New Token</Text>
                            <Text style={styles.generate_subtitle}>Generate your unique token to access your data.</Text>

                            <TouchableOpacity style={styles.button_view} onPress={handleGenerateToken}>
                                <Text style={styles.generate_title2}>Generate New Token</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.put_token_view}>
                            <Text style={styles.generate_title}>Already Have Token</Text>
                            <Text style={styles.generate_subtitle}>Put your existing token to access your data.</Text>

                            <TextInput style={styles.input} placeholder="Token UUID" returnKeyType="done"
                                       placeholderTextColor={Colors.dark.secondaryText}/>

                            <Text style={styles.generate_title3}>Format: 550e8400-e29b-41d4-a716-446655440000</Text>

                            <TouchableOpacity style={styles.button_view}>
                                <Text style={styles.generate_title2}>Generate New Token</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        margin: 8,
        marginTop: -8,
    },
    img: {
        alignSelf: 'center',
        borderRadius: 100,
        paddingTop: 10,
        width: 120,
        height: 120,
        resizeMode: 'contain',
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
        textAlign: 'left',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 15,
    },
    generate_view: {
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').height * 0.22,
      borderRadius: 30,
      alignSelf: 'center',
      borderWidth: 2,
      margin: 12,
      marginTop: -4,
      backgroundColor: Colors.light.surface,
      borderColor: Colors.dark.backgroundColor,
      padding: 15,
    },
    put_token_view: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.3,
        borderRadius: 30,
        alignSelf: 'center',
        borderWidth: 2,
        margin: 12,
        backgroundColor: Colors.light.surface,
        borderColor: Colors.dark.backgroundColor,
        padding: 15,
    },
    generate_title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
    generate_title2: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
    generate_title3: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: -10,
        marginBottom: 10,
        color: Colors.dark.secondaryText,
    },
    generate_subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
    button_view: {
        width: Dimensions.get('window').width * 0.67,
        height: 60,
        borderRadius: 15,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: Colors.dark.backgroundColor,
        backgroundColor: Colors.default.primaryAction1,
        padding: 15,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
    subtext: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    }
});