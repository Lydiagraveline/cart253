/**
Love, actually
Lydia Graveline

Love simulation game where the player selects a positon on the screen in hopes of finding love.
The player's icon will pursuit a heart bouncing around the screen
*/

"use strict";

let max = 10; //maximun number of times the heart can bounce before the game ends
let count = 0; // starts # of bounces at zero

let heart = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 4,
  vy: 5,
  speed: 4,
};

let user = {
  x: undefined,
  y: undefined,
  size: 100,
  vy: 0,
  vx: 0,
  speed: 2,
};

let state = `title`; //can be title, simulation, love, sadness

// Image for heart
let heartImg;
function preload() {
  heartImg = loadImage ('assets/images/heart.png');
}

function setup() {
createCanvas(windowWidth, windowHeight);
// Heart starts at random position
heart.x = random(0,width)
heart.y = random(0,height)
}

function draw() {
  background(255,192,203) // Sets background to pink

  //states
  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    loveEnding();
  }
  else if (state === `sadness`)
    sadEnding();

}

// Title screen + instructions
function title() {
  titleText(); //title screen

  displayUser(); //display user
}

function simulation() {
  heartBounce(); // Checks if user can't find love :(
  checkOverlap(); // Checks if user has found love <3
  displayHeart();
  displayUser();
}

// Displays when the player finds love <3
function loveEnding() {
  if (count < max ) {
    luckyText();
    loveText();
  } else {
    loveText();
  }
}

// Displays if the player gets no love </3 :(
function sadEnding() {
  sadText();
}

// function luckyEnding() {
//   if (state === `love` && count === 2) {
//     luckyText();
//   }
// }

// Checks # of times the heart has bounced
function heartBounce() {
  countText();
  if (count === max) {  // if the heart bounces > the maximum, the game ends
    state = `sadness`;
  }
}

function checkOverlap() {
  // Checks if user and the heart overlap
  let d = dist(heart.x, heart.y, user.x, user.y);
  if (d < heart.size/2 + user.size/2) {
    state = `love`;
  }
}

function displayUser() {
  noStroke();
  fill(255);
  ellipse(user.x, user.y, user.size);
  if (state === `title`) {
    user.x = mouseX
    user.y = mouseY
  }
  else if (state === `simulation`) {
    let dx = user.x - heart.x // Distance between the user and the heart horizontally
    let dy = user.y - heart.y // Distance between the user and the heart vertically

    if (dx < 0) {
      user.vx = user.speed;
    }
    else if (dx > 0) {
      user.vx = -user.speed;
    }
    if (dy < 0) {
      user.vy = user.speed;
    }
    else if (dy > 0) {
      user.vy = -user.speed;
    }

  user.x = user.x + user.vx;
  user.y = user.y + user.vy;
  }
}

function displayHeart() {
  imageMode(CENTER);
  image(heartImg,heart.x,heart.y);
  noFill();
  ellipse(heart.x,heart.y,heart.size);

  // Heart movement
  heart.x += heart.vx
  heart.y += heart.vy

  //check if heart hits edge
  if(heart.x > width || heart.x < 0) {
    count++;
    heart.vx *= -1;
  }
  if (heart.y > height || heart.y < 0) {
    count++
    heart.vy *= -1
  }
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`
  }
}

//*********************************** TEXT ***********************************//

// Displays the title screen and instructions
function titleText() {
  push();
  textSize(64);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`LOVE?`, width/2, height/2);
  pop();
}

// Displays love ending
function loveText() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`,width/2,height/2);
  pop();
}

// Displays sad ending
function sadText() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`:(`,width/2,height/2);
  pop();
}

function luckyText() {
  push();
  textSize(50);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`WOW! you found love immediately, lucky game!`, width/2, 30 + height/2)
  pop();
}


// Displays # of times the heart bounces
function countText() {
  textSize (20);
  textAlign(LEFT);
  text (count, 50, 50);

}
