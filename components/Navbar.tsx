import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-foreground/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          Dev<span className="text-blue-500">Portfolio</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/projects" className="hover:text-blue-500 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">
            Blog
          </Link>
          <Link href="/admin" className="hover:text-blue-500 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
