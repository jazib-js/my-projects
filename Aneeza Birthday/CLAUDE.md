# Aneeza Birthday

A single-page, vertical-scroll birthday website. A hand-drawn dotted road runs
down the page with scroll-revealed stops (date, note, icon, optional song
card), ending in a full-screen message over a drifting-particle background.
Built from a design handoff (`design_handoff_aneeza_birthday/README.md`,
uploaded once, not stored in this repo) — treat that spec's colors, type, and
spacing as final unless told otherwise.

## Files

- `index.html`, `style.css`, `script.js` — the real source. Edit these.
- `aneeza-birthday.html` — a single-file build (CSS/JS inlined) for
  drag-and-drop static hosting (Netlify). **Generated, do not hand-edit.**
  Run `node build.js` after any change to the three source files.
- `audio/` — mp3s referenced by relative path from `script.js`. When
  deploying `aneeza-birthday.html` to Netlify, this folder must ship
  alongside it (as `index.html` + `audio/` together) — the relative path
  breaks if only the single HTML file is uploaded.

## Design tokens (do not change without being asked)

- Palette is oklch: page bg `90% 0.025 22`, body ink `20% 0.03 15`, road/label
  ink `32% 0.045 18`, accent/link `32% 0.13 10`, node dot `58% 0.16 12`
  (`62% 0.17 8` active).
- Fonts: Jost 300 (labels, uppercase, letter-spaced), Lora (notes/lyrics,
  serif italic for quotes), Caveat (handwriting accents, song titles).
- Road: SVG cubic-bezier path, anchors alternate x=16/64 in an 80-wide
  viewBox, one anchor per stop — regenerates automatically from
  `stopsData.length` in `buildPath()`.

## Song card pattern (per stop, in `stopsData` in `script.js`)

Two shapes coexist:

- **`hasPlayer: true`** (in-page player, no redirect) — needs `audioSrc`,
  `clipStart`/`clipEnd` (seconds, absolute position in the track), and
  `lyrics: [{ time, text }, ...]` with **absolute** per-line timestamps
  (same coordinate space as clipStart/clipEnd, not relative offsets). The
  active line is whichever line's `time` has most recently passed — it
  stays lit through instrumental gaps until the next cue. Highlight/scroll
  logic runs on `requestAnimationFrame` (not `timeupdate`, which is too
  coarse and reads as lag). Currently wired for stop `s1` only.
- **plain `{ title, artist, quote, href }`** (old style — opens `href` in a
  new tab instead of playing in-page). Still used by stops `s3`, `s6`, `s7`,
  which are placeholders (`— song title —` etc.) waiting on real
  audio + timestamped lyrics + clip range from the user.

When given new timestamps for a stop: convert `mm:ss` to seconds, watch for
timestamps that arrived out of order or drift wider than they should
line-to-line (this has caused real, reported sync bugs before — a
transcription/typo issue, not a rendering one) — flag anomalies rather than
silently guessing.

## Testing note

This sandbox has no real audio output device — `HTMLMediaElement.currentTime`
seeks don't reliably stick, so real `<audio>` playback can't be exercised
end-to-end here. To verify player logic, stub `window.Audio` with an
`EventTarget`-backed fake class (via Playwright's `page.addInitScript`)
that mimics `play()`/`pause()`/`currentTime` — this tests the real
highlight/scroll logic without needing actual audio decoding.
