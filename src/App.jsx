import { useEffect, useState } from 'react'
import MatrixRain from './MatrixRain.jsx'

/* ───────────────────────────────────────────────────────────────
   VIDEO CONFIG  —  local file from the assets folder.

   Video lives in  public/asset/  and is served from the site root, so
   public/asset/video.mp4  is referenced below as /asset/video.mp4
─────────────────────────────────────────────────────────────── */
const VIDEO_SRC = '/asset/video.mp4'  // your local video
const POSTER_SRC = ''                  // optional: '/asset/poster.jpg'

const BOOT_LINES = [
  '> initializing secure channel...',
  '> routing through 7 proxies ......... [OK]',
  '> identity: REDACTED',
  '> we are legion.',
]

function Typewriter({ text, speed = 38, className }) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
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
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <MatrixRain />
      <div className="scanlines" aria-hidden="true" />

      <main className="shell">
        <header className="hero">
          <div className="mask" aria-hidden="true">𝅓</div>
          <h1 className="glitch" data-text="ANONYMOUS">ANONYMOUS</h1>
          <p className="tagline">
            We are Anonymous. We are Legion. We do not forgive. We do not forget.
          </p>
          <ul className="boot">
            {BOOT_LINES.map((l) => (
              <li key={l}>{l}</li>
            ))}
            <li>
              {booted
                ? <Typewriter text="> access granted. expect us." />
                : <span className="dim">&gt; authenticating<span className="dots" /></span>}
            </li>
          </ul>
        </header>

        <section className="terminal" aria-label="broadcast">
          <div className="bar">
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
            <span className="path">~/broadcast/video.mp4</span>
          </div>
          <div className="video">
            <video
              src={VIDEO_SRC}
              poster={POSTER_SRC || undefined}
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="manifesto">
          <h2>// MANIFESTO</h2>
          <p>
            Information wants to be free. Knowledge is power, and power belongs to
            no single hand. This signal is broadcast to anyone listening in the dark.
          </p>
          <div className="grid">
            <div className="card"><span className="k">01</span><p>Stay anonymous.</p></div>
            <div className="card"><span className="k">02</span><p>Question everything.</p></div>
            <div className="card"><span className="k">03</span><p>Protect the signal.</p></div>
          </div>
        </section>

        <footer className="foot">
          <span>// no names. no faces. only the message.</span>
          <span className="blink">●&nbsp;LIVE</span>
        </footer>
      </main>
    </>
  )
}
