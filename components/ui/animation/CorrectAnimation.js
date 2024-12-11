import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const CorrectAnimation = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/correct.json')}
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default CorrectAnimation;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
