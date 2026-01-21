import {StyleSheet, View, Text, ScrollView, Alert} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {useTheme} from "@/hooks/useTheme";
import {useEffect, useMemo, useRef} from "react";
import {useTranslation} from "react-i18next";
import {SafeAreaView} from "react-native-safe-area-context";
import {AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState} from "expo-audio";
import {AudioWaveform} from "@/components/sound_recording/AudioWaveform";
import * as Haptics from 'expo-haptics';
import AppButton from "@/components/AppButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import {setUser} from "@/src/flux/userSlice";
import {audioToBase64} from "@/hooks/audioToBase64";
import updateUserRestDB from "@/hooks/updateUserRestDB";
import {SoundManager} from "@/src/SoundManager";

export default function SoundRecordingScreen() {
    const user = useSelector((state: RootState) => state.user);
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const audio_recorder = useAudioRecorder({...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true});
    const recorder_state = useAudioRecorderState(audio_recorder, 50);
    const latest_audio_level = useRef<number | null>(null);

    const recordSFX = async () => {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
            Alert.alert(t('Permission to access microphone was denied!'));
            return;
        }
        await setAudioModeAsync({allowsRecording: true, playsInSilentMode: true});

        if(recorder_state.isRecording) {
            await audio_recorder.stop();
            if(recorder_state.url) {
                const audio_base64 = await audioToBase64(recorder_state.url);
                dispatch(setUser({
                    username: user.username,
                    user_token: user.user_token,
                    games_played: user.games_played,
                    profile_picture: user.profile_picture,
                    win_sound: audio_base64,
                    language: user.language,
                }));
                if(user.user_token) {
                    await updateUserRestDB(user.user_token, 'win_sound', audio_base64);
                }
                await SoundManager.instance.loadWinSound(audio_base64);
                Alert.alert(t("New Sound Effect"), t("Your new sound effect has been saved and linked to your account!"));
            }
        }
        else {
            await audio_recorder.prepareToRecordAsync({isMeteringEnabled: true});
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            audio_recorder.record({forDuration: 5});
        }
    };

    useEffect(() => {
        if(recorder_state.metering != null) {
            latest_audio_level.current = recorder_state.metering;
        }
    }, [recorder_state.url, recorder_state.isRecording, recorder_state.metering]);

    return (
        <SafeAreaView style={styles.wrapper} edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{t('SOUND EFFECTS STUDIO')}</Text>
                <View style={styles.waveform}>
                    <AudioWaveform is_recording={recorder_state.isRecording} latest_audio_level={latest_audio_level} />
                </View>
                <AppButton title={recorder_state.isRecording ? t("STOP") : t("START")}
                           color={colors.primaryAction1}
                           onPress={async () => await recordSFX()}
                           icon={<Ionicons name="recording-sharp" size={28} color={colors.text} />}/>
                <Text style={[styles.bottom_text]}>{t("MAX DURATION OF 5 SECONDS")}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flexGrow: 1,
        width: '100%',
        padding: 10,
        height: "auto",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
    },
    waveform: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottom_text: {
        color: colors.secondaryText,
        fontSize: 14,
        margin: 10,
    }
});