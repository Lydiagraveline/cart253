/**
Age of Aquariums
Lydia Graveline

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//New javascript object describing the user-controlled shape
let user = {
  x: 100,
  y: 100,
  size: 50,
  speed: 2,
}

// Creates a new JavaScript Object describing the player's life
let life = {
  x: 400,
  y: 50,
  speedDecrease: 0.05,
  max: 400,
}



// Create an empty array and assign it to the school variable
let school = [];
let schoolSize = 1; // Amount of fish the program begins with

let babies = [];
let numBabies = 0;

function setup() {
  createCanvas(600, 600);

  // Creates fish positioned randomly
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }

    for (let i = 0; i < numBabies; i++) {
      babies[i] = createBaby(user.x, user.y);
    }

}

/////////////////////////////////// OBJECTS ///////////////////////////////////////////////////////////

// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: random(25,50),
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}

function createBaby(x, y) {
  let baby = {
    x: x,
    y: y,
    size: random(10,15),
    vx: 0,
    vy: 0,
    speed: random(0.5, 1),
  };
  return baby;
}


/////////////////////////////////// DRAW ///////////////////////////////////////////////////////

// Moves and displays our fish + the user
function draw() {
  background(95,158,160);

  userInput();

  for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
  }

  for (let i = 0; i < babies.length; i++) {
      moveBaby(babies[i]);
      displayBaby(babies[i]);
  }

  // Display the user and their life span
  displayUser(user);
  displayLife();

}

///////////////////////////////////////////////////////////////////////////////////////////////////

// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

// Babies follow the user
function moveBaby(baby) {
  // changes direction based on position of the user
    if (user.x < baby.x) {
      baby.vx = -baby.speed;
    } else {
      baby.vx = baby.speed;
    }

    if (user.y < baby.y) {
      baby.vy = -baby.speed;
    } else {
      baby.vy = baby.speed;
    }

    // Move the babies
    baby.x = baby.x + baby.vx;
    baby.y = baby.y + baby.vy;
    }
}

// Displays the provided babies on the canvas
function displayBaby(baby) {
  push();
  fill(255);
  noStroke();
  ellipse (baby.x, baby.y, baby.size)
  pop();
}

// Displays the user as an ellipse
function displayUser(user) {
  push();
  noStroke();
  ellipse (user.x, user.y, user.size);
  pop();
}

// Displays a rectangle that indicates the player's life span, which decreases slowly
function displayLife() {
  //checklifeEnd();

  life.x = life.x + life.speedDecrease;

  push();
  text('life: ', 400, 100)
  noStroke();
    // When the user is almost out of food, the display turns red and a vignette appears
    //if (life.x > width - 100) {
    //  fill(255,0,0);
      //alpha = alpha + 1
      //drawVignette();
    //} else {
      fill(255);
    //}
  rect(life.x, life.y, life.x, 5);
  pop();




}

//////////////////////////// USER INPUT ///////////////////////////////////////////////////////////

// Adds fish to the array at the user's position
function addNewBaby(baby, user) {
    let newBaby = createBaby(user.x, user.y);
    console.log(`newBaby`);
    babies.push(newBaby);
}

// New fish created when user clicks + overlaps a fish
function mouseReleased() {
  for (let i = 0; i < school.length; i++) {
    let d = dist(user.x, user.y, school[i].x, school[i].y);
    if (d < user.size/2 + school[i].size/2) {
      addNewBaby(babies[i], user);
      break;
    }
  }
}

function userInput() {
  // A --> left
  if (keyIsDown(65)) {         // A key code is 65
    user.x -= user.speed;
  }
  // D --> right
  if (keyIsDown(68)) {        // D key code is
    user.x += user.speed;
  }
  // W --> up
  if (keyIsDown(87)) {        // W key code is 87
    user.y -= user.speed;
  }
  // S --> down
  if (keyIsDown(83)) {         // S key code is 83
    user.y += user.speed;
  }
  // Contrain user's x and y position
  user.y = constrain(user.y, 0, height);
  user.x = constrain(user.x, 0, width);
}

///////////////////////////// TEXT ////////////////////////////////////////////////////////////
