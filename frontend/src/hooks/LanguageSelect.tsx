import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/**
 * Supported language codes.
 */
export type Language = "en" | "es" | "zh";

/**
 * Display names for each supported language.
 */
export const languages: Record<Language, string> = {
  en: "English",
  es: "Español",
  zh: "普通话",
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * Internal: throws if setLanguage is used outside a provider.
 */
function throwSetLanguage(): never {
  throw new Error("setLanguage called outside LanguageProvider");
}

/**
 * Context for language selection.
 */
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: throwSetLanguage,
});

/**
 * Returns the current language and the setter function.
 */
export const useLanguage = () => useContext(LanguageContext);

/**
 * React context provider for language selection.
 * Persists selection in localStorage, SSR-safe.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // SSR-safe and validates the stored language
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "en" || stored === "es" || stored === "zh") {
        return stored;
      }
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
