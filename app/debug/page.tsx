import { getAllPostSlugs } from "@/lib/sanity"

export default async function DebugPage() {
  const slugs = await getAllPostSlugs()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Debug Page - Available Blog Posts</h1>
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Post Slugs:</h2>
        <ul className="space-y-2">
          {slugs.length > 0 ? (
            slugs.map((post: { title: string; slug: string }) => (
              <li key={post.slug} className="flex flex-col">
                <span className="font-medium text-teal">{post.title}</span>
                <span className="text-gray-400">Slug: {post.slug}</span>
              </li>
            ))
          ) : (
            <li className="text-red-400">No blog posts found</li>
          )}
        </ul>
      </div>
    </div>
  )
} 