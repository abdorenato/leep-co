"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { translations, type Language } from "@/lib/translations"
import { SiteHeader } from "@/components/site-header"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<Language>("pt")
  const t = translations[language]

  useEffect(() => {
    // Check for saved language preference on component mount
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'pt')) {
      setLanguage(storedLanguage);
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SiteHeader
        language={language}
        setLanguage={handleLanguageChange}
        activeSection="blog"
        translations={{
          about: t.about,
          problemsTitle: t.problemsTitle,
          contact: t.contact,
          cta: t.cta,
        }}
      />

      <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>

      <footer className="border-t border-gray-800 bg-black text-white">
        <div className="container flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image
              src="/images/logo_leepco_branco_gd.png"
              alt="L'eep Co. Logo"
              width={120}
              height={40}
              className="h-10 w-auto hover:animate-pulse transition-all duration-300"
            />
            <p className="text-sm text-gray-400">© 2025 L'eep Co. {t.rights}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-teal text-sm">
              Home
            </Link>
            <Link href="/blog" className="text-gray-400 hover:text-teal text-sm">
              Blog
            </Link>
            <Link href="/#contact" className="text-gray-400 hover:text-teal text-sm">
              {t.contact}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

