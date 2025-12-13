import * as ExpoImagePicker from "expo-image-picker";
import {useState, useEffect} from "react";
import {Alert, Image, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {setUser} from "@/src/flux/store/userSlice";

interface ImagePickerProps {
    width: number;
    height: number;
}

const BASE64_PREFIX = 'data:image/jpeg;base64,';

export default function ImagePicker({width, height}: ImagePickerProps) {
    const [image, setImage] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const saveProfilePicture = async (value: string) => {
        dispatch(setUser({
            username: (user.username ? user.username : ''),
            user_token: (user.user_token ? user.user_token : ''),
            games_played: (user.games_played ? user.games_played : 0),
            profile_picture: value
        }));
    };

    useEffect(() => {
        const loadProfilePicture = async () => {
            if (user.profile_picture) {
                setImage(BASE64_PREFIX + user.profile_picture);
            }
        };
        loadProfilePicture();
    }, [user.profile_picture]);

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
                await saveProfilePicture(base64);
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