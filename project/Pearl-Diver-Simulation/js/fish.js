class fish {

  constructor() {
    this.size = 25; // Size of the fish
    this.speed = 3; // Speed of the fish
    this.resetFish();  // Fish are reset at start of program
    }

  // Spawns the fish at the left or right side of screen & gives direction based on which side they spawn
  resetFish() {
    this.y = random(water.surface + 100, height - 100)

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
      this.x = this.x - this.speed;
    } else {
      this.x = this.x + this.speed;
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
    fill(200);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  overlappedDiver() {
    if (dist(this.x, this.y, diver.x, diver.y) < this.size/2 + diver.size/2) {
      return true;
    }
    return false;
  }

}
