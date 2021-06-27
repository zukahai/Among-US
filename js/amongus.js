A = [[, , ],
    [, , ],
    [, , ],
    [, , ],
    [, , ],
    [, , ]];
for (let i = 0; i <= 4; i++)
    for (let j = 1; j <= 2; j++) {
    A[i][j] = new Image();
    A[i][j].src="images/" + i + "_" + j + ".png";
}

var ufo = new Image();
ufo.src="images/ufo.png";

class amongus{
    constructor(game, xA, yA){
        this.game = game;
        this.xA = xA;
        this.yA = yA;
    }

    draw() {
        console.log(this.xA, ' ', this.yA);
        if (rm)
            this.game.context.drawImage(A[count2 % 4 + 1][direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        else
            this.game.context.drawImage(A[0][direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        this.game.context.drawImage(ufo, xUFO - this.game.getWidth() * 0.9, yUFO - this.game.getWidth() * 0.9, this.game.getWidth() * 1.8, this.game.getWidth() * 1.8);
    }

    setXY(x, y) {
        this.xA = x;
        this.yA = y;
    }
}