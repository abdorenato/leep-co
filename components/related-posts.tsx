import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"

interface RelatedPostsProps {
  posts: any[]
  currentPostId: string
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filtrar o post atual e limitar a 3 posts relacionados
  const filteredPosts = posts.filter((post) => post._id !== currentPostId).slice(0, 3)

  if (filteredPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Posts relacionados</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-teal hover:shadow-md hover:shadow-teal/10"
          >
            {post.mainImage && (
              <div className="relative h-40 w-full">
                <Image
                  src={urlFor(post.mainImage).url() || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <div className="text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

