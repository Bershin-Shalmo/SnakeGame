const gameBoard = document.getElementById("gameBoard");
const Context = gameBoard.getContext("2d"); // play area
const scoreText = document.getElementById("scoreValue");


//play area
const WIDTH = gameBoard.width; // play area
const HEIGHT = gameBoard.height;// play area

//foood
const UNIT = 25;

let foodX;
let foodY;

//move snake at starting
let xVelocity = 25;
let yVelocity =0;

let score = 0;
let active = true;
let started = false;

//snake
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener("keydown", keyPress)

// initiate the function
startGame();

function startGame(){
    Context.fillStyle = '#212121';
    Context.fillRect(0,0,WIDTH,HEIGHT)

    createFood();
    displayFood();
    //drawSnake();
    //moveSnake();
    //drawSnake();
    //clearBoard();
    drawSnake();

}

function clearBoard(){
    Context.fillStyle = '#212121';
    Context.fillRect(0,0,WIDTH,HEIGHT)
}



function createFood(){
    // display food in random 
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT

}

function displayFood(){
    Context.fillStyle = "red"
    Context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSnake(){
    Context.fillStyle = "aqua";
    Context.strokeStyle = "#212121";

    snake.forEach((snakePart)=>{
        Context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        Context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVelocity,y:snake[0].y+yVelocity}
    snake.unshift(head);

    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }else
    snake.pop();
}

function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    },200);
}else{
    clearBoard();
    Context.font = "bold 50px serif";
    Context.fillStyle = "white";
    Context.textAlign = "center";
    Context.fillText("Game Over!!" , WIDTH/2, HEIGHT/2)
}
}

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    active = true;
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40


    switch(true){
        case(event.keyCode==LEFT && xVelocity!=UNIT):
            xVelocity=-UNIT;
            yVelocity=0;
            break;
        case(event.keyCode==RIGHT && xVelocity!=-UNIT):
            xVelocity=UNIT;
            yVelocity=0;
            break;
        case(event.keyCode==UP && yVelocity!=UNIT):
            xVelocity=0;
            yVelocity=-UNIT;
            break;
        case(event.keyCode==DOWN && yVelocity!=-UNIT):
            xVelocity=0;
            yVelocity=UNIT;
            break;
}
    
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active = false;
        break;
    }
}

