import * as ExpoImagePicker from "expo-image-picker";
import {useState, useEffect} from "react";
import {Alert, Image, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ImagePickerProps {
    width: number;
    height: number;
}

const BASE64_PREFIX = 'data:image/jpeg;base64,';

const setAsyncProfilePicture = async (value: string) => {
    await AsyncStorage.setItem('profile_picture', value);
};
const getAsyncProfilePicture = async () => {
    return await AsyncStorage.getItem('profile_picture');
};

export default function ImagePicker({width, height}: ImagePickerProps) {
    const [image, setImage] = useState<string | null>(null);
    const [profile_picture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {
        const loadProfilePicture = async () => {
            const base64 = await getAsyncProfilePicture();
            if (base64) {
                setImage(BASE64_PREFIX + base64);
            }
        };
        loadProfilePicture();
    }, []);

    const pickImage = async () => {
        const permission_result = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission_result.granted) {
            Alert.alert("Permission Required", "Permission to access the media library is required to use this functionality.");
            return;
        }
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 0.7,
            base64: true,
        });
        if (!result.canceled) {
            const base64 = result.assets[0].base64;
            if (base64) {
                await setAsyncProfilePicture(base64);
                setImage(BASE64_PREFIX + base64);
            } else {
                Alert.alert("Error", "Could not retrieve Base64 data for the image.");
            }
        }
    };
    return (
        <TouchableOpacity style={[styles.profile_image_container, {maxWidth: width, maxHeight: height, borderRadius: width/2}]} onPress={() => pickImage()}>
            {image && <Image source={{ uri: image }} style={[styles.profile_image_style, {width: width, height: height, borderRadius: width/2}]} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profile_image_container: {
        flex: 1,
        borderColor: "black",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
    },
    profile_image_style: {
        borderColor: "black",
        borderWidth: 2,
        aspectRatio: 1,
    },
});