import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { Colors} from "@/constants/theme";

export interface GameScore {
    id: string;
    rank?: number;
    score: number;
    date: Date;
}

interface LeaderboardListProps {
    data: GameScore[];
    limit?: number;
}

const LeaderboardList = ({ data, limit }: LeaderboardListProps) => {
    
    const sortedData = [...data].sort((a, b) => {
        return b.score - a.score;
    });
    
    sortedData.forEach((item, index) => {
        item.rank = index + 1;
    });
    
    const limitedData = limit ? sortedData.slice(0, limit) : sortedData;

    const renderItem: ListRenderItem<GameScore> = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.leftGroup}>
                <Text style={styles.rankText}>#{item.rank}</Text>
                <Text style={styles.dateText}>--/--/----</Text> 
            </View>
            <Text style={styles.scoreText}>{item.score} pts</Text>
        </View>
    );

    return (
        <FlatList data={limitedData} renderItem={renderItem} keyExtractor={(item) => item.id}/>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 10,
        backgroundColor: Colors.light.backgroundColor,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.dark.backgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    rankText: {
        color: Colors.dark.backgroundColor,
        fontSize: 18,
        letterSpacing: 0.8,
    },
    dateText: {
        fontSize: 14,
        color: Colors.dark.backgroundColor,
    },
    scoreText: {
        fontSize: 20,
        color: Colors.default.green,
    }
});

export default LeaderboardList;