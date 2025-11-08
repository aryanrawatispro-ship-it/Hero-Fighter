/**
 * Item Class
 * Pickable items (health, mana, power-ups)
 */

class Item {
    constructor(x, y, type = 'health_potion') {
        this.x = x;
        this.y = y;
        this.type = type;

        this.width = 20;
        this.height = 20;

        this.pickedUp = false;
        this.bobOffset = 0;
        this.bobSpeed = 2;

        // Item properties based on type
        const props = this.getItemProperties();
        this.color = props.color;
        this.effect = props.effect;
    }

    getItemProperties() {
        switch (this.type) {
            case 'health_potion':
                return {
                    color: '#00ff00',
                    effect: (character) => {
                        character.hp = Math.min(character.maxHP, character.hp + GAME_CONSTANTS.HEALTH_POTION_HEAL);
                    }
                };
            case 'mana_potion':
                return {
                    color: '#0088ff',
                    effect: (character) => {
                        character.mp = Math.min(character.maxMP, character.mp + GAME_CONSTANTS.MANA_POTION_RESTORE);
                    }
                };
            case 'speed_boost':
                return {
                    color: '#ffff00',
                    effect: (character) => {
                        // Apply speed boost (would need buff system)
                        console.log('Speed boost applied!');
                    }
                };
            default:
                return {
                    color: '#ffffff',
                    effect: () => {}
                };
        }
    }

    update(dt) {
        // Bobbing animation
        this.bobOffset = Math.sin(Date.now() * 0.003 * this.bobSpeed) * 5;
    }

    getHitbox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2 + this.bobOffset,
            width: this.width,
            height: this.height
        };
    }

    render(ctx) {
        if (this.pickedUp) return;

        const renderY = this.y + this.bobOffset;

        // Glow effect
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        // Draw item
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, renderY, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x - 3, renderY - 3, this.width / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    applyEffect(character) {
        if (this.effect) {
            this.effect(character);
            this.pickedUp = true;
        }
    }
}
