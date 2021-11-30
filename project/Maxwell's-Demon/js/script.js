/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, game, end
let level = `1`; // The game starts at level 1


// A timer to count the number of frames in the game state
let gameOverTimer = 0;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The particles
let coldParticles = [];
let hotParticles = [];
let numParticles = 2;

// Program begins with the door closed
let door = `closed`;

// Set up the canvas and the particles
function setup() {
  createCanvas(windowWidth, windowHeight);

  let level = new Level(100, 100); // How can I call this somewhere besides setup() ?
  level.addParticles();

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
  checkTimer();
  gameOver();

  if (level === `1`) {
    levelOne();
    }
}

function levelOne() {
  background(255);
  text(`level one`, 100, 100);
  text((level)+ ` level`, 100, 150);
  text((numParticles)+` num particles`, 100, 200);

  let levelOne = new Level(800, 400);

  let container = new Container(800, 400);

  container.display(); //width/2, height/2, containerWidth, containerHeight
  levelOne.drawParticles(); //(x1, y1, x2, y2,)

}

function levelTwo(){
  let levelOne = new Level(800, 200);
  let container = new Container(800, 200);
  container.display(); //width/2, height/2, containerWidth, containerHeight
  levelOne.drawParticles(); //(x1, y1, x2, y2,)
}


function gameOver() {
}

// win() shows YOU WIN
function win() {
  displayText(`YOU WIN!`);
}

// lose() shows YOU LOSE
function lose() {
  displayText(`YOU LOSE!`);
}

// displayText() displays the provided message in the center of the canvas
function displayText(message) {
  push();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
  pop();
}

function checkTimer(){
  // NEW! Increase the timer's count by one frame
  gameOverTimer++;
  // NEW! Check if we have reached the end of our timer
  if (gameOverTimer >= gameLength) {
  // The game is over! So we should check the win/lose state
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

// closes the door if the user presses the space bar
function keyTyped() {
  if (keyCode === 32) {
    door = `open`;
  }
}

function keyReleased() {
  door = `closed`;
}
