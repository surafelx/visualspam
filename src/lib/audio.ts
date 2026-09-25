'use client'

// One audio engine for the whole site. Everything that makes sound (the synth,
// the music player) plays into `out`; the microphone only feeds the analyser, so
// it never comes out of the speakers. Visuals call `levels()` every frame.
//
//   synth ──┐
//   player ─┼─> out ──> speakers
//           │     └───> analyser ──> levels()
//   mic ────────────────┘

type Engine = {
  ctx: AudioContext
  out: GainNode
  analyser: AnalyserNode
}

export type Levels = { bass: number; mid: number; high: number; energy: number }

let engine: Engine | null = null
let mic: { stream: MediaStream; node: MediaStreamAudioSourceNode } | null = null
const current: Levels = { bass: 0, mid: 0, high: 0, energy: 0 }
let freq = new Uint8Array(0)
let loop = 0

// Tiny store so React UI can follow which sources are on.
type Sources = { synth: boolean; player: boolean; mic: boolean }
let sources: Sources = { synth: false, player: false, mic: false }
const listeners = new Set<() => void>()
export const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
export const getSources = () => sources
export const getServerSources = (): Sources => ({ synth: false, player: false, mic: false })
export function setSource(name: keyof Sources, on: boolean) {
  if (sources[name] === on) return
  sources = { ...sources, [name]: on }
  listeners.forEach((fn) => fn())
}

export const audioSupported = () => typeof window !== 'undefined' && 'AudioContext' in window

// Must be called from a user gesture the first time (browser autoplay rules).
export function getEngine(): Engine {
  if (!engine) {
    const ctx = new AudioContext()
    const out = ctx.createGain()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    analyser.smoothingTimeConstant = 0.75
    out.connect(ctx.destination)
    out.connect(analyser)
    engine = { ctx, out, analyser }
    freq = new Uint8Array(analyser.frequencyBinCount)
    startLoop()
  }
  if (engine.ctx.state === 'suspended') engine.ctx.resume()
  return engine
}

export function peekEngine() {
  return engine
}

export function levels(): Levels {
  return current
}

function band(fromHz: number, toHz: number) {
  const e = engine!
  const hzPerBin = e.ctx.sampleRate / e.analyser.fftSize
  const a = Math.max(1, Math.floor(fromHz / hzPerBin))
  const b = Math.min(freq.length - 1, Math.ceil(toHz / hzPerBin))
  let sum = 0
  for (let i = a; i <= b; i++) sum += freq[i]
  return sum / ((b - a + 1) * 255)
}

// Reads the analyser once per frame, smooths it, and exposes it to CSS as
// --bass / --mid / --high / --energy on <html> so stylesheets can react too.
function startLoop() {
  const root = document.documentElement
  const tick = () => {
    loop = requestAnimationFrame(tick)
    if (!engine) return
    engine.analyser.getByteFrequencyData(freq)
    const raw = { bass: band(30, 160), mid: band(160, 2000), high: band(2000, 10000) }
    for (const k of ['bass', 'mid', 'high'] as const) {
      const target = Math.min(1, raw[k] * 1.6)
      // fast attack, slow release
      current[k] += (target - current[k]) * (target > current[k] ? 0.6 : 0.12)
    }
    current.energy = current.bass * 0.5 + current.mid * 0.35 + current.high * 0.15
    root.style.setProperty('--bass', current.bass.toFixed(3))
    root.style.setProperty('--mid', current.mid.toFixed(3))
    root.style.setProperty('--high', current.high.toFixed(3))
    root.style.setProperty('--energy', current.energy.toFixed(3))
  }
  cancelAnimationFrame(loop)
  loop = requestAnimationFrame(tick)
}

export async function startMic() {
  const e = getEngine()
  if (mic) return
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
  })
  const node = e.ctx.createMediaStreamSource(stream)
  node.connect(e.analyser) // analyser only: no feedback through the speakers
  mic = { stream, node }
  setSource('mic', true)
}

export function stopMic() {
  if (!mic) return
  mic.node.disconnect()
  mic.stream.getTracks().forEach((t) => t.stop())
  mic = null
  setSource('mic', false)
}
