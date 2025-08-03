import React, { createContext, useContext, useState } from "react";

// Define supported languages
export const languages = {
  en: "English",
  es: "Español",
  zh: "中文",
} as const;

export type LanguageKey = keyof typeof languages;

interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageKey>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
