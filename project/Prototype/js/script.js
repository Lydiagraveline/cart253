/**
Maxwell's Demon
Lydia Graveline
*/

"use strict";

// The particles
let particles = [];
let numParticles = 10;

// Program begins with the door closed
let door = `closed`;

// Set up the canvas and the particles
function setup() {
  createCanvas(700, 500);

  // Create the correct number of particles and put them in our array
    for (let i = 0; i < numParticles; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let particle = new Particle(x, y);
      particles.push(particle);
    }
}

// Display and move the particles
function draw() {
  displayChambers();

  // Go through all the particles and move, and display them
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      particle.move();
      particle.display();
    }





  if (door === `closed`) {
    rectMode(CENTER);
    fill (255);
    rect(width/2, height/2, 10, height); // Draw thin white rectangle in center
  }
}

// Displays the background as two chambers
function displayChambers() {
  noStroke();
  //left chamber
  background(`gray`);
  // Right chamber
  rectMode(CORNER);
  fill(169);
  rect(width/2, 0, height); // Draw gray rectangle
}
