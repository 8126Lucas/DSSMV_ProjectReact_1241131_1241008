import {useEffect, useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useTheme} from "@/hooks/useTheme";

interface AudioWaveformProps {
    is_recording: boolean;
    latest_audio_level: React.MutableRefObject<number | null>;
}

export const AudioWaveform = (props: AudioWaveformProps) => {
    const [waveform_heights, setWaveformHeights] = useState<number[]>([]);
    const max_bars = 50;
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    useEffect(() => {
        if(!props.is_recording) {return;}
        setWaveformHeights([]);
        let waveform_buffer: number[] = [];
        const interval_id = setInterval(() => {
            if(props.latest_audio_level.current != null) {
                const normalized = Math.max(0, Math.min(1, (props.latest_audio_level.current + 60)/60));
                const variation = 0.6 + Math.random() * 0.1;
                let height = 2;
                if(normalized !== 0) {height = normalized * 130 * variation;}
                waveform_buffer.push(height);
                if(waveform_buffer.length > max_bars) {waveform_buffer.shift();}
                setWaveformHeights([...waveform_buffer]);
            }
        }, 100);
        return () => clearInterval(interval_id);
    }, [props.is_recording]);

    return (
        <View style={styles.container}>
            {waveform_heights.map((height, index) => (
                <View key={index} style={[styles.bar, {height: height * 2}]}/>
            ))}
        </View>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: "100%",
        marginBottom: 20,
    },
    bar: {
        width: 4,
        backgroundColor: colors.primaryAction2,
        borderRadius: 2,
    }
});