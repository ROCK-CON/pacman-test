# Changelog

All notable changes to this project are documented here.

---

## [1.3.0] — 2026-03-08
### Fixed
- **Diagonal movement** — entities now wait for pixel position to align with current tile before advancing. Eliminates all diagonal drift on direction changes.
- `movePixels()` moved inside the fixed-timestep loop to keep pixel coords in sync with tile coords on every logic tick.

### Added
- **Speed selector** (Slow / Normal / Fast) above the canvas, changeable at any time during play.
- Speed presets use only divisors of `TILE` (20) so pixel movement always lands exactly on tile boundaries.

---

## [1.2.0] — 2026-03-08
### Fixed
- **Game speed on high-refresh-rate screens** — replaced raw `requestAnimationFrame` loop with a fixed-timestep accumulator. Game logic now runs at exactly 60 ticks/sec on 60 Hz, 90 Hz and 120 Hz devices.

---

## [1.1.0] — 2026-03-08
### Added
- **Swipe gesture controls** for mobile and tablet (touchstart/touchend on canvas).
- Minimum swipe distance of 20 px to avoid accidental taps registering as swipes.
- Page scroll blocked while playing so swipes don't scroll the browser.
- Tap on canvas starts game from idle screen.
- Controls hint updated in HTML and start screen overlay.

---

## [1.0.1] — 2026-03-08
### Added
- Start screen overlay with blinking "Press any key or click to start" prompt.
- Instructions: controls, dot scoring, power pellet mechanic, ghost eating.
- Game transitions from `idle` → `playing` on any keypress, click, or tap.

---

## [1.0.0] — 2026-03-08
### Added
- Initial Pac-Man game — `index.html`, `style.css`, `game.js`.
- 28×31 tile maze with walls, dots, and power pellets.
- Animated Pac-Man (chomping mouth, rotates with direction).
- 4 ghosts: chase, scared (power pellet), eaten (return to house) modes.
- Ghost release timers — ghosts exit house progressively.
- Lives system (3 lives), score tracking, level progression.
- Tunnel wrap on left/right edges of maze.
- Dark arcade theme with glowing blue walls and gold title.
