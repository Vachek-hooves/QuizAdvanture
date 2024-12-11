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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';

const StackQuizLevelGameScreen = ({route, navigation}) => {
  const {regionId} = route.params;
  const {quiz, saveQuizResult} = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const QUIZ = quiz.find(q => q.id === regionId);

  const startGame = () => {
    setShowWelcome(false);
    setGameStartTime(Date.now());
  };

  const handleAnswer = selectedAnswer => {
    const currentQuestion = QUIZ.levelQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < QUIZ.levelQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
      saveQuizResult(regionId, score + 1, timeSpent);
      setShowResult(true);
    }
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
      onRequestClose={() => setShowWelcome(false)}>
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={['#1A5F7A', '#2E8BC0']}
          style={styles.modalContent}>
          <Text style={styles.modalTitle}>{QUIZ.name}</Text>
          <Text style={styles.modalWelcomeText}>{QUIZ.welcome}</Text>
          <TouchableOpacity 
            onPress={startGame}
            style={styles.startButtonContainer}>
            <LinearGradient
              colors={['#145DA0', '#0C2D48']}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Battle</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );

  if (showResult) {
    return (
      <LinearGradient
        colors={['#0C2D48', '#145DA0']}
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
              <TouchableOpacity onPress={() => navigation.navigate('TabMap')}>
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
    );
  }

  return (
    <LinearGradient
      colors={['#0C2D48', '#145DA0']}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <WelcomeModal />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1}/{QUIZ.levelQuestions.length}
            </Text>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
          <LinearGradient
            colors={['rgba(46, 139, 192, 0.9)', 'rgba(26, 95, 122, 0.9)']}
            style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {QUIZ.levelQuestions[currentQuestionIndex].question}
            </Text>
          </LinearGradient>
          <View style={styles.optionsContainer}>
            {QUIZ.levelQuestions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}>
                <LinearGradient
                  colors={['#2E8BC0', '#1A5F7A']}
                  style={styles.optionButton}>
                  <Text style={styles.optionText}>{option}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
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
    // width: '95%',
    // padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B4E0FF',
    paddingHorizontal: 10,
    paddingVertical: 20,

    
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    // marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
marginVertical:20
  },
  modalWelcomeText: {
    fontSize: 18,
    color: '#E6F3FF',
    textAlign: 'center',
    // marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  startButton: {
    // paddingVertical: 15,
    // paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#B4E0FF',
    marginVertical: 40,
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
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(46, 139, 192, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  progressText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
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
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 10,
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
  },
  resultTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  resultScore: {
    fontSize: 24,
    color: '#E6F3FF',
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#B4E0FF',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  button: {
    // padding: 15,
    borderRadius: 25,
    width: 280,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default StackQuizLevelGameScreen;
