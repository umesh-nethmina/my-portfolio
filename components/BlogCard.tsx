import Link from 'next/link'
import { format } from 'date-fns'

interface Blog {
  id: string
  title: string
  content: string
  created_at: string
}

export default function BlogCard({ blog }: { blog: Blog }) {
  // Extract a brief description from the markdown content (first 100 chars without #)
  const preview = blog.content.replace(/#/g, '').slice(0, 150) + '...'

  return (
    <Link href={`/blog/${blog.id}`} className="group block border-b border-foreground/10 pb-8 hover:opacity-80 transition-opacity">
      <div className="flex flex-col md:flex-row md:items-baseline gap-4">
        <div className="md:w-32 text-sm text-foreground/50 font-medium">
          {format(new Date(blog.created_at), 'MMM dd, yyyy')}
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold group-hover:text-blue-500 transition-colors">{blog.title}</h3>
          <p className="text-foreground/70 leading-relaxed font-light">{preview}</p>
          <span className="text-blue-500 text-sm font-semibold flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  )
}
