import {Item} from 'react-native-picker-select';
import {LanguageOverlayProps} from "@/src/types/LanguageOverlayProps";
import {useTheme} from "@/hooks/useTheme";
import {useMemo} from "react";
import {Dimensions, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import LanguageDropdown from "@/components/settings/LanguageDropdown";
import AppButton from "@/components/AppButton";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/flux/store";
import {setUser} from "@/src/flux/userSlice";
import updateUserRestDB from "@/hooks/updateUserRestDB";

const language_options: Item[] = [
    { label: 'English', value: 'en' },
    { label: 'Português', value: 'pt' },
    { label: 'Español', value: 'es' }
];

const LanguageOverlay = ({ lo_visible, setLOVisible }: LanguageOverlayProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const toggleLanguage = async (language: string | null) => {
        if(language && user.user_token) {
            dispatch(setUser({
                username: (user.username ? user.username : ''),
                user_token: (user.user_token ? user.user_token : ''),
                games_played: (user.games_played ? user.games_played : 0),
                profile_picture: (user.profile_picture ? user.profile_picture : ''),
                win_sound: user.win_sound,
                language: language,
            }));
            await i18n.changeLanguage(language);
            await updateUserRestDB(user.user_token, 'language', language);
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            navigationBarTranslucent={true}
            statusBarTranslucent={true}
            visible={lo_visible}
            onRequestClose={() => setLOVisible(false)}>
            <Pressable style={styles.root} onPress={() => setLOVisible(false)}>
                <Pressable style={styles.container} onPress={() => {}}>
                    <Text style={styles.title}>{t('LANGUAGE')}</Text>
                    <LanguageDropdown title={t('Select Language')} options={language_options} updateValue={toggleLanguage} currentValue={user.language}/>
                    <View style={{ marginTop: 20 }}>
                        <AppButton title={t('Close')} color={colors.incorrect} onPress={() => setLOVisible(false)}/>
                    </View>
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

export default LanguageOverlay;