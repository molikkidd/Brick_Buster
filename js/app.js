// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.

// GLOBAL DOM / VARIABLES
const game = document.getElementById('game');
const ctx = game.getContext('2d');
            game.setAttribute('width', 600);
            game.setAttribute('height', 600);
let ballRadius = 10;
// paddle
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (game.width-paddleWidth)/2;
// brick layout
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 100;
let brickHeight = 30;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
// score
let score = 0;
// Dang, Can I live?
let lives = 1;
let runGame;
let gameEnd = false;
// ball coordinates
var x = game.width/2;
var y = game.height-30;
// increments that ball moves/ in pixels
var dx = 2;
var dy = -2;
// Brick layout
const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y:0, status: 1};
        } 
}
// movement display
let p1Lives = document.getElementById('p1Lives');
let liveScore = document.getElementById('liveScore');




// ====================== ENTITIES ======================= //
//**
//  * @create {object<ball>}
//  * @create {object<paddle>}
//  * @create {object<brick>}
//  * @todo assign X and Y coordinates to brick
//  * @todo create brick and choose color
//  */

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, game.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {       
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop; 
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY, brickWidth, brickHeight);
                ctx.fillStyle = 'orange';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// // ====================== COLLISION DETECTION ======================= //
// /**
//  * @function crawler
//  * @param {object<Crawler>} p1
//  * @param {object<Crawler>} p2
//  * @todo if the bottom of one below is above the other 
//  * @todo if the top of one is above the bottom of another 
//  * @todo if the right of one is right of the other left
//  */
function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y <b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert('you win, congrats');
                        document.location.reload();
                    }
                    // console.log("hit a brick");
                }
            }
        }  
    }
}
// // ====================== GAME PROCESSES ======================= //
//     /**
//      * @function draw (draw the images on the screen)
//      * @todo KeyBoard Logic/ connect keys with player
//      * @todo create gameloop
//      * @todo add liveUpdates: lives/Score
//      * @todo render the hero
//      */

// //  KEYBOARD INTERACTION LOGIC
let rightPressed = false;
let leftPressed = false;

function keyDownHandler (e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else  if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler (e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else  if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function mouseMoveHandler (e) {
    let relativeX = e.clientX - game.offsetLeft;
    if(relativeX > 0 && relativeX < game.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
// GameLoop
function draw() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBall();
    drawBricks();
    drawPaddle();
    collisionDetection();

// add live score and Lives to HTML
// will not work outside of the loop
    liveScore.textContent = 'SCORE: ' + score;
    p1Lives.textContent = 'LIVES: ' + lives;
// set ball boundaries
    // Left and Right Boundaries
    if(x + dx > game.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Top boundary
    if( y + dy < ballRadius) {
    // reverse the direction the ball came in.
        dy = -dy;
    } 
    // Bottom boundary 
    else if (y + dy > game.height - ballRadius) {
        // space between the paddles
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // otherwise if its a miss subtract one life
            lives--;
            // if no lives then Game Over
            if(!lives) {
                gameOver();
            } else {
                // reseting the movement of the ball after each miss
                x = game.width/2;
                y = game.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (game.width - paddleWidth)/2;
            }
        }
    }
    // key movements 
    if (rightPressed && paddleX < game.width - paddleWidth) {
    // how many incremenets the paddle will move
        paddleX += 7;
    // stops the paddle on the right side of the canvas
        if(paddleX + paddleWidth > game.width) {
            paddleX = game.width - paddleWidth;
        }
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    // stop the paddle on the left side of the canvas
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    // sums x and y coordinates
    x += dx;
    y += dy;
    // creates loop like setInterval except a browser friendly method
    // for smoother animation.  
    // requestAnimationFrame(draw);
} 
draw();

// // ====================== HELPER FUNCTIONS ======================= //
//     /**
//      * @function startGame()
//      * @function gameOver()
//      * @todo start on click
//      * @todo add overlay
//      * @todo remove overlay
//      * @todo pop up after game over
//      * @todo reset game
//      */

// start and reset buttons
function startGame(e) {
// if no click then return
// if clicked on "start game a tag then start" 
    if(!e) {
        return;
    } else if (e.srcElement.localName === 'a'){
        runGame = setInterval(draw,5);
        // requestAnimationFrame(draw)
        // Remove Div "Start Game" Overlay
    let startDiv = document.getElementById('start');
    let gameOver = document.getElementById('game-over');
        startDiv.style.display = 'none';
        gameOver.style.display = 'none';
        // return runGame;
    } else {
        return;
    }
}

function gameOver() {
    // clear canvas screen
    ctx.clearRect(0,0, game.width, game.height);
    runGame = clearInterval(runGame);
    //  // reset the game
    x = game.width/3;
    y = game.height-80;
    score = 0;
    lives = 3;

    let startDiv = document.getElementById('start');
    let gameOver = document.getElementById('game-over');
        startDiv.style.display = 'none';
        gameOver.style.display = 'block';
    
}



// // ====================== PAINT INTIAL SCREEN ======================= //
document.addEventListener('DOMContentLoaded', e => {
    document.addEventListener('click', startGame);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    startGame();

});



