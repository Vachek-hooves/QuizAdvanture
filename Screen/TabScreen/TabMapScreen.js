import {
  Platform,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import {poligonRegions} from '../../data/poligon';
import React, {useRef, useState} from 'react';
import {
  MapMarkerAnimation,
  SwardAnimation,
} from '../../components/ui/animation';
import LinearGradient from 'react-native-linear-gradient';
import {quiz as QuizData} from '../../data/quiz';
import {useAppContext} from '../../store/context';
import ProfileAnimagtion from '../../components/ui/animation/ProfileAnimagtion';

const TabMapScreen = ({navigation}) => {
  const {statistics = [], unlockRegion, quiz} = useAppContext();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const mapRef = useRef(null);

  const isRegionLocked = regionId => {
    const quizItem = quiz?.find(q => String(q.id) === String(regionId));
    return quizItem ? quizItem.isLocked : true;
  };

  const onRegionSelect = region => {
    setSelectedRegion(region);

    mapRef.current.animateToRegion(
      {
        latitude: region.coordinates[0].latitude,
        longitude: region.coordinates[0].longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 1,
      },
      2000,
    );
  };

  const handlePlayBattle = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('StackQuizLevelGameScreen', {
        regionId: selectedRegion.id,
        regionTitle: selectedRegion.title,
      });
    }, 2500);
  };

  const calculateTotalScore = () => {
    return statistics.reduce((total, stat) => total + (stat.score || 0), 0);
  };

  const handleUnlockRegion = async () => {
    const totalScore = calculateTotalScore();
    if (totalScore >= 35) {
      const success = await unlockRegion(selectedRegion.id);
      if (success) {
        Alert.alert(
          'Region Unlocked!',
          "You've successfully unlocked this region and spent 35 points.",
          [{text: 'OK'}],
        );
      }
    } else {
      Alert.alert(
        'Not Enough Points',
        `You need 35 points to unlock this region. Current total: ${totalScore}`,
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={{
          latitude: 37.3,
          longitude: 24.0,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}>
        {poligonRegions.map((region, index) => {
          const locked = isRegionLocked(region.id);

          return (
            <Polygon
              key={index}
              coordinates={region.coordinates}
              fillColor={locked ? 'rgba(0, 0, 0, 0.6)' : region.fillColor}
              strokeColor={locked ? '#666666' : region.strokeColor}
              strokeWidth={region.strokeWidth}
              onPress={() => onRegionSelect(region)}
              tappable={true}
              zIndex={index + 1}
            />
          );
        })}
      </MapView>

      {selectedRegion && (
        <View style={styles.popupWrapper}>
          <MapMarkerAnimation />
          <LinearGradient
            colors={['rgba(12, 45, 72, 0.95)', 'rgba(20, 93, 160, 0.95)']}
            style={styles.popupContainer}>
            <Text style={styles.popupTitle}>{selectedRegion.title}</Text>
            {isRegionLocked(selectedRegion.id) ? (
              <TouchableOpacity onPress={handleUnlockRegion}>
                <LinearGradient
                  colors={['#2E8BC0', '#1A5F7A']}
                  style={styles.playButton}>
                  <Text style={styles.playButtonText}>
                    Unlock for 35 points
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handlePlayBattle}>
                <LinearGradient
                  colors={['#2E8BC0', '#1A5F7A']}
                  style={styles.playButton}>
                  <Text style={styles.playButtonText}>Play Battle</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      )}

      {showAnimation && (
        <View style={styles.animationContainer}>
          <SwardAnimation />
        </View>
      )}
    </View>
  );
};

export default TabMapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  popupWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  popupContainer: {
    // position: 'absolute',
    // bottom: 20,
    width: '90%',
    // padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B4E0FF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#B4E0FF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  playButton: {
    // paddingVertical: 12,
    // paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    marginVertical: 20,
    marginTop: 10,
  },
  playButtonLocked: {
    borderColor: '#666666',
    opacity: 0.7,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  playButtonTextLocked: {
    color: '#999999',
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});
