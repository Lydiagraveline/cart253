"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // make background fun
  background(mouseX, mouseY, 0);
  // square in the center
  rectMode(CENTER);
  rect(mouseX,mouseY,100, 100);
}
