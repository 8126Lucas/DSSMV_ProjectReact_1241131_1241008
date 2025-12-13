import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import LeaderboardList, {GameScore} from "@/components/leaderboard/LeaderboardFlatList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store/store";
import {REST_DB_ENDPOINT_LEADERBOARD} from "@/constants/RestDBEndpoints";
import {useEffect} from "react";
import {setLeaderboardData} from "@/src/flux/store/leaderboardSlice";


export default function LeaderboardScreen() {
    const user = useSelector((state: RootState) => state.user);
    const leaderboard = useSelector((state: RootState) => state.leaderboard);
    const dispatch = useDispatch();

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

    if(leaderboard.leaderboard_data === null || leaderboard.leaderboard_data.length === 0) {
        return <ActivityIndicator size="large" color='black' style={{flex: 1}}/>
    }

    return (
        <View style={styles.wrapper}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <Text style={styles.text}>Leaderboard</Text>
                <Text style={styles.text}>My Best Scores</Text>
                <View style={styles.listContainer}>
                    <LeaderboardList data={leaderboard.leaderboard_data} limit={25}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
        marginVertical: 15,
        textTransform: 'uppercase',
        color: Colors.dark.backgroundColor,
    },
});
