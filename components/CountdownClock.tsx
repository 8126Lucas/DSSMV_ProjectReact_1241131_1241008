import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CountdownProps {
    seconds: number;
    onTimeChange: (time: number) => void;
}

function decreaseValue(value: number) {
    return --value;
}

const Countdown = (props: CountdownProps) => {
    let [countdown, setCountdown] = useState(props.seconds);
    let [text_color, setTextColor] = useState('black');
    const scale = useSharedValue(1);

    const handleTimer = (time: number) => {
        props.onTimeChange(time);
    }

    const animated_final_countdown = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });
    useEffect(() => {
        const decreaseCountdown = setInterval(() => {
            if(countdown !== 0) {
                if(countdown <= 10) {
                    setTextColor('red');
                    scale.value = withSpring(1.2, {
                        damping: 2,
                        stiffness: 170,
                    });
                }
                setCountdown(countdown => decreaseValue(countdown));
                handleTimer(countdown);
            }
        }, 1000);
        return () => clearInterval(decreaseCountdown);
    }, [countdown, scale]);
    return (
        <View style={styles.clock_container}>
            <Animated.Text style={[{color: text_color}, styles.countdown_text, animated_final_countdown]}>{countdown}</Animated.Text>
        </View>
    );
};

// ----------------------------------

interface CountdownClockProps {
    seconds: number;
    onTimeChange: (time: number) => void;
}

const CountdownClock = (props: CountdownClockProps) => {
    const handleTimer = (time: number) => {
        props.onTimeChange(time);
        props.seconds = 30; // não funciona
    }

    return (
        <Countdown seconds={props.seconds} onTimeChange={handleTimer} />
    );
};

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