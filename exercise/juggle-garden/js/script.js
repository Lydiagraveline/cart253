/**
Juggle Garden
Lydia Graveline

Juggling simulator
*/

"use strict";

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

let bounceCount = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // new paddle with chosen dimensions
  paddleLeft = new PaddleLeft(300,20);
  paddleRight = new PaddleRight(300,20);
}

// calls the paddle & flowers
function draw() {
  background(0);

  fill(255);
  text((numFlowers)+` flowers`, 100, 100);
  text((bounceCount)+` bounces`, 100, 200);

  // calls the paddle's move() and draw() methods
  paddleLeft.move();
  paddleLeft.display();
  paddleRight.move();
  paddleRight.display();

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

// creates a flower where the user clicks and puts it in the array
function mousePressed(){
    let flower = new Flower(mouseX, mouseY);
    flowers.push(flower);
    numFlowers++
}
