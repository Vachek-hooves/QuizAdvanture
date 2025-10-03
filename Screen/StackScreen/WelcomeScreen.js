import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ImageBackground, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('TabNavigation');
    });
  }, [fadeAnim, scaleAnim]);

  return (
    <ImageBackground
      source={require('../../assets/bg/bg1.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.05)', 'rgba(20, 93, 160, 0.15)']}
        style={styles.gradientContainer}>
        <View style={styles.contentContainer}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>Way To</Text>
              <Text style={styles.subtitle}>Olymp</Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingTop: '20%',
    paddingBottom: '10%',
  },
  contentContainer: {
    width: '90%',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(12, 45, 72, 0.75)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  titleContainer: {
    // alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    color: '#B4E0FF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default WelcomeScreen;
