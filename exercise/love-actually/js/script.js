/**
Love, actually
Lydia Graveline

love simulation game
*/

"use strict";

let heart = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 4,
  vy: 5,
  speed: 4,
};

let user = {
  x: 0,
  y: 0,
  size: 150

}

let heartImg;

function preload() {
  heartImg = loadImage ('assets/images/heart.png');
}

function setup() {
createCanvas(windowWidth, windowHeight);
// Heart starts in center of screen
heart.x = width/2
heart.y = height/2

}

function mousePressed()

function draw() {
  background(255,192,203)

  //display heart
  imageMode(CENTER);
  image(heartImg,heart.x,heart.y)
  noFill();
  ellipse(heart.x,heart.y,heart.size);

  heart.x += heart.vx
  heart.y += heart.vy

  //check if heart hits edge
  if(heart.x > width || heart.x < 0){
    heart.vx *= -1;
  }

  if (heart.y > height || heart.y < 0) {
    heart.vy *= -1

    //display user
    rectMode(CENTER);
    rect(user.x, user.y, user.size, 50)
  }
}
