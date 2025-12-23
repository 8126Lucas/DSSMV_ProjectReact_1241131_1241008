import {Dimensions, Modal, Pressable, StyleSheet, Text} from "react-native";
import InlineDropdown from "@/components/homepage/InlineDropdown";
import AppButton from "@/components/AppButton";
import {requestTrivia} from "@/hooks/requestTrivia";
import React, {useMemo} from "react";
import {GameMetadataOverlayProps} from "@/src/types/GameMetadataOverlayProps";
import {useTranslation} from "react-i18next";
import {useTheme} from "@/hooks/useTheme";

const GameMetadataOverlay = (props: GameMetadataOverlayProps) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={props.metadata_visible}
            onRequestClose={() => props.setMetadataVisible(false)}>
            <Pressable style={styles.root} onPress={() => props.setMetadataVisible(false)}>
                <Pressable style={styles.container} onPress={() => props.setMetadataVisible(true)}>
                    <Text style={styles.title}>{t('Room Code')}: #{props.metadata.room_token}</Text>
                    {props.metadata.data.map((item, index) => (
                        <Text key={index} style={styles.title}>
                            {item.name}: {item.points} pts{'\n'}
                        </Text>
                    ))}
                </Pressable>
            </Pressable>
        </Modal>
    )
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

export default GameMetadataOverlay;