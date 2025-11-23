import * as ExpoImagePicker from "expo-image-picker";
import {useState} from "react";
import {Alert, Image, StyleSheet, TouchableOpacity} from "react-native";

export default function ImagePicker() {
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
        <TouchableOpacity style={styles.profile_image_container} onPress={() => pickImage()}>
            {image && <Image source={{ uri: image }} style={styles.profile_image_style} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profile_image_container: {
        flex: 1,
        maxWidth: 80,
        maxHeight: 80,
        borderColor: "black",
        borderRadius: 80/2,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    profile_image_style: {
        width: 80,
        height: 80,
        borderColor: "black",
        borderRadius: 80/2,
        borderWidth: 2,
    },
});