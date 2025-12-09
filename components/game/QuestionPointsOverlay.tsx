import {Modal, View, Text, StyleSheet} from "react-native";
import {Colors, FontSize} from "@/constants/theme";
import {useEffect} from "react";

interface QuestionPointsOverlayProps {
    points: number;
    correct: boolean;
    isVisible: boolean;
    onClose: () => void;
    duration: number;
}

const QuestionPointsOverlay = (props: QuestionPointsOverlayProps) => {
    useEffect(() => {
        let timer: number;
        if (props.isVisible) {
            timer = setTimeout(() => {
                props.onClose();
            }, props.duration);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [props.isVisible, props.duration, props.onClose]);

    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}>
            <View style={styles.root}>
                <Text style={[styles.text, {color: (props.correct ? Colors.default.correct : Colors.default.incorrect)}]}>+{props.points}</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    text: {
        fontSize: 100,
        fontWeight: 'bold',
    },
});


export default QuestionPointsOverlay;