"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  translations: {
    name: string
    email: string
    company: string
    message: string
    send: string
    success: string
    error: string
  }
}

export function ContactForm({ translations }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: translations.error,
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: translations.success,
          description: "Sua mensagem foi enviada com sucesso!",
        })

        // Limpar o formulário
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        })
      } else {
        throw new Error(data.error || "Erro ao enviar mensagem")
      }
    } catch (error) {
      toast({
        title: translations.error,
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar sua mensagem.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          {translations.name} *
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 focus:border-teal"
          placeholder={translations.name}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          {translations.email} *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 focus:border-teal"
          placeholder={translations.email}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          {translations.company}
        </label>
        <input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 focus:border-teal"
          placeholder={translations.company}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          {translations.message} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="flex min-h-[120px] w-full rounded-md border border-gray-800 bg-black px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 focus:border-teal"
          placeholder={translations.message}
          required
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal hover:bg-teal/90 text-black font-medium group relative overflow-hidden animate-glow"
      >
        <span className="relative z-10">{isSubmitting ? "Enviando..." : translations.send}</span>
        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      </Button>
    </form>
  )
}

