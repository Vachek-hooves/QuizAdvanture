import {createContext, useContext, useState, useEffect} from 'react';

const AppContext = createContext({});

export const ProviderContext = ({children}) => {
  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContext Provider');
  }
  return context;
};
