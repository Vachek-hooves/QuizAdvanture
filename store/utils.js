import AsyncStorage from '@react-native-async-storage/async-storage';
import {quiz} from '../data/quiz';
import {enciclopedia} from '../data/enciclopedia';

const QUIZ_KEY = 'quiz';
const STATS_KEY = 'quiz_statistics';
const ENCICLOPEDIA_KEY = 'enciclopedia';

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

export const saveEnciclopediaToStorage = async () => {
  try {
    // Save only necessary data (without images)
    const storageData = enciclopedia.map(({id, isLocked, title, content}) => ({
      id,
      isLocked,
      title,
      content,
    }));
    await AsyncStorage.setItem(ENCICLOPEDIA_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.log('enciclopedia saving error', error);
  }
};

export const loadEnciclopediaFromStorage = async () => {
  try {
    const savedEnciclopedia = await AsyncStorage.getItem(ENCICLOPEDIA_KEY);
    if (!savedEnciclopedia) {
      await saveEnciclopediaToStorage();
      return enciclopedia;
    }
    return JSON.parse(savedEnciclopedia);
  } catch (error) {
    console.log('enciclopedia loading error', error);
    return enciclopedia;
  }
};

export const unlockEnciclopediaUtil = async (
  enciclopedia,
  enciclopediaId,
  currentScore,
) => {
  try {
    const updatedEnciclopedia = enciclopedia.map(item =>
      item.id === enciclopediaId ? {...item, isLocked: false} : item,
    );
    await AsyncStorage.setItem(
      ENCICLOPEDIA_KEY,
      JSON.stringify(updatedEnciclopedia),
    );
    const stats = await loadQuizStatistics();
    const updatedStats = stats.map((stat, index) =>
      index === stats.length - 1 // Update the last statistic entry
        ? {...stat, score: currentScore - 10}
        : stat,
    );
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));
    return {updatedEnciclopedia, updatedStats};
  } catch (error) {
    console.log('enciclopedia unlocking error', error);
    return enciclopedia;
  }
};

//  QUIZ GAMEPLAY UTILS

const createQuizAttempt = (quizId, correctAnswers, timeSpent, totalScore) => ({
  quizId,
  correctAnswers,
  percentage: (correctAnswers / 10) * 100,
  timeSpent, // in seconds
  timestamp: new Date().toISOString(),
  score: totalScore, // Add score field
});

export const saveQuizStatistics = async (
  quizId,
  correctAnswers,
  timeSpent,
  totalScore,
) => {
  try {
    const existingStats = await loadQuizStatistics();
    const newAttempt = createQuizAttempt(
      quizId,
      correctAnswers,
      timeSpent,
      totalScore,
    );

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
export const getQuizStats = statistics => {
  if (!statistics.length) return {};

  return statistics.reduce((acc, attempt) => {
    const {quizId} = attempt;
    if (!acc[quizId]) {
      acc[quizId] = {
        totalAttempts: 0,
        averagePercentage: 0,
        averageTime: 0,
        bestScore: 0,
        highestScore: 0, // Add highest score tracking
      };
    }

    const current = acc[quizId];
    current.totalAttempts += 1;
    current.averagePercentage =
      (current.averagePercentage * (current.totalAttempts - 1) +
        attempt.percentage) /
      current.totalAttempts;
    current.averageTime =
      (current.averageTime * (current.totalAttempts - 1) + attempt.timeSpent) /
      current.totalAttempts;
    current.bestScore = Math.max(current.bestScore, attempt.percentage);
    current.highestScore = Math.max(current.highestScore, attempt.score || 0); // Track highest score

    return acc;
  }, {});
};

export const unlockRegion = async (quiz, regionId, currentScore) => {
  try {
    // Save updated quiz
    const updatedQuiz = quiz.map(q =>
      String(q.id) === String(regionId) ? {...q, isLocked: false} : q,
    );
    await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(updatedQuiz));

    // Update statistics to subtract the unlock cost
    const stats = await loadQuizStatistics();
    const updatedStats = stats.map((stat, index) =>
      index === stats.length - 1 // Update the last statistic entry
        ? {...stat, score: currentScore - 35}
        : stat,
    );
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));

    return {
      updatedQuiz,
      updatedStats,
    };
  } catch (error) {
    console.log('Error unlocking region:', error);
    return null;
  }
};
