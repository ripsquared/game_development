var scoreDisplay = document.querySelector("#score");
var livesDisplay = document.querySelector("#lives");
var resetButton = document.querySelector("#reset");


//The var for our scene object.
var ocean;
//The var for our user sprite object.
var speedBoat;
//Our array of pirates
var pirates;
//The amount of pirates
var pirateNum = 10;
//Our treasure/objective
var treasure;
//Treasure count
var score = 0;
//Lives count
var lives = 10;

function init(){
    ocean = new Scene();
    ocean.setBG("#2771e8");
    scoreDisplay.textContent = "Score: 0";
    livesDisplay.textContent = "Lives: 10";
    buildSounds();
    speedBoat = new speedBoat();
    treasure = new treasure();
    setupPirates();
    ocean.start();
}

//Update
function update(){
    ocean.clear();
    backgroundMp3.play();
    speedBoat.checkKeys();
    treasure.update();
    speedBoat.update();
    speedBoat.checkDrag();
    for(var i = 0; i < pirateNum; i++){
        checkCollisions(i);
        pirates[i].update();
    }
}

function checkCollisions(pirateNum){
    //Set an initial default speed.
    var speed = -12;
    if(speedBoat.collidesWith(pirates[pirateNum])){
        speed--;
        pirateArr.play();
        var newXPos = ocean.width;
        var newYPos = Math.random() * ocean.height;
        pirates[pirateNum].setPosition(newXPos, newYPos);

        pirates[pirateNum].addVector(pirates[pirateNum].getImgAngle(), speed);
        if(speed < -25){
            pirates[pirateNum].setSpeed(-25);
        }
        //If you hit a pirate, you lose a life. Then update your lives.
        lives--;
        livesDisplay.textContent = "Lives: " + lives;
        //If you have zero lives, end the game.
        if(lives === 0){
            ocean.stop();
        }
    }

    if(speedBoat.collidesWith(treasure)){
        var newXPos = Math.random() * ocean.width;
        var newYPos = Math.random() * ocean.height;
        treasure.setPosition(newXPos, newYPos);
        score++;
        scoreDisplay.textContent = "Score:" + score;
    }
}

function treasure() {
    treasure = new Sprite(ocean, "treasure.png", 25, 25);
    treasure.setSpeed(0);
    var newXPos = ocean.width;
    var newYPos = Math.random() * ocean.height;
    treasure.setPosition(newXPos, newYPos);
    return treasure;
}

function speedBoat() {
    var boat = new Sprite(ocean, "speedBoat.png", 50, 50);
    boat.checkKeys = function(){
        if (keysDown[K_UP]){
            boat.addVector(0, 1.5);
        }
        if (keysDown[K_DOWN]){
            boat.addVector(0, -1.5);
        }
        if (keysDown[K_LEFT]){
            boat.addVector(boat.getImgAngle(), -2);
        }
        if (keysDown[K_RIGHT]){
            boat.addVector(boat.getImgAngle(), 2);
        }
    }

    boat.checkDrag = function(){
        var speed = this.getSpeed();
        speed *= .95;
        this.setSpeed(speed);
        }

    return boat;
}

function pirateBoat(){
    var boat = new Sprite(ocean, "pirateBoat.png", 50, 50);
    var newXPos = ocean.width;
    var newYPos = Math.random() * ocean.height;
    boat.setPosition(newXPos, newYPos);
    var speed = Math.random() * -15;
    boat.addVector(boat.getImgAngle(), speed);
    return boat;
}

function setupPirates(){
    pirates = new Array(pirateNum);
    for(var i = 0; i < pirateNum; i++){
        pirates[i] = new pirateBoat();
    }
}

//Event listener for reset.
resetButton.addEventListener("click", function(){
    reset();
});

//Reset the game.
function reset(){
    lives = 5;
    score = 0;
    document.location.href = "";

}

function buildSounds(){
    backgroundMp3 = new Sound("pirateBackground.mp3");
    pirateArr = new Sound("arr.mp3");
}
