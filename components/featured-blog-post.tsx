"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getPost, urlFor } from "@/lib/sanity"
import type { Language } from "@/lib/translations"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt: string
  excerpt?: string
  author?: string
  authorImage?: any
}

interface FeaturedBlogPostProps {
  slug: string
  language?: Language
}

export function FeaturedBlogPost({ slug, language = "pt" }: FeaturedBlogPostProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      try {
        const postData = await getPost(slug)
        setPost(postData)
      } catch (error) {
        console.error("Error fetching post:", error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // Loading state
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full flex items-center justify-center p-6">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    )
  }

  // Mock data for "ambidestria-corporativa" when post is not found
  if (!post && slug === "ambidestria-corporativa") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-teal h-full flex flex-col p-6">
        <Link href="/blog" className="h-full flex flex-col">
          <div className="space-y-3 flex-1 flex flex-col text-left">
            <h3 className="text-xl font-bold text-gray-900">
              {language === "pt" ? "Blog: Ambidestria Corporativa" : "Blog: Corporate Ambidexterity"}
            </h3>
            <p className="text-gray-700 flex-1">
              {language === "pt" 
                ? "O equilíbrio entre eficiência operacional e inovação que define o posicionamento da L'eep Co. Descubra como empresas podem crescer de forma sustentável."
                : "The balance between operational efficiency and innovation that defines L'eep Co.'s positioning. Discover how companies can achieve sustainable growth."}
            </p>
            <div className="pt-3">
              <span className="text-teal text-sm font-medium">
                {language === "pt" ? "Ler mais →" : "Read more →"}
              </span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
        <p className="text-gray-700">
          {language === "pt" ? "Post não encontrado" : "Post not found"}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-teal h-full flex flex-col">
      <Link href={`/blog/${post.slug.current}`} className="h-full flex flex-col">
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
        <div className="p-5 space-y-3 flex-1 flex flex-col text-left">
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {new Date(post.publishedAt).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Blog: {post.title}</h3>
          {post.excerpt && <p className="text-gray-700">{post.excerpt}</p>}
          <div className="pt-3">
            <span className="text-teal text-sm font-medium">
              {language === "pt" ? "Ler mais →" : "Read more →"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
} 