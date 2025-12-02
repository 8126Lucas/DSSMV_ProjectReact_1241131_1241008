import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import CountdownClock from "@/components/CountdownClock";
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
}

class ChoiceQuestionScreen extends Component<ChoiceQuestionProps> {
    constructor(props: ChoiceQuestionProps) {
        super(props);
    }

    render() {

       return (
           <View style={styles.wrapper}>
               <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                   <View style={styles.header}>
                       <Text style={styles.category_text}>{decode(this.props.category)}</Text>
                       <View style={styles.bottom_row}>
                           <Text style={styles.questions_text}>{this.props.question_i}/{this.props.size} Questions</Text>
                           <View style={styles.countdown_container}>
                               <CountdownClock/>
                           </View>
                       </View>
                   </View>

                   <View style={styles.question_container}>
                        <Text style={styles.question_text}>{decode(this.props.question)}</Text>
                   </View>

                   <View style={styles.answers_container}>
                        <TouchableOpacity style={styles.row_views}>
                            <Text style={styles.answers_text}>{decode(this.props.answers[0])}</Text>
                        </TouchableOpacity>
                       <TouchableOpacity style={styles.row_views}>
                           <Text style={styles.answers_text}>{decode(this.props.answers[1])}</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.row_views}>
                           <Text style={styles.answers_text}>{decode(this.props.answers[2])}</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.row_views}>
                           <Text style={styles.answers_text}>{decode(this.props.answers[3])}</Text>
                       </TouchableOpacity>
                   </View>

               </SafeAreaView>
           </View>
       );
    }
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

export default ChoiceQuestionScreen;