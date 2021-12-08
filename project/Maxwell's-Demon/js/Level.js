class Level {
  constructor(levelWidth, levelHeight, numParticles, doorHeight, radius) {
    this.width = levelWidth;
    this.height = levelHeight;
    this.x1 = width / 2 - this.width / 2;
    this.y1 = height / 2 - this.height / 2;
    this.x2 = width / 2 + this.width / 2;
    this.y2 = height / 2 + this.height / 2;
    this.doorHeight = doorHeight;
    this.doorWidth = 10;
    this.coldParticles = [];
    this.hotParticles = [];
    this.r = radius;
    this.addParticles(numParticles);
  }

  // Create the particles and put them in an array
  addParticles(numParticles) {
    // Create cold particles and put them in our array
    // X and Y are random points inside the container
    for (let i = 0; i < numParticles; i++) {
      let x;
      let y = random(this.y1 + this.r, this.y2 - this.r);

      // level 1
      if (levelNum === 1) {
        x = this.width / 2; //x = random(this.x1 + this.r, this.width / 2 + this.r,)
        // level 2
      } else if (levelNum === 2 && gameMode === `challenge`) {
        x = this.width;
        // level 3
      } else if (levelNum === 3 && gameMode === `challenge`) {
        x = this.width;
        // level 4
      } else if (levelNum === 4 && gameMode === `challenge`) {
        x = this.width;
      } else if (`challenge`) {
        x = random(this.x1 + this.r, this.x2 - this.r);
      }
      if (gameMode === `sandbox` || gameMode === `random`) {
        x = random(this.x1 + this.r, this.x2 - this.r);
      }

      // Add to the array
      let particle = new Cold(x, y);
      this.coldParticles.push(particle);
    }

    // Create hot particles and put them in our array
    // X and Y are random points inside the container
    for (let i = 0; i < numParticles; i++) {
      let x;
      let y = random(this.y1 + this.r, this.y2 - this.r);

      // level 1
      if (levelNum === 1) {
        x = this.width / 2;
        // level 2
      } else if (levelNum === 2 && gameMode === `challenge`) {
        x = this.width;
      } else if (levelNum === 3 && gameMode === `challenge`) {
        x = this.width / 2;
      } else if (levelNum === 4 && gameMode === `challenge`) {
        x = this.width / 2;
      } else if (`challenge`) {
        x = random(this.x1 + this.r, this.x2 - this.r);
      }
      // Correct Hot = left side

      // random if sandbox
      if (gameMode === `sandbox`) {
        x = random(this.x1 + this.r, this.x2 - this.r);
      }

      // Add to the array
      let particle = new Hot(x, y);
      this.hotParticles.push(particle);
    }
  }

  // Display and move the particles
  drawParticles(levelWidth, levelHeight) {
    // Cold particles
    for (let i = 0; i < this.coldParticles.length; i++) {
      let particle = this.coldParticles[i];
      particle.move(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.doorHeight,
        this.doorWidth,
        this.r
      );
      particle.display(this.r);
    }

    // Hot particles
    for (let i = 0; i < this.hotParticles.length; i++) {
      let particle = this.hotParticles[i];
      particle.move(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.doorHeight,
        this.doorWidth,
        this.r
      );
      particle.display(this.r);
    }
  }

  // Check if particles have been correctly organized  // thx for this bit pippin! :p
  allParticlesCorrect() {
    // Check all hot particles for correctness
    for (let i = 0; i < this.hotParticles.length; i++) {
      let p = this.hotParticles[i];
      if (p.x < width / 2) {
        return false;
      }
    }

    // Check all cold particles for correctness
    for (let i = 0; i < this.coldParticles.length; i++) {
      let p = this.coldParticles[i];
      if (p.x > width / 2) {
        return false;
      }
    }
    if (door === `closed`) {
      return true;
    }

  }

  // Display the level container, walls, and images
  display(strokeColor, strokeSize, container, bgColor) {
    push();
    background(bgColor);

    rectMode(CENTER);
    stroke(strokeColor);
    strokeWeight(strokeSize);
    fill(container);
    rect(width / 2, height / 2, this.width, this.height);

    // draw the wall in the center
    //noStroke();
    fill(bgColor);
    rect(width / 2, this.y1 - this.doorHeight / 2, this.doorWidth, this.height);
    rect(width / 2, this.y2 + this.doorHeight / 2, this.doorWidth, this.height);

    // draw rectangles to hide the wall overflow
    push();
    fill(bgColor);
    rectMode(CORNERS);
    //noStroke();
    rect(0, 0 - strokeSize / 2, width, this.y1);
    rect(0, this.y2, width, height + strokeSize);
    noStroke();
    rect(0, 0, this.x1 - strokeSize / 2, height);
    rect(this.x2 + strokeSize / 2, 0, width, height);
    pop();
    // draw a door that opens and closes
    if (door === "closed") {
      //stroke(1);
      fill(bgColor);
      rect(width / 2, height / 2, this.doorWidth, this.doorHeight);
      constrain(doorHeight, this.y1, this.y2);
    }

    // Display demon images
    if (demonDisplay === `top`) {
      //imageMode(CENTER);
      image(demonTopImg, width / 2, this.y1 - strokeSize / 2);
    } else if (demonDisplay === `corner`) {
      //flip image over horizontal axis
      translate(width, 0);
      scale(-1, 1);
      image(demonCornerImg, this.x1, this.y1 - 10 - strokeSize / 2);
    } else if (demonDisplay === `standing`) {
      image(demonImg, width / 2, this.y1);
    } else if (demonDisplay === `cornerLeft`) {
      image(demonCornerLeftImg, this.x1, this.y1 - 13 - strokeSize / 2);
    }
    pop();
  }
}
