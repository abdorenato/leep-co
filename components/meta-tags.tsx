import type { Metadata } from "next"

interface MetaTagsProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  type?: string
  publishedTime?: string
  author?: string
}

export function generateMetadata({
  title,
  description,
  url,
  imageUrl,
  type = "article",
  publishedTime,
  author,
}: MetaTagsProps): Metadata {
  // Título base para o site
  const siteTitle = "L'eep Co. | Consultoria Ambidestra"

  // Título completo para a página
  const fullTitle = `${title} | ${siteTitle}`

  // Imagem padrão caso não seja fornecida
  const defaultImage = `${process.env.NEXT_PUBLIC_SITE_URL || "https://leepco.com.br"}/images/logo_leepco_branco_gd.png`

  // Imagem final a ser usada
  const finalImageUrl = imageUrl || defaultImage

  return {
    title: title,
    description: description,
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: siteTitle,
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: [finalImageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

