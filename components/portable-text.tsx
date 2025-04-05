"use client"

import { PortableText as PortableTextComponent } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="relative w-full h-[400px] my-8 rounded-lg overflow-hidden">
          <Image src={urlFor(value).url() || "/placeholder.svg"} alt={value.alt || ""} fill className="object-cover" />
          {value.caption && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-white text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callToAction: ({ value, isInline }: any) => {
      return isInline ? (
        <Link href={value.url} className="text-teal hover:underline">
          {value.text}
        </Link>
      ) : (
        <div className="my-8">
          <Link
            href={value.url}
            className="bg-teal hover:bg-teal/90 text-black font-medium px-6 py-3 rounded-md inline-block text-lg"
          >
            {value.text}
          </Link>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <Link href={value.href} rel={rel} className="text-teal hover:underline">
          {children}
        </Link>
      )
    },
    highlight: ({ children }: any) => {
      return <span className="bg-teal/20 text-teal px-1 rounded">{children}</span>
    },
  },
  block: {
    // Como o H1 já é usado para o título do post, começamos com H2 para o conteúdo
    h1: ({ children }: any) => {
      return <h2 className="text-3xl font-bold mt-10 mb-5">{children}</h2>
    },
    h2: ({ children }: any) => {
      return <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>
    },
    h3: ({ children }: any) => {
      return <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>
    },
    h4: ({ children }: any) => {
      return <h5 className="text-lg font-bold mt-6 mb-2">{children}</h5>
    },
    normal: ({ children }: any) => {
      return <p className="my-5 leading-relaxed text-lg">{children}</p>
    },
    blockquote: ({ children }: any) => {
      return <blockquote className="border-l-4 border-teal pl-5 italic my-8 text-gray-300 text-lg">{children}</blockquote>
    },
  },
  list: {
    bullet: ({ children }: any) => {
      return <ul className="list-disc pl-8 my-6 space-y-3 text-lg">{children}</ul>
    },
    number: ({ children }: any) => {
      return <ol className="list-decimal pl-8 my-6 space-y-3 text-lg">{children}</ol>
    },
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />
}

