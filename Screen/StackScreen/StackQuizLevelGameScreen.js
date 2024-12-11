import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import {quiz as QuizData} from '../../data/quiz';

const {width, height} = Dimensions.get('window');
const StackQuizLevelGameScreen = ({route, navigation}) => {
  const {regionId} = route.params;
  const {quiz, saveQuizResult} = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [wariorImage, setWariorImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [backgroundColors, setBackgroundColors] = useState(['rgba(12, 45, 72, 0.35)', 'rgba(20, 93, 160, 0.65)']);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const QUIZ = quiz.find(q => String(q.id) === String(regionId));

  useEffect(() => {
    const quizData = QuizData.find(q => String(q.id) === String(regionId));
    if (quizData) {
      setMainImage(quizData.image);
      setWariorImage(quizData.warior);
    }
  }, [regionId]);

  const startGame = () => {
    setShowWelcome(false);
    setGameStartTime(Date.now());
  };

  const handleAnswer = selectedAnswer => {
    const currentQuestion = QUIZ.levelQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setBackgroundColors(['rgba(76, 175, 80, 0.35)', 'rgba(76, 175, 80, 0.65)']); // Green
    } else {
      setBackgroundColors(['rgba(244, 67, 54, 0.35)', 'rgba(244, 67, 54, 0.65)']); // Red
    }
    
    setIsAnswerCorrect(isCorrect);

    // Start fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Set timeout to move to next question
    setTimeout(() => {
      // Reset background color and fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnswerCorrect(null);
        setBackgroundColors(['rgba(12, 45, 72, 0.35)', 'rgba(20, 93, 160, 0.65)']); // Reset to default blue
        if (currentQuestionIndex < QUIZ.levelQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
          saveQuizResult(regionId, score + 1, timeSpent);
          setShowResult(true);
        }
      });
    }, 1500);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setGameStartTime(Date.now());
  };

  if (!QUIZ) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const WelcomeModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showWelcome}
      onRequestClose={() => setShowWelcome(false)}
      style={styles.modalOverlay}>
      <View style={styles.modalOverlay}>
        <ImageBackground
          source={wariorImage}
          style={styles.wariorImage}
          resizeMode="cover">
          <LinearGradient
            colors={['#1A5F7A' + 30, '#2E8BC0' + 50, '#2E8BC0' + 70]}
            style={styles.modalContent}>
            <Text style={styles.modalTitle}>{QUIZ.name}</Text>
            <Text style={styles.modalWelcomeText}>{QUIZ.welcome}</Text>
            <TouchableOpacity
              onPress={startGame}
              style={styles.startButtonContainer}>
              <LinearGradient
                colors={['#145DA0' + 90, '#0C2D48' + 90]}
                style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Battle</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>
    </Modal>
  );

  if (showResult) {
    return (
      <ImageBackground source={mainImage} style={styles.container}>
        <LinearGradient
          colors={['rgba(12, 45, 72, 0.9)', 'rgba(20, 93, 160, 0.9)']}
          style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Battle Completed!</Text>
              <View style={styles.scrollContainer}>
                <Text style={styles.resultScore}>
                  Your Score: {score}/{QUIZ.levelQuestions.length}
                </Text>
                <Text style={styles.resultPercentage}>
                  {Math.round((score / QUIZ.levelQuestions.length) * 100)}%
                </Text>
                <TouchableOpacity onPress={handlePlayAgain}>
                  <LinearGradient
                    colors={['#2E8BC0', '#1A5F7A']}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Fight Again</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TabNavigation')}>
                  <LinearGradient
                    colors={['#145DA0', '#0C2D48']}
                    style={[styles.button, styles.mapButton]}>
                    <Text style={styles.buttonText}>Return to Map</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={mainImage} style={styles.container}>
      <LinearGradient
        colors={backgroundColors}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <WelcomeModal />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        (currentQuestionIndex / QUIZ.levelQuestions.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>
                  Question {currentQuestionIndex + 1}/
                  {QUIZ.levelQuestions.length}
                </Text>
                <Text style={styles.scoreText}>Score: {score}</Text>
              </View>
            </View>
            <LinearGradient
              colors={['rgba(46, 139, 192, 0.9)', 'rgba(26, 95, 122, 0.9)']}
              style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {QUIZ.levelQuestions[currentQuestionIndex].question}
              </Text>
            </LinearGradient>
            <View style={styles.optionsContainer}>
              {QUIZ.levelQuestions[currentQuestionIndex].options.map(
                (option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAnswer(option)}>
                    <LinearGradient
                      colors={['#2E8BC0', '#1A5F7A']}
                      style={styles.optionButton}>
                      <Text style={styles.optionText}>{option}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ),
              )}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12, 45, 72, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalContent: {
    width: '100%',
    height: height,
    // padding: 30,
    // borderRadius: 20,
    // alignItems: 'center',
    // borderWidth: 2,
    // borderColor: '#B4E0FF',
    // paddingHorizontal: 10,
    // paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    marginVertical: 20,
    marginTop: '80%',
  },
  modalWelcomeText: {
    fontSize: 18,
    color: '#E6F3FF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(12, 45, 72, 0.4)',
    borderRadius: 10,
    padding: 10,
  },
  startButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    marginVertical: 40,
    marginHorizontal: 60,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(46, 139, 192, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  progressBarContainer: {
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    color: '#B4E0FF',
    fontWeight: 'bold',
  },
  questionContainer: {
    // padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    // paddingVertical: 10,
    height: '20%',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 28,
    padding: 15,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    // padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  optionText: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 12,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 139, 192, 0.2)',
    borderWidth: 2,
    borderColor: '#B4E0FF',
    paddingTop: '30%',
  },
  resultTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    textAlign: 'center',
  },
  resultScore: {
    fontSize: 24,
    color: '#E6F3FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultPercentage: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#B4E0FF',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    textAlign: 'center',
  },
  button: {
    // padding: 15,
    borderRadius: 25,
    width: 280,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  wariorImage: {
    // width: 350,
    // aspectRatio: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginVertical: 20,
    width: width * 0.9,
    height: height * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#B4E0FF',
    // justifyContent:'flex-end'
  },
});

export default StackQuizLevelGameScreen;
