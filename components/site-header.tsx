"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"
import type { Language } from "@/lib/translations"

interface SiteHeaderProps {
  language: Language
  setLanguage: (lang: Language) => void
  activeSection?: string
  translations: {
    about: string
    problemsTitle: string
    contact: string
    cta: string
  }
  isHomePage?: boolean
}

export function SiteHeader({
  language,
  setLanguage,
  activeSection = "",
  translations,
  isHomePage = false,
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // When not on homepage, go to homepage with anchor
      window.location.href = `/#${sectionId}`
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed w-full z-50 bg-black border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo_leepco_branco_gd.png"
            alt="L'eep Co. Logo"
            width={150}
            height={50}
            className="h-12 w-auto hover:animate-pulse transition-all duration-300"
          />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href={isHomePage ? "#about" : "/#about"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("about");
              }
            }}
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "about" ? "text-teal" : "text-gray-300",
            )}
          >
            {translations.about}
            {activeSection === "about" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
          <Link
            href={isHomePage ? "#problems" : "/#problems"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("problems");
              }
            }}
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "problems" ? "text-teal" : "text-gray-300",
            )}
          >
            {translations.problemsTitle}
            {activeSection === "problems" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
          <Link
            href={isHomePage ? "#journey" : "/#journey"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("journey");
              }
            }}
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "journey" ? "text-teal" : "text-gray-300",
            )}
          >
            {language === "pt" ? "Jornada Estratégica" : "Strategic Journey"}
            {activeSection === "journey" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
          <Link
            href={isHomePage ? "#why-us" : "/#why-us"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("why-us");
              }
            }}
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "why-us" ? "text-teal" : "text-gray-300",
            )}
          >
            {language === "pt" ? "Casos de Uso" : "Use Cases"}
            {activeSection === "why-us" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
          <Link
            href="/blog"
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "blog" ? "text-teal" : "text-gray-300",
            )}
          >
            Blog
            {activeSection === "blog" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                scrollToSection("contact");
              }
            }}
            className={cn(
              "text-sm font-medium hover:text-teal transition-colors relative",
              activeSection === "contact" ? "text-teal" : "text-gray-300",
            )}
          >
            {translations.contact}
            {activeSection === "contact" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
            )}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher onLanguageChange={setLanguage} currentLanguage={language} />
          <Button
            className="hidden md:flex bg-teal hover:bg-teal/90 text-black font-medium group relative overflow-hidden"
            onClick={() => isHomePage ? scrollToSection("contact") : window.location.href = "/#contact"}
          >
            <span className="relative z-10">{translations.cta}</span>
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-teal text-teal hover:animate-pulse"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 absolute w-full animate-fade-in">
          <div className="container py-4 px-4 flex flex-col space-y-4">
            <Link
              href={isHomePage ? "#about" : "/#about"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("about");
                }
              }}
              className="text-lg font-medium py-2 hover:text-teal"
            >
              {translations.about}
            </Link>
            <Link
              href={isHomePage ? "#problems" : "/#problems"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("problems");
                }
              }}
              className="text-lg font-medium py-2 hover:text-teal"
            >
              {translations.problemsTitle}
            </Link>
            <Link
              href={isHomePage ? "#journey" : "/#journey"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("journey");
                }
              }}
              className="text-lg font-medium py-2 hover:text-teal"
            >
              {language === "pt" ? "Jornada Estratégica" : "Strategic Journey"}
            </Link>
            <Link
              href={isHomePage ? "#why-us" : "/#why-us"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("why-us");
                }
              }}
              className="text-lg font-medium py-2 hover:text-teal"
            >
              {language === "pt" ? "Casos de Uso" : "Use Cases"}
            </Link>
            <Link href="/blog" className="text-lg font-medium py-2 hover:text-teal">
              Blog
            </Link>
            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("contact");
                }
              }}
              className="text-lg font-medium py-2 hover:text-teal"
            >
              {translations.contact}
            </Link>
            <Button
              className="w-full bg-teal hover:bg-teal/90 text-black font-medium mt-4 group relative overflow-hidden"
              onClick={() => isHomePage ? scrollToSection("contact") : window.location.href = "/#contact"}
            >
              <span className="relative z-10">{translations.cta}</span>
              <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

