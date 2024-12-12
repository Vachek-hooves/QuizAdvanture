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

const {width} = Dimensions.get('window');

const ArticleCard = ({item, onUnlock, totalScore}) => {
  const handlePress = () => {
    if (item.isLocked) {
      Alert.alert(
        'Unlock Article',
        `Would you like to unlock this article for 10 points? (Current score: ${totalScore})`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Unlock',
            onPress: () => onUnlock(item.id),
          },
        ],
      );
    } else {
      // Handle navigation to full article view
      // You can add navigation here later
      Alert.alert('Article Content', item.content);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <LinearGradient
        colors={
          item.isLocked
            ? ['rgba(169, 169, 169, 0.4)', 'rgba(169, 169, 169, 0.6)']
            : ['rgba(46, 139, 192, 0.4)', 'rgba(26, 95, 122, 0.6)']
        }
        style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.isLocked && (
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedText}>Unlock for 10 points</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const TabArticles = () => {
  const {enciclopedia, statistics, unlockEnciclopedia} = useAppContext();

  const calculateTotalScore = () => {
    return statistics.reduce((total, stat) => total + (stat.score || 0), 0);
  };

  const handleUnlock = async (enciclopediaId) => {
    const totalScore = calculateTotalScore();
    if (totalScore >= 10) {
      const success = await unlockEnciclopedia(enciclopediaId);
      if (success) {
        Alert.alert(
          'Success!',
          'Article unlocked successfully.',
          [{text: 'OK'}],
        );
      }
    } else {
      Alert.alert(
        'Not Enough Points',
        `You need 10 points to unlock this article. Current total: ${totalScore}`,
        [{text: 'OK'}],
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bg/encyclopedis.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.45)', 'rgba(20, 93, 160, 0.6)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.header}>Encyclopedia</Text>
            <View style={styles.cardsContainer}>
              {enciclopedia.map((item) => (
                <ArticleCard
                  key={item.id}
                  item={item}
                  onUnlock={handleUnlock}
                  totalScore={calculateTotalScore()}
                />
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
  cardsContainer: {
    padding: 16,
    gap: 16,
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
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
