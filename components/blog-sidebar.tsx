"use client"

import { BlogNewsletterForm } from "@/components/blog-newsletter-form"

export function BlogSidebar() {
  return (
    <div className="sticky top-8 p-8 bg-[#121A24] border border-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-6 text-white">
        Receba nossos estudos e análises em seu email
      </h3>
      <BlogNewsletterForm 
        translations={{
          name: "Nome",
          email: "Email",
          company: "Empresa",
          subscribe: "Inscreva-se",
          success: "Inscrição realizada com sucesso!",
          error: "Erro"
        }}
      />
    </div>
  )
} 