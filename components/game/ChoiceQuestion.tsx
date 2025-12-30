import {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import CountdownClock from "@/components/game/CountdownClock";
import {decode} from "html-entities";
import {ChoiceQuestionProps} from "@/src/types/ChoiceQuestionProps";
import {useTheme} from "@/hooks/useTheme";
import Animated, {FadeIn} from "react-native-reanimated";

export default function ChoiceQuestion(props: ChoiceQuestionProps) {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [answered, setAnswered] = useState(false);
    const [time_left, setTimeLeft] = useState(30);
    const [color1, setColor1] = useState(colors.backgroundColor);
    const [color2, setColor2] = useState(colors.backgroundColor);
    const [color3, setColor3] = useState(colors.backgroundColor);
    const [color4, setColor4] = useState(colors.backgroundColor);

    const handleAnswer = (answer: string, question_i: number, time_left: number) => {
        setAnswered(true);
        props.onPress(answer, time_left);
        switch (question_i) {
            case 0:
                if(answer === props.correct_answer) {
                    setColor1(colors.correct);
                } else {
                    setColor1(colors.incorrect);
                }
                break;
            case 1:
                if(answer === props.correct_answer) {
                    setColor2(colors.correct);
                } else {
                    setColor2(colors.incorrect);
                }
                break;
            case 2:
                if(answer === props.correct_answer) {
                    setColor3(colors.correct);
                } else {
                    setColor3(colors.incorrect);
                }
                break;
            case 3:
                if(answer === props.correct_answer) {
                    setColor4(colors.correct);
                } else {
                    setColor4(colors.incorrect);
                }
                break;
            default: break;
        }
    }

    const handleTimer = useCallback((time: number) => {
        setTimeLeft(time);
    }, []);

    useEffect(() => {
       if (time_left === 0 && !answered) {
           handleAnswer("", -1, 0);
       }
    }, [time_left, answered]);

    useEffect(() => {
        setAnswered(false);
        setColor1(colors.backgroundColor);
        setColor2(colors.backgroundColor);
        setColor3(colors.backgroundColor);
        setColor4(colors.backgroundColor);
        setTimeLeft(30);
    }, [props.question_i]);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <View style={styles.header}>
                    <Text style={styles.category_text}>{decode(props.category)}</Text>
                    <View style={styles.bottom_row}>
                        <Text style={styles.questions_text}>{props.question_i}/{props.size} Questions</Text>
                        <CountdownClock key={props.question_i} seconds={30} onTimeChange={handleTimer}/>
                    </View>
                </View>

                <View style={styles.question_container}>
                    <Animated.Text style={styles.question_text} entering={FadeIn.duration(300)}>{decode(props.question)}</Animated.Text>
                </View>

                <View style={styles.answers_container}>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color1}]}
                        onPress={() => handleAnswer(props.answers[0], 0,time_left)}>
                        <Animated.Text style={styles.answers_text} entering={FadeIn.duration(300)}>{decode(props.answers[0])}</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color2}]}
                        onPress={() => handleAnswer(props.answers[1], 1,time_left)}>
                        <Animated.Text style={styles.answers_text} entering={FadeIn.duration(300)}>{decode(props.answers[1])}</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color3}]}
                        onPress={() => handleAnswer(props.answers[2], 2,time_left)}>
                        <Animated.Text style={styles.answers_text} entering={FadeIn.duration(300)}>{decode(props.answers[2])}</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row_views, {backgroundColor: color4}]}
                        onPress={() => handleAnswer(props.answers[3], 3,time_left)}>
                        <Animated.Text style={styles.answers_text} entering={FadeIn.duration(300)}>{decode(props.answers[3])}</Animated.Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        width: Dimensions.get('screen').width,
        borderWidth: 2,
        backgroundColor: colors.surface,
        borderColor: colors.primaryAction2,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    category_text: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: colors.text,
        fontStyle: "italic",
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questions_text: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'left',
        color: colors.text,
    },
    question_container: {
        alignItems: "center",
        justifyContent: "center",
        width: 'auto',
        margin: 20,
        borderRadius: 16,
        borderColor: colors.primaryAction2,
        borderWidth: 1.5,
        backgroundColor: colors.surface,
        height: Dimensions.get('screen').height * 0.25,
    },
    question_text: {
        fontSize: 24,
        margin: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.text,
        fontStyle: 'italic',
    },
    answers_container: {
        alignItems: "center",
        justifyContent: "center",
        width: 'auto',
        flex: 1,
        borderRadius: 16,
        margin: 20,
        gap: 15,
        backgroundColor: colors.backgroundColor,
    },
    answers_text: {
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignItems: 'center',
        textAlign: 'left',
        color: colors.text,
    },
    row_views: {
        width: Dimensions.get('screen').width * 0.9,
        minHeight: Dimensions.get('screen').height * 0.08,
        borderWidth: 3,
        borderColor: colors.primaryAction2,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
    }
});