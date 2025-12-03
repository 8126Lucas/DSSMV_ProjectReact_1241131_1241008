import {Component, useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from "react-native";
import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import CountdownClock from "@/components/CountdownClock";
import {decode} from "html-entities";

interface BooleanQuestionProps {
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    question_i: number;
    size: number;
    onPress: (answer: string, time: number) => void;
}

export default function BooleanQuestion(props: BooleanQuestionProps) {
    const [time_left, setTimeLeft] = useState(30);

    const handleTimer = (time: number) => {
        setTimeLeft(time);
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.topbar}>
                <Text style={styles.category_text}>{decode(props.category)}</Text>
                <View style={styles.bottom_row}>
                    <Text style={styles.questions_text}>{props.question_i}/{props.size} Questions</Text>
                    <View style={styles.countdown_container}>
                        <CountdownClock seconds={30} onTimeChange={handleTimer}/>
                    </View>
                </View>
            </View>

            <View style={styles.question_container}>
                <Text style={styles.question_text}>{decode(props.question)}</Text>
            </View>

            <View style={styles.answer_container}>
                <TouchableOpacity 
                    style={[styles.answer, {backgroundColor: Colors.default.correct}]}
                    onPress={() => props.onPress('True', time_left)}>
                    <Text style={styles.answer_text}>True</Text>
                </TouchableOpacity>
                <View style={styles.vertical_line}/>
                <TouchableOpacity 
                    style={[styles.answer, {backgroundColor: Colors.default.incorrect}]}
                    onPress={() => props.onPress('False', time_left)}>
                    <Text style={styles.answer_text}>False</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topbar: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.1,
        borderWidth: 2,
        backgroundColor: Colors.light.surface,
        borderColor: Colors.dark.backgroundColor,
        padding: 15,
        justifyContent: 'space-between',
    },
    category_text: {
        fontSize: 18,
        marginTop: -8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: Colors.light.text,
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    questions_text: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'left',
        color: Colors.light.text,
    },
    countdown_container: {
        marginTop: -14,
    },
    question_container: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.light.text,
        borderWidth: 2,
        width: 'auto',
        height: Dimensions.get("screen").height * 0.25,
        margin: 18,
        borderRadius: 16,
    },
    question_text: {
        textAlign: 'center',
        color: Colors.light.text,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    answer_container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        width: 'auto',
        flex: 1,
        margin: 18,
    },
    answer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.backgroundColor,
        width: 50,
        height: '90%',
        flex: 1,
        margin: 6,
        borderRadius: 16,
    },
    answer_text: {
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    vertical_line: {
        alignItems: "center",
        justifyContent: "center",
        height: '90%',
        width: 1,
        backgroundColor: Colors.light.text,
    },
});