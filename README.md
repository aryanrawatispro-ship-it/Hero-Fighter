# Battle Legends - 2D Beat 'Em Up Fighter

A Hero Fighter-style 2D multiplayer fighting game built with HTML5 Canvas and JavaScript.

## Features Implemented (v0.1.0)

### Core Gameplay
- ✅ 60 FPS game loop with delta time
- ✅ 8-directional movement system
- ✅ Walking and running (hold Shift)
- ✅ Jumping mechanics
- ✅ Ground detection and physics
- ✅ Stage boundaries

### Combat System
- ✅ Basic attack (punch)
- ✅ Uppercut (Up + Attack) - launches enemies
- ✅ Sweep kick (Down + Attack) - low attack
- ✅ Aerial kick (Jump + Attack)
- ✅ Special move: Fireball (K key, costs 30 MP)
- ✅ Blocking/Defense (L key)
- ✅ Hit detection with hitboxes
- ✅ Knockback system
- ✅ Combo counter
- ✅ Attack cooldowns

### Character System
- ✅ 5 character types (Fighter, Tank, Assassin, Mage, Monk)
- ✅ HP/MP system
- ✅ MP regeneration
- ✅ Defense multipliers
- ✅ Speed multipliers
- ✅ Character stats (attack, defense, speed)
- ✅ Invincibility frames after hit
- ✅ Hit stun mechanics

### AI System
- ✅ Enemy AI with multiple behaviors:
  - Idle
  - Patrol
  - Chase
  - Attack
  - Retreat (when low HP)
  - Block
- ✅ Detection range
- ✅ Attack range
- ✅ Aggressive behavior
- ✅ Multiple attack patterns

### Visual Features
- ✅ Placeholder character rendering (colored rectangles)
- ✅ Health bars above characters
- ✅ MP bars for players
- ✅ Character shadows
- ✅ Facing direction indicators
- ✅ Hit particle effects
- ✅ Projectile glow effects
- ✅ Stage backgrounds (Dojo, Street, Forest)
- ✅ HUD with HP/MP bars
- ✅ Timer
- ✅ Combo counter

### Game Modes
- ✅ Main menu
- ✅ Single player vs AI
- ✅ Training mode (implicit)

### Systems
- ✅ Input management (keyboard)
- ✅ Collision detection (AABB)
- ✅ Physics engine (gravity, friction)
- ✅ Audio manager (placeholder)
- ✅ Animation manager
- ✅ Debug mode (F3 key)

## Controls

### Movement
- **WASD** or **Arrow Keys**: 8-directional movement
- **Shift + Movement**: Run

### Combat
- **J**: Attack (punch)
- **Up + J**: Uppercut
- **Down + J**: Sweep kick
- **Space**: Jump
- **Jump + J**: Aerial kick
- **K**: Special move (Fireball, costs 30 MP)
- **L**: Block/Defend

### System
- **ESC**: Pause game
- **F3**: Toggle debug mode

## How to Run

### Local Development

1. Clone the repository
2. Open a terminal in the project directory
3. Start a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Python 2
   python -m SimpleHTTPServer 8000

   # Or using Node.js http-server
   npx http-server
   ```
4. Open your browser and navigate to `http://localhost:8000`
5. Click "Single Player" to start the game

### Deployment

This is a static HTML5 game that can be deployed on any static hosting service:

#### Option 1: Render (Static Site)
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Static Site"
4. Connect your GitHub repository
5. Render will auto-detect the `render.yaml` configuration
6. Click "Create Static Site"
7. Your game will be live at `https://your-app-name.onrender.com`

#### Option 2: Vercel (Recommended for static sites)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
Or connect your GitHub repo at [vercel.com](https://vercel.com)

#### Option 3: Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop your project folder
3. Or connect your GitHub repository
4. Instant deployment!

#### Option 4: GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Set source to main branch / root

# Your game will be at:
# https://yourusername.github.io/Hero-Fighter/
```

All options are **FREE** for static sites!

### File Structure

```
Hero-Fighter/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Game styling
├── js/
│   ├── main.js            # Game loop and core logic
│   ├── classes/
│   │   ├── Character.js   # Base character class
│   │   ├── Player.js      # Player character
│   │   ├── Enemy.js       # AI-controlled enemy
│   │   ├── Projectile.js  # Projectiles (fireball, etc.)
│   │   ├── Weapon.js      # Weapons (not yet used)
│   │   ├── Item.js        # Items (health, mana, etc.)
│   │   └── Stage.js       # Battle arena
│   ├── systems/
│   │   ├── InputManager.js      # Keyboard input
│   │   ├── CollisionManager.js  # Collision detection
│   │   ├── AnimationManager.js  # Animation system
│   │   ├── PhysicsEngine.js     # Physics calculations
│   │   └── AudioManager.js      # Sound (placeholder)
│   ├── ui/
│   │   ├── MainMenu.js          # Main menu
│   │   ├── HUD.js               # In-game HUD
│   │   ├── CharacterSelect.js   # Character selection (placeholder)
│   │   └── PauseMenu.js         # Pause menu (placeholder)
│   └── utils/
│       ├── constants.js         # Game constants
│       └── helpers.js           # Utility functions
├── assets/                      # Assets folder (empty for now)
└── CLAUDE.md                    # Full game specification
```

## Game Mechanics

### Character Stats

| Type     | HP  | ATK  | DEF | SPD  | Jump |
|----------|-----|------|-----|------|------|
| Fighter  | 150 | 1.0x | 10% | 1.0x | 15   |
| Tank     | 200 | 0.8x | 30% | 0.8x | 12   |
| Assassin | 100 | 1.2x | 0%  | 1.3x | 18   |
| Mage     | 120 | 1.5x | 5%  | 0.9x | 14   |
| Monk     | 130 | 1.1x | 15% | 1.1x | 16   |

### Attack Damage

- Light Punch: 5 damage
- Heavy Punch: 15 damage
- Uppercut: 12 damage
- Sweep Kick: 10 damage
- Aerial Kick: 8 damage
- Fireball: 20 damage (costs 30 MP)

### Defense
- Block: Reduces damage by 50%
- Block also reduces knockback by 50%

## Roadmap

### Version 0.2.0 (Planned)
- [ ] Sprite animations (replace placeholder rectangles)
- [ ] More special moves
- [ ] Weapon pickup system
- [ ] Item system (health/mana potions)
- [ ] Multiple stages
- [ ] Sound effects
- [ ] Background music

### Version 0.3.0 (Planned)
- [ ] Character selection screen
- [ ] Story mode
- [ ] Boss fights
- [ ] Survival mode
- [ ] Better AI patterns

### Version 1.0.0 (Planned)
- [ ] Multiplayer (local)
- [ ] Online multiplayer (Socket.io)
- [ ] Ranked matches
- [ ] Player progression
- [ ] Unlockables
- [ ] Mobile support

## Debug Mode

Press **F3** to toggle debug mode. This shows:
- FPS counter
- Object counts (players, enemies, projectiles, particles)
- Hitbox visualization (green = character hitbox, red = attack hitbox)
- Combo count
- Game timer

## Technical Details

- **Engine**: Vanilla JavaScript with HTML5 Canvas
- **Resolution**: 1280x720 (16:9)
- **Target FPS**: 60
- **Physics**: Custom physics engine with gravity and friction
- **Collision**: AABB (Axis-Aligned Bounding Box)
- **Rendering**: Layer-based with Y-sorting for depth

## Known Issues

- Audio system is placeholder (no actual sounds)
- Characters are placeholder rectangles (no sprites yet)
- No animations (static rendering)
- Multiplayer not implemented
- Some UI elements are placeholders

## Contributing

This is a demonstration project. Full specifications are available in `CLAUDE.md`.

## Credits

Inspired by the classic game "Hero Fighter" by Marti Wong.

## License

This project is for educational purposes.
