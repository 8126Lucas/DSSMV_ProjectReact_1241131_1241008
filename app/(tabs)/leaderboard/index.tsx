import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from "react-native";
import LeaderboardList from "@/components/leaderboard/LeaderboardFlatList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {useEffect, useMemo, useState, useCallback} from "react";
import {setGlobalLeaderboardData, setUserLeaderboardData} from "@/src/flux/store/leaderboardSlice";
import {GameScore} from "@/src/types/GameScore";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import {fetchGameScores} from "@/hooks/fetchGameScores";


export default function LeaderboardScreen() {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const leaderboard = useSelector((state: RootState) => state.leaderboard);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [refreshing, setRefreshing] = useState(false);
    const [leaderboard_list_data, setLeaderboardListData] = useState<GameScore[] | null | undefined>(leaderboard.user_leaderboard_data);
    const [leaderboard_type, setLeaderboardType] = useState<'user' | 'global'>('user');

    useEffect(() => {
        onRefresh();
    }, [leaderboard_type]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            if(user.user_token) {
                if(leaderboard_type === 'user') {
                    let reviewed_user_data: GameScore[] = await fetchGameScores(user.user_token);
                    dispatch(setUserLeaderboardData({
                        user_leaderboard_data: reviewed_user_data,
                    }));
                    setLeaderboardListData(reviewed_user_data);
                    console.log(reviewed_user_data);
                }
                else {
                    let reviewed_global_data: GameScore[] = await fetchGameScores(null);
                    dispatch(setGlobalLeaderboardData({
                        global_leaderboard_data: reviewed_global_data,
                    }));
                    setLeaderboardListData(reviewed_global_data);
                    console.log(reviewed_global_data);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }, [leaderboard_type]);

    if(leaderboard.user_leaderboard_data === null ||
        leaderboard.user_leaderboard_data === undefined ||
        leaderboard_list_data === null ||
        leaderboard_list_data === undefined) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator size="large" color={colors.text} style={{flex: 1}}/>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={() => setLeaderboardType((leaderboard_type === 'user' ? 'global' : 'user'))}>
                    <Text style={styles.text}>🏆</Text>
                    <Text style={styles.text}>{`${(leaderboard_type === 'user' ? (user.username ? `${user.username}${t('\'s')}` : t("YOUR")) : t('GLOBAL'))}\n${t('LEADERBOARD')}`}</Text>
                    <Text style={styles.text}>🏆</Text>
                </TouchableOpacity>
                <View style={styles.listContainer}>
                    <LeaderboardList
                        data={leaderboard_list_data}
                        limit={25}
                        type={"best"}
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    container: {
        flex: 1,
        margin: 10,
        paddingBottom: 70, 
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 18,
        color: colors.text,
    },
});
