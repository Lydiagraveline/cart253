/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, challenge, end
let levelNum = 1; // The game starts at level 1

// A timer to count the number of frames in the game state
let gameOverTimer = 0;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The particles
let numParticles = 2;  // game starts with 2 particles at level 1

// container size for level 1
let levelWidth = 800;
let levelHeight = 400;
let doorHeight = 200;
let radius = 20;

let level;

// Program begins with the door closed
let door = `closed`;

// Set up the canvas and the particles for level 1
function setup() {
  createCanvas(windowWidth, windowHeight);
  // creates a new level
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

// draw() checks the state and runs the appropriate state function
function draw() {
  if (gameMode === `title`) {
    titleScreen();
  }
  else if (gameMode === `challenge`) {
    challengeMode();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}


///////////////////////////////// GAME /////////////////////////////////////////
function challengeMode() {
  if (levelNum === 1) {
    newLevel(levelWidth, levelHeight, radius);
    displayText(`Get all particles on one side`)
    }
    else if (levelNum === 2) {
      newLevel(levelWidth, levelHeight, radius);
      displayText(`Get all particles on one side`)
      }
      else if (levelNum === 3) {
        newLevel(levelWidth, levelHeight, radius);
        displayText(`Get all particles on one side`)
        }
}

function newLevel(levelWidth, levelHeight, radius){
  background(255);
  // displays the level container
  level.display(levelWidth, levelHeight);
  // draws the level particles
  level.drawParticles(levelWidth, levelHeight, radius);
}

function levelOne() {
  background(255);
  text(`level one`, 100, 100);
  text((levelNum)+ ` level`, 100, 150);
  text((numParticles)+` num particles`, 100, 200);
}

function levelTwo(){
  levelWidth = 500;
  levelHeight = 500;
  numParticles = 5;
  doorHeight = 100;
  radius = 10;
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

function levelThree(){
  levelWidth = 600;
  levelHeight = 400;
  numParticles = 3;
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

// displayText() displays the provided message in the center of the canvas
function displayText(insructions) {
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Level ` + (levelNum), width / 2, height / 10);
  textSize(16);
  text(insructions, width/2, height - 100)
  pop();
}


///////////////////////////////// USER INPUT ///////////////////////////////////

// changes the gameMode from title to challenge
// "click to start"
function mousePressed() {
  if (gameMode === `title`) {
    gameMode = `challenge`;
    console.log(gameMode);
  }

}

// closes the door if the user presses the space bar
function keyTyped() {
  // opens the door
  if (keyCode === 32) {
    door = `open`;
  }
  // Level 2
  if (keyCode === ENTER && gameMode === 'challenge' && levelNum === 1) {
    levelNum = 2;
    levelTwo();
    newLevel(levelWidth, levelHeight, radius);
    // Level 3
  } else if (keyCode === ENTER && gameMode === 'challenge' && levelNum === 2) {
    levelNum = 3;
    levelThree();
    newLevel(levelWidth, levelHeight, radius);
  }
  console.log(levelNum);
}

// closes the door
function keyReleased() {
  door = `closed`;
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
