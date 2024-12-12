import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TabArticles = () => {
  return (
    <ImageBackground
      source={require('../../assets/bg/math.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.55)', 'rgba(20, 93, 160, 0.8)']}
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
