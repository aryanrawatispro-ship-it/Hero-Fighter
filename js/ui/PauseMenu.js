/**
 * Pause Menu
 * (Placeholder for future implementation)
 */

class PauseMenu {
    constructor(game) {
        this.game = game;
    }

    show() {
        console.log('Pause menu (not implemented yet)');
        // Would show pause overlay with options:
        // - Resume
        // - Controls
        // - Settings
        // - Quit to Menu
    }

    hide() {
        // Hide pause menu UI
    }

    resume() {
        this.game.togglePause();
        this.hide();
    }

    quitToMenu() {
        this.game.returnToMenu();
        this.hide();
    }
}
