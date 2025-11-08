/**
 * HUD (Heads-Up Display)
 */

class HUD {
    constructor(game) {
        this.game = game;
        this.playerHPBar = document.getElementById('player-hp-bar');
        this.playerMPBar = document.getElementById('player-mp-bar');
        this.timer = document.getElementById('timer');
    }

    update(dt) {
        if (this.game.gameMode === GAME_CONSTANTS.GAME_MODES.MENU) {
            return;
        }

        // Update player stats
        if (this.game.players.length > 0) {
            const player = this.game.players[0];

            // Update HP bar
            const hpPercent = (player.hp / player.maxHP) * 100;
            if (this.playerHPBar) {
                this.playerHPBar.style.width = hpPercent + '%';
            }

            // Update MP bar
            const mpPercent = (player.mp / player.maxMP) * 100;
            if (this.playerMPBar) {
                this.playerMPBar.style.width = mpPercent + '%';
            }
        }

        // Update timer
        if (this.timer) {
            this.timer.textContent = Math.ceil(this.game.gameTime);
        }
    }

    show() {
        document.getElementById('hud').style.display = 'block';
    }

    hide() {
        document.getElementById('hud').style.display = 'none';
    }
}
