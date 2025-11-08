/**
 * Animation Manager
 * Handles sprite animations
 */

class AnimationManager {
    constructor() {
        this.animations = {};
    }

    /**
     * Create an animation from sprite sheet
     */
    createAnimation(name, frames, frameRate = 10) {
        this.animations[name] = {
            frames: frames,
            frameRate: frameRate,
            frameTime: 1 / frameRate
        };
    }

    /**
     * Get current frame for an animation
     */
    getFrame(animationName, currentTime, loop = true) {
        const animation = this.animations[animationName];
        if (!animation) return null;

        const frameIndex = Math.floor(currentTime / animation.frameTime);

        if (loop) {
            return animation.frames[frameIndex % animation.frames.length];
        } else {
            const index = Math.min(frameIndex, animation.frames.length - 1);
            return animation.frames[index];
        }
    }

    /**
     * Check if animation is complete
     */
    isAnimationComplete(animationName, currentTime) {
        const animation = this.animations[animationName];
        if (!animation) return true;

        const totalTime = animation.frames.length * animation.frameTime;
        return currentTime >= totalTime;
    }
}
