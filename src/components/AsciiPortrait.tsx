'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { site } from '@/content/site'
import { audioSupported, getServerSources, getSources, levels, startMic, stopMic, subscribe } from '@/lib/audio'

// The artist as live ASCII. A photo (site.portrait) is converted to characters in
// the browser every frame. The head turns to look at the pointer, characters near
// the pointer glitch, and the buttons around the head are the way into the site.
// Whatever the site is playing (or hearing through the mic) drives it too: the head
// swells with the bass, the mids brighten it and the highs tear and glitch lines.
// If the photo is missing (or can't be read because of CORS) a drawn head is used.

const RAMP = ' .`:-=+*cox#%&@'
const GLITCH = '01<>/\\|{}[]#$%&*+=~'
const FONT_PX = 10
const CHAR_W = FONT_PX * 0.6
const LINE_H = FONT_PX

const buttons = [
  { label: 'WORK', href: '/#work', pos: 'left-0 top-[12%] sm:left-[4%]' },
  { label: 'LIVE', href: '/#live', pos: 'right-0 top-[12%] sm:right-[4%]' },
  { label: 'SOUND', href: '/#sound', pos: 'left-0 top-[55%]' },
  { label: 'ABOUT', href: '/#about', pos: 'right-0 top-[55%]' },
  { label: 'CONTACT', href: '/#contact', pos: 'bottom-[6%] right-0' },
]

// A shaded head and shoulders, used when there's no photo.
function drawFallbackHead(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')!
  g.fillStyle = '#000'
  g.fillRect(0, 0, w, h)
  const cx = w / 2
  // shoulders
  const sh = g.createRadialGradient(cx, h * 1.15, h * 0.1, cx, h * 1.15, h * 0.55)
  sh.addColorStop(0, '#bbb')
  sh.addColorStop(1, '#000')
  g.fillStyle = sh
  g.beginPath()
  g.ellipse(cx, h * 1.05, w * 0.42, h * 0.3, 0, 0, Math.PI * 2)
  g.fill()
  // neck
  g.fillStyle = '#777'
  g.fillRect(cx - w * 0.07, h * 0.62, w * 0.14, h * 0.18)
  // face
  const face = g.createRadialGradient(cx - w * 0.06, h * 0.36, h * 0.02, cx, h * 0.42, h * 0.3)
  face.addColorStop(0, '#fff')
  face.addColorStop(0.7, '#aaa')
  face.addColorStop(1, '#333')
  g.fillStyle = face
  g.beginPath()
  g.ellipse(cx, h * 0.42, w * 0.2, h * 0.26, 0, 0, Math.PI * 2)
  g.fill()
  // hair
  g.fillStyle = '#111'
  g.beginPath()
  g.ellipse(cx, h * 0.24, w * 0.22, h * 0.12, 0, Math.PI, Math.PI * 2)
  g.fill()
  // eyes, nose, mouth
  g.fillStyle = '#222'
  for (const dx of [-0.075, 0.075]) {
    g.beginPath()
    g.ellipse(cx + w * dx, h * 0.38, w * 0.035, h * 0.018, 0, 0, Math.PI * 2)
    g.fill()
  }
  g.fillStyle = '#555'
  g.beginPath()
  g.moveTo(cx, h * 0.4)
  g.lineTo(cx - w * 0.025, h * 0.49)
  g.lineTo(cx + w * 0.02, h * 0.49)
  g.fill()
  g.strokeStyle = '#333'
  g.lineWidth = h * 0.012
  g.beginPath()
  g.moveTo(cx - w * 0.06, h * 0.56)
  g.quadraticCurveTo(cx, h * 0.585, cx + w * 0.06, h * 0.56)
  g.stroke()
  return c
}

// Crop to the face, then build an equalization table from the crop's luminance so
// the face reads clearly against the background whatever the lighting.
function prepareSource(img: HTMLImageElement, w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d', { willReadFrequently: true })!
  const { x, y, w: cw, h: ch } = site.portrait.crop
  const sw = img.naturalWidth * cw
  const sh = img.naturalHeight * ch
  // cover-fit the crop into the square
  const s = Math.max(w / sw, h / sh)
  g.drawImage(img, img.naturalWidth * x, img.naturalHeight * y, sw, sh, (w - sw * s) / 2, (h - sh * s) / 2, sw * s, sh * s)
  const d = g.getImageData(0, 0, w, h).data // throws if the image is cross-origin without CORS
  return { canvas: c, lut: equalize(d) }
}

function equalize(d: Uint8ClampedArray) {
  const hist = new Array(256).fill(0)
  for (let i = 0; i < d.length; i += 4) hist[lum(d, i)]++
  const lut = new Uint8Array(256)
  let acc = 0
  const total = d.length / 4
  for (let v = 0; v < 256; v++) {
    acc += hist[v]
    lut[v] = Math.round((acc / total) * 255)
  }
  return lut
}

const lum = (d: Uint8ClampedArray, i: number) => (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) | 0

const IDENTITY = Uint8Array.from({ length: 256 }, (_, i) => i)

export default function AsciiPortrait() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLPreElement>(null)
  const pointer = useRef({ x: 0, y: 0, inside: false, down: false })
  const target = useRef<{ x: number; y: number } | null>(null) // a hovered button
  const [pressed, setPressed] = useState(false)
  const [colour, setColour] = useState(false)
  const colourRef = useRef(false)
  colourRef.current = colour
  const micOn = useSyncExternalStore(subscribe, () => getSources().mic, () => getServerSources().mic)
  const [micError, setMicError] = useState(false)
  const [canMic, setCanMic] = useState(false)
  useEffect(() => setCanMic(audioSupported() && !!navigator.mediaDevices?.getUserMedia), [])

  const toggleMic = async () => {
    if (micOn) return stopMic()
    try {
      setMicError(false)
      await startMic()
    } catch {
      setMicError(true)
    }
  }

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const g = canvas.getContext('2d')!
    const sampler = document.createElement('canvas')
    const sg = sampler.getContext('2d', { willReadFrequently: true })!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let source: HTMLCanvasElement | null = null
    let lut = IDENTITY
    let cols = 0
    let rows = 0
    let raf = 0
    let look = { x: 0, y: 0 }
    const start = performance.now()

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const prepared = prepareSource(img, 480, 480)
        source = prepared.canvas
        lut = prepared.lut
      } catch {
        source = drawFallbackHead(480, 480)
      }
    }
    img.onerror = () => {
      source = drawFallbackHead(480, 480)
    }
    img.src = site.portrait.src

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = stage.clientWidth * dpr
      canvas.height = stage.clientHeight * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.floor(stage.clientWidth / CHAR_W)
      rows = Math.floor(stage.clientHeight / LINE_H)
      sampler.width = cols
      sampler.height = rows
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!source || !cols || !rows) return
      const t = (now - start) / 1000
      const W = stage.clientWidth
      const H = stage.clientHeight
      const p = pointer.current
      const lv = levels()

      // Where the head wants to look, in -1..1.
      let aim = { x: 0, y: 0 }
      const btn = target.current
      if (btn) aim = { x: (btn.x / W) * 2 - 1, y: (btn.y / H) * 2 - 1 }
      else if (p.inside) aim = { x: (p.x / W) * 2 - 1, y: (p.y / H) * 2 - 1 }
      else if (!reduceMotion) aim = { x: Math.sin(t * 0.4) * 0.5, y: Math.sin(t * 0.27) * 0.2 }
      const ease = reduceMotion ? 1 : 0.08
      look = { x: look.x + (aim.x - look.x) * ease, y: look.y + (aim.y - look.y) * ease }

      // Fake a head turn: squash toward the look side and slide the image with it.
      const turn = 1 - Math.abs(look.x) * 0.12
      const size = Math.min(cols * CHAR_W, rows * LINE_H) * (1 + lv.bass * 0.1) // square area, in px
      const fw = (size / CHAR_W) * turn
      const fh = size / LINE_H
      sg.fillStyle = '#000'
      sg.fillRect(0, 0, cols, rows)
      sg.drawImage(
        source,
        (cols - fw) / 2 + look.x * cols * 0.05,
        (rows - fh) / 2 + look.y * rows * 0.04,
        fw,
        fh,
      )
      const px = sg.getImageData(0, 0, cols, rows).data

      g.clearRect(0, 0, W, H)
      g.font = `${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`
      g.textBaseline = 'top'

      const pc = p.x / CHAR_W
      const pr = p.y / LINE_H
      const radius = (p.down ? 12 : 7) + lv.bass * 6
      const hot: { c: number; r: number; ch: string }[] = []
      const colour = colourRef.current
      const sparkle = lv.energy * lv.energy * 0.1
      const bright = 1 + lv.mid * 0.5

      g.fillStyle = '#f2f0eb'
      for (let r = 0; r < rows; r++) {
        let line = ''
        // a horizontal tear on loud, bright moments
        const tear =
          lv.energy > 0.25 && Math.random() < lv.high * 0.2 ? (Math.random() - 0.5) * lv.energy * 60 : 0
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4
          let v = Math.min(1, (lut[lum(px, i)] / 255) * bright)
          if (v > 0.15 && Math.random() < sparkle) {
            hot.push({ c, r, ch: GLITCH[(Math.random() * GLITCH.length) | 0] })
            line += ' '
            continue
          }
          if (p.inside) {
            const dist = Math.hypot((c - pc) * 0.6, r - pr)
            if (dist < radius) {
              // a ripple around the pointer
              v = Math.max(0, Math.min(1, v + 0.35 * Math.cos(dist - t * 8) * (1 - dist / radius)))
              if (v > 0.12 && Math.random() < 0.35) {
                hot.push({ c, r, ch: GLITCH[(Math.random() * GLITCH.length) | 0] })
                line += ' '
                continue
              }
            }
          }
          const ch = RAMP[Math.min(RAMP.length - 1, (v * RAMP.length) | 0)]
          if (colour && ch !== ' ') {
            // the photo's own colour, lifted so dark areas still show
            const k = 0.6 + v
            g.fillStyle = `rgb(${Math.min(255, px[i] * k + 40)},${Math.min(255, px[i + 1] * k + 40)},${Math.min(255, px[i + 2] * k + 40)})`
            g.fillText(ch, c * CHAR_W + tear, r * LINE_H)
          }
          line += ch
        }
        if (!colour) g.fillText(line, tear, r * LINE_H)
      }
      g.fillStyle = '#ff2d2d'
      for (const h of hot) g.fillText(h.ch, h.c * CHAR_W, h.r * LINE_H)

      // The mini ASCII head that replaces the cursor.
      const cur = cursorRef.current
      if (cur) {
        cur.style.opacity = p.inside ? '1' : '0'
        cur.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const move = (e: React.PointerEvent) => {
    const r = stageRef.current!.getBoundingClientRect()
    pointer.current.x = e.clientX - r.left
    pointer.current.y = e.clientY - r.top
    pointer.current.inside = true
  }

  const aimAt = (el: HTMLElement | null) => {
    if (!el || !stageRef.current) {
      target.current = null
      return
    }
    const s = stageRef.current.getBoundingClientRect()
    const b = el.getBoundingClientRect()
    target.current = { x: b.left + b.width / 2 - s.left, y: b.top + b.height / 2 - s.top }
  }

  return (
    <div
      ref={stageRef}
      className="relative h-[62svh] min-h-[380px] w-full cursor-none select-none touch-none"
      onPointerMove={move}
      onPointerEnter={move}
      onPointerLeave={() => {
        pointer.current.inside = false
        pointer.current.down = false
        setPressed(false)
      }}
      onPointerDown={(e) => {
        move(e)
        pointer.current.down = true
        setPressed(true)
      }}
      onPointerUp={() => {
        pointer.current.down = false
        setPressed(false)
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" role="img" aria-label={`ASCII portrait of ${site.name}`} />

      <nav aria-label="Portrait menu">
        {buttons.map((b) => (
          <Link
            key={b.label}
            href={b.href}
            className={`absolute ${b.pos} cursor-none whitespace-pre bg-ink/70 px-2 py-1 font-mono text-sm text-paper transition-colors hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink sm:text-base`}
            onPointerEnter={(e) => aimAt(e.currentTarget)}
            onPointerLeave={() => aimAt(null)}
            onFocus={(e) => aimAt(e.currentTarget)}
            onBlur={() => aimAt(null)}
          >
            {`[ ${b.label} ]`}
          </Link>
        ))}
      </nav>

      <div className="absolute right-0 top-0 flex gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
        {canMic && (
          <button
            type="button"
            onClick={toggleMic}
            aria-pressed={micOn}
            title="Let the portrait listen to the room through your microphone"
            className="cursor-none bg-ink/70 px-2 py-1 text-paper/70 hover:text-signal"
          >
            {micError ? '[!] mic blocked' : micOn ? '[x] mic' : '[ ] mic'}
          </button>
        )}
        <button
          type="button"
          onClick={() => setColour((c) => !c)}
          aria-pressed={colour}
          className="cursor-none bg-ink/70 px-2 py-1 text-paper/70 hover:text-signal"
        >
          {colour ? '[x] colour' : '[ ] colour'}
        </button>
      </div>

      <pre
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 font-mono text-[10px] leading-[10px] text-signal opacity-0"
      >
        {pressed ? ' .-.\n(> <)\n |o|' : ' .-.\n(o o)\n |=|'}
      </pre>
    </div>
  )
}
