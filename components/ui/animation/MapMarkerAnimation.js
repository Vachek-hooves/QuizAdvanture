import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const MapMarkerAnimation = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/mapMarker.json')}
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default MapMarkerAnimation;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
