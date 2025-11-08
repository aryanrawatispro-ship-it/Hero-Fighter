/**
 * Enemy Class
 * AI-controlled character
 */

class Enemy extends Character {
    constructor(x, y, type = 'FIGHTER') {
        super(x, y, type);
        this.color = GAME_CONSTANTS.COLORS.ENEMY;
        this.isEnemy = true;

        // AI properties
        this.aiState = 'idle'; // idle, patrol, chase, attack, retreat
        this.target = null;
        this.detectionRange = GAME_CONSTANTS.AI_DETECTION_RANGE;
        this.attackRange = GAME_CONSTANTS.MELEE_ATTACK_RANGE;

        // AI timers
        this.aiThinkTimer = 0;
        this.aiThinkInterval = 0.3; // Think every 300ms
        this.patrolTimer = 0;
        this.patrolDirection = Math.random() > 0.5 ? 1 : -1;

        // AI behavior parameters
        this.aggressiveness = 0.7; // 0-1, how likely to attack
        this.retreatThreshold = 0.2; // Retreat when HP < 20%
    }

    update(dt, players = []) {
        if (this.isDead) return;

        // Find target
        if (players && players.length > 0) {
            this.target = this.findNearestPlayer(players);
        }

        // AI decision making
        this.updateAI(dt);

        // Call parent update
        super.update(dt);
    }

    findNearestPlayer(players) {
        let nearest = null;
        let minDist = Infinity;

        players.forEach(player => {
            if (player.isDead) return;
            const dist = Helpers.getDistance(this.x, this.y, player.x, player.y);
            if (dist < minDist) {
                minDist = dist;
                nearest = player;
            }
        });

        return nearest;
    }

    updateAI(dt) {
        // AI think timer
        this.aiThinkTimer -= dt;
        if (this.aiThinkTimer > 0) {
            // Execute current behavior
            this.executeBehavior(dt);
            return;
        }

        // Reset think timer
        this.aiThinkTimer = this.aiThinkInterval;

        // Decide behavior
        this.decideBehavior();

        // Execute behavior
        this.executeBehavior(dt);
    }

    decideBehavior() {
        if (!this.target) {
            this.aiState = 'patrol';
            return;
        }

        const distToTarget = Helpers.getDistance(this.x, this.y, this.target.x, this.target.y);

        // Retreat if low HP
        if (this.hp / this.maxHP < this.retreatThreshold) {
            this.aiState = 'retreat';
            return;
        }

        // Attack if in range
        if (distToTarget < this.attackRange) {
            if (Math.random() < this.aggressiveness) {
                this.aiState = 'attack';
            } else if (Math.random() < 0.3) {
                this.aiState = 'block';
            } else {
                this.aiState = 'idle';
            }
            return;
        }

        // Chase if target in detection range
        if (distToTarget < this.detectionRange) {
            this.aiState = 'chase';
            return;
        }

        // Default to patrol
        this.aiState = 'patrol';
    }

    executeBehavior(dt) {
        switch (this.aiState) {
            case 'idle':
                this.behaviorIdle();
                break;
            case 'patrol':
                this.behaviorPatrol(dt);
                break;
            case 'chase':
                this.behaviorChase();
                break;
            case 'attack':
                this.behaviorAttack();
                break;
            case 'retreat':
                this.behaviorRetreat();
                break;
            case 'block':
                this.behaviorBlock();
                break;
        }
    }

    behaviorIdle() {
        // Do nothing
        if (this.state !== GAME_CONSTANTS.STATES.ATTACKING &&
            this.state !== GAME_CONSTANTS.STATES.HIT) {
            this.state = GAME_CONSTANTS.STATES.IDLE;
        }
    }

    behaviorPatrol(dt) {
        if (this.hitStunTimer > 0 || this.isAttacking) return;

        this.patrolTimer -= dt;
        if (this.patrolTimer <= 0) {
            // Change patrol direction
            this.patrolDirection *= -1;
            this.patrolTimer = Helpers.randomFloat(1, 3);
        }

        this.move(this.patrolDirection, 0, false);
    }

    behaviorChase() {
        if (!this.target || this.hitStunTimer > 0 || this.isAttacking) return;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            this.move(dx / dist, dy / dist, true);
        }
    }

    behaviorAttack() {
        if (this.attackCooldown > 0 || this.isAttacking) return;

        // Random attack type
        const rand = Math.random();
        if (rand < 0.7) {
            this.attack();
        } else if (rand < 0.9) {
            this.uppercut();
        } else {
            this.sweep();
        }
    }

    behaviorRetreat() {
        if (!this.target || this.hitStunTimer > 0 || this.isAttacking) return;

        const dx = this.x - this.target.x;
        const dy = this.y - this.target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            this.move(dx / dist, dy / dist, true);
        }
    }

    behaviorBlock() {
        this.block(true);

        // Stop blocking after a moment
        setTimeout(() => {
            this.block(false);
        }, 500);
    }

    // Attack variants (similar to player)
    uppercut() {
        if (this.attackCooldown > 0 || this.isAttacking) return;

        this.isAttacking = true;
        this.state = GAME_CONSTANTS.STATES.ATTACKING;
        this.attackCooldown = 0.6;

        this.currentAttackDamage = GAME_CONSTANTS.UPPERCUT_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.HEAVY_KNOCKBACK;

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

        this.currentAttackDamage = GAME_CONSTANTS.SWEEP_KICK_DAMAGE;
        this.currentKnockback = GAME_CONSTANTS.MEDIUM_KNOCKBACK;

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
}
