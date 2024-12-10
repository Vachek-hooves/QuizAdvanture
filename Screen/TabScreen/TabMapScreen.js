import {Platform, StyleSheet, View, Animated, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import {poligonRegions} from '../../data/poligon';
import React, {useRef, useState} from 'react';

const TabMapScreen = ({navigation}) => {
  const mapAnimation = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const onRegionSelect = region => {
    setSelectedRegion(region);
    
    mapRef.current.animateToRegion(
      {
        latitude: region.coordinates[0].latitude,
        longitude: region.coordinates[0].longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.8,
      },
      2000,
    );

    Animated.sequence([
      Animated.timing(mapAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(mapAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePlayBattle = () => {
    navigation.navigate('StackQuizLevelGameScreen', {
      regionId: selectedRegion.id,
      regionTitle: selectedRegion.title,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={{
          latitude: 37.9838,
          longitude: 23.7275,
          latitudeDelta: 5,
          longitudeDelta: 3,
        }}
      >
        {poligonRegions.map((region, index) => (
          <Polygon
            key={index}
            coordinates={region.coordinates}
            fillColor={region.fillColor}
            strokeColor={region.strokeColor}
            strokeWidth={region.strokeWidth}
            onPress={() => onRegionSelect(region)}
            tappable={true}
            zIndex={index + 1}
          />
        ))}
      </MapView>

      {selectedRegion && (
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>{selectedRegion.title}</Text>
            <Text style={styles.popupText}>Region ID: {selectedRegion.id}</Text>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayBattle}>
              <Text style={styles.playButtonText}>Play Battle</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default TabMapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1A5F7A',
  },
  popupText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  playButton: {
    backgroundColor: '#C84630',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
