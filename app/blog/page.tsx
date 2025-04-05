import Link from "next/link"
import Image from "next/image"
import { getPosts, urlFor } from "@/lib/sanity"
import type { Metadata } from "next"
import { BlogSidebar } from "@/components/blog-sidebar"

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

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt: string
  categories?: string[]
  excerpt?: string
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  return (
    <>
      <section className="w-full min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <header className="mb-24 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">L'eep Notes</h1>
            <p className="text-xl text-gray-300">
              Insights estratégicos para impulsionar seu próximo salto
            </p>
          </header>

          {/* Two column layout with explicit right sidebar */}
          <div className="max-w-[1200px] mx-auto relative block lg:flex lg:flex-row lg:items-start">
            {/* Main column - Posts */}
            <div className="w-full lg:pr-[450px]">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  {posts.map((post: Post) => (
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

            {/* Right sidebar - Absolutely positioned on desktop */}
            <div className="mt-12 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:w-[400px]">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

