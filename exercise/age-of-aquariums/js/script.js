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



// Create an empty array and assign it to the school variable
let school = [];
let schoolSize = 1; // Amount of fish the program begins with

// Create an empty array and assign it to the food variable
let food = [];
let numFood = 3

function setup() {
  createCanvas(600, 600);

  // Creates fish positioned randomly
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }

  // Creates food positioned randomly along the x axis
  for (let i = 0; i < numFood; i++)
    food[i] = createFood(random (0, width), 0);

}

/////////////////////////////////// OBJECTS ///////////////////////////////////////////////////////////

// createFish(x,y)
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

function createFood(x,y) {
  let food = {
    x: x,
    y: y,
    size: 10,
    vy: random(1, 1.5),   // Downward velocity
    eaten: false // We want to track whether the user has eaten the food
  };
  return food;
}

/////////////////////////////////// DRAW ///////////////////////////////////////////////////////

// Moves and displays our fish + the user + food
function draw() {
  background(95,158,160);
  userInput();

  for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
  }

  for (let i = 0; i < food.length; i++) {
    displayFood(food[i]);
    checkFood(food[i]);
  }

  // Check whether the user has eaten either food
  checkFood(food);
  // Display the user and foods
  displayUser(user);
  displayFood(food);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// moveFish(fish)
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


// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

// Checks if the user overlaps the food object and eats it if so
function checkFood(food) {
  if (!food.eaten) {
    let d = dist(user.x, user.y, food.x, food.y);
    if (d < user.size / 2 + food.size / 2) {
      food.eaten = true;
    }
  }
}

// Displays the user as an ellipse
function displayUser(user) {
  push();
  noStroke();
  ellipse (user.x, user.y, user.size);
  pop();
}

// Draw the food as an ellipse
function displayFood(food) {
  food.y = food.y + food.vy;
  // Check if the food is still available to be eaten
  if (!food.eaten) {
    // Display the food as its position and with its size
    push();
    noStroke();
    fill(255,);
    ellipse(food.x, food.y, food.size);
    pop();
  }
}

//////////////////////////// USER INPUT ///////////////////////////////////////////////////////////

// Adds fish to the array at the user's position
function addNewFish(fish, user) {
    let newFish = createFish(user.x, user.y);
    console.log(`newFish`);
    school.push(newFish);
}

// New fish created when user clicks + overlaps a fish
function mouseReleased() {
  for (let i = 0; i < school.length; i++) {
    let d = dist(user.x, user.y, school[i].x, school[i].y);
    if (d < user.size/2 + school[i].size/2) {
      addNewFish(school[i], user);
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

function displayHunger() {
  push();
  pop();
}
