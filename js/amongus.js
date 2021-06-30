class amongus{
    constructor(game, xA, yA, name){
        this.game = game;
        this.xA = xA;
        this.yA = yA;
        this.name = name;
        this.alive = true;
        this.Vc = false;
        this.freeze = false;
        this.init();
    }

    init() {
        this.time = 0;
        this.rm = false;
        this.rm2 = false;
        this.direction = 1;
        this.Auto = false;
        this.x1 = 0;
        this.y1 = 0;
        this.A = [[, , ],
            [, , ],
            [, , ],
            [, , ],
            [, , ],
            [, , ]];
        var rd = Math.floor((Math.random() * 1000000)) % 3 + 1;
        for (let i = 0; i <= 4; i++)
            for (let j = 1; j <= 2; j++) {
                this.A[i][j] = new Image();
                this.A[i][j].src="images/AmongUS/" + rd + "/" + i + "_" + j + ".png";
            }
        this.die = new Image();
        this.die.src="images/AmongUS/" + rd + "/die.png";

        this.vc = [];
        for (let i = 0; i < 2; i++) {
            this.vc[i] = new Image();
            this.vc[i].src="images/VC/vc" + i + ".png"; 
        }

        this.ufo_ = new UFO(this.game, this, this.xA, this.yA);
        this.loop();
    }

    loop() {
        this.update();
        if (this.Auto && this.alive)
            this.auto();
        if (this.alive)
            setTimeout(() => this.loop(), 30);
    }

    auto() {
        if (this.time -- <= 0) {
            this.x1 = this.game.getWidth() * 1 * (Math.random() - Math.random()) / 3;
            this.y1 = this.game.getWidth() * 1 * (Math.random() - Math.random()) / 3;
            if (this.x1 > 0)
                this.direction = 1;
            else
                this.direction = 2;
            this.time = Math.floor(Math.random() * 50 + 20);
        } else {
            this.rm = true;
            this.xA += this.x1;
            this.yA += this.y1;
        }
    }

    update() {
        if (this.xA < 0)
            this.xA = 0;
        if (this.xA > game_W)
            this.xA = game_W;
        if (this.yA < 0)
            this.yA = 0;
        if (this.yA > game_H)
            this.yA = game_H;
    }

    drawVC() {
        if (this.alive) {
            this.game.context.drawImage(this.vc[(Math.floor(count / 10)) % 2], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        }
    }

    draw() {
        if (this.alive && this.Vc) {
            this.game.context.drawImage(this.vc[(Math.floor(count / 10)) % 2], this.xA - this.game.getWidth() * 1.5, this.yA + this.game.getWidth() * 0.4, this.game.getWidth() * 3, this.game.getWidth() * 1.5);
        }
        this.game.context.fillStyle = "#0000FF";
        this.game.context.font = (Math.floor(this.game.getWidth() / 2)) + 'px Calibri';
        if (this.alive) {
            this.game.context.fillText(this.name, this.xA - 1.5 * Math.floor(this.game.getWidth() / 2), this.yA - this.game.getWidth() * 1.5);
            if (this.rm || this.rm2)
                this.game.context.drawImage(this.A[count2 % 4 + 1][this.direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
            else
                this.game.context.drawImage(this.A[0][this.direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        } else {
            this.game.context.fillText(this.name, this.xA - 1.5 * Math.floor(this.game.getWidth() / 2), this.yA - this.game.getWidth() / 2);
            this.game.context.drawImage(this.die, this.xA - this.game.getWidth() * 1.25, this.yA - this.game.getWidth() * 0.5, this.game.getWidth() * 2.5, this.game.getWidth() * 2);
        }
        if (this.alive)
            this.ufo_.draw();

        if (this.freeze)
            this.drawVC();   
    }

    setXY(x, y) {
        this.xA = x;
        this.yA = y;
    }
}