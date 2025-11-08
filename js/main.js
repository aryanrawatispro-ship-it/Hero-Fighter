/**
 * Battle Legends - Main Game Class
 * Core game loop and management
 */

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Game state
        this.lastTime = 0;
        this.deltaTime = 0;
        this.gameMode = GAME_CONSTANTS.GAME_MODES.MENU;
        this.isPaused = false;
        this.isRunning = false;

        // Game objects
        this.players = [];
        this.enemies = [];
        this.items = [];
        this.projectiles = [];
        this.particles = [];

        // Systems
        this.inputManager = null;
        this.collisionManager = null;
        this.audioManager = null;
        this.stage = null;

        // UI
        this.mainMenu = null;
        this.hud = null;

        // Game timer
        this.gameTime = 90; // seconds
        this.gameTimer = 0;

        // Combo tracking
        this.comboCount = 0;
        this.comboTimer = 0;

        // Debug mode
        this.debug = false;

        this.init();
    }

    init() {
        console.log('Initializing Battle Legends...');

        // Initialize systems
        this.inputManager = new InputManager();
        this.collisionManager = new CollisionManager();
        this.audioManager = new AudioManager();

        // Initialize UI
        this.mainMenu = new MainMenu(this);
        this.hud = new HUD(this);

        // Setup canvas
        this.setupCanvas();

        // Setup event listeners
        this.setupEventListeners();

        console.log('Game initialized successfully!');
    }

    setupCanvas() {
        // Set canvas size
        this.canvas.width = GAME_CONSTANTS.CANVAS_WIDTH;
        this.canvas.height = GAME_CONSTANTS.CANVAS_HEIGHT;

        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = false;
    }

    setupEventListeners() {
        // Pause game on ESC
        this.inputManager.on('pause', () => {
            if (this.gameMode !== GAME_CONSTANTS.GAME_MODES.MENU) {
                this.togglePause();
            }
        });

        // Debug mode toggle (F3)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'F3') {
                this.debug = !this.debug;
                console.log('Debug mode:', this.debug ? 'ON' : 'OFF');
            }
        });

        // Window visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !this.isPaused) {
                this.togglePause();
            }
        });
    }

    startGame(mode = 'single_player') {
        console.log('Starting game in mode:', mode);

        this.gameMode = mode;
        this.isPaused = false;
        this.gameTime = 90;
        this.gameTimer = 0;

        // Clear all game objects
        this.players = [];
        this.enemies = [];
        this.items = [];
        this.projectiles = [];
        this.particles = [];

        // Create stage
        this.stage = new Stage('dojo');

        // Create player
        const player = new Player(400, 400, 'FIGHTER');
        this.players.push(player);

        // Create some test enemies
        if (mode === 'single_player') {
            this.spawnEnemy(600, 400, 'FIGHTER');
            this.spawnEnemy(700, 300, 'FIGHTER');
        }

        // Hide menu, show HUD
        document.getElementById('menu-overlay').classList.remove('active');
        document.getElementById('hud').style.display = 'block';

        // Start game loop if not running
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.gameLoop(this.lastTime);
        }
    }

    spawnEnemy(x, y, type = 'FIGHTER') {
        const enemy = new Enemy(x, y, type);
        this.enemies.push(enemy);
    }

    gameLoop(timestamp) {
        if (!this.isRunning) return;

        // Calculate delta time (in seconds)
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Cap delta time to prevent large jumps
        this.deltaTime = Math.min(this.deltaTime, 0.1);

        // Update and render
        if (!this.isPaused) {
            this.update(this.deltaTime);
        }
        this.render();

        // Continue loop
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        if (this.gameMode === GAME_CONSTANTS.GAME_MODES.MENU) {
            return;
        }

        // Update game timer
        this.gameTimer += dt;
        this.gameTime = Math.max(0, 90 - this.gameTimer);

        // Update combo timer
        if (this.comboTimer > 0) {
            this.comboTimer -= dt * 1000;
            if (this.comboTimer <= 0) {
                this.resetCombo();
            }
        }

        // Update all players
        this.players.forEach(player => {
            player.update(dt, this.inputManager);
        });

        // Update all enemies
        this.enemies.forEach(enemy => {
            enemy.update(dt, this.players);
        });

        // Update projectiles
        this.projectiles = this.projectiles.filter(proj => {
            proj.update(dt);
            return proj.active;
        });

        // Update items
        this.items.forEach(item => {
            item.update(dt);
        });

        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.update(dt);
            return particle.active;
        });

        // Check collisions
        this.handleCollisions();

        // Remove dead enemies
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);

        // Check win/lose conditions
        this.checkGameEnd();

        // Update HUD
        this.hud.update(dt);
    }

    handleCollisions() {
        // Player vs Enemy collisions
        this.players.forEach(player => {
            this.enemies.forEach(enemy => {
                this.collisionManager.handleCharacterCollision(player, enemy);

                // Check attack collisions
                if (player.isAttacking && player.attackHitbox) {
                    if (this.collisionManager.checkAttackHit(player, enemy)) {
                        this.onAttackHit(player, enemy);
                    }
                }

                if (enemy.isAttacking && enemy.attackHitbox) {
                    if (this.collisionManager.checkAttackHit(enemy, player)) {
                        this.onAttackHit(enemy, player);
                    }
                }
            });
        });

        // Projectile collisions
        this.projectiles.forEach(proj => {
            if (proj.owner === 'player') {
                this.enemies.forEach(enemy => {
                    if (this.collisionManager.checkProjectileHit(proj, enemy)) {
                        enemy.takeDamage(proj.damage, proj.vx * 2, proj.vy * 2);
                        proj.active = false;
                        this.addComboHit();
                    }
                });
            } else {
                this.players.forEach(player => {
                    if (this.collisionManager.checkProjectileHit(proj, player)) {
                        player.takeDamage(proj.damage, proj.vx * 2, proj.vy * 2);
                        proj.active = false;
                    }
                });
            }
        });
    }

    onAttackHit(attacker, target) {
        // Calculate damage
        let damage = attacker.currentAttackDamage || GAME_CONSTANTS.LIGHT_PUNCH_DAMAGE;
        damage *= attacker.attackMultiplier;

        // Calculate knockback
        const knockbackForce = attacker.currentKnockback || GAME_CONSTANTS.LIGHT_KNOCKBACK;
        const direction = attacker.facing === 'right' ? 1 : -1;
        const knockbackX = direction * knockbackForce;
        const knockbackY = -knockbackForce * 0.3;

        // Apply damage
        target.takeDamage(damage, knockbackX, knockbackY);

        // Add combo if player is attacker
        if (this.players.includes(attacker)) {
            this.addComboHit();
        }

        // Create hit particle effect
        this.createHitEffect(target.x, target.y - 30);

        // Play hit sound
        this.audioManager.playSound('hit');
    }

    addComboHit() {
        this.comboCount++;
        this.comboTimer = GAME_CONSTANTS.COMBO_TIMEOUT;

        // Show combo counter
        const comboElement = document.getElementById('combo-counter');
        if (this.comboCount > 1) {
            comboElement.style.display = 'block';
            document.getElementById('combo-count').textContent = this.comboCount;
        }
    }

    resetCombo() {
        this.comboCount = 0;
        document.getElementById('combo-counter').style.display = 'none';
    }

    createHitEffect(x, y) {
        // Create particle effect for hit
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Helpers.randomFloat(2, 5);
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.5,
                maxLife: 0.5,
                color: '#ffaa00',
                size: Helpers.randomInt(3, 6),
                active: true,
                update(dt) {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.life -= dt;
                    if (this.life <= 0) this.active = false;
                },
                render(ctx) {
                    const alpha = this.life / this.maxLife;
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = alpha;
                    ctx.fillRect(this.x, this.y, this.size, this.size);
                    ctx.globalAlpha = 1;
                }
            };
            this.particles.push(particle);
        }
    }

    checkGameEnd() {
        // Check if time is up
        if (this.gameTime <= 0) {
            this.endGame('timeout');
            return;
        }

        // Check if all enemies are dead (win)
        if (this.gameMode === 'single_player' && this.enemies.length === 0) {
            this.endGame('win');
            return;
        }

        // Check if player is dead (lose)
        if (this.players.length > 0 && this.players[0].isDead) {
            this.endGame('lose');
            return;
        }
    }

    endGame(result) {
        console.log('Game ended:', result);
        this.isPaused = true;

        // Show result screen
        setTimeout(() => {
            alert(result === 'win' ? 'Victory!' : result === 'lose' ? 'Defeat!' : 'Time Up!');
            this.returnToMenu();
        }, 1000);
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameMode === GAME_CONSTANTS.GAME_MODES.MENU) {
            // Render menu background
            this.renderMenuBackground();
            return;
        }

        // Render stage background
        if (this.stage) {
            this.stage.render(this.ctx);
        }

        // Collect all renderable objects and sort by Y position (Z-sorting)
        const renderables = [
            ...this.players,
            ...this.enemies,
            ...this.items
        ];
        renderables.sort((a, b) => a.y - b.y);

        // Render all objects
        renderables.forEach(obj => obj.render(this.ctx));

        // Render projectiles (always on top of characters)
        this.projectiles.forEach(proj => proj.render(this.ctx));

        // Render particles
        this.particles.forEach(particle => particle.render(this.ctx));

        // Render debug info
        if (this.debug) {
            this.renderDebug();
        }
    }

    renderMenuBackground() {
        // Simple gradient background for menu
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a0000');
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Title
        this.ctx.fillStyle = '#ff4444';
        this.ctx.font = 'bold 72px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BATTLE LEGENDS', this.canvas.width / 2, 200);
    }

    renderDebug() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'left';

        const debugInfo = [
            `FPS: ${Math.round(1 / this.deltaTime)}`,
            `Players: ${this.players.length}`,
            `Enemies: ${this.enemies.length}`,
            `Projectiles: ${this.projectiles.length}`,
            `Particles: ${this.particles.length}`,
            `Combo: ${this.comboCount}`,
            `Time: ${Math.floor(this.gameTime)}s`
        ];

        debugInfo.forEach((info, i) => {
            this.ctx.fillText(info, 10, 20 + i * 20);
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        console.log('Game', this.isPaused ? 'paused' : 'resumed');
    }

    returnToMenu() {
        this.gameMode = GAME_CONSTANTS.GAME_MODES.MENU;
        this.isPaused = false;

        // Clear game objects
        this.players = [];
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];

        // Show menu
        document.getElementById('menu-overlay').classList.add('active');
        document.getElementById('hud').style.display = 'none';
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating game...');
    game = new Game();
});
