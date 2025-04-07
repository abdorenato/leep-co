import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-teal hover:bg-teal/90 text-black font-medium">
          <Link href="/home">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  )
} 