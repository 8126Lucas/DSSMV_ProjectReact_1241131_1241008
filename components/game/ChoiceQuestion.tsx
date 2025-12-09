import React, {Component, useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import CountdownClock from "@/components/game/CountdownClock";
import {decode} from "html-entities";

interface ChoiceQuestionProps {
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
    question_i: number;
    size: number;
    onPress: (answer: string, time_left: number) => void;
}

export default function ChoiceQuestion(props: ChoiceQuestionProps) {
    const [answered, setAnswered] = useState(false);
    const [time_left, setTimeLeft] = useState(30);
    const [color1, setColor1] = useState(Colors.light.backgroundColor);
    const [color2, setColor2] = useState(Colors.light.backgroundColor);
    const [color3, setColor3] = useState(Colors.light.backgroundColor);
    const [color4, setColor4] = useState(Colors.light.backgroundColor);

    const handleAnswer = (answer: string, question_i: number, time_left: number) => {
        setAnswered(true);
        props.onPress(answer, time_left);
        switch (question_i) {
            case 0:
                if(answer === props.correct_answer) {
                    setColor1(Colors.default.correct2);
                } else {
                    setColor1(Colors.default.incorrect2);
                }
                break;
            case 1:
                if(answer === props.correct_answer) {
                    setColor2(Colors.default.correct2);
                } else {
                    setColor2(Colors.default.incorrect2);
                }
                break;
            case 2:
                if(answer === props.correct_answer) {
                    setColor3(Colors.default.correct2);
                } else {
                    setColor3(Colors.default.incorrect2);
                }
                break;
            case 3:
                if(answer === props.correct_answer) {
                    setColor4(Colors.default.correct2);
                } else {
                    setColor4(Colors.default.incorrect2);
                }
                break;
            default: break;
        }
    }

    const handleTimer = useCallback((time: number) => {
        setTimeLeft(time);
    }, []);

    useEffect(() => {
        setAnswered(false);
        setColor1(Colors.light.backgroundColor);
        setColor2(Colors.light.backgroundColor);
        setColor3(Colors.light.backgroundColor);
        setColor4(Colors.light.backgroundColor);
        setTimeLeft(30);
    }, [props.question_i]);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <View style={styles.header}>
                    <Text style={styles.category_text}>{decode(props.category)}</Text>
                    <View style={styles.bottom_row}>
                        <Text style={styles.questions_text}>{props.question_i}/{props.size} Questions</Text>
                        <View style={styles.countdown_container}>
                            <CountdownClock key={props.question_i} seconds={30} onTimeChange={handleTimer}/>
                        </View>
                    </View>
                </View>

                <View style={styles.question_container}>
                    <Text style={styles.question_text}>{decode(props.question)}</Text>
                </View>

                <View style={styles.answers_container}>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color1}]}
                        onPress={() => handleAnswer(props.answers[0], 0,time_left)}>
                        <Text style={styles.answers_text}>{decode(props.answers[0])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color2}]}
                        onPress={() => handleAnswer(props.answers[1], 1,time_left)}>
                        <Text style={styles.answers_text}>{decode(props.answers[1])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color3}]}
                        onPress={() => handleAnswer(props.answers[2], 2,time_left)}>
                        <Text style={styles.answers_text}>{decode(props.answers[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color4}]}
                        onPress={() => handleAnswer(props.answers[3], 3,time_left)}>
                        <Text style={styles.answers_text}>{decode(props.answers[3])}</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.light.backgroundColor,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
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
        width: 'auto',
        margin: 20,
        borderRadius: 16,
        borderColor: Colors.dark.backgroundColor,
        borderWidth: 1.5,
        backgroundColor: Colors.light.backgroundColor,
        height: Dimensions.get('screen').height * 0.25,
    },
    question_text: {
        fontSize: 24,
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.light.text,
    },
    answers_container: {
        alignItems: "center",
        justifyContent: "center",
        width: 'auto',
        flex: 1,
        borderRadius: 16,
        margin: 20,
        marginTop: -2,
        marginBottom: 60,
        gap: 15,
        backgroundColor: Colors.light.backgroundColor,
    },
    answers_text: {
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignItems: 'center',
        textAlign: 'left',
        color: Colors.light.text,
    },
    row_views: {
        width: Dimensions.get('screen').width * 0.9,
        minHeight: Dimensions.get('screen').height * 0.08,
        borderWidth: 2,
        borderColor: Colors.dark.backgroundColor,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
    }
});

//export default ChoiceQuestionScreen;