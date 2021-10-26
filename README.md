# `Brick_Buster`

## What it Includes

* HTML5 CANVAS
* CSS
* JavaScript
* Bootstrap

## About

### A modern remake on a timeless classic. Control the paddle left and right to destroy as many bricks as you can without letting the ball go past! 

### One Player Mode

#### 1 Player: Control the paddle using the Mouse/Track pad to move the right to left. Option 2, use the left and right arrow to control the paddle.

### Two Player Mode  

#### 2 Player: Use the 'a' + 'd' keys for player 2 movements and player 1 will use the left and right arrows. 
    
#### - 2 Player Mode is a rendition of Pong mixed will Break Buster. Their are bricks in the middle of the game to add a basic level of complexity to the collision path of the ball.
#### - Players play up to 5 points and who ever scores 5 first wins sarcastic kind words of congratulations. 
   
-------------------
## `1` Fork & Clone Project 

## `2` Analyze File Structure

```text
├── css
│   └── style.css
├── img
│   └── images...
├── js
│   └── app.js
│   └── script.js
├── onePlayer.html
├── README.md
├── twoPlayer.html
```

- `style.css`: The main file for styling the elements on the HTML canvas.
- `img`: A folder holding the collection of images used on throughout the application.
- `app.js`: The file holds the logic for the onePlayer mode.
- `script.js`: The file holds the logic for the twoPlayer mode.
- `onePlayer.html`: The structure of the one player game.
- `README.md`: The main markdown file that written to explain the details your app.
- `twoPlayer.html`: The structure of the two player game.

## Create One Player HTML Canvas
- add image for 

```html
<div id="container">
        <aside id="top-left"><h2 class="display-2">Brick Buster</h2></aside>
        <aside id="top-right"><h2 id="liveScore">SCORE: 0</h2></aside>
        <main>
            <div id="start" >
                <a href="#" >Start Game</a>          
            </div>
            <div id="game-over" style="display: none">
                <h1>Game Over</h1>
                <a href="onePlayer.html" >Play Again</a>
            </div>
            <canvas id="game" ><!-- play it, a game --></canvas>   
        </main>
        <div id="rightMenu">
            <p class="text-white">
                1 Player Mode: 
                Use the mouse to move your paddle side to side.
            </p>
            <p class="text-white">
                2 Player Mode: 
                Use the 'A' & 'D' keys for player 2 movements and player 1 will use the left and right arrows.
            </p>
                <a id="p1Start" href="onePlayer.html" type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Solo Dolo">ONE</a>
                <a id="p2Start" href="twoPlayer.html" type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Dos Mas">TWO</a>
        </div>
        <aside id="btm-left"></aside>
        <aside id="btm-right"><h2 id="p1Lives">LIVES: 3</h2></aside>
```

### Add your css and bootstrap links

### Create the canvas Objects

Create a Player constructor so that multiple players (Paddles) can be added, Then create the ball and obstacles (bricks).

-------------------

```js
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
```
-------------------

### Add keyboard or Mouse functionality

I used the Keyboard strokes to set the movement of the paddles. Player One moves using left and right arrows and Player Two moves using A and 'D' keys. Thats enough space in between two people to play and enough space to smack someones hand away while playing, preventing them from hitting the ball, because youre losing pretty bad.

-------------------

```js
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
```
![image](https://user-images.githubusercontent.com/28605078/130698628-a2c5be6b-db54-4463-9d3f-515e7d819f77.png)

-------------------

### Helper Functions

    Set the parameters for when the ball comes into collision with the brick and by changing the property 'status' from 1 to 0 in the one player mode, the brick would disappear, but in this example it is kept at 1. The left and right ball boundaries where set.

-------------------

```js
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
                
            gameOver();
                
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
            if(p2Score === 1) {
                
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
```

-------------------

### GameLoop

All the game objects where rendered or invoke in the game loop and the scores where updated live.

----------------

```js
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
```
-------------------

### Start and Reset Game

I set starting and resetting the game with seperate functions with a pop up display

-------------------
```js
function startGame(e) {

    // if no click then return
    // if clicked on "start game a tag then start" 
        if(!e) {
            return;
        } else if (e.srcElement.localName === 'a'){
             runGame = setInterval(gameLoop,5);
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
    }
``` 
![image](https://user-images.githubusercontent.com/28605078/130698668-6199dba2-e374-4182-8bae-c2e26cbf02e9.png)

