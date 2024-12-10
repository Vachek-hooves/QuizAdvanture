import {Platform, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import {poligonRegions} from '../../data/poligon';

const greeceCoordinates = [
  {latitude: 39.071, longitude: 22.637},
  {latitude: 38.31, longitude: 21.444},
  {latitude: 37.644, longitude: 21.12},
  {latitude: 36.409, longitude: 22.509},
  {latitude: 35.368, longitude: 23.703},
];

const TabMapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} 
        style={styles.map}
        region={{
          latitude: 37.1, // Latitude for Athens, Greece
          longitude: 24.0, // Longitude for Athens, Greece
          latitudeDelta: 0.5, // Zoom level
          longitudeDelta: 4, // Zoom level
        }}>
        {poligonRegions.map((region, index) => (
          <Polygon
            key={index}
            coordinates={region.coordinates}
            fillColor={region.fillColor}
            strokeColor={region.strokeColor}
            strokeWidth={region.strokeWidth}
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
