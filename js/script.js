
// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.

// GLOBAL DOM / VARIABLES
const game = document.getElementById('game');
const ctx = game.getContext('2d');
const p1LiveScore = document.getElementById('p1Lives');
const p2LiveScore = document.getElementById('p2Lives');
    game.setAttribute('width', 600);
    game.setAttribute('height', 600);
let paddleHeight = 20;
let paddleWidth = 100;
// let paddleX = (game.width-paddleWidth)/2;
let paddleCenter = (game.width - 100)/2;
// ball dimensions
let ballRadius = 10;
// ball starting point
let x = game.width/2;
let y = game.height-40;
// ball movements increments per frame
let dx = 2;
let dy = -2;
// players
let player1;
let player2;
let p1Score = 0;
let p2Score = 0;
// Brick dimensions
let brickRowCount = 2;
let brickColumnCount = 3;
let brickWidth = 100;
let brickHeight = 30;
let brickPadding = 120;
let brickOffsetTop = game.height/3.33;
let brickOffsetLeft = 40;
let bricksLeft = 6;
// Brick layout
const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y:0, status: 1};
        } 
}

let runGame;
// ====================== ENTITIES ======================= //
//**
//  * @create player constructor
//  * @create {object<ball>}
//  * @create {object<brick>}
//  * @todo assign X and Y coordinates to brick
//  * @todo create brick and choose color
//  */

// CREATE PLAYERS
class Player {
    constructor(color,x,y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.paddleWidth = 100;
        this.paddleHeight = 20;

        this.render = () => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
            ctx.fill();
            ctx.closePath();
        }  
    }
}
// CREATE BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    
}
// CREATE BRICKS
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
// // ====================== GAME PROCESSES ======================= //
//     /**
//      * @function gameLoop 
//      * @todo KeyBoard Logic/ connect keys with player
//      * @todo create gameloop 
//      * @todo add liveUpdates: Score
//      * @todo render the Players
//      */

// //  KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    // you can track the keystrokes http://keycode.info/
// players move left or right in 30 px increments
    switch(e.which) {
        // Left Arrow - 37 : LEFT PLAYER 1
        case 37:
            player1.x - 10 >= 0 ? player1.x -= 30 : null; 
            break;
        // Right Arrow - 39 : PLAYER 1
        case 39:
            player1.x + 10 <= game.width - 100 ? player1.x += 30 : null; 
            break;
        // A - 65 : LEFT PLAYER 2a
        case 65:
            player2.x - 10 >= 0 ? player2.x -= 30 : null; 
            break;
        // D - 68 : RIGHT PLAYER 2
        case 68:
            player2.x + 10 <= game.width - 100 ? player2.x += 30 : null; 
            break;
    }
   
} 



/// ====================== HELPER FUNCTIONS ======================= //
//     /**
//      * @function startGame()
//      * @function gameOver()
//      * @todo start on click
//      * @todo add overlay
//      * @todo remove overlay
//      * @todo pop up after game over
//      * @todo reset game
//      */

// COLLISION WITH BRICK
function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y <b.y + brickHeight) {
                    dy = -dy;
                    b.status = 1;
                    console.log("hit a brick");
                }
            }
        }  
    }
}

// MOVE THE BALL
function ballBoundaries() {
    // Left and Right Boundaries
    if(x + dx > game.width - ballRadius || x + dx < ballRadius) {
        // if contact go in opposite direction
        dx = -dx;
    } 
    // Top Boundary
    // Need to refactor to one if else statement
    if( y + dy < ballRadius) {
        // if the ball x hits with in the space of the paddle
        if(x > player2.x && x < player2.x + paddleWidth || x > player2.x && x < player2.x + paddleWidth) {
            // go in opposite direction
            dy = -dy;
        } else {
            // if ball goes past boundary
            // add point to player 1
            p1Score++;
            // if player scores 3 times
            if(p1Score === 3) {
                // alert('PLAYA PLAYER WINNER #1');
                // document.location.reload();
                // clearInterval(runGame);
                startGame();

            } else {    
                // otherwise reset the ball
                x = game.width/3;
                y = game.height - 50;
                dx = 2;
                dy = -2;
                paddleCenter = (game.width - 100)/2;
            }    
        }
    }   
//    Bottom Boundary
    if (y + dy > game.height-ballRadius) {
        // if the ball x hits with in the space of the paddle
        if(x > player1.x && x < player1.x + 100 || x > player1.x && x < player1.x + 100) {
            // go in opposite direction
            dy = -dy;
        } else {
            p2Score++;
            if(p2Score === 3) {
                // alert('PLAYA PLAYER WINNER #2');
                // document.location.reload();
                // clearInterval(runGame);
                gameOver();
            } else {    
                x = game.width/4;
                y = game.height-100;
                dx = 2;
                dy = -2;
                paddleCenter = (game.width - 100)/2;
            }                
        }
    } 
}
// GAMELOOP
function gameLoop () {
    // refresh the whole canvas
    ctx.clearRect(0,0, game.width, game.height);
    // render all entities 
    player1.render();
    player2.render();
    drawBricks();
    drawBall();
    ballBoundaries();
    collisionDetection();
    x += dx;
    y += dy;

    // update livescore
    p2LiveScore.textContent = `PLAYER 2: ${p2Score}`; 
    p1LiveScore.textContent = `PLAYER 1: ${p1Score}`;
}

// start and reset buttons
function startGame(e) {

    // if no click then return
    // if clicked on "start game a tag then start" 
        if(!e) {
            return;
        } else if (e.srcElement.localName === 'a'){
            let runGame = setInterval(gameLoop,5);
        } else {
            return;
        }

        
    // Remove Div "Start Game" Overlay
        let startDiv = document.getElementById('start');
        let gameOver = document.getElementById('game-over');
            startDiv.style.display = 'none';
            gameOver.style.display = 'none';
    }

function gameOver() {
        // stop the game 
        clearInterval(runGame);
        ctx.clearRect(0,0, game.width, game.height);
        // reset the scores
         p1Score = 0;
         p2Score = 0;
          // reload the entities
          drawBall();
          drawBricks();
          collisionDetection();
        // display GameOver modal
        let gameOver = document.getElementById('game-over');
            gameOver.style.display = 'block';

        // start the game over
        // document.location.reload();

    }
document.addEventListener("DOMContentLoaded", e => {
    player1 = new Player('blue', 250, 570);
    player2 = new Player('green', 250, 10);
    startGame();
});
document.addEventListener('click', startGame);
document.addEventListener('keydown', movementHandler);


    


 