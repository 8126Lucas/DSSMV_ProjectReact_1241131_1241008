import {Dimensions, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Colors, FontFamily, Fonts, FontSize} from "@/constants/theme";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const Navbar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/leaderboard/leaderboard")}>
                <FontAwesome6 name="trophy" size={14} color="white" />
                <Text style={styles.button_text}>Leaderboard</Text>
            </TouchableOpacity>
            <View style={styles.vertical_line}/>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/")}>
                <FontAwesome6 name="house-chimney" size={14} color="white" />
                <Text style={styles.button_text}>Home</Text>
            </TouchableOpacity>
            <View style={styles.vertical_line}/>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("./settings")}>
                <Ionicons name="settings-sharp" size={16} color="white" />
                <Text style={styles.button_text}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        backgroundColor: Colors.dark.backgroundColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        verticalAlign: "middle",
    },
    button_text: {
        textTransform: 'uppercase',
        color: "white",
        textAlign: "center",
        fontFamily: FontFamily.body,
        fontSize: FontSize.small,
    },
    vertical_line: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 1,
        backgroundColor: "white",
        margin: 5,
    },
});


export default Navbar;