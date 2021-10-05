/**
Love, actually
Lydia Graveline

Love simulation game where the player selects a positon on the screen in hopes of finding love.
The player's icon will pursuit a heart bouncing around the screen. If the player overlaps the heart
the game will end with love! However, if the two do not overlap before the heart bounces too many times,
the game will end in deep sadness. 
*/

"use strict";

let max = 4; // Maximun number of times the heart can bounce before the game ends
let count = 0; // starts the # of bounces at zero

// Ellipse controlled by player
let user = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,         // Velocity X
  vy: 0,         // Velocity Y
  speed: 2,
};

// Ellipse not controlled by player
let heart = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 4,         // Velocity X
  vy: 5,         // Velocity y
  speed: 4,
};

let state = `title`; //can be title, simulation, love, sadness

// Image for heart
let heartImg;
function preload() {
  heartImg = loadImage ('assets/images/heart.png');
}

// creates canvas and heart position
function setup() {
createCanvas(windowWidth, windowHeight);

// Heart starts at random position
heart.x = random(0,width)
heart.y = random(0,height)
}

// Draws everything during various states
function draw() {

  // Same for all states ↓
  background(255,192,203) // Sets background to pink
  countText(); //counts the # of times the heart bounces,

  // Possible states
  //Title screen
  if (state === `title`) {
    title();
  }
  // The game
  else if (state === `simulation`) {
    simulation();
  }
  // Love ending if player wins
  else if (state === `love`) {
    loveEnding();
  }
  // Sad ending if player loses
  else if (state === `sadness`)
    sadEnding();
}

// Title screen + instructions
function title() {
  titleText(); //title screen
  displayUser(); //display the user following the mouse
}

function simulation() {
  heartBounce(); // Checks if user can't find love :(
  checkOverlap(); // Checks if user has found love <3
  displayHeart();
  displayUser();
}

// Displays when the player finds love <3
function loveEnding() {
  loveText();

  // Alternative endings
  if (count <= 1 ) {
    luckyText();
  }
  else if (count === max - 1) {
    closeCallText();
  }
}

// Displays if the player gets no love </3 :(
function sadEnding() {
  sadText();
  heartBounce();
}

// Checks # of times the heart has bounced
function heartBounce() {
  if (count === max) {  // if the heart bounces > the maximum, the game ends
    state = `sadness`;
  }
}

// Checks if user and the heart overlap
function checkOverlap() {
  let d = dist(heart.x, heart.y, user.x, user.y);
  if (d < heart.size/2 + user.size/2) {
    state = `love`;
  }
}

function displayUser() {
  noStroke();
  fill(255);
  ellipse(user.x, user.y, user.size);

  //during the title screen, the user's ellipse will follow the mouse
  if (state === `title`) {
    user.x = mouseX
    user.y = mouseY
  }

  // While the simulation is running, the user's ellipse will automatically pursuit the heart
  // Code from "pursuit" example under the "automated movement" module
  else if (state === `simulation`) {
    let dx = user.x - heart.x // Distance between the user and the heart horizontally
    let dy = user.y - heart.y // Distance between the user and the heart vertically

    if (dx < 0) { // If dx is negative, the heart is to the right
      // So move right
      user.vx = user.speed;
    }
    else if (dx > 0) { // If dx is positive, the mouse is to the left
      // So move left
      user.vx = -user.speed;
    }
    // Same again for the y axis
    if (dy < 0) {
      user.vy = user.speed;
    }
    else if (dy > 0) {
      user.vy = -user.speed;
    }
  user.x = user.x + user.vx;
  user.y = user.y + user.vy;
  }
}

function displayHeart() {
  imageMode(CENTER);
  image(heartImg,heart.x,heart.y);
  noFill();
  ellipse(heart.x,heart.y,heart.size);

  // Heart movement
  heart.x += heart.vx
  heart.y += heart.vy

  //check if heart hits edge
  if(heart.x > width || heart.x < 0) {
    count++;
    heart.vx *= -1;
  }
  if (heart.y > height || heart.y < 0) {
    count++
    heart.vy *= -1
  }
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`
  }
}

//*********************************** TEXT ***********************************//

// Displays the title screen and instructions
function titleText() {
  push();
  textSize(64);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`LOVE?`, width/2, height/2 - 64);

  textSize(30);
  text(`Click to begin your pursuit for love`, width/2, height/2);

  textSize(20);
  fill(255,223,228);
  text (`Where you click will the starting position, so choose carefully!
    Your goal is to find love before it's too late.`, width/2, 64 + height/2 );
  pop();
}

// Displays love ending
function loveText() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`,width/2,height/2);
  pop();
}

// Displays sad ending
function sadText() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`:(`,width/2,height/2);
  pop();
}

// Displays if the heart was 1 bounce away from the maximum
function closeCallText() {
  push();
  textSize(30);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`PHEW! that was a close call, you were almost forever alone!`, width/2, 64 + height/2)
  pop();
}

// Displays if love is found before the heart bounces twice
function luckyText() {
  push();
  textSize(30);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`WOW! you found love immediately, lucky game!`, width/2, 64 + height/2)
  pop();
}

// Displays # of times the heart bounces
function countText() {
  textSize (20);
  textAlign(LEFT);
  text (count, 50, 50);
}
