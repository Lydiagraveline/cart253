class Level {
  constructor(levelWidth, levelHeight, numParticles, doorHeight, radius) {
    this.width = levelWidth;
    this.height = levelHeight;
    this.x1 = width / 2 - this.width / 2;
    this.y1 = height / 2 - this.height / 2;
    this.x2 = width / 2 + this.width / 2;
    this.y2 = height / 2 + this.height / 2;
    this.doorHeight = doorHeight;
    this.doorWidth = 10
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
        let y;

        // level 1
        if (levelNum === 1){
          x = this.width / 2
          y = this.height
        // level 2
        } else if (levelNum === 2) {
          x = this.width
          y = this.height
        // level 3
        } else if (levelNum === 3) {
          x = this.width
          y = this.height
        // level 4
        } else if (levelNum === 4) {
          x = this.width
          y = this.height
        } else if (levelNum === 5) {
           x = this.width
           y = this.height
        } else if (levelNum === 6) {
           x = this.width
           y = this.height
         }

         // Correct cold = left side

        if (gameMode === `sandbox`) {
          x = random(this.x1 + this.r, this.x2 - this.r);
          y = random(this.y1 + this.r, this.y2 - this.r);
        }

        // Add to the array
        let particle = new Cold(x, y);
        this.coldParticles.push(particle);
      }

      // Create hot particles and put them in our array
      // X and Y are random points inside the container
      for (let i = 0; i < numParticles; i++) {
        let x;
        let y;

        // level 1
        if (levelNum === 1){
          x = this.width / 2
          y = this.height
        // level 2
        } else if (levelNum === 2) {
          x = this.width
          y = this.height
        } else if (levelNum === 3) {
          x = this.width / 2
          y = this.height
        } else if (levelNum === 4) {
           x = random(this.width / 2, this.width)
           y = this.height
         } else if (levelNum === 5) {
            x = this.width
            y = this.height
         } else if (levelNum === 6) {
            x = this.width
            y = this.height
          }

          // Correct Hot = left side


        // random if sandbox
        if (gameMode === `sandbox`) {
          x = random(this.x1 + this.r, this.x2 - this.r);
          y = random(this.y1 + this.r, this.y2 - this.r);
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
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth, this.r);
      particle.display(this.r);
    }

    // Hot particles
    for (let i = 0; i < this.hotParticles.length; i++) {
      let particle = this.hotParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth, this.r);
      particle.display(this.r);
    }
  }

// Check if particles have been correctly organized
  allParticlesCorrect() {
  // Check all hot particles for correctness
  for (let i = 0; i < this.hotParticles.length; i++) {
    let p = this.hotParticles[i];
    if (p.x < width / 2) {
      // If the hot particle is to the left, then it's in the wrong side
      // so we can immediately return FALSE to say we found an incorrect particle
      return false;
    }
  }

  // Check all cold particles for correctness
   for (let i = 0; i < this.coldParticles.length; i++) {
     let p = this.coldParticles[i];
     if (p.x > width / 2) {
       // If the cold particle is to the right, then it's in the wrong side
       // so we can immediately return FALSE to say we found an incorrect particle
       return false;
     }
   }

   // If we get all the way to here, then we know all the particles
   // are on the right side
   return true;
 }



// Display the level container, walls, and images
  display(levelWidth, levelHeight) {
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(width/2, height/2, this.width, this.height)

    // draw the wall in the center
    fill(255);
    rect(width/2, this.y1 - this.doorHeight/2, this.doorWidth , this.height);
    rect(width/2, this.y2 + this.doorHeight/2, this.doorWidth , this.height);

    // draw a door that opens and closes
    if (door === 'closed') {
      stroke(1);
      fill(`lightGray`)  ;
      rect(width/2, height/2, this.doorWidth , this.doorHeight);
      constrain(doorHeight, this.y1,this.y2)
    }

    // Display demon images
    if (demonDisplay === `top`) {
    //imageMode(CENTER);
    image(demonTopImg, width/2, this.y1);
  } else if (demonDisplay === `corner`) {
    //flip image over horizontal axis
    translate(width, 0);
    scale (-1, 1);
    image(demonCornerImg, this.x1, this.y1 - 10);
  } else if (demonDisplay === `standing`) {
    image(demonImg, width/2, this.y1);
  } else if (demonDisplay === `cornerLeft`){
    image(demonCornerLeftImg, this.x1, this.y1 - 13);
  }
    pop();


  }

}
