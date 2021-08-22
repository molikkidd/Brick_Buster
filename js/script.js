
const game = document.getElementById('game');
const ctx = game.getContext('2d');
const p1LiveScore = document.getElementById('p1Lives');
const p2LiveScore = document.getElementById('p2Lives');
    game.setAttribute('width', 600);
    game.setAttribute('height', 600);
// let paddleHeight = 10;
// let paddleWidth = 100;
// let paddleX = (game.width-paddleWidth)/2;
let ballRadius = 10;
let x = game.width/2;
let y = game.height-40;
let paddleCenter = (game.width - 100)/2;
let dx = 2;
let dy = -2;
let player1;
let player2;
let p1Lives = 0;
let p2Lives = 0;
// Brick variables
let brickRowCount = 2;
let brickColumnCount = 3;
let brickWidth = 100;
let brickHeight = 30;
let brickPadding = 120;
let brickOffsetTop = game.height/3.33;
let brickOffsetLeft = 40;
let bricksLeft = 6;

const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y:0, status: 1};
        } 
}

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
// MOVE THE PLAYERS
function movementHandler(e) {
    // you can track the keystrokes http://keycode.info/
// use swtich to change between the directions
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

// MOVE THE BALL
function ballMovement() {
    // LEFT AND RIGHT BOUNDARIES
    if(x + dx > game.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    } 

    if( y + dy < ballRadius) {
        if(x > player2.x && x < player2.x + 100 || x > player2.x && x < player2.x + 100) {
            // if the ball hits the paddle then go in opposite direction
            // console.log(x);
            dy = -dy;
        } else {
            p2Lives++;
    
            if(p2Lives === 3) {
                alert('PLAYA PLAYER WINNER #1');
                document.location.reload();
                clearInterval(runGame);
            } else {    
                x = game.width/3;
                y = game.height - 50;
                dx = 2;
                dy = -2;
                paddleCenter = (game.width - 100)/2;
            }    
        }
    }   
    
    if (y + dy > game.height-ballRadius) {
        // if the y position of the ball + the incremental change is greater
        if(x > player1.x && x < player1.x + 100 || x > player1.x && x < player1.x + 100) {
            // if the ball hits the paddle then go in opposite direction
            // console.log(x);
            dy = -dy;
        } else {
            p1Lives++;
            // p2Lives--;
    
            if(p1Lives === 3) {
                alert('PLAYA PLAYER WINNER #2');
                document.location.reload();
                clearInterval(runGame);
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
// BRICKS LEFT
function bricksTotal() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('Score: '+ bricksLeft, 8, 20);
}
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
// GAMELOOP

function gameLoop () {
    ctx.clearRect(0,0, game.width, game.height);
 
    player1.render();
    player2.render();
    drawBricks();
    drawBall();
    x += dx;
    y += dy;
    ballMovement();
    bricksTotal();
    collisionDetection();

    p2LiveScore.textContent = `PLAYER 2: ${p1Lives}`; 
    p1LiveScore.textContent = `PLAYER 1: ${p2Lives}`;
}

const runGame = setInterval(gameLoop, 10);

// SWITCH GAME FOR 2 PLAYERS

document.addEventListener("DOMContentLoaded", e => {
    // console.log('app.js is connected');
    player1 = new Player('blue', 250, 570);
    player2 = new Player('green', 250, 10);
    // const runGame = setInterval(gameLoop, 10);
    

});

document.addEventListener('keydown', movementHandler);


    


 