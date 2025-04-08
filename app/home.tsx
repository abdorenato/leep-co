"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  ChevronDown,
  Zap,
  PenTool,
  MessageSquare,
  BarChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"
import { translations, type Language } from "@/lib/translations"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

export default function NewHomePage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [activeSection, setActiveSection] = useState("hero")

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

  // Refs for animated sections
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLDivElement>()
  const [aboutRef, aboutVisible] = useIntersectionObserver<HTMLDivElement>()
  const [servicesRef, servicesVisible] = useIntersectionObserver<HTMLDivElement>()
  const [contactRef, contactVisible] = useIntersectionObserver<HTMLDivElement>()

  // Update active section for navigation highlighting
  useEffect(() => {
    if (heroVisible) setActiveSection("hero")
    else if (aboutVisible) setActiveSection("about")
    else if (servicesVisible) setActiveSection("services")
    else if (contactVisible) setActiveSection("contact")
  }, [heroVisible, aboutVisible, servicesVisible, contactVisible])

  // Define translations
  const headerTranslations = {
    about: language === 'pt' ? 'Sobre' : 'About',
    problemsTitle: language === 'pt' ? 'Serviços' : 'Services',
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

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <SiteHeader 
        language={language} 
        setLanguage={handleLanguageChange} 
        translations={headerTranslations}
        activeSection={activeSection}
        isHomePage={true}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="pt-32 md:pt-40 pb-24 md:pb-32 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#161C2C]/40 to-[#161C2C]/20"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
                {language === 'pt' 
                  ? "Aceleramos resultados com estratégia sólida e coragem criativa." 
                  : "We move brands with solid strategy and creative courage."}
              </h1>
              <p className="text-xl text-gray-300 md:text-2xl max-w-[600px]">
                {language === 'pt' 
                  ? "Na L'eep Co., unimos visão de negócio e execução criativa e inteligente para construir marcas fortes, relevantes e que geram resultados."
                  : "At L'eep Co., we unite business vision and smart creative execution to build strong, relevant brands that generate results."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" className="bg-teal hover:bg-teal/90 text-black font-medium rounded-md px-8 py-6 text-lg">
                  <Link href="#services">
                    {language === 'pt' ? "Conheça Nossos Serviços" : "Discover Our Services"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal/10 rounded-md px-8 py-6 text-lg">
                  <Link href="#contact">
                    {language === 'pt' ? "Fale Conosco" : "Contact Us"}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image 
                src="/images/logo_leepco_branco_gd.png"
                alt="L'eep Co. Logo" 
                width={400}
                height={400}
                className="object-cover animate-pulse"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-16 md:py-24 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'pt' ? "Sobre a L'eep Co." : "About L'eep Co."}
            </h2>
            <p className="text-lg text-gray-400">
              {language === 'pt' 
                ? "Consultoria estratégica, criatividade e resultados com uma visão única." 
                : "Strategic consulting, creativity, and results with a unique vision."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-teal">
                {language === 'pt' ? "Nossa Abordagem Ambidestra" : "Our Ambidextrous Approach"}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'pt' 
                  ? "A L'eep Co. é fundada no conceito de ambidestria organizacional: a capacidade de equilibrar a exploração de novas oportunidades com a explotação (otimização) do que já funciona."
                  : "L'eep Co. is founded on the concept of organizational ambidexterity: the ability to balance the exploration of new opportunities with the exploitation (optimization) of what already works."}
              </p>
              <p className="text-gray-300 mb-6">
                {language === 'pt' 
                  ? "Com essa abordagem, ajudamos empresas a inovar para o futuro enquanto otimizam seus negócios atuais, gerando crescimento sustentável em ambientes complexos e em constante mudança."
                  : "With this approach, we help companies innovate for the future while optimizing their current businesses, generating sustainable growth in complex and constantly changing environments."}
              </p>
              <div className="flex items-center text-teal">
                <ArrowRight className="h-5 w-5 mr-2" />
                <p className="font-medium">
                  {language === 'pt' 
                    ? "Maximizando oportunidades presentes e futuras simultaneamente"
                    : "Maximizing present and future opportunities simultaneously"}
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <div className="bg-teal/20 p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-teal" />
                  </div>
                  {language === 'pt' ? "Visão Estratégica" : "Strategic Vision"}
                </h4>
                <p className="text-gray-400">
                  {language === 'pt' 
                    ? "Combinamos análise de dados com perspectiva de mercado para desenhar estratégias que realmente funcionam."
                    : "We combine data analysis with market perspective to design strategies that actually work."}
                </p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <div className="bg-teal/20 p-2 rounded-full mr-3">
                    <PenTool className="h-5 w-5 text-teal" />
                  </div>
                  {language === 'pt' ? "Criatividade Pragmática" : "Pragmatic Creativity"}
                </h4>
                <p className="text-gray-400">
                  {language === 'pt' 
                    ? "Ideias criativas e ousadas, mas sempre alinhadas a objetivos estratégicos claros e mensuráveis."
                    : "Creative and bold ideas, but always aligned with clear and measurable strategic objectives."}
                </p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <div className="bg-teal/20 p-2 rounded-full mr-3">
                    <BarChart className="h-5 w-5 text-teal" />
                  </div>
                  {language === 'pt' ? "Foco em Resultados" : "Results-Oriented"}
                </h4>
                <p className="text-gray-400">
                  {language === 'pt' 
                    ? "Compromisso com a implementação e impacto real dos projetos, com métricas claras e acompanhamento contínuo."
                    : "Commitment to real project implementation and impact, with clear metrics and continuous monitoring."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-teal relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-[800px] mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {language === 'pt' ? "Desafios Que Resolvemos" : "Challenges We Solve"}
            </h2>
            <p className="text-xl text-gray-800">
              {language === 'pt' 
                ? "Os principais obstáculos que as empresas enfrentam em suas jornadas de crescimento." 
                : "The main obstacles companies face in their growth journeys."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Strategic Challenges */}
            <div className="bg-[#161C2C] p-8 rounded-2xl border border-gray-800 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2 group shadow-lg hover:shadow-orange-900/20">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-orange-900/20 p-4 rounded-full mb-6 h-24 w-24 flex items-center justify-center group-hover:bg-orange-900/40 transition-colors">
                  <BarChart className="text-orange-400 h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-orange-400 transition-colors text-center text-white">
                  {language === 'pt' ? "Estratégicos" : "Strategic Challenges"}
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-300 flex items-start">
                  <div className="bg-orange-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-orange-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Dificuldade em equilibrar ações de curto e longo prazo"
                      : "Difficulty balancing short and long-term actions"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-orange-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-orange-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Desalinhamento entre áreas e processos da empresa"
                      : "Misalignment between company areas and processes"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-orange-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-orange-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Falta de visão clara para guiar decisões importantes"
                      : "Lack of clear vision to guide important decisions"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Creative Challenges */}
            <div className="bg-[#161C2C] p-8 rounded-2xl border border-gray-800 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2 group shadow-lg hover:shadow-purple-900/20">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-purple-900/20 p-4 rounded-full mb-6 h-24 w-24 flex items-center justify-center group-hover:bg-purple-900/40 transition-colors">
                  <PenTool className="text-purple-400 h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors text-center text-white">
                  {language === 'pt' ? "Criativos" : "Creative Challenges"}
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-300 flex items-start">
                  <div className="bg-purple-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-purple-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Campanhas e ações que não se destacam no mercado"
                      : "Campaigns and actions that don't stand out in the market"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-purple-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-purple-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Falta de conceitos criativos alinhados à estratégia"
                      : "Lack of creative concepts aligned with strategy"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-purple-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-purple-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Dificuldade em traduzir dados em insights criativos"
                      : "Difficulty translating data into creative insights"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Digital Presence Challenges */}
            <div className="bg-[#161C2C] p-8 rounded-2xl border border-gray-800 hover:border-red-400 transition-all duration-300 transform hover:-translate-y-2 group shadow-lg hover:shadow-red-900/20">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-red-900/20 p-4 rounded-full mb-6 h-24 w-24 flex items-center justify-center group-hover:bg-red-900/40 transition-colors">
                  <MessageSquare className="text-red-400 h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-red-400 transition-colors text-center text-white">
                  {language === 'pt' ? "Presença Digital" : "Digital Presence"}
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-300 flex items-start">
                  <div className="bg-red-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-red-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Presença digital inconsistente e sem direcionamento"
                      : "Inconsistent digital presence without clear direction"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-red-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-red-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Dificuldade em converter engajamento em vendas reais"
                      : "Difficulty converting engagement into actual sales"}
                  </span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <div className="bg-red-900/20 p-1 rounded-full mr-3 h-6 w-6 flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight className="text-red-400 h-3 w-3" />
                  </div>
                  <span>
                    {language === 'pt' 
                      ? "Campanhas que consomem orçamento com pouco retorno"
                      : "Campaigns that consume budget with little return"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-gray-800 font-semibold mb-8 max-w-3xl mx-auto">
              {language === 'pt' 
                ? "A L'eep Co. aborda esses desafios com uma visão holística e ambidestra, conectando estratégia, criatividade e execução:"
                : "L'eep Co. addresses these challenges with a holistic and ambidextrous vision, connecting strategy, creativity, and execution:"}
            </p>
            <Button asChild className="bg-[#161C2C] hover:bg-[#161C2C]/90 text-white font-medium rounded-md px-8 py-6 text-lg transform transition hover:scale-105 shadow-md">
              <Link href="#services">
                {language === 'pt' ? "Descubra Nossas Soluções" : "Discover Our Solutions"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'pt' ? "Nossos Serviços" : "Our Services"}
            </h2>
            <p className="text-lg text-gray-400">
              {language === 'pt' 
                ? "Soluções integradas para os diferentes desafios do seu negócio." 
                : "Integrated solutions for your business's different challenges."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Strategy Services */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full hover:border-orange-400 transition-colors group">
              <div className="bg-orange-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-orange-900/40 transition-colors">
                <BarChart className="text-orange-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {language === 'pt' 
                  ? "Consultoria Estratégica"
                  : "Strategic Consulting"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Desenvolvimento de estratégias de crescimento, modelos de negócio, otimização operacional e planos de implementação."
                  : "Development of growth strategies, business models, operational optimization, and implementation plans."}
              </p>
              <Button asChild variant="link" className="mt-4 p-0 text-orange-400 hover:text-orange-300 justify-start">
                <Link href="/growth">
                  <span>{language === 'pt' ? "L'eep Growth" : "L'eep Growth"}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Creative Services */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full hover:border-purple-400 transition-colors group">
              <div className="bg-purple-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-purple-900/40 transition-colors">
                <PenTool className="text-purple-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                {language === 'pt' 
                  ? "Planejamento Criativo"
                  : "Creative Planning"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Criação de conceitos inovadores, campanhas de alto impacto, design thinking e soluções criativas para problemas complexos."
                  : "Creation of innovative concepts, high-impact campaigns, design thinking, and creative solutions for complex problems."}
              </p>
              <Button asChild variant="link" className="mt-4 p-0 text-purple-400 hover:text-purple-300 justify-start">
                <Link href="/brief">
                  <span>{language === 'pt' ? "L'eep Brief" : "L'eep Brief"}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Marketing Services */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-full hover:border-red-400 transition-colors group">
              <div className="bg-red-900/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-red-900/40 transition-colors">
                <MessageSquare className="text-red-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                {language === 'pt' 
                  ? "Presença Digital"
                  : "Digital Presence"}
              </h3>
              <p className="text-gray-400 mt-2 flex-grow">
                {language === 'pt' 
                  ? "Planejamento, criação e gestão de campanhas e estratégias para garantir uma reputação sólida e vendas." 
                  : "Planning, creation, and management of campaigns and strategies to ensure a solid reputation and sales."}
              </p>
              <Button asChild variant="link" className="mt-4 p-0 text-red-400 hover:text-red-300 justify-start">
                <Link href="/on">
                  <span>{language === 'pt' ? "L'eep On" : "L'eep On"}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button asChild className="bg-teal hover:bg-teal/90 text-black font-medium rounded-md px-8 py-6 text-lg">
              <Link href="#contact">
                {language === 'pt' ? "Entre em Contato" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why L'eep Section */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === 'pt' ? "Por que a L'eep?" : "Why L'eep?"}
            </h2>
            <p className="text-xl text-gray-300 mb-16">
              {language === 'pt' 
                ? "Combinamos estratégia sob medida com execução ágil para resultados reais." 
                : "We combine tailored strategy with agile execution for real results."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Tailored Approach */}
            <div className="bg-teal p-8 rounded-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-[#161C2C] p-4 rounded-full h-16 w-16 flex items-center justify-center">
                  <PenTool className="text-white h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {language === 'pt' ? "Sob medida" : "Tailored Approach"}
              </h3>
              <p className="text-gray-800">
                {language === 'pt' 
                  ? "Estratégias personalizadas para cada desafio único" 
                  : "Personalized strategies for each unique challenge"}
              </p>
            </div>

            {/* Ambidextrous */}
            <div className="bg-teal p-8 rounded-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-[#161C2C] p-4 rounded-full h-16 w-16 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">+</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {language === 'pt' ? "Ambidestra" : "Ambidextrous"}
              </h3>
              <p className="text-gray-800">
                {language === 'pt' 
                  ? "Equilibramos eficiência operacional e inovação" 
                  : "We balance operational efficiency and innovation"}
              </p>
            </div>

            {/* Agile Methodology */}
            <div className="bg-teal p-8 rounded-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-[#161C2C] p-4 rounded-full h-16 w-16 flex items-center justify-center">
                  <svg className="text-white h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {language === 'pt' ? "Metodologia ágil" : "Agile Methodology"}
              </h3>
              <p className="text-gray-800">
                {language === 'pt' 
                  ? "Processos flexíveis e adaptáveis às necessidades do cliente" 
                  : "Flexible processes adaptable to client needs"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'pt' 
                  ? "Vamos Elevar Seu Negócio Juntos" 
                  : "Let's Elevate Your Business Together"}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {language === 'pt' 
                  ? "Entre em contato para discutir como o ecossistema L'eep pode ajudar a impulsionar o crescimento da sua empresa."
                  : "Get in touch to discuss how the L'eep ecosystem can help drive your company's growth."}
              </p>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8">
                <h3 className="text-xl font-bold mb-3 flex items-center text-teal">
                  <ArrowRight className="h-5 w-5 mr-2" /> 
                  {language === 'pt' ? "A Vantagem L'eep" : "The L'eep Advantage"}
                </h3>
                <p className="text-gray-300">
                  {language === 'pt' 
                    ? "Trabalhamos com uma abordagem integrada que combina estratégia, criatividade e implementação sob o mesmo teto. Isso garante coerência em todas as frentes e maximiza os resultados."
                    : "We work with an integrated approach that combines strategy, creativity, and implementation under the same roof. This ensures coherence on all fronts and maximizes results."}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-xl text-teal font-medium">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  {language === 'pt' 
                    ? "Transforme desafios em oportunidades de crescimento"
                    : "Transform challenges into growth opportunities"}
                </div>
                <div className="flex items-center text-xl text-teal font-medium">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  {language === 'pt' 
                    ? "Tenha experts em múltiplas disciplinas trabalhando no seu negócio"
                    : "Have experts in multiple disciplines working on your business"}
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
                  <Link href="/growth" className="text-gray-400 hover:text-teal transition">
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