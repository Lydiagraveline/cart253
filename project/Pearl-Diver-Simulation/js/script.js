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
    speed: 2
};

// Creates a new JavaScript Object describing water
let water = {
  surface: 100
};

// Creates a new JavaScript Object describing a pearl
  let pearl = {
    x: 0,
    y: 0,
    size: 35
  };

let pearl1;

let allFish = []
let numFish = 10


function setup() {
  createCanvas(700, windowHeight);


  // Spawns fish
  for (let i = 0; i < numFish; i++) {
    allFish.push(new fish());
  }

}



function draw() {
  background(135, 206, 235);

  displayDiver();
  diverMovement();
  displayPearl(pearl1);
  displayWave();


  updateFishAndCheckCollisions();
}

function displayPearl() {
  pearl.x = width/2;
  pearl.y = height - pearl.size;

  push();
  noStroke();
  fill(255);
  ellipse(pearl.x, pearl.y, pearl.size);
  pop();
}

// Displays the water
function displayWave() {
  push();
  noStroke();
  fill(0, 128, 128, 127);
  rect(0, water.surface, width, height);
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
  diver.y = constrain(diver.y, water.surface, height); // Prevent's diver from swimming above water
  diver.x = constrain(diver.x, 0, width)
}

function updateFishAndCheckCollisions() {
  for (let i = 0; i < allFish.length; i++) {
    allFish[i].updateFish();
  	allFish[i].displayFish();

    if (allFish[i].overlappedDiver()){
      endLoop();
    }
  }
}
