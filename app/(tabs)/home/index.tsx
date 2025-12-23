import {Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import AppButton from "@/components/AppButton";
import {Colors} from "@/constants/theme";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useRouter} from "expo-router";
import {useEffect, useMemo, useState} from "react";
import CreateRoomOverlay from "@/components/homepage/CreateRoomOverlay";
import JoinRoomOverlay from "@/components/homepage/JoinRoomOverlay";
import {REST_DB_ENDPOINT_LEADERBOARD, REST_DB_ENDPOINT_USER} from "@/constants/RestDBEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import LeaderboardList from "@/components/leaderboard/LeaderboardFlatList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {GameScore} from "@/src/types/GameScore";
import {setLeaderboardData} from "@/src/flux/store/leaderboardSlice";

export default function HomePageScreen() {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const leaderboard = useSelector((state: RootState) => state.leaderboard);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [cr_visible, setCRVisible] = useState(false);
    const [jrVisible, setJRVisible] = useState(false);

    useEffect(() => {
        const getGameScores = async () => {
            const filter = {'user_token': user.user_token};
            await fetch(REST_DB_ENDPOINT_LEADERBOARD + `?q=${JSON.stringify(filter)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'x-apikey': process.env.EXPO_PUBLIC_RESTDB_API,
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let reviewed_data: GameScore[] = [];
                    for(let i = 0; i < data.length; i++) {
                        reviewed_data.push({
                            _id: data[i]._id,
                            game_date: data[i].game_date,
                            score: data[i].score,
                            time: data[i].time,
                            metadata: data[i].metadata,
                        });
                    }
                    console.log(reviewed_data);
                    dispatch(setLeaderboardData({
                        leaderboard_data: reviewed_data,
                    }));
                    console.log(leaderboard.leaderboard_data);
                });
        };
        getGameScores();
    }, []);

    if(leaderboard.leaderboard_data === null) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator size="large" color={colors.text} style={{flex: 1}}/>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <CreateRoomOverlay cr_visible={cr_visible} setCRVisible={setCRVisible} />
            <JoinRoomOverlay jrVisible={jrVisible} setJRVisible={setJRVisible} />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
                <ProfileOverview/>
                <View style={styles.sneaklbContainer}>
                    <Text style={styles.sneaklbText}>{t('LEADERBOARD STATUS')}</Text>
                    <View style={styles.listContainer}>
                        <LeaderboardList data={leaderboard.leaderboard_data} limit={3} type={"latest"}/>
                    </View>
                </View>
                <AppButton title={t('JOIN')} color={colors.primaryAction3} onPress={() => setJRVisible(true)}/>
                <AppButton title={t("CREATE")} color={colors.primaryAction1} onPress={() => setCRVisible(true)}/>
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
    listContainer: {
        flex: 1,
        width: '100%',
    },
    sneaklbContainer: {
        flex: 1,
        width: '80%',
        height: "auto",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        borderRadius: 10,
        marginVertical: 10,
    },
    sneaklbText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.text,
        textAlign: "center",
    },
});