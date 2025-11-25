import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useState} from "react";
import RNPickerSelect, {Item} from 'react-native-picker-select';


interface InlineDropdownProps {
    title: string;
    options: Item[];
}

const InlineDropdown = ({title, options}: InlineDropdownProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={options}
                style={pickerSelectStyles}
            />
        </View>
    );

    //return (
    //    <View style={styles.container}>
    //        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
    //            <Text style={styles.text}>{selected_option}</Text>
    //        </TouchableOpacity>
    //        {is_visible && (
    //            <FlatList
    //                data={options}
    //                keyExtractor={(item) => item}
    //                renderItem={({item}) => (
    //                    <TouchableOpacity onPress={() => selectOption(item)}>
    //                        <Text style={styles.item}>{item}</Text>
    //                    </TouchableOpacity>
    //                )}/>
    //        )}
    //    </View>
    //);
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        color: 'black',
        backgroundColor: '#00000000',
    },
    inputAndroid: {
        fontSize: 16,
        color: 'black',
        backgroundColor: '#00000000',
    },
    viewContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginTop: 5,
    }
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: Dimensions.get("screen").width * 0.7,
        marginBottom: 20,
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
    },
    item: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default InlineDropdown;