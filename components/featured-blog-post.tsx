"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getPost, urlFor } from "@/lib/sanity"
import type { Language } from "@/lib/translations"

// Define the post type to match what we're using
interface Post {
  _id?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  estimatedReadingTime?: number;
  author?: string;
  body?: any;
}

interface FeaturedBlogPostProps {
  slug: string
  language?: Language
  useDirectFallback?: boolean // New prop to skip API calls
}

// Create a hardcoded post for the fallback
const fallbackAmbidestriaPost: Post = {
  title: "Ambidestria Corporativa",
  slug: { current: "ambidestria-corporativa" },
  excerpt: "Como empresas podem equilibrar exploração e explotação para inovação e otimização simultâneas.",
  publishedAt: "2023-09-15",
  estimatedReadingTime: 7,
  author: "L'eep Growth",
  mainImage: null // No image for fallback
}

export function FeaturedBlogPost({ slug, language = "pt", useDirectFallback = false }: FeaturedBlogPostProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(!useDirectFallback) // Don't show loading if using direct fallback
  const [error, setError] = useState(false)

  useEffect(() => {
    // If using direct fallback for ambidestria-corporativa, skip API call
    if (useDirectFallback && slug === "ambidestria-corporativa") {
      setPost(fallbackAmbidestriaPost);
      setLoading(false);
      return;
    }
    
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true)
        
        // Add a small delay to ensure client initialization
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const data = await getPost(slug)
        setPost(data)
      } catch (err) {
        console.error("Erro ao buscar post:", err)
        setError(true)
        // If it's the ambidestria post and there was an error, use the fallback
        if (slug === "ambidestria-corporativa") {
          setPost(fallbackAmbidestriaPost)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, useDirectFallback])

  // If loading, show skeleton
  if (loading) {
    return (
      <div className="flex flex-col h-full rounded-xl overflow-hidden bg-black animate-pulse">
        <div className="w-full h-36 bg-gray-800"></div>
        <div className="p-6 space-y-3 flex-grow">
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          <div className="h-10 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="text-teal">Carregando...</div>
        </div>
      </div>
    )
  }
  
  // Check if we should use the special fallback for ambidestria-corporativa
  if (slug === "ambidestria-corporativa" && (error || !post || useDirectFallback)) {
    // Use hardcoded fallback for this specific post
    return renderPost(fallbackAmbidestriaPost, language)
  }

  // If no post was found
  if (!post) {
    return (
      <div className="flex flex-col h-full rounded-xl overflow-hidden bg-black">
        <div className="p-6 space-y-3 flex-grow">
          <h3 className="text-xl font-semibold text-teal">Blog L'eep</h3>
          <p className="text-white">
            {language === "pt" 
              ? "Confira nossos artigos sobre estratégia, inovação e gestão ambidestra."
              : "Check out our articles about strategy, innovation and ambidextrous management."}
          </p>
          <Link href="/blog" className="text-teal hover:underline mt-2 inline-block">
            {language === "pt" ? "Ver todos os artigos" : "View all articles"}
          </Link>
        </div>
      </div>
    )
  }

  // For the normal post display
  return renderPost(post, language)
}

// Helper function to render the post
function renderPost(post: Post, language: Language) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden bg-black">
      {post.mainImage && (
        <div className="w-full h-36 relative">
          <Image
            src={urlFor(post.mainImage).url() || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6 space-y-3 flex-grow">
        <div className="flex justify-between items-start">
          <span className="text-xs text-teal">
            {post.estimatedReadingTime || 5} min de leitura
          </span>
          <span className="text-xs text-teal">
            {new Date(post.publishedAt).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        
        <h3 className="text-2xl font-semibold text-teal">{post.title}</h3>
        
        <p className="text-white line-clamp-2">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/blog/${post.slug.current}`}
          className="text-teal hover:underline mt-2 inline-block"
        >
          {language === "pt" ? "Ler artigo completo" : "Read full article"}
        </Link>
      </div>
    </div>
  )
} 