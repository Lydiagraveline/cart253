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

// An array to store the balls
let balls = [];
// How many balls the program begins with
let numBalls = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // new paddle with chosen dimensions
  paddleLeft = new PaddleLeft(300,20);
  paddleRight = new PaddleRight(300,20);

  // creates the Ball objects and put them in the array
  for (let i = 0; i < numBalls; i++) {
    let x = random(0,width);
    let y = random(-400,-100);
    let ball = new Ball(x,y);
    balls.push(ball);
  }
}

// calls the paddle & balls
function draw() {
  background(0);

  // calls the paddle's move() and draw() methods
  paddleLeft.move();
  paddleLeft.display();
  paddleRight.move();
  paddleRight.display();

  // Calls the ball's gravity(), move(), bounce(), and display() methods
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddleLeft, paddleRight);
      ball.display();
    }
  }
}

// Click to add new balls
function mousePressed(){
  //for (let i = 0; i < balls.length; i++) {
    let ball = new Ball(mouseX, mouseY);
    balls.push(ball);
  //}
}
