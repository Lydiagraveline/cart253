/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";

let gameMode = `title`; // can be title, challenge, sandbox
let levelNum = 1; // The game starts at level 1
//let entropy = `high` //can be high or low
let demonDisplay = `top`; // can be top, corner, cornerLeft, standing //easter egg

// A timer to count the number of frames in the game state
let gameOverTimer = 0;
// A variable to store how long our game is (in frames)
let gameLength = 60 * 10; // 10 seconds

// The particles
let numParticles = 1; // game starts with 2 particles at level 1

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
let button;
//slider
let sliderW, sliderH, sliderD, sliderR, sliderS, sliderN;
// button that changes the level
let levelButton;

// My color pallette
let black, white, lightGray, tan, pink, red, orange, yellow, blue;

//tan, 10, `white`, white, white

let strokeColor, strokeSize, container, bgColor;

// Fonts
let title;
let blackLetter;

// images
let demonImg;
let demonTopImg;
let demonCornerImg;
let demonCornerLeftImg;

// preload images and fonts
function preload() {
  //images
  demonImg = loadImage("assets/images/demon.png");
  demonTopImg = loadImage("assets/images/demon-top.png");
  demonCornerImg = loadImage("assets/images/demon-corner.png");
  demonCornerLeftImg = loadImage("assets/images/demon-corner-left.png");

  //fonts
  title = loadFont(`assets/fonts/beloidgothic.otf`);
  blackLetter = loadFont(`assets/fonts/Amarante.ttf`);
}

// Set up the canvas, particles for level 1, and inputs for sandbox mode
function setup() {
  //textAlign(CENTER, CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  // Main font
  textFont(blackLetter);

  // My color pallette
  black = color(15, 25, 34);
  white = color(231, 231, 221);
  lightGray = color(240, 240, 238);
  tan = color(140, 121, 86);
  pink = color(217, 156, 196);
  red = color(217, 35, 68);
  orange = color(242, 88, 53);
  yellow = color(255, 212, 100);
  blue = color(18, 134, 211);

  // Initial level color pallete
  strokeColor = tan;
  strokeSize = 2;
  container = `white`;
  bgColor = white;

  // creates a new level
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);

  // Create a new level button and hide it
  levelButton = createButton("Next Level");
  levelButton.mousePressed(newLevel);
  levelButton.style("display", "none");

  // Create an update sandbox button and hide it
  button = createButton("go");
  button.mousePressed(updateSandbox);
  button.style("display", "none");

  // Create a width slider and hide it
  sliderW = createSlider(200, width - 400, 800);
  sliderW.style("display", "none");

  // Create a height slider and hide it
  sliderH = createSlider(200, 600, 400);
  sliderH.style("display", "none");

  // Create a "door height" slider and hide it
  sliderD = createSlider(100, 600, 200);
  sliderD.style("display", "none");

  // Create a radius slider and hide it
  sliderR = createSlider(5, 25, 20);
  sliderR.style("display", "none");

  // Create a speed slider and hide it
  sliderS = createSlider(1, 15, 6);
  sliderS.style("display", "none");

  // Create a number particles slider and hide it
  sliderN = createSlider(0, 20, 1);
  sliderN.style("display", "none");
}

// draw() checks the state and runs the appropriate state function
function draw() {
  if (gameMode === `title`) {
    titleScreen();
  } else if (gameMode === `challenge`) {
    challengeMode();
  } else if (gameMode === `random`) {
    randomLevel();
  } else if (gameMode === `sandbox`) {
    sandbox();
  }
}

///////////////////////////////// GAME /////////////////////////////////////////
// draws the level container and particles
function drawLevel() {
  background(255);
  // displays the level container
  level.display(strokeColor, strokeSize, container, bgColor);
  // draws the level particles
  level.drawParticles(levelWidth, levelHeight, radius);
}

// Handles each level and its idividual display
function challengeMode() {
  checkLevelPass();
  if (levelNum === 1) {
    drawLevel();
    displayText(
      `One`,
      `Get the hot particle on the right side. Press the SPACE BAR to open the door.`,
      `hint: hot particles move faster`
    );
  } else if (levelNum === 2) {
    drawLevel();
    displayText(`Two`, `Now get the cold particle on the left side.`);
  } else if (levelNum === 3) {
    drawLevel();
    displayText(`Three`, `Try to get both particles on the correct side.`);
  } else if (levelNum === 4) {
    drawLevel();
    displayText(
      `Four`,
      `Organize all particles into the correct side`,
      `Tip: Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 5) {
    drawLevel();
    displayText(
      `Five`,
      `Organize the particles, this time with more randomness!`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 6) {
    drawLevel();
    displayText(
      `Six`,
      `Not bad eh!`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 7) {
    drawLevel();
    displayText(
      `Seven`,
      `Practice makes perfect.`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 8) {
    drawLevel();
    displayText(
      `Eight`,
      `Now we're talking.`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 9) {
    drawLevel();
    displayText(
      `Nine`,
      `You got this!`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  } else if (levelNum === 10) {
    drawLevel();
    displayText(
      `Ten`,
      `Take your time.`,
      `Hot particles on the right, cold particles on the left. Press the ENTER key to reset the level.`
    );
  }
}

// changes to the next level when button is pressed
function newLevel() {
  if (gameMode === `challenge`) {
    //level 2
    if (levelNum === 1) {
      doorHeight = 250;
      speed = 7;
      levelNum = 2;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 3
    } else if (levelNum === 2) {
      speed = 7;
      levelNum = 3;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 4
    } else if (levelNum === 3) {
      demonDisplay = `corner`;
      doorHeight = 300;
      speed = 8;
      numParticles = 2;
      levelNum = 4;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 5
    } else if (levelNum === 4) {
      demonDisplay = `top`;
      levelNum = 5;
      numParticles = 3;
      radius = 15;
      speed = 6;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 6
    } else if (levelNum === 5) {
      levelHeight = 250;
      doorHeight = 250;
      numParticles = 4;
      radius = 14;
      speed = 7;
      levelNum = 6;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 7
    } else if (levelNum === 6) {
      levelNum = 7;
      levelWidth = 700;
      levelHeight = 400;
      numParticles = 4;
      radius = 13;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 8
    } else if (levelNum === 7) {
      levelNum = 8;
      levelWidth = 900;
      levelHeight = 300;
      doorHeight = 200;
      radius = 12;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 9
    } else if (levelNum === 8) {
      levelNum = 9;
      levelHeight = 325;
      doorHeight = 150;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // Level 10
    } else if (levelNum === 9) {
      demonDisplay = `corner`;
      levelNum = 10;
      levelWidth = 1000;
      levelHeight = 500;
      doorHeight = 350;
      numParticles = 6;
      radius = 10;
      level = new Level(
        levelWidth,
        levelHeight,
        numParticles,
        doorHeight,
        radius
      );
      // random
    } else if (levelNum === 10) {
      gameMode = `random`;
      updateRandomLevel();
    }
  }
}

// displayText() displays the provided message on each level
function displayText(number, insructions, sub) {
  push();
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont(blackLetter);
  text(`Level ` + number, width / 2, height / 2 - levelHeight / 2 - 125);
  textSize(25);
  textFont(blackLetter);
  text(insructions, width / 2, height - 125);
  textSize(18);
  text(sub, width / 2, height - 75);
  pop();
}

// displays new level button if player passes the current level
function checkLevelPass() {
  if (gameMode === `challenge` && level.allParticlesCorrect()) {
    demonDisplay = `cornerLeft`;
    levelButton.show();
    button.style("height", "50px");
    levelButton.position(width / 2 - 75, height / 2 - levelHeight / 2 - 125);
  } else {
    levelButton.hide();
  }
}

// displays the randomly generated level + text
function randomLevel() {
  levelButton.hide();
  drawLevel();
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  text(`RANDOM!!!`, width / 2, 40);
  textSize(25);
  text(`Press ENTER to generate a new random level.`, width / 2, height - 90);
  textSize(18);
  text(
    `Hot particles on the right, cold particles on the left... not that it natters anymore, this is the last level.`,
    width / 2,
    height - 50
  );
  if (level.allParticlesCorrect()) {
    textSize(32);
    text("SOLVED!", width / 2, 85);
  }
  pop();
}

// generates a level with random inputs
function updateRandomLevel() {
  levelWidth = random(400, width - 50);
  levelHeight = random(200, 600);
  doorHeight = random(200, levelHeight);
  radius = random(8, 20);
  speed = random(5, 8);
  numParticles = random(1, 10);
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

// Runs the sandbox mode simulation
function sandbox() {
  //background(255);

  drawLevel();
  rectMode(CORNERS);
  fill(`whiteSmoke`);
  rect(0, 0, 175, height);

  // show inputs, slider, and button
  sliderW.show();
  sliderH.show();
  sliderD.show();
  sliderR.show();
  sliderS.show();
  sliderN.show();
  button.show();
  //numParticlesInp.show();

  textSize(16);
  fill(0);

  text(`Width = ` + levelWidth, 20, 20);
  sliderW.position(20, 20);

  text(`Height = ` + levelHeight, 20, 60);
  sliderH.position(20, 60);

  text(`Door = ` + doorHeight, 20, 100);
  sliderD.position(20, 100);

  text(`Particle Size = ` + radius, 20, 140);
  sliderR.position(20, 140);

  text(`Particle Speed = ` + speed, 20, 180);
  sliderS.position(20, 180);

  text(`Particles = ` + numParticles, 20, 220);
  sliderN.position(20, 220);

  button.position(20, 700);

  if (level.allParticlesCorrect()) {
    push();
    textAlign(CENTER);
    textSize(32);
    text("SOLVED!", width / 2, height - 50);
    pop();
  }
}

// Updates the sandbox level based on user input
function updateSandbox() {
  levelWidth = sliderW.value();
  levelHeight = sliderH.value();
  doorHeight = sliderD.value();
  radius = sliderR.value();
  speed = sliderS.value();
  numParticles = sliderN.value();
  level = new Level(levelWidth, levelHeight, numParticles, doorHeight, radius);
}

///////////////////////////////// USER INPUT ///////////////////////////////////

// changes the gameMode from title to challenge
// "click to start"
function mousePressed() {
  console.log(`level ` + levelNum);

  if (gameMode === `title`) {
    if (mouseX > width / 2 - 125 && mouseX < width / 2 + 125) {
      //button 1
      if (mouseY > 305 && mouseY < 405) {
        gameMode = `challenge`;
      }
      if (mouseY > 455 && mouseY < 555) {
        gameMode = `sandbox`;
      }
    }
  }

  // easter egg: if player clicks on the demon img, it changes to a new position/image
  if (gameMode === `sandbox` || gameMode === `challenge`) {
    // changes display from top to corner if clicked on
    if (demonDisplay === `top`) {
      if (mouseX < width / 2 + 100 && mouseX > width / 2 - 100) {
        if (mouseY < height / 2 - levelHeight / 2 && mouseY > 100) {
          demonDisplay = `corner`;
        }
      }
    } else if (demonDisplay === `corner`) {
      if (
        width / 2 + levelWidth / 2 + 100 &&
        width / 2 + levelWidth / 2 - 100
      ) {
        if (mouseY < height / 2 - levelHeight / 2 && mouseY > 100) {
          demonDisplay = `top`;
        }
      }
    }
  }

  console.log(`demon display: ` + demonDisplay);
  print(mouseX, mouseY);
}

// Handles key inputs
function keyTyped() {
  // opens the door when user pressed the space bar
  if (keyCode === 32) {
    door = `open`;
    fill(0);
    textSize(18);
  }

  // updates the sandbox when ENTER is pressed
  if (keyCode === ENTER && gameMode === "sandbox") {
    updateSandbox();
  }

  // generates new random level when player presses ENTER
  else if (keyCode === ENTER && gameMode === "random") {
    updateRandomLevel();
  }

  // refreshes the current level
  else if (keyCode === ENTER && gameMode === "challenge") {
    level = new Level(
      levelWidth,
      levelHeight,
      numParticles,
      doorHeight,
      radius
    );
  }
}

// closes the door
function keyReleased() {
  door = `closed`;
}

// handles action keys
function keyPressed() {
  // skips to the next level
  if (keyCode === RIGHT_ARROW && gameMode === "challenge") {
    newLevel();
    console.log(`level ` + levelNum);
  }

  // returns to the previous level
  if (keyCode === LEFT_ARROW && gameMode === "challenge" && levelNum > 1) {
    levelNum--;
    level = new Level(
      levelWidth,
      levelHeight,
      numParticles,
      doorHeight,
      radius
    );
    console.log(`level ` + levelNum);
  }
}

///////////////////////////////// TITLE SCREEN /////////////////////////////////

// Displays the title screen
function titleScreen() {
  background(white);
  push();

  // button boxes
  rectMode(CENTER);

  // rect(width / 2, height / 2, 700, 750);
  //fill(blue);
  stroke(tan);
  strokeWeight(5);
  fill(white);
  rect(width / 2, height / 4, 800, 150);

  noStroke();
  fill(black);
  rect(width / 2, 355, 250, 100);
  rect(width / 2, 505, 250, 100);

  // text
  textAlign(CENTER, CENTER);
  fill(tan);
  textSize(150);
  push();
  textFont(title);
  text(`Maxwells Demon`, width / 2 + 75, height / 4 - 30);
  pop();
  // button 1
  fill(255);
  textSize(40);
  text(`start game`, width / 2, 355);
  // button 2
  text(`sandbox`, width / 2, 505);

  // Images
  imageMode(CENTER);
  image(demonCornerImg, width / 2 - 400, height / 4 - 87);
  // image(demonImg, 700, 440)
  pop();
}
