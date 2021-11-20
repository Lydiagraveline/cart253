/**
Maxwell's Demon
Lydia Graveline

Project 2 for CART253
*/

"use strict";


let state = "title" // can be title, game, end
let level = "1" // The game starts at level 1

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
  if (state === "title"){
    titleScreen();
  }
}

///////////////////////////////// TITLE SCREEN /////////////////////////////////
// Displays the title screen
function titleScreen(){
  background(0);
  push();
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text(`Maxwell's Demon`, width/2, height/2 - 100);
  textSize(40);
  text(`click to play`, width/2, height/2);
  pop();

///////////////////////////////// GAME /////////////////////////////////

///////////////////////////////// USER INPUT ///////////////////////////////////


  function mousePressed() {
    // "click to start" changes the state from
    if (state === `title`) {
      state = "game"
    }
  }


}
