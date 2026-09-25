'use client'

import { tracks } from '@/content/tracks'
import { formatTime, usePlayer } from './PlayerProvider'

// Pinned to the bottom of every page once a track has been started.
export default function MiniPlayer() {
  const { index, playing, time, duration, toggle, next, prev, seek } = usePlayer()
  if (index === null) return null
  const t = tracks[index]

  return (
    <>
      {/* keeps the footer clear of the fixed bar */}
      <div className="h-14" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-paper/15 bg-ink/95 backdrop-blur">
        <div
          className="h-1 cursor-pointer bg-paper/10"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            seek((e.clientX - r.left) / r.width)
          }}
        >
          <div className="h-full bg-signal" style={{ width: `${duration ? (time / duration) * 100 : 0}%` }} />
        </div>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-8">
          <button type="button" onClick={prev} className="px-2 font-mono text-paper/60 hover:text-signal" aria-label="Previous track">
            ⏮
          </button>
          <button
            type="button"
            onClick={toggle}
            className="h-9 w-9 bg-signal font-mono text-sm text-ink hover:bg-paper"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button type="button" onClick={next} className="px-2 font-mono text-paper/60 hover:text-signal" aria-label="Next track">
            ⏭
          </button>
          {/* A level meter driven by the engine's --energy CSS variable. */}
          <span className="hidden h-3 w-16 items-end gap-0.5 sm:flex" aria-hidden>
            {['--bass', '--mid', '--high', '--energy'].map((v) => (
              <span key={v} className="w-full bg-pulse" style={{ height: `calc(15% + var(${v}, 0) * 85%)` }} />
            ))}
          </span>
          <p className="min-w-0 flex-1 truncate text-sm">
            {t.title}
            <span className="ml-3 font-mono text-xs text-paper/40">
              {formatTime(time)} / {formatTime(duration)}
            </span>
        </p>
      </div>
    </div>
    </>
  )
}
