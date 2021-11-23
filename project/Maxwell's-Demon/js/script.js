/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, game, end
let level = `1`; // The game starts at level 1

// The particles
let coldParticles = [];
let hotParticles = [];
let numParticles = 5;

// Program begins with the door closed
let door = `open`;

// Set up the canvas and the particles
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create cold particles and put them in our array
for (let i = 0; i < numParticles; i++) {
  let x = width/2;
  let y = height/2;
  let particle = new Cold(x, y);
  coldParticles.push(particle);
}
// Create hot particles and put them in our array
for (let i = 0; i < numParticles; i++) {
  let x = width/2;
  let y = height/2;
  let particle = new Hot(x, y);
  hotParticles.push(particle);
  }

}

function draw() {
  if (gameMode === `title`) {
    titleScreen();
  }
  if (gameMode === `challenge`) {
    challengeMode();
  }
}

///////////////////////////////// TITLE SCREEN /////////////////////////////////

// Displays the title screen
function titleScreen() {
  background(0);
  push();
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text(`Maxwell's Demon`, width / 2, height / 2 - 100);
  textSize(40);
  text(`click to play`, width / 2, height / 2);
  pop();
}

///////////////////////////////// GAME /////////////////////////////////////////
function challengeMode() {
  if (level === `1`) {
    levelOne();
  }
}

function levelOne() {
  background(255);
  text(`level one`, 100, 100);
  let containerWidth = 800
  let containerHeight = 200
  let x1 = width/2 - containerWidth/2
  let y1 = height/2 - containerHeight/2
  let x2 = width/2 + containerWidth/2
  let y2 = height/2 + containerHeight/2

  let container = new Container

  container.display(width/2, height/2, containerWidth, containerHeight);
  //displayContainer(width/2, height/2, containerWidth, containerHeight);
  drawParticles(x1, y1, x2, y2,)

}

// function displayContainer(x, y, width, height) {
//   push()
//   noStroke();
//   rectMode(CENTER);
//   fill(`gray`);
//   rect(x, y, width, height)
//
//   // center line
//   stroke(5);
//   line(x, y - height/2, x, y + height/2);
//   pop();
// }

// Display and move the particles
function drawParticles(x, y, width, height) {
  for (let i = 0; i < coldParticles.length; i++) {
   let particle = coldParticles[i];
   particle.move(x, y, width, height);
   particle.display();
 }

 // Move and display hot particles
 for (let i = 0; i < hotParticles.length; i++) {
   let particle = hotParticles[i];
   particle.move(x, y, width, height);
   particle.display();
 }

 if (door === `closed`) {
   rectMode(CENTER);
   fill(255);
   rect(width / 2, height / 2, 10, height); // Draw thin white rectangle in center
 }
}

///////////////////////////////// USER INPUT ///////////////////////////////////

function mousePressed() {
  // "click to start" changes the gameMode from
  if (gameMode === `title`) {
    gameMode = `challenge`;
    console.log(gameMode);
  }
}
