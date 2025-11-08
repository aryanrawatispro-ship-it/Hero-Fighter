/**
 * Physics Engine
 * Handles physics calculations
 */

class PhysicsEngine {
    constructor() {
        this.gravity = GAME_CONSTANTS.GRAVITY;
        this.friction = GAME_CONSTANTS.FRICTION;
    }

    /**
     * Apply gravity to an object
     */
    applyGravity(object, dt) {
        if (!object.isOnGround) {
            object.vy += this.gravity * dt * 60;
        }
    }

    /**
     * Apply friction to an object
     */
    applyFriction(object) {
        object.vx *= this.friction;
        if (object.isOnGround) {
            object.vy *= this.friction;
        }
    }

    /**
     * Update position based on velocity
     */
    updatePosition(object, dt) {
        object.x += object.vx * dt * 60;
        object.y += object.vy * dt * 60;
    }

    /**
     * Apply knockback force
     */
    applyKnockback(object, forceX, forceY) {
        object.vx = forceX;
        object.vy = forceY;
    }

    /**
     * Calculate distance between two objects
     */
    distance(obj1, obj2) {
        return Helpers.getDistance(obj1.x, obj1.y, obj2.x, obj2.y);
    }

    /**
     * Calculate angle from obj1 to obj2
     */
    angleBetween(obj1, obj2) {
        return Helpers.getAngle(obj1.x, obj1.y, obj2.x, obj2.y);
    }
}
