import {createContext, useContext, useState, useEffect} from 'react';
import {
  loadQuizFromStorage,
  saveQuizToStorage,
  loadQuizStatistics,
  saveQuizStatistics,
  getQuizStats,
} from './utils';
const AppContext = createContext({statistics: []});

export const ProviderContext = ({children}) => {
  const [quiz, setQuiz] = useState();
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [quizData, statsData] = await Promise.all([
        loadQuizFromStorage(),
        loadQuizStatistics(),
      ]);
      setQuiz(quizData);
      setStatistics(statsData);
    };
    loadData();
  }, []);

  const saveQuizResult = async (quizId, correctAnswers, timeSpent) => {
    const totalScore = correctAnswers * 5;
    const updatedStats = await saveQuizStatistics(
      quizId,
      correctAnswers,
      timeSpent,
      totalScore,
    );
    setStatistics(updatedStats);
  };

  const getStatistics = () => getQuizStats(statistics);

  const value = {
    quiz,
    statistics,
    saveQuizResult,
    getStatistics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContext Provider');
  }
  return context;
};
