// ─── Constants ───────────────────────────────────────────────────────────────
const TILE = 20;          // pixels per tile
const COLS = 28;
const ROWS = 31;
const FPS  = 60;

// Tile types
const WALL  = 1;
const DOT   = 2;
const EMPTY = 0;
const POWER = 3;

// Directions
const DIR = {
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x:  1, y:  0 },
  UP:    { x:  0, y: -1 },
  DOWN:  { x:  0, y:  1 },
  NONE:  { x:  0, y:  0 },
};

// ─── Map Layout ──────────────────────────────────────────────────────────────
// 1=wall, 2=dot, 3=power pellet, 0=empty
// 28 columns × 31 rows
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

// ─── Game State ──────────────────────────────────────────────────────────────
let map, score, lives, level, totalDots;
let pacman, ghosts;
let dir, nextDir;
let powerTimer, frightenedDuration;
let gameLoop, state; // 'playing' | 'dead' | 'won' | 'idle'
let animFrame = 0;
let mouthAngle = 0.25;
let mouthDir = 1;

// ─── Canvas Setup ────────────────────────────────────────────────────────────
const canvas  = document.getElementById('gameCanvas');
const ctx     = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');
const msgBox  = document.getElementById('message');
const msgText = document.getElementById('message-text');
const msgBtn  = document.getElementById('message-btn');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function copyMap() {
  return MAP_TEMPLATE.map(row => [...row]);
}

function tileAt(tx, ty) {
  if (ty < 0 || ty >= ROWS || tx < 0 || tx >= COLS) return WALL;
  return map[ty][tx];
}

function canMove(tx, ty) {
  const t = tileAt(tx, ty);
  return t !== WALL;
}

// Pixel center → tile
function toTile(px) { return Math.floor(px / TILE); }

// Count all dots + power pellets
function countDots() {
  let n = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (map[r][c] === DOT || map[r][c] === POWER) n++;
  return n;
}

// ─── Ghost colours & home positions ─────────────────────────────────────────
const GHOST_COLORS     = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];
const GHOST_FRIGHTENED = '#0000CC';
const GHOST_EATEN      = '#ffffff44';

// Ghost spawn tiles (inside the house)
const GHOST_STARTS = [
  { tx: 13, ty: 14 },
  { tx: 11, ty: 14 },
  { tx: 13, ty: 14 },
  { tx: 15, ty: 14 },
];

// ─── Initialise ──────────────────────────────────────────────────────────────
function init() {
  map       = copyMap();
  score     = 0;
  lives     = 3;
  level     = 1;
  state     = 'playing';
  totalDots = countDots();
  frightenedDuration = 8000; // ms

  spawnPacman();
  spawnGhosts();
  updateHUD();
  hideMessage();
}

function spawnPacman() {
  pacman = {
    x:   13.5 * TILE,   // pixel x (centre)
    y:   23   * TILE,
    tx:  13,             // tile x
    ty:  23,
    dir:  DIR.NONE,
    speed: 2,
  };
  dir     = DIR.NONE;
  nextDir = DIR.LEFT;
}

function spawnGhosts() {
  ghosts = GHOST_STARTS.map((s, i) => ({
    x:    s.tx * TILE,
    y:    s.ty * TILE,
    tx:   s.tx,
    ty:   s.ty,
    dir:  DIR.UP,
    color: GHOST_COLORS[i],
    frightened: false,
    eaten:      false,
    releaseDelay: i * 3000,   // ms before leaving house
    released:   i === 0,      // Blinky starts released
    speed: 1.5,
  }));
  powerTimer = 0;
}

// ─── HUD ─────────────────────────────────────────────────────────────────────
function updateHUD() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
}

function showMessage(text) {
  msgText.textContent = text;
  msgBox.classList.remove('hidden');
}

function hideMessage() {
  msgBox.classList.add('hidden');
}

// ─── Input ───────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':  case 'a': nextDir = DIR.LEFT;  break;
    case 'ArrowRight': case 'd': nextDir = DIR.RIGHT; break;
    case 'ArrowUp':    case 'w': nextDir = DIR.UP;    break;
    case 'ArrowDown':  case 's': nextDir = DIR.DOWN;  break;
  }
  // prevent page scrolling
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))
    e.preventDefault();
});

msgBtn.addEventListener('click', () => {
  if (state === 'dead' && lives > 0) {
    spawnPacman();
    spawnGhosts();
    state = 'playing';
    hideMessage();
  } else {
    init();
  }
});

// ─── Movement ────────────────────────────────────────────────────────────────
function tryTurn(entity, newDir) {
  const nx = entity.tx + newDir.x;
  const ny = entity.ty + newDir.y;
  if (canMove(nx, ny)) {
    entity.dir = newDir;
    return true;
  }
  return false;
}

function moveEntity(entity) {
  const speed = entity.frightened ? entity.speed * 0.6
              : entity.eaten      ? entity.speed * 2
              : entity.speed;

  entity.x += entity.dir.x * speed;
  entity.y += entity.dir.y * speed;

  // Tunnel wrap
  if (entity.x < 0)            entity.x = (COLS - 1) * TILE;
  if (entity.x >= COLS * TILE)  entity.x = 0;

  entity.tx = toTile(entity.x + TILE / 2);
  entity.ty = toTile(entity.y + TILE / 2);
}

// Snap to grid centre when reaching a new tile
function snapToTile(entity) {
  const cx = entity.tx * TILE + TILE / 2;
  const cy = entity.ty * TILE + TILE / 2;
  const dx = Math.abs(entity.x + TILE / 2 - cx);
  const dy = Math.abs(entity.y + TILE / 2 - cy);
  return dx < entity.speed + 1 && dy < entity.speed + 1;
}

// ─── Pac-Man Update ──────────────────────────────────────────────────────────
function updatePacman() {
  if (snapToTile(pacman)) {
    // snap to exact tile centre
    pacman.x = pacman.tx * TILE;
    pacman.y = pacman.ty * TILE;

    // Try queued direction
    if (nextDir !== DIR.NONE) {
      const nx = pacman.tx + nextDir.x;
      const ny = pacman.ty + nextDir.y;
      if (canMove(nx, ny)) {
        dir = nextDir;
      }
    }

    // Continue or stop
    const nx = pacman.tx + dir.x;
    const ny = pacman.ty + dir.y;
    if (canMove(nx, ny)) {
      pacman.dir = dir;
    } else {
      pacman.dir = DIR.NONE;
    }

    // Eat dot / power pellet
    const cell = map[pacman.ty][pacman.tx];
    if (cell === DOT) {
      map[pacman.ty][pacman.tx] = EMPTY;
      score += 10;
      totalDots--;
      updateHUD();
    } else if (cell === POWER) {
      map[pacman.ty][pacman.tx] = EMPTY;
      score += 50;
      totalDots--;
      updateHUD();
      activatePower();
    }

    if (totalDots <= 0) {
      nextLevel();
      return;
    }
  }

  moveEntity(pacman);
}

// ─── Power Pellet ────────────────────────────────────────────────────────────
function activatePower() {
  powerTimer = frightenedDuration;
  ghosts.forEach(g => {
    if (!g.eaten) {
      g.frightened = true;
      g.dir = { x: -g.dir.x, y: -g.dir.y }; // reverse
    }
  });
}

// ─── Ghost AI ────────────────────────────────────────────────────────────────
let lastTime = 0;

function updateGhosts(dt) {
  // Power timer countdown
  if (powerTimer > 0) {
    powerTimer -= dt;
    if (powerTimer <= 0) {
      powerTimer = 0;
      ghosts.forEach(g => { g.frightened = false; });
    }
  }

  ghosts.forEach((g, i) => {
    // Release from house after delay
    if (!g.released) {
      g.releaseDelay -= dt;
      if (g.releaseDelay <= 0) {
        g.released = true;
        g.ty = 11;
        g.y  = g.ty * TILE;
        g.dir = DIR.UP;
      } else {
        // Bounce inside house
        if (snapToTile(g)) {
          g.y = g.ty * TILE;
          g.dir = g.dir.y === 0 ? DIR.UP : { x: 0, y: -g.dir.y };
        }
        moveEntity(g);
        return;
      }
    }

    if (!snapToTile(g)) {
      moveEntity(g);
      return;
    }

    // Snap
    g.x = g.tx * TILE;
    g.y = g.ty * TILE;

    // Choose new direction at intersection
    const options = [DIR.LEFT, DIR.RIGHT, DIR.UP, DIR.DOWN].filter(d => {
      if (d.x === -g.dir.x && d.y === -g.dir.y) return false; // no 180
      const nx = g.tx + d.x;
      const ny = g.ty + d.y;
      return canMove(nx, ny);
    });

    if (options.length === 0) {
      // Dead end — reverse
      g.dir = { x: -g.dir.x, y: -g.dir.y };
    } else if (g.frightened || g.eaten) {
      if (g.eaten && g.tx === 13 && g.ty === 14) {
        g.eaten = false;
        g.dir = DIR.UP;
      } else {
        // Random when frightened, chase home when eaten
        if (g.frightened) {
          g.dir = options[Math.floor(Math.random() * options.length)];
        } else {
          // Head toward ghost house
          g.dir = options.reduce((best, d) => {
            const nx = g.tx + d.x, ny = g.ty + d.y;
            const dist = Math.hypot(nx - 13, ny - 14);
            const bx = g.tx + best.x, by = g.ty + best.y;
            return dist < Math.hypot(bx - 13, by - 14) ? d : best;
          });
        }
      }
    } else {
      // Chase pac-man (simple: minimise distance)
      g.dir = options.reduce((best, d) => {
        const nx = g.tx + d.x, ny = g.ty + d.y;
        const dist = Math.hypot(nx - pacman.tx, ny - pacman.ty);
        const bx = g.tx + best.x, by = g.ty + best.y;
        return dist < Math.hypot(bx - pacman.tx, by - pacman.ty) ? d : best;
      });
    }

    moveEntity(g);
  });
}

// ─── Collision ───────────────────────────────────────────────────────────────
function checkCollisions() {
  ghosts.forEach(g => {
    const dx = Math.abs((g.x + TILE / 2) - (pacman.x + TILE / 2));
    const dy = Math.abs((g.y + TILE / 2) - (pacman.y + TILE / 2));
    if (dx < TILE * 0.75 && dy < TILE * 0.75) {
      if (g.frightened) {
        g.frightened = false;
        g.eaten = true;
        score += 200;
        updateHUD();
      } else if (!g.eaten) {
        pacmanDied();
      }
    }
  });
}

function pacmanDied() {
  lives--;
  updateHUD();
  state = 'dead';
  if (lives <= 0) {
    showMessage('GAME OVER\n\nScore: ' + score);
  } else {
    showMessage('You were caught!\n\nPress Play Again to continue.');
  }
}

// ─── Next Level ──────────────────────────────────────────────────────────────
function nextLevel() {
  level++;
  map = copyMap();
  totalDots = countDots();
  spawnPacman();
  spawnGhosts();
  frightenedDuration = Math.max(3000, frightenedDuration - 500);
  updateHUD();
}

// ─── Drawing ─────────────────────────────────────────────────────────────────
function drawMap() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = map[r][c];
      const x = c * TILE, y = r * TILE;

      if (cell === WALL) {
        ctx.fillStyle = '#1a1aff';
        ctx.fillRect(x, y, TILE, TILE);
        // inner highlight
        ctx.fillStyle = '#3333ff';
        ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4);
      } else if (cell === DOT) {
        ctx.fillStyle = '#ffb8ae';
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (cell === POWER) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 200);
        ctx.fillStyle = `rgba(255, 184, 174, ${0.6 + 0.4 * pulse})`;
        ctx.beginPath();
        ctx.arc(x + TILE / 2, y + TILE / 2, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPacman() {
  const cx = pacman.x + TILE / 2;
  const cy = pacman.y + TILE / 2;
  const r  = TILE / 2 - 1;

  // Animate mouth
  mouthAngle += 0.05 * mouthDir;
  if (mouthAngle > 0.3) mouthDir = -1;
  if (mouthAngle < 0.02) mouthDir = 1;

  // Rotation based on direction
  let angle = 0;
  if (pacman.dir === DIR.RIGHT || pacman.dir === DIR.NONE) angle = 0;
  else if (pacman.dir === DIR.LEFT)  angle = Math.PI;
  else if (pacman.dir === DIR.UP)    angle = -Math.PI / 2;
  else if (pacman.dir === DIR.DOWN)  angle = Math.PI / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGhost(g) {
  const cx = g.x + TILE / 2;
  const cy = g.y + TILE / 2;
  const r  = TILE / 2 - 1;

  let color = g.color;
  if (g.eaten)      color = GHOST_EATEN;
  else if (g.frightened) {
    // Flash near end of power timer
    if (powerTimer < 2000 && Math.floor(Date.now() / 300) % 2 === 0)
      color = '#ffffff';
    else
      color = GHOST_FRIGHTENED;
  }

  ctx.fillStyle = color;

  // Body
  ctx.beginPath();
  ctx.arc(cx, cy - 2, r, Math.PI, 0);
  // Wavy bottom
  const waveY = cy + r - 2;
  ctx.lineTo(cx + r, waveY);
  const waves = 3;
  const waveW = (r * 2) / waves;
  for (let i = 0; i < waves; i++) {
    const x0 = cx + r - i * waveW;
    const x1 = x0 - waveW / 2;
    const x2 = x0 - waveW;
    ctx.quadraticCurveTo(x1 + waveW / 4, waveY + 5, x1, waveY);
    ctx.quadraticCurveTo(x1 - waveW / 4, waveY - 5, x2, waveY);
  }
  ctx.closePath();
  ctx.fill();

  if (!g.eaten) {
    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 3, cy - 3, 3, 0, Math.PI * 2);
    ctx.arc(cx + 3, cy - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = g.frightened ? '#fff' : '#00f';
    ctx.beginPath();
    ctx.arc(cx - 3, cy - 2, 1.5, 0, Math.PI * 2);
    ctx.arc(cx + 3, cy - 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ─── Main Loop ───────────────────────────────────────────────────────────────
function gameFrame(timestamp) {
  const dt = timestamp - lastTime || 16;
  lastTime = timestamp;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMap();

  if (state === 'playing') {
    updatePacman();
    updateGhosts(dt);
    checkCollisions();
  }

  drawPacman();
  ghosts.forEach(drawGhost);

  requestAnimationFrame(gameFrame);
}

// ─── Start ───────────────────────────────────────────────────────────────────
init();
requestAnimationFrame(gameFrame);
