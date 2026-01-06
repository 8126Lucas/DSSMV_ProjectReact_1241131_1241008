import {useCallback, useEffect, useMemo, useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CountdownClock from "@/components/game/CountdownClock";
import {decode} from "html-entities";
import {BooleanQuestionProps} from "@/src/types/BooleanQuestionProps";
import {useTheme} from "@/hooks/useTheme";
import Animated, {FadeIn} from "react-native-reanimated";
import {useTranslation} from "react-i18next";



export default function BooleanQuestion(props: BooleanQuestionProps) {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {t} = useTranslation();
    const [time_left, setTimeLeft] = useState(30);
    const [answered, setAnswered] = useState(false);
    const [disable, setDisable] = useState(false);

    const handleAnswer = (answer: string, time_left: number)=> {
        setAnswered(true);
        setDisable(true);
        props.onPress(answer, time_left);
    }

    useEffect(() => {
        if (time_left === 0 && !answered) {
            handleAnswer("", 0);
        }
    }, [time_left, answered]);

    const handleTimer = useCallback((time: number) => {
        setTimeLeft(time);
    }, []);

    useEffect(() => {
        setAnswered(false);
        setDisable(false);
        setTimeLeft(30);
    }, [props.question_i]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <View style={styles.header}>
                <Text style={styles.category_text}>{decode(props.category)}</Text>
                <View style={styles.bottom_row}>
                    <Text style={styles.questions_text}>{props.question_i}/{props.size} {t('Questions')}</Text>
                    <CountdownClock key={props.question_i} seconds={30} onTimeChange={handleTimer}/>
                </View>
            </View>

            <View style={styles.question_container}>
                <Animated.Text style={styles.question_text} entering={FadeIn.duration(300)}>{decode(props.question)}</Animated.Text>
            </View>

            <View style={styles.answer_container}>
                <TouchableOpacity
                    style={[styles.answer, {backgroundColor: colors.correct}]}
                    disabled={disable}
                    onPress={() => handleAnswer('True', time_left)}>
                    <Animated.Text style={styles.answer_text} entering={FadeIn.duration(300)}>{t('True')}</Animated.Text>
                </TouchableOpacity>
                <View style={styles.vertical_line}/>
                <TouchableOpacity 
                    style={[styles.answer, {backgroundColor: colors.incorrect}]}
                    disabled={disable}
                    onPress={() => handleAnswer('False', time_left)}>
                    <Animated.Text style={styles.answer_text} entering={FadeIn.duration(300)}>{t('False')}</Animated.Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.backgroundColor,
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
        fontStyle: 'italic',
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
        textAlign: 'center',
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        fontStyle: 'italic',
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
        backgroundColor: colors.backgroundColor,
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
        backgroundColor: colors.text,
    },
});