import Navbar from "@/components/Navbar";
import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import LeaderboardList, {GameScore} from "@/components/leaderboard/LeaderboardFlatList";

const data_testes: GameScore[] = Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 1}`,
    score: Math.floor(Math.random() * 4001) + 1000,
    date: new Date(),
}));

export default function LeaderboardScreen() {
    return (
        <View style={styles.wrapper}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>

                <Text style={styles.text}>Leaderboard</Text>
                <Text style={styles.text}>My Best Scores</Text>
                
                <View style={styles.listContainer}>
                    <LeaderboardList data={data_testes} limit={25} />
                </View>
                
            </SafeAreaView>
            <Navbar/>
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
