import {Text, View, StyleSheet, ActivityIndicator, Share, Alert, Vibration} from "react-native";
import {Colors} from "@/constants/theme";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import AppButton from "@/components/homepage/AppButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {createClient, REALTIME_LISTEN_TYPES, REALTIME_PRESENCE_LISTEN_EVENTS} from "@supabase/supabase-js";
import {supabase_client} from "@/constants/supabaseClient";
import {useEffect, useState} from "react";

const shareRoom = async (room_token: any) => {
    try {
        await Share.share({
            message: `Join me in a game of Challengers! Room token: ${room_token}`,
        });
    } catch (error: any) {
        Alert.alert(error.message);
    }
}

export default function WaitingRoomScreen () {
    const params = useLocalSearchParams();
    const [presence_count, setPresenceCount] = useState(1);

    useEffect(() => {
        const game_room = supabase_client.channel(`room:game-${params.room_token}`);
        if(params.user_type === 'host') {
            game_room.on(
                REALTIME_LISTEN_TYPES.PRESENCE,
                { event: REALTIME_PRESENCE_LISTEN_EVENTS.JOIN },
                async (payload) => {
                    const presence_state = game_room.presenceState();
                    const player_count = Object.keys(presence_state).length;
                    setPresenceCount(player_count)
                    if(player_count >= parseInt(params.number_of_players as string)) {
                        const start_time = Date.now() + 1500;
                        await game_room.send({
                            type: 'broadcast',
                            event: 'start',
                            payload: {start_time}
                        });
                        setTimeout(() => {
                            Vibration.vibrate();
                            router.navigate({
                                pathname: './game',
                                params: {
                                    room_token: params.room_token,
                                },
                            });
                        }, 1000);
                    }
                }
            )
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        console.log('Subscrito à sala de espera');
                        await game_room.track({
                            user_id: `${params.user_type}`,
                            role: `${params.user_type}`,
                            joined_at: Date.now(),
                        });
                    }
                });
        }
        else if(params.user_type === 'guest') {
            game_room.on(
                REALTIME_LISTEN_TYPES.BROADCAST,
                { event: 'start' },
                (payload) => {
                    const delay = payload.start_time - Date.now();
                    setTimeout(() => {
                        Vibration.vibrate();
                        router.navigate({
                            pathname: './game',
                            params: {
                                room_token: params.room_token,
                            },
                        });
                    }, Math.max(0, delay));
                }
            )
                .subscribe(async (status) => {
                    if (status === 'SUBSCRIBED') {
                        console.log(`Subscrito ${params.user_type} à sala de espera`);
                        await game_room.track({
                            user_id: `${params.user_type}`,
                            role: `${params.user_type}`,
                            joined_at: Date.now(),
                        });
                    }
                });
        }
        return () => {
            game_room.unsubscribe();
        };
    }, [params.number_of_players, params.room_token, params.user_type]);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Text style={styles.text}>Waiting Other{"\n"}Player to Join</Text>
                <Text onPress={() => shareRoom(params.room_token)} style={styles.room_token_text}>Room Code: #{params.room_token}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.dark.backgroundColor} style={{transform: [{scale: 3}]}}/>
                </View>
                {params.user_type === "host" && (
                    <Text style={styles.text}>{presence_count}/{params.number_of_players} Players</Text>
                )}
                <AppButton title={"Cancel"} color={Colors.default.primaryAction2} onPress={() => router.navigate("./home")}/>
            </SafeAreaView>
        </View>

    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.light.backgroundColor,
    },
    container: {
        flex: 1,
        margin: 10,
        paddingBottom: 70,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
    room_token_text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.default.player1Color,
    }
});