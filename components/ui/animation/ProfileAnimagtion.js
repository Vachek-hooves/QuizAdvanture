import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const ProfileAnimagtion = () => {
  return (
    <LottieView
      // source={require('../../../assets/animations/registration.json')}
      // source={require('../../../assets/animations/registrationLock.json')}
      source={require('../../../assets/animations/camera.json')}
     
    
      
      
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default ProfileAnimagtion;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
