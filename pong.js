let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');

let ballSpeedX = 2, ballSpeedY = 2;
let score = 0;

function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let leftPaddleRect = leftPaddle.getBoundingClientRect();
    
    // Update ball position
    ball.style.left = ballRect.left + ballSpeedX + 'px';
    ball.style.top = ballRect.top + ballSpeedY + 'px';

    // Collision detection with top and bottom
    if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision detection with left paddle
    if (ballRect.left <= paddleRect.right &&
        ballRect.top >= paddleRect.top &&
        ballRect.bottom <= paddleRect.bottom) {
        ballSpeedX = -ballSpeedX;
        score++; // Increment score
        console.log("Score:", score);
    }

    // Reset ball if it passes the left paddle
    if (ballRect.right <= 0) {
        ball.style.left = '50%';
        ball.style.top = '50%';
        score = 0; // Reset score
        console.log("Missed! Score reset.");
    }

    requestAnimationFrame(moveBall);
}

moveBall();

function keyDownHandler(event) {
    let leftPaddleRect = leftPaddle.getBoundingClientRect();
    if (event.key == "ArrowUp") {
        leftPaddle.style.top = Math.max(0, leftPaddleRect.top - 20) + 'px';
    } else if (event.key == "ArrowDown") {
        leftPaddle.style.top = Math.min(window.innerHeight - leftPaddleRect.height, leftPaddleRect.top + 20) + 'px';
    }
}

document.addEventListener("keydown", keyDownHandler);
