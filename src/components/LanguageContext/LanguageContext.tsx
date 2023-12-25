import React, { createContext, useContext, useState, ReactNode } from 'react';
import { strings as enStrings } from '../../strings/en';
import { strings as ruStrings } from '../../strings/ru';

export type Language = 'en' | 'ru';

export type MessagesType = keyof typeof enStrings;

export const localizedText = (language: Language, key: keyof typeof enStrings) => {
  switch (language) {
    case 'en':
      return enStrings[key];
    case 'ru':
      return ruStrings[key];
    default:
      return enStrings[key];
  }
};

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export function isValidNameOfString(value: string) {
  return Object.keys(enStrings).includes(value as string);;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};