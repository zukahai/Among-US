var ufo = new Image();
ufo.src="images/ufo.png";

class UFO {
    constructor(game, amongus, x, y) {
        this.game = game;
        this.amongus = amongus;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.game.context.drawImage(ufo, this.x - this.game.getWidth() * 0.9, this.y - this.game.getWidth() * 0.9, this.game.getWidth() * 1.8, this.game.getWidth() * 1.8);
    }
}