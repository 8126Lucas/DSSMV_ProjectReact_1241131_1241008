import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type CountdownProps = {
    seconds: number;
}

function decreaseValue(value: number) {
    return --value;
}

const Countdown = (props: CountdownProps) => {
    let [countdown, setCountdown] = useState(props.seconds);
    let [text_color, setTextColor] = useState('black');
    const scale = useSharedValue(1);
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
            }
        }, 1000);
        return () => clearInterval(decreaseCountdown);
    }, [countdown]);
    return (
        <View style={styles.clock_container}>
            <Animated.Text style={[{fontSize: 20, color: text_color}, animated_final_countdown]}>{countdown}</Animated.Text>
        </View>
    );
};

const CountdownClock = () => {
    return (
        <Countdown seconds={30}/>
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
});

export default CountdownClock;