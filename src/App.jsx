import { useEffect, useMemo, useState } from 'react'
import MatrixRain from './MatrixRain.jsx'

const VIDEO_SRC = 'https://www.youtube.com/watch?v=Aq5WXmQQooo'

const BOOT_LINES = [
  '> detecting poor life choices...',
  '> loading maximum chaos...',
  '> rick has entered the chat...',
  '> preparing the classic bait...',
]

function Typewriter({ text, speed = 42, className }) {
  const [out, setOut] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={className}>
      {out}
      <span className="caret">▋</span>
    </span>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const iframe = document.querySelector('iframe[src*="youtube.com"]')
    if (iframe) {
      iframe.src = muted
        ? 'https://www.youtube.com/embed/Aq5WXmQQooo?autoplay=1&mute=1&loop=1&playlist=Aq5WXmQQooo&controls=0&modestbranding=1'
        : 'https://www.youtube.com/embed/Aq5WXmQQooo?autoplay=1&loop=1&playlist=Aq5WXmQQooo&controls=0&modestbranding=1'
    }
  }, [muted])

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const memeFacts = useMemo(
    () => [
      'Never gonna give you up',
      'Never gonna let you down',
      'Never gonna run around',
      'And desert you',
    ],
    [],
  )

  return (
    <>
      <MatrixRain />
      <div className="scanlines" aria-hidden="true" />

      <main className="shell troll-shell">
        <header className="hero troll-hero">
          <div className="mask" aria-hidden="true">🎵</div>
          <p className="eyebrow">MEME PROTOCOL // ACTIVE</p>
          <h1 className="glitch" data-text="RICKROLL">RICKROLL</h1>
          <p className="tagline">
            You clicked the page. The internet has chosen you. Prepare for maximum nostalgia.
          </p>

          <ul className="boot meme-boot">
            {BOOT_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>
              {booted ? (
                <Typewriter text="> loading: destiny.exe" className="meme-type" />
              ) : (
                <span className="dim">&gt; authenticating<span className="dots" /></span>
              )}
            </li>
          </ul>
        </header>

        <section className="terminal troll-terminal" aria-label="rickroll video">
          <div className="bar">
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
            <span className="path">~/meme/youve-been-rolled.mp4</span>
          </div>

          <div className="video troll-video">
            <iframe
              src="https://www.youtube.com/embed/Aq5WXmQQooo?autoplay=1&mute=1&loop=1&playlist=Aq5WXmQQooo&controls=0&modestbranding=1"
              title="Rickroll video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <div className="video-overlay">
              <span>YOU HAVE BEEN RICKROLLED</span>
            </div>
          </div>
        </section>

        <section className="meme-panel">
          <div className="meme-callout">
            <strong>Classic bait:</strong> this website was never about the content. It was always about the chaos.
          </div>

          <div className="grid meme-grid">
            {memeFacts.map((fact, index) => (
              <div key={fact} className="card meme-card">
                <span className="k">0{index + 1}</span>
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="troll-actions">
          <button type="button" className="primary" onClick={() => setMuted(false)}>
            {muted ? 'Unmute the chaos' : 'Chaos is loud'}
          </button>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer" className="secondary">
            Open the official trap
          </a>
        </div>

        <footer className="foot">
          <span>// no dignity. only vibes.</span>
          <span className="blink">●&nbsp;LIVE MEME FEED</span>
        </footer>
      </main>
    </>
  )
}
