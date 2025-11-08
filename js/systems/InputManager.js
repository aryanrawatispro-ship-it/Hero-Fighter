/**
 * Input Manager
 * Handles keyboard and gamepad input
 */

class InputManager {
    constructor() {
        this.keys = {};
        this.prevKeys = {};
        this.listeners = {};

        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        const key = e.key;

        // Prevent default for game keys
        if (this.isGameKey(key)) {
            e.preventDefault();
        }

        // Store key state
        if (!this.keys[key]) {
            this.keys[key] = true;

            // Trigger pressed event
            this.triggerKeyPressed(key);
        }
    }

    onKeyUp(e) {
        const key = e.key;
        this.keys[key] = false;
    }

    isGameKey(key) {
        const allGameKeys = [
            ...GAME_CONSTANTS.KEYS.UP,
            ...GAME_CONSTANTS.KEYS.DOWN,
            ...GAME_CONSTANTS.KEYS.LEFT,
            ...GAME_CONSTANTS.KEYS.RIGHT,
            ...GAME_CONSTANTS.KEYS.ATTACK,
            ...GAME_CONSTANTS.KEYS.SPECIAL,
            ...GAME_CONSTANTS.KEYS.JUMP,
            ...GAME_CONSTANTS.KEYS.DEFEND,
            ...GAME_CONSTANTS.KEYS.PICKUP,
            ...GAME_CONSTANTS.KEYS.PAUSE,
            ...GAME_CONSTANTS.KEYS.SHIFT
        ];
        return allGameKeys.includes(key);
    }

    triggerKeyPressed(key) {
        // Check for specific key actions
        if (Helpers.isKeyInArray(key, GAME_CONSTANTS.KEYS.PAUSE)) {
            this.emit('pause');
        }
    }

    isKeyDown(keyArray) {
        return keyArray.some(key => this.keys[key]);
    }

    isKeyPressed(keyArray) {
        return keyArray.some(key => this.keys[key] && !this.prevKeys[key]);
    }

    isKeyReleased(keyArray) {
        return keyArray.some(key => !this.keys[key] && this.prevKeys[key]);
    }

    // Movement input
    isUp() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.UP);
    }

    isDown() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.DOWN);
    }

    isLeft() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.LEFT);
    }

    isRight() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.RIGHT);
    }

    // Action input
    isAttack() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.ATTACK);
    }

    isAttackPressed() {
        return this.isKeyPressed(GAME_CONSTANTS.KEYS.ATTACK);
    }

    isSpecial() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.SPECIAL);
    }

    isSpecialPressed() {
        return this.isKeyPressed(GAME_CONSTANTS.KEYS.SPECIAL);
    }

    isJump() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.JUMP);
    }

    isJumpPressed() {
        return this.isKeyPressed(GAME_CONSTANTS.KEYS.JUMP);
    }

    isDefend() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.DEFEND);
    }

    isPickup() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.PICKUP);
    }

    isPickupPressed() {
        return this.isKeyPressed(GAME_CONSTANTS.KEYS.PICKUP);
    }

    isShift() {
        return this.isKeyDown(GAME_CONSTANTS.KEYS.SHIFT);
    }

    // Get movement vector (-1, 0, 1 for each axis)
    getMovementVector() {
        const vector = { x: 0, y: 0 };

        if (this.isLeft()) vector.x -= 1;
        if (this.isRight()) vector.x += 1;
        if (this.isUp()) vector.y -= 1;
        if (this.isDown()) vector.y += 1;

        return vector;
    }

    // Get normalized movement vector
    getNormalizedMovement() {
        const vector = this.getMovementVector();

        // Normalize diagonal movement
        if (vector.x !== 0 && vector.y !== 0) {
            const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            vector.x /= length;
            vector.y /= length;
        }

        return vector;
    }

    // Event system
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    // Update input state (call at end of frame)
    update() {
        this.prevKeys = { ...this.keys };
    }

    // Reset all keys
    reset() {
        this.keys = {};
        this.prevKeys = {};
    }
}
