// Helper utility functions

const Helpers = {
    /**
     * Check if two rectangles overlap (AABB collision)
     */
    checkRectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },

    /**
     * Get distance between two points
     */
    getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Get angle between two points
     */
    getAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    /**
     * Clamp a value between min and max
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Linear interpolation
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },

    /**
     * Check if point is inside rectangle
     */
    pointInRect(px, py, rect) {
        return px >= rect.x &&
               px <= rect.x + rect.width &&
               py >= rect.y &&
               py <= rect.y + rect.height;
    },

    /**
     * Get random integer between min and max (inclusive)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Get random float between min and max
     */
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Choose random element from array
     */
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Normalize vector
     */
    normalizeVector(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return {
            x: x / length,
            y: y / length
        };
    },

    /**
     * Get HP bar color based on percentage
     */
    getHPBarColor(hpPercent) {
        if (hpPercent > 0.6) return GAME_CONSTANTS.COLORS.HP_BAR_GOOD;
        if (hpPercent > 0.3) return GAME_CONSTANTS.COLORS.HP_BAR_MEDIUM;
        return GAME_CONSTANTS.COLORS.HP_BAR_LOW;
    },

    /**
     * Format time in seconds to MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Check if key is in array of keys
     */
    isKeyInArray(key, keyArray) {
        return keyArray.includes(key);
    },

    /**
     * Draw rounded rectangle
     */
    drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    },

    /**
     * Draw health bar above character
     */
    drawHealthBar(ctx, x, y, width, currentHP, maxHP) {
        const barHeight = 5;
        const hpPercent = currentHP / maxHP;

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x - width / 2, y - 10, width, barHeight);

        // HP bar
        ctx.fillStyle = this.getHPBarColor(hpPercent);
        ctx.fillRect(x - width / 2, y - 10, width * hpPercent, barHeight);

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - width / 2, y - 10, width, barHeight);
    }
};

// Make helpers globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}
