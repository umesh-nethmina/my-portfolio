'use client'

import { useState, useRef } from 'react'
import ImageUploader from './ImageUploader'

export default function AdminBlogForm({ addBlog }: { addBlog: (formData: FormData) => Promise<void> }) {
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    // Append the uploaded cover image URL to form data
    formData.set('cover_image', coverImageUrl)
    await addBlog(formData)
    // Reset form
    formRef.current?.reset()
    setCoverImageUrl('')
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 bg-foreground/5 p-6 rounded-2xl border border-foreground/10">
      <h3 className="text-lg font-medium mb-4">Add New Blog</h3>
      <input
        name="title"
        placeholder="Blog Title"
        required
        className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
      />

      {/* Cover Image Upload */}
      <ImageUploader
        onUploadComplete={(url) => setCoverImageUrl(url)}
        label="Cover Image (Optional)"
        folder="blogs"
      />

      {/* Hidden input to hold the cover image URL */}
      <input type="hidden" name="cover_image" value={coverImageUrl} />

      <textarea
        name="content"
        placeholder="Markdown Content"
        required
        rows={8}
        className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none font-mono text-sm transition-colors"
      />
      <button
        type="submit"
        className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Create Post
      </button>
    </form>
  )
}
