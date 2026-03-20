'use client'

import { useState, useRef } from 'react'
import ImageUploader from './ImageUploader'

export default function AdminProjectForm({ addProject }: { addProject: (formData: FormData) => Promise<void> }) {
  const [imageUrl, setImageUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    // Append the uploaded image URL to form data
    formData.set('image_url', imageUrl)
    await addProject(formData)
    // Reset form
    formRef.current?.reset()
    setImageUrl('')
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4 bg-foreground/5 p-6 rounded-2xl border border-foreground/10">
      <h3 className="text-lg font-medium mb-4">Add New Project</h3>
      <input
        name="title"
        placeholder="Project Title"
        required
        className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
      />
      <textarea
        name="description"
        placeholder="Description"
        required
        rows={3}
        className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
      />
      <input
        name="github_url"
        placeholder="GitHub URL (Optional)"
        className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
      />

      {/* Drag & Drop Image Upload */}
      <ImageUploader
        onUploadComplete={(url) => setImageUrl(url)}
        label="Project Image"
        folder="projects"
      />

      {/* Hidden input to hold the image URL */}
      <input type="hidden" name="image_url" value={imageUrl} />

      <button
        type="submit"
        className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Create Project
      </button>
    </form>
  )
}
