import { createClient } from '@/lib/supabase/server'
import BlogCard from '@/components/BlogCard'

export const revalidate = 60

export default async function BlogPage() {
  const supabase = await createClient()

  // Fetch blogs from Supabase
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching blogs:', error)
  }

  return (
    <div className="container mx-auto px-6 py-20 flex-1 max-w-4xl">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Writing</h1>
        <p className="text-lg text-foreground/60 font-light max-w-2xl">
          Thoughts on full-stack development, tech workflows, and my experience building products on the web.
        </p>
      </div>

      {!blogs || blogs.length === 0 ? (
        <div className="text-center py-20 bg-foreground/5 rounded-2xl border border-foreground/10">
          <p className="text-foreground/50">No posts. Check back later.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
