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
import { BlogSidebar } from "@/components/blog-sidebar"

// Create a fallback post for the ambidestria-corporativa when API call fails
const fallbackAmbidestriaPost = {
  _id: "fallback-ambidestria",
  title: "Ambidestria Corporativa",
  slug: { current: "ambidestria-corporativa" },
  mainImage: null,
  publishedAt: "2023-09-15",
  estimatedReadingTime: 7,
  author: "L'eep Growth",
  categories: ["Estratégia", "Inovação"],
  excerpt: "Como empresas podem equilibrar exploração e explotação para inovação e otimização simultâneas.",
  // Simplified body structure for PortableText to render
  body: [
    {
      _type: "block",
      style: "normal",
      _key: "intro",
      children: [
        {
          _type: "span",
          marks: [],
          text: "A ambidestria corporativa é a capacidade de uma organização de equilibrar duas atividades aparentemente contraditórias: exploração (busca por novas oportunidades) e explotação (otimização do existente). Empresas ambidestras conseguem inovar para o futuro enquanto otimizam seus negócios atuais.",
          _key: "intro-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "h2",
      _key: "subtitle1",
      children: [
        {
          _type: "span",
          marks: [],
          text: "Por que a ambidestria é importante?",
          _key: "subtitle1-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "normal",
      _key: "paragraph1",
      children: [
        {
          _type: "span",
          marks: [],
          text: "No ambiente de negócios atual, caracterizado por mudanças rápidas e disrupção constante, as empresas enfrentam um dilema fundamental: focar na eficiência e otimização das operações existentes ou investir em inovação e novas oportunidades. A ambidestria permite que as organizações façam ambos.",
          _key: "para1-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "h2",
      _key: "subtitle2",
      children: [
        {
          _type: "span",
          marks: [],
          text: "Os dois lados da ambidestria",
          _key: "subtitle2-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "normal",
      _key: "paragraph2",
      children: [
        {
          _type: "span",
          marks: [],
          text: "Explotação refere-se à melhoria e otimização de produtos, processos e negócios existentes. Envolve eficiência, implementação, execução e refinamento. Exploração, por outro lado, envolve a busca por novas oportunidades, experimentação, descoberta e inovação.",
          _key: "para2-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "h2",
      _key: "subtitle3",
      children: [
        {
          _type: "span",
          marks: [],
          text: "Como desenvolver a ambidestria organizacional",
          _key: "subtitle3-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "normal",
      _key: "paragraph3",
      children: [
        {
          _type: "span",
          marks: [],
          text: "Existem diferentes abordagens para desenvolver a ambidestria, incluindo:",
          _key: "para3-intro-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "bullet",
      _key: "list-item1",
      level: 1,
      children: [
        {
          _type: "span",
          marks: [],
          text: "Ambidestria estrutural: criar unidades organizacionais separadas para atividades de exploração e explotação",
          _key: "item1-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "bullet",
      _key: "list-item2",
      level: 1,
      children: [
        {
          _type: "span",
          marks: [],
          text: "Ambidestria contextual: capacitar indivíduos a decidir como dividir seu tempo entre atividades de exploração e explotação",
          _key: "item2-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "bullet",
      _key: "list-item3",
      level: 1,
      children: [
        {
          _type: "span",
          marks: [],
          text: "Ambidestria de liderança: líderes que modelam comportamentos ambidestros e criam uma cultura que valoriza tanto a exploração quanto a explotação",
          _key: "item3-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "h2",
      _key: "conclusion-title",
      children: [
        {
          _type: "span",
          marks: [],
          text: "O papel da L'eep Growth na ambidestria corporativa",
          _key: "conclusion-title-text"
        }
      ],
      markDefs: []
    },
    {
      _type: "block",
      style: "normal",
      _key: "conclusion",
      children: [
        {
          _type: "span",
          marks: [],
          text: "A L'eep Growth ajuda organizações a desenvolverem capacidades ambidestras, criando estratégias que equilibram a otimização das operações atuais com investimentos em inovação e novas oportunidades. Nossa abordagem ambidestra de consultoria é projetada para ajudar empresas a alcançarem um crescimento sustentável em ambientes de negócios em constante mudança.",
          _key: "conclusion-text"
        }
      ],
      markDefs: []
    }
  ]
};

export const revalidate = 3600 // Revalidar a cada hora

// Gerar metadados dinâmicos para cada post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Ensure params is fully resolved before using its properties
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  try {
    // Try to get the post from Sanity
    let post = await getPost(slug);
    
    // If fetching fails for ambidestria post, use the fallback
    if (!post && slug === "ambidestria-corporativa") {
      post = fallbackAmbidestriaPost;
    }
    
    // If still no post, return basic metadata
    if (!post) {
      return {
        title: "Post não encontrado | L'eep Co.",
        description: "O artigo que você procura não está disponível."
      };
    }
    
    // URL base do site - use uma URL absoluta e fixa para garantir
    const siteUrl = "https://leepco.com.br";
    const postUrl = `${siteUrl}/blog/${slug}`;

    // Use uma imagem estática para garantir que funcione
    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).format("jpg").quality(80).url()
      : `${siteUrl}/images/blog-share-image.jpg`;
    
    // Extrair categorias para keywords
    const keywords = post.categories
      ? `${post.categories.join(", ")}, consultoria estratégica, L'eep Co.`
      : "consultoria estratégica, estratégia empresarial, inovação, L'eep Co.";

    // Schema.org JSON-LD
    const jsonLd = {
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
    };

    return {
      title: post.title,
      description: post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
      keywords: keywords,
      authors: [{ name: post.author || "L'eep Co." }],
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
            type: "image/jpeg",
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
      robots: {
        index: true,
        follow: true,
      },
      other: {
        "linkedin:card": "summary_large_image",
        "linkedin:title": post.title,
        "linkedin:description": post.excerpt || `Artigo por ${post.author || "L'eep Co."}`,
        "linkedin:image": imageUrl,
        "article:published_time": post.publishedAt,
        // JSON-LD data
        "script:ld+json": JSON.stringify(jsonLd),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "L'eep Co. | Blog",
      description: "Artigos sobre estratégia, inovação e crescimento."
    };
  }
}

// No componente BlogPostPage, adicione:
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Ensure params is fully resolved before using its properties
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  // Try to get the post from API
  let post = await getPost(slug);
  
  // Handle fallback for a specific post
  if (!post && slug === "ambidestria-corporativa") {
    post = fallbackAmbidestriaPost;
  }
  
  // If still no post, handle 404
  if (!post) {
    notFound();
  }
  
  // Get all posts for related posts section
  const allPosts = await getPosts();
  
  // URL base do site
  const siteUrl = "https://leepco.com.br";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return renderBlogPost(post, allPosts, postUrl);
}

// Helper function to render the blog post
function renderBlogPost(post: any, allPosts: any[], postUrl: string) {
  return (
    <>
      <div className="container px-4 md:px-6 pt-8 pb-20 md:pt-12 md:pb-32">
        <div className="max-w-[1200px] mx-auto relative block lg:flex lg:flex-row lg:items-start">
          {/* Main column - Article */}
          <div className="w-full lg:pr-[450px]">
            <div className="space-y-8">
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

                <div className="prose prose-invert prose-lg max-w-none" itemProp="articleBody">
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

              {/* Related Posts */}
              {allPosts?.length > 0 && (
                <RelatedPosts posts={allPosts} currentPostId={post._id} />
              )}
            </div>
          </div>

          {/* Right sidebar - Absolutely positioned on desktop */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:w-[400px]">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </>
  )
}

