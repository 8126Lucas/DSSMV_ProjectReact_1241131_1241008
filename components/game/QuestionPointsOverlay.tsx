import {Modal, View, Text, StyleSheet} from "react-native";
import {Colors} from "@/constants/theme";
import {useEffect, useMemo} from "react";
import {QuestionPointsOverlayProps} from "@/src/types/QuestionPointsOverlayProps";
import {useTheme} from "@/hooks/useTheme";



const QuestionPointsOverlay = (props: QuestionPointsOverlayProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

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
            navigationBarTranslucent={true}
            statusBarTranslucent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}>
            <View style={styles.root}>
                <Text style={[styles.text, {color: (props.correct ? colors.correct : colors.incorrect)}]}>+{props.points}</Text>
            </View>
        </Modal>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.semi_transparent,
    },
    text: {
        fontSize: 100,
        fontWeight: 'bold',
    },
});


export default QuestionPointsOverlay;