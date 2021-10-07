/**
Pearl Diver
Lydia Graveline

Pearl diving simulator!
*/

"use strict";

let diver = { //user controlled
    x: 350,
    y: 100,
    size: 50,
    speed: 5
};

let water = {
  surface: 100
}

function setup() {
  createCanvas(700, 600);
}

function draw() {
  background(135, 206, 235);

  displayDiver();
  diverMovement();
  displayWave();
}

// Displays the water
function displayWave() {
  noStroke();
  fill(0, 128, 128, 127);
  rect(0, water.surface, 700, 600);
}

// Displays the diver as an ellipse
function displayDiver() {
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
  diver.y = constrain(diver.y, water.surface, 600); // Prevent's diver from swimming above water
  diver.x = constrain(diver.x, 0, width)
}
