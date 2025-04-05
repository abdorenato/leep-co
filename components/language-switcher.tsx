"use client"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/translations"

interface LanguageSwitcherProps {
  onLanguageChange: (lang: Language) => void
  currentLanguage: Language
}

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  const handleLanguageChange = (lang: Language) => {
    // Store language preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    onLanguageChange(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleLanguageChange("pt")}
        className={`px-2 ${currentLanguage === "pt" ? "text-teal font-bold" : "text-gray-400"}`}
      >
        PT
      </Button>
      <span className="text-gray-600">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleLanguageChange("en")}
        className={`px-2 ${currentLanguage === "en" ? "text-teal font-bold" : "text-gray-400"}`}
      >
        EN
      </Button>
    </div>
  )
}

