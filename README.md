# Pac-Man Browser Game

A simple, beginner-friendly Pac-Man game built with vanilla HTML, CSS and JavaScript — no libraries or frameworks required. Playable on desktop and mobile.

---

## Play

Open `index.html` in any modern browser. No build step or server needed.

---

## Controls

| Platform | Control |
|---|---|
| Desktop | Arrow keys or WASD |
| Mobile / Tablet | Swipe in any direction on the canvas |
| Start screen | Any key, tap, or click |

---

## Features

- Classic 28×31 tile maze
- Animated Pac-Man with chomping mouth
- 4 ghosts with distinct AI modes: **chase**, **scared**, **eaten**, return to house
- Dots (10 pts) and Power Pellets (50 pts + frightens ghosts)
- Eating a scared ghost scores 200 pts
- 3 lives, level progression (ghosts get faster each level)
- Speed selector: **Slow / Normal / Fast** — changeable during play
- Fixed-timestep game loop — runs at the same speed on 60 Hz, 90 Hz and 120 Hz screens
- Swipe gesture support with scroll-blocking

---

## File Structure

```
pacman-test/
├── index.html   # Game shell — canvas, HUD, speed selector, overlay message
├── style.css    # Dark arcade theme, layout, speed selector styling
├── game.js      # All game logic (see Architecture below)
└── README.md
```

---

## Architecture (game.js)

The file is organised into clearly commented sections:

| Section | What it does |
|---|---|
| **Constants** | `TILE` size, map tile types, speed presets |
| **Map** | 28×31 integer grid (`1`=wall, `2`=dot, `3`=power, `0`=empty) |
| **Direction helpers** | `LEFT/RIGHT/UP/DOWN/NONE` objects, `dirEq()`, `opp()` |
| **Game state** | `map`, `score`, `lives`, `level`, `pac`, `ghosts`, `state` |
| **Init / spawn** | `init(fullReset)`, `spawnEntities()`, `makeGhost()` |
| **HUD** | `updateHUD()`, `showMessage()`, `hideMessage()` |
| **Input** | Keyboard (`keydown`) and touch (`touchstart`/`touchend`) handlers |
| **Speed selector** | `speedSelect` change handler, updates `PAC_FRAMES`/`GHOST_FRAMES` |
| **Pac-Man update** | Tile-aligned movement, direction queuing, dot/pellet eating |
| **Ghost update** | House release timer, mode-based AI, no-U-turn direction picking |
| **Collision** | Tile-exact overlap check; scared→eaten, normal→pac dies |
| **Next level** | Resets map, respawns entities, reduces frightened duration |
| **Smooth pixel movement** | `movePixels()` — steps px/py toward tile target each logic tick |
| **Drawing** | `drawMap()`, `drawPac()`, `drawGhost()`, `drawStartScreen()` |
| **Main loop** | Fixed-timestep accumulator at 60 ticks/sec, renders every display frame |

---

## Movement System

Movement is **tile-based** (integer `tx`/`ty` coordinates) with a **pixel overlay** (`px`/`py`) for smooth animation.

```
Logic tick (60/sec)
  │
  ├─ updatePac / updateGhosts
  │    └─ only advances tx/ty when px === tx*TILE && py === ty*TILE
  │       (prevents diagonal movement on direction changes)
  │
  └─ movePixels
       └─ steps px/py by TILE/PAC_FRAMES pixels toward tx*TILE, ty*TILE

Render frame (device refresh rate — 60/90/120 Hz)
  └─ draws using current px/py (smooth on any screen)
```

The key rule: **a character never starts moving to the next tile until its pixel position has exactly reached the current tile.** This is what keeps movement axis-aligned and prevents diagonal glitching.

---

## Speed Presets

All frame values are divisors of `TILE` (20), so `TILE / frames` is always a whole number of pixels — ensuring pixel positions land exactly on tile boundaries.

| Preset | `PAC_FRAMES` | `GHOST_FRAMES` | Pac speed | Ghost speed |
|---|---|---|---|---|
| Slow | 10 | 20 | 6 tiles/sec | 3 tiles/sec |
| Normal | 5 | 10 | 12 tiles/sec | 6 tiles/sec |
| Fast | 4 | 5 | 15 tiles/sec | 12 tiles/sec |

---

## Ghost Modes

| Mode | Behaviour | Trigger |
|---|---|---|
| `house` | Waits inside ghost house, counts down release timer | On spawn |
| `chase` | Moves toward Pac-Man (greedy shortest-distance) | After release / power wears off / returns home |
| `scared` | Moves randomly, can be eaten for 200 pts | Pac-Man eats a power pellet |
| `eaten` | Rushes back to ghost house | Pac-Man eats a scared ghost |

---

## Known Limitations / Future Ideas

- Ghost AI is greedy (shortest path), not the original Blinky/Pinky/Inky/Clyde targeting
- No sound effects
- No high-score persistence (would need `localStorage`)
- Single maze — could add multiple maze layouts for higher levels
- No pause button

---

## Commit History

| Commit | Change |
|---|---|
| `8df8fff` | Initial Pac-Man game (HTML/CSS/JS) |
| `6232c37` | Start screen with blinking instructions overlay |
| `d6888f8` | Full rewrite — reliable tile-based movement system |
| `05a4dbd` | Swipe gesture controls for touchscreen |
| `2e3dc25` | Fixed-timestep loop (fixes speed on 90/120 Hz screens) |
| `3bdee5d` | Diagonal movement fix + speed selector |
