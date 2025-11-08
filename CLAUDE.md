## Complete Claude Prompt to Build Hero Fighter-Style Game

Here's a comprehensive prompt to create a 2D multiplayer fighting game like Hero Fighter:

```
Build a 2D multiplayer fighting game similar to Hero Fighter with the following specifications:

PROJECT NAME: Battle Legends - 2D Beat 'Em Up Fighter

TECH STACK:
- Frontend: HTML5 Canvas + JavaScript (or Phaser.js framework)
- Physics: Matter.js or custom collision detection
- Multiplayer: Socket.io (WebSocket) + Node.js backend
- State Management: Redux or custom state handler
- Animation: Sprite sheets with frame-by-frame animation
- Audio: Howler.js for sound effects and music
- Deployment: Frontend on Vercel, Backend on Railway

GAME OVERVIEW:

Hero Fighter is a 2D side-scrolling beat 'em up where players control characters that can:
- Move in 8 directions (up, down, left, right, diagonals)
- Perform various attacks (punch, kick, special moves)
- Jump and perform aerial attacks
- Pick up weapons and items
- Ride mounts (horses, monsters) for enhanced abilities
- Fight solo or in teams against AI or other players

CORE GAME MECHANICS:

1. CHARACTER MOVEMENT:

Movement System:
- WASD or Arrow Keys for 8-directional movement
- Characters can move freely in 2D plane (not just left-right like traditional fighters)
- Walking speed: 3 pixels/frame
- Running speed: 5 pixels/frame (hold Shift + direction)
- Jumping: Space bar, character leaves ground for ~30 frames
- Double jump: Press jump again mid-air
- Dash: Double-tap direction for quick dash (invincibility frames)

Z-Axis Depth:
- Characters can move "into" and "out of" screen (Y-axis movement)
- Create depth illusion with scaling (characters smaller when "further back")
- Collision detection considers both X and Y positions

2. COMBAT SYSTEM:

Basic Attacks:
- Attack Button (J): Light punch (fast, low damage, 5 DMG)
- Attack Button + Direction: Different attacks
  * Forward + Attack: Heavy punch (slower, high damage, 15 DMG)
  * Down + Attack: Sweep kick (knocks down, 10 DMG)
  * Up + Attack: Uppercut (launches enemy, 12 DMG)
  * Jump + Attack: Aerial kick (8 DMG)

Special Moves (K):
- Fireball: Down, Forward + Special (projectile, 20 DMG, costs 30 MP)
- Dash Attack: Forward, Forward + Special (charge attack, 25 DMG, costs 40 MP)
- Spin Attack: Special button only (360° attack, 18 DMG, costs 35 MP)
- Ultimate: Down, Down + Special (screen-clearing super, 50 DMG, costs 100 MP)

Combo System:
- Chain attacks: Attack → Attack → Attack (3-hit combo)
- Juggling: Launch enemy with uppercut, follow up with aerial attacks
- Crowd control: Spin attacks hit multiple enemies
- Stun system: Repeated hits cause temporary stun (0.5s)

Defense:
- Block: Hold Defense button (L) - reduces damage by 50%
- Dodge Roll: Defense + Direction - invincibility for 15 frames
- Counter: Block at exact moment of enemy attack - automatic counterattack
- Parry: Directional block - deflects projectiles

3. CHARACTER STATS:

Each character has:
- HP (Health Points): 100-200 depending on character type
- MP (Mana Points): 100 for special moves
- Attack Power: Base damage multiplier (0.8x - 1.5x)
- Defense: Damage reduction (0% - 30%)
- Speed: Movement speed multiplier (0.8x - 1.3x)
- Jump Height: How high character can jump
- Special Skills: Unique abilities per character

Character Types:
1. **Fighter** (Balanced): HP 150, ATK 1.0x, DEF 10%, SPD 1.0x
2. **Tank** (Defensive): HP 200, ATK 0.8x, DEF 30%, SPD 0.8x
3. **Assassin** (Speed): HP 100, ATK 1.2x, DEF 0%, SPD 1.3x
4. **Mage** (Range): HP 120, ATK 1.5x (ranged), DEF 5%, SPD 0.9x
5. **Monk** (Combo): HP 130, ATK 1.1x, DEF 15%, SPD 1.1x

4. WEAPONS & ITEMS:

Pickable Weapons:
- Sword: +20 ATK, 3 uses before breaking
- Baseball Bat: +15 ATK, 5 uses, can knock enemies far
- Kunai (throwable): 30 DMG, one-time use
- Heavy Rock: 40 DMG when thrown, slow movement while holding
- Wooden Box: Can be thrown at enemies, breaks on impact (25 DMG)

Items:
- Health Potion: Restores 50 HP instantly
- Mana Potion: Restores 50 MP instantly
- Speed Boost: +50% speed for 10 seconds
- Shield: Temporary invincibility for 5 seconds
- Power-up: +50% damage for 10 seconds

Weapon Mechanics:
- Press Pickup button (U) near weapon to pick up
- Throw weapon with Attack + Jump
- Some weapons (sword, bat) change attack animations
- Weapons disappear when durability reaches 0

5. MOUNT/RIDING SYSTEM:

Mountable Creatures:
- Horse: +100% movement speed, -50% maneuverability, trample attack (20 DMG)
- Wolf: +50% speed, can dash attack (25 DMG), aggressive AI
- Dragon: Flight ability, fire breath attack (40 DMG), limited time (30s)
- Bull: High defense, charge attack (35 DMG), slow movement

Mounting:
- Approach mount and press Pickup (U)
- While mounted: Different attack animations and abilities
- Mount has separate HP bar (50-100 HP)
- Dismount: Press Down + Pickup
- Mount dies if HP reaches 0

6. GAME MODES:

Single Player Modes:
1. **Story Mode**: Progress through stages, fight bosses, unlock characters
   - 10 stages with increasing difficulty
   - Boss fights every 2 stages
   - Cutscenes between stages
   - Rewards: Unlock characters, skins, weapons

2. **Survival Mode**: Endless waves of enemies
   - Enemies get stronger each wave
   - No health regeneration between waves
   - Leaderboard for highest wave reached
   - Rewards: Coins based on performance

3. **Boss Rush**: Fight all bosses consecutively
   - Time trial mode
   - Leaderboard for fastest completion
   - Difficulty options: Easy, Normal, Hard, Nightmare

4. **Training Mode**: Practice combos and moves
   - Dummy enemies
   - Display damage numbers and combo count
   - Move list reference on screen

Multiplayer Modes:
1. **VS Mode** (1v1, 2v2, 3v3, 4 player free-for-all)
   - Local and online multiplayer
   - Best of 3 rounds
   - Character selection screen
   - Stage selection

2. **Co-op Mode**: 2-4 players vs AI enemies
   - Shared objective: Defeat all enemies
   - Friendly fire: OFF
   - Revive system: Dead players can be revived by teammates

3. **Team Battle**: 2v2 or 3v3 online
   - Ranked matchmaking
   - Team coordination required
   - ELO rating system

4. **Battle Royale**: 8-16 players, last one standing wins
   - Shrinking arena over time
   - Random weapon/item spawns
   - Solo or squad mode

7. GAME CANVAS & RENDERING:

Canvas Setup:
- Resolution: 1280x720 (16:9 aspect ratio)
- 60 FPS target frame rate
- Layers:
  * Background layer (parallax scrolling)
  * Ground layer (walkable area)
  * Character layer (players, enemies, items)
  * UI layer (health bars, score, timer)
  * Foreground layer (particles, effects)

Character Rendering:
- Sprite sheets: 64x64 pixels per frame
- Animations:
  * Idle: 4 frames, looping
  * Walk: 8 frames, looping
  * Run: 6 frames, looping
  * Jump: 3 frames (jump, mid-air, land)
  * Attack: 5-8 frames per attack type
  * Hit: 2 frames (taking damage)
  * Block: 1 frame (static)
  * Death: 6 frames (falling animation)

Z-Index Sorting:
- Sort characters by Y position (higher Y = rendered in front)
- Update sorting every frame
- Shadow sprites beneath characters for depth

8. COLLISION DETECTION:

Hitboxes:
- Character body: Rectangle hitbox (40x60 pixels)
- Attack hitboxes: Vary per move (punch: 30x20, kick: 40x25)
- Weapon hitboxes: Extended based on weapon type
- Hurtboxes: Vulnerable areas (different from body hitbox)

Collision Types:
1. **Character-to-Character**: Prevent overlap, characters push each other
2. **Attack-to-Character**: Check if attack hitbox overlaps target's hurtbox
3. **Character-to-Wall**: Stop movement at arena boundaries
4. **Character-to-Item**: Pick up items within range
5. **Projectile-to-Character**: Fireball hits detection

Knockback System:
- Each attack has knockback vector (direction and force)
- Heavy attacks = high knockback
- Enemies fly backwards on knockback
- Hit walls = bounce back slightly

9. AI SYSTEM (For Single Player):

Enemy AI Behaviors:
- **Patrol**: Walk randomly when no player nearby
- **Chase**: Move towards nearest player when in range (200 pixels)
- **Attack**: Execute random attack when within attack range (50 pixels)
- **Block**: 30% chance to block when player attacks
- **Retreat**: Back away if health < 20%
- **Use Items**: Pick up weapons/items if nearby

Difficulty Levels:
- Easy: AI reacts slowly (500ms delay), low accuracy
- Normal: Medium reaction (300ms), medium accuracy
- Hard: Fast reaction (100ms), high accuracy, better combos
- Nightmare: Instant reactions, perfect blocks, optimal combos

Boss AI:
- Phase system: Different attack patterns at 100%, 75%, 50%, 25% HP
- Special abilities: Summon minions, rage mode, invincibility phases
- Pattern recognition: Learn player behavior, adapt strategy
- Scripted sequences: Cutscene-like attacks

10. MULTIPLAYER ARCHITECTURE:

Client-Server Model (Authoritative Server):
- Server handles all game logic and state
- Clients send inputs (key presses) to server
- Server processes inputs, updates game state
- Server broadcasts state to all clients
- Client-side prediction for smooth movement

Network Protocol:
- WebSocket connection via Socket.io
- Tick rate: 60 ticks/second
- Input buffering: Queue inputs if lag occurs
- Interpolation: Smooth out other players' movements
- Lag compensation: Rewind for hit detection

Data Packets:
```
// Client → Server
{
  type: 'INPUT',
  playerId: 'uuid',
  timestamp: Date.now(),
  keys: {
    up: false,
    down: false,
    left: true,
    right: false,
    attack: true,
    special: false,
    jump: false
  }
}

// Server → Clients
{
  type: 'STATE_UPDATE',
  timestamp: Date.now(),
  players: [
    {
      id: 'uuid',
      x: 450,
      y: 300,
      hp: 85,
      mp: 60,
      state: 'attacking',
      animation: 'punch',
      frame: 3
    }
  ],
  enemies: [...],
  items: [...],
  projectiles: [...]
}
```

Room System:
- Lobby: Players wait for match to start
- Room capacity: 2-8 players depending on mode
- Host migration: If host disconnects, migrate to another player
- Spectator mode: Watch ongoing matches

11. UI/UX DESIGN:

Main Menu:
- Title screen with animated background
- Buttons:
  * Single Player
  * Multiplayer
  * Character Select
  * Options
  * Quit
- Version number in corner
- Social links (Discord, Twitter)

Character Selection Screen:
- Grid of character portraits
- Preview pane showing selected character
  * 3D rotating model or animated idle sprite
  * Character stats (HP, ATK, DEF, SPD)
  * Character description
- Lock icon on locked characters
- Unlock requirements tooltip
- Ready button
- Skin selector for unlocked skins

In-Game HUD:
- Top-left: Player 1 info
  * Character portrait
  * HP bar (red, with white flash on damage)
  * MP bar (blue)
  * Lives remaining (in VS mode)
- Top-right: Player 2/Enemy info (mirrored layout)
- Top-center: Timer countdown (90 seconds)
- Bottom: Combo counter (shows current combo hits)
- Corner: Mini-map (shows player positions in large stages)

Pause Menu:
- Resume
- Controls
- Settings
- Quit to Menu

Victory/Defeat Screen:
- Winner announcement with character pose
- Stats: Damage dealt, combos, accuracy
- Rewards: XP gained, coins earned
- Continue/Rematch/Quit buttons

12. PROGRESSION SYSTEM:

Player Level:
- Gain XP from matches (more from wins)
- Level up unlocks: Characters, skins, arenas
- Level cap: 50
- XP rewards scale with difficulty

Currency:
- Coins: Earned from matches, used to buy skins/items
- Gems: Premium currency (optional monetization)

Unlockables:
- Characters: 15 total (5 starter, 10 unlockable)
  * Unlock methods: Reach level X, complete story mode, win X matches
- Skins: 3-5 per character (recolors, alternate outfits)
- Arenas: 10 stages (classic dojo, urban street, forest, castle, etc.)
- Weapons: Rare weapons unlocked via achievements

Achievements:
- "First Blood": Deal first damage in a match
- "Combo Master": Achieve 50-hit combo
- "Untouchable": Win without taking damage
- "Weapon Master": Win using only weapons
- Display achievement pop-ups during gameplay

13. AUDIO DESIGN:

Sound Effects:
- Punch/kick sounds (vary by character and attack type)
- Hit impact sounds (flesh hit, block, critical hit)
- Jump/land sounds
- Weapon sounds (sword slash, bat swing)
- Item pickup sound
- Special move sounds (fireball whoosh, explosion)
- UI sounds (menu click, character select beep)

Music:
- Main menu: Epic orchestral theme
- Character select: Upbeat rock theme
- Battle themes: Fast-paced electronic/rock (one per stage)
- Boss battle: Intense orchestral metal
- Victory jingle: Short triumphant fanfare
- Defeat sound: Sad trombone

Audio System:
- Volume controls: Master, Music, SFX (separate sliders)
- Spatial audio: Sounds louder when action is closer
- Music crossfading between menus/stages

14. SPECIAL EFFECTS:

Particle Effects:
- Hit sparks: Yellow/orange particles on successful hit
- Blood splatter: Red particles when taking damage (optional, can toggle)
- Dust clouds: When landing from jump or dashing
- Fire trail: Behind fireball projectiles
- Energy aura: Around character when using ultimate
- Screen shake: On heavy hits and explosions
- Speed lines: When dashing or running fast

Visual Feedback:
- Freeze frame: 3-frame pause on critical hits
- Flash effect: White flash on character when taking damage
- Slow motion: On finishing blow
- Color overlay: Red tint when low HP (<20%)
- Glow effect: Weapons and power-ups glow
- Shadow clone: Leave afterimages during dash

15. STAGE DESIGN:

Stage Elements:
- Arena size: 800x600 pixels playable area
- Boundaries: Invisible walls at edges
- Obstacles: Breakable boxes, pillars (can hide behind)
- Environmental hazards: Spikes, fire pits (deal damage)
- Interactive objects: Barrels (explode when hit)
- Elevation: Some stages have platforms (jump to reach)

Example Stages:
1. **Street Fighter Arena**: Urban street, cars in background
2. **Ancient Temple**: Stone pillars, torch lighting
3. **Forest Clearing**: Trees, falling leaves particle effect
4. **Rooftop**: Sunset sky, city skyline background
5. **Dojo**: Traditional Japanese training hall
6. **Volcano**: Lava pits (hazard), dark rocky terrain
7. **Ice Cave**: Slippery floor (reduced friction)
8. **Castle Throne Room**: Red carpet, throne prop
9. **Beach**: Ocean waves, sand, palm trees
10. **Cyberpunk City**: Neon lights, holographic ads

Dynamic Elements:
- Day/night cycle (aesthetic only)
- Weather effects (rain, snow - affect visibility slightly)
- Crowd NPCs cheering (in arena stages)
- Parallax scrolling backgrounds (3-4 layers deep)

16. SAVE SYSTEM:

Local Storage (Browser):
- Save player profile: Name, level, XP, coins
- Save unlocks: Characters, skins, stages
- Save settings: Volume, controls, graphics quality
- Save statistics: Total wins, losses, playtime

Auto-save:
- Save after every match completion
- Save on settings change
- Cloud sync (optional): Sync saves to backend database

17. CONTROLS:

Default Keyboard Controls:
- Movement: WASD or Arrow Keys
- Attack: J
- Special: K
- Jump: Space
- Block/Defend: L
- Pickup/Interact: U
- Pause: ESC

Gamepad Support:
- Left Stick: Movement
- A Button: Jump
- B Button: Attack
- X Button: Special
- Y Button: Pickup
- LB: Block
- Start: Pause

Control Remapping:
- Allow players to customize all keys
- Preset configurations (default, WASD, arrows)
- Gamepad button remapping

18. PERFORMANCE OPTIMIZATION:

Optimization Techniques:
- Object pooling: Reuse particle objects instead of creating new ones
- Sprite batching: Combine multiple sprites into single draw call
- Culling: Don't render objects outside camera view
- LOD: Reduce animation quality for distant players
- Limit particles: Cap at 500 simultaneous particles
- Delta time: Frame-rate independent movement
- Lazy loading: Load character sprites only when selected

Target Performance:
- 60 FPS on mid-range devices
- <100ms input latency
- <50MB initial load size
- <100ms server response time (multiplayer)

19. CODE STRUCTURE:

File Organization:
```
/game
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js (entry point, game loop)
│   ├── classes/
│   │   ├── Character.js
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Weapon.js
│   │   ├── Projectile.js
│   │   ├── Item.js
│   │   └── Stage.js
│   ├── systems/
│   │   ├── InputManager.js
│   │   ├── CollisionManager.js
│   │   ├── AnimationManager.js
│   │   ├── PhysicsEngine.js
│   │   ├── NetworkManager.js (multiplayer)
│   │   └── AudioManager.js
│   ├── ui/
│   │   ├── MainMenu.js
│   │   ├── CharacterSelect.js
│   │   ├── HUD.js
│   │   └── PauseMenu.js
│   └── utils/
│       ├── helpers.js
│       └── constants.js
├── assets/
│   ├── sprites/
│   │   ├── characters/
│   │   ├── weapons/
│   │   ├── items/
│   │   └── effects/
│   ├── audio/
│   │   ├── music/
│   │   └── sfx/
│   └── backgrounds/
└── server/ (multiplayer)
    ├── server.js
    ├── GameRoom.js
    └── PlayerManager.js
```

Core Game Loop:
```
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.lastTime = 0;
    this.players = [];
    this.enemies = [];
    this.items = [];
    this.projectiles = [];
  }

  gameLoop(timestamp) {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt) {
    // Update all game objects
    this.players.forEach(p => p.update(dt));
    this.enemies.forEach(e => e.update(dt));
    this.projectiles.forEach(proj => proj.update(dt));
    
    // Check collisions
    this.checkCollisions();
    
    // Remove dead objects
    this.cleanup();
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.stage.render(this.ctx);
    
    // Sort by Y position (Z-sorting)
    const renderables = [...this.players, ...this.enemies, ...this.items];
    renderables.sort((a, b) => a.y - b.y);
    
    // Render all objects
    renderables.forEach(obj => obj.render(this.ctx));
    this.projectiles.forEach(proj => proj.render(this.ctx));
    
    // Draw UI
    this.hud.render(this.ctx);
  }

  start() {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
}
```

Character Class Structure:
```
class Character {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hp = 100;
    this.mp = 100;
    this.vx = 0;
    this.vy = 0;
    this.state = 'idle'; // idle, walking, attacking, blocking, hit, dead
    this.facing = 'right'; // right or left
    this.animation = null;
    this.currentFrame = 0;
    this.hitbox = { x: 0, y: 0, width: 40, height: 60 };
    this.attackHitbox = null;
    this.loadSprites();
  }

  update(dt) {
    // Update position
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    
    // Update animation
    this.updateAnimation(dt);
    
    // Update state machine
    this.updateState(dt);
    
    // Apply friction
    this.vx *= 0.8;
    this.vy *= 0.8;
  }

  attack() {
    if (this.state !== 'attacking' && this.state !== 'hit') {
      this.state = 'attacking';
      this.animation = this.animations['punch'];
      this.currentFrame = 0;
      this.createAttackHitbox();
    }
  }

  takeDamage(damage, knockback) {
    this.hp -= damage;
    this.vx = knockback.x;
    this.vy = knockback.y;
    this.state = 'hit';
    
    if (this.hp <= 0) {
      this.die();
    }
  }

  render(ctx) {
    const sprite = this.animation.frames[this.currentFrame];
    ctx.drawImage(
      sprite,
      this.x - sprite.width / 2,
      this.y - sprite.height
    );
    
    // Draw health bar
    this.renderHealthBar(ctx);
  }
}
```

20. DEPLOYMENT:

Development:
- Local testing with `npx http-server` or Vite dev server
- Multiplayer local testing: Run server on localhost

Production:
- Frontend: Deploy to Vercel, Netlify, or GitHub Pages
- Backend (multiplayer): Deploy to Railway, Render, or Heroku
- CDN: Use Cloudflare for asset delivery
- Domain: Custom domain (battlegends.io)

Build Process:
- Minify JavaScript with Terser
- Compress sprites (use PNG-8 instead of PNG-24)
- Lazy load audio files
- Enable gzip compression
- Cache static assets

Start building by:
1. Set up HTML5 canvas and basic game loop (60 FPS)
2. Create character class with sprite rendering
3. Implement 8-directional movement with keyboard input
4. Add basic punch/kick attacks with hitbox detection
5. Implement collision detection (character-to-character)
6. Create AI enemies with simple chase/attack behavior
7. Add health bars and damage system
8. Implement special moves with mana cost
9. Create multiple characters with different stats
10. Build character selection screen
11. Add weapons and item pickup system
12. Implement mount/riding system
13. Create multiplayer with Socket.io (start with 1v1)
14. Add more game modes (survival, co-op, etc.)
15. Polish with particles, sound effects, and UI

Focus on making combat feel responsive and satisfying. The key to Hero Fighter's success is the smooth movement, satisfying hit feedback, and variety of attacks. Prioritize gameplay over graphics initially.
```

This comprehensive prompt will help Claude build a complete Hero Fighter-style game with all the core mechanics, multiplayer support, and polish that made the original game popular. The game combines beat 'em up mechanics with fighting game elements, supporting both single-player and online multiplayer modes.[1][2][3][4][5][6][7]

[1](https://en.wikipedia.org/wiki/Hero_Fighter)
[2](https://herofighter.fandom.com/wiki/Hero_Fighter_(game))
[3](https://steemit.com/gaming/@odone/review-hero-fighter-x)
[4](https://github.com/Ali-Cheikh/Fight-ME-Monk)
[5](https://www.getgud.io/blog/mastering-multiplayer-game-architecture-choosing-the-right-approach/)
[6](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)
[7](https://www.cs.cmu.edu/~ashu/papers/cmu-cs-05-112.pdf)
[8](https://www.reddit.com/r/Fighters/comments/qh7kpp/if_you_were_making_a_fighting_game_what_features/)
[9](https://hero-fighter-x.modcombo.com)
[10](https://apps.apple.com/hk/app/hero-fighter-x/id953435594?l=en-GB)
