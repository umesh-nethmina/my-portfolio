import { createClient } from '@/lib/supabase/server'
import { addProject, deleteProject, addBlog, deleteBlog, logout } from './actions'

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
            
            <form action={addProject} className="space-y-4 bg-foreground/5 p-6 rounded-2xl border border-foreground/10">
              <h3 className="text-lg font-medium mb-4">Add New Project</h3>
              <input name="title" placeholder="Project Title" required className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
              <textarea name="description" placeholder="Description" required rows={3} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
              <input name="github_url" placeholder="GitHub URL (Optional)" className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
              <input name="image_url" placeholder="Image URL (Optional)" className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
              <button type="submit" className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Create Project
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Existing Projects</h3>
            {projects?.map((project) => (
              <div key={project.id} className="flex justify-between items-center bg-background border border-foreground/10 p-4 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-foreground/50 truncate max-w-xs">{project.description}</p>
                </div>
                <form action={deleteProject.bind(null, project.id)}>
                  <button type="submit" className="text-red-500 text-sm hover:underline font-medium">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>
            
            <form action={addBlog} className="space-y-4 bg-foreground/5 p-6 rounded-2xl border border-foreground/10">
              <h3 className="text-lg font-medium mb-4">Add New Blog</h3>
              <input name="title" placeholder="Blog Title" required className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
              <textarea name="content" placeholder="Markdown Content" required rows={8} className="w-full bg-background border border-foreground/20 rounded-lg px-4 py-2 focus:border-blue-500 outline-none font-mono text-sm" />
              <button type="submit" className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Create Post
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Existing Blogs</h3>
            {blogs?.map((blog) => (
              <div key={blog.id} className="flex justify-between items-center bg-background border border-foreground/10 p-4 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-medium">{blog.title}</h4>
                  <p className="text-sm text-foreground/50">{new Date(blog.created_at).toLocaleDateString()}</p>
                </div>
                <form action={deleteBlog.bind(null, blog.id)}>
                  <button type="submit" className="text-red-500 text-sm hover:underline font-medium">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
