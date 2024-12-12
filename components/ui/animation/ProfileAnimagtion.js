import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const ProfileAnimagtion = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/profile.json')}
      
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default ProfileAnimagtion;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 600,
  },
});
