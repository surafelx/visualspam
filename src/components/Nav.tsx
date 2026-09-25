'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { site } from '@/content/site'

const sections = [
  { label: 'Work', href: '/#work' },
  { label: 'Live', href: '/#live' },
  { label: 'Sound', href: '/#sound' },
  { label: 'About', href: '/#about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'bg-ink/90 backdrop-blur border-b border-paper/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="font-display wordmark text-3xl" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] md:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="text-paper/70 transition-colors hover:text-signal">
                {s.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.videoLogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/70 transition-colors hover:text-signal"
            >
              Video log ↗
            </a>
          </li>
          <li>
            <Link
              href="/#contact"
              className="border border-paper/40 px-4 py-2 transition-colors hover:border-signal hover:bg-signal hover:text-ink"
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-[0.2em] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 px-4 pb-6 font-display text-5xl md:hidden">
          {[...sections, { label: 'Contact', href: '/#contact' }].map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="block py-1 hover:text-signal" onClick={() => setOpen(false)}>
                {s.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.videoLogUrl} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-signal">
              Video log ↗
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
