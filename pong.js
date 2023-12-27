let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');

let ballSpeedX = 2, ballSpeedY = 2;
let score = 0;

function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let paddleRect = paddle.getBoundingClientRect();
    
    // Update ball position
    ball.style.left = (ball.offsetLeft + ballSpeedX) + 'px';
    ball.style.top = (ball.offsetTop + ballSpeedY) + 'px';

    // Collision detection with top and bottom
    if (ball.offsetTop + ball.clientHeight >= window.innerHeight || ball.offsetTop <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision detection with paddle
    if (ballRect.left <= paddleRect.right &&
        ballRect.top >= paddleRect.top &&
        ballRect.bottom <= paddleRect.bottom) {
        ballSpeedX = -ballSpeedX;
        score++; // Increment score
        console.log("Score:", score);
    }

    // Reset ball if it passes the paddle
    if (ballRect.right <= 0) {
        resetBall();
    }

    requestAnimationFrame(moveBall);
}

function resetBall() {
    let pongAreaRect = document.getElementById('pongArea').getBoundingClientRect();
    ball.style.left = pongAreaRect.width / 2 - ball.clientWidth / 2 + 'px';
    ball.style.top = pongAreaRect.height / 2 - ball.clientHeight / 2 + 'px';
    score = 0; // Reset score
    console.log("Missed! Score reset.");
}

moveBall();

function keyDownHandler(event) {
    let paddleRect = paddle.getBoundingClientRect();
    if (event.key == "ArrowUp") {
        paddle.style.top = Math.max(0, paddle.offsetTop - 20) + 'px';
    } else if (event.key == "ArrowDown") {
        paddle.style.top = Math.min(window.innerHeight - paddleRect.height, paddle.offsetTop + 20) + 'px';
    }
}

document.addEventListener("keydown", keyDownHandler);
