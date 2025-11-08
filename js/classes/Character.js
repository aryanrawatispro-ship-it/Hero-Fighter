/**
 * Character Base Class
 * Base class for all characters (players and enemies)
 */

class Character {
    static nextId = 0;

    constructor(x, y, type = 'FIGHTER') {
        this.id = Character.nextId++;
        this.x = x;
        this.y = y;
        this.z = 0; // For depth sorting

        // Type and stats
        this.type = type;
        const stats = GAME_CONSTANTS.CHARACTER_TYPES[type];
        this.maxHP = stats.hp;
        this.hp = this.maxHP;
        this.maxMP = GAME_CONSTANTS.BASE_MP;
        this.mp = this.maxMP;

        this.attackMultiplier = stats.attackMultiplier;
        this.defenseMultiplier = stats.defenseMultiplier;
        this.speedMultiplier = stats.speedMultiplier;
        this.jumpHeight = stats.jumpHeight;

        // Velocity
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;

        // State
        this.state = GAME_CONSTANTS.STATES.IDLE;
        this.facing = 'right'; // 'right' or 'left'
        this.isOnGround = true;
        this.isAttacking = false;
        this.isBlocking = false;
        this.isInvincible = false;
        this.isDead = false;

        // Hitboxes
        this.width = GAME_CONSTANTS.CHARACTER_WIDTH;
        this.height = GAME_CONSTANTS.CHARACTER_HEIGHT;
        this.attackHitbox = null;

        // Animation
        this.animationTime = 0;
        this.currentAnimation = 'idle';
        this.animationFrame = 0;

        // Attack properties
        this.attackCooldown = 0;
        this.currentAttackDamage = 0;
        this.currentKnockback = 0;
        this.comboChain = 0;

        // Timers
        this.stunTimer = 0;
        this.invincibilityTimer = 0;
        this.hitStunTimer = 0;

        // Ground level
        this.groundY = 500;

        // Color (for placeholder rendering)
        this.color = GAME_CONSTANTS.COLORS.PLAYER;
    }

    update(dt) {
        // Update timers
        this.updateTimers(dt);

        // Apply physics
        this.applyPhysics(dt);

        // Update animation
        this.updateAnimation(dt);

        // Update state machine
        this.updateState(dt);

        // Clear attack hitbox if attack animation is done
        if (!this.isAttacking && this.attackHitbox) {
            this.attackHitbox = null;
        }

        // Check if on ground
        this.checkGround();

        // Regenerate MP slowly
        if (this.mp < this.maxMP) {
            this.mp = Math.min(this.maxMP, this.mp + GAME_CONSTANTS.MP_REGEN_RATE * dt);
        }
    }

    updateTimers(dt) {
        if (this.attackCooldown > 0) {
            this.attackCooldown -= dt;
        }

        if (this.stunTimer > 0) {
            this.stunTimer -= dt;
        }

        if (this.invincibilityTimer > 0) {
            this.invincibilityTimer -= dt;
            this.isInvincible = this.invincibilityTimer > 0;
        }

        if (this.hitStunTimer > 0) {
            this.hitStunTimer -= dt;
        }
    }

    applyPhysics(dt) {
        // Apply gravity if not on ground
        if (!this.isOnGround) {
            this.vy += GAME_CONSTANTS.GRAVITY * dt * 60;
        } else {
            this.vy = 0;
        }

        // Apply friction
        this.vx *= GAME_CONSTANTS.FRICTION;

        // Update position
        this.x += this.vx * dt * 60;
        this.y += this.vy * dt * 60;

        // Clamp to stage bounds
        this.x = Helpers.clamp(this.x, 50, GAME_CONSTANTS.CANVAS_WIDTH - 50);
        this.y = Helpers.clamp(this.y, 50, this.groundY);
    }

    checkGround() {
        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.isOnGround = true;
            this.vy = 0;

            // Land from jump
            if (this.state === GAME_CONSTANTS.STATES.JUMPING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        } else {
            this.isOnGround = false;
        }
    }

    updateState(dt) {
        // Override in subclasses
    }

    updateAnimation(dt) {
        this.animationTime += dt;

        // Simple frame cycling
        const frameRate = 10;
        this.animationFrame = Math.floor(this.animationTime * frameRate) % 4;
    }

    // Movement
    move(dx, dy, running = false) {
        if (this.hitStunTimer > 0 || this.isAttacking) return;

        const speed = running ? GAME_CONSTANTS.RUN_SPEED : GAME_CONSTANTS.WALK_SPEED;
        const finalSpeed = speed * this.speedMultiplier;

        this.vx = dx * finalSpeed;

        if (this.isOnGround) {
            this.vy = dy * finalSpeed;
        }

        // Update facing direction
        if (dx > 0) this.facing = 'right';
        else if (dx < 0) this.facing = 'left';

        // Update state
        if (dx !== 0 || dy !== 0) {
            this.state = running ? GAME_CONSTANTS.STATES.RUNNING : GAME_CONSTANTS.STATES.WALKING;
        } else if (this.state === GAME_CONSTANTS.STATES.WALKING || this.state === GAME_CONSTANTS.STATES.RUNNING) {
            this.state = GAME_CONSTANTS.STATES.IDLE;
        }
    }

    // Jumping
    jump() {
        if (this.isOnGround && this.hitStunTimer <= 0) {
            this.vy = -this.jumpHeight;
            this.isOnGround = false;
            this.state = GAME_CONSTANTS.STATES.JUMPING;
        }
    }

    // Attacking
    attack() {
        if (this.attackCooldown > 0 || this.isAttacking || this.hitStunTimer > 0) return;

        this.isAttacking = true;
        this.state = GAME_CONSTANTS.STATES.ATTACKING;
        this.attackCooldown = 0.5; // 500ms cooldown
        this.animationTime = 0;

        // Determine attack type and damage
        this.currentAttackDamage = GAME_CONSTANTS.LIGHT_PUNCH_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.LIGHT_KNOCKBACK;

        // Create attack hitbox
        const hitboxWidth = 60;
        const hitboxHeight = 40;
        const offsetX = this.facing === 'right' ? this.width / 2 : -this.width / 2 - hitboxWidth;

        this.attackHitbox = {
            x: this.x + offsetX,
            y: this.y - this.height / 2,
            width: hitboxWidth,
            height: hitboxHeight
        };

        // Attack animation duration
        setTimeout(() => {
            this.isAttacking = false;
            this.attackHitbox = null;
            if (this.state === GAME_CONSTANTS.STATES.ATTACKING) {
                this.state = GAME_CONSTANTS.STATES.IDLE;
            }
        }, 300); // 300ms attack duration
    }

    // Blocking
    block(shouldBlock) {
        if (this.hitStunTimer > 0 || this.isAttacking) return;

        this.isBlocking = shouldBlock;
        if (shouldBlock) {
            this.state = GAME_CONSTANTS.STATES.BLOCKING;
        } else if (this.state === GAME_CONSTANTS.STATES.BLOCKING) {
            this.state = GAME_CONSTANTS.STATES.IDLE;
        }
    }

    // Taking damage
    takeDamage(damage, knockbackX = 0, knockbackY = 0) {
        if (this.isInvincible || this.isDead) return;

        // Reduce damage if blocking
        if (this.isBlocking) {
            damage *= GAME_CONSTANTS.BLOCK_DAMAGE_REDUCTION;
            knockbackX *= 0.5;
            knockbackY *= 0.5;
        }

        // Apply defense multiplier
        damage *= (1 - this.defenseMultiplier);

        // Apply damage
        this.hp -= damage;
        this.hp = Math.max(0, this.hp);

        // Apply knockback
        this.vx = knockbackX;
        this.vy = knockbackY;

        // Hit stun
        this.hitStunTimer = 0.3;
        this.state = GAME_CONSTANTS.STATES.HIT;

        // Flash invincibility
        this.invincibilityTimer = 0.2;

        // Check if dead
        if (this.hp <= 0) {
            this.die();
        } else {
            // Return to idle after hit stun
            setTimeout(() => {
                if (this.state === GAME_CONSTANTS.STATES.HIT) {
                    this.state = GAME_CONSTANTS.STATES.IDLE;
                }
            }, 300);
        }
    }

    die() {
        this.isDead = true;
        this.state = GAME_CONSTANTS.STATES.DEAD;
        console.log(`Character ${this.id} died`);
    }

    // Get hitbox for collision
    getHitbox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height,
            width: this.width,
            height: this.height
        };
    }

    // Rendering
    render(ctx) {
        if (this.isDead) return;

        // Draw shadow
        this.renderShadow(ctx);

        // Flicker when invincible
        if (this.isInvincible && Math.floor(this.animationTime * 20) % 2 === 0) {
            return;
        }

        // Draw character body (placeholder rectangle)
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height,
            this.width,
            this.height
        );

        // Draw facing indicator
        ctx.fillStyle = this.facing === 'right' ? '#fff' : '#000';
        ctx.fillRect(
            this.x + (this.facing === 'right' ? 10 : -15),
            this.y - this.height + 10,
            5,
            10
        );

        // Draw health bar
        this.renderHealthBar(ctx);

        // Draw attack hitbox (debug)
        if (this.attackHitbox && game && game.debug) {
            ctx.fillStyle = GAME_CONSTANTS.COLORS.ATTACK_HITBOX;
            ctx.fillRect(
                this.attackHitbox.x,
                this.attackHitbox.y,
                this.attackHitbox.width,
                this.attackHitbox.height
            );
        }

        // Draw hitbox outline (debug)
        if (game && game.debug) {
            const hitbox = this.getHitbox();
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        }
    }

    renderShadow(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.ellipse(this.x, this.y + 5, this.width / 2, 8, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    renderHealthBar(ctx) {
        const barWidth = 50;
        const barHeight = 5;
        const x = this.x - barWidth / 2;
        const y = this.y - this.height - 15;

        const hpPercent = this.hp / this.maxHP;

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, barWidth, barHeight);

        // HP
        ctx.fillStyle = Helpers.getHPBarColor(hpPercent);
        ctx.fillRect(x, y, barWidth * hpPercent, barHeight);

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barWidth, barHeight);
    }
}
