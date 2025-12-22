import {ActivityIndicator, Alert, Share, StyleSheet, Text, Vibration, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import AppButton from "@/components/AppButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {REALTIME_LISTEN_TYPES, REALTIME_PRESENCE_LISTEN_EVENTS} from "@supabase/supabase-js";
import {supabase_client} from "@/constants/supabaseClient";
import {useEffect, useMemo, useState} from "react";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const params = useLocalSearchParams();
    const [presence_count, setPresenceCount] = useState(1);

    useEffect(() => {
        let timeout_id: number;
        const game_room = supabase_client.channel(`room:game-${params.room_token}`);

        async function handleRoomPresenceChange() {
            const presence_state = game_room.presenceState();
            const player_count = Object.keys(presence_state).filter(key => presence_state[key].length > 0).length;
            setPresenceCount(player_count);
            if(player_count >= parseInt(params.number_of_players as string)) {
                const start_time = Date.now() + 1000;
                await game_room.send({
                    type: 'broadcast',
                    event: 'start',
                    payload: {start_time}
                });
                timeout_id = setTimeout(() => {
                    Vibration.vibrate();
                    router.replace({
                        pathname: '/game',
                        params: {
                            user_type: params.user_type,
                            room_token: params.room_token,
                            number_of_players: params.number_of_players,
                        },
                    });
                }, Math.max(0, Date.now() - start_time));
            }
        }

        if(params.user_type === 'host') {
            game_room.on(
                REALTIME_LISTEN_TYPES.PRESENCE,
                {event: REALTIME_PRESENCE_LISTEN_EVENTS.JOIN},
                async () => {
                    await handleRoomPresenceChange();
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
            game_room.on(
                REALTIME_LISTEN_TYPES.PRESENCE,
                {event: REALTIME_PRESENCE_LISTEN_EVENTS.LEAVE},
                async () => {
                    await handleRoomPresenceChange();
                }
            )
        }
        else if(params.user_type === 'guest') {
            game_room.on(
                REALTIME_LISTEN_TYPES.BROADCAST,
                { event: 'start' },
                (payload) => {
                    const delay = payload.start_time - Date.now();
                    timeout_id = setTimeout(() => {
                        Vibration.vibrate();
                        router.replace({
                            pathname: '/game',
                            params: {
                                user_type: params.user_type,
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
            if (timeout_id) {
                clearTimeout(timeout_id);
            }
            game_room.unsubscribe();
        };
    }, [params.number_of_players, params.room_token, params.user_type]);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Text style={styles.text}>{t('WAITING OTHER')}{"\n"}{t('PLAYERS TO JOIN')}</Text>
                <Text onPress={() => shareRoom(params.room_token)} style={styles.room_token_text}>{t('ROOM CODE')}: #{params.room_token}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.text} style={{transform: [{scale: 3}]}}/>
                </View>
                {params.user_type === "host" && (
                    <Text style={styles.text}>{presence_count}/{params.number_of_players} {t('PLAYERS')}</Text>
                )}
                <AppButton title={t("CANCEL")} color={colors.primaryAction1} onPress={() => router.replace("./home")}/>
            </SafeAreaView>
        </View>

    );
};

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
        color: colors.text,
    },
    room_token_text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        textTransform: 'uppercase',
        color: colors.primaryAction3,
    }
});