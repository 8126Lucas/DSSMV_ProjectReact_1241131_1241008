import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native'
import React, {useMemo} from "react";
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import {InlineDropdownProps} from "@/src/types/InlineDropdownProps";
import {useTheme} from "@/hooks/useTheme";
import {useTranslation} from "react-i18next";

const InlineDropdown = ({title, mandatory, options, updateValue}: InlineDropdownProps) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const pickerSelectStyles = useMemo(() => getPickerSelectStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title} {mandatory && <Text style={{color: colors.incorrect}}>*</Text>}
            </Text>
            <RNPickerSelect
                onValueChange={(value: string | null): void => updateValue(value)}
                items={options}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: t("Select an item..."), value: null }}
                Icon={() => {return (Platform.OS !== 'web' ? <Ionicons name="chevron-down" size={24} color={colors.secondaryText}/> : null);}}/>
        </View>
    );
}

const getPickerSelectStyles = (colors: any) => StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: colors.text,
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        color: colors.text,
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    inputWeb: {
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundColor,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    iconContainer: {
        top: 20,
        paddingRight: 15,
    },
});

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        position: 'relative',
        width: Dimensions.get("screen").width * 0.7,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
        color: colors.text,
    },
});

export default InlineDropdown;