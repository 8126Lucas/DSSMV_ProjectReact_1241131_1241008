import {Dimensions, StyleSheet, Text, View} from 'react-native'
import React from "react";
import RNPickerSelect, {Item} from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

interface InlineDropdownProps {
    title: string;
    options: Item[];
    updateValue: (value: string | null) => void;
}

const InlineDropdown = ({title, options, updateValue}: InlineDropdownProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <RNPickerSelect
                onValueChange={(value: string | null): void => updateValue(value)}
                items={options}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {return <Ionicons name="chevron-down" size={24} color="gray" />;}}/>
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: 'black',
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        color: 'black',
        backgroundColor: '#00000000',
        borderWidth: 1,
        borderColor: '#000000',
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

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: Dimensions.get("screen").width * 0.7,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
    },
});

export default InlineDropdown;