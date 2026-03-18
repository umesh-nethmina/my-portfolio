import { createClient } from '@/lib/supabase/server'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60 // Revalidate cache every minute

export default async function ProjectsPage() {
  const supabase = await createClient()

  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="container mx-auto px-6 py-20 flex-1">
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-foreground/60 font-light">
          A collection of my recent work. These side-projects and client builds demonstrate my focus on creating clean, functional, and performant web applications.
        </p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-20 bg-foreground/5 rounded-2xl border border-foreground/10">
          <p className="text-foreground/50">No projects found. Add some in the admin dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
