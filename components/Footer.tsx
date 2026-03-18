export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 py-8 mt-16">
      <div className="container mx-auto px-6 text-center text-sm text-foreground/60">
        <p>&copy; {new Date().getFullYear()} My Portfolio. Built with Next.js, Supabase & Tailwind.</p>
      </div>
    </footer>
  )
}
