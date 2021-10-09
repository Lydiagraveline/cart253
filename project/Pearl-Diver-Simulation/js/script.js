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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class fish {

  constructor() {
    this.size = 25; // Size of the fish
    this.speed = 3; // Speed of the fish
    this.resetFish();  // Fish are reset at start of program
    }

  // Spawns the fish at the left or right side of screen & gives direction based on which side they spawn
  resetFish() {
    this.y = random(water.surface + 100, height - 100)

    let spawnLeftSide = random(1) < 0.5;
    if (spawnLeftSide) {
      	this.x = random(-width, 0);
      	this.isGoingLeft = false;
    } else {
      this.x = random(width, width * 2);
      this.isGoingLeft = true;
      }

    }

  // Moves the fish based on the direction & resets fish when they've gone off screen
  updateFish() {
    if (this.isGoingLeft) {
      this.x = this.x - this.speed;
    } else {
      this.x = this.x + this.speed;
    }
    if (this.isOffScreen()) {
      this.resetFish();
    }
  }

  // Checks if fish is off screen
  isOffScreen() {
    if (this.isGoingLeft && this.x < -5) {
      return true;
    } else if(!this.isGoingLeft && this.x > width + 5) {
        	return true;
        }
        return false;
      }

  // Displays the fish on the canvas
  displayFish() {
    push();
    fill(200);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  overlappedDiver() {
    if (dist(this.x, this.y, diver.x, diver.y) < this.size/2 + diver.size/2) {
      return true;
    }
    return false;
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class pearls {

  constructor() {
    this.x =
    this.y =
    this.size = 35
  }

}
