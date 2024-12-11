import {
  Platform,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import {poligonRegions} from '../../data/poligon';
import React, {useRef, useState} from 'react';
import {
  MapMarkerAnimation,
  SwardAnimation,
} from '../../components/ui/animation';
import LinearGradient from 'react-native-linear-gradient';

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
        longitudeDelta: 1,
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
          latitude: 37.3,
          longitude: 24.0,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}>
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
        <LinearGradient
          colors={['rgba(12, 45, 72, 0.95)', 'rgba(20, 93, 160, 0.95)']}
          style={styles.popupContainer}>
          <MapMarkerAnimation />
          <Text style={styles.popupTitle}>{selectedRegion.title}</Text>
          {/* <Text style={styles.popupText}>Region ID: {selectedRegion.id}</Text> */}
          <TouchableOpacity onPress={handlePlayBattle}>
            <LinearGradient
              colors={['#2E8BC0', '#1A5F7A']}
              style={styles.playButton}
              onPress={handlePlayBattle}>
              <Text style={styles.playButtonText}>Play Battle</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
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
    // padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B4E0FF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#B4E0FF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  playButton: {
    // paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    marginVertical: 20,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
});
