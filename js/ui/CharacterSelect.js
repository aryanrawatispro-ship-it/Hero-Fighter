/**
 * Character Selection Screen
 * (Placeholder for future implementation)
 */

class CharacterSelect {
    constructor(game) {
        this.game = game;
        this.selectedCharacter = 'FIGHTER';
    }

    show() {
        console.log('Character select screen (not implemented yet)');
    }

    hide() {
        // Hide character select UI
    }

    selectCharacter(type) {
        this.selectedCharacter = type;
    }

    getSelectedCharacter() {
        return this.selectedCharacter;
    }
}
