import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, urlFor } from "@/lib/sanity"
import { PortableText } from "@/components/portable-text"
import { SharePost } from "@/components/share-post"
import type { Metadata } from "next"
// Adicione esta importação no topo do arquivo
import { RelatedPosts } from "@/components/related-posts"
import { getPosts } from "@/lib/sanity"

export const revalidate = 3600 // Revalidar a cada hora

// Gerar metadados dinâmicos para cada post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não foi encontrado.",
    }
  }

  // URL base do site - use uma URL absoluta e fixa para garantir
  const siteUrl = "https://leepco.com.br"
  const postUrl = `${siteUrl}/blog/${params.slug}`

  // Use uma imagem estática para garantir que funcione
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).format("jpg").quality(80).url()
    : `${siteUrl}/images/blog-share-image.jpg`

  return {
    title: post.title,
    description: post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
      url: postUrl,
      siteName: "L'eep Co. | Consultoria Ambidestra",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "pt_BR",
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

// No componente BlogPostPage, adicione:
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Buscar todos os posts para mostrar posts relacionados
  const allPosts = await getPosts()

  // URL fixa para compartilhamento
  const siteUrl = "https://leepco.com.br"
  const postUrl = `${siteUrl}/blog/${params.slug}`

  // Extrair categorias para keywords
  const keywords = post.categories
    ? `${post.categories.join(", ")}, consultoria estratégica, L'eep Co.`
    : "consultoria estratégica, estratégia empresarial, inovação, L'eep Co."

  return (
    <>
      <head>
        {/* Meta tags específicas para LinkedIn */}
        <meta
          property="og:image"
          content={
            post.mainImage
              ? urlFor(post.mainImage).width(1200).height(630).format("jpg").quality(80).url()
              : `${siteUrl}/images/blog-share-image.jpg`
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:description" content={post.excerpt || `Artigo por ${post.author || "L'eep Co."}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />

        {/* Meta tags específicas para o LinkedIn */}
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content={post.title} />
        <meta name="linkedin:description" content={post.excerpt || `Artigo por ${post.author || "L'eep Co."}`} />
        <meta
          name="linkedin:image"
          content={
            post.mainImage
              ? urlFor(post.mainImage).width(1200).height(630).format("jpg").quality(80).url()
              : `${siteUrl}/images/blog-share-image.jpg`
          }
        />

        {/* Meta tags adicionais para SEO */}
        <link rel="alternate" hreflang="pt-BR" href={postUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={post.author || "L'eep Co."} />
        <meta name="keywords" content={keywords} />
        <meta name="article:published_time" content={post.publishedAt} />

        {/* Schema.org markup para artigos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              image: post.mainImage
                ? urlFor(post.mainImage).width(1200).height(630).url()
                : `${siteUrl}/images/blog-share-image.jpg`,
              datePublished: post.publishedAt,
              author: {
                "@type": "Person",
                name: post.author || "L'eep Co.",
              },
              publisher: {
                "@type": "Organization",
                name: "L'eep Co.",
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}/images/logo_leepco_branco_gd.png`,
                },
              },
              description: post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": postUrl,
              },
            }),
          }}
        />
      </head>

      <div className="container px-4 md:px-6 pt-8 pb-20 md:pt-12 md:pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-teal hover:underline flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Voltar para o blog
            </Link>

            <SharePost title={post.title} url={postUrl} excerpt={post.excerpt} />
          </div>

          <article className="space-y-8" itemScope itemType="https://schema.org/BlogPosting">
            <header className="space-y-4">
              {/* Apenas um H1 por página - para o título do post */}
              <h1 className="text-3xl md:text-4xl font-bold" itemProp="headline">
                {post.title}
              </h1>

              <div className="flex items-center space-x-4">
                {post.authorImage && (
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.authorImage).url() || "/placeholder.svg"}
                      alt={post.author || "Autor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-medium" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{post.author}</span>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <time dateTime={post.publishedAt} itemProp="datePublished">
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.estimatedReadingTime || 5} min de leitura</span>
                  </div>
                </div>
              </div>
            </header>

            {post.mainImage && (
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  itemProp="image"
                />
              </div>
            )}

            <div className="prose prose-invert max-w-none" itemProp="articleBody">
              <PortableText value={post.body} />
            </div>

            <footer className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6 border-t border-gray-800">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: string) => (
                    <span key={category} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <SharePost title={post.title} url={postUrl} excerpt={post.excerpt} />
            </footer>
          </article>

          {/* Adicionar posts relacionados */}
          <RelatedPosts posts={allPosts} currentPostId={post._id} />
        </div>
      </div>
    </>
  )
}

