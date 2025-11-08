/**
 * Collision Manager
 * Handles all collision detection in the game
 */

class CollisionManager {
    constructor() {
        this.hitThisFrame = new Set(); // Prevent multiple hits in same frame
    }

    /**
     * Handle collision between two characters (push them apart)
     */
    handleCharacterCollision(char1, char2) {
        const hitbox1 = char1.getHitbox();
        const hitbox2 = char2.getHitbox();

        if (Helpers.checkRectCollision(hitbox1, hitbox2)) {
            // Calculate overlap
            const overlapX = Math.min(
                hitbox1.x + hitbox1.width - hitbox2.x,
                hitbox2.x + hitbox2.width - hitbox1.x
            );
            const overlapY = Math.min(
                hitbox1.y + hitbox1.height - hitbox2.y,
                hitbox2.y + hitbox2.height - hitbox1.y
            );

            // Push characters apart on the axis with least overlap
            if (overlapX < overlapY) {
                // Push horizontally
                if (char1.x < char2.x) {
                    char1.x -= overlapX / 2;
                    char2.x += overlapX / 2;
                } else {
                    char1.x += overlapX / 2;
                    char2.x -= overlapX / 2;
                }
            } else {
                // Push vertically
                if (char1.y < char2.y) {
                    char1.y -= overlapY / 2;
                    char2.y += overlapY / 2;
                } else {
                    char1.y += overlapY / 2;
                    char2.y -= overlapY / 2;
                }
            }
        }
    }

    /**
     * Check if an attack hits a target
     */
    checkAttackHit(attacker, target) {
        // Skip if target is blocking (will be handled separately)
        if (target.state === GAME_CONSTANTS.STATES.BLOCKING) {
            return false;
        }

        // Skip if target is invincible
        if (target.isInvincible) {
            return false;
        }

        // Skip if already hit this frame
        const hitKey = `${attacker.id}-${target.id}`;
        if (this.hitThisFrame.has(hitKey)) {
            return false;
        }

        // Get hitboxes
        const attackBox = attacker.attackHitbox;
        const targetBox = target.getHitbox();

        if (!attackBox) return false;

        // Check collision
        if (Helpers.checkRectCollision(attackBox, targetBox)) {
            // Mark as hit this frame
            this.hitThisFrame.add(hitKey);
            return true;
        }

        return false;
    }

    /**
     * Check if a projectile hits a character
     */
    checkProjectileHit(projectile, character) {
        // Skip if character is invincible
        if (character.isInvincible) {
            return false;
        }

        const projBox = projectile.getHitbox();
        const charBox = character.getHitbox();

        return Helpers.checkRectCollision(projBox, charBox);
    }

    /**
     * Check if character can pick up an item
     */
    checkItemPickup(character, item) {
        const charBox = character.getHitbox();
        const itemBox = item.getHitbox();

        // Expand pickup range
        const pickupBox = {
            x: charBox.x - 20,
            y: charBox.y - 20,
            width: charBox.width + 40,
            height: charBox.height + 40
        };

        return Helpers.checkRectCollision(pickupBox, itemBox);
    }

    /**
     * Check collision with stage boundaries
     */
    checkStageBounds(character, stageWidth = GAME_CONSTANTS.CANVAS_WIDTH, stageHeight = GAME_CONSTANTS.CANVAS_HEIGHT) {
        const margin = 50; // Distance from edge

        // Horizontal bounds
        if (character.x < margin) {
            character.x = margin;
            character.vx = 0;
        } else if (character.x > stageWidth - margin) {
            character.x = stageWidth - margin;
            character.vx = 0;
        }

        // Vertical bounds
        if (character.y < margin) {
            character.y = margin;
            character.vy = 0;
        } else if (character.y > stageHeight - margin) {
            character.y = stageHeight - margin;
            character.vy = 0;
        }
    }

    /**
     * Check if character is on ground
     */
    isOnGround(character, groundY = 500) {
        return character.y >= groundY && character.vy >= 0;
    }

    /**
     * Reset hit tracking (call each frame)
     */
    resetHitTracking() {
        this.hitThisFrame.clear();
    }

    /**
     * Ray cast for projectiles
     */
    raycast(startX, startY, endX, endY, obstacles) {
        // Simple line-rectangle intersection
        for (let obstacle of obstacles) {
            if (this.lineIntersectsRect(startX, startY, endX, endY, obstacle)) {
                return obstacle;
            }
        }
        return null;
    }

    lineIntersectsRect(x1, y1, x2, y2, rect) {
        // Check if line segment intersects with rectangle
        // Simplified implementation
        return Helpers.checkRectCollision(
            {
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1)
            },
            rect
        );
    }
}
