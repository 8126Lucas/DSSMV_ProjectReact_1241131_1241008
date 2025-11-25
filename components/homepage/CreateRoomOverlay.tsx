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
    const number_options = Array.from({length: 50}, (_, i) => ({
        label: `${i + 1}`,value: `${i + 1}`
    }));
    const category_options: Item[] = [
        {label: 'Any Category', value: '0'},
        {label: 'General Knowledge', value: '9'},
        {label: 'Entertainment: Books', value: '10'},
        {label: 'Entertainment: Film', value: '11'},
        {label: 'Entertainment: Music', value: '12'},
        {label: 'Entertainment: Musicals & Theaters', value: '13'},
        {label: 'Entertainment: Television', value: '14'},
        {label: 'Entertainment: Video Games', value: '15'},
        {label: 'Entertainment: Board Games', value: '16'},
        {label: 'Science & Nature', value: '17'},
        {label: 'Science: Computers', value: '18'},
        {label: 'Science: Mathematics', value: '19'},
        {label: 'Mythology', value: '20'},
        {label: 'Sports', value: '21'},
        {label: 'Geography', value: '22'},
        {label: 'History', value: '23'},
        {label: 'Politics', value: '24'},
        {label: 'Art', value: '25'},
        {label: 'Celebrities', value: '26'},
        {label: 'Animals', value: '27'},
        {label: 'Vehicles', value: '28'},
        {label: 'Entertainment: Comics', value: '29'},
        {label: 'Science: Gadgets', value: '30'},
        {label: 'Entertainment: Japanese Anime & Manga', value: '31'},
        {label: 'Entertainment: Cartoon & Animations', value: '32'},
    ];
    const difficulty_options: Item[] = [
        {label: 'Any Difficulty', value: '0'},
        {label: 'Easy', value: 'easy'},
        {label: 'Medium', value: 'medium'},
        {label: 'Hard', value: 'hard'},
    ];
    const type_options: Item[] = [
        {label: 'Any Type', value: '0'},
        {label: 'Multiple Choice', value: 'multiple'},
        {label: 'True/False', value: 'boolean'},
    ]
    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={crVisible}
            onRequestClose={() => setCRVisible(false)}>
            <Pressable style={styles.root} onPress={() => setCRVisible(false)}>
                <Pressable style={styles.container} onPress={() => setCRVisible(true)}>
                    <InlineDropdown title={'Number of Questions:'} options={number_options}/>
                    <InlineDropdown title={'Select Category:'} options={category_options}/>
                    <InlineDropdown title={'Select Difficulty:'} options={difficulty_options}/>
                    <InlineDropdown title={'Select Type:'} options={type_options}/>
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
        justifyContent: 'flex-start',
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

export default CreateRoomOverlay;