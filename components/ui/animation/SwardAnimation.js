import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const SwardAnimation = () => {
  return (

    <LottieView
      source={require('../../../assets/animations/sword.json')}
      // source={require('../../../assets/animations/battleSward.json')}
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default SwardAnimation;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 600,
  },
});
