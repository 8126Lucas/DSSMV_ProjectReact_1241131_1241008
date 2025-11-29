import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import {Colors} from "@/constants/theme";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import AppButton from "@/components/homepage/AppButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {createClient, REALTIME_LISTEN_TYPES, REALTIME_PRESENCE_LISTEN_EVENTS} from "@supabase/supabase-js";
import {supabase_client} from "@/hooks/supabaseClient";
import {useEffect} from "react";




export default function WaitingRoomScreen () {
    const room_token = useLocalSearchParams();
    const user_type = useLocalSearchParams();

    useEffect(() => {
        const game_room = supabase_client.channel(`room:game-${room_token.room_token}`);
        game_room.on(
            REALTIME_LISTEN_TYPES.PRESENCE,
            { event: REALTIME_PRESENCE_LISTEN_EVENTS.JOIN },
            (payload) => {
                const presence_state = game_room.presenceState();
                const presence_count = Object.keys(presence_state).length;
                if(presence_count >= 2) {
                    router.navigate({
                        pathname: './game_test',
                        params: { room_token: room_token.room_token },
                    });
                }
            }
        )
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscrito à sala de espera');
                    // O host rastreia a sua presença
                    await game_room.track({
                        user_id: `${user_type.user_type}`,
                        role: `${user_type.user_type}`,
                        joined_at: Date.now(),
                    });
                }
            });
        return () => {
            game_room.unsubscribe();
        };
    }, []);

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <Text style={styles.text}>Waiting Other{"\n"}Player to Join</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.dark.backgroundColor} style={{transform: [{scale: 3}]}}/>
                </View>
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
});