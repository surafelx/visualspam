'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { Work } from '@/content/works'

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const play = () => {
    videoRef.current?.play().catch(() => {})
  }
  const pause = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <Link
      href={`/work/${work.slug}`}
      className="group block"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-paper/10 bg-black">
        {work.video ? (
          <video
            ref={videoRef}
            src={`${work.video}#t=0.5`}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : work.image ? (
          <Image
            src={work.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="scanlines pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80">
          {String(index + 1).padStart(2, '0')} · {work.kind}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-medium transition-colors group-hover:text-signal">{work.title}</h3>
        <span className="font-mono text-xs text-paper/50">{work.year}</span>
      </div>
      <p className="mt-1 text-sm text-paper/60">{work.summary}</p>
    </Link>
  )
}
