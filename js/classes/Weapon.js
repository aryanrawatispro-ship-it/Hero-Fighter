/**
 * Weapon Class
 * Pickable weapons
 */

class Weapon {
    constructor(x, y, type = 'sword') {
        this.x = x;
        this.y = y;
        this.type = type;

        this.width = 30;
        this.height = 10;

        this.pickedUp = false;
        this.durability = this.getMaxDurability();

        // Weapon stats based on type
        const stats = this.getWeaponStats();
        this.damage = stats.damage;
        this.maxDurability = stats.durability;
        this.color = stats.color;
    }

    getWeaponStats() {
        switch (this.type) {
            case 'sword':
                return {
                    damage: GAME_CONSTANTS.SWORD_DAMAGE,
                    durability: GAME_CONSTANTS.SWORD_DURABILITY,
                    color: '#c0c0c0'
                };
            case 'bat':
                return {
                    damage: GAME_CONSTANTS.BAT_DAMAGE,
                    durability: GAME_CONSTANTS.BAT_DURABILITY,
                    color: '#8b4513'
                };
            case 'kunai':
                return {
                    damage: GAME_CONSTANTS.KUNAI_DAMAGE,
                    durability: 1,
                    color: '#666666'
                };
            default:
                return { damage: 10, durability: 3, color: '#888888' };
        }
    }

    getMaxDurability() {
        return this.getWeaponStats().durability;
    }

    update(dt) {
        // Weapon logic (e.g., rotating, bobbing animation)
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
        if (this.pickedUp) return;

        // Draw weapon
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
}
