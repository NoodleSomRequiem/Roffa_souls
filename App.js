
//alle data word hier imported van de juiste files
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Switch } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from './components/Map';
import DarkModeButton from './components/DarkModeButton';
import MapButton from './components/MapButton';
import FavoriteButton from './components/FavoriteButton';
import LocationButton from './components/LocationButton';

//alle constanten worden hier aangemaakt voor alle interactions
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMapView, setShowMapView] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  //hier word async met json de "bosses" uit de rotterdamBosses.json file gehaald
  const getRotterdamBosses = async () => {
    try {
      const response = await fetch('https://stud.hosted.hr.nl/1036892/rotterdamBosses.json');
      const json = await response.json();
      setData(json.bosses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Hiermee kan een user wanneer hij of zij de app voor et eerst gebruikt kiezen of hij of zij zijn of haar locatie wilt sharen. Dit word async opgeslagen.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

//nadat de permission granted is word de huidige locatie weergegeven.
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  //hiermee worden de bosses geladen
  useEffect(() => {
    getRotterdamBosses();
  }, []);

  //hiermee worden de favorite bosses geladen
  useEffect(() => {
    loadFavorites();
  }, []);

  //als de favorite button op een item of dus boss is geclicked word deze async opgeslagen en laten zien op de mapView
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };
//async opgeslagen
  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };
//item met ID word opgeslagen zodat de favorites een eigen id hebben, zo kan die in de mapView worden laten zien
  const toggleFavorite = (itemId) => {
    const isFavorite = favorites.includes(itemId);
    let updatedFavorites = [];

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== itemId);
    } else {
      updatedFavorites = [...favorites, itemId];
    }

    setFavorites(updatedFavorites);
  };

  const isItemFavorite = (itemId) => {
    return favorites.includes(itemId);
  };
//code voor de darkmode button binnen de lijst dat dan de lijst aangepast word.
  const renderBossItem = ({ item }) => (
      <View style={[styles.itemContainer, isDarkMode && styles.darkItemContainer]}>
        <Text style={[styles.nameText, isDarkMode && styles.darkText]}>{item.name}</Text>
        <Text style={[styles.detailText, isDarkMode && styles.darkText]}>HP: {item.hp}</Text>
        <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Weakness: {item.weakness}</Text>
        <FavoriteButton
            isFavorite={isItemFavorite(item.id)}
            onPress={() => toggleFavorite(item.id)}
        />
        <LocationButton onPress={() => handleLocationButtonPress(item)} />
      </View>
  );
//als je de locationbutton klikt dan word hij op de Mapview laten zien
  const handleLocationButtonPress = (item) => {
    setSelectedItem(item);
    setShowMapView(true);
  };
//als je terug gaat naar de list nadat je op show location heb gedrukt,
// dan word deze niet meer laten zien als je op de go to map knop drukt, het word gereset zodat hij niet altijd oranje blijft.
  const navigateToList = () => {
    setSelectedItem(null);
    setShowMapView(false);
  };
//hiermee word de map refrese=hed, das een aditional feature die ik er zelf bij bedacht had.
  const refreshMap = () => {
    getRotterdamBosses();
  };
//knop voor darkmode
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };
//knop voor favorites
  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  //knop voor go to map
  const navigateToMapView = () => {
    setShowMapView(true);
  };
//hiemree worden de knoppen en de list in die pagina netjes weergegeven, ook de knoppen in de mapView.
  return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        {showMapView ? (
            <Map
                data={data}
                currentLocation={currentLocation}
                selectedItem={selectedItem}
                isItemFavorite={isItemFavorite}
                handleLocationButtonPress={handleLocationButtonPress}
                navigateToList={navigateToList}
                refreshMap={refreshMap}
            />
        ) : (
            <View style={styles.contentContainer}>
              <MapButton navigateToMapView={navigateToMapView} />
              <DarkModeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              {isLoading ? (
                  <ActivityIndicator />
              ) : (
                  <FlatList
                      data={data}
                      keyExtractor={({ id }) => id}
                      renderItem={renderBossItem}
                      contentContainerStyle={styles.flatListContent}
                  />
              )}
            </View>
        )}
      </View>
  );
};
//de style voor alles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9178ED',
  },
  darkContainer: {
    backgroundColor: '#303030',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatListContent: {
    paddingTop: 16,
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  darkItemContainer: {
    backgroundColor: '#808080',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
});

export default App;







