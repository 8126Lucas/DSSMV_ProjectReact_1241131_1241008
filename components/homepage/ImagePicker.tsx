import * as ExpoImagePicker from "expo-image-picker";
import {useState} from "react";
import {Alert, Image, StyleSheet, TouchableOpacity} from "react-native";

interface ImagePickerProps {
    width: number;
    height: number;
}

export default function ImagePicker({width, height}: ImagePickerProps) {
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
        const permission_result = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission_result.granted) {
            Alert.alert("Permission Required", "Permission to access the media library is required to use this functionality.");
            return;
        }
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
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