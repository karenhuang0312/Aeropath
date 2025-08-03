import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// ✅ Define all supported languages
export const languages = {
  en: "English",
  es: "Español",
  zh: "中文",
} as const;

// ✅ Create a TypeScript type for language keys
export type LanguageKey = keyof typeof languages;

// ✅ Define context structure
interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
}

// ✅ Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ✅ LanguageProvider component to wrap your entire app
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKey>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
