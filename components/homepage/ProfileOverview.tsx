import {View, Image, StyleSheet, ImageURISource, Text} from "react-native";
import {Colors, FontFamily, Fonts, FontSize} from "@/constants/theme";
import ImagePicker from "@/components/homepage/ImagePicker";
import {useSelector} from 'react-redux';
import {RootState} from '@/src/flux/store/store';
import {useTheme} from "@/hooks/useTheme";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

const ProfileOverview = () => {
    const {t} = useTranslation();
    const user = useSelector((state: RootState) => state.user);
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <ImagePicker width={80} height={80}/>
            <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>{t('Name')}: {user.username}</Text>
                <Text style={styles.user_info_text}>{t('Played Games')}: {user.games_played}</Text>
            </View>
        </View>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        height: 100,
    },
    profile_image_container: {
        flex: 1,
        maxWidth: 80,
        maxHeight: 80,
        borderColor: colors.border,
        borderRadius: 80,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    profile_image_style: {
        width: 80,
        height: 80,
    },
    user_info_container: {
        flex: 2,
        marginLeft: 10,
        flexDirection: 'column',
    },
    user_info_text: {
        fontSize: FontSize.medium,
        margin: 6,
        fontWeight: "bold",
        color: colors.text,
    }
});

export default ProfileOverview;