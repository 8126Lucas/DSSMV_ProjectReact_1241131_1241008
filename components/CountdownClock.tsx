import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CountdownClockProps {
    seconds: number;
    onTimeChange: (time: number) => void;
}

function decreaseValue(value: number) {
    return --value;
}

const CountdownClock = (props: CountdownClockProps) => {
    const [countdown, setCountdown] = useState(props.seconds);
    const [text_color, setTextColor] = useState('black');
    const scale = useSharedValue(1);

    const animated_final_countdown = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    useEffect(() => {
        setCountdown(props.seconds);

        const decreaseCountdown = setInterval(() => {
            setCountdown(previous_countdown => {
                const next_countdown = decreaseValue(previous_countdown);
                if (next_countdown >= 0) {
                    return next_countdown;
                }
                return 0;
            });
        }, 1000);
        return () => clearInterval(decreaseCountdown);
    }, [props.seconds]);
    useEffect(() => {
        props.onTimeChange(countdown);

        if (countdown <= 10) {
            setTextColor('red');
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

const styles = StyleSheet.create({
    clock_container: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        borderColor: 'black',
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