'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen px-4 bg-background">
          <div className="max-w-md text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Erro Crítico</h2>
            <p className="text-gray-400 mb-8">
              Ocorreu um erro grave no aplicativo. Nossa equipe foi notificada e está trabalhando para resolver o problema.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <Button
                onClick={() => reset()}
                className="bg-teal hover:bg-teal/90 text-black font-medium"
              >
                Tentar Novamente
              </Button>
              <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal/10">
                <Link href="/home">Voltar para o início</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 