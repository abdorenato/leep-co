import { getPosts } from "@/lib/sanity"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obter todos os posts do blog
  const posts = await getPosts()

  // URL base do site
  const baseUrl = "https://leepco.com.br"

  // Páginas estáticas do site
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  // Gerar entradas para cada post do blog
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages]
}

