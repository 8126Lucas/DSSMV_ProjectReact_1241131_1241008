import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import LeaderboardList from "@/components/leaderboard/LeaderboardFlatList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {REST_DB_ENDPOINT_LEADERBOARD} from "@/constants/RestDBEndpoints";
import {useEffect, useMemo, useState, useCallback} from "react";
import {setLeaderboardData} from "@/src/flux/store/leaderboardSlice";
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

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            if(user.user_token) {
                let reviewed_data: GameScore[] = await fetchGameScores(user.user_token);
                dispatch(setLeaderboardData({
                    leaderboard_data: reviewed_data,
                }));
                console.log(leaderboard.leaderboard_data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
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
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <Text style={styles.text}>{`🏆 ${t('LEADERBOARD')} 🏆`}</Text>
                <View style={styles.listContainer}>
                    <LeaderboardList
                        data={leaderboard.leaderboard_data}
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
    listContainer: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 18,
        textTransform: 'uppercase',
        color: colors.text,
    },
});
