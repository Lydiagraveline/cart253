/**
Age of Aquariums
Lydia Graveline

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//New javascript object describing the user-controlled shape
let user = {
  x: undefined,
  y: undefined,
  size: 50,
}

// Create an empty array and assign it to the school variable
let school = [];
let schoolSize = 1; // Amount of fish the program begins with


function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly, storing each one in four successive
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}

// draw()
// Moves and displays our fish + the user
function draw() {
  background(95,158,160);
  userInput();
  for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
  }

  displayUser(user);

}

function addNewFish(fish, user) {
    let newFish = createFish(user.x, user.y);
    console.log(`newFish`);
    school.push(newFish);
}

function mouseReleased() {
  for (let i = 0; i < school.length; i++) {
    let d = dist(user.x, user.y, school[i].x, school[i].y);
    if (d < user.size/2 + school[i].size/2) {
      addNewFish(school[i], user);
      break;
    }
  }

}

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

function userInput() {
  user.x = mouseX;
  user.y = mouseY;
}

// Displays the user as an ellipse
function displayUser(user) {
  push();
  noStroke();
  ellipse (user.x, user.y, user.size);
  pop();
}
