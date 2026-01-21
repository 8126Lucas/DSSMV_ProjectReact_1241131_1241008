import { AudioPlayer } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';

export const audioToBase64 = async (audio_url: string) => {
    return await FileSystem.readAsStringAsync(audio_url, { encoding: 'base64' });
}