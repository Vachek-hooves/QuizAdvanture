import AsyncStorage from '@react-native-async-storage/async-storage';
import {quiz} from '../data/quiz';

const QUIZ_KEY = 'quiz';

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
