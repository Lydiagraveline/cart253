/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, challenge, sandbox
let levelNum = 1; // The game starts at level 1
//let entropy = `high` //can be high or low
let demonDisplay = `top` // can be top, corner, cornerLeft, standing //easter egg

// A timer to count the number of frames in the game state
let gameOverTimer = 0;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The particles
let numParticles = 1;  // game starts with 2 particles at level 1

//let foundIncorrectParticle = false

// level inputs for level 1
let levelWidth = 800;
let levelHeight = 400;
let doorHeight = 200;
let radius = 20;
let speed = 6;

let level;

// Program begins with the door closed
let door = `closed`;

// inputs
let button, numParticlesInp, radiusInp;
//slider
let sliderW, sliderH, sliderD, sliderR, sliderS;
// button that changes the level
let levelButton

// Fonts
let blackLetter;
let blackLetter2;

// images
let demonImg;
let demonTopImg;
let demonCornerImg;
let demonCornerLeftImg;

// preload images and fonts
function preload() {
  demonImg = loadImage('assets/images/demon.png');
  demonTopImg = loadImage('assets/images/demon-top.png');
  demonCornerImg = loadImage('assets/images/demon-corner.png');
  demonCornerLeftImg = loadImage('assets/images/demon-corner-left.png');

  //blackLetter = loadFont(`assets/fonts/UnifrakturMaguntia-Regular.ttf`)
  //blackLetter = loadFont(`assets/fonts/UnifrakturCook-Bold.ttf`)
  blackLetter = loadFont(`assets/fonts/NewRocker-Regular.ttf`)
  blackLetter2 = loadFont(`assets/fonts/GrenzeGotisch-VariableFont_wght.ttf`)
}

// Set up the canvas, particles for level 1, and inputs for sandbox mode
function setup() {
  //textAlign(CENTER, CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  // Main font
  textFont(blackLetter2);

  // creates a new level
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);

  // Create a new level button and hide it
  levelButton = createButton('Next Level');
  levelButton.mousePressed(newLevel);
  levelButton.style('display', 'none')

  // Create an update sandbox button and hide it
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

  // Create a speed slider and hide it
  sliderS = createSlider(1, 15, 6);
  sliderS.style('display', 'none')

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
// draws the level container and particles
function drawLevel(levelWidth, levelHeight, radius){
  background(255);
  // displays the level container
  level.display(levelWidth, levelHeight);
  // draws the level particles
  level.drawParticles(levelWidth, levelHeight, radius);
}

// Handles each level and its idividual display
function challengeMode() {
  checkLevelPass()
  if (levelNum === 1) {
    background(255);
    drawLevel(levelWidth, levelHeight, radius);
    displayText(`one`, `Get the hot particle to the right side.`, `hint: hot particles move faster`);
    }
    else if (levelNum === 2) {
      demonDisplay = `corner`
      drawLevel(levelWidth, levelHeight, radius);
       displayText(`two`, `Now get the cold particle on the left.`);
      }
      else if (levelNum === 3) {
        drawLevel(levelWidth, levelHeight, radius);
        displayText(`three`, `Try to get both particles on the correct side.`);
        }
        else if (levelNum === 4) {
          drawLevel(levelWidth, levelHeight, radius);
          displayText(`four`, `Get all particles on one side`);
          }
          else if (levelNum === 5) {
            drawLevel(levelWidth, levelHeight, radius);
            displayText(`five`, `Get all particles on one side`);
            }
            else if (levelNum === 6) {
              drawLevel(levelWidth, levelHeight, radius);
              displayText(`six`, `Get all particles on one side`);
              }
}

// changes to the next level when button is pressed
function newLevel() {
  if (gameMode === `challenge`){
  //level 2
  if (levelNum === 1) {
      levelNum = 2;
      level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
  // Level 3
  } else if (levelNum === 2){
      doorHeight = 250;
      levelNum = 3;
      level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
  // Level 4
  } else if (levelNum === 3){
    levelNum = 4
    numParticles = 2;
    level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
  // Level 5
  } else if (levelNum === 4){
    levelNum = 5
    levelFive();
  } else if (levelNum === 5){
    levelNum = 6
    levelSix();
  }
  }
}

//level 5 inputs
function levelFive(){
  levelWidth = 800;
  levelHeight = 400;
  numParticles = 1;
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

//level 6 inputs
function levelSix(){
  levelWidth = 800;
  levelHeight = 400;
  numParticles = 1;
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

// displayText() displays the provided message on each level
function displayText(number, insructions, sub) {
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(blackLetter)
  text(`Level ` + (number), width / 2, 50);
  textSize(25);
  textFont(blackLetter2);
  text(insructions, width/2, height - 125);
  textSize(18);
  text((sub), width/2, height - 75)
  pop();
}

// displays new level button if player passes the current level
function checkLevelPass(){
  if (gameMode === `challenge` && level.allParticlesCorrect()){
    demonDisplay = `cornerLeft`;
    levelButton.show();
    button.style("height","50px");
    levelButton.position(width/2 - 75, height/2 - levelHeight/2 - 100);
  } else if (!level.allParticlesCorrect()){
    levelButton.hide();
  }
}

function sandbox() {
  background(255);
  rectMode(CORNERS);
  fill(`whiteSmoke`);
  rect(0, 0, 175, height);

  // show inputs, slider, and button
  sliderW.show();
  sliderH.show();
  sliderD.show();
  sliderR.show();
  sliderS.show();
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

  text(`Particle Speed = `  + (speed), 20, 180);
  sliderS.position(20, 180);

  text(`number of particles`, 20, 220);
  numParticlesInp.position(20, 225);

  button.position(20, 700);

  level.display(levelWidth, levelHeight);
  level.drawParticles(levelWidth, levelHeight, radius);
}

// Updates the sandbox level based on user input
function updateSandbox() {
  levelWidth = sliderW.value();
  levelHeight = sliderH.value();
  doorHeight = sliderD.value();
  radius = sliderR.value();
  speed = sliderS.value();
  numParticles = numParticlesInp.value();
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}


///////////////////////////////// USER INPUT ///////////////////////////////////


// changes the gameMode from title to challenge
// "click to start"
function mousePressed() {
  console.log(`level ` + levelNum)

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

console.log(`demon display: ` + demonDisplay)
  print(mouseX, mouseY)
}

// Handles key inputs
function keyTyped() {

  // opens the door when user pressed the space bar
  if (keyCode === 32) {
    door = `open`;
    fill(0);
    textSize(18);
    text(`hint: hot particles move faster`, 100, 100);
  }

  // updates the sandbox when ENTER is pressed
  if (keyCode === ENTER && gameMode === 'sandbox') {
    updateSandbox()
  }

  // refreshes the current level
  if (keyCode === ENTER && gameMode === 'challenge'){
    level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
  }

}

// closes the door
function keyReleased() {
  door = `closed`;

  if (level.allParticlesCorrect()) {
    console.log("SOLVED!");
 }
}

// handles action keys
function keyPressed() {

  // skips to the next level
  if (keyCode === RIGHT_ARROW && gameMode === 'challenge') {
    newLevel();
    console.log(`level ` + levelNum);
  }

  // returns to the previous level
  if (keyCode === LEFT_ARROW && gameMode === 'challenge' && levelNum > 1) {
    levelNum--
    level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
    console.log(`level ` + levelNum);
  }



}



///////////////////////////////// TITLE SCREEN /////////////////////////////////

// Displays the title screen
function titleScreen() {
  background(`whiteSmoke`);
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
  push();
  textFont(blackLetter);
  text(`Maxwell's Demon`, width / 2, height / 4);
  pop();
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
