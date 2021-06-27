let game_W = 20;
let game_H = 20;
let count = 0;
let count2 = 0;
let xIM2 = 0, yIM2 = 0;
let rm = false;
let direction = 1;
let xCh = 0, yCh = 0;

let xAm = 0;
let yAm = 0;
let xUFO = 0;
let yUFO = 0;
var im = new Image();
im.src="images/remove.png";
var im2 = new Image();
im2.src="images/remove2.png";
var bg = new Image();
bg.src="images/background.jpg";
var ufo = new Image();
ufo.src="images/ufo.png";


amongus =   [[, , ],
            [, , ],
            [, , ],
            [, , ],
            [, , ],
            [, , ]];
for (let i = 0; i <= 4; i++)
    for (let j = 1; j <= 2; j++) {
    amongus[i][j] = new Image();
    amongus[i][j].src="images/" + i + "_" + j + ".png";
}

var v = [];

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        xIM2 = this.getWidth() * 2.5;
        yIM2 = game_H - this.getWidth() * 4.5;

        xAm = game_W / 2;
        yAm = game_H / 2;

        this.loop();

        this.listenKeyboard();
        this.listenMouse();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            if (evt) evt = window.event;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;

            var Xc = this.getWidth() * 3.5;
            var Yc = game_H - this.getWidth() * 3.5;

            if ((Xc - x) * (Xc - x) + (Yc - y) * (Yc - y) > 4 * this.getWidth() * this.getWidth()) {
                var XX = x - Xc;
                var YY = y - Yc;
                var HH = Math.sqrt(XX * XX + YY * YY);
                var R = 2 * this.getWidth();
                x = (R * XX) / HH + Xc;
                y = (R * YY) / HH + Yc;
            }
            if (x < Xc)
                direction = 2;
            else 
                direction = 1;

            xCh = (x - Xc) / 10;
            yCh = (y - Yc) / 10;

            if (rm == true) {
                xIM2 = x - this.getWidth();
                yIM2 = y - this.getWidth();
                this.draw();
            }
        })

        document.addEventListener("touchstart", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
            var Xc = this.getWidth() * 3.5;
            var Yc = game_H - this.getWidth() * 3.5;
            if ((Xc - x) * (Xc - x) + (Yc - y) * (Yc - y) <= 9 * this.getWidth() * this.getWidth()) {
                rm = true;
                xIM2 = x - this.getWidth();
                yIM2 = y - this.getWidth();
                this.draw();
            }
        })

        document.addEventListener("touchend", evt => {
            xIM2 = this.getWidth() * 2.5;
            yIM2 = game_H - this.getWidth() * 4.5;
            rm = false;
            this.draw();
        })
    }

    listenMouse() {
        document.addEventListener("mousemove", e => {
            if (!e) e = window.event;
            var x = e.offsetX==undefined?e.layerX:e.offsetX;
            var y = e.offsetY==undefined?e.layerY:e.offsetY;
        }) 
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            rm = true;
            switch(key.keyCode) {
                case 37:
                    xCh = -this.getWidth() / 3;
                    direction = 2;
                    break;
                case 38:
                    yCh = -this.getWidth() / 3;
                    break;
                case 39:
                    xCh = this.getWidth() / 3;
                    direction = 1;
                    break;
                case 40:
                    yCh = this.getWidth() / 3;
                    break;
            }
        })

        document.addEventListener("keyup", key => {
            rm = false;
            xCh = 0;
            yCh = 0;
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 20);
    }

    update() {
        this.render();
        count++;
        if (count % 4 == 0)
            count2++;
        if (rm) {
            xAm += xCh;
            yAm += yCh;
        }
        if (Math.abs(xAm - xUFO) > 7) {
            if (xUFO > xAm)
                xUFO -= Math.abs(xAm - xUFO) / 15;
            else
                xUFO += Math.abs(xAm - xUFO) / 15;
        }

        if (Math.abs(yUFO - (yAm - this.getWidth() * 2)) > 7) {
            if (yUFO > yAm - this.getWidth() * 2)
                yUFO -= Math.abs(yUFO - (yAm - this.getWidth() * 2)) / 15;
            else 
                yUFO += Math.abs(yUFO - (yAm - this.getWidth() * 2)) / 15;
        }
        if (xAm < 0)
            xAm = game_W;
        if (xAm > game_W)
            xAm = 0;
        if (yAm < 0)
            yAm = game_H;
        if (yAm > game_H)
            yAm = 0;
        // console.log(rm);
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;

        if (rm == false) {
            xIM2 = this.getWidth() * 2.5;
            yIM2 = game_H - this.getWidth() * 4.5;
            this.draw();
        }
    }

    draw() {
        this.clearScreen();
        this.drawEcircle();
        this.drawAmongUS();
    }

    drawEcircle() {
        this.context.drawImage(bg, 0, 0, game_W, game_H);
        this.context.drawImage(im, this.getWidth() * 0.5, game_H - this.getWidth() * 6.5, this.getWidth() * 6, this.getWidth() * 6);
        this.context.drawImage(im2, xIM2, yIM2, this.getWidth() * 2, this.getWidth() * 2);
    }

    drawAmongUS() {
        if (rm)
            this.context.drawImage(amongus[count2 % 4 + 1][direction], xAm - this.getWidth() * 1.5, yAm - this.getWidth() * 1.5, this.getWidth() * 3, this.getWidth() * 3);
        else
            this.context.drawImage(amongus[0][direction], xAm - this.getWidth() * 1.5, yAm - this.getWidth() * 1.5, this.getWidth() * 3, this.getWidth() * 3);
        this.context.drawImage(ufo, xUFO - this.getWidth() * 0.9, yUFO - this.getWidth() * 0.9, this.getWidth() * 1.8, this.getWidth() * 1.8);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, game_W, game_H);
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 400);
    }
}

var g = new game();
