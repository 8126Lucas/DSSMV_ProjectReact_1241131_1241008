import { createAudioPlayer } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';

export const base64ToAudio = async (audio_base64: string) => {
    try {
        const file_name = `user_audio.mp3`;
        const file_uri = `${FileSystem.cacheDirectory}${file_name}`;
        await FileSystem.writeAsStringAsync(file_uri, audio_base64, { encoding: 'base64' });
        return createAudioPlayer(file_uri);
    } catch (error) {
        console.log(error);
        return null;
    }
}