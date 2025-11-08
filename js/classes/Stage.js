/**
 * Stage Class
 * Represents the battle arena
 */

class Stage {
    constructor(stageName = 'dojo') {
        this.name = stageName;
        this.width = GAME_CONSTANTS.CANVAS_WIDTH;
        this.height = GAME_CONSTANTS.CANVAS_HEIGHT;

        this.groundY = 500;

        // Stage properties
        this.backgroundColor = this.getBackgroundColor();
        this.foregroundColor = this.getForegroundColor();

        // Parallax layers (for future enhancement)
        this.layers = [];
    }

    getBackgroundColor() {
        switch (this.name) {
            case 'dojo':
                return '#2a1810';
            case 'street':
                return '#1a1a2e';
            case 'forest':
                return '#0d2818';
            default:
                return '#1a1a1a';
        }
    }

    getForegroundColor() {
        switch (this.name) {
            case 'dojo':
                return '#4a3830';
            case 'street':
                return '#333344';
            case 'forest':
                return '#1d4828';
            default:
                return '#333333';
        }
    }

    update(dt) {
        // Update stage animations, moving objects, etc.
    }

    render(ctx) {
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, this.backgroundColor);
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        // Ground
        ctx.fillStyle = this.foregroundColor;
        ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

        // Ground line
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(this.width, this.groundY);
        ctx.stroke();

        // Stage decorations based on type
        this.renderDecorations(ctx);
    }

    renderDecorations(ctx) {
        switch (this.name) {
            case 'dojo':
                this.renderDojoDecorations(ctx);
                break;
            case 'street':
                this.renderStreetDecorations(ctx);
                break;
            case 'forest':
                this.renderForestDecorations(ctx);
                break;
        }
    }

    renderDojoDecorations(ctx) {
        // Simple dojo elements
        // Pillars
        ctx.fillStyle = '#3a2820';
        ctx.fillRect(100, 300, 40, 200);
        ctx.fillRect(1140, 300, 40, 200);

        // Pillar tops
        ctx.fillStyle = '#5a4840';
        ctx.fillRect(85, 280, 70, 30);
        ctx.fillRect(1125, 280, 70, 30);
    }

    renderStreetDecorations(ctx) {
        // Street elements - simple buildings silhouette
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 200, 300, 300);
        ctx.fillRect(350, 250, 250, 250);
        ctx.fillRect(650, 220, 300, 280);
        ctx.fillRect(980, 240, 300, 260);
    }

    renderForestDecorations(ctx) {
        // Forest - simple trees in background
        ctx.fillStyle = '#0a1810';

        // Tree trunks
        for (let i = 0; i < 5; i++) {
            const x = 150 + i * 250;
            ctx.fillRect(x, 350, 30, 150);

            // Tree top
            ctx.beginPath();
            ctx.arc(x + 15, 340, 50, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
