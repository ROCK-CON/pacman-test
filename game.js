// ─── Constants ───────────────────────────────────────────────────────────────
const TILE  = 20;
const COLS  = 28;
const ROWS  = 31;

const WALL = 1, DOT = 2, POWER = 3, EMPTY = 0;

// Frames per tile move (60 fps assumed)
const PAC_FRAMES   = 4;   // pac-man speed
const GHOST_FRAMES = 6;   // ghost speed

// ─── Map ─────────────────────────────────────────────────────────────────────
// 1=wall  2=dot  3=power pellet  0=empty passage
const MAP_TEMPLATE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── Direction helpers ────────────────────────────────────────────────────────
const LEFT  = { x: -1, y:  0 };
const RIGHT = { x:  1, y:  0 };
const UP    = { x:  0, y: -1 };
const DOWN  = { x:  0, y:  1 };
const NONE  = { x:  0, y:  0 };
const ALL_DIRS = [LEFT, RIGHT, UP, DOWN];

function dirEq(a, b) { return a.x === b.x && a.y === b.y; }
function opp(d)      { return { x: -d.x, y: -d.y }; }

// ─── Canvas & DOM ─────────────────────────────────────────────────────────────
const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');
const msgBox  = document.getElementById('message');
const msgText = document.getElementById('message-text');
const msgBtn  = document.getElementById('message-btn');

// ─── Game state ───────────────────────────────────────────────────────────────
let map, score, lives, level, dotsLeft, frightenFrames;
let pac, ghosts;
let powerTimer;
// state: 'idle' | 'playing' | 'over'
let state = 'idle';

// ─── Map helpers ──────────────────────────────────────────────────────────────
function tileAt(tx, ty) {
  if (tx < 0 || tx >= COLS || ty < 0 || ty >= ROWS) return WALL;
  return map[ty][tx];
}
function isOpen(tx, ty) { return tileAt(tx, ty) !== WALL; }

function countDots() {
  let n = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (map[r][c] === DOT || map[r][c] === POWER) n++;
  return n;
}

// ─── Init / spawn ─────────────────────────────────────────────────────────────
function init(fullReset) {
  map = MAP_TEMPLATE.map(r => [...r]);
  if (fullReset) {
    score = 0; lives = 3; level = 1; frightenFrames = 480;
  }
  dotsLeft  = countDots();
  powerTimer = 0;
  spawnEntities();
  updateHUD();
  hideMessage();
}

function spawnEntities() {
  pac = {
    tx: 13, ty: 23,
    px: 13 * TILE, py: 23 * TILE,
    dir: NONE, nextDir: LEFT,
    moveTimer: 0,
    mouth: 0.25, mouthDir: 1,
  };

  ghosts = [
    makeGhost(13, 11, RIGHT, '#FF0000', 0),   // Blinky — exits at once
    makeGhost(11, 14, UP,    '#FFB8FF', 180),  // Pinky
    makeGhost(13, 14, UP,    '#00FFFF', 360),  // Inky
    makeGhost(15, 14, UP,    '#FFB852', 540),  // Clyde
  ];
}

function makeGhost(tx, ty, dir, color, houseTimer) {
  return {
    tx, ty,
    px: tx * TILE, py: ty * TILE,
    dir, color,
    // 'house' | 'chase' | 'scared' | 'eaten'
    mode: houseTimer > 0 ? 'house' : 'chase',
    houseTimer,
    moveTimer: 0,
  };
}

// ─── HUD ──────────────────────────────────────────────────────────────────────
function updateHUD() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
}
function showMessage(text, btn) {
  msgText.textContent = text;
  msgBtn.textContent  = btn;
  msgBox.classList.remove('hidden');
}
function hideMessage() { msgBox.classList.add('hidden'); }

// ─── Input ────────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (state === 'idle') { state = 'playing'; return; }
  if (state !== 'playing') return;
  switch (e.key) {
    case 'ArrowLeft':  case 'a': pac.nextDir = LEFT;  break;
    case 'ArrowRight': case 'd': pac.nextDir = RIGHT; break;
    case 'ArrowUp':    case 'w': pac.nextDir = UP;    break;
    case 'ArrowDown':  case 's': pac.nextDir = DOWN;  break;
  }
  if (e.key.startsWith('Arrow')) e.preventDefault();
});

// ─── Touch / swipe controls ───────────────────────────────────────────────────
let touchStartX = null;
let touchStartY = null;
const SWIPE_MIN = 20; // minimum px to count as a swipe

canvas.addEventListener('touchstart', e => {
  e.preventDefault(); // stop page scrolling
  const t = e.changedTouches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  // Tap on idle screen starts the game
  if (state === 'idle') state = 'playing';
}, { passive: false });

canvas.addEventListener('touchend', e => {
  e.preventDefault();
  if (touchStartX === null) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  touchStartX = null;
  touchStartY = null;

  // Ignore tiny taps
  if (Math.abs(dx) < SWIPE_MIN && Math.abs(dy) < SWIPE_MIN) return;
  if (state !== 'playing') return;

  // Whichever axis moved more determines the swipe direction
  if (Math.abs(dx) > Math.abs(dy)) {
    pac.nextDir = dx > 0 ? RIGHT : LEFT;
  } else {
    pac.nextDir = dy > 0 ? DOWN : UP;
  }
}, { passive: false });

msgBtn.addEventListener('click', () => {
  hideMessage();
  if (lives > 0) {
    spawnEntities();
    state = 'playing';
  } else {
    init(true);
    state = 'idle';
  }
});

// ─── Pac-Man update ───────────────────────────────────────────────────────────
function updatePac() {
  pac.moveTimer++;
  if (pac.moveTimer < PAC_FRAMES) return;
  pac.moveTimer = 0;

  // Try to switch to queued direction
  if (isOpen(pac.tx + pac.nextDir.x, pac.ty + pac.nextDir.y)) {
    pac.dir = pac.nextDir;
  }

  // Move in current direction if open
  if (!dirEq(pac.dir, NONE)) {
    const nx = (pac.tx + pac.dir.x + COLS) % COLS; // tunnel wrap
    const ny = pac.ty + pac.dir.y;
    if (isOpen(nx, ny)) {
      pac.tx = nx;
      pac.ty = ny;
    }
  }

  // Eat dot or power pellet
  const cell = map[pac.ty][pac.tx];
  if (cell === DOT) {
    map[pac.ty][pac.tx] = EMPTY;
    score += 10; dotsLeft--;
    updateHUD();
  } else if (cell === POWER) {
    map[pac.ty][pac.tx] = EMPTY;
    score += 50; dotsLeft--;
    updateHUD();
    powerTimer = frightenFrames;
    ghosts.forEach(g => {
      if (g.mode !== 'eaten') {
        g.mode = 'scared';
        g.dir  = opp(g.dir);
      }
    });
  }

  if (dotsLeft <= 0) nextLevel();
}

// ─── Ghost update ─────────────────────────────────────────────────────────────
function updateGhosts() {
  // Count down power timer
  if (powerTimer > 0) {
    powerTimer--;
    if (powerTimer === 0) {
      ghosts.forEach(g => { if (g.mode === 'scared') g.mode = 'chase'; });
    }
  }

  ghosts.forEach(g => {
    // House: count down then release
    if (g.mode === 'house') {
      g.houseTimer--;
      if (g.houseTimer <= 0) {
        g.mode = 'chase';
        g.tx = 13; g.ty = 11;
        g.px = g.tx * TILE; g.py = g.ty * TILE;
        g.dir = UP;
      }
      return;
    }

    // Speed: scared = slower, eaten = faster
    const spd = g.mode === 'scared' ? GHOST_FRAMES + 3
              : g.mode === 'eaten'  ? 2
              : GHOST_FRAMES;
    g.moveTimer++;
    if (g.moveTimer < spd) return;
    g.moveTimer = 0;

    // Eaten ghost returns to house
    if (g.mode === 'eaten' && g.tx === 13 && g.ty === 14) {
      g.mode = 'chase';
      g.dir  = UP;
    }

    // Collect valid directions (no U-turn)
    const reverse = opp(g.dir);
    const options = ALL_DIRS.filter(d => {
      if (dirEq(d, reverse)) return false;
      return isOpen(g.tx + d.x, g.ty + d.y);
    });

    if (options.length === 0) {
      g.dir = reverse; // dead end — turn around
    } else if (g.mode === 'scared') {
      g.dir = options[Math.floor(Math.random() * options.length)];
    } else if (g.mode === 'eaten') {
      // Head toward ghost house
      g.dir = options.reduce((best, d) => {
        const da = Math.hypot(g.tx + d.x    - 13, g.ty + d.y    - 14);
        const db = Math.hypot(g.tx + best.x - 13, g.ty + best.y - 14);
        return da < db ? d : best;
      });
    } else {
      // Chase pac-man
      g.dir = options.reduce((best, d) => {
        const da = Math.hypot(g.tx + d.x    - pac.tx, g.ty + d.y    - pac.ty);
        const db = Math.hypot(g.tx + best.x - pac.tx, g.ty + best.y - pac.ty);
        return da < db ? d : best;
      });
    }

    // Move (with tunnel wrap)
    g.tx = ((g.tx + g.dir.x) + COLS) % COLS;
    g.ty = g.ty + g.dir.y;
  });
}

// ─── Collision ────────────────────────────────────────────────────────────────
function checkCollisions() {
  ghosts.forEach(g => {
    if (g.mode === 'house') return;
    if (g.tx !== pac.tx || g.ty !== pac.ty) return;

    if (g.mode === 'scared') {
      g.mode = 'eaten';
      score += 200;
      updateHUD();
    } else if (g.mode !== 'eaten') {
      pacDied();
    }
  });
}

function pacDied() {
  lives--;
  updateHUD();
  state = 'over';
  if (lives <= 0) {
    showMessage('GAME OVER\nFinal score: ' + score, 'Play Again');
  } else {
    showMessage('Caught!\nLives left: ' + lives, 'Continue');
  }
}

// ─── Next level ───────────────────────────────────────────────────────────────
function nextLevel() {
  level++;
  frightenFrames = Math.max(180, frightenFrames - 60);
  init(false);
  state = 'playing';
}

// ─── Smooth pixel movement ────────────────────────────────────────────────────
function movePixels() {
  const step = (cur, target, speed) => {
    if (Math.abs(target - cur) <= speed) return target;
    return cur + Math.sign(target - cur) * speed;
  };
  const ps = TILE / PAC_FRAMES;
  pac.px = step(pac.px, pac.tx * TILE, ps);
  pac.py = step(pac.py, pac.ty * TILE, ps);

  const gs = TILE / GHOST_FRAMES;
  ghosts.forEach(g => {
    if (g.mode === 'house') return;
    g.px = step(g.px, g.tx * TILE, gs);
    g.py = step(g.py, g.ty * TILE, gs);
  });
}

// ─── Drawing ──────────────────────────────────────────────────────────────────
function drawMap() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * TILE, y = r * TILE;
      const cell = map[r][c];
      if (cell === WALL) {
        ctx.fillStyle = '#1a1aff';
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = '#3333ff';
        ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
      } else if (cell === DOT) {
        ctx.fillStyle = '#ffb8ae';
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (cell === POWER) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 200);
        ctx.fillStyle = `rgba(255,184,174,${0.6 + 0.4 * pulse})`;
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPac() {
  const cx = pac.px + TILE / 2;
  const cy = pac.py + TILE / 2;
  const r  = TILE / 2 - 1;

  pac.mouth += 0.05 * pac.mouthDir;
  if (pac.mouth > 0.3)  pac.mouthDir = -1;
  if (pac.mouth < 0.02) pac.mouthDir =  1;

  let angle = 0;
  if      (dirEq(pac.dir, LEFT))  angle = Math.PI;
  else if (dirEq(pac.dir, UP))    angle = -Math.PI / 2;
  else if (dirEq(pac.dir, DOWN))  angle =  Math.PI / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, pac.mouth * Math.PI, (2 - pac.mouth) * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGhost(g) {
  if (g.mode === 'house') return;
  const cx = g.px + TILE / 2;
  const cy = g.py + TILE / 2;
  const r  = TILE / 2 - 1;

  let color = g.color;
  if (g.mode === 'eaten') {
    color = 'rgba(255,255,255,0.25)';
  } else if (g.mode === 'scared') {
    const flash = powerTimer < 120 && Math.floor(Date.now() / 300) % 2 === 0;
    color = flash ? '#ffffff' : '#0000cc';
  }

  // Body (dome + wavy skirt)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy - 2, r, Math.PI, 0);
  const waveY = cy + r - 2;
  ctx.lineTo(cx + r, waveY);
  const wW = (r * 2) / 3;
  for (let i = 0; i < 3; i++) {
    const x0 = cx + r - i * wW;
    const x1 = x0 - wW / 2, x2 = x0 - wW;
    ctx.quadraticCurveTo(x1 + wW / 4, waveY + 5, x1, waveY);
    ctx.quadraticCurveTo(x1 - wW / 4, waveY - 5, x2, waveY);
  }
  ctx.closePath();
  ctx.fill();

  // Eyes (not drawn when eaten)
  if (g.mode !== 'eaten') {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 3, cy - 3, 3, 0, Math.PI * 2);
    ctx.arc(cx + 3, cy - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = g.mode === 'scared' ? '#fff' : '#00f';
    ctx.beginPath();
    ctx.arc(cx - 3, cy - 2, 1.5, 0, Math.PI * 2);
    ctx.arc(cx + 3, cy - 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawStartScreen() {
  ctx.fillStyle = 'rgba(0,0,0,0.82)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = 'center';

  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 36px "Courier New", monospace';
  ctx.fillText('PAC-MAN', canvas.width / 2, canvas.height / 2 - 80);

  ctx.fillStyle = '#fff';
  ctx.font = '16px "Courier New", monospace';
  ctx.fillText('Arrow Keys / WASD  or  Swipe to move', canvas.width / 2, canvas.height / 2 - 28);
  ctx.fillText('Eat all dots to clear the level', canvas.width / 2, canvas.height / 2 - 6);

  ctx.fillStyle = '#ffb8ae';
  ctx.fillText('Dot = 10 pts    Power Pellet = 50 pts', canvas.width / 2, canvas.height / 2 + 20);

  ctx.fillStyle = '#6666ff';
  ctx.fillText('Eat scared ghosts for 200 pts', canvas.width / 2, canvas.height / 2 + 44);

  if (Math.floor(Date.now() / 500) % 2 === 0) {
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('Press any key or click to start', canvas.width / 2, canvas.height / 2 + 88);
  }
  ctx.textAlign = 'left';
}

// ─── Main loop (fixed timestep) ───────────────────────────────────────────────
// Game logic always runs at 60 ticks/sec regardless of screen refresh rate.
// This prevents the game running faster on 90 Hz / 120 Hz mobile displays.
const TICK_MS    = 1000 / 60; // 16.67 ms per logic tick
let accumulator  = 0;
let lastTimestamp = 0;

function gameFrame(timestamp) {
  // How long since last frame (capped at 100 ms to avoid a huge catch-up
  // burst if the tab was hidden or the device paused briefly)
  const elapsed = Math.min(timestamp - lastTimestamp, 100);
  lastTimestamp = timestamp;

  // Accumulate time and run as many fixed logic ticks as have elapsed
  if (state === 'playing') {
    accumulator += elapsed;
    while (accumulator >= TICK_MS) {
      updatePac();
      updateGhosts();
      checkCollisions();
      accumulator -= TICK_MS;
    }
    movePixels();
  }

  // Draw every display frame (smooth on any refresh rate)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPac();
  ghosts.forEach(drawGhost);

  if (state === 'idle') drawStartScreen();

  requestAnimationFrame(gameFrame);
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init(true);
requestAnimationFrame(gameFrame);
