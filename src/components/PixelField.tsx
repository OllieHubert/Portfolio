import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  trail: { x: number; y: number }[]
}

const COLORS = ['#2de2e6', '#ff2e97', '#b8ff3c', '#ff9f1c', '#ffe566']

export function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let raf = 0
    let particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn(Math.max(10, Math.floor(window.innerWidth / 120)))
    }

    const spawn = (count: number) => {
      particles = Array.from({ length: count }, () => makeParticle())
    }

    const makeParticle = (): Particle => {
      const dir = Math.random() > 0.5 ? 1 : -1
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (0.35 + Math.random() * 0.9) * dir,
        vy: (Math.random() - 0.5) * 0.45,
        size: 2 + Math.floor(Math.random() * 3) * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // soft vignette grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth = 1
      const step = 24
      for (let x = 0; x < window.innerWidth; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, window.innerHeight)
        ctx.stroke()
      }
      for (let y = 0; y < window.innerHeight; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(window.innerWidth, y)
        ctx.stroke()
      }

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -40) p.x = window.innerWidth + 20
          if (p.x > window.innerWidth + 40) p.x = -20
          if (p.y < -40 || p.y > window.innerHeight + 40) {
            p.y = Math.random() * window.innerHeight
          }
          p.trail.unshift({ x: p.x, y: p.y })
          if (p.trail.length > 18) p.trail.pop()
        }

        for (let i = p.trail.length - 1; i >= 0; i--) {
          const t = p.trail[i]
          const alpha = 1 - i / p.trail.length
          ctx.fillStyle = hexToRgba(p.color, alpha * 0.55)
          const s = Math.max(2, p.size - Math.floor(i / 4) * 2)
          ctx.fillRect(Math.round(t.x / 2) * 2, Math.round(t.y / 2) * 2, s, s)
        }

        ctx.fillStyle = p.color
        ctx.fillRect(Math.round(p.x / 2) * 2, Math.round(p.y / 2) * 2, p.size, p.size)
      }

      if (!reduced) {
        frame += 1
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      void frame
    }
  }, [])

  return (
    <div className="pixel-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
