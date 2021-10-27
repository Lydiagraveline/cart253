/**
Juggle Garden
Lydia Graveline

Juggling simulator
*/

"use strict";

let state = `start` //can be start, simulation, and end

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

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);

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


  if (state === `start`) {
    instructions();
  }
  if (state === `simulation`) {
    simulation();
  }

}

function instructions() {
  push();

  textSize(32);
  text(`click anywhere place the first flower!`, width/2, height/2);
  textSize(18);
  text(`goal: juggle as many as possible without letting any fall`, width/2, height/2 + 50);
  pop();
}

function simulation() {
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

/////////////////////////////////////// USER INPUT //////////////////////////////////////////////////////////////////////////////

// Begins the simulation when player clicks + spawns 1 flower
function mousePressed(){
  // Starts the game
  if (state === `start`){
    state = `simulation`
  }
  // creates a flower where the user clicks and puts it in the array
  if (state === `simulation`) {
    let flower = new Flower(mouseX, mouseY);
    flowers.push(flower);
    numFlowers++
  }
}
