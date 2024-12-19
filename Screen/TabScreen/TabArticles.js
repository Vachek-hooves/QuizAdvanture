import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import {enciclopedia as EncyclopediaData} from '../../data/enciclopedia';

const {width} = Dimensions.get('window');

const TabArticles = ({navigation}) => {
  const {
    enciclopedia: unlockedState,
    statistics,
    unlockEnciclopedia,
  } = useAppContext();

  // Merge locked states with original data to ensure image references are always present
  const mergedEnciclopedia = EncyclopediaData.map(originalItem => ({
    ...originalItem,
    isLocked:
      unlockedState.find(e => e.id === originalItem.id)?.isLocked ?? true,
  }));

  const calculateTotalScore = () => {
    return statistics.reduce((total, stat) => total + (stat.score || 0), 0);
  };

  const handleUnlock = async enciclopediaId => {
    const totalScore = calculateTotalScore();
    if (totalScore >= 10) {
      const success = unlockEnciclopedia(enciclopediaId);
      if (success) {
        Alert.alert(
          'Article Unlocked!',
          'You can now read this article. Enjoy learning about ancient Greece!',
          [{text: 'Great!', style: 'default'}],
        );
        // Force update the local state to maintain image references
        // const updatedEnciclopedia = mergedEnciclopedia.map(item => ({
        //   ...item,
        //   isLocked: item.id === enciclopediaId ? false : item.isLocked,
        // }));
        // Re-render with updated state
        // setMergedEnciclopedia(updatedEnciclopedia);
      }
    } else {
      Alert.alert(
        'Not Enough Points',
        `You need 10 points to unlock this article. Current total: ${totalScore}`,
        [{text: 'OK'}],
      );
    }
  };

  const handleArticlePress = article => {
    navigation.navigate('StackArticleDetails', {article});
  };

  // console.log(mergedEnciclopedia)

  return (
    <ImageBackground
      source={require('../../assets/bg/bg.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.45)', 'rgba(20, 93, 160, 0.6)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.header}>Encyclopedia</Text>
            <View style={styles.cardsContainer}>
              {mergedEnciclopedia.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    item.isLocked
                      ? handleUnlock(item.id)
                      : handleArticlePress(item)
                  }
                  style={[styles.card, item.isLocked && styles.lockedCard]}>
                  <View style={item.isLocked ? styles.lockedCardWrapper : null}>
                    <Image
                      source={item.image}
                      style={[
                        styles.cardImage,
                        item.isLocked && styles.lockedImage,
                      ]}
                    />
                    <View style={styles.cardContent}>
                      <Text
                        style={[
                          styles.cardTitle,
                          item.isLocked && styles.lockedTitle,
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                    {item.isLocked && (
                      <View style={styles.lockedBadge}>
                        <Text style={styles.lockedText}>LOCKED</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  lockedCardWrapper: {
    opacity: 0.9,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  lockedCard: {
    borderColor: '#666666',
    borderWidth: 1,
    transform: [{scale: 0.97}], // Slightly smaller
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  lockedImage: {
    opacity: 0.6,
    tintColor: '#404040', // Adds a dark tint to the image
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  lockedTitle: {
    color: '#B4B4B4', // Lighter gray for locked titles
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
  },
  lockedBadge: {
    position: 'absolute',
    top: -185,
    right: 10,
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default TabArticles;
