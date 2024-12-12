import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GoBack from '../../components/ui/staticIcons/GoBack';

const StackArticleDetails = ({route, navigation}) => {
  const {article} = route.params;

  return (
    <ImageBackground
      source={article.image}
      style={styles.container}
      blurRadius={1}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.15)', 'rgba(20, 93, 160, 0.35)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <GoBack onPress={() => navigation.goBack()} />
          </View>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* <Image source={article.image} style={styles.heroImage} /> */}
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.content}>{article.content}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default StackArticleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 20,
  },
  contentContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(46, 139, 192, 0.4)',
    marginTop: -20,
    borderWidth: 1,
    borderColor: 'rgba(180, 224, 255, 0.3)',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop:10

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: '#E6F3FF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textAlign: 'justify',
  },
});
