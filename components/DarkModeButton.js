import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

//hier word de knop gemaakt, geplaatst en gestyled
const DarkModeButton = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <TouchableOpacity style={styles.darkModeButton} onPress={toggleDarkMode}>
            <Text style={styles.darkModeButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    darkModeButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: 'center',
    },
    darkModeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9178ED',
    },
});

export default DarkModeButton;
