/**
i like to move it
Lydia Graveline

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let shape1 = {
  x: 0,
  y: 0,
  size: 100,
  fill: 250,
  alpha: 200,
};

let shape2 = {
  x: 0,
  y: 0,
  size: 100,
  fill: 255,
  alpha: 190,
};

let shape3 = {
  x: 250,
  y: 250,
  size: 100,


};

/**
Description of setup
*/
function setup() {
  createCanvas (500, 500);
  strokeWeight(2);
}


/**
Description of draw()
*/
function draw() {

  let leftWall = 50;
  let rightWall = 450;
  let topWall = 0;
  let bottomWall = 400;

  let constrainMouseX = constrain(mouseX, leftWall, rightWall);
  let constrainMouseY = constrain(mouseY, topWall, bottomWall);

  if (mouseIsPressed) {
      stroke(10,10);
    } else {
      noStroke();
    };

  // shape 1
  fill(mouseY,mouseX, shape1.alpha);
  shape1.y = mouseY - 50
  shape1.size = mouseY
  ellipse(constrainMouseX, shape1.y, shape1.size);

  // Shape 2
  fill(mouseX, shape2.alpha);
  shape2.y = constrainMouseY + 50
  shape2.x = mouseX
  shape2.size = mouseX
  ellipse(shape2.x, shape2.y, shape2.size);

  // Shape 3
  fill(mouseX, mouseY,);
  shape3.size = mouseX
  shape3.size = map(shape3.size, 0, width, constrainMouseX, constrainMouseY)
  ellipse(shape3.x, shape3.y, shape3.size)
}
function mousePressed(){
  background(10, 10)
}
