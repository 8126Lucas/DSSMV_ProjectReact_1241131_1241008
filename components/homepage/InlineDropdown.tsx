import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useState} from "react";
import RNPickerSelect, {Item} from 'react-native-picker-select';


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
            />
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
    },
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: Dimensions.get("screen").width * 0.7,
        marginBottom: 20,
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
    },
    item: {
        padding: 10,
        backgroundColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default InlineDropdown;