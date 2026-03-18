import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

export const revalidate = 60

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) {
    // eslint-disable-next-line no-console
    console.error('Error fetching blog:', error)
    notFound()
  }

  // Parse markdown to HTML and sanitize to prevent XSS
  const unpurifiedHtml = await marked.parse(blog.content)
  const htmlContent = DOMPurify.sanitize(unpurifiedHtml)

  return (
    <article className="container mx-auto px-6 py-20 max-w-3xl flex-1">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-12 transition-colors">
        <ArrowLeft size={16} /> Back to all posts
      </Link>
      
      <header className="mb-12 border-b border-foreground/10 pb-12">
        <div className="text-sm font-medium text-blue-500 mb-4 tracking-wider uppercase">
          {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {blog.title}
        </h1>
      </header>
      
      <div 
        className="prose prose-lg dark:prose-invert prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}
