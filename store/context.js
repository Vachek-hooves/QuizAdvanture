import {createContext, useContext, useState, useEffect} from 'react';
import {loadQuizFromStorage, saveQuizToStorage} from './utils';
const AppContext = createContext({});

export const ProviderContext = ({children}) => {
  const [quiz, setQuiz] = useState();
  

  useEffect(() => {
    const loadExistedData = async () => {
      const quiz = await loadQuizFromStorage();
      setQuiz(quiz);
    };
    loadExistedData();
  }, []);

  const value = {quiz};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContext Provider');
  }
  return context;
};
