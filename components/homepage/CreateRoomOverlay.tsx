import {View, StyleSheet, Modal, Text, Dimensions, Pressable} from "react-native";
import React, {useState, useEffect} from "react";
import {Colors} from "@/constants/theme";
import InlineDropdown from "@/components/homepage/InlineDropdown";
import {Item} from "react-native-picker-select";
import AppButton from "@/components/homepage/AppButton";

interface CreateRoomOverlayProps {
    cr_visible: boolean;
    setCRVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function generateRoomToken(): string {
    return Math.floor(Math.random() * (999999 - 1 + 1) + 1).toString().padStart(6, '0');
}

function generateTriviaURL(qn: string, cc: string, dc: string, tc: string): string {
    let api_url: string = 'https://opentdb.com/api.php?';
    if(qn !== null) {
        api_url += `ammount=${qn}`;
        if(cc !== null && cc !== '0') {
            api_url += `&category=${cc}`;
        }
        if(dc !== null && dc !== '0') {
            api_url += `&difficulty=${dc}`;
        }
        if(tc !== null && tc !== '0') {
            api_url += `&type=${tc}`;
        }
    }
    return api_url;
}

const CreateRoomOverlay = ({cr_visible, setCRVisible}: CreateRoomOverlayProps) => {
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
    ];

    const [room_token, setRoomToken] = useState("");
    useEffect(() => {
        if (cr_visible) {setRoomToken(generateRoomToken());}
    }, [cr_visible]);
    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={cr_visible}
            onRequestClose={() => setCRVisible(false)}>
            <Pressable style={styles.root} onPress={() => setCRVisible(false)}>
                <Pressable style={styles.container} onPress={() => setCRVisible(true)}>
                    <Text style={styles.title}>Room Code: #{room_token}</Text>
                    <InlineDropdown title={'Number of Questions:'} options={number_options}/>
                    <InlineDropdown title={'Select Category:'} options={category_options}/>
                    <InlineDropdown title={'Select Difficulty:'} options={difficulty_options}/>
                    <InlineDropdown title={'Select Type:'} options={type_options}/>
                    <AppButton title={"Create"} color={Colors.default.webstormBlue}/>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
});

export default CreateRoomOverlay;