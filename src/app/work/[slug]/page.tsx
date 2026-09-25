import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getWork, works } from '@/content/works'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug)
  if (!work) return {}
  return { title: work.title, description: work.summary }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) notFound()

  const i = works.indexOf(work)
  const next = works[(i + 1) % works.length]

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-8">
      <Link href="/#work" className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-signal">
        ← All work
      </Link>

      <header className="mb-10 mt-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          {work.kind} · {work.year}
        </p>
        <h1 className="font-display text-6xl uppercase sm:text-8xl lg:text-9xl">{work.title}</h1>
      </header>

      <div className="relative overflow-hidden border border-paper/10 bg-black">
        {work.video ? (
          <video src={work.video} controls playsInline preload="metadata" className="aspect-video w-full bg-black" />
        ) : work.image ? (
          <div className="relative aspect-video">
            <Image src={work.image} alt={work.title} fill sizes="100vw" className="object-contain p-8" priority />
          </div>
        ) : null}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 text-xl leading-relaxed text-paper/85">
          {work.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="space-y-6 font-mono text-xs uppercase tracking-[0.2em]">
          {work.details?.map((d) => (
            <div key={d.label}>
              <dt className="mb-1 text-paper/40">{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
          <div>
            <dt className="mb-2 text-paper/40">Tags</dt>
            <dd className="flex flex-wrap gap-2">
              {work.tags.map((t) => (
                <span key={t} className="border border-paper/20 px-2 py-1">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {next.slug !== work.slug && (
        <Link
          href={`/work/${next.slug}`}
          className="group mt-24 flex items-end justify-between border-t border-paper/10 pt-8"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Next</span>
            <span className="font-display text-5xl uppercase transition-colors group-hover:text-signal sm:text-7xl">
              {next.title}
            </span>
          </span>
          <span className="font-display text-5xl transition-transform group-hover:translate-x-2 group-hover:text-signal">→</span>
        </Link>
      )}
    </main>
  )
}
