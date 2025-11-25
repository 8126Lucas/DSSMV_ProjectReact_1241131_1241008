import {View, StyleSheet, Modal, Text, Dimensions, Pressable} from "react-native";
import React from "react";
import {Colors} from "@/constants/theme";
import InlineDropdown from "@/components/homepage/InlineDropdown";
import {Item} from "react-native-picker-select";

interface CreateRoomOverlayProps {
    crVisible: boolean;
    setCRVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoomOverlay = ({crVisible, setCRVisible}: CreateRoomOverlayProps) => {
    const category_options: Item[] = [

    ];
    const difficulty_options: Item[] = [
        {label: 'Any Difficulty', value: '0'},
        {label: 'Easy', value: '1'},
        {label: 'Medium', value: '2'},
        {label: 'Hard', value: '3'},
    ];
    const type_options: Item[] = [
        {label: 'Any Type', value: '0'},
        {label: 'Multiple Choice', value: '1'},
        {label: 'True/False', value: '2'},
    ]
    return (
        <Modal
            animationType={"fade"}
            transparent={true}

            visible={crVisible}
            onRequestClose={() => setCRVisible(false)}>
            <Pressable style={styles.root} onPress={() => setCRVisible(false)}>
                <Pressable style={styles.container} onPress={() => setCRVisible(true)}>
                    <InlineDropdown options={difficulty_options}/>
                    <InlineDropdown options={difficulty_options}/>
                    <InlineDropdown options={type_options}/>
                </Pressable>
            </Pressable>
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
        height: Dimensions.get("window").height * 0.8,
        backgroundColor: Colors.light.backgroundColor,
        borderRadius: 20,
        padding: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

//const styles = StyleSheet.create({
//    root: {
//        backgroundColor: "#00000050"
//    },
//    container: {
//        width: Dimensions.get("window").width,
//        height: Dimensions.get("window").height,
//        backgroundColor: "#000",
//        margin: 50,
//        borderRadius: 50,
//    }
//});

export default CreateRoomOverlay;