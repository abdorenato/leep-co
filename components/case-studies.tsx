"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CaseStudy = {
  id: string
  title: string
  challenge: string
  solution: string
  result: string
}

type CaseStudiesProps = {
  categories: {
    id: string
    title: string
    icon: React.ReactNode
    cases: CaseStudy[]
  }[]
  translations: {
    challenge: string
    solution: string
    result: string
    viewCases: string
    nextCase: string
    prevCase: string
    of: string
  }
}

export function CaseStudies({ categories, translations }: CaseStudiesProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [activeCaseIndex, setActiveCaseIndex] = useState(0)

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0]
  const currentCase = currentCategory.cases[activeCaseIndex]
  const totalCases = currentCategory.cases.length

  const handlePrevCase = () => {
    setActiveCaseIndex((prev) => (prev > 0 ? prev - 1 : totalCases - 1))
  }

  const handleNextCase = () => {
    setActiveCaseIndex((prev) => (prev < totalCases - 1 ? prev + 1 : 0))
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Card do caso atual com botões integrados no topo */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-teal/10 flex flex-col flex-grow h-full">
        {/* Tabs para categorias integradas no topo da caixa */}
        <div className="bg-gray-800 p-3 flex flex-col space-y-3">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full border transition-all",
                  activeCategory === category.id
                    ? "bg-teal text-black border-teal"
                    : "bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-gray-500",
                )}
                onClick={() => {
                  setActiveCategory(category.id)
                  setActiveCaseIndex(0)
                }}
              >
                <span className="flex items-center justify-center">{category.icon}</span>
                <span>{category.title}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{currentCase.title}</h3>
            <div className="text-xs text-gray-400">
              {activeCaseIndex + 1} {translations.of} {totalCases}
            </div>
          </div>
        </div>

        {/* Conteúdo do caso com altura fixa */}
        <div className="p-4 space-y-3 flex-grow overflow-y-auto min-h-[350px]">
          <div>
            <h4 className="text-teal font-semibold text-sm mb-1">{translations.challenge}</h4>
            <p className="text-gray-300 text-sm">{currentCase.challenge}</p>
          </div>

          <div>
            <h4 className="text-teal font-semibold text-sm mb-1">{translations.solution}</h4>
            <p className="text-gray-300 text-sm">{currentCase.solution}</p>
          </div>

          <div>
            <h4 className="text-teal font-semibold text-sm mb-1">{translations.result}</h4>
            <p className="text-gray-300 text-sm">{currentCase.result}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-2 flex items-center justify-between mt-auto">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white text-xs py-1 h-8"
            onClick={handlePrevCase}
          >
            <ChevronLeft className="h-3 w-3 mr-1" />
            {translations.prevCase}
          </Button>

          <div className="flex justify-center gap-1">
            {currentCategory.cases.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === activeCaseIndex ? "bg-teal w-3" : "bg-gray-700 hover:bg-gray-600",
                )}
                onClick={() => setActiveCaseIndex(index)}
                aria-label={`Go to case ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white text-xs py-1 h-8"
            onClick={handleNextCase}
          >
            {translations.nextCase}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

