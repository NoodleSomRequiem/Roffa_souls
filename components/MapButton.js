import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

//hier word de knop gemaakt, geplaatst en gestyled
const MapButton = ({ navigateToMapView }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={navigateToMapView}>
            <Text style={styles.buttonText}>Go to Map</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9178ED',
    },
});

export default MapButton;
