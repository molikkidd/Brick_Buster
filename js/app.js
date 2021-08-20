

// GLOBAL DOM / VARIABLES
const game = document.getElementById('game');
const ctx = game.getContext('2d');
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
let lives = 3;
let player1; 
// let player2; 
// movement display
let liveScore = document.getElementById('p1Lives');
console.log(liveScore);

const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y:0, status: 1};
        } 
}
// game.setAttribute("height", getComputedStyle(game)["height"]);
// game.setAttribute("width", getComputedStyle(game)["width"]);
// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.
   
// ====================== SETUP FOR CANVAS RENDERING ======================= //

        
game.setAttribute('width', 600);
game.setAttribute('height', 600);

var x = game.width/2;
var y = game.height-30;
// increments that ball moves/ in pixels
var dx = 2;
var dy = -2;

// // ====================== COLLISION DETECTION ======================= //
// /**
//  * @function detectHit
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
                        clearInterval(interval);
                    }
                    console.log("hit a brick");
                }
            }
        }  
    }
}
// ====================== ENTITIES ======================= //

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
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('Score: '+ score, 8, 20);
}
function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('Lives: '+ lives, game.width - 65, 20);
}
function drawPlayers() {
    ctx.font ='16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('Player: ' + player1, 8, game.height - 20)
}
function draw() {
    ctx.clearRect(0, 0, game.width, game.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    drawPlayers();
    collisionDetection();

    liveScore.textContent = 'Lives : ' + lives;

    if(x + dx > game.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if( y + dy < ballRadius) {
        // if the y position of the ball + the incremental change is greater
        dy = -dy;
        // reverse the direction the ball came in.
    } else if (y + dy > game.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            // if the ball hits the paddle then go in opposite direction
            dy = -dy;
        } else {
            // otherwise game over
            // alert('GAME OVER');
            // document.location.reload();
            // clearInterval(interval);
            lives--;
            
            if(!lives) {
                alert('You done, pack up it up, go home');
                document.location.reload();
                clearInterval(interval);
            } else {
                // reseting the movement of the ball after lost of life
                x = game.width/2;
                y = game.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (game.width - paddleWidth)/2;
            }
        }
    }

    // gameLoop for key movements 
    if (rightPressed && paddleX < game.width - paddleWidth) {
        paddleX += 7;
        // how many incremenets the paddle will move
        if(paddleX + paddleWidth > game.width) {
            // stops the paddle on the right side of the canvas
            paddleX = game.width - paddleWidth;
        }
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
        if (paddleX < 0) {
            // stop the paddle on the left side of the canvas
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
} 
let interval = setInterval(draw, 5);



// // ====================== HELPER FUNCTIONS ======================= //
// // SANDBOX FOR TESTING PAINTING TECHNIQUES




// //  GUI
// function addNewShrek() {

// }

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
// // ====================== GAME PROCESSES ======================= //
//     /**
//      * @function gameLoop
//      * @todo display the x and y coordinates of our hero
//      * @todo check if the ogre is alive
//      * @todo check for collision 
//      * @todo render the hero
//      */


// // ====================== PAINT INTIAL SCREEN ======================= //
document.addEventListener('DOMContentLoaded', e => {
    // playa1 = new Player('blue');
    // console.log(playa1.render());
    // playa1.render();

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
});


// CODE STASH FOR OLD CODE