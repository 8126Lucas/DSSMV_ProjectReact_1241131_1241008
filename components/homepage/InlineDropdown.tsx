import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useState} from "react";
import RNPickerSelect, {Item} from 'react-native-picker-select';


interface InlineDropdownProps {
    options: Item[];
}

const InlineDropdown = ({options}: InlineDropdownProps) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={options}
        />
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

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: Dimensions.get("screen").width * 0.7,
        height: Dimensions.get("screen").width * 0.7,
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
    item: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default InlineDropdown;