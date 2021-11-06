/**
Maxwell's Demon
Lydia Graveline
*/

"use strict";

let door = `closed`;

function setup() {
  createCanvas(700, 500);

}


function draw() {

  displayChambers();

  if (door === `closed`) {
    rectMode(CENTER);
    fill (255);
    rect(width/2, height/2, 10, height); // Draw thin white rectangle in center
  }
}

// Displays the background as two chambers
function displayChambers() {
  noStroke();
  //left chamber
  background(`gray`);
  // Right chamber
  rectMode(CORNER);
  fill(169);
  rect(width/2, 0, height); // Draw gray rectangle
}
