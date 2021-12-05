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
        let x = random(this.x1 + this.r, this.x2 - this.r);
        let y = random(this.y1 + this.r, this.y2 - this.r);
        // if (width/2 - this.doorWidth - this.r <= x >= width/2 + this.doorWidth + this.r){
        //   x++
        // }
        let particle = new Cold(x, y);
        this.coldParticles.push(particle);
      }

      // Create hot particles and put them in our array
      // X and Y are random points inside the container
      for (let i = 0; i < numParticles; i++) {
        let x = random(this.x1 + this.r, this.x2 - this.r);
        let y = random(this.y1 + this.r, this.y2 - this.r);
        // if ( x === width / 2 ){
        //   x = x + this.doorWidth + this.r;
        // }
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
      particle.check();
    }

    // Hot particles
    for (let i = 0; i < this.hotParticles.length; i++) {
      let particle = this.hotParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth, this.r);
      particle.display(this.r);
      particle.check();
    }
  }



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
      rect(width/2, height/2, this.doorWidth , this.doorHeight);
    }

    // the demon
    imageMode(CENTER);
    image(demonTopImg, width/2, this.y1);

    // fill(0);
    // ellipse(this.x1 + this.r, this.y1, 10)
    // ellipse(width/2 - this.doorWidth - this.r, this.y1, 10)

    // ellipse(width/2 + this.doorWidth + this.r, this.y1, 10)
    // ellipse(this.x2 - this.r, this.y1, 10)
    // rectMode(CORNERS);
    // rect (width/2 - this.doorWidth - this.r, this.y1, width/2 + this.doorWidth + this.r, this.y2)

    pop();
  }
}
