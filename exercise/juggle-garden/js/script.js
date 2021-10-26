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
let numflowers = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // new paddle with chosen dimensions
  paddleLeft = new PaddleLeft(300,20);
  paddleRight = new PaddleRight(300,20);

  // creates the flower objects and put them in the array
  for (let i = 0; i < numflowers; i++) {
    let x = random(0,width);
    let y = random(-400,-100);
    let flower = new Flower(x,y);
    flowers.push(flower);
  }
}

// calls the paddle & flowers
function draw() {
  background(0);

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

// Click to add new flowers
function mousePressed(){
  //for (let i = 0; i < flowers.length; i++) {
    let flower = new Flower(mouseX, mouseY);
    flowers.push(flower);
  //}
}
