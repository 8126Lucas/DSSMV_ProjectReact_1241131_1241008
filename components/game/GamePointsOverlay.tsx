import {Dimensions, Modal, StyleSheet, Text, View} from "react-native";
import {useEffect, useMemo} from "react";
import {GamePointsPerPlayerProps} from "@/src/types/GamePointsPerPlayerProps";
import {GamePointsOverlayProps} from "@/src/types/GamePointsOverlayProps";
import {useTheme} from "@/hooks/useTheme";
import {useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import Animated, {FadeInUp} from "react-native-reanimated";
import {useTranslation} from "react-i18next";
import {AudioPlayer, useAudioPlayer} from 'expo-audio';
import {SoundManager} from "@/src/SoundManager";

const GamePointsPerPlayer = (props: GamePointsPerPlayerProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const user = useSelector((state: RootState) => state.user);
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>#{props.index}</Text>
            <Text style={styles.text}>{props.user_token === user.user_token ? `${props.name} (${t("YOU")})` : props.name}</Text>
            <Text style={styles.text}>{props.points}</Text>
        </View>
    );
}

// ------------------------------------------------------------------

const GamePointsOverlay = (props: GamePointsOverlayProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const user = useSelector((state: RootState) => state.user);
    const player_scores = [...props.player_scores];
    const sorted_scores = player_scores.sort((a, b) => b.points - a.points);
    const game_win: boolean = (sorted_scores.length > 1 && sorted_scores[0].user_token === user.user_token);
    const audio_source_win = require('@/assets/audio/Win.mp3');
    const audio_source_loss = require('@/assets/audio/Game_Over.mp3');
    const audio_player_win = useAudioPlayer(audio_source_win);
    const audio_player_loss = useAudioPlayer(audio_source_loss);


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
            onRequestClose={props.onClose}
            onShow={async () => {
                if(game_win) {
                    let played_custom = false;
                    if (user.win_sound && user.win_sound.length > 0) {
                        try {
                            if (!SoundManager.instance.win_sound) {
                                await SoundManager.instance.loadWinSound(user.win_sound);
                            }
                            if (SoundManager.instance.win_sound) {
                                await SoundManager.instance.playWinSound();
                                played_custom = true;
                            }
                        } catch (error) {
                            console.log("Error while playing custom sound:", error);
                        }
                    }
                    if (!played_custom) {
                        await audio_player_win.seekTo(0);
                        audio_player_win.play();
                    }
                }
                else {
                    await audio_player_loss.seekTo(0);
                    audio_player_loss.play();
                }
            }}>
            <View style={styles.root}>
                {sorted_scores.map((item, index) => (
                    <Animated.View style={{width: '100%'}} key={index} entering={FadeInUp.delay(index * 100)}>
                        <GamePointsPerPlayer
                            key={index}
                            index={index + 1}
                            points={item.points}
                            name={item.name}
                            user_token={item.user_token}/>
                    </Animated.View>
                ))}
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
        backgroundColor: colors.backgroundColor,
    },
    container: {
        minWidth: Dimensions.get('screen').width * 0.75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
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