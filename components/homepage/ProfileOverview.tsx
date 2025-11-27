import {View, Image, StyleSheet, ImageURISource, Text} from "react-native";
import {FontFamily, Fonts, FontSize} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";

const setAsyncUsername = async (value: string) => {
    await AsyncStorage.setItem('username', value);
};
const getAsyncUsername = async () => {
    return await AsyncStorage.getItem('username');
}



const ProfileOverview = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsername = async () => {
            const stored_username = await getAsyncUsername();
            setUsername(stored_username);
        };
        fetchUsername();
    }, []);

    return (
        <View style={styles.container}>
            <ImagePicker width={80} height={80}/>
            <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Name: {username}</Text>
                <Text style={styles.user_info_text}>Played Games: </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        height: 100,
    },
    profile_image_container: {
        flex: 1,
        maxWidth: 80,
        maxHeight: 80,
        borderColor: "black",
        borderRadius: 80,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    profile_image_style: {
        width: 80,
        height: 80,
    },
    user_info_container: {
        flex: 2,
        marginLeft: 10,
        flexDirection: 'column',
    },
    user_info_text: {
        fontSize: FontSize.medium,
        margin: 6,
        fontWeight: "bold",
        fontFamily: FontFamily.bodyBold,
    }
});

export default ProfileOverview;