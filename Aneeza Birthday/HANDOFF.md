# Project Handoff — history, decisions, and what's left

This is a narrative summary of everything decided across the chat sessions
that built this project, so a fresh Claude Code session (local, cloud,
whichever) can pick up without the person re-explaining it. For technical
patterns (design tokens, the song-card data shapes, the letter-panel
positioning constraints), see `CLAUDE.md` instead — this file is about
*history and status*, that one is about *how the code works*.

## How this project came to be

1. **Original design handoff** — a `.dc.html` design reference + README
   describing a vertical-scroll birthday page: a hand-drawn road, scroll-
   revealed stops with a date/note/icon, expandable song cards, a final
   full-screen message, drifting particles, a custom cursor. Implemented as
   plain HTML/CSS/JS (`index.html` + `style.css` + `script.js`), matching the
   repo's existing convention for small projects.

2. **In-page song player, built for stop 1** — the base design only called
   for a short quoted lyric line + an external Spotify/YouTube link. At the
   user's request, stop 1 got a real upgrade instead: an actual `<audio>`
   clip player with per-line timestamped lyrics that scroll and highlight in
   sync, Spotify-style. This is *not* part of the original design spec — an
   addition built specifically because the user wanted real playback, not a
   redirect.

3. **A real timing bug, and the actual lesson from it** — the first set of
   timestamps for stop 1 (typed out by ear) started accurate but drifted
   wider than the real gaps between lines as the song went on, reaching a
   ~5 second lag by the ninth line. It looked like a rendering/animation bug
   at first (and got "fixed" once for that, incorrectly) before the real
   cause was found: the timestamps themselves needed correcting, not the
   code. **Lesson for future timestamp work**: don't assume small-looking
   per-line gaps are exactly right — a growing lag across a long list is a
   data problem, not a sync problem, even when it doesn't look like one at
   first.

4. **A "v2" redesign, done in a separate Claude.ai chat, handed back here**
   — the user worked out a set of changes in a regular Claude.ai
   conversation (title lines per stop, a "read the letter" expandable panel,
   a translation line under song quotes, new content for several stops, and
   a new color palette) and handed it back as an updated `.dc.html`
   reference + a written change list. **Important finding**: the written
   change list claimed the color palette was "unchanged," but the actual
   `.dc.html` file used different hex values throughout. The literal file
   was treated as ground truth over the prose description — worth
   remembering any time a written summary and an actual reference file
   disagree, trust the file.

5. **Stop 2 got its real song** — same treatment as stop 1's original
   upgrade, but deliberately smaller in scope: a real audio clip plays in
   place of the external link, but the on-screen text stayed as the short
   quote + translation that was already there, rather than expanding into a
   full scrolling multi-line lyric transcript like stop 1 has. This was a
   judgment call to keep the amount of quoted song lyric text on the page
   modest — worth keeping in mind for any future songs added the same way.

6. **Letter panel positioning bug, found and fixed** — the panel's
   "is there room to dock beside the row" check was based on space to the
   *right of the stop's own row* (inside the centered 760px content
   column). That meant on plenty of ordinary screen widths (roughly
   1280-1600px), there was never "enough room next to the row" even though
   the browser window plainly had space — the panel fell back to centered
   far more often than intended. Fixed by checking the *viewport's own
   width* once and, when there's room, docking the panel to the **screen's
   right edge** (`right: 24px`) instead of computing a position relative to
   the row. Only the vertical position still comes from the clicked stop's
   bounding rect. Worth remembering for any similar "position beside a
   centered column" UI in the future: measure against the viewport, not the
   column.

## Status per stop, as of now

| Stop | Title | Note/date | Letter | Song |
|---|---|---|---|---|
| s1 | ✅ real | ✅ real | ✅ real, full text | ✅ real — full player, timestamped scrolling lyrics |
| s2 | ✅ real | ✅ real | present but intentionally empty | ✅ real quote/translation + real audio clip; Spotify/YouTube link still `#` |
| s3 | ✅ real | ✅ real | present but intentionally empty | ✅ real quote/translation only; **no audio yet**; link still `#` |
| s4 | ✅ real | ✅ real | ⏳ placeholder text | none (by design) |
| s5 | ✅ real | ✅ real | ⏳ placeholder text | none (by design) |
| s6 | ✅ real | ✅ real | ⏳ placeholder text | ⏳ fully placeholder (`— song title —` etc.) |
| s7 | ✅ real | ✅ real | ⏳ placeholder text | ⏳ fully placeholder (`— song title —` etc.) |

The actual lyric text, letter text, and song data all live in `script.js`
(search for the stop's `id`) — not duplicated here.

## What's still outstanding

- **Stops 6 & 7**: need real audio files + clip timestamps to get a song at
  all (currently full placeholders).
- **Stop 3**: has real quote/artist/translation already, but no audio file
  yet — same upgrade stops 1 & 2 got, just needs the mp3 + timestamps.
- **Stops 2 & 3**: their Spotify/YouTube `href` links are still `#`.
- **Stops 4, 5, 6, 7**: still need their real "letter" text written (`s4`/
  `s5` currently hold a placeholder string; `s6`/`s7` too).

## Netlify deploy reminder

`aneeza-birthday.html` is a generated single-file build (`node build.js`
regenerates it from the three source files) — edit `index.html`/`style.css`/
`script.js`, never that file directly. When deploying, the `audio/` folder
must ship alongside it (as `index.html` + `audio/`, not just the one file),
or every song's audio 404s.
