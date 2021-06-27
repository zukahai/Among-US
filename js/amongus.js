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

class amongus{
    constructor(game, xA, yA){
        this.game = game;
        this.xA = xA;
        this.yA = yA;
        this.init();
    }

    init() {
        this.ufo_ = new UFO(this.game, this, this.xA, this.yA);
    }


    draw() {
        if (rm)
            this.game.context.drawImage(A[count2 % 4 + 1][direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        else
            this.game.context.drawImage(A[0][direction], this.xA - this.game.getWidth() * 1.5, this.yA - this.game.getWidth() * 1.5, this.game.getWidth() * 3, this.game.getWidth() * 3);
        this.ufo_.draw();
    }

    setXY(x, y) {
        this.xA = x;
        this.yA = y;
    }
}