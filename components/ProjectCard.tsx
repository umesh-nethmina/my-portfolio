import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  github_url: string | null
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group border border-foreground/10 rounded-2xl overflow-hidden hover:border-foreground/30 transition-all bg-foreground/[0.02]">
      {project.image_url ? (
        <div className="relative h-48 w-full bg-foreground/5 overflow-hidden">
          <Image 
            src={project.image_url} 
            alt={project.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/30 font-medium">No Image</span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{project.title}</h3>
        <p className="text-foreground/60 mb-6 text-sm line-clamp-3">{project.description}</p>
        
        <div className="flex items-center gap-4">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-500 transition-colors">
              <Github size={16} /> Code
            </a>
          )}
          {/* Mock live demo link for aesthetics */}
          <a href="#" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-500 transition-colors ml-auto">
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  )
}
