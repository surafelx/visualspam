'use client'

import { useEffect, useRef, useState } from 'react'
import { tracks } from '@/content/tracks'
import { formatTime, usePlayer } from './PlayerProvider'

const BARS = 180
const peakCache = new Map<string, Float32Array>()

// Decode the file once to draw its real waveform. If that fails (no CORS, odd
// format) the player still works, it just shows a plain progress bar.
async function loadPeaks(src: string) {
  const cached = peakCache.get(src)
  if (cached) return cached
  const buf = await (await fetch(src)).arrayBuffer()
  const audio = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(buf)
  const data = audio.getChannelData(0)
  const step = Math.floor(data.length / BARS)
  const peaks = new Float32Array(BARS)
  let max = 0
  for (let i = 0; i < BARS; i++) {
    let m = 0
    for (let j = i * step; j < (i + 1) * step; j += 16) m = Math.max(m, Math.abs(data[j]))
    peaks[i] = m
    max = Math.max(max, m)
  }
  for (let i = 0; i < BARS; i++) peaks[i] = max ? peaks[i] / max : 0
  peakCache.set(src, peaks)
  return peaks
}

function Waveform({ src }: { src: string }) {
  const { time, duration, seek } = usePlayer()
  const [peaks, setPeaks] = useState<Float32Array | null>(null)

  useEffect(() => {
    let alive = true
    setPeaks(null)
    loadPeaks(src)
      .then((p) => alive && setPeaks(p))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [src])

  const progress = duration ? time / duration : 0
  const onSeek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.type === 'pointermove' && e.buttons === 0) return
    const r = e.currentTarget.getBoundingClientRect()
    seek(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
  }

  return (
    <div
      className="flex h-24 cursor-pointer touch-none items-center gap-px"
      onPointerDown={onSeek}
      onPointerMove={onSeek}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(time)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (!duration) return
        if (e.key === 'ArrowRight') seek(Math.min(1, (time + 5) / duration))
        if (e.key === 'ArrowLeft') seek(Math.max(0, (time - 5) / duration))
      }}
    >
      {peaks ? (
        Array.from(peaks).map((p, i) => (
          <span
            key={i}
            className={`flex-1 ${i / BARS < progress ? 'bg-signal' : 'bg-paper/25'}`}
            style={{ height: `${Math.max(4, p * 100)}%` }}
          />
        ))
      ) : (
        <span className="relative h-1 w-full bg-paper/20">
          <span className="absolute inset-y-0 left-0 bg-signal" style={{ width: `${progress * 100}%` }} />
        </span>
      )}
    </div>
  )
}

export default function MusicPlayer() {
  const { index, playing, time, duration, play, toggle } = usePlayer()
  const current = index !== null ? tracks[index] : tracks[0]

  return (
    <div className="border border-paper/15 bg-black">
      <div className="border-b border-paper/15 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-4">
          <button
            type="button"
            onClick={index === null ? () => play(0) : toggle}
            className="h-12 w-12 shrink-0 bg-signal font-mono text-ink transition-colors hover:bg-paper"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <div className="min-w-0">
            <p className="truncate text-xl font-medium">{current.title}</p>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/50">
              {[current.note, current.year].filter(Boolean).join(' · ')}
              {index !== null && ` · ${formatTime(time)} / ${formatTime(duration)}`}
            </p>
          </div>
        </div>
        <Waveform src={current.src} />
      </div>

      <ol>
        {tracks.map((t, i) => {
          const active = i === index
          return (
            <li key={t.src} className="border-b border-paper/10 last:border-b-0">
              <button
                type="button"
                onClick={() => (active ? toggle() : play(i))}
                className={`grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-4 px-4 py-4 text-left transition-colors hover:bg-paper/5 sm:px-6 ${
                  active ? 'text-signal' : ''
                }`}
              >
                <span className="font-mono text-xs text-paper/40">
                  {active && playing ? '♪' : String(i + 1).padStart(2, '0')}
                </span>
                <span className="truncate">{t.title}</span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-paper/50">
                  {[t.note, t.year].filter(Boolean).join(' · ')}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
