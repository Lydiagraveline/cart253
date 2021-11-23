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

  let level = new Level(800, 200)

  level.addParticles()

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

  let levelOne = new Level(800, 200);

  let container = new Container(800, 200);

  container.display(); //width/2, height/2, containerWidth, containerHeight

  levelOne.drawParticles(); //(x1, y1, x2, y2,)

}

///////////////////////////////// USER INPUT ///////////////////////////////////

function mousePressed() {
  // "click to start" changes the gameMode from
  if (gameMode === `title`) {
    gameMode = `challenge`;
    console.log(gameMode);
  }
}
