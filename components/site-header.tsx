"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
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
    services: string
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
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
        <Link href="/home" className="flex items-center gap-2">
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
            href={isHomePage ? "#about" : "/home#about"}
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
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button 
              ref={buttonRef}
              className={cn(
                "text-sm font-medium hover:text-teal transition-colors flex items-center gap-1",
                (activeSection === "growth" || activeSection === "brief" || activeSection === "on") 
                  ? "text-teal" : "text-gray-300",
              )}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
            >
              {translations.services}
              <ChevronDown className="h-4 w-4" />
              {(activeSection === "growth" || activeSection === "brief" || activeSection === "on") && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal animate-pulse"></span>
              )}
            </button>
            
            {/* Dropdown menu */}
            <div 
              ref={dropdownRef}
              className={cn(
                "absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 transition-all duration-150",
                isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              )}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <Link
                  href="/growth" onClick={() => { setIsMenuOpen(false); window.location.href = "/growth"; return false; }}
                  className={
                    activeSection === "growth" 
                      ? "block px-4 py-3 hover:bg-gray-800 transition-colors text-orange-400"
                      : "block px-4 py-3 hover:bg-gray-800 transition-colors text-gray-300 hover:text-orange-400"
                  }
                >
                  <div className="text-sm font-medium">L'eep Growth</div>
                  <div className="text-xs text-gray-400 mt-1">{language === "pt" ? "Consultoria de crescimento estratégico" : "Strategic growth consulting"}</div>
                </Link>
                <Link
                  href="/brief"
                  className={
                    activeSection === "brief" 
                      ? "block px-4 py-3 hover:bg-gray-800 transition-colors text-purple-400"
                      : "block px-4 py-3 hover:bg-gray-800 transition-colors text-gray-300 hover:text-purple-400"
                  }
                >
                  <div className="text-sm font-medium">L'eep Brief</div>
                  <div className="text-xs text-gray-400 mt-1">{language === "pt" ? "Planejamento criativo e estratégico" : "Creative and strategic planning"}</div>
                </Link>
                <Link
                  href="/on"
                  className={
                    activeSection === "on" 
                      ? "block px-4 py-3 hover:bg-gray-800 transition-colors text-red-400"
                      : "block px-4 py-3 hover:bg-gray-800 transition-colors text-gray-300 hover:text-red-400"
                  }
                >
                  <div className="text-sm font-medium">L'eep On</div>
                  <div className="text-xs text-gray-400 mt-1">{language === "pt" ? "Marketing e PR digital" : "Digital marketing and PR"}</div>
                </Link>
              </div>
            </div>
          </div>
          
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
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher onLanguageChange={setLanguage} currentLanguage={language} />
          <Button
            className="hidden md:flex bg-teal hover:bg-teal/90 text-black font-medium group relative overflow-hidden"
            onClick={() => isHomePage ? scrollToSection("contact") : window.location.href = "/home#contact"}
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
        <div className="md:hidden bg-black border-t border-gray-800 absolute w-full z-50 animate-fade-in">
          <div className="container py-4 px-4 flex flex-col space-y-4">
            <Link
              href={isHomePage ? "#about" : "/home#about"}
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
            
            {/* Mobile Services Dropdown */}
            <div>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-lg font-medium py-2 hover:text-teal w-full text-left flex items-center justify-between"
              >
                <span>{translations.services}</span>
                <ChevronDown className={`h-5 w-5 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-4 border-l-2 border-gray-800 pl-4">
                  <div>
                    <Link
                      href="/growth" onClick={() => { setIsMenuOpen(false); window.location.href = "/growth"; return false; }}
                      className={activeSection === "growth" 
                        ? "block text-lg font-medium py-2 text-orange-400" 
                        : "block text-lg font-medium py-2 text-gray-300 hover:text-orange-400"}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      L'eep Growth
                    </Link>
                    <p className="text-sm text-gray-400 mt-1 mb-3">
                      {language === "pt" ? "Consultoria de crescimento estratégico" : "Strategic growth consulting"}
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/brief"
                      className={activeSection === "brief" 
                        ? "block text-lg font-medium py-2 text-purple-400" 
                        : "block text-lg font-medium py-2 text-gray-300 hover:text-purple-400"}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      L'eep Brief
                    </Link>
                    <p className="text-sm text-gray-400 mt-1 mb-3">
                      {language === "pt" ? "Planejamento criativo e estratégico" : "Creative and strategic planning"}
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/on"
                      className={activeSection === "on" 
                        ? "block text-lg font-medium py-2 text-red-400" 
                        : "block text-lg font-medium py-2 text-gray-300 hover:text-red-400"}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      L'eep On
                    </Link>
                    <p className="text-sm text-gray-400 mt-1 mb-3">
                      {language === "pt" ? "Marketing e PR digital" : "Digital marketing and PR"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <Link
              href="/blog"
              className="text-lg font-medium py-2 hover:text-teal"
            >
              Blog
            </Link>
            
            <Button
              className="mt-4 w-full bg-teal hover:bg-teal/90 text-black font-medium"
              onClick={() => {
                isHomePage ? scrollToSection("contact") : window.location.href = "/home#contact";
                setIsMenuOpen(false);
              }}
            >
              {translations.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

