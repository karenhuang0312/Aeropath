import React from "react";
import { useLanguage, languages } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LanguageSelect = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang: keyof typeof languages) => {
    setLanguage(lang);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Select a language<br />
        <span className="text-gray-500 text-lg">Seleccione un idioma</span><br />
        <span className="text-gray-500 text-lg">選擇語言</span>
      </h1>
      <div className="flex flex-col space-y-4">
        {Object.entries(languages).map(([code, label]) => (
          <Button key={code} size="lg" onClick={() => handleSelect(code as any)}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
