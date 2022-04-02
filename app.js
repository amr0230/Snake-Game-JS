//////////////////////
///// Amr IDrees /////
//////////////////////

// Create variables to link them with HTML template
const canvas = document.querySelector('.game-container');
canvas.width = 400;
canvas.height = 400;

// CanvasRenderingContext2D
const ctx = canvas.getContext('2d');

// Continuously Update The Screen
// Increase the length of our snake
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// Initial Snake Speed 
let speed = 8;
// We take initial tileCount value to put it for width & height the tile square
let tileCount = 20;
// Tile Square Size 
let tileSize = canvas.width / tileCount - 2;

// X,Y-Position of the head of our snake
let headXsnake = 10;
let headYsnake = 10;

// Array snakeParts[] to add parts for the snake length
const snakeParts = [];

// Initial snake tail
let tailLength = 2;

// x,yVelocity to change them we are using keyboard (arrowup,arrowdown,left,right)
let xVelocity = 0;
let yVelocity = 0;

// Game progression rate, we will adding 1 value for each successful progress
let score = 0;
// Gulp Sound
const tileGulp = new Audio("./Audio/gulp.mp3");
// Game Over Sound
const boom = new Audio("./Audio/gameOver.mp3");

// Grow our snake, red tile here
let appleX = 5;
let appleY = 5;

// drawGame function()
let drawGame = function () {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen();
    checkApplyCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}

// isGameOver functione()
let isGameOver = function () {
    let gameOver = false; //by default
    // To prevent a collision before starting the game
    if (yVelocity == 0 && xVelocity == 0) {
        return false;
    }
    // When colliding with the Walls
    // X-axis left side
    if (headXsnake < 0) {
        gameOver = true;
    } else if (headXsnake === tileCount) {
        // X-axis right side
        gameOver = true;
    } else
    if (headYsnake < 0) {
        // Y-axis top side 
        gameOver = true;
    } else if (headYsnake === tileCount) {
        // Y-axis bottom side 
        gameOver = true;
    }
    // Stop the game in case of collision with the snake's body
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headXsnake && part.y === headYsnake) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        // Using CSS gradients
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        boom.play();
    }
    return gameOver;
}

// drawScore function()
let drawScore = function () {
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText("Score " + score, canvas.width - 70, 30);
}

// clearScreen function(), black background for ctx
let clearScreen = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// drawSnake function()
let drawSnake = function () {
    ctx.fillStyle = 'blue';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headXsnake, headYsnake));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(headXsnake * tileCount, headYsnake * tileCount, tileSize, tileSize);
}

// changeSnakePosition function()
let changeSnakePosition = function () {
    headXsnake = headXsnake + xVelocity;
    headYsnake = headYsnake + yVelocity;
}

// drawApple function()
let drawApple = function () {
    ctx.fillStyle = 'orange';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// checkApplyCollision function()
let checkApplyCollision = function () {
    if (appleX == headXsnake && appleY == headYsnake) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        tileGulp.play();
        speed += 0.1;
    }
}
// KeyCode
let keyDown = document.body.addEventListener('keydown', function (e) {
    // Move Up
    if (e.key == 'ArrowUp') {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // Move Down
    if (e.key == 'ArrowDown') {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // Move Left
    if (e.key == 'ArrowLeft') {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // Move Right
    if (e.key == 'ArrowRight') {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
});
drawGame();
// Reload the page
let playAgain = document.querySelector('.btn');
playAgain.addEventListener('click', function () {
    window.location.reload();
});