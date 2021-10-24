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
  size: 45,
  speed: 2,
  eaten: false,
}

// Creates a new JavaScript Object describing the player's life
let life = {
  x: 400,
  y: 50,
  speedDecrease: 0.05,
  max: 400,
}

// Creates a new JavaScript Object describing the a shark
let shark = {
  x: 0,
  y: 300,
  size: 75,
  vy: 0,
  vx: 0,
  speed: 1,
  constrain: 250,
}

let state = `life` //can be life or death
let cause; //can be `old age` or `shark attack`

// Create an empty array and assign it to the school variable
let school = [];
let schoolSize = 4; // Amount of fish the program begins with

// Create an empty array and assign it to the babies variable
let babies = [];
let numBabies = 0; // Amount of babies the player begins with
let babiesEaten = 0; // Amount of babies eaten by the shark begins at 0

function setup() {
  createCanvas(600, 600);
  noStroke();


  // shark starts off screen
  shark.x = -shark.constrain

  // Creates fish positioned randomly
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }

  // Creates babies at the user's position
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
    size: 50,
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
    speed: random(1, 1.5),
    eaten: false,
    growUp: false,
    age: random(0.01, 0.02),   // Rate the babies grow
  };
  return baby;
}

///////////////////////////////////////////// DRAW ///////////////////////////////////////////////////////

// Displays the simulation or the end screen
function draw() {
  background(95,158,160);

  if (state === `life`) {
    simulation();
  }
  if (state === `death`) {
    endScreen();
  }
}

/////////////////////////////////////////// SIMULATION /////////////////////////////////////////////////////////////

// Moves and displays our fish + the user + babies + the shark
function simulation() {

  userInput();

  //move and display the fish
  for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
  }

  // move and displays the babies + checks if they get eaten
  for (let i = 0; i < babies.length; i++) {
      moveBaby(babies[i]);
      displayBaby(babies[i]);
      checkForEatenBabies(babies[i]);
      checkAge(babies[i]);
  }

  // Display the user and their life span
  displayUser(user);
  displayLife();

  displayShark();
  moveShark();
  checkLifeEnd()

  // How to play + score
  text (`You are a fish! your goal is to have as many babies as you can before you die.`, 10, 20);
  text(`Watch out! a shark is out to eat you and your babies!`, 10, 40);
  text (`you have ` + (numBabies) + ` babies. The shark ate `+ (babiesEaten) , 10, 60);
}

//Check the age (size) of the babies + turns them into adults
function checkAge(baby) {
  for (let i = 0; i < schoolSize; i++) {
    if (baby.size > 50 && !baby.growUp) {
    baby.growUp = true;
    babyGrowUp(school[i], baby);
    }
  }
}

// Adds fish to array when a bay grows up
function babyGrowUp(fish, baby) {
  let newFish = createFish(baby.x, baby.y);
  school.push(newFish);
}

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
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

// Babies follow the user
function moveBaby(baby) {
  let parentX = user.x;
  let parentY = user.y;

  // changes direction based on position of the user
    if (parentX < baby.x) {
      baby.vx = -baby.speed;
    } else {
      baby.vx = baby.speed;
    }

    if (parentY < baby.y) {
      baby.vy = -baby.speed;
    } else {
      baby.vy = baby.speed;
    }

    // Move the babies
    baby.x = baby.x + baby.vx;
    baby.y = baby.y + baby.vy;
}

// Displays the provided babies on the canvas
function displayBaby(baby) {
  if (!baby.eaten && !baby.growUp) {
    push();
    baby.size = baby.size + baby.age;   //babies slowly grow older
    fill(255);
    ellipse (baby.x, baby.y, baby.size)
    pop();
  }
}

// Displays the user as an ellipse
function displayUser(user) {
  push();
  ellipse (user.x, user.y, user.size);
  pop();
}

// Displays a rectangle that indicates the player's life span, which decreases slowly
function displayLife() {
  checkLifeEnd();

  life.x = life.x + life.speedDecrease;

  push();
  text('life ', 500, 40);

    // When the user is almost out of food, the display turns red and a vignette appears
    if (life.x > width - 100) {
      fill(255,0,0);
      //alpha = alpha + 1
      //drawVignette();
    } else {
      fill(255);
    }
  rect(life.x, life.y, life.x, 5);
  pop();
}

// Display the shark
function displayShark() {
  push();
  textAlign(CENTER);
  fill(`grey`);
  ellipse(shark.x, shark.y, shark.size);
  pop();
  text((`shark!`), shark.x, shark.y);
}

  // Move the shark
  function moveShark() {

  //shark follows the user's y position
  if (user.y < shark.y) {
    shark.vy = -shark.speed;
  } else {
    shark.vy = shark.speed;
  }

  // Shark returns after going off screen
  if (shark.x >= width + shark.constrain) {
    shark.vx = -shark.speed;
  } else if (shark.x <= -shark.constrain){
    shark.vx = shark.speed;
  }

  //move the shark
    shark.x = shark.x + shark.vx;
    shark.y = shark.y + shark.vy;
}

function checkForEatenBabies(baby) {
  // db = distance between shark and babies
  let db = dist(shark.x, shark.y, baby.x, baby.y);


  // Babies get eaten by the shark when overlap
  if (!baby.eaten && !baby.growUp && db < shark.size/2 + baby.size/2 ) {
    baby.eaten = true
    babiesEaten++
    numBabies--
  }

}

function checkLifeEnd() {
  // du = distance between shark and the player
  let du = dist(shark.x, shark.y, user.x, user.y);
  // the user's life ends if the shark overlaps
  if (du < shark.size/2 + user.size/2) {
      state = `death`;
      cause = `shark attack`;
  }

  // The user's life end when the life bar runs out
  if (life.x >= width) {
    state = `death`;
    cause = `old age`;
  }
}


//////////////////////////// USER INPUT ///////////////////////////////////////////////////////////

// Adds fish to the array at the user's position
function addNewBaby(baby, user) {
    let newBaby = createBaby(user.x, user.y);
    console.log(`newBaby`);
    babies.push(newBaby);
    numBabies++
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

///////////////////////////// END SCREEN //////////////////////////////////////////////////////////////////////////////
 function endScreen() {
   textAlign(CENTER);
   if (cause === `old age`){
     text(`you died of old age`, width/2, height/2);
   }
   else if (cause === `shark attack`){
     text(`the shark ate you!`, width/2, height/2);
   }
 }
