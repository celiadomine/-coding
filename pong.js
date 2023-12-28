//Global Variables
var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

var rounds = [5, 5, 3, 3, 2];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6'];

// The ball object
var Ball = {
    new: function (incrementedSpeed) {
        return{
            width: 18,
            height: 18,
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.heigth / 2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 7
        };
    }
}; 

var Game = {
    initialize: function () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext("2d");

        this.canvas.width = 1400;
        this.canvas.height = 1000;

        this.canvas.style.width = (this.canvas.width / 2) + "px";
        this.canvas.style.height = (this.canvas.height / 2) + "px";
    
        this.player = Ai.new.call(this, "left");
        this.ai = Ai.new.call(this, "right");
        this.ball = Ball.new.call(this);

        this.ai.speed = 5;
        this.running = this.over = false;
        this.turn = this.ai;
        this.timer = this.round = 0;
        this.color = "#8c52ff";

        Pong.menu();
        Pong.listen();
    },

    endGameMenu: function (text) {
        //Change the canvas font size and color
        Pong.context.font = "45px Courier New";
        Pong.context.fillStyle = this.color;

        //Draw the Rectangle behind the "Press any key to begin" text
        Pong.context.fillRect(
            Pong.canvas.width / 2- 350,
            Pong.canvas.heigth / 2 - 48,
            700,
            100
        );

        //Change the canvas color;
        Pong.context.fillStyle = "#fff";

        //Draw the end game menu text ("Game Over" and "Winner")
        Pong.context.fillText(text,
            Pong.canvas.width / 2,
            Pong.canvas.height / 2 + 15
        );

        setTimeout (function () {
            Pong = Object.assign({}, Game);
            Pong.initialize();
        }, 3000);
    },

    menu: function () {
        //Draw all the Pong objects in their current state
        Pong.draw();

        //Change the canvas font size and color
        this.context.font = "50px Courier New"
        this.context.fillStyle = this.color;

        //Draw the rectangle behind the "Press any key to begin" text.
        this.context.fillRect(
            this.canvas.width / 2 - 350,
            this.canvas.heigth / 2 - 48,
            700,
            100
        );

        //Changes the canvas color;
        this.context.fillStyle = "#fff";

        //Draw the "press any key to begin" text
        this.context.fillText("Press any key to begin",
            this.canvas.width / 2,
            this.canvas.height / 2 + 15
            );
        },
}