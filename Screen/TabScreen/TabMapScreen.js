import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const TabMapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} // Use default provider for iOS
        style={styles.map}
        region={{
          latitude: 37.9838, // Latitude for Athens, Greece
          longitude: 23.7275, // Longitude for Athens, Greece
          latitudeDelta: 0.2, // Zoom level
          longitudeDelta: 1, // Zoom level
        }}
      />
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
