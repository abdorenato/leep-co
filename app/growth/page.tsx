"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart, Briefcase, TrendingUp, LineChart, ChartPieIcon, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"
import { type Language } from "@/lib/translations"

export default function GrowthPage() {
  const [language, setLanguage] = useState<Language>('pt')

  // Initialize language from localStorage on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language;
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'pt')) {
        setLanguage(storedLanguage);
      } else {
        // Fallback to browser language if no stored preference
        const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
        setLanguage(browserLang);
        localStorage.setItem('language', browserLang);
      }
    }
  }, []);

  // Handle language change and persist preference
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Define translations based on language
  const headerTranslations = {
    about: language === 'pt' ? 'Sobre' : 'About',
    problemsTitle: language === 'pt' ? 'Problemas' : 'Problems',
    contact: language === 'pt' ? 'Contato' : 'Contact',
    cta: language === 'pt' ? 'Fale Conosco' : 'Contact Us',
    services: language === 'pt' ? 'Serviços' : 'Services',
  }
  
  // Form translations
  const formTranslations = {
    name: language === 'pt' ? 'Nome' : 'Name',
    email: language === 'pt' ? 'Email' : 'Email',
    company: language === 'pt' ? 'Empresa' : 'Company',
    message: language === 'pt' ? 'Mensagem' : 'Message',
    send: language === 'pt' ? 'Enviar' : 'Send',
    success: language === 'pt' ? 'Sucesso!' : 'Success!',
    error: language === 'pt' ? 'Erro' : 'Error',
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <SiteHeader 
        language={language} 
        setLanguage={handleLanguageChange} 
        translations={headerTranslations}
      />
      
      {/* Hero Section */}
      <section className="pt-14 md:pt-18 pb-8 md:pb-14">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-orange-900/20 px-5 py-3 text-3xl font-bold text-orange-400 mb-4">
                L'eep Growth
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                {language === 'pt' 
                  ? "Consultoria Estratégica para Impulsionar o Crescimento do Seu Negócio"
                  : "Ambidextrous Strategic Consulting to Propel Your Business Growth"}
              </h1>
              <p className="text-xl text-gray-400 md:text-2xl max-w-[600px]">
                {language === 'pt' 
                  ? "Consultoria estratégica abrangendo marketing, vendas, operações e modelos de negócio, com uma perspectiva ambidestra única."
                  : "Strategic consulting covering marketing, sales, operations, and business models, with a unique ambidextrous perspective."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="border-orange-600 text-orange-400 hover:bg-orange-950/30 rounded-md px-8 py-6 text-lg">
                  <Link href="#services">
                    {language === 'pt' ? "Explore Nossa Abordagem" : "Explore Our Approach"}
                  </Link>
                </Button>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-md px-8 py-6 text-lg">
                  <Link href="#contact">
                    {language === 'pt' ? "Fale com a L'eep" : "Talk to L'eep"}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative aspect-video lg:aspect-square rounded-xl overflow-hidden">
              <Image 
                src="/images/orange-l-logo.png"
                alt="L'eep Growth Strategic Consulting" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Solve Section */}
      <section id="challenges" className="py-16 md:py-24 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'pt' 
                ? "Desafios Estratégicos Que Abordamos" 
                : "Strategic Challenges We Address"}
            </h2>
            <p className="text-lg text-gray-400">
              {language === 'pt' 
                ? "Como a L'eep Growth impulsiona a expansão sustentável dos negócios." 
                : "How L'eep Growth drives sustainable business expansion."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-12">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Desenvolvimento de Estratégias de Crescimento" 
                        : "Growth Strategy Development"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Dificuldade em desenvolver e implementar estratégias de crescimento eficazes com resultados mensuráveis."
                        : "Difficulty in developing and implementing effective growth strategies with measurable results."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Equilíbrio entre Curto e Longo Prazo" 
                        : "Balancing Short and Long-Term"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Necessidade de uma abordagem equilibrada que considere tanto ganhos de curto prazo quanto inovação de longo prazo."
                        : "Need for a balanced approach that considers both short-term gains and long-term innovation."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Otimização e Exploração" 
                        : "Optimization and Exploration"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Desafios em otimizar operações existentes enquanto explora novas oportunidades de mercado simultaneamente."
                        : "Challenges in optimizing existing operations while exploring new market opportunities simultaneously."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Alinhamento Estratégico" 
                        : "Strategic Alignment"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Dificuldade em alinhar diferentes áreas do negócio (marketing, vendas, operações) com a estratégia global."
                        : "Difficulty in aligning different areas of the business (marketing, sales, operations) with the overall strategy."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Orientação Estratégica" 
                        : "Strategic Guidance"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Busca por uma orientação estratégica que seja tanto prática quanto visionária para navegação em ambientes de negócios complexos."
                        : "Seeking strategic guidance that is both practical and forward-thinking for navigating complex business environments."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-900/20 text-orange-400 p-1 rounded-full mr-3 h-7 w-7 flex items-center justify-center mt-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium mb-1">
                      {language === 'pt' 
                        ? "Perspectiva Externa" 
                        : "External Perspective"}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'pt' 
                        ? "Necessidade de uma perspectiva externa imparcial para identificar oportunidades não percebidas e superar obstáculos."
                        : "Need for an unbiased external perspective to identify unseen opportunities and overcome obstacles."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'pt' 
                ? "Nossos Serviços de Consultoria Estratégica" 
                : "Our Ambidextrous Strategic Consulting Services"}
            </h2>
            <p className="text-lg text-gray-400">
              {language === 'pt' 
                ? "Como ajudamos seu negócio a crescer estrategicamente com uma abordagem ambidestra." 
                : "How we help your business grow strategically with an ambidextrous approach."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Service 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Briefcase className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Inovação de Modelos de Negócio"
                  : "Business Model Innovation"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Desenvolvemos estratégias que equilibram o refinamento de modelos de negócios existentes com a exploração de novas oportunidades inovadoras para garantir crescimento sustentável."
                  : "We develop strategies that balance refinement of existing business models with exploration of innovative new opportunities to ensure sustainable growth."}
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Análise de Mercado e Estratégias"
                  : "Market Analysis & Go-to-Market"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Identificamos oportunidades de mercado através de análises aprofundadas e criamos estratégias de entrada no mercado que combinam visão de longo prazo com ações táticas imediatas."
                  : "We identify market opportunities through in-depth analysis and create go-to-market strategies that combine long-term vision with immediate tactical actions."}
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Estratégia e Otimização de Vendas"
                  : "Sales Strategy & Optimization"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Desenvolvemos e otimizamos estratégias de vendas que melhoram o desempenho atual enquanto estabelecem bases para o crescimento futuro, aplicando nossa abordagem ambidestra."
                  : "We develop and optimize sales strategies that improve current performance while building foundations for future growth, applying our ambidextrous approach."}
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Estratégia e Planejamento de Marketing"
                  : "Marketing Strategy & Planning"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Criamos estratégias de marketing abrangentes que equilibram ações de desempenho de curto prazo com iniciativas de construção de marca de longo prazo para maximizar o impacto nos negócios."
                  : "We create comprehensive marketing strategies that balance short-term performance actions with long-term brand-building initiatives to maximize business impact."}
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Eficiência Operacional"
                  : "Operational Efficiency"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Melhoramos a eficiência operacional através da otimização de processos existentes enquanto identificamos e implementamos inovações que impulsionam o crescimento futuro."
                  : "We improve operational efficiency through optimization of existing processes while identifying and implementing innovations that drive future growth."}
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' 
                  ? "Estrutura e Desenvolvimento Organizacional"
                  : "Organizational Structure & Development"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Desenhamos estruturas organizacionais que otimizam as operações atuais enquanto criam capacidade para inovação e adaptação, apoiando a cultura ambidestra necessária para o sucesso sustentável."
                  : "We design organizational structures that optimize current operations while creating capacity for innovation and adaptation, supporting the ambidextrous culture needed for sustainable success."}
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-6 rounded-xl bg-orange-900/20 max-w-3xl">
              <h3 className="text-xl font-bold mb-3 text-white">
                {language === 'pt' 
                  ? "O Que Significa Nossa Abordagem Ambidestra?" 
                  : "What Does Our Ambidextrous Approach Mean?"}
              </h3>
              <p className="text-xl text-gray-300">
                {language === 'pt' 
                  ? "Nossa consultoria ambidestra equilibra o foco na exploração de novas oportunidades com a otimização dos negócios existentes. Desenvolvemos estratégias que resolvem desafios imediatos enquanto constroem as bases para o crescimento futuro sustentável."
                  : "Our ambidextrous consulting balances the focus on exploring new opportunities with optimizing existing business. We develop strategies that address immediate challenges while building the foundations for sustainable future growth."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'pt' 
                  ? "Vamos Criar Estratégias de Sucesso para o Seu Negócio" 
                  : "Let's Strategize Your Business Success"}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {language === 'pt' 
                  ? "Entre em contato para discutir como nossa consultoria estratégica ambidestra pode impulsionar o crescimento do seu negócio."
                  : "Get in touch to discuss how our ambidextrous strategic consulting can drive your business growth."}
              </p>
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center text-orange-400">
                  <ArrowRight className="h-5 w-5 mr-2" /> 
                  {language === 'pt' ? "A Vantagem L'eep" : "The L'eep Advantage"}
                </h3>
                <p className="text-gray-300">
                  {language === 'pt' 
                    ? "Nossa abordagem ambidestra permite uma perspectiva única que não apenas resolve seus desafios atuais, mas também constrói uma base sólida para o crescimento futuro. Combinamos sabedoria estratégica com aplicação prática para resultados tangíveis."
                    : "Our ambidextrous approach provides a unique perspective that not only solves your current challenges but also builds a solid foundation for future growth. We combine strategic wisdom with practical application for tangible results."}
                </p>
              </div>
              <div className="flex items-center text-xl text-orange-400 font-medium">
                <ArrowRight className="h-5 w-5 mr-2" />
                {language === 'pt' 
                  ? "Transforme desafios em oportunidades de crescimento"
                  : "Transform challenges into growth opportunities"}
              </div>
              
              <div className="mt-8 border-t border-gray-800 pt-8">
                <p className="text-xl mb-4">
                  {language === 'pt' 
                    ? "Veja também:"
                    : "See also:"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-3">
                    <Link href="/on">
                      L'eep On - Marketing e PR Digital
                    </Link>
                  </Button>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-3">
                    <Link href="/brief">
                      L'eep Brief - Planejamento Criativo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800">
              <ContactForm translations={formTranslations} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                © {new Date().getFullYear()} L'eep Co. {language === 'pt' ? "Todos os direitos reservados." : "All rights reserved."}
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
                  <Link href="/growth" className="text-orange-400 transition">
                    L'eep Growth
                  </Link>
                  <Link href="/brief" className="text-gray-400 hover:text-teal transition">
                    L'eep Brief
                  </Link>
                  <Link href="/on" className="text-gray-400 hover:text-teal transition">
                    L'eep On
                  </Link>
                  <Link href="/blog" className="text-gray-400 hover:text-teal transition">
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