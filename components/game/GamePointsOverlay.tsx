import {Dimensions, Modal, StyleSheet, Text, View} from "react-native";
import {useEffect, useMemo} from "react";
import {Colors} from "@/constants/theme";
import {GamePointsPerPlayerProps} from "@/src/types/GamePointsPerPlayerProps";
import {GamePointsOverlayProps} from "@/src/types/GamePointsOverlayProps";
import {useTheme} from "@/hooks/useTheme";

const GamePointsPerPlayer = (props: GamePointsPerPlayerProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>#{props.index}</Text>
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>{props.points}</Text>
        </View>
    );
}

// ------------------------------------------------------------------

const GamePointsOverlay = (props: GamePointsOverlayProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const player_scores = [...props.player_scores];
    const sorted_scores = player_scores.sort((a, b) => b.points - a.points);

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
                {sorted_scores.map((item, index) => (
                        <GamePointsPerPlayer
                            key={index}
                            index={index + 1}
                            points={item.points}
                            name={item.name} />
                    )
                )}
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
    container: {
        minWidth: Dimensions.get('screen').width * 0.75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 16,
        marginBottom: 10,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'left',
    },
});


export default GamePointsOverlay;