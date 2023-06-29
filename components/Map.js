import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

//Hier worden alle knoppen die in verband staan met de map weergegeven. Ook worden hier de items op een random locatie gezet.
const Map = ({ data, currentLocation, selectedItem, toggleFavorite, isItemFavorite, navigateToList, refreshMap }) => {
    const getRandomLocation = () => {
        const offset = 0.01; // Adjust this value to control the random location range
        const randomLatitude = currentLocation.latitude + (Math.random() * offset * 2 - offset);
        const randomLongitude = currentLocation.longitude + (Math.random() * offset * 2 - offset);
        return {
            latitude: randomLatitude,
            longitude: randomLongitude,
        };
    };
    //current location word weer opgeroepen als je op showlocation drukt
    return (
        <View style={styles.mapContainer}>
            <MapView style={styles.map} region={currentLocation} showsUserLocation={true}>
                {data.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={getRandomLocation()}
                        title={item.name}
                        pinColor={item === selectedItem ? 'orange' : (isItemFavorite(item.id) ? 'lightgreen' : 'red')}//hier word de priority van oranje over groen gemaakt.
                    />
                ))}
            </MapView>
            <TouchableOpacity style={styles.backButton} onPress={navigateToList}>
                <Text style={styles.backButtonText}>Back</Text>// button to go back
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshMap}>
                <Text style={styles.refreshButtonText}>Refresh</Text> //button to refresh
            </TouchableOpacity>
        </View>
    );
};
//props voor elke knop en selection worden hier opgeroepen.
Map.propTypes = {
    data: PropTypes.array.isRequired,
    currentLocation: PropTypes.object.isRequired,
    selectedItem: PropTypes.object,
    toggleFavorite: PropTypes.func.isRequired,
    isItemFavorite: PropTypes.func.isRequired,
    navigateToList: PropTypes.func.isRequired,
    refreshMap: PropTypes.func.isRequired,
};

//style
const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: '50%',
        left: 16,
        transform: [{ translateY: -16 }],
        backgroundColor: '#9178ED',
        borderRadius: 8,
        padding: 8,
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    refreshButton: {
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: [{ translateY: -16 }],
        backgroundColor: '#9178ED',
        borderRadius: 8,
        padding: 8,
    },
    refreshButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Map;
