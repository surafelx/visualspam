import { site } from '@/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-paper/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 font-mono text-xs uppercase tracking-[0.2em] text-paper/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex flex-wrap gap-6">
          {site.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
