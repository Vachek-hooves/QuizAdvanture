import AsyncStorage from '@react-native-async-storage/async-storage';
import {quiz} from '../data/quiz';

const QUIZ_KEY = 'quiz';
const STATS_KEY = 'quiz_statistics';

export const saveQuizToStorage = async () => {
  try {
    await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(quiz));
  } catch (error) {
    console.log('quiz saving error', error);
  }
};

export const loadQuizFromStorage = async () => {
  try {
    const savedQuiz = await AsyncStorage.getItem(QUIZ_KEY);
    if (!savedQuiz) {
      // If no saved data exists, save and return initial quiz data
      await saveQuizToStorage();
      return quiz;
    }
    return JSON.parse(savedQuiz);
  } catch (error) {
    console.log('quiz loading error', error);
    return quiz; // Return initial quiz data as fallback
  }
};



//  QUIZ GAMEPLAY UTILS

const createQuizAttempt = (quizId, correctAnswers, timeSpent) => ({
    quizId,
    correctAnswers,
    percentage: (correctAnswers / 10) * 100,
    timeSpent, // in seconds
    timestamp: new Date().toISOString(),
  });

  export const saveQuizStatistics = async (quizId, correctAnswers, timeSpent) => {
    try {
      // Load existing statistics
      const existingStats = await loadQuizStatistics();
      const newAttempt = createQuizAttempt(quizId, correctAnswers, timeSpent);
      
      // Add new attempt to existing stats
      const updatedStats = [...existingStats, newAttempt];
      
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));
      return updatedStats;
    } catch (error) {
      console.log('statistics saving error', error);
      return [];
    }
  };

  export const loadQuizStatistics = async () => {
    try {
      const stats = await AsyncStorage.getItem(STATS_KEY);
      return stats ? JSON.parse(stats) : [];
    } catch (error) {
      console.log('statistics loading error', error);
      return [];
    }
  };

  // Helper functions to analyze statistics
export const getQuizStats = (statistics) => {
    if (!statistics.length) return {};
    
    return statistics.reduce((acc, attempt) => {
      const { quizId } = attempt;
      if (!acc[quizId]) {
        acc[quizId] = {
          totalAttempts: 0,
          averagePercentage: 0,
          averageTime: 0,
          bestScore: 0,
        };
      }
      
      const current = acc[quizId];
      current.totalAttempts += 1;
      current.averagePercentage = (current.averagePercentage * (current.totalAttempts - 1) + attempt.percentage) / current.totalAttempts;
      current.averageTime = (current.averageTime * (current.totalAttempts - 1) + attempt.timeSpent) / current.totalAttempts;
      current.bestScore = Math.max(current.bestScore, attempt.percentage);
      
      return acc;
    }, {});
  };