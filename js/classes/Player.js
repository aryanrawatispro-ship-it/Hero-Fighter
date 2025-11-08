/**
 * Player Class
 * Player-controlled character
 */

class Player extends Character {
    constructor(x, y, type = 'FIGHTER') {
        super(x, y, type);
        this.color = GAME_CONSTANTS.COLORS.PLAYER;
        this.isPlayer = true;

        // Input buffering
        this.inputBuffer = [];
        this.lastInputTime = 0;

        // Special move tracking
        this.specialMoveInputs = [];
        this.specialMoveWindow = 500; // ms
    }

    update(dt, inputManager) {
        if (this.isDead) return;

        // Handle input
        this.handleInput(inputManager, dt);

        // Call parent update
        super.update(dt);
    }

    handleInput(inputManager, dt) {
        if (!inputManager || this.hitStunTimer > 0) return;

        // Get movement input
        const movement = inputManager.getNormalizedMovement();
        const isRunning = inputManager.isShift();

        // Movement
        if (movement.x !== 0 || movement.y !== 0) {
            this.move(movement.x, movement.y, isRunning);
        } else {
            // Idle if no movement
            if (this.state !== GAME_CONSTANTS.STATES.ATTACKING &&
                this.state !== GAME_CONSTANTS.STATES.BLOCKING &&
                this.state !== GAME_CONSTANTS.STATES.HIT &&
                this.state !== GAME_CONSTANTS.STATES.JUMPING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        }

        // Jump
        if (inputManager.isJumpPressed()) {
            this.jump();
        }

        // Attack
        if (inputManager.isAttackPressed()) {
            this.performAttack(movement);
        }

        // Special move
        if (inputManager.isSpecialPressed()) {
            this.performSpecialMove(movement);
        }

        // Block
        this.block(inputManager.isDefend());

        // Update input manager
        inputManager.update();
    }

    performAttack(movement) {
        // Different attacks based on direction
        if (movement.y < 0) {
            // Up + Attack = Uppercut
            this.uppercut();
        } else if (movement.y > 0) {
            // Down + Attack = Sweep
            this.sweep();
        } else if (!this.isOnGround) {
            // Aerial attack
            this.aerialKick();
        } else {
            // Normal attack
            this.attack();
        }
    }

    uppercut() {
        if (this.attackCooldown > 0 || this.isAttacking) return;

        this.isAttacking = true;
        this.state = GAME_CONSTANTS.STATES.ATTACKING;
        this.attackCooldown = 0.6;
        this.animationTime = 0;

        this.currentAttackDamage = GAME_CONSTANTS.UPPERCUT_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.HEAVY_KNOCKBACK;

        // Launch self upward slightly
        if (this.isOnGround) {
            this.vy = -8;
            this.isOnGround = false;
        }

        // Create attack hitbox
        const hitboxWidth = 50;
        const hitboxHeight = 60;
        const offsetX = this.facing === 'right' ? this.width / 2 : -this.width / 2 - hitboxWidth;

        this.attackHitbox = {
            x: this.x + offsetX,
            y: this.y - this.height - 20,
            width: hitboxWidth,
            height: hitboxHeight
        };

        setTimeout(() => {
            this.isAttacking = false;
            this.attackHitbox = null;
            if (this.state === GAME_CONSTANTS.STATES.ATTACKING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        }, 400);
    }

    sweep() {
        if (this.attackCooldown > 0 || this.isAttacking || !this.isOnGround) return;

        this.isAttacking = true;
        this.state = GAME_CONSTANTS.STATES.ATTACKING;
        this.attackCooldown = 0.5;
        this.animationTime = 0;

        this.currentAttackDamage = GAME_CONSTANTS.SWEEP_KICK_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.MEDIUM_KNOCKBACK;

        // Create low attack hitbox
        const hitboxWidth = 70;
        const hitboxHeight = 30;
        const offsetX = this.facing === 'right' ? this.width / 2 : -this.width / 2 - hitboxWidth;

        this.attackHitbox = {
            x: this.x + offsetX,
            y: this.y - 20,
            width: hitboxWidth,
            height: hitboxHeight
        };

        setTimeout(() => {
            this.isAttacking = false;
            this.attackHitbox = null;
            if (this.state === GAME_CONSTANTS.STATES.ATTACKING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        }, 350);
    }

    aerialKick() {
        if (this.isAttacking || this.isOnGround) return;

        this.isAttacking = true;
        this.attackCooldown = 0.4;
        this.animationTime = 0;

        this.currentAttackDamage = GAME_CONSTANTS.AERIAL_KICK_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.LIGHT_KNOCKBACK;

        // Aerial attack hitbox
        const hitboxWidth = 55;
        const hitboxHeight = 45;
        const offsetX = this.facing === 'right' ? this.width / 2 : -this.width / 2 - hitboxWidth;

        this.attackHitbox = {
            x: this.x + offsetX,
            y: this.y - this.height / 2,
            width: hitboxWidth,
            height: hitboxHeight
        };

        setTimeout(() => {
            this.isAttacking = false;
            this.attackHitbox = null;
        }, 300);
    }

    performSpecialMove(movement) {
        // Fireball (no directional input needed for now)
        if (this.mp >= GAME_CONSTANTS.FIREBALL_MP_COST) {
            this.fireball();
        }
    }

    fireball() {
        if (this.attackCooldown > 0 || this.isAttacking) return;
        if (this.mp < GAME_CONSTANTS.FIREBALL_MP_COST) return;

        // Consume MP
        this.mp -= GAME_CONSTANTS.FIREBALL_MP_COST;

        this.isAttacking = true;
        this.attackCooldown = 0.8;

        // Create projectile
        const direction = this.facing === 'right' ? 1 : -1;
        const projectile = new Projectile(
            this.x + direction * 30,
            this.y - this.height / 2,
            direction * 10, // velocity X
            0, // velocity Y
            GAME_CONSTANTS.FIREBALL_DAMAGE,
            'player'
        );

        // Add to game
        if (game) {
            game.addProjectile(projectile);
        }

        setTimeout(() => {
            this.isAttacking = false;
            if (this.state === GAME_CONSTANTS.STATES.ATTACKING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        }, 500);
    }

    render(ctx) {
        super.render(ctx);

        // Draw MP bar above HP bar
        if (!this.isDead) {
            const barWidth = 50;
            const barHeight = 3;
            const x = this.x - barWidth / 2;
            const y = this.y - this.height - 22;

            const mpPercent = this.mp / this.maxMP;

            // Background
            ctx.fillStyle = '#222';
            ctx.fillRect(x, y, barWidth, barHeight);

            // MP
            ctx.fillStyle = GAME_CONSTANTS.COLORS.MP_BAR;
            ctx.fillRect(x, y, barWidth * mpPercent, barHeight);
        }
    }
}
