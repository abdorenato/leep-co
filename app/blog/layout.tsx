"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { translations, type Language } from "@/lib/translations"
import { SiteHeader } from "@/components/site-header"
import { LanguageSwitcher } from "@/components/language-switcher"

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
          services: t.services,
        }}
      />

      <main className="flex-1 pt-16 overflow-x-hidden">{children}</main>

      <footer className="py-12 border-t border-gray-800 bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            <div>
              <Link href="/home">
            <Image
              src="/images/logo_leepco_branco_gd.png"
              alt="L'eep Co. Logo"
                  width={150}
                  height={150}
                  className="object-contain mb-4"
                  priority
                />
              </Link>
              <p className="text-gray-400 mt-2 text-sm">
                © {new Date().getFullYear()} L'eep Co. {t.rights}
              </p>
              <div className="mt-4">
                <LanguageSwitcher onLanguageChange={handleLanguageChange} currentLanguage={language} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {language === 'pt' ? "Contato" : "Contact"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="mailto:abdo@leepco.com.br" className="text-gray-400 hover:text-teal flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    abdo@leepco.com.br
                  </Link>
                </li>
                <li>
                  <Link href="tel:+5511941532111" className="text-gray-400 hover:text-teal flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +55 11 94153-2111
                  </Link>
                </li>
                <li>
                  <p className="text-gray-400 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    São Paulo, SP <br />
                    Brasil
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {language === 'pt' ? "Siga-nos" : "Follow Us"}
              </h3>
              <div className="flex space-x-4">
                <Link href="https://wa.me/5511941532111" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/company/leep-co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/leepconsulting" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
          </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {language === 'pt' ? "Links Rápidos" : "Quick Links"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/home" className="text-gray-400 hover:text-teal transition">
                    {language === 'pt' ? "Início" : "Home"}
                  </Link>
                  <Link href="/growth" className="text-gray-400 hover:text-teal transition">
                    L'eep Growth
                  </Link>
                  <Link href="/brief" className="text-gray-400 hover:text-teal transition">
                    L'eep Brief
                  </Link>
                  <Link href="/on" className="text-gray-400 hover:text-teal transition">
                    L'eep On
            </Link>
                  <Link href="/blog" className="text-teal transition">
              Blog
            </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

