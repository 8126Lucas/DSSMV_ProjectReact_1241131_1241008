import {AudioPlayer} from "expo-audio";
import {base64ToAudio} from "@/hooks/base64ToAudio";

export class SoundManager {
    static #instance: SoundManager;
    public win_sound: AudioPlayer | null;

    private constructor() {
        this.win_sound = null;
    }

    public static get instance(): SoundManager {
        if (!SoundManager.#instance) {
            SoundManager.#instance = new SoundManager();
        }
        return SoundManager.#instance;
    }

    public async loadWinSound(audio_base64: string): Promise<void> {
        this.win_sound?.remove();
        this.win_sound = await base64ToAudio(audio_base64);
    }

    public async playWinSound(): Promise<void> {
        await this.win_sound?.seekTo(0);
        this.win_sound?.play();
    }
}