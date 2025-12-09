import {Modal, StyleSheet, Text, View} from "react-native";
import {useEffect} from "react";
import {Colors} from "@/constants/theme";

interface GamePointsPerPlayerProps {
    index: number;
    points: number;
    name: string;
}

const GamePointsPerPlayer = (props: GamePointsPerPlayerProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.index}#</Text>
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>{props.points}</Text>
        </View>
    );
}

// ------------------------------------------------------------------

interface GamePointsOverlayProps {
    player_scores: {name: string, points: number}[];
    isVisible: boolean;
    onClose: () => void;
    duration: number;
}

const GamePointsOverlay = (props: GamePointsOverlayProps) => {
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

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 10,
        backgroundColor: Colors.light.backgroundColor,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.dark.backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
});


export default GamePointsOverlay;