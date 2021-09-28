"use strict";

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 250,
    g: 0,
    b: 0
  }
};

let user = {
  x: 0,
  y: 0,
  size: 100,
  fill: 255,
};


function setup() {
  createCanvas(windowWidth, windowHeight);

  covid19.y = random(0,height);   /// covid19 starts at random height
  covid19.vx = covid19.speed      /// covid19 moves to the right across the screen

  noCursor()
}

function draw() {
  background (0);

  // Display static
  for (let i = 0; i < 500; i++){
    let x = random(0, width);
    let y = random(0, height);
    stroke(255);
    point(x,y);
  }

  // Covid19 movement
  covid19.x = covid19.x + covid19.vx /// standard movement code
  covid19.y = covid19.y + covid19.vy

  if (covid19.x > width) {
    covid19.x = 0
    covid19.y = random(0,height); /// resets covid19 to the left
  }

  // User movement
  user.x = mouseX;
  user.y = mouseY;

  // Check for catching covid19
  let d = dist(user.x,user.y,covid19.x,covid19.y); ///declaring the variable in draw() rather than at the top because its only needed for this instance
  if (d < covid19.size/2 + user.size/2) {
    noLoop(); /// stops the draw() loop
  }

  //Display covid19
  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  noStroke();
  ellipse(covid19.x,covid19.y,covid19.size);

  // Enter the user! (display user)
  fill(user.fill);
  ellipse(user.x,user.y,user.size);

}
