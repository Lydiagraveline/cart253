/**
Catching Feelings
Lydia Graveline

Simple game in which user must avoid catching feelings at all cost!
*/

"use strict";

let feelings = {
  x: 0,
  y: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  size: 150,
}

let feelingDown = {
  x: 0,
  y: 250,
  vx: 0,
  vy: 1,
  speed: 5,
  size: 150,
}

let feelingUp = {
  x: 0,
  y: 400,
  vx: 0,
  vy: -1,
  speed: 5,
  size: 150,
}

let user = {
  x: 0,
  y: 0,
  size: 100,
  speed: 2,
  vx: 0,
  vy: 0,
}

let arrow;
let arrowDown;
let arrowUp;
let heart;
let youLose;

function preload() {
  heart = loadImage('assets/images/heart.png');
  arrow = loadImage('assets/images/arrow.png');
  arrowDown = loadImage('assets/images/arrowDown.png');
  arrowUp = loadImage('assets/images/arrowUp.png');
  youLose = loadImage('assets/images/youLose.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cursor(HAND)

  feelings.y = random(0,height);   // arrow starts at random height
  feelings.vx = feelings.speed      // arrow moves to the right across the screen

  feelingDown.x = random(0,height);
  feelingDown.vx = feelingDown.speed

  feelingUp.x = random(0,height);
  feelingUp.vx = feelingUp.speed

}

function draw() {
  background(255,192,203);
  noStroke();

  // Arrow movement
 feelings.x = feelings.x + feelings.vx
 feelings.y = feelings.y + feelings.vy

  if (feelings.x > width) {
    feelings.x = 0
    feelings.y = random(0,height); // resets arrow to the left
  }

// Arrow down movement
  feelingDown.x = feelingDown.x + feelingDown.vx
  feelingDown.y = feelingDown.y + feelingDown.vy

  if (feelingDown.x > width) {
    feelingDown.x = 0
    feelingDown.y = random(0,height);
  }

  //Arrow up movement
  feelingUp.x = feelingUp.x + feelingUp.vx
  feelingUp.y = feelingUp.y + feelingUp.vy

  if (feelingUp.x > width) {
    feelingUp.x = 0
    feelingUp.y = random(0,height);
  }

  // User movement
  if (mouseX < user.x){
    user.vx = -user.speed;
  } else {
    user.vx = user.speed;
  }

  if (mouseY < user.y) {
    user.vy = -user.speed;
  } else {
    user.vy = user.speed;
  }

  user.x = user.x + user.vx;
  user.y = user.y + user.vy;

  // Display user
  imageMode(CENTER);
  image(heart,user.x,user.y)
  noFill();
  rectMode(CENTER);
  rect(user.x,user.y,user.size);

  // Display arrows
  imageMode(CENTER);
  image(arrow,feelings.x,feelings.y);
  noFill();
  rectMode(CENTER);
  rect(feelings.x, feelings.y, feelings.size, 50)

  imageMode(CENTER);
  image(arrowDown,feelingDown.x,feelingDown.y);
  noFill();
  rectMode(CENTER);
  rect(feelingDown.x, feelingDown.y, feelingDown.size, 50)

  imageMode(CENTER);
  image(arrowUp,feelingUp.x,feelingUp.y);
  noFill();
  rectMode(CENTER);
  rect(feelingUp.x, feelingUp.y, feelingUp.size, 50)

  // Check for catching feelings
  let d = dist(user.x,user.y,feelings.x,feelings.y);
  if (d < feelings.size/2 + user.size/2) {
    imageMode(CENTER);
    image(youLose,width/2,height/2);
    noFill();
    rectMode(CENTER);
    rect(500, 500)
    noLoop();
  }
  let d2 = dist(user.x,user.y,feelingDown.x,feelingDown.y);
  if (d2 < feelingDown.size/2 + user.size/2) {
    imageMode(CENTER);
    image(youLose,width/2,height/2);
    noFill();
    rectMode(CENTER);
    rect(500, 500)
    noLoop();
  }
  let d3 = dist(user.x,user.y,feelingUp.x,feelingUp.y);
  if (d3 < feelingUp.size/2 + user.size/2) {
    imageMode(CENTER);
    image(youLose,width/2,height/2);
    noFill();
    rectMode(CENTER);
    rect(500, 500)
    noLoop();
  }



}
