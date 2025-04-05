"use client"

import { useState } from "react"
import { Facebook, Linkedin, Link2, Share2, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface SharePostProps {
  title: string
  url: string
  excerpt?: string
}

export function SharePost({ title, url, excerpt = "" }: SharePostProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Garantir que a URL seja absoluta
  const ensureAbsoluteUrl = (url: string) => {
    if (url.startsWith("http")) return url
    return `https://leepco.com.br${url.startsWith("/") ? "" : "/"}${url}`
  }

  const absoluteUrl = ensureAbsoluteUrl(url)

  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(absoluteUrl)}`,
          "_blank",
        )
      },
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}`, "_blank")
      },
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl)}`, "_blank")
      },
    },
    {
      name: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${absoluteUrl}`)}`, "_blank")
      },
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      action: () => {
        const subject = encodeURIComponent(title)
        const body = encodeURIComponent(`${title}\n\n${excerpt ? excerpt + "\n\n" : ""}Leia mais: ${absoluteUrl}`)
        window.open(`mailto:?subject=${subject}&body=${body}`, "_blank")
      },
    },
    {
      name: "Copiar Link",
      icon: <Link2 className="h-4 w-4" />,
      action: () => {
        navigator.clipboard.writeText(absoluteUrl).then(() => {
          toast({
            title: "Link copiado!",
            description: "O link do post foi copiado para a área de transferência.",
          })
        })
      },
    },
  ]

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-teal hover:border-teal"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </Button>

        <div
          className={`flex gap-1 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        >
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              size="icon"
              className="h-8 w-8 border-gray-700 text-gray-300 hover:text-teal hover:border-teal"
              onClick={option.action}
              title={option.name}
            >
              {option.icon}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

