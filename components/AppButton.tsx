import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AppButtonProps = {
    title: string;
    onPress?: () => void; 
}

const AppButton = ({ title, onPress }: AppButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,           
        borderColor: '#000',      
        backgroundColor: '#fff',  
        paddingVertical: 12,
        paddingHorizontal: 24,
        minWidth: 200,           
        alignItems: 'center',     
        marginTop: 20,            
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase', 
    },
});

export default AppButton;