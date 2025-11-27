import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ColorValue, Dimensions} from 'react-native';
import {Colors, FontFamily, Fonts, FontSize} from "@/constants/theme";

type AppButtonProps = {
    title: string;
    color: ColorValue;
    onPress?: () => void; 
}

const AppButton = ({ title, color, onPress }: AppButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 3,
        borderColor: Colors.light.border,
        marginHorizontal: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: Dimensions.get("screen").width * 0.75,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 60,
    },
    text: {
        fontFamily: FontFamily.headingMedium,
        color: Colors.light.text,
        fontSize: FontSize.large,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default AppButton;