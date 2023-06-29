import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//hier word de knop gemaakt, geplaatst en gestyled
const LocationButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.locationButton} onPress={onPress}>
            <Text style={styles.locationButtonText}>Show Location</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    locationButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    locationButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9178ED',
    },
});

export default LocationButton;
