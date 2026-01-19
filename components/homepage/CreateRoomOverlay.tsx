import {StyleSheet, Modal, Text, Dimensions, Pressable, Alert} from "react-native";
import React, {useState, useEffect, useMemo} from "react";
import InlineDropdown from "@/components/homepage/InlineDropdown";
import {Item} from "react-native-picker-select";
import AppButton from "@/components/AppButton";
import {router} from "expo-router";
import {requestTrivia} from "@/hooks/requestTrivia";
import {CreateRoomOverlayProps} from "@/src/types/CreateRoomOverlayProps";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";
import {TriviaResponse} from "@/src/types/TriviaResponse";

const TRIVIA_API_URL = 'https://opentdb.com/api.php?';

function generateRoomToken(): string {
    return Math.floor(Math.random() * (999999 - 1 + 1) + 1).toString().padStart(6, '0');
}

const CreateRoomOverlay = ({cr_visible, setCRVisible}: CreateRoomOverlayProps) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const player_options = Array.from({length: 8}, (_, i) => ({
        label: `${i + 1}`, value: `${i + 1}`
    }));
    const number_options = Array.from({length: 50}, (_, i) => ({
        label: `${i + 1}`, value: `${i + 1}`
    }));
    const category_options: Item[] = [
        {label: t('Any Category'), value: '0'},
        {label: t('Animals'), value: '27'},
        {label: t('Art'), value: '25'},
        {label: t('Celebrities'), value: '26'},
        {label: t('Entertainment: Board Games'), value: '16'},
        {label: t('Entertainment: Books'), value: '10'},
        {label: t('Entertainment: Cartoon & Animations'), value: '32'},
        {label: t('Entertainment: Comics'), value: '29'},
        {label: t('Entertainment: Film'), value: '11'},
        {label: t('Entertainment: Japanese Anime & Manga'), value: '31'},
        {label: t('Entertainment: Music'), value: '12'},
        {label: t('Entertainment: Musicals & Theaters'), value: '13'},
        {label: t('Entertainment: Television'), value: '14'},
        {label: t('Entertainment: Video Games'), value: '15'},
        {label: t('General Knowledge'), value: '9'},
        {label: t('Geography'), value: '22'},
        {label: t('History'), value: '23'},
        {label: t('Mythology'), value: '20'},
        {label: t('Politics'), value: '24'},
        {label: t('Science & Nature'), value: '17'},
        {label: t('Science: Computers'), value: '18'},
        {label: t('Science: Gadgets'), value: '30'},
        {label: t('Science: Mathematics'), value: '19'},
        {label: t('Sports'), value: '21'},
        {label: t('Vehicles'), value: '28'},
    ];
    const difficulty_options: Item[] = [
        {label: t('Any Difficulty'), value: '0'},
        {label: t('Easy'), value: 'easy'},
        {label: t('Medium'), value: 'medium'},
        {label: t('Hard'), value: 'hard'},
    ];
    const type_options: Item[] = [
        {label: t('Any Type'), value: '0'},
        {label: t('Multiple Choice'), value: 'multiple'},
        {label: t('True/False'), value: 'boolean'},
    ];
    const [number_of_players, setNumberOfPlayers] = useState<string | null>(null);
    const [question_number, setQuestionNumber] = useState<string | null>(null);
    const [question_category, setQuestionCategory] = useState<string | null>(null);
    const [question_difficulty, setQuestionDifficulty] = useState<string | null>(null);
    const [question_type, setQuestionType] = useState<string | null>(null);
    const [room_token, setRoomToken] = useState("");

    const generateTriviaURL = (qn: string | null, cc: string | null, dc: string | null, tc: string | null): string | null => {
        let api_url: string = TRIVIA_API_URL;
        if(qn !== null) {
            api_url += `amount=${qn}`;
            if(cc !== null && cc !== '0') {
                api_url += `&category=${cc}`;
            }
            if(dc !== null && dc !== '0') {
                api_url += `&difficulty=${dc}`;
            }
            if(tc !== null && tc !== '0') {
                api_url += `&type=${tc}`;
            }
        }
        else {
            Alert.alert(t("INVALID NUMBER OF QUESTIONS"), t("To create a game room, please insert a valid number of questions."));
        }
        return api_url;
    }

     const createRoom = async (room_token: string, number_of_players: string | null, trivia: Promise<TriviaResponse | null>): Promise<void> => {
        if(number_of_players !== null) {
            trivia.then(trivia_data => {
                if(trivia_data) {
                    router.navigate({
                        pathname: '/waiting_room',
                        params: {
                            room_token: room_token,
                            number_of_players: +number_of_players,
                            user_type: 'host',
                        },
                    });
                } else {
                    console.error('No trivia data available');
                }
            }).catch(error => {
                console.error('Error fetching trivia:', error);
            });
        }
        else {
            Alert.alert(t("INVALID NUMBER OF PLAYERS"), t("To create a game room, please insert a valid number of players."));
        }
    }

    useEffect(() => {
        if (cr_visible) {setRoomToken(generateRoomToken());}
    }, [cr_visible]);
    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            navigationBarTranslucent={true}
            statusBarTranslucent={true}
            visible={cr_visible}
            onRequestClose={() => setCRVisible(false)}>
            <Pressable style={styles.root} onPress={() => setCRVisible(false)}>
                <Pressable style={styles.container} onPress={() => setCRVisible(true)}>
                    <Text style={styles.title}>{t('Room Code')}: #{room_token}</Text>
                    <InlineDropdown title={`${t('Number of Players')}:`} options={player_options} mandatory={true} updateValue={(value: string | null) => setNumberOfPlayers(value)} />
                    <InlineDropdown title={`${t('Number of Questions')}:`} options={number_options} mandatory={true} updateValue={(value: string | null) => setQuestionNumber(value)}/>
                    <InlineDropdown title={`${t('Select Category')}:`} options={category_options} mandatory={false} updateValue={(value: string | null) => setQuestionCategory(value)}/>
                    <InlineDropdown title={`${t('Select Difficulty')}:`} options={difficulty_options} mandatory={false} updateValue={(value: string | null) => setQuestionDifficulty(value)}/>
                    <InlineDropdown title={`${t('Select Type')}:`} options={type_options} mandatory={false} updateValue={(value: string | null) => setQuestionType(value)}/>
                    <Text style={{alignSelf: "flex-start", color: colors.secondaryText, fontSize: 12}}>{<Text style={{color: colors.incorrect}}>*</Text>}  -  {t("Mandatory")}</Text>
                    <AppButton title={t("CREATE")} color={colors.primaryAction1} onPress={() => {
                        setCRVisible(false);
                        let trivia_url: string | null = generateTriviaURL(question_number, question_category, question_difficulty, question_type);
                        if(trivia_url !== (TRIVIA_API_URL && null)) {
                            let trivia = requestTrivia(room_token, trivia_url);
                            createRoom(room_token, number_of_players, trivia);
                        }
                    }}/>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const getStyles = (colors: any) => StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.semi_transparent,
    },
    container: {
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: colors.backgroundColor,
        borderRadius: 20,
        padding: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: colors.text,
    },
});

export default CreateRoomOverlay;