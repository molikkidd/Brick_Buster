# Brick_Buster

### Brick Buster is a classic game that involves what the name suggest. You are bounce a ball off 3 walls, The Opposite side of you sits a grid of bricks that your ball will need to come in contact with in order to break the brick.


### Choose One or Two Players

#### 1 Player: For the one player mode use the mouse to move your paddle side to side.
    
#### 2 Player: Use the 'a' + 'd' keys for player 2 movements and player 1 will use the left and right arrows. 
    
   #### - 2 Player Mode is a rendition of Pong mixed will Break Buster. Their are bricks in the middle of the game to add a basic level of complexity to the collision path of the ball.
   #### - Players play up to 5 points and who ever scores 5 first wins sarcastic kind words of congratulations. 
   
   
### Create the canvas Objects

I created functions to create all the game entities such as the ball, paddle and bricks.

```js
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
```

### Change the status of the Bricks

```js
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
```
### Add keyboard or Mouse functionality
```js
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
```

   
   
