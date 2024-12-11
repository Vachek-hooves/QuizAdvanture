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
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{QUIZ.name}</Text>
          <Text style={styles.modalWelcomeText}>{QUIZ.welcome}</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start Battle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (showResult) {
    return (
      <ImageBackground
        // source={require('../../assets/images/ancient-pattern.png')}
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
              <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
                <Text style={styles.buttonText}>Fight Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.mapButton]}
                onPress={() => navigation.navigate('TabMap')}>
                <Text style={styles.buttonText}>Return to Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      // source={require('../../assets/images/ancient-pattern.png')}
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
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{QUIZ.levelQuestions[currentQuestionIndex].question}</Text>
          </View>
          <View style={styles.optionsContainer}>
            {QUIZ.levelQuestions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F5E6CA',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B4A269',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A5F7A',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalWelcomeText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#C84630',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#B4A269',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(245, 230, 202, 0.9)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B4A269',
  },
  progressText: {
    fontSize: 18,
    color: '#1A5F7A',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    color: '#C84630',
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: 'rgba(245, 230, 202, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#B4A269',
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(245, 230, 202, 0.9)',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B4A269',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(245, 230, 202, 0.9)',
    margin: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#B4A269',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A5F7A',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#C84630',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#C84630',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#B4A269',
  },
  mapButton: {
    backgroundColor: '#1A5F7A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StackQuizLevelGameScreen;
