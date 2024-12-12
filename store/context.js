import {createContext, useContext, useState, useEffect} from 'react';
import {
  loadQuizFromStorage,
  loadQuizStatistics,
  saveQuizStatistics,
  getQuizStats,
  unlockRegion as unlockRegionUtil,
  QUIZ_KEY,
  loadEnciclopediaFromStorage
} from './utils';
const AppContext = createContext({statistics: []});

export const ProviderContext = ({children}) => {
  const [quiz, setQuiz] = useState();
  const [statistics, setStatistics] = useState([]);
  const [enciclopedia, setEnciclopedia] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      const [quizData, statsData, enciclopediaData] = await Promise.all([
        loadQuizFromStorage(),
        loadQuizStatistics(),
        loadEnciclopediaFromStorage(),
      ]);
      setQuiz(quizData);
      setStatistics(statsData);
      setEnciclopedia(enciclopediaData);
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

  const unlockRegion = async (regionId) => {
    const currentScore = statistics.reduce((total, stat) => total + (stat.score || 0), 0);
    const result = await unlockRegionUtil(quiz, regionId, currentScore);
    
    if (result) {
      setQuiz(result.updatedQuiz);
      setStatistics(result.updatedStats);
      return true;
    }
    return false;
  };

  const value = {
    quiz,
    statistics,
    saveQuizResult,
    getStatistics,
    unlockRegion,
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
