// This code is an adapted version of "How to code Space Race!" by lukegarrigan. https://codeheir.com/2019/02/10/how-to-code-space-race-1973-2/

class fish {

  constructor() {
    this.size = random(50, 70); // Size of the fish
    this.speed = random(0.5, 2); // Speed of the fish
    this.resetFish();  // Fish are reset at start of program
    }

  // Spawns the fish at the left or right side of screen & gives direction based on which side they spawn
  resetFish() {
    this.y = random(ocean.surface + 100, ocean.floor - 50);

    let spawnLeftSide = random(1) < 0.5;
    if (spawnLeftSide) {
      	this.x = random(-width, 0);
      	this.isGoingLeft = false;
    } else {
      this.x = random(width, width * 2);
      this.isGoingLeft = true;
      }
    }

  // Moves the fish based on the direction & resets fish when they've gone off screen
  updateFish() {
    if (this.isGoingLeft) {
      this.x = this.x - this.speed - score*0.1;
    } else {
      this.x = this.x + this.speed + score*0.1;

    }
    if (this.isOffScreen()) {
      this.resetFish();
    }
  }

  // Checks if fish is off screen
  isOffScreen() {
    if (this.isGoingLeft && this.x < -5) {
      return true;
    } else if(!this.isGoingLeft && this.x > width + 5) {
        	return true;
        }
        return false;
      }

  // Displays the fish on the canvas
  displayFish() {
    push();
    imageMode(CENTER);

    // Displays image of fish facing the direction it moves in
    if (this.isGoingLeft) {
      image(fishLeft,this.x,this.y, this.size, this.size + 25);
    }
    else {
      image(fishRight,this.x,this.y, this.size, this.size + 25);
    }
    noFill();
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }

 // Checks if a fish has overlaped the player
  overlappedDiver() {
    if (dist(this.x, this.y, diver.x, diver.y) < this.size/2 + diver.size/2) {
      gameOverSound.play();
      return true;
    }
      return false;
  }

}
