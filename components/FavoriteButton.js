import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//hier word de knop gemaakt, geplaatst en gestyled
const FavoriteButton = ({ isFavorite, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={onPress}
        >
            <Text style={styles.favoriteButtonText}>{isFavorite ? 'Favorited' : 'Favorite'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    favoriteButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    favoriteButtonActive: {
        backgroundColor: 'lightgreen',
    },
    favoriteButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9178ED',
    },
});

export default FavoriteButton;
