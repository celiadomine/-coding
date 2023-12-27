const BOX = window.innerHeight;

let canvas;
let ctxt;
let ball;

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.width = BOX;
    canvas.height = BOX;
    ctxt = canvas.getContext("2d");

    loop();
};

function loop() {
    ctxt.fillStyle = "black"; // Background color
    ctxt.fillRect(0, 0, BOX, BOX);
    for (let ball of balls) {
        ball.render(ctxt);
        ball.update();
    }
    requestAnimationFrame(loop);
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.xSpeed = Math.random() * 2 - 1; // Speed in x-direction
        this.ySpeed = 0; // No vertical movement
        this.color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;
    }

    render(ctxt) {
        ctxt.fillStyle = this.color;
        ctxt.beginPath();
        ctxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctxt.fill();
        ctxt.stroke();
    }

    update() {
        this.x += this.xSpeed;

        // Collision detection for left and right walls
        if (this.x < this.r || this.x > BOX - this.r) {
            this.xSpeed = -this.xSpeed;
        }
    }
}

