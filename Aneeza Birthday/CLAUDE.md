# Aneeza Birthday

A single-page, vertical-scroll birthday website. A hand-drawn dotted road runs
down the page with scroll-revealed stops (title, date, note, icon, an
expandable "read the letter" panel, optional song card), ending in a
full-screen message over a drifting-particle background. Built from a design
handoff, later revised in a Claude.ai chat and handed back as an
"UPDATE_PROMPT" + updated `.dc.html` reference (uploaded once each, not
stored in this repo) — treat the most recent uploaded `.dc.html`'s literal
values as ground truth over any prose summary describing it (a prose summary
has been wrong about what actually changed at least once already — always
diff the literal file, don't trust the changelog blindly).

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

- **v2 palette (current, hex)**: page bg `#DBD2C9`, body ink/final message
  `#63131C`, road/date-label/artist ink `#9F6162` (at .6/.65/.7 alpha for the
  small-caps labels), icon stroke/fill `#7F1D25`, song-card bg `#E6C9CA` /
  border `#CD9395`, node dot `#CD9395` (`#7F1D25` active), final-screen bg
  `#E3CFC8`, cursor dot `#63131C`. The ring icon's diamond is the one token
  left as literal `oklch(72% 0.11 20)` in the source `.dc.html` — matched as-is
  rather than converted, since that's what the reference file actually has.
  (v1 used an oklch palette — see git history if it's ever needed again.)
- Fonts: Jost 300 (labels, uppercase, letter-spaced), Lora (notes/letters/
  lyrics, serif italic for quotes), Caveat (handwriting accents — stop
  titles, song titles, trigger labels).
- Road: SVG cubic-bezier path, anchors alternate x=16/64 in an 80-wide
  viewBox, one anchor per stop — regenerates automatically from
  `stopsData.length` in `buildPath()`.

## "Read the letter" panel (per stop, `fullLetter` field)

Every stop has a `fullLetter` string (real text, `''` for an intentionally
empty-but-present letter, or a `'— write the full letter for this stop here —'`
placeholder) and an envelope-icon trigger that toggles a `position: fixed`
panel showing the full text. Key constraints, easy to break by "simplifying":

- The panel is built and appended to `#lettersLayer`, a **top-level sibling**
  of `.road-container` — never nested inside a `.stop-row`. The row has an
  animated `transform` for its scroll-reveal, and a transformed ancestor
  breaks `position: fixed` on any descendant.
- Position is computed live from the row's `getBoundingClientRect()` in
  `positionLetterPanel()`: beside the row (right side) if there's ≥432px of
  room to its right, otherwise centered (`top: 10vh`, width
  `min(420px, 92vw)`). Recomputed on `scroll`/`resize` while open (one shared
  listener, torn down when no letter is open — see
  `ensure/teardownLetterRepositionListener`).
- Only one letter open at a time (`state.expandedLetter`), independent of
  `state.expandedSong` — both can be open together.
- The trigger's envelope flap SVG path changes shape (angled when closed,
  flat when open) via `envelopeIcon(isOpen)` — driven by an explicit
  boolean passed at open/close time, not read back from shared state (an
  earlier draft did that and got the icon backwards on the *previous* stop
  when switching directly from one open letter to another).

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
- **plain `{ title, artist, quote, translation?, href }`** (opens `href` in a
  new tab instead of playing in-page; optional `translation` renders as a
  third line in Jost below the italic Lora quote). This is the base design's
  actual card style — the in-page player above is an addition built
  specifically for `s1` at the user's request, not part of the original spec.
  Stops `s2`/`s3` now have real title/artist/quote/translation (from the v2
  chat update) but still placeholder `href: '#'` links. Stops `s6`/`s7` are
  still fully placeholder (`— song title —` etc.), waiting on real
  audio + timestamped lyrics + clip range the same way `s1` got them.

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
