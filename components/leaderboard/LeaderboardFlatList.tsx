import {View, Text, FlatList, StyleSheet, ListRenderItem, Alert, TouchableOpacity} from 'react-native';
import { Colors} from "@/constants/theme";
import {LeaderboardListProps} from "@/src/types/LeaderboardListProps";
import {GameScore} from "@/src/types/GameScore";
import {useTheme} from "@/hooks/useTheme";
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {GameScoreMetadata} from "@/src/types/GameScoreMetadata";
import GameMetadataOverlay from "@/components/leaderboard/GameMetadataOverlay";
import {StrokeText} from "@charmy.tech/react-native-stroke-text";
import Animated, {FadeIn, FadeInLeft} from "react-native-reanimated";

const LeaderboardList = (props: LeaderboardListProps) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [selected_item, setSelectedItem] = useState<GameScore | null>(null);

    let sorted_data: GameScore[] = [];

    switch (props.type) {
        case "best":
            sorted_data = [...props.data].sort((a, b) => {
                return b.score - a.score;
            });
            break;
        case "latest":
            sorted_data = [...props.data].sort((a, b) => {
                return b.time - a.time;
            });
            break;
        default:
            Alert.alert(t("There has been an error with the game data!"));
            break;
    }

    const ranked_data = sorted_data.map((item, index) => {
        return {
            ...item,
            rank: index + 1,
        }
    })
    
    const limited_data = props.limit ? ranked_data.slice(0, props.limit) : ranked_data;

    const renderItem: ListRenderItem<GameScore> = ({ item, index }) => (
        <Animated.View style={{flex: 1}} key={index} entering={FadeInLeft.delay(index * 50)}>
            <TouchableOpacity style={styles.container} onPress={() => setSelectedItem(item)}>
                <View style={styles.leftGroup}>
                    <Text style={styles.rankText}>#{item.rank}</Text>
                    <Text style={styles.dateText}>{item.game_date}</Text>
                </View>
                <Text style={[styles.scoreText, {color: (item.score > 0) ? colors.correct : colors.incorrect}]}>{item.score} {t('pts')}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={{flex: 1}}>
            <FlatList data={limited_data}
                      renderItem={renderItem}
                      keyExtractor={(item) => item._id}
                      refreshing={props.refreshing}
                      onRefresh={props.onRefresh}/>
            {selected_item && (
                <GameMetadataOverlay
                    metadata_visible={true}
                    metadata={selected_item!.metadata}
                    setMetadataVisible={(visible) => {
                        if (!visible) {
                            setSelectedItem(null);
                        }
                    }}
                />
            )}
        </View>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 10,
        backgroundColor: colors.backgroundColor,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.text,
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
        color: colors.text,
        fontSize: 18,
        letterSpacing: 0.8,
    },
    dateText: {
        fontSize: 14,
        color: colors.text,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: colors.text,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1
    }
});

export default LeaderboardList;