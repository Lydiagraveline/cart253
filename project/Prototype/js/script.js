/**
Maxwell's Demon
Lydia Graveline
*/

"use strict";

// The particles
let coldParticles = [];
let hotParticles = [];
let numParticles = 5;

// Program begins with the door closed
let door = `closed`;

let numHotParticlesLeft = 0;
let numHotParticlesRight;

// Set up the canvas and the particles
function setup() {
  createCanvas(800, 400);

// Create cold particles and put them in our array
for (let i = 0; i < numParticles; i++) {
  let x = random(10, width - 10);
  let y = random(10, height - 10);
  let particle = new Cold(x, y);
  coldParticles.push(particle);
}
// Create hot particles and put them in our array
for (let i = 0; i < numParticles; i++) {
  let x = random(10, width - 10);
  let y = random(10, height - 10);
  let particle = new Hot(x, y);
  hotParticles.push(particle);
  }
}

// Display and move the particles
function draw() {
  // Displays the background
  displayChambers();
  fill(0);
  text((numHotParticlesLeft), 100, 100)


  // Move and display cold particles
  for (let i = 0; i < coldParticles.length; i++) {
    let particle = coldParticles[i];
    particle.move();
    particle.display();
  }

  // Move and display hot particles
  for (let i = 0; i < hotParticles.length; i++) {
    let particle = hotParticles[i];
    particle.move();
    particle.display();
    particle.calculatePosition();
  }

  if (door === `closed`) {
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height / 2, 10, height); // Draw thin white rectangle in center
  }
}

// Displays the background as two grey rectangles
function displayChambers() {
  noStroke();
  //left chamber
  background(`gray`);
  // Right chamber
  rectMode(CORNER);
  fill(169); // light grey
  rect(width / 2, 0, width, height); // Draw gray rectangle
}

////////////////////////////////////// User Input //////////////////////////////////////////////

// closes the door if the user presses the space bar
function keyTyped() {
  if (keyCode === 32) {
    door = `open`;
  }
}

function keyReleased() {
  door = `closed`;
}
