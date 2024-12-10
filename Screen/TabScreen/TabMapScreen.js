import {Platform, StyleSheet, View, Animated} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import {poligonRegions} from '../../data/poligon';
import React, {useRef} from 'react';


const TabMapScreen = ({navigation}) => {
  const mapAnimation = useRef(new Animated.Value(0)).current;
  const mapRef = useRef(null);

  const onRegionSelect = region => {
    
    
    // Animate to the selected region
    mapRef.current.animateToRegion(
      {
        latitude: region.coordinates[0].latitude,
        longitude: region.coordinates[0].longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      2000,
    );

    // Animate opacity or scale of the selected region
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
});
