import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const MapMarkerAnimation = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/mapMarker.json')}
      autoPlay
      loop
      style={styles.container}
      speed={0.7}
    />
  );
};

export default MapMarkerAnimation;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 180,
    marginBottom:-30
  },
});
