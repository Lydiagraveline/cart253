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

// Creates a new JavaScript Object describing a timer that indicates the user's "breath"
let timer = {
  x: 400,
  y: 50,
  speedDecrease: 0.2, // Speed of the user loosing breath underwater
  speedIncrease: 1,   // Speed of the user inhaling above water
  max: 400,
}

// Creates a new JavaScript Object describing a fish that will move across the title screen + end screen
let animation = {
  x: -100,
  y: 0,
  vx: 2,
  size: 150,
}

let allFish = [];
let numFish = 10;

let pearls = [];
let numPearls = 3;

let state = `title` //can be Start, Simulation, Game Over

let score;

// Images
let oysterImg;
let fishImg;    // Fish facing left
let fishImg2;   // Fish facing right
let vignette;
  let alpha = 0; // transparency of vignette, which will decrease as the user runs out of air

function preload() {
  oysterImg = loadImage ('assets/images/oyster.png');
  fishImg = loadImage ('assets/images/fish.png');
  fishImg2 = loadImage ('assets/images/fish2.png');
  vignette = loadImage ('assets/images/vignette.png');
}

function setup() {
  createCanvas(700, 700);
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

// Runs the title screen, the simulation, and the end screen
function draw() {
  background(135, 206, 235);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
    }
  else if (state === `Game Over`){
    gameOver();
  }
}

function simulation() {
  displayTimer();
  displayScore();
  displayDiver();
  diverMovement();
  displayOcean();
  updatePearlAndCheckScore();
  updateFishAndCheckCollisions();
}

// When the user clicks on the title screen, the game begins
function mousePressed() {
  if (state === `title`) {
    state = `simulation`
  }
}

// Displays a rectangle that indicates the user's breath, which decreases when underwater
function displayTimer() {
  checkTimerEnd();

  push();
  noStroke();
    // When the user is almost out of breath, the display turns red and a vignette appears
    if (timer.x > width - 100) {
      fill(255,0,0);
      alpha = alpha + 1
      drawVignette();
    } else {
      fill(255);
    }
  rect(timer.x, timer.y, timer.x, 5);
  pop();

// Decreases slowly when user is underwater, and quickly increases when player resurfaces
   if (diver.y > ocean.surface) {
  	timer.x += timer.speedDecrease;
  } else if (diver.y === ocean.surface && timer.x >= timer.max) {
      timer.x -= timer.speedIncrease
  }
}

// Vingnette that appears when user is running out of brath, and during the end screen
function drawVignette() {
  push();
  imageMode(CORNER);
  tint(255, alpha);
  image(vignette, 0, 0, width, height);
  pop();
}

// If the player runs out of breath, the game ends
function checkTimerEnd() {
  if (timer.x >= width) {
    state = `Game Over`;
  }
}

// Displays the player's score in the upper right corner
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
  fill(204,173,142);
  rect(0, height - 30, width, height);
  pop();
}

// Displays the diver as an ellipse
function displayDiver() {
  noStroke();
  fill(s);
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
    // If a fish overlaps the user, the game ends
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

//Animation of a fish moving from left to right, displays on the title screen and end screen
function fishAnimation() {
  animation.y = height/2 + 160

  imageMode(CENTER);
  image(fishImg, animation.x,animation.y,animation.size,animation.size);
  animation.x += animation.vx

  //resets animation when is goes off screen
  if (animation.x === width + animation.size) {
    animation.x = -100
  }

}

//displays the title screen
function title() {
  background (244,233,232);
  fishAnimation();

  push();

  image(oysterImg, width/2, height/2 - 200)

  textAlign(CENTER, CENTER);

  fill(221,188,200);
  textSize(50);
  text(`♥*♡∞:｡. Pearl Diver .｡:∞♡*♥`,width/2, height/2 - 80);
  fill(255);
  text(`♡━━━━◦ ✤ ◦━━━━♡`,width/2, height/2 - 30);

  textSize(23);
  fill(221,203,194)
  text (`Collect pearls. Don't hit fish. Remember to breath.`, width/2, height/2 + 20);

  pop();
}

//displays the end screen
function gameOver(){
  fishAnimation();
  alpha = 100;
  drawVignette()

  push();
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(50);
  text(`x_x`,width/2, height/2 - 150);
  text(`GAME OVER`,width/2, height/2 - 80);

  textSize(40);
  text(`You got `+(score)+` pearls!`, width/2, height/2 + 10);

  // If player runs out of breath, the end screen gets an extra line
  if (timer.x >= width) {
    fill(0, 128, 128, 127)
   textSize(25);
   text(`You forgot to breathe...`,width/2, height/2 - 30);
 }
 pop();
}
