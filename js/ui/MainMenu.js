/**
 * Main Menu UI
 */

class MainMenu {
    constructor(game) {
        this.game = game;
        this.setupButtons();
    }

    setupButtons() {
        // Single Player button
        const btnSinglePlayer = document.getElementById('btn-single-player');
        if (btnSinglePlayer) {
            btnSinglePlayer.addEventListener('click', () => {
                this.game.audioManager.playSound('menu_click');
                this.game.startGame('single_player');
            });
        }

        // Multiplayer button
        const btnMultiplayer = document.getElementById('btn-multiplayer');
        if (btnMultiplayer) {
            btnMultiplayer.addEventListener('click', () => {
                this.game.audioManager.playSound('menu_click');
                alert('Multiplayer mode coming soon!');
            });
        }

        // Character Select button
        const btnCharacterSelect = document.getElementById('btn-character-select');
        if (btnCharacterSelect) {
            btnCharacterSelect.addEventListener('click', () => {
                this.game.audioManager.playSound('menu_click');
                alert('Character selection coming soon!');
            });
        }

        // Options button
        const btnOptions = document.getElementById('btn-options');
        if (btnOptions) {
            btnOptions.addEventListener('click', () => {
                this.game.audioManager.playSound('menu_click');
                this.showOptions();
            });
        }
    }

    showOptions() {
        // Simple options dialog
        const masterVolume = prompt('Master Volume (0-100):', Math.round(this.game.audioManager.volume.master * 100));
        if (masterVolume !== null) {
            this.game.audioManager.setVolume('master', parseInt(masterVolume) / 100);
        }
    }

    show() {
        document.getElementById('menu-overlay').classList.add('active');
    }

    hide() {
        document.getElementById('menu-overlay').classList.remove('active');
    }
}
