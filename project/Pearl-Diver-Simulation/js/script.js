/**
Pearl Diver
Lydia Graveline

Pearl diving simulator!
*/

"use strict";

// Creates a new JavaScript Object describing the diver
let diver = { //user controlled
    x: 350,
    y: 100,
    size: 50,
    speed: 2.5
};

// Creates a new JavaScript Object describing water
let ocean = {
  surface: 100,
  floor: undefined //Defined in setup()
};

let timer = {
  x: 400,
  y: 50,
  speedDecrease: 0.2,
  speedIncrease: 1,
  max: 400,
}

let allFish = [];
let numFish = 10;

let pearls = [];
let numPearls = 3;

let state = `simulation` //can be Start, Simulation, End

let score;


function setup() {
  createCanvas(700, windowHeight);
  // Sets the ocean floor
  ocean.floor = height - 30;


  // Spawns fish
  for (let i = 0; i < numFish; i++) {
    allFish.push(new fish());
  }
  for (let i = 0; i < numPearls; i++) {
    pearls.push(new Pearl());
  }

  // Score begins at zero
  score = 0;

}

function draw() {
  background(135, 206, 235);


  if (state === `simulation`) {
    displayScore();
    displayDiver();
    diverMovement();
    displayOcean();
    displayTimer();
    checkTimerEnd();
    updatePearlAndCheckScore();
    updateFishAndCheckCollisions();
    }
  else if (state === `Game Over`){
    displayGameOver();
  }

}

 function displayTimer() {
   push();
   noStroke();
   fill(255);
   rect(timer.x, timer.y, timer.x, 5);
   pop();

   if (diver.y > ocean.surface) {
  	timer.x += timer.speedDecrease;
  } else if (diver.y === ocean.surface && timer.x >= timer.max) {
      timer.x -= timer.speedIncrease
  }
}

function checkTimerEnd() {
  if (timer.x >= width) {
    state = `Game Over`;
  }
}

function displayScore(){
  textSize (20);
  text((score), 50, 50);
}

// Displays the ocean
function displayOcean() {
  push();
  noStroke();
  // Displays the blue water
  fill(0, 128, 128, 127);
  rect(0, ocean.surface, width, height);
  // Displays the ocean floor
  fill(194, 178, 128);
  rect(0, height - 30, width, height);
  pop();
}

// Displays the diver as an ellipse
function displayDiver() {
  noStroke();
  fill(255);
  ellipse(diver.x, diver.y, diver.size)
}

// Allows player to control the diver using WASD and contrains the diver within the boundaries of the canvas
function diverMovement() {
  // A --> left
  if (keyIsDown(65)) {         // A key code is 65
    diver.x -= diver.speed;
  }
  // D --> right
  if (keyIsDown(68)) {  // D key code is
    diver.x += diver.speed;
  }
  // W --> up
  if (keyIsDown(87)) {        // W key code is 87
    diver.y -= diver.speed;
  }
  // S --> down
  if (keyIsDown(83)) { // S key code is 83
    diver.y += diver.speed;
  }
  // Contrain diver's x and y position
  diver.y = constrain(diver.y, ocean.surface, height); // Prevent's diver from swimming above water
  diver.x = constrain(diver.x, 0, width)
}

// Updates fish and checks for overlap
function updateFishAndCheckCollisions() {
  for (let i = 0; i < allFish.length; i++) {
    allFish[i].updateFish();
  	allFish[i].displayFish();

    if (allFish[i].overlappedDiver()){
      state = `Game Over`;
    }
  }
}

// Updates score when pearl is collected, then repawns a new pearl
function updatePearlAndCheckScore() {
  for (let i = 0; i < pearls.length; i++){
    pearls[i].display();

    if (pearls[i].isFound()){
      score ++
      pearls[i].update();

    }
  }
}

function displayGameOver(){
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Game Over X_X`,width/2, height/2);
  text((score), width/2, height/2 + 100)
  pop();
 }
