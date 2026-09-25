'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getEngine, setSource } from '@/lib/audio'
import { tracks } from '@/content/tracks'

// Lives in the root layout, so music keeps playing while visitors move between
// pages. The <audio> element is routed through the shared engine so the visuals
// react to it.

type Player = {
  index: number | null
  playing: boolean
  time: number
  duration: number
  play: (i: number) => void
  toggle: () => void
  seek: (fraction: number) => void
  next: () => void
  prev: () => void
}

const PlayerContext = createContext<Player | null>(null)

export function usePlayer() {
  const p = useContext(PlayerContext)
  if (!p) throw new Error('usePlayer must be used inside <PlayerProvider>')
  return p
}

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const routed = useRef(false)
  const [index, setIndex] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const element = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio()
      a.crossOrigin = 'anonymous'
      a.preload = 'metadata'
      audioRef.current = a
    }
    return audioRef.current
  }, [])

  // Connect to the engine on first play (it needs a user gesture).
  const route = useCallback(() => {
    if (routed.current) return
    const { ctx, out } = getEngine()
    ctx.createMediaElementSource(element()).connect(out)
    routed.current = true
  }, [element])

  const play = useCallback(
    (i: number) => {
      const a = element()
      route()
      if (i !== index) {
        a.src = tracks[i].src
        setIndex(i)
        setTime(0)
      }
      a.play().catch(() => setPlaying(false))
    },
    [element, route, index],
  )

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a || index === null) return play(0)
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }, [index, play])

  const seek = useCallback((f: number) => {
    const a = audioRef.current
    if (a && Number.isFinite(a.duration)) a.currentTime = f * a.duration
  }, [])

  const next = useCallback(() => {
    if (tracks.length) play(((index ?? -1) + 1) % tracks.length)
  }, [index, play])
  const prev = useCallback(() => {
    if (tracks.length) play(((index ?? 0) - 1 + tracks.length) % tracks.length)
  }, [index, play])

  useEffect(() => {
    const a = element()
    const on = () => {
      setPlaying(true)
      setSource('player', true)
    }
    const off = () => {
      setPlaying(false)
      setSource('player', false)
    }
    const tick = () => setTime(a.currentTime)
    const meta = () => setDuration(a.duration)
    a.addEventListener('play', on)
    a.addEventListener('pause', off)
    a.addEventListener('timeupdate', tick)
    a.addEventListener('loadedmetadata', meta)
    return () => {
      a.removeEventListener('play', on)
      a.removeEventListener('pause', off)
      a.removeEventListener('timeupdate', tick)
      a.removeEventListener('loadedmetadata', meta)
    }
  }, [element])

  // Auto-advance to the next track at the end (stop after the last one).
  useEffect(() => {
    const a = element()
    const ended = () => {
      if (index !== null && index < tracks.length - 1) play(index + 1)
    }
    a.addEventListener('ended', ended)
    return () => a.removeEventListener('ended', ended)
  }, [element, index, play])

  return (
    <PlayerContext.Provider value={{ index, playing, time, duration, play, toggle, seek, next, prev }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const formatTime = (s: number) =>
  Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00'
