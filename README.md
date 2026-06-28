# // ANONYMOUS — one-page React site

A single-page React (Vite) site with an "Anonymous" vibe: matrix digital-rain
background, glitch title, scanlines, and a terminal-framed YouTube embed.

## Run it

```bash
npm install      # already done
npm run dev      # local dev server -> http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Change the video — local file in the assets folder

1. Drop your video into `public/assets/` (e.g. `public/assets/transmission.mp4`).
2. Point `VIDEO_SRC` at it in `src/App.jsx` (top of file):

```js
const VIDEO_SRC = '/assets/transmission.mp4'  // your local video
const POSTER_SRC = ''                          // optional: '/assets/poster.jpg'
```

Anything inside `public/` is served from the site root, so
`public/assets/transmission.mp4` is referenced as `/assets/transmission.mp4`.
Use `.mp4` (H.264 + AAC) for the widest browser support.
