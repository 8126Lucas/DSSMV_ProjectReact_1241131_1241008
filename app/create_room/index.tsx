import {View, StyleSheet, Dimensions, Modal} from "react-native";

export default function CreateRoomScreen() {
    return (
        <View style={styles.root}>
            <Modal animationType={"slide"} transparent={true} visible={true} style={styles.container}>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#00000050"
    },
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        elevation: 4,
        backgroundColor: "#000",
        margin: 50,
        borderRadius: 50,
    }
})