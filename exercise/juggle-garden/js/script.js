/**
Juggle Garden
Lydia Graveline

Juggling simulator
*/

"use strict";

let state = `title` //can be start, simulation, and game over

// Declares a gravity variable
let gravityForce = 0.0025;

// paddle variable
let paddleLeft;
let paddleRight;
let paddleSpeed = 10  //variable that changes both paddle's speed

// An array to store the flowers
let flowers = [];
// How many flowers the program begins with
let numFlowers = 0;

// How many times flowers bounce on the paddle
let bounceCount = 0;

// How many times the player can drop a flower before the game ends
let lives = 3;

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);

  // new paddle with chosen dimensions
  paddleLeft = new PaddleLeft(300,20);
  paddleRight = new PaddleRight(300,20);
}

///////////////////////////////////// DRAW /////////////////////////////////////

// Draws the background, title screen, the end screen, and the game itself
function draw() {
  background(0);

  if (state === `title`) {
    callPaddles()
    instructions();
  }
  if (state === `simulation`) {
    callPaddles()
    callFlowers();
    checkGameOver()
  }
  if (state === `gameOver`) {
    endScreen();
  }

}

///////////////////////////////////// USER INPUT ///////////////////////////////

// Begins the simulation when player clicks + spawns 1 flower
function mousePressed(){
  // Starts the game
  if (state === `title`){
    state = `simulation`
  }
  // creates a flower where the user clicks and puts it in the array
  if (state === `simulation`) {
    let flower = new Flower(mouseX, mouseY);
    flowers.push(flower);
    numFlowers++
  }
}

///////////////////////////////////// TITLE SCREEN ///////////////////////////////

// Displays text on the tiitle screen
function instructions() {
  push();
  textSize(32);
  fill(255);
  text(`click anywhere place the first flower!`, width/2, height/2);
  textSize(18);
  text(`goal: juggle as many as possible without letting any fall`, width/2, height/2 + 50);

  // Display text on paddles
  textSize(16);
  fill(0)
  text(`use A and D to move`, paddleLeft.x, paddleLeft.y+5);
  text(`use arrow keys`, paddleRight.x, paddleRight.y+5);
  pop();
}

///////////////////////////////////// SIMULATION ///////////////////////////////

// calls the paddle's move() and draw() methods
function callPaddles() {
  paddleLeft.move();
  paddleLeft.display();
  paddleRight.move();
  paddleRight.display();
}

function callFlowers() {
  push();
  fill(255);
  text((numFlowers)+` flowers`, 100, 100);
  text((bounceCount)+` bounces`, 100, 150);
  text((lives)+` lives`, 100, 200);
  pop();

  // Calls the flower's gravity(), move(), bounce(), and display() methods
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    if (flower.active) {
      flower.gravity(gravityForce);
      flower.move();
      flower.bounce(paddleLeft, paddleRight);
      flower.display();
    }
  }
}

function checkGameOver() {
 if (lives === 0) {
   state = `gameOver`;
 }
}

///////////////////////////////////// END SCREEN ///////////////////////////////
function endScreen() {
  push();
  fill(255);
  textSize(32);
  text(`game over!`, width/2, height/2);
  pop();
}
