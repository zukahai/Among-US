let game_W = 20;
let game_H = 20;
let count = 0;
let count2 = 0;
let xIM2 = 0, yIM2 = 0;
let xCh = 0, yCh = 0;
var im = new Image();
im.src="images/moveButton.png";
var im2 = new Image();
im2.src="images/moveButton2.png";
var bg = new Image();
bg.src="images/background.png";
kill = [];
kill[0] = new Image();
kill[0].src="images/kill/kill0.png";
kill[1] = new Image();
kill[1].src="images/kill/kill1.png";


AM = [];
N = 3;
let test = 0;
var v = [];
let iden = -111;
let idenKill = -222;

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

        this.amu = new amongus(this, game_W / 2, game_H / 2, "HaiZuka");
        for (let i = 0; i < N; i++) {
            AM[i] = new amongus(this, game_W / 2 + this.getWidth() * 3, game_H / 2, "Player" + (i + 1));
            AM[i].Auto = true;
        }

        xIM2 = this.getWidth() * 2.5;
        yIM2 = game_H - this.getWidth() * 4.5;


        this.loop();

        this.listenKeyboard();
        this.listenMouse();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            this.amu.name = test;
            for (let i = 0; i < evt.touches.length; i++)
                if (evt.touches[i].identifier == iden) {
                    var x = evt.touches[i].pageX;
                    var y = evt.touches[i].pageY;

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
                        this.amu.direction = 2;
                    else 
                        this.amu.direction = 1;

                    xCh = (x - Xc) / 7;
                    yCh = (y - Yc) / 7;

                    if (this.amu.rm == true) {
                        xIM2 = x - this.getWidth();
                        yIM2 = y - this.getWidth();
                        this.draw();
                    }
                }
            
        })

        document.addEventListener("touchstart", evt => {
            test++;
            var x = evt.touches[evt.touches.length - 1].pageX;
            var y = evt.touches[evt.touches.length - 1].pageY;
            var Xc = this.getWidth() * 3.5;
            var Yc = game_H - this.getWidth() * 3.5;

            if ((Xc - x) * (Xc - x) + (Yc - y) * (Yc - y) <= 9 * this.getWidth() * this.getWidth()) {
                if (!this.amu.rm) {
                    this.amu.rm = true;
                    iden = evt.touches[evt.touches.length - 1].identifier;
                    xIM2 = x - this.getWidth();
                    yIM2 = y - this.getWidth();
                    this.draw();
                }
            }

            var Xk = game_W - this.getWidth() * 2.5;
            var Yk = game_H - this.getWidth() * 2.5;
            if ((Xk - x) * (Xk - x) + (Yk - y) * (Yk - y) <= 6 * this.getWidth() * this.getWidth()) {
                console.log("Kill");
                idenKill = evt.touches[evt.touches.length - 1].identifier;
                var k = this.checkKill();
                if (k != -1) {
                    this.amu.xA = AM[k].xA;
                    this.amu.yA = AM[k].yA;
                }
            }
        })

        document.addEventListener("touchend", evt => {
            xIM2 = this.getWidth() * 2.5;
            yIM2 = game_H - this.getWidth() * 4.5;
            // this.amu.rm = false;
            let check = true;
            for (let i = 0; i < evt.touches.length; i++)
                if (evt.touches[i].identifier == iden)
                    check = false;
            if (check)
                this.amu.rm = false;
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
            this.amu.rm2 = true;
            switch(key.keyCode) {
                case 65:
                case 37:
                    xCh = -this.getWidth() / 5;
                    this.amu.direction = 2;
                    break;
                case 38:
                case 87:
                    yCh = -this.getWidth() / 5;
                    break;
                case 39:
                case 68:
                    xCh = this.getWidth() / 5;
                    this.amu.direction = 1;
                    break;
                case 40:
                case 83:
                    yCh = this.getWidth() / 5;
                    break;
                default:
                    this.amu.rm2 = false;
            }
        })

        document.addEventListener("keyup", key => {
            this.amu.rm2 = false;
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
        if (this.amu.rm || this.amu.rm2) {
            this.amu.xA += xCh;
            this.amu.yA += yCh;
        }
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;

        if (this.amu != null && this.amu.rm == false) {
            xIM2 = this.getWidth() * 2.5;
            yIM2 = game_H - this.getWidth() * 4.5;
        }
    }

    draw() {
        this.clearScreen();
        // console.log(game_W,' ', game_H);
        if (game_W < 1322 || this.amu.rm)
            this.drawEcircle();
        // this.amu.draw();
        for (let i = 0; i < N; i++) 
            AM[i].draw();
        this.drawKill();
        this.amu.draw();
    }

    checkKill() {
        for (var i = 0; i < N; i++) {
            if (Math.sqrt(Math.abs(this.amu.xA - AM[i].xA) * Math.abs(this.amu.xA - AM[i].xA) + Math.abs(this.amu.yA - AM[i].yA) * Math.abs(this.amu.yA - AM[i].yA)) <= 6 * this.getWidth()) {
                return i;
            }
        }       
        return -1;
    }

    drawKill() {
        let k = this.checkKill();
        // console.log(k);
        if (k == -1)
            this.context.drawImage(kill[0], game_W - this.getWidth() * 4.5, game_H - this.getWidth() * 4.5, this.getWidth() * 4, this.getWidth() * 4);
        else
            this.context.drawImage(kill[1], game_W - this.getWidth() * 4.5, game_H - this.getWidth() * 4.5, this.getWidth() * 4, this.getWidth() * 4);
    }

    drawEcircle() {
        this.context.drawImage(im, this.getWidth() * 0.5, game_H - this.getWidth() * 6.5, this.getWidth() * 6, this.getWidth() * 6);
        this.context.drawImage(im2, xIM2, yIM2, this.getWidth() * 2, this.getWidth() * 2);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        if (bg.width / game_W < bg.height / game_H)
            this.context.drawImage(bg, 0, (bg.height - game_H * (bg.width / game_W)) / 2, bg.width, game_H * (bg.width / game_W), 0, 0, game_W, game_H);
        else
        this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 400);
    }
}

var g = new game();
