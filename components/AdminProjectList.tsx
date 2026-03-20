'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Pencil, X, Trash2, Check } from 'lucide-react'
import ImageUploader from './ImageUploader'

interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  github_url: string | null
  created_at: string
}

interface AdminProjectListProps {
  projects: Project[]
  deleteProject: (id: string) => Promise<void>
  updateProject: (id: string, formData: FormData) => Promise<void>
}

export default function AdminProjectList({ projects, deleteProject, updateProject }: AdminProjectListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  function startEditing(project: Project) {
    setEditingId(project.id)
    setImageUrl(project.image_url || '')
  }

  function cancelEditing() {
    setEditingId(null)
    setImageUrl('')
  }

  async function handleUpdate(id: string, formData: FormData) {
    formData.set('image_url', imageUrl)
    await updateProject(id, formData)
    setEditingId(null)
    setImageUrl('')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">Existing Projects</h3>
      {projects?.map((project) => (
        <div key={project.id} className="bg-background border border-foreground/10 rounded-xl shadow-sm overflow-hidden">
          {editingId === project.id ? (
            /* ─── Edit Mode ─── */
            <form
              ref={formRef}
              action={handleUpdate.bind(null, project.id)}
              className="p-5 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-blue-500 uppercase tracking-wider">Editing Project</h4>
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
                defaultValue={project.title}
                placeholder="Project Title"
                required
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
              />
              <textarea
                name="description"
                defaultValue={project.description}
                placeholder="Description"
                required
                rows={3}
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
              />
              <input
                name="github_url"
                defaultValue={project.github_url || ''}
                placeholder="GitHub URL (Optional)"
                className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors"
              />

              <ImageUploader
                onUploadComplete={(url) => setImageUrl(url)}
                currentImageUrl={project.image_url || undefined}
                label="Project Image"
                folder="projects"
              />
              <input type="hidden" name="image_url" value={imageUrl} />

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
                {project.image_url && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-foreground/5">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-foreground/50 truncate max-w-xs">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => startEditing(project)}
                  className="flex items-center gap-1.5 text-blue-500 text-sm hover:bg-blue-500/10 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>
                <form action={deleteProject.bind(null, project.id)}>
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
      {(!projects || projects.length === 0) && (
        <p className="text-foreground/40 text-sm py-4 text-center">No projects yet</p>
      )}
    </div>
  )
}
