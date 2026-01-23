import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import {CountdownClockProps} from "@/src/types/CountdownClockProps";
import {useTheme} from "@/hooks/useTheme";

function decreaseValue(value: number) {
    return --value;
}

const CountdownClock = (props: CountdownClockProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [countdown, setCountdown] = useState(props.seconds);
    const [text_color, setTextColor] = useState(colors.text);
    const scale = useSharedValue(1);

    const animated_final_countdown = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    useEffect(() => {
        setCountdown(props.seconds);
    }, [props.seconds]);

    useEffect(() => {
        if(countdown !== 0) {
            const id_countdown = setInterval(() => {
                setCountdown(previous_countdown => {
                    const next_countdown = decreaseValue(previous_countdown);
                    if (next_countdown >= 0) {
                        return next_countdown;
                    }
                    return 0;
                });
            }, 1000);
            return () => clearInterval(id_countdown);
        }
    }, [countdown]);

    useEffect(() => {
        props.onTimeChange(countdown);
        if (countdown <= 10 && countdown > 0) {
            setTextColor(colors.incorrect);
            scale.value = withSpring(1.2, {
                damping: 2,
                stiffness: 170,
            });
        }
    }, [countdown]);

    return (
        <View style={styles.clock_container}>
            <Animated.Text style={[{color: text_color}, styles.countdown_text, animated_final_countdown]}>{countdown}</Animated.Text>
        </View>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    clock_container: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        borderColor: colors.text,
        borderWidth: 2,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countdown_text: {
        position: 'absolute',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 50,
        fontSize: 20,
    }
});

export default CountdownClock;