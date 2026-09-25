'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// A small generative instrument: detuned saws through a swept low-pass filter,
// pulsed by an LFO. The same analyser that listens to it draws the scope, so the
// picture is the sound. Drag on the scope to play it (x = pitch, y = colour).

type Params = { pitch: number; rate: number; color: number } // all 0..1

type Patch = {
  ctx: AudioContext
  master: GainNode
  analyser: AnalyserNode
  oscs: OscillatorNode[]
  filter: BiquadFilterNode
  lfo: OscillatorNode
  lfoDepth: GainNode
}

const toHz = (p: number) => 40 * Math.pow(2, p * 2.5) // ~40 Hz to ~226 Hz
const toCutoff = (c: number) => 120 * Math.pow(2, c * 6) // ~120 Hz to ~7.7 kHz
const toRate = (r: number) => 0.25 + r * 7.75 // pulses per second

function buildPatch(p: Params): Patch {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 2048
  analyser.smoothingTimeConstant = 0.8

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.Q.value = 8
  filter.frequency.value = toCutoff(p.color)

  // Amplitude pulse: a VCA whose gain swings around 0.5 with an LFO.
  const vca = ctx.createGain()
  vca.gain.value = 0.5
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = toRate(p.rate)
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 0.45
  lfo.connect(lfoDepth).connect(vca.gain)

  const hz = toHz(p.pitch)
  const oscs = [
    { type: 'sawtooth' as OscillatorType, mult: 1, detune: -9, level: 0.25 },
    { type: 'sawtooth' as OscillatorType, mult: 1, detune: 9, level: 0.25 },
    { type: 'square' as OscillatorType, mult: 1.5, detune: 3, level: 0.08 },
    { type: 'sine' as OscillatorType, mult: 0.5, detune: 0, level: 0.4 },
  ].map(({ type, mult, detune, level }) => {
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.value = hz * mult
    o.detune.value = detune
    const g = ctx.createGain()
    g.gain.value = level
    o.connect(g).connect(filter)
    o.start()
    // Remember the ratio so pitch changes keep the chord shape.
    ;(o as OscillatorNode & { mult: number }).mult = mult
    return o
  })

  filter.connect(vca).connect(master).connect(analyser).connect(ctx.destination)
  lfo.start()
  master.gain.setTargetAtTime(0.35, ctx.currentTime, 0.4)

  return { ctx, master, analyser, oscs, filter, lfo, lfoDepth }
}

function applyParams(patch: Patch, p: Params) {
  const t = patch.ctx.currentTime
  const hz = toHz(p.pitch)
  patch.oscs.forEach((o) => {
    o.frequency.setTargetAtTime(hz * (o as OscillatorNode & { mult: number }).mult, t, 0.05)
  })
  patch.filter.frequency.setTargetAtTime(toCutoff(p.color), t, 0.05)
  patch.lfo.frequency.setTargetAtTime(toRate(p.rate), t, 0.1)
}

export default function SignalInstrument() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const patchRef = useRef<Patch | null>(null)
  const paramsRef = useRef<Params>({ pitch: 0.35, rate: 0.2, color: 0.45 })
  const [params, setParams] = useState<Params>(paramsRef.current)
  const [playing, setPlaying] = useState(false)
  const [supported, setSupported] = useState(true)

  const update = useCallback((next: Partial<Params>) => {
    const merged = { ...paramsRef.current, ...next }
    paramsRef.current = merged
    setParams(merged)
    if (patchRef.current) applyParams(patchRef.current, merged)
  }, [])

  const start = useCallback(async () => {
    if (typeof window === 'undefined' || !('AudioContext' in window)) {
      setSupported(false)
      return
    }
    const patch = buildPatch(paramsRef.current)
    await patch.ctx.resume()
    patchRef.current = patch
    setPlaying(true)
  }, [])

  const stop = useCallback(() => {
    const patch = patchRef.current
    if (!patch) return
    patchRef.current = null
    setPlaying(false)
    patch.master.gain.setTargetAtTime(0, patch.ctx.currentTime, 0.15)
    setTimeout(() => patch.ctx.close(), 800)
  }, [])

  useEffect(() => () => stop(), [stop])

  // Draw loop: real analyser data while playing, a synthetic trace while idle.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const g = canvas.getContext('2d')
    if (!g) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    let raf = 0
    const time = new Uint8Array(2048)
    const freq = new Uint8Array(1024)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      const p = paramsRef.current
      const patch = patchRef.current
      frame++

      g.fillStyle = 'rgba(10,10,11,0.35)'
      g.fillRect(0, 0, w, h)

      if (patch) {
        patch.analyser.getByteFrequencyData(freq)
        const bars = 96
        const bw = w / bars
        g.fillStyle = 'rgba(45,91,255,0.55)'
        for (let i = 0; i < bars; i++) {
          const v = freq[Math.floor((i / bars) * 300)] / 255
          g.fillRect(i * bw, h - v * h * 0.9, bw - 2, v * h * 0.9)
        }
        patch.analyser.getByteTimeDomainData(time)
      }

      g.lineWidth = Math.max(2, w / 500)
      g.strokeStyle = '#ff2d2d'
      g.shadowColor = '#ff2d2d'
      g.shadowBlur = 12
      g.beginPath()
      const n = 512
      for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * w
        let v: number
        if (patch) {
          v = (time[i * 2] - 128) / 128
        } else {
          const t = reduceMotion ? 0 : frame / 60
          const cycles = 2 + p.pitch * 6
          const phase = (i / n) * Math.PI * 2 * cycles + t * 2
          const pulse = 0.55 + 0.45 * Math.sin(t * toRate(p.rate) * 0.5)
          v = (Math.sin(phase) * 0.6 + Math.sin(phase * 2.01) * 0.25 * p.color) * 0.35 * pulse
        }
        const y = h / 2 + v * h * 0.42
        if (i === 0) g.moveTo(x, y)
        else g.lineTo(x, y)
      }
      g.stroke()
      g.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const onPad = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.type === 'pointermove' && e.buttons === 0) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const y = Math.min(1, Math.max(0, 1 - (e.clientY - r.top) / r.height))
    update({ pitch: x, color: y })
  }

  const sliders: { key: keyof Params; label: string }[] = [
    { key: 'pitch', label: 'Pitch' },
    { key: 'rate', label: 'Pulse' },
    { key: 'color', label: 'Colour' },
  ]

  return (
    <div className="border border-paper/15 bg-black">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block h-64 w-full cursor-crosshair touch-none sm:h-80"
          onPointerDown={onPad}
          onPointerMove={onPad}
          aria-label="Oscilloscope. Drag to change pitch (left to right) and colour (bottom to top)."
          role="img"
        />
        <div className="scanlines pointer-events-none absolute inset-0" />
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
          {playing ? '● live' : '○ idle — press play'}
        </span>
      </div>

      <div className="grid gap-6 border-t border-paper/15 p-4 sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-center sm:p-6">
        <button
          type="button"
          onClick={playing ? stop : start}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
            playing ? 'bg-paper text-ink hover:bg-signal' : 'bg-signal text-ink hover:bg-paper'
          }`}
        >
          {playing ? '■ Stop' : '▶ Play'}
        </button>
        {sliders.map(({ key, label }) => (
          <label key={key} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
            <span className="mb-2 flex justify-between">
              {label}
              <span className="text-paper/40">{Math.round(params[key] * 100)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={params[key]}
              onChange={(e) => update({ [key]: Number(e.target.value) })}
              className="w-full accent-[#ff2d2d]"
            />
          </label>
        ))}
      </div>
      {!supported && (
        <p className="border-t border-paper/15 p-4 font-mono text-xs text-paper/60">
          This browser does not support Web Audio, so the instrument cannot play here.
        </p>
      )}
    </div>
  )
}
