var ufo = new Image();
ufo.src="images/ufo.png";

class UFO {
    constructor(game, amongus, x, y) {
        this.game = game;
        this.amongus = amongus;
        this.x = x;
        this.y = y;
        this.init();
    }

    init() {
        this.loop();
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        if (Math.abs(this.amongus.xA - this.x) > 7) {
            if (this.x > this.amongus.xA)
                this.x -= Math.abs(this.amongus.xA - this.x) / 15;
            else
                this.x += Math.abs(this.amongus.xA - this.x) / 15;
        }

        if (Math.abs(this.y - (this.amongus.yA - this.game.getWidth() * 2)) > 7) {
            if (this.y > this.amongus.yA - this.game.getWidth() * 2)
                this.y -= Math.abs(this.y - (this.amongus.yA - this.game.getWidth() * 2)) / 15;
            else 
                this.y += Math.abs(this.y - (this.amongus.yA - this.game.getWidth() * 2)) / 15;
        }
    }

    draw() {
        this.game.context.drawImage(ufo, this.x - this.game.getWidth() * 0.9, this.y - this.game.getWidth() * 0.9, this.game.getWidth() * 1.8, this.game.getWidth() * 1.8);
    }
}