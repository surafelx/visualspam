import Link from 'next/link'
import AsciiPortrait from '@/components/AsciiPortrait'
import SignalInstrument from '@/components/SignalInstrument'
import WorkCard from '@/components/WorkCard'
import { media, site } from '@/content/site'
import { shows } from '@/content/shows'
import { works } from '@/content/works'

function SectionHead({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-3 border-b border-paper/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-display text-6xl uppercase sm:text-8xl">
        <span className="mr-4 align-top font-mono text-xs tracking-[0.2em] text-signal">{index}</span>
        {title}
      </h2>
      {note && <p className="max-w-sm font-mono text-xs uppercase tracking-[0.15em] text-paper/50">{note}</p>}
    </div>
  )
}

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export default function Home() {
  const today = new Date().toISOString().slice(0, 10)
  const sorted = [...shows].sort((a, b) => b.date.localeCompare(a.date))
  const upcoming = sorted.filter((s) => s.date >= today).reverse()
  const past = sorted.filter((s) => s.date < today)

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.loop}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="scanlines pointer-events-none absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-8">
          <AsciiPortrait />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8 sm:pb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-paper/70">
            {site.tagline} — {site.disciplines.join(' / ')}
          </p>
          <h1 className="font-display wordmark wordmark-glitch text-[22vw] leading-none sm:text-[16vw] lg:text-[13rem]">
            {site.name}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#work"
              className="bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-paper"
            >
              See the work
            </Link>
            <Link
              href="/#sound"
              className="border border-paper/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-signal hover:text-signal"
            >
              ▶ Play the site
            </Link>
          </div>
        </div>
      </section>

      {/* Discipline ticker */}
      <div className="overflow-hidden border-y border-paper/10 bg-signal py-3 text-ink" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-3xl uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            Array.from({ length: 4 }).flatMap((__, j) =>
              site.disciplines.map((d) => <span key={`${k}-${j}-${d}`}>{d} ✶</span>),
            ),
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Work */}
        <section id="work" className="py-24">
          <SectionHead index="01" title="Work" note="Performances, loops and images. Hover to play." />
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w, i) => (
              <WorkCard key={w.slug} work={w} index={i} />
            ))}
          </div>
          <a
            href={site.videoLogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-16 flex items-center justify-between border border-paper/15 p-6 transition-colors hover:border-signal sm:p-8"
          >
            <span>
              <span className="block font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Ongoing</span>
              <span className="font-display text-4xl uppercase sm:text-6xl">Video log</span>
            </span>
            <span className="font-display text-5xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal">
              ↗
            </span>
          </a>
        </section>

        {/* Live */}
        <section id="live" className="py-24">
          <SectionHead index="02" title="Live" note="Live coding sets, DJ nights and AV shows." />
          {upcoming.length > 0 && (
            <>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">Upcoming</h3>
              <ShowList items={upcoming} />
            </>
          )}
          {past.length > 0 && (
            <>
              <h3 className="mb-4 mt-10 font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Past</h3>
              <ShowList items={past} />
            </>
          )}
          <p className="mt-8 text-paper/60">
            Want a live AV set for your night?{' '}
            <Link href="/#contact" className="text-paper underline decoration-signal underline-offset-4 hover:text-signal">
              Get in touch
            </Link>
            .
          </p>
        </section>

        {/* Sound */}
        <section id="sound" className="py-24">
          <SectionHead index="03" title="Sound" note="A small instrument that runs in your browser. The scope draws what you hear." />
          <SignalInstrument />
          <p className="mt-4 font-mono text-xs text-paper/50">
            Drag on the scope: left to right is pitch, bottom to top is filter colour. Mind your volume.
          </p>
        </section>

        {/* About */}
        <section id="about" className="py-24">
          <SectionHead index="04" title="About" />
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6 text-2xl leading-snug text-paper/85 sm:text-3xl">
              {site.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="space-y-6 font-mono text-xs uppercase tracking-[0.2em]">
              <div>
                <dt className="mb-2 text-paper/40">Practice</dt>
                <dd className="space-y-1">
                  {site.disciplines.map((d) => (
                    <span key={d} className="block">
                      {d}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mb-2 text-paper/40">Tools</dt>
                <dd>Code · Web Audio · Video</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <SectionHead index="05" title="Contact" note="Commissions, live sets, collaborations." />
          <a
            href={`mailto:${site.contact.email}`}
            className="block break-all font-display text-5xl uppercase transition-colors hover:text-signal sm:text-7xl lg:text-8xl"
          >
            {site.contact.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-4">
            {site.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-paper/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-signal hover:text-signal"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

function ShowList({ items }: { items: typeof shows }) {
  return (
    <ul className="border-t border-paper/10">
      {items.map((s) => {
        const row = (
          <div className="grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[9rem_1fr_1fr_auto]">
            <span className="font-mono text-xs text-paper/60">{formatDate(s.date)}</span>
            <span className="text-xl font-medium group-hover:text-signal">{s.title}</span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-paper/50 sm:block">
              {[s.format, s.place].filter(Boolean).join(' · ')}
            </span>
            <span className="text-paper/40 group-hover:text-signal">{s.href ? '→' : ''}</span>
          </div>
        )
        return (
          <li key={`${s.date}-${s.title}`} className="border-b border-paper/10">
            {s.href ? (
              <Link href={s.href} className="group block">
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        )
      })}
    </ul>
  )
}
