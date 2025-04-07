import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Substitua a linha do projectId pelo ID que você obteve no dashboard do Sanity
export const client = createClient({
  projectId: "cbpirxle", // Novo ID do projeto que você acabou de criar
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false, // Disable CDN to avoid API CDN URL issues
  // Add client configuration for better error handling
  token: process.env.SANITY_API_TOKEN,
  stega: {
    enabled: false,
  },
  perspective: 'published',
})

// Configuração para URLs de imagem
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Função para buscar posts do blog com campos otimizados para SEO
export async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "categories": categories[]->title,
    "author": author->name,
    "authorImage": author->image
  }`)
}

// Função para buscar apenas os slugs dos posts para debugging
export async function getAllPostSlugs() {
  return client.fetch(`*[_type == "post"] {
    title,
    "slug": slug.current
  }`)
}

// Função para buscar um post específico com campos otimizados para SEO
export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "categories": categories[]->title,
      "author": author->name,
      "authorImage": author->image
    }`,
    { slug },
  )
}

// Função para buscar categorias
export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }`)
}

// Função para buscar posts por categoria
export async function getPostsByCategory(categoryId: string) {
  return client.fetch(
    `*[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "categories": categories[]->title,
      "author": author->name
    }`,
    { categoryId },
  )
}

