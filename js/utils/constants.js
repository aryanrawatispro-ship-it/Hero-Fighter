// Game Constants
const GAME_CONSTANTS = {
    // Canvas
    CANVAS_WIDTH: 1280,
    CANVAS_HEIGHT: 720,
    TARGET_FPS: 60,

    // Movement speeds (pixels per frame at 60fps)
    WALK_SPEED: 3,
    RUN_SPEED: 5,
    JUMP_FORCE: 15,
    GRAVITY: 0.8,

    // Character dimensions
    CHARACTER_WIDTH: 40,
    CHARACTER_HEIGHT: 60,

    // Attack values
    LIGHT_PUNCH_DAMAGE: 5,
    HEAVY_PUNCH_DAMAGE: 15,
    SWEEP_KICK_DAMAGE: 10,
    UPPERCUT_DAMAGE: 12,
    AERIAL_KICK_DAMAGE: 8,

    // Special moves
    FIREBALL_DAMAGE: 20,
    FIREBALL_MP_COST: 30,
    DASH_ATTACK_DAMAGE: 25,
    DASH_ATTACK_MP_COST: 40,
    SPIN_ATTACK_DAMAGE: 18,
    SPIN_ATTACK_MP_COST: 35,
    ULTIMATE_DAMAGE: 50,
    ULTIMATE_MP_COST: 100,

    // Character stats
    BASE_HP: 150,
    BASE_MP: 100,
    MP_REGEN_RATE: 0.5, // MP per frame

    // Combo system
    COMBO_TIMEOUT: 1000, // milliseconds
    STUN_DURATION: 500, // milliseconds

    // Defense
    BLOCK_DAMAGE_REDUCTION: 0.5,
    DODGE_INVINCIBILITY_FRAMES: 15,

    // Knockback
    LIGHT_KNOCKBACK: 5,
    MEDIUM_KNOCKBACK: 10,
    HEAVY_KNOCKBACK: 20,

    // Attack ranges
    MELEE_ATTACK_RANGE: 50,
    AI_DETECTION_RANGE: 200,

    // Animation frames
    IDLE_FRAMES: 4,
    WALK_FRAMES: 8,
    RUN_FRAMES: 6,
    JUMP_FRAMES: 3,
    ATTACK_FRAMES: 5,

    // Physics
    FRICTION: 0.8,
    COLLISION_PUSH_FORCE: 2,

    // Weapon stats
    SWORD_DAMAGE: 20,
    SWORD_DURABILITY: 3,
    BAT_DAMAGE: 15,
    BAT_DURABILITY: 5,
    KUNAI_DAMAGE: 30,
    ROCK_DAMAGE: 40,
    BOX_DAMAGE: 25,

    // Items
    HEALTH_POTION_HEAL: 50,
    MANA_POTION_RESTORE: 50,
    SPEED_BOOST_DURATION: 10000, // milliseconds
    SHIELD_DURATION: 5000,
    POWER_UP_DURATION: 10000,

    // Input keys
    KEYS: {
        // Movement
        UP: ['w', 'W', 'ArrowUp'],
        DOWN: ['s', 'S', 'ArrowDown'],
        LEFT: ['a', 'A', 'ArrowLeft'],
        RIGHT: ['d', 'D', 'ArrowRight'],

        // Actions
        ATTACK: ['j', 'J'],
        SPECIAL: ['k', 'K'],
        JUMP: [' ', 'Space'],
        DEFEND: ['l', 'L'],
        PICKUP: ['u', 'U'],

        // System
        PAUSE: ['Escape'],
        SHIFT: ['Shift']
    },

    // Character types
    CHARACTER_TYPES: {
        FIGHTER: {
            name: 'Fighter',
            hp: 150,
            attackMultiplier: 1.0,
            defenseMultiplier: 0.1,
            speedMultiplier: 1.0,
            jumpHeight: 15
        },
        TANK: {
            name: 'Tank',
            hp: 200,
            attackMultiplier: 0.8,
            defenseMultiplier: 0.3,
            speedMultiplier: 0.8,
            jumpHeight: 12
        },
        ASSASSIN: {
            name: 'Assassin',
            hp: 100,
            attackMultiplier: 1.2,
            defenseMultiplier: 0,
            speedMultiplier: 1.3,
            jumpHeight: 18
        },
        MAGE: {
            name: 'Mage',
            hp: 120,
            attackMultiplier: 1.5,
            defenseMultiplier: 0.05,
            speedMultiplier: 0.9,
            jumpHeight: 14
        },
        MONK: {
            name: 'Monk',
            hp: 130,
            attackMultiplier: 1.1,
            defenseMultiplier: 0.15,
            speedMultiplier: 1.1,
            jumpHeight: 16
        }
    },

    // States
    STATES: {
        IDLE: 'idle',
        WALKING: 'walking',
        RUNNING: 'running',
        JUMPING: 'jumping',
        ATTACKING: 'attacking',
        BLOCKING: 'blocking',
        HIT: 'hit',
        DEAD: 'dead'
    },

    // Colors for placeholder rendering
    COLORS: {
        PLAYER: '#4488ff',
        ENEMY: '#ff4444',
        ATTACK_HITBOX: 'rgba(255, 100, 100, 0.5)',
        HP_BAR_GOOD: '#00ff00',
        HP_BAR_MEDIUM: '#ffaa00',
        HP_BAR_LOW: '#ff0000',
        MP_BAR: '#4488ff'
    },

    // Game modes
    GAME_MODES: {
        MENU: 'menu',
        SINGLE_PLAYER: 'single_player',
        MULTIPLAYER: 'multiplayer',
        TRAINING: 'training',
        CHARACTER_SELECT: 'character_select'
    }
};

// Make constants globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_CONSTANTS;
}
