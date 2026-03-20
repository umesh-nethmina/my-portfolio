import { createClient } from '@/lib/supabase/server'
import { addProject, deleteProject, updateProject, addBlog, deleteBlog, updateBlog, logout } from './actions'
import AdminProjectForm from '@/components/AdminProjectForm'
import AdminBlogForm from '@/components/AdminBlogForm'
import AdminProjectList from '@/components/AdminProjectList'
import AdminBlogList from '@/components/AdminBlogList'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch all projects and blogs
  const [{ data: projects }, { data: blogs }] = await Promise.all([
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('blogs').select('*').order('created_at', { ascending: false }),
  ])

  return (
    <div className="container mx-auto px-6 py-20 flex-1 max-w-6xl">
      <div className="flex justify-between items-center mb-12 border-b border-foreground/10 pb-6">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <form action={logout}>
          <button type="submit" className="text-sm font-medium hover:text-red-500 transition-colors">
            Sign Out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Projects Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
            <AdminProjectForm addProject={addProject} />
          </div>
          <AdminProjectList
            projects={projects || []}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        </section>

        {/* Blogs Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>
            <AdminBlogForm addBlog={addBlog} />
          </div>
          <AdminBlogList
            blogs={blogs || []}
            deleteBlog={deleteBlog}
            updateBlog={updateBlog}
          />
        </section>
      </div>
    </div>
  )
}
