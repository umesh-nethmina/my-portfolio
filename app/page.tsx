import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 py-20 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Hi, I'm a <span className="text-blue-500">Full-Stack Developer</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-light">
          I build modern, high-performance web applications with Next.js, Supabase, and Tailwind CSS.
        </p>
      </div>
      
      <div className="flex gap-4 items-center justify-center pt-8">
        <Link href="/projects" className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:bg-foreground/90 transition-all flex items-center gap-2">
          View Projects <ArrowRight size={18} />
        </Link>
        <Link href="/blog" className="px-8 py-3 rounded-full font-medium border border-foreground/20 hover:bg-foreground/5 transition-all">
          Read Blog
        </Link>
      </div>

      <div className="flex gap-6 pt-12 text-foreground/60">
        <a href="#" className="hover:text-foreground transition-colors"><Github size={24} /></a>
        <a href="#" className="hover:text-foreground transition-colors"><Linkedin size={24} /></a>
        <a href="#" className="hover:text-foreground transition-colors"><Twitter size={24} /></a>
      </div>
    </div>
  )
}
