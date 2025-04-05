"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface BlogNewsletterFormProps {
  translations: {
    name: string
    email: string
    company: string
    subscribe: string
    success: string
    error: string
  }
}

export function BlogNewsletterForm({ translations }: BlogNewsletterFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) {
      toast({
        title: translations.error,
        description: "Por favor, insira seu email.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      toast({
        title: translations.success,
        description: "Você foi inscrito com sucesso!",
      })

      setFormData({
        name: "",
        email: "",
        company: "",
      })
    } catch (error) {
      toast({
        title: translations.error,
        description: "Ocorreu um erro ao tentar inscrever você. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          {translations.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
          placeholder={translations.name}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          {translations.email} *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
          placeholder={translations.email}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="company" className="block text-sm font-medium text-gray-300">
          {translations.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent"
          placeholder={translations.company}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-md transition-colors duration-200 mt-2"
      >
        {isSubmitting ? "Enviando..." : translations.subscribe}
      </button>
    </form>
  )
} 