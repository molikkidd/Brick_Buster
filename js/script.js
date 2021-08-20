
const game = document.getElementById('game');
const ctx = game.getContext('2d');
    game.setAttribute('width', 600);
    game.setAttribute('height', 600);
// let paddleHeight = 10;
// let paddleWidth = 100;
// let paddleX = (game.width-paddleWidth)/2;
let ballRadius = 10;
let x = game.width/4;
let y = game.height-40;
let paddleCenter = (game.width - 100)/2;
let dx = 2;
let dy = -2;
let player1;
let player2;


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

// MOVE THE PLAYERS
function movementHandler(e) {
    // you can track the keystrokes http://keycode.info/
    // console.log(e.key);
    // console.log('player 1 :', player1.x);
    // // console.log('player 2 :', player2.x);

// use swtich to change between the directions
    switch(e.which) {
        // Left Arrow - 37 : LEFT PLAYER 1
        case 37:
            console.log('moving left');
            player1.x - 10 >= 0 ? player1.x -= 20 : null; 
            break;
        // Right Arrow - 39 : PLAYER 1
        case 39:
            player1.x + 10 <= game.width ? player1.x += 20 : null; 
            break;
        // A - 65 : LEFT PLAYER 2a
        case 65:
            player2.x - 10 >= 0 ? player2.x -= 20 : null; 
            break;
        // D - 68 : RIGHT PLAYER 2
        case 68:
            player2.x + 10 <= game.width ? player2.x += 20 : null; 
            break;
    }
   
} 
// MOVE THE BALL
function ballMovement() {
    // LEFT AND RIGHT BOUNDARIES
    if(x + dx > game.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    } else if( y + dy < ballRadius || y + dy > game.height-ballRadius) {
        // if the y position of the ball + the incremental change is greater
        if(x > player2.x && x < player2.x + 100 || x > player1.x && x < player1.x + 100) {
            // if the ball hits the paddle then go in opposite direction
            // console.log(x);
            console.log(player1.x);
            console.log(player2.x) //250 
            dy = -dy;
        } else {
            // otherwise game over
            alert('GAME OVER');
            document.location.reload();
            // clearInterval(runGame);
            // lives--;
            // if(!lives) {
            //     alert('You done, pack up it up, go home');
            //     document.location.reload();
            //     clearInterval(interval);
            // } else {
            //     // reseting the movement of the ball after lost of life
            //     x = game.width/2;
            //     y = game.height - 30;
            //     dx = 2;
            //     dy = -2;
            //     paddleX = (game.width - paddleWidth)/2;
            }
            
        // reverse the direction the ball came in.     
            
        }
        
}

// GAMELOOP
function gameLoop () {
    ctx.clearRect(0,0, game.width, game.height);
   //  add score
   // display x and y coordinates of hero
//    movementDisplay.textContent = `x: ${hero.x}\n y:${hero.y}`;
   // is the ogre alive??        
//    if (shrek.alive) {
//        // check collison 
//        let hit = detectHit(hero, shrek);
//    }
    player1.render();
    player2.render();
    drawBall();
    x += dx;
    y += dy;
    ballMovement();
  
}






document.addEventListener("DOMContentLoaded", e => {
    console.log('app.js is connected');
    player1 = new Player('blue', 250, 570);
    player2 = new Player('green', 250, 10);
    const runGame = setInterval(gameLoop, 10);
    
    document.addEventListener('keydown', movementHandler);

});
