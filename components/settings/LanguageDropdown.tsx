import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from "react";
import RNPickerSelect, { Item } from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';
import {LanguageDropdownProps} from "@/src/types/LanguageDropdownProps"
import {useTheme} from "@/hooks/useTheme";

const LanguageDropdown = ({ title, options, updateValue, currentValue }: LanguageDropdownProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const pickerSelectStyles = useMemo(() => getPickerSelectStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <RNPickerSelect
                onValueChange={(value: string | null): void => updateValue(value)}
                value={currentValue}
                items={options}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {return (Platform.OS !== 'web' ? <Ionicons name="chevron-down" size={24} color={colors.secondaryText}/> : null);}}
            />
        </View>
    );
}

const getPickerSelectStyles = (colors: any) => StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: colors.text,
        backgroundColor: '#00000000',
        borderWidth: 2,
        borderColor: colors.text,
        borderRadius: 60,
        paddingVertical: 12,
        paddingHorizontal: 24,
        paddingRight: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    inputAndroid: {
        fontSize: 16,
        color: colors.text,
        backgroundColor: '#00000000',
        borderWidth: 2,
        borderColor: colors.text,
        borderRadius: 60,
        paddingVertical: 12,
        paddingHorizontal: 24,
        paddingRight: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
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
        top: 15,
        right: 20,
    },
});

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        position: 'relative',
        width: '95%',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 5,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default LanguageDropdown;