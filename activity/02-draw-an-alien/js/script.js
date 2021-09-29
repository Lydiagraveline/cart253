"use strict";

/**************************************************
Activity 2: Draw an Alien
Lydia Graveline

Draws an alien on the canvas.
**************************************************/

// setup()
//
// Draw alien.
function setup() {
  createCanvas(640, 480);

  background(184, 224, 184);
  noStroke();

  //draw body
  fill(159, 159, 223);
  ellipse(320, 480, 300, 200);

  //draw head
  fill(140, 140, 217);
  ellipse(320, 240, 300, 400);

  //draw eyes
  fill(0);
  ellipse(230, 230, 100, 240, 200)
  ellipse(410, 230, 100, 240, 200)

  //draw nostrils
  fill(0);
  ellipse(300, 365, 10, 10,);
  ellipse(340, 365, 10, 10,);

  //draw mouth
  stroke(107, 107, 199)
  strokeWeight(8);
  rectMode(CENTER);
  rect(320, 410, 50, 20);
}

// draw()
//
// does nothing
function draw() {

}
