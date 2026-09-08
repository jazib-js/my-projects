// --- Config (tweakable) ---
const CUSTOM_CURSOR = true;
const DIM_PAST_STOPS = true;

// --- Content ---
const stopsData = [
  { id: 's1', date: 'August, 2024', note: "I found you online. Or maybe you found me. Either way, something walked in without knocking and rearranged everything.", icon: 'star', song: {
    title: 'Apnaa Mujhe Tu Lagaa',
    artist: 'Sonu Nigam',
    hasPlayer: true,
    audioSrc: 'audio/apnaa-mujhe-tu-lagaa.mp3',
    clipStart: 36,
    clipEnd: 184,
    lyrics: [
      { time: 36, text: 'Anjaane ho tum, jo begaane ho tum' },
      { time: 40, text: 'Jo pehchaane lagte ho kyun' },
      { time: 42, text: 'Tum gehri neendon mein jab soye soye ho' },
      { time: 45, text: 'Toh mujhme jagte ho kyun' },
      { time: 48, text: 'Jab tujhko paata hai dil muskuraata hai' },
      { time: 51, text: 'Kya tujhse hai waasta' },
      { time: 54, text: 'Kya tujhme dhoondoon main' },
      { time: 56, text: 'Kya tujhse chaahoon main' },
      { time: 58, text: 'Kya hai tujhme mera' },
      { time: 59, text: 'Jaanoon na main' },
      { time: 60, text: 'Tujhse mera hissa hai kya' },
      { time: 66, text: 'Pr ajnabi apna mujhe tu lagaa' },
      { time: 71, text: 'Jaanoon na main' },
      { time: 73, text: 'Tujhse mera rishta hai kya' },
      { time: 77, text: 'Pr ajnabi apna mujhe tu lagaa' },
      { time: 112, text: 'Tujhse taalluq jo nahi kuch mera' },
      { time: 118, text: 'Kyun tu lage hai apna sa' },
      { time: 124, text: 'Dekhoon jo tujhko ek nazar jaaye bhar' },
      { time: 130, text: 'Mujhme hai mera, mera jo khaza' },
      { time: 134, text: 'Zindagi mein khushi tere aane se hai' },
      { time: 140, text: 'Warna jeene mein gam har bahaane se hai' },
      { time: 147, text: 'Yeh alag baat hai hum mile aaj hai' },
      { time: 153, text: 'Dil tujhe jaanta ek zamaane se hai' },
      { time: 159, text: 'Jaanoon na main tujhme' },
      { time: 161, text: 'Mera hissa hai kya' },
      { time: 166, text: 'Pr Ajnabi apna mujhe tu lagaa' },
      { time: 170, text: 'Jaanoon na main tujhse mera rishta hai kya' },
      { time: 176, text: 'Pr Ajnabi apna mujhy tu laga' },
    ],
  } },
  { id: 's2', date: 'The first weeks', note: "I had been fine before you. That was the problem — I had gotten so good at fine. And then you came along and fine stopped being enough.", icon: 'spark', song: null },
  { id: 's3', date: 'Somewhere in the middle', note: "It wasn't one moment. It was the accumulation of small ones — the way you read me without asking me to explain myself. Like you already spoke the language.", icon: 'moon', song: { title: '— song title —', artist: '— artist —', quote: '— paste a line about knowing, quietly and all at once —', href: '#' } },
  { id: 's4', date: 'The real part', note: "We fought. We came back. Every single time, we came back. That's not nothing. That's actually everything.", icon: 'repair', song: null },
  { id: 's5', date: 'What I keep', note: "Your hands fit in mine like they didn't have to learn the shape. Like some part of us already knew.", icon: 'rings', song: null },
  { id: 's6', date: 'August, 2025', note: "You're far now. Different timezone, different morning. But I still reach for you first — across bad connections, across the silence between one person's night and another person's day. Same love. Different gravity.", icon: 'phone', song: { title: '— song title —', artist: '— artist —', quote: '— paste a line here about distance, or choosing someone anyway —', href: '#' } },
  { id: 's7', date: 'Always', note: "I'm not the man I want to be yet. But I'm becoming him. For you. Because of you.", icon: 'ring', song: { title: '— song title —', artist: '— artist —', quote: '— paste a closing line here, a promise kind of line —', href: '#' } },
];

// --- Icons (26x26, viewBox 0 0 28 28, stroke/fill oklch(52% 0.14 14)) ---
const ICONS = {
  star: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6" stroke-linejoin="round"><path d="M14 2 L17 10 L26 10 L18.5 15.5 L21.5 24 L14 18.5 L6.5 24 L9.5 15.5 L2 10 L11 10 Z"></path></svg>',
  spark: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6" stroke-linecap="round"><line x1="14" y1="2" x2="14" y2="26"></line><line x1="2" y1="14" x2="26" y2="14"></line><line x1="5" y1="5" x2="23" y2="23"></line><line x1="23" y1="5" x2="5" y2="23"></line></svg>',
  moon: '<svg width="26" height="26" viewBox="0 0 28 28" fill="oklch(52% 0.14 14)"><path d="M18,4 A10,10 0 1,0 18,24 A8,8 0 1,1 18,4 Z"></path></svg>',
  repair: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6" stroke-linecap="round"><path d="M6,16 A9,9 0 1,1 10,22.5"></path><polygon points="10,22.5 4,22 7,17" fill="oklch(52% 0.14 14)" stroke="none"></polygon></svg>',
  rings: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6"><circle cx="10" cy="14" r="7"></circle><circle cx="18" cy="14" r="7"></circle></svg>',
  phone: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="3" width="10" height="22" rx="2"></rect><line x1="12" y1="21" x2="16" y2="21"></line></svg>',
  ring: '<svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="oklch(52% 0.14 14)" stroke-width="1.6"><circle cx="14" cy="18" r="7"></circle><rect x="10.5" y="2" width="7" height="7" transform="rotate(45 14 5.5)" fill="oklch(72% 0.11 20)" stroke="none"></rect></svg>',
};

const CASSETTE_ICON = '<svg width="26" height="20" viewBox="0 0 28 20" fill="none" stroke="oklch(42% 0.13 12)" stroke-width="1.4"><rect x="1" y="1" width="26" height="18" rx="2"></rect><circle cx="9" cy="10" r="3"></circle><circle cx="19" cy="10" r="3"></circle><rect x="11" y="8.5" width="6" height="3" fill="oklch(42% 0.13 12)" stroke="none"></rect></svg>';

const PLAY_ICON = '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke="oklch(32% 0.13 10)" stroke-width="1.4"></circle><polygon points="8,6 8,14 15,10" fill="oklch(32% 0.13 10)"></polygon></svg>';

const PAUSE_ICON = '<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="none" stroke="oklch(32% 0.13 10)" stroke-width="1.4"></circle><rect x="7" y="6" width="2.2" height="8" fill="oklch(32% 0.13 10)"></rect><rect x="10.8" y="6" width="2.2" height="8" fill="oklch(32% 0.13 10)"></rect></svg>';

// --- Road path: anchors alternate x (16/64 in an 80-wide viewBox) at each
// stop's center y. Cubic beziers with control points held at each endpoint's
// own x guarantee the curve passes exactly through every anchor. ---
function buildPath(n) {
  const anchors = [];
  for (let i = 0; i < n; i++) anchors.push({ x: i % 2 === 0 ? 16 : 64, y: i * 100 + 50 });

  let d = `M${anchors[0].x},0`;
  let prevX = anchors[0].x, prevY = 0;
  anchors.forEach((p) => {
    const midY = (prevY + p.y) / 2;
    d += ` C${prevX},${midY} ${p.x},${midY} ${p.x},${p.y}`;
    prevX = p.x; prevY = p.y;
  });
  d += ` C${prevX},${prevY + 50} ${prevX},${n * 100} ${prevX},${n * 100}`;
  return { d, anchors };
}

// --- State ---
const state = {
  visible: {},
  activeId: null,
  expandedSong: null,
};

const stopRefs = {};
const nodeRefs = {};

function updateNode(id, isActive) {
  const el = nodeRefs[id];
  if (!el) return;
  el.style.width = isActive ? '14px' : '10px';
  el.style.height = isActive ? '14px' : '10px';
  el.style.background = isActive ? 'oklch(62% 0.17 8)' : 'oklch(58% 0.16 12)';
}

function updateRow(id) {
  const el = stopRefs[id];
  if (!el) return;
  const isVisible = !!state.visible[id];
  const isActive = state.activeId === id;
  const opacity = !isVisible ? 0 : (DIM_PAST_STOPS ? (isActive ? 1 : 0.55) : 1);
  el.style.opacity = opacity;
  el.style.transform = isVisible ? 'translateY(0)' : 'translateY(22px)';
}

function setActive(id) {
  const prevActive = state.activeId;
  state.activeId = id;
  if (prevActive) {
    updateNode(prevActive, false);
    updateRow(prevActive);
  }
  updateNode(id, true);
  updateRow(id);
}

function toggleSong(id, card, trigger) {
  const wasOpen = state.expandedSong === id;
  if (state.expandedSong && state.expandedSong !== id) {
    const prevCard = stopRefs[`song-${state.expandedSong}`];
    if (prevCard) {
      if (prevCard._audio) prevCard._audio.pause();
      prevCard.remove();
    }
  }
  state.expandedSong = wasOpen ? null : id;
  if (wasOpen) {
    if (card._audio) card._audio.pause();
    if (card.parentNode) card.remove();
  } else {
    trigger.parentNode.appendChild(card);
    stopRefs[`song-${id}`] = card;
  }
}

// Plays the [clipStart, clipEnd) window of the track. Each lyric line carries
// its own timestamp, so the active line is whichever one's time has most
// recently passed (it stays lit through instrumental gaps until the next
// line's cue arrives). The active line is kept centered in a fixed-height
// window by measuring its real offset and sliding the track to match —
// robust to wrapped/variable-length lines, unlike a fixed per-line height.
function wirePlayer(card, song) {
  const audio = new Audio(song.audioSrc);
  audio.preload = 'none';
  card._audio = audio;

  const btn = card.querySelector('.song-play-btn');
  const playIconWrap = card.querySelector('.play-icon-wrap');
  const pauseIconWrap = card.querySelector('.pause-icon-wrap');
  const label = card.querySelector('.song-play-label');
  const viewport = card.querySelector('.lyrics-viewport');
  const track = card.querySelector('.lyrics-track');
  const lyricLines = card.querySelectorAll('.lyric-line');

  function setPlayingUI(isPlaying) {
    playIconWrap.hidden = isPlaying;
    pauseIconWrap.hidden = !isPlaying;
    label.textContent = isPlaying ? 'pause' : 'play song';
  }

  function activeIndexFor(t) {
    let idx = -1;
    for (let i = 0; i < song.lyrics.length; i++) {
      if (song.lyrics[i].time <= t) idx = i; else break;
    }
    return idx;
  }

  function resetView() {
    lyricLines.forEach((el) => el.classList.remove('active'));
    track.style.transform = 'translateY(0)';
  }

  function updateLyrics(t) {
    const idx = activeIndexFor(t);
    lyricLines.forEach((el, i) => el.classList.toggle('active', i === idx));
    if (idx === -1) {
      track.style.transform = 'translateY(0)';
      return;
    }
    const activeEl = lyricLines[idx];
    const centerOffset = activeEl.offsetTop - (viewport.clientHeight / 2 - activeEl.offsetHeight / 2);
    track.style.transform = `translateY(${-centerOffset}px)`;
  }

  // timeupdate only fires a few times a second, which reads as visible lag
  // against the vocal; a rAF loop checks every frame instead so the
  // highlight/scroll starts the instant a line's timestamp is reached.
  let rafId = null;

  function tick() {
    if (audio.currentTime >= song.clipEnd) {
      audio.pause();
      audio.currentTime = song.clipStart;
      resetView();
      return;
    }
    updateLyrics(audio.currentTime);
    rafId = requestAnimationFrame(tick);
  }

  audio.addEventListener('play', () => {
    setPlayingUI(true);
    rafId = requestAnimationFrame(tick);
  });
  audio.addEventListener('pause', () => {
    setPlayingUI(false);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  btn.addEventListener('click', () => {
    if (audio.paused) {
      if (audio.currentTime < song.clipStart || audio.currentTime >= song.clipEnd) {
        audio.currentTime = song.clipStart;
        resetView();
      }
      audio.play();
    } else {
      audio.pause();
    }
  });
}

function render() {
  const roadContainer = document.getElementById('roadContainer');
  const roadSvg = document.getElementById('roadSvg');
  const roadPath = document.getElementById('roadPath');
  const nodesLayer = document.getElementById('nodesLayer');
  const stopsLayer = document.getElementById('stopsLayer');

  const n = stopsData.length;
  roadSvg.setAttribute('viewBox', `0 0 80 ${n * 100}`);
  const { d, anchors } = buildPath(n);
  roadPath.setAttribute('d', d);

  stopsData.forEach((stop, i) => {
    const anchor = anchors[i];

    // Node
    const node = document.createElement('div');
    node.className = 'stop-node';
    node.style.left = `${anchor.x}px`;
    node.style.top = `${(anchor.y / (n * 100)) * 100}%`;
    node.style.width = '10px';
    node.style.height = '10px';
    node.style.background = 'oklch(58% 0.16 12)';
    nodesLayer.appendChild(node);
    nodeRefs[stop.id] = node;

    // Row
    const row = document.createElement('div');
    row.className = 'stop-row';
    row.setAttribute('data-stop-id', stop.id);

    const dateEl = document.createElement('div');
    dateEl.className = 'stop-date';
    dateEl.textContent = stop.date;
    row.appendChild(dateEl);

    if (stop.icon && ICONS[stop.icon]) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'stop-icon';
      iconWrap.innerHTML = ICONS[stop.icon];
      row.appendChild(iconWrap);
    }

    const noteEl = document.createElement('p');
    noteEl.className = 'stop-note';
    noteEl.textContent = stop.note;
    row.appendChild(noteEl);

    if (stop.song) {
      const songWrap = document.createElement('div');
      songWrap.className = 'song-wrap';

      const trigger = document.createElement('div');
      trigger.className = 'song-trigger';
      trigger.innerHTML = `${CASSETTE_ICON}<span class="song-trigger-label">play the song</span>`;
      songWrap.appendChild(trigger);
      row.appendChild(songWrap);

      const card = document.createElement('div');
      card.className = 'song-card';

      if (stop.song.hasPlayer) {
        const lyricsHTML = stop.song.lyrics
          .map((line, i) => `<p class="lyric-line" data-line-index="${i}">${line.text}</p>`)
          .join('');
        card.innerHTML = `
          <div class="song-title">${stop.song.title} <span class="song-artist">— ${stop.song.artist}</span></div>
          <div class="lyrics-viewport">
            <div class="lyrics-track">${lyricsHTML}</div>
          </div>
          <button type="button" class="song-play-btn" aria-label="Play song">
            <span class="play-icon-wrap">${PLAY_ICON}</span>
            <span class="pause-icon-wrap" hidden>${PAUSE_ICON}</span>
            <span class="song-play-label">play song</span>
          </button>
        `;
        wirePlayer(card, stop.song);
      } else {
        card.innerHTML = `
          <div class="song-title">${stop.song.title} <span class="song-artist">— ${stop.song.artist}</span></div>
          <p class="song-quote">"${stop.song.quote}"</p>
          <a class="song-listen" href="${stop.song.href}" target="_blank" rel="noopener">${PLAY_ICON}listen</a>
        `;
      }

      trigger.addEventListener('click', () => toggleSong(stop.id, card, trigger));
    }

    stopsLayer.appendChild(row);
    stopRefs[stop.id] = row;
  });
}

function observeStops() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('data-stop-id');
      if (entry.isIntersecting) {
        state.visible[id] = true;
        setActive(id);
      }
    });
  }, { threshold: 0, rootMargin: '-42% 0px -42% 0px' });

  Object.keys(stopRefs).forEach((id) => {
    const el = stopRefs[id];
    if (el) observer.observe(el);
  });
}

function renderParticles() {
  const layer = document.getElementById('particlesLayer');
  for (let i = 0; i < 22; i++) {
    const left = (i * 37) % 100;
    const top = 50 + ((i * 53) % 50);
    const delay = (i % 10) * 0.8;
    const dur = 10 + (i % 6) * 1.8;
    const size = 2 + (i % 3);

    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.left = `${left}%`;
    dot.style.top = `${top}%`;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.animation = `drift ${dur}s ease-in ${delay}s infinite`;
    layer.appendChild(dot);
  }
}

function setupCursor() {
  if (!CUSTOM_CURSOR) return;
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!mq.matches) return;

  document.body.classList.add('custom-cursor');
  const dot = document.getElementById('cursorDot');
  let on = false;

  window.addEventListener('mousemove', (e) => {
    if (!on) {
      on = true;
      dot.style.opacity = '1';
    }
    dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
  });
}

function init() {
  render();
  observeStops();
  renderParticles();
  setupCursor();
}

document.addEventListener('DOMContentLoaded', init);
