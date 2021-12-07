/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, challenge, sandbox
let levelNum = 1; // The game starts at level 1
let entropy = `high` //can be high or low
let demonDisplay = `top` // can be top, corner, standing //easter egg

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

// inputs
let button, numParticlesInp, radiusInp;
//slider
let sliderW, sliderH, sliderD, sliderR;

// images
let demonImg;
let demonTopImg;
let demonCornerImg;
// preload images
function preload() {
  demonImg = loadImage('assets/images/demon.png');
  demonTopImg = loadImage('assets/images/demon-top.png');
  demonCornerImg = loadImage('assets/images/demon-corner.png');
}

// Set up the canvas, particles for level 1, and inputs for sandbox mode
function setup() {
  //textAlign(CENTER, CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  // creates a new level
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);

  // Create a button and hide it
  button = createButton('go');
  button.mousePressed(updateSandbox);
  button.style('display', 'none')

  // Create a width slider and hide it
  sliderW = createSlider(0, width, 800);
  sliderW.style('display', 'none')

  // Create a height slider and hide it
  sliderH = createSlider(0, height, 400);
  sliderH.style('display', 'none')

  // Create a "door height" slider and hide it
  sliderD = createSlider(radius, levelHeight, 200);
  sliderD.style('display', 'none')

  // Create a radius slider and hide it
  sliderR = createSlider(5, 30, 20);
  sliderR.style('display', 'none')

  // Create a number particles input and hide it
  numParticlesInp = createInput();
  numParticlesInp.style('display', 'none')

  // Create a radius input and hide it
  radiusInp = createInput();
  radiusInp.style('display', 'none')
}

// draw() checks the state and runs the appropriate state function
function draw() {
  if (gameMode === `title`) {
    titleScreen();
  }
  else if (gameMode === `challenge`) {
    challengeMode();
  }
  else if (gameMode === `sandbox`) {
    sandbox();
  }

}


///////////////////////////////// GAME /////////////////////////////////////////
function challengeMode() {
  if (levelNum === 1) {
    drawLevel(levelWidth, levelHeight, radius);
    // displayText(`Get all particles on one side`)
    text(entropy, 100, 100);
    }
    else if (levelNum === 2) {
      drawLevel(levelWidth, levelHeight, radius);
      // displayText(`Get all particles on one side`)
      }
      else if (levelNum === 3) {
        drawLevel(levelWidth, levelHeight, radius);
        displayText(`Get all particles on one side`)
        }
}

function drawLevel(levelWidth, levelHeight, radius){
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

function sandbox() {
  background(255);
  rectMode(CORNERS);
  fill(`whiteSmoke`)
  rect(0, 0, 175, height);

  // show inputs, slider, and button
  sliderW.show();
  sliderH.show();
  sliderD.show();
  sliderR.show();
  button.show();
  numParticlesInp.show();

  textSize(16);
  fill(0);

  text(`Width`, 20, 20);
  sliderW.position(20, 20);

  text(`Height`, 20, 60);
  sliderH.position(20, 60);

  text(`Door = ` + (doorHeight), 20, 100);
  sliderD.position(20, 100);

  text(`Particle Size = `  + (radius), 20, 140);
  sliderR.position(20, 140);

  text(`number of particles`, 20, 180);
  numParticlesInp.position(20, 185);

  button.position(20, 700);

  level.display(levelWidth, levelHeight);
  level.drawParticles(levelWidth, levelHeight, radius);
}

function updateSandbox() {
  levelWidth = sliderW.value();
  levelHeight = sliderH.value();
  doorHeight = sliderD.value();
  numParticles = numParticlesInp.value();
  radius = sliderR.value();


  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);

}


///////////////////////////////// USER INPUT ///////////////////////////////////

// changes the gameMode from title to challenge
// "click to start"
function mousePressed() {
  if (gameMode === `title`) {
    if (mouseX > width/2 - 125 && mouseX < width/2 + 125){
      //button 1
      if (mouseY > 305 && mouseY < 405 ){
        gameMode = `challenge`
      }
      if (mouseY > 455 && mouseY < 555){
        gameMode = `sandbox`
      }
    }
  }

  // easter egg: if player clicks on the demon img, it changes to a new position/image
    if (gameMode === `sandbox` || gameMode === `challenge`){
      // changes display from top to corner if clicked on
      if (demonDisplay === `top`){
        if (mouseX < width/2 + 100 && mouseX > width/2 - 100){
        if (mouseY < height/2 - levelHeight/2 && mouseY > 100){
          demonDisplay = `corner`
        }
        }
      }
      else if (demonDisplay === `corner`){
        if(width/2 + levelWidth/2 + 100 && width/2 + levelWidth/2 - 100){
        if(mouseY < height/2 - levelHeight/2 && mouseY > 100){
          demonDisplay = `top`
        }
        }

      }
    }

console.log(demonDisplay)
  print(mouseX, mouseY)

}

function changeImage() {

}

// closes the door if the user presses the space bar
function keyTyped() {
  // opens the door
  if (keyCode === 32) {
    door = `open`;
  }

  if (keyCode === ENTER && gameMode === 'sandbox') {
    updateSandbox()
  }
  // Level 2
  else if (keyCode === ENTER && gameMode === 'challenge' && levelNum === 1) {
    levelNum = 2;
    levelTwo();
    // newLevel(levelWidth, levelHeight, radius);
    // Level 3
  } else if (keyCode === ENTER && gameMode === 'challenge' && levelNum === 2) {
    levelNum = 3;
    levelThree();
    // newLevel(levelWidth, levelHeight, radius);
  }
  //console.log(levelNum);
}

// closes the door
function keyReleased() {
  door = `closed`;

}

///////////////////////////////// TITLE SCREEN /////////////////////////////////

// Displays the title screen
function titleScreen() {
  background(255);
  push();
  // button boxes
  rectMode(CENTER);
  fill(`gray`);
  rect(width / 2, height / 4, 500, 100);
  rect(width / 2, 355, 250, 100);
  rect(width / 2, 505 , 250, 100);

  // text
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(60);
  text(`Maxwell's Demon`, width / 2, height / 4);
  // button 1
  fill(255)
  textSize(40);
  text(`start game`, width / 2, 355);
  // button 2
  text(`sandbox`, width / 2, 505);

  // Images
  imageMode(CENTER);
  image(demonCornerImg, width / 2 - 250, height / 4 - 60);
  // image(demonImg, 700, 440)
  pop();


}
