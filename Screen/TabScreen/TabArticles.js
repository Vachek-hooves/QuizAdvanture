import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';

const TabArticles = () => {
  const {enciclopedia} = useAppContext();
  
  return (
    <ImageBackground
      source={require('../../assets/bg/encyclopedis.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.45)', 'rgba(20, 93, 160, 0.6)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}></ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default TabArticles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
});
