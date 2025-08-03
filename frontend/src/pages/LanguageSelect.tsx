import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define language options
const languageOptions = {
  en: "English",
  es: "Español",
  zh: "中文", // Mandarin
} as const;

type LanguageCode = keyof typeof languageOptions;

const LanguageSelect: React.FC = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Select a language<br />
        <span className="text-gray-500 text-lg">Seleccione un idioma</span><br />
        <span className="text-gray-500 text-lg">選擇語言</span>
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        {Object.entries(languageOptions).map(([code, label]) => (
          <Button
            key={code}
            size="lg"
            onClick={() => handleSelect(code as LanguageCode)}
            className="w-full"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
