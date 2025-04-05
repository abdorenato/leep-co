import Link from "next/link"
import Image from "next/image"
import { getPosts, urlFor } from "@/lib/sanity"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidar a cada hora

export const metadata: Metadata = {
  title: "L'eep Notes | Blog da L'eep Co.",
  description:
    "Insights estratégicos para impulsionar seu próximo salto. Artigos sobre estratégia, inovação e crescimento empresarial.",
  openGraph: {
    title: "L'eep Notes | Blog da L'eep Co.",
    description:
      "Insights estratégicos para impulsionar seu próximo salto. Artigos sobre estratégia, inovação e crescimento empresarial.",
    url: "https://leepco.com.br/blog",
    siteName: "L'eep Co. | Consultoria Ambidestra",
    images: [
      {
        url: "https://leepco.com.br/images/blog-share-image.jpg",
        width: 1200,
        height: 630,
        alt: "L'eep Notes",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'eep Notes | Blog da L'eep Co.",
    description:
      "Insights estratégicos para impulsionar seu próximo salto. Artigos sobre estratégia, inovação e crescimento empresarial.",
    images: ["https://leepco.com.br/images/blog-share-image.jpg"],
  },
  alternates: {
    canonical: "https://leepco.com.br/blog",
  },
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <head>
        {/* Meta tags específicas para LinkedIn */}
        <meta property="og:image" content="https://leepco.com.br/images/blog-share-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:description"
          content="Insights estratégicos para impulsionar seu próximo salto. Artigos sobre estratégia, inovação e crescimento empresarial."
        />
        <meta property="og:title" content="L'eep Notes | Blog da L'eep Co." />
        <meta property="og:url" content="https://leepco.com.br/blog" />
        <meta property="og:type" content="website" />

        {/* Meta tags adicionais para SEO */}
        <link rel="alternate" hreflang="pt-BR" href="https://leepco.com.br/blog" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="L'eep Co." />
        <meta
          name="keywords"
          content="consultoria estratégica, estratégia empresarial, inovação, crescimento, ambidestralidade, L'eep Co."
        />
      </head>

      <section className="w-full pt-8 pb-20 md:pt-12 md:pb-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <header className="space-y-4 text-center">
              {/* Mantemos apenas um H1 por página - para o título principal */}
              <h1 className="text-3xl md:text-5xl font-bold">L'eep Notes</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Insights estratégicos para impulsionar seu próximo salto
              </p>
            </header>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-teal hover:shadow-md hover:shadow-teal/10"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.mainImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center text-xs text-gray-400 space-x-2">
                          <time dateTime={new Date(post.publishedAt).toISOString()}>
                            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                          {post.categories && post.categories.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{post.categories.join(", ")}</span>
                            </>
                          )}
                        </div>
                        {/* Usamos H2 para os títulos dos posts na listagem */}
                        <h2 className="text-xl font-bold text-white">{post.title}</h2>
                        {post.excerpt && <p className="text-gray-400">{post.excerpt}</p>}
                        <div className="pt-3">
                          <span className="text-teal text-sm font-medium">Ler mais →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <h2 className="text-xl font-medium text-gray-300">Nenhum post encontrado</h2>
                <p className="text-gray-400 mt-2">
                  Os posts aparecerão aqui assim que forem publicados no Sanity Studio.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

