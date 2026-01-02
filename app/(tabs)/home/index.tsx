import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import AppButton from "@/components/AppButton";
import ProfileOverview from "@/components/homepage/ProfileOverview";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useMemo, useRef, useState} from "react";
import CreateRoomOverlay from "@/components/homepage/CreateRoomOverlay";
import JoinRoomOverlay from "@/components/homepage/JoinRoomOverlay";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import LeaderboardList from "@/components/leaderboard/LeaderboardFlatList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {GameScore} from "@/src/types/GameScore";
import {setUserLeaderboardData} from "@/src/flux/leaderboardSlice";
import {FontAwesome6} from "@expo/vector-icons";
import {fetchGameScores} from "@/hooks/fetchGameScores";

export default function HomePageScreen() {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const leaderboard = useSelector((state: RootState) => state.leaderboard);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [cr_visible, setCRVisible] = useState(false);
    const [jrVisible, setJRVisible] = useState(false);
    const first_render = useRef(true);

    useEffect(() => {
        const getGameScores = async () => {
            if(user.user_token) {
                let reviewed_data: GameScore[] = await fetchGameScores(user.user_token);
                dispatch(setUserLeaderboardData({
                    user_leaderboard_data: reviewed_data,
                }));
                console.log(leaderboard.user_leaderboard_data);
            }
        };
        const has_leaderboard_data = leaderboard.user_leaderboard_data !== null && leaderboard.user_leaderboard_data !== undefined;
        if(!has_leaderboard_data || !first_render.current) {
            getGameScores();
        }
        first_render.current = false;
    }, [user.games_played]);

    if(leaderboard.user_leaderboard_data === null || leaderboard.user_leaderboard_data === undefined) {
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
                    <Text style={styles.sneaklbText}>{t('LAST 3 GAMES')}</Text>
                    <View style={styles.listContainer}>
                        <LeaderboardList
                            data={leaderboard.user_leaderboard_data}
                            limit={3}
                            type={"latest"}/>
                    </View>
                </View>
                <AppButton icon={<FontAwesome6 name="user" size={20} color={colors.text}/>} title={t('JOIN')} color={colors.primaryAction3} onPress={() => setJRVisible(true)}/>
                <AppButton icon={<FontAwesome6 name="circle-plus" size={20} color={colors.text}/>} title={t("CREATE")} color={colors.primaryAction1} onPress={() => setCRVisible(true)}/>
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
        width: '88%',
        margin: 8,
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
        margin: 8,
    },
});