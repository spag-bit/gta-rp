import { useEffect, useRef } from 'react'

// Full-screen "digital rain" canvas that sits behind everything.
export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const glyphs = 'アカサタナハマヤラワ0123456789ABCDEFXYZ#$%@&{}<>'.split('')
    const fontSize = 16
    let columns = 0
    let drops = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * canvas.height) / fontSize)
      )
    }

    const draw = () => {
      // translucent black fade = trailing tails
      ctx.fillStyle = 'rgba(5, 7, 6, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        // occasional bright leading glyph
        ctx.fillStyle = Math.random() > 0.975 ? '#d6ffe0' : '#00ff41'
        ctx.fillText(text, x, y)
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix" aria-hidden="true" />
}
