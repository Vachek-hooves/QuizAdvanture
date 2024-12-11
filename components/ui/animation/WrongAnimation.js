import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const WrongAnimation = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/wrong.json')}
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default WrongAnimation;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
