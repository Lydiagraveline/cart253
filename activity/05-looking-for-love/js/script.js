/**
Activity 5: Looking for Love
Lydia Graveline

*/

"use strict";

circle1 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
};


function setup() {
  createCavas(windowWidth, windowHeight;

    // Position circles
    circle1.x = width / 3;
    circle2.x = 2 * width / 3;

    //start cicrles moving in random direction
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
}


function draw() {
background(0);

}
