document.addEventListener("DOMContentLoaded", e => {
    console.log('app.js is connected');
    mo = new Player('blue', 300, 500);
    opp = new newPlayer('green', 30, 250)
    mo.render();
    opp.render();
})


const game = document.getElementById('game');
const ctx = game.getContext('2d');
    game.setAttribute('width', 600);
    game.setAttribute('height', 600);
// let paddleHeight = 10;
// let paddleWidth = 100;
// let paddleX = (game.width-paddleWidth)/2;

// CREATE PLAYERS
class Player {
    constructor(color,x,y,paddleWidth,paddleHeight) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.paddleWidth = 100;
        this.paddleHeight = 20;

        this.render = () => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.rect((game.width - this.paddleWidth)/2, game.height - 30, this.paddleWidth, this.paddleHeight);
            ctx.fill();
            ctx.closePath();
        }  
    }
}

class newPlayer extends Player {
    constructor(color,x,y,paddleWidth,paddleHeight){
        super(color,x,y,paddleWidth,paddleHeight);
        this.render = () => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.rect((game.width - this.paddleWidth)/2, 30, this.paddleWidth, this.paddleHeight);
            ctx.fill();
            ctx.closePath();
        }
    }

  
}
// CREATE BALL
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}