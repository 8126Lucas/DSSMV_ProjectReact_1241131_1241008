import React, {useMemo} from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {AppButtonProps} from "@/src/types/AppButtonProps";
import {useTheme} from "@/hooks/useTheme";

const AppButton = ({ title, color, onPress, icon }: AppButtonProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
            {icon}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const getStyles = (colors: any) => StyleSheet.create({
    button: {
        flexDirection: "row",
        borderWidth: 3,
        borderColor: colors.border,
        marginHorizontal: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: Dimensions.get("screen").width * 0.75,
        marginTop: 20,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        verticalAlign: "middle",
    },
    text: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default AppButton;