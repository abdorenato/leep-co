"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Search,
  PenToolIcon as Tool,
  Rocket,
  Menu,
  X,
  BarChart2,
  ArrowDown,
  Beaker,
  TrendingUp,
  Eye,
  Wrench,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { translations, type Language } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { ContactForm } from "@/components/contact-form"
import { CaseStudies } from "@/components/case-studies"
import { FeaturedBlogPost } from "@/components/featured-blog-post"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  const [language, setLanguage] = useState<Language>('pt')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const t = translations[language]

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
  const [problemsRef, problemsVisible] = useIntersectionObserver<HTMLDivElement>()
  const [journeyRef, journeyVisible] = useIntersectionObserver<HTMLDivElement>()
  const [whyUsRef, whyUsVisible] = useIntersectionObserver<HTMLDivElement>()
  const [casesRef, casesVisible] = useIntersectionObserver<HTMLDivElement>()
  const [contactRef, contactVisible] = useIntersectionObserver<HTMLDivElement>()
  const [pillarsRef, pillarsVisible] = useIntersectionObserver<HTMLDivElement>()

  // Casos de uso organizados por pilar da jornada
  const caseStudies = {
    see: [
      {
        id: "case-1",
        title: "Caso 1 — L'eep SCAN",
        challenge:
          "Uma empresa de tecnologia B2B estava escalando rápido, mas sem clareza sobre onde estavam seus gargalos operacionais e por onde começar a reorganização.",
        solution:
          "Aplicamos o L'eep SCAN para mapear forças, bloqueios e oportunidades de crescimento em cada área — com foco em ambidestralidade.",
        result:
          "A liderança passou a enxergar com clareza o que precisava ser otimizado, o que valia inovar e o que deveria ser simplesmente cortado. A empresa ganhou direção e foco para crescer com consistência.",
      },
      {
        id: "case-2",
        title: "Caso 2 — L'eep RADAR",
        challenge:
          "Uma scale-up do setor financeiro queria expandir sua atuação, mas não sabia se estava se diferenciando o suficiente no mercado.",
        solution:
          "Rodamos o L'eep RADAR com benchmarks nacionais e internacionais + análise de sinais de futuro no setor.",
        result:
          "A empresa ganhou uma leitura clara do contexto, ajustou sua narrativa e reposicionou seus produtos com mais segurança para investidores e clientes.",
      },
      {
        id: "case-3",
        title: "Caso 3 — L'eep CANVAS",
        challenge:
          "Uma organização familiar em processo de sucessão precisava alinhar visão estratégica entre as novas lideranças.",
        solution:
          "Facilitamos uma imersão L'eep CANVAS com sócios, gestores e conselheiros, trabalhando pontos críticos da visão de futuro.",
        result:
          "O grupo saiu com um mapa visual compartilhado, com metas claras e áreas de foco prioritárias — evitando desalinhamentos futuros.",
      },
    ],
    move: [
      {
        id: "case-4",
        title: "Caso 4 — L'eep SPRINT",
        challenge:
          "Uma marca do varejo enfrentava queda nas vendas e queria repensar rapidamente sua proposta de valor digital.",
        solution: "Conduzimos um L'eep SPRINT de 5 dias com áreas de marketing, produto e atendimento.",
        result:
          "A empresa saiu com uma nova abordagem validada com usuários e pronta para teste — além de engajar internamente o time em torno de uma solução.",
      },
      {
        id: "case-5",
        title: "Caso 5 — L'eep MAP",
        challenge:
          "Um hospital privado precisava sair de um ciclo de reatividade e construir um plano estratégico viável para os próximos 2 anos.",
        solution: "Co-criamos um L'eep MAP, organizando as frentes críticas, metas, riscos e governança da execução.",
        result:
          "A diretoria passou a tomar decisões mais conectadas com a estratégia e reduziu o retrabalho em projetos paralelos.",
      },
      {
        id: "case-6",
        title: "Caso 6 — L'eep FLOW",
        challenge: "Uma startup em rodada de Série A enfrentava lentidão e retrabalho no onboarding de novos clientes.",
        solution:
          "Aplicamos o L'eep FLOW redesenhando os fluxos internos com foco em eficiência e experiência do cliente.",
        result:
          "O tempo de ativação caiu 34%, e a operação ganhou escala sem precisar crescer proporcionalmente o time.",
      },
    ],
    grow: [
      {
        id: "case-7",
        title: "Caso 7 — L'eep BOOST",
        challenge:
          "Uma edtech com estratégia definida não conseguia manter ritmo na execução e perdia foco ao longo do trimestre.",
        solution:
          "Entramos com o modelo L'eep BOOST, com check-ins estratégicos quinzenais e apoio na priorização tática.",
        result: "A empresa passou a rodar seus ciclos com mais clareza, foco e velocidade. O backlog virou roadmap.",
      },
      {
        id: "case-8",
        title: "Caso 8 — L'eep CORE",
        challenge:
          "Um grupo empresarial com múltiplos negócios precisava de uma consultoria parceira para decisões recorrentes.",
        solution:
          "Firmamos um modelo L'eep CORE de acompanhamento contínuo, apoiando de forma transversal estratégia e operação.",
        result:
          "A L'eep virou uma extensão do time executivo, garantindo que as frentes se movessem de forma integrada e alinhada à visão de longo prazo.",
      },
      {
        id: "case-9",
        title: "Caso 9 — L'eep COACH",
        challenge:
          "Uma nova liderança de produto queria se preparar para liderar uma squad multidisciplinar em um contexto de incerteza.",
        solution: "Conduzimos um ciclo de L'eep COACH com foco em clareza, tomada de decisão e comunicação com o time.",
        result:
          "A gestora se fortaleceu, ganhou confiança e entregou uma das melhores evoluções de produto do ano — com reconhecimento interno.",
      },
    ],
  }

  // Categorias para o componente de casos de uso
  const caseCategories = [
    {
      id: "see",
      title: t.see,
      icon: <Eye className="h-4 w-4 text-current" />,
      cases: caseStudies.see,
    },
    {
      id: "move",
      title: t.move,
      icon: <Wrench className="h-4 w-4 text-current" />,
      cases: caseStudies.move,
    },
    {
      id: "grow",
      title: t.grow,
      icon: <Zap className="h-4 w-4 text-current" />,
      cases: caseStudies.grow,
    },
  ]

  // Traduções para o componente de casos de uso
  const caseTranslations = {
    challenge: language === "pt" ? "Desafio" : "Challenge",
    solution: language === "pt" ? "Solução" : "Solution",
    result: language === "pt" ? "Resultado" : "Result",
    viewCases: language === "pt" ? "Ver casos" : "View cases",
    nextCase: language === "pt" ? "Próximo" : "Next",
    prevCase: language === "pt" ? "Anterior" : "Previous",
    of: language === "pt" ? "de" : "of",
  }

  // Serviços organizados por pilar da jornada - VERSÃO ATUALIZADA
  const journeyServices = {
    see: [
      {
        name: "L'eep SCAN",
        desc: "Diagnóstico estratégico completo com foco em ambidestralidade.",
        ideal: "Ideal para empresas em transição, reestruturação ou acelerando o crescimento.",
      },
      {
        name: "L'eep RADAR",
        desc: "Mapeamento de tendências, concorrência e sinais fracos.",
        ideal: "Mostra ao cliente que ele precisa olhar para fora com método.",
      },
      {
        name: "L'eep CANVAS",
        desc: "Imersão estratégica com os líderes para gerar alinhamento.",
        ideal: "Facilita a venda e engaja os tomadores de decisão.",
      },
    ],
    move: [
      {
        name: "L'eep SPRINT",
        desc: "Soluções rápidas e profundas em ciclos curtos.",
        ideal: "Excelente porta de entrada. Rápido, tangível e com impacto direto.",
      },
      {
        name: "L'eep MAP",
        desc: "Plano estratégico taylor made.",
        ideal: "Simples de entender e muito valorizado por gestores que se sentem perdidos.",
      },
      {
        name: "L'eep FLOW",
        desc: "Redesenho e melhoria de processos para escalar com eficiência.",
        ideal: "Apelo muito forte para empresas em crescimento desorganizado.",
      },
    ],
    grow: [
      {
        name: "L'eep BOOST",
        desc: "Acompanhamento estratégico recorrente.",
        ideal: "Mantém o cliente ativo por mais tempo com entregas contínuas.",
      },
      {
        name: "L'eep CORE",
        desc: "Parceria de longo prazo com entregas sob demanda.",
        ideal: "Ideal para empresas que querem pensar e executar com suporte.",
      },
      {
        name: "L'eep COACH",
        desc: "Mentoria para lideranças e times estratégicos.",
        ideal: "Humaniza a consultoria e mostra cuidado com o time interno do cliente.",
      },
    ],
  }

  // Títulos e subtítulos da jornada
  const journeyTitles = {
    see: {
      title: language === "pt" ? "VER" : "SEE",
      subtitle: language === "pt" ? "Diagnóstico, direção, visão" : "Diagnosis, direction, vision",
    },
    move: {
      title: language === "pt" ? "MOVER" : "MOVE",
      subtitle: language === "pt" ? "Estratégia aplicada e transformação" : "Applied strategy and transformation",
    },
    grow: {
      title: language === "pt" ? "CRESCER" : "GROW",
      subtitle: language === "pt" ? "Execução, ritmo, aceleração" : "Execution, rhythm, acceleration",
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute("id") || ""

        if (sectionTop < 100) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SiteHeader
        language={language}
        setLanguage={handleLanguageChange}
        activeSection={activeSection}
        isHomePage={true}
        translations={{
          about: t.about,
          problemsTitle: t.problemsTitle,
          contact: t.contact,
          cta: t.cta,
        }}
      />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          className="w-full min-h-[90vh] flex items-center relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para garantir legibilidade do texto */}
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="container px-4 md:px-6 py-20 md:py-32 relative z-10">
            <div
              ref={heroRef}
              className={cn(
                "max-w-3xl mx-auto text-center space-y-8 transition-all duration-1000 transform",
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
                {t.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">{t.heroSubtitle}</p>
              <div className="pt-6">
                <Button
                  className="bg-white hover:bg-white/90 text-teal font-medium text-lg px-8 py-6 group relative overflow-hidden animate-pulse"
                  onClick={() => scrollToSection("contact")}
                >
                  <span className="relative z-10 flex items-center">
                    {t.cta}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-teal opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div
              ref={aboutRef}
              className={cn(
                "max-w-5xl mx-auto space-y-12 transition-all duration-1000",
                aboutVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black">{t.aboutTitle}</h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">{t.aboutText}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mx-auto">
                <div
                  className={cn(
                    "bg-black p-6 rounded-lg border border-gray-800 shadow-sm transition-all duration-500 hover:shadow-md hover:border-teal md:col-span-1 text-center flex flex-col justify-center",
                    aboutVisible ? "animate-slide-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.1s" }}
                >
                  <h3 className="text-2xl font-bold text-teal mb-4">{t.purpose}</h3>
                  <p className="text-white text-xl">{t.purposeText}</p>
                </div>
                <div
                  className={cn(
                    "bg-black p-6 rounded-lg border border-gray-800 shadow-sm transition-all duration-500 hover:shadow-md hover:border-teal md:col-span-1 text-center flex flex-col justify-center",
                    aboutVisible ? "animate-slide-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-2xl font-bold text-teal mb-4">{t.positioning}</h3>
                  <p className="text-white text-xl">{t.positioningText}</p>
                </div>
                <div
                  className={cn(
                    "transition-all duration-500 md:col-span-1",
                    aboutVisible ? "animate-slide-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.3s" }}
                >
                  <FeaturedBlogPost slug="ambidestria-corporativa" language={language} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problems" className="w-full py-20 md:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div
              ref={problemsRef}
              className={cn(
                "max-w-5xl mx-auto space-y-8 transition-all duration-1000",
                problemsVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold">{t.problemsTitle}</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {language === "pt"
                    ? "Transformamos desafios de crescimento em oportunidades concretas."
                    : "We transform growth challenges into concrete opportunities."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div
                  className={cn(
                    "bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all duration-500 transform hover:border-teal",
                    problemsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-6 mx-auto">
                    <ArrowDown className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">{t.problem1}</h3>
                  <p className="text-gray-400 text-center">
                    {language === "pt"
                      ? "Quando a empresa cresce, mas sem um plano claro e consistente."
                      : "When the company grows, but without a clear and consistent plan."}
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className={cn(
                    "bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all duration-500 transform hover:border-teal",
                    problemsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.2s" }}
                >
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-6 mx-auto">
                    <BarChart2 className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">{t.problem2}</h3>
                  <p className="text-gray-400 text-center">
                    {language === "pt"
                      ? "Áreas que operam em silos, sem visão compartilhada de onde chegar."
                      : "Areas operating in silos, without a shared vision of where to go."}
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  className={cn(
                    "bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all duration-500 transform hover:border-teal",
                    problemsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.3s" }}
                >
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Beaker className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">
                    {language === "pt" ? "Inovação sem consistência" : "Innovation without consistency"}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {language === "pt"
                      ? "Decisões que mudam toda semana, sem ritmo ou priorização."
                      : "Decisions that change every week, without rhythm or prioritization."}
                  </p>
                </div>

                {/* Card 4 */}
                <div
                  className={cn(
                    "bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all duration-500 transform hover:border-teal",
                    problemsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.4s" }}
                >
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mb-6 mx-auto">
                    <TrendingUp className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">
                    {language === "pt" ? "Crescimento desordenado" : "Disorganized growth"}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {language === "pt"
                      ? "Quando expandir vira apagar incêndio, e não construir futuro."
                      : "When expanding becomes firefighting, not building the future."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section (Redesenhada) */}
        <section id="journey" className="w-full py-20 md:py-32 bg-white text-black">
          <div className="container px-4 md:px-6">
            <div
              ref={journeyRef}
              className={cn(
                "max-w-6xl mx-auto space-y-12 transition-all duration-1000",
                journeyVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black">{t.journeyTitle}</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  {language === "pt"
                    ? "Nossa abordagem estratégica integra diagnóstico, execução e acompanhamento para resultados sustentáveis."
                    : "Our strategic approach integrates diagnosis, execution and monitoring for sustainable results."}
                </p>
              </div>

              {/* Pilares da jornada em fluxo horizontal - REDESENHADO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* VER */}
                <div
                  className={cn(
                    "transition-all duration-500 transform bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 hover:border-teal",
                    journeyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <div className="bg-black text-white p-4 flex items-center space-x-3">
                    <Search className="h-6 w-6 text-teal" />
                    <div>
                      <h3 className="font-bold text-xl">{journeyTitles.see.title}</h3>
                      <p className="text-gray-300 text-sm">{journeyTitles.see.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {journeyServices.see.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:border-teal transition-all duration-300"
                      >
                        <h4 className="font-bold text-teal mb-2">{service.name}</h4>
                        <p className="text-gray-700 text-sm mb-2">{service.desc}</p>
                        <p className="text-gray-500 text-xs italic">{service.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MOVER */}
                <div
                  className={cn(
                    "transition-all duration-500 transform bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 hover:border-teal",
                    journeyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.3s" }}
                >
                  <div className="bg-black text-white p-4 flex items-center space-x-3">
                    <Tool className="h-6 w-6 text-teal" />
                    <div>
                      <h3 className="font-bold text-xl">{journeyTitles.move.title}</h3>
                      <p className="text-gray-300 text-sm">{journeyTitles.move.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {journeyServices.move.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:border-teal transition-all duration-300"
                      >
                        <h4 className="font-bold text-teal mb-2">{service.name}</h4>
                        <p className="text-gray-700 text-sm mb-2">{service.desc}</p>
                        <p className="text-gray-500 text-xs italic">{service.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CRESCER */}
                <div
                  className={cn(
                    "transition-all duration-500 transform bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 hover:border-teal",
                    journeyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.5s" }}
                >
                  <div className="bg-black text-white p-4 flex items-center space-x-3">
                    <Rocket className="h-6 w-6 text-teal" />
                    <div>
                      <h3 className="font-bold text-xl">{journeyTitles.grow.title}</h3>
                      <p className="text-gray-300 text-sm">{journeyTitles.grow.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {journeyServices.grow.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:border-teal transition-all duration-300"
                      >
                        <h4 className="font-bold text-teal mb-2">{service.name}</h4>
                        <p className="text-gray-700 text-sm mb-2">{service.desc}</p>
                        <p className="text-gray-500 text-xs italic">{service.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us + Cases Section (Unified) */}
        <section id="why-us" className="w-full py-20 md:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div
              ref={whyUsRef}
              className={cn(
                "max-w-5xl mx-auto space-y-16 transition-all duration-1000",
                whyUsVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">{t.whyUsTitle}</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {language === "pt"
                    ? "Combinamos estratégia sob medida com execução ágil para resultados reais."
                    : "We combine tailor-made strategy with agile execution for real results."}
                </p>
              </div>

              {/* Why Us Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* First Card - Sob medida */}
                <div
                  className={cn(
                    "bg-[#6CC5D3] p-8 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-md flex flex-col items-center h-full",
                    whyUsVisible ? "animate-slide-up" : "opacity-0 translate-y-10",
                  )}
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="w-16 h-16 bg-black rounded-full mb-5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4 text-center">Sob medida</h3>
                  <p className="text-black text-center">
                    Estratégias personalizadas para cada desafio único
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className={cn(
                    "bg-teal border border-teal/30 rounded-lg p-6 transition-all duration-500 transform hover:shadow-md hover:shadow-teal/20",
                    whyUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.3s" }}
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 11l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{t.whyUsText2}</h3>
                  <p className="text-gray-800 text-center">
                    {language === "pt"
                      ? "Equilibramos eficiência operacional e inovação"
                      : "We balance operational efficiency and innovation"}
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  className={cn(
                    "bg-teal border border-teal/30 rounded-lg p-6 transition-all duration-500 transform hover:shadow-md hover:shadow-teal/20",
                    whyUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.5s" }}
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-white"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{t.whyUsText3}</h3>
                  <p className="text-gray-800 text-center">
                    {language === "pt"
                      ? "Processos flexíveis e adaptáveis às necessidades do cliente"
                      : "Flexible processes adaptable to client needs"}
                  </p>
                </div>
              </div>

              {/* Cases Section */}
              <div className="pt-16">
                {/* Grid com imagem à esquerda e casos à direita */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Imagem ilustrativa à esquerda */}
                  <div
                    className={cn(
                      "transition-all duration-500 transform rounded-lg overflow-hidden border border-gray-800 h-full flex",
                      whyUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    )}
                    style={{ transitionDelay: "0.5s" }}
                  >
                    <div className="relative w-full bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col justify-center">
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#6CC5D3" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                      </div>
                      <div className="relative z-10 space-y-6 flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 bg-teal rounded-full flex items-center justify-center mb-6 animate-float">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                          >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-center text-white">
                          {language === "pt" ? "Casos de Uso" : "Use Cases"}
                        </h3>

                        <p className="text-gray-300 text-center max-w-xs mx-auto">
                          {language === "pt"
                            ? "Transformamos desafios em oportunidades com estratégias sob medida para cada cliente."
                            : "We transform challenges into opportunities with tailor-made strategies for each client."}
                        </p>
                        <div className="flex justify-center pt-4 mt-auto">
                          <div className="w-16 h-1 bg-teal rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Componente de casos de uso reduzido */}
                  <div
                    className={cn(
                      "transition-all duration-500 transform h-full flex",
                      whyUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    )}
                    style={{ transitionDelay: "0.7s" }}
                  >
                    <CaseStudies categories={caseCategories} translations={caseTranslations} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar Section */}
        <section id="pillars" className="w-full py-20 md:py-32 bg-cream">
          <div className="container px-4 md:px-6">
            <div 
              ref={pillarsRef}
              className={cn(
                "max-w-5xl mx-auto space-y-12 transition-all duration-1000",
                pillarsVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-black">L'eep Co.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                {/* Sob medida */}
                <div
                  className={cn(
                    "bg-[#6CC5D3] p-8 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-md flex flex-col items-center h-full",
                    pillarsVisible ? "animate-slide-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="w-16 h-16 bg-black rounded-full mb-5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4 text-center">Sob medida</h3>
                  <p className="text-black text-center">
                    Estratégias personalizadas para cada desafio único
                  </p>
                </div>
                
                {/* L'Brief */}
                <div
                  className={cn(
                    "bg-[#6CC5D3] p-8 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-md flex flex-col items-center h-full",
                    pillarsVisible ? "animate-slide-up" : "opacity-0",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-16 h-16 bg-black rounded-full mb-5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4 text-center">L' Brief</h3>
                  <p className="text-black text-center">
                    Planejamento criativo estratégico para agências e empresas que buscam ideias inovadoras e eficazes.
                  </p>
                </div>
              </div>
              
              {/* L'On - Full Width */}
              <div
                className={cn(
                  "bg-[#6CC5D3] p-8 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-md flex flex-col items-center h-full",
                  pillarsVisible ? "animate-slide-up" : "opacity-0",
                )}
                style={{ animationDelay: "0.3s" }}
              >
                <div className="w-16 h-16 bg-black rounded-full mb-5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 text-center">L' On</h3>
                <p className="text-black text-center">
                  Criação e operação contínua de estratégias de marketing digital para um crescimento consistente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 md:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div
              ref={contactRef}
              className={cn(
                "max-w-4xl mx-auto space-y-12 transition-all duration-1000",
                contactVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">{t.contactTitle}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <ContactForm
                    translations={{
                      name: t.name,
                      email: t.email,
                      company: t.company,
                      message: t.message,
                      send: t.send,
                      success: t.success,
                      error: t.error,
                    }}
                  />
                </div>

                <div
                  className={cn(
                    "space-y-6 transition-all duration-500 transform",
                    contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: "0.3s" }}
                >
                  <div>
                    <h3 className="text-xl font-bold mb-4">L'eep Co.</h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 mr-2 text-teal"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>+55 (11) 94153-2111</span>
                        <Link
                          href="https://wa.me/5511941532111"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-teal hover:text-teal/80 transition-colors duration-300 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                            <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                          </svg>
                          <span className="ml-1">{language === "pt" ? "WhatsApp" : "WhatsApp"}</span>
                        </Link>
                      </p>
                      <p className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 mr-2 text-teal"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span>abdo@leepco.com.br</span>
                      </p>
                      <p className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 mr-2 text-teal"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>São Paulo, SP - Brasil</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4">{language === "pt" ? "Siga-nos" : "Follow us"}</h3>
                    <div className="flex gap-4">
                      <Link
                        href="https://www.linkedin.com/company/leep-co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-teal p-2 text-teal hover:bg-teal/10 transition-colors duration-300 hover:animate-pulse"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                      <Link
                        href="https://www.instagram.com/leepconsulting"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-teal p-2 text-teal hover:bg-teal/10 transition-colors duration-300 hover:animate-pulse"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link
                        href="https://wa.me/5511941532111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded-md hover:bg-[#128C7E] transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                        </svg>
                        {language === "pt" ? "Fale conosco no WhatsApp" : "Chat with us on WhatsApp"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
          <LanguageSwitcher onLanguageChange={handleLanguageChange} currentLanguage={language} />
        </div>
      </footer>
    </div>
  )
}

