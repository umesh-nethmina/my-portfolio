'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Pencil, X, Trash2, Check } from 'lucide-react'
import ImageUploader from './ImageUploader'

interface Blog {
  id: string
  title: string
  content: string
  cover_image: string | null
  created_at: string
}

interface AdminBlogListProps {
  blogs: Blog[]
  deleteBlog: (id: string) => Promise<void>
  updateBlog: (id: string, formData: FormData) => Promise<void>
}

export default function AdminBlogList({ blogs, deleteBlog, updateBlog }: AdminBlogListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  function startEditing(blog: Blog) {
    setEditingId(blog.id)
    setCoverImageUrl(blog.cover_image || '')
  }

  function cancelEditing() {
    setEditingId(null)
    setCoverImageUrl('')
  }

  async function handleUpdate(id: string, formData: FormData) {
    formData.set('cover_image', coverImageUrl)
    await updateBlog(id, formData)
    setEditingId(null)
    setCoverImageUrl('')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Existing Blogs</h3>
      {blogs?.map((blog) => (
        <div key={blog.id} className="bg-background border border-foreground/10 rounded-xl shadow-sm overflow-hidden">
          {editingId === blog.id ? (
            /* ─── Edit Mode ─── */
            <form
              ref={formRef}
              action={handleUpdate.bind(null, blog.id)}
              className="p-5 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-blue-500 uppercase tracking-wider">Editing Blog Post</h4>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="text-foreground/40 hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <input
                name="title"
                defaultValue={blog.title}
                placeholder="Blog Title"
                required
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
              />

              <ImageUploader
                onUploadComplete={(url) => setCoverImageUrl(url)}
                currentImageUrl={blog.cover_image || undefined}
                label="Cover Image (Optional)"
                folder="blogs"
              />
              <input type="hidden" name="cover_image" value={coverImageUrl} />

              <textarea
                name="content"
                defaultValue={blog.content}
                placeholder="Markdown Content"
                required
                rows={10}
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none font-mono text-sm transition-colors"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                >
                  <Check size={14} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex items-center gap-2 bg-foreground/10 px-5 py-2 rounded-lg font-medium hover:bg-foreground/20 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* ─── View Mode ─── */
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3 min-w-0">
                {blog.cover_image && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-foreground/5">
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-medium">{blog.title}</h4>
                  <p className="text-sm text-foreground/50">{new Date(blog.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => startEditing(blog)}
                  className="flex items-center gap-1.5 text-blue-500 text-sm hover:bg-blue-500/10 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>
                <form action={deleteBlog.bind(null, blog.id)}>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 text-red-500 text-sm hover:bg-red-500/10 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
      {(!blogs || blogs.length === 0) && (
        <p className="text-foreground/40 text-sm py-4 text-center">No blog posts yet</p>
      )}
    </div>
  )
}
