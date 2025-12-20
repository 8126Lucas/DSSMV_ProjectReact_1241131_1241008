import {Dimensions, StyleSheet, Text, View} from 'react-native'
import React, {useMemo} from "react";
import RNPickerSelect, {Item} from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import {InlineDropdownProps} from "@/src/types/InlineDropdownProps";
import {useTheme} from "@/hooks/useTheme";

const InlineDropdown = ({title, options, updateValue}: InlineDropdownProps) => {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const pickerSelectStyles = useMemo(() => getPickerSelectStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <RNPickerSelect
                onValueChange={(value: string | null): void => updateValue(value)}
                items={options}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {return <Ionicons name="chevron-down" size={24} color={colors.secondaryText} />;}}/>
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
    iconContainer: {
        top: 20,
        right: 15,
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