"use client"
import { Button } from "@/components/ui/button"

interface LanguageSwitcherProps {
  onLanguageChange: (lang: "pt" | "en") => void
  currentLanguage: "pt" | "en"
}

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange("pt")}
        className={`px-2 ${currentLanguage === "pt" ? "text-teal font-bold" : "text-gray-400"}`}
      >
        PT
      </Button>
      <span className="text-gray-600">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange("en")}
        className={`px-2 ${currentLanguage === "en" ? "text-teal font-bold" : "text-gray-400"}`}
      >
        EN
      </Button>
    </div>
  )
}

