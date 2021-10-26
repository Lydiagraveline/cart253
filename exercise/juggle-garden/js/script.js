/**
Juggle Garden
Lydia Graveline

Juggling simulator
*/

"use strict";

// Declares a gravity variable
let gravityForce = 0.0025;

// paddle variable
let paddle;
let paddleRight;

// An array to store the balls
let balls = [];
// How many balls the program begins with
let numBalls = 10;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // new paddle with chosen dimensions
  paddle = new Paddle(300,20);
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
  paddle.move();
  paddle.display();
  paddleRight.move();
  paddleRight.display();

  // Calls the ball's gravity(), move(), bounce(), and display() methods
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle, paddleRight);
      ball.display();
    }
  }
}
