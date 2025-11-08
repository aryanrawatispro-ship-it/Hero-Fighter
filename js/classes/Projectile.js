/**
 * Projectile Class
 * Handles projectiles like fireballs
 */

class Projectile {
    constructor(x, y, vx, vy, damage, owner = 'player') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.owner = owner; // 'player' or 'enemy'

        this.width = 20;
        this.height = 20;
        this.active = true;
        this.lifetime = 3; // seconds
        this.age = 0;

        this.color = owner === 'player' ? '#ffaa00' : '#ff0000';
    }

    update(dt) {
        if (!this.active) return;

        // Update position
        this.x += this.vx * dt * 60;
        this.y += this.vy * dt * 60;

        // Update lifetime
        this.age += dt;
        if (this.age >= this.lifetime) {
            this.active = false;
        }

        // Check bounds
        if (this.x < 0 || this.x > GAME_CONSTANTS.CANVAS_WIDTH ||
            this.y < 0 || this.y > GAME_CONSTANTS.CANVAS_HEIGHT) {
            this.active = false;
        }
    }

    getHitbox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }

    render(ctx) {
        if (!this.active) return;

        // Draw projectile as circle with glow
        ctx.save();

        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        // Main projectile
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Debug hitbox
        if (game && game.debug) {
            const hitbox = this.getHitbox();
            ctx.strokeStyle = '#ffff00';
            ctx.lineWidth = 1;
            ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        }
    }
}
