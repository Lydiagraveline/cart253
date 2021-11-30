class Level {
  constructor(containerWidth, containerHeight, numParticles) {
    this.width = containerWidth;
    this.height = containerHeight;
    this.x1 = width / 2 - this.width / 2;
    this.y1 = height / 2 - this.height / 2;
    this.x2 = width / 2 + this.width / 2;
    this.y2 = height / 2 + this.height / 2;
    this.doorHeight = 50
    this.doorWidth = 10
    this.coldParticles = [];
    this.hotParticles = [];
    this.addParticles(numParticles);
  }

  addParticles(numParticles) {
      // Create cold particles and put them in our array
      // X and Y are random points inside the container
      for (let i = 0; i < numParticles; i++) {
        let x = random(this.x1, this.x2);
        let y = random(this.y1, this.y2);
        let particle = new Cold(x, y);
        this.coldParticles.push(particle);
      }

      // Create hot particles and put them in our array
      // X and Y are random points inside the container
      for (let i = 0; i < numParticles; i++) {
        let x = random(this.x1, this.x2);
        let y = random(this.y1, this.y2);
        let particle = new Hot(x, y);
        this.hotParticles.push(particle);
      }

  }

  // Display and move the particles
  drawParticles(levelWidth, levelHeight) {
    this.x1 = width / 2 - levelWidth / 2;
    this.y1 = height / 2 - levelHeight / 2;
    this.x2 = width / 2 + levelWidth / 2;
    this.y2 = height / 2 + levelHeight / 2;


    for (let i = 0; i < this.coldParticles.length; i++) {
      let particle = this.coldParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth );
      particle.display();
    }

    // Move and display hot particles
    for (let i = 0; i < this.hotParticles.length; i++) {
      let particle = this.hotParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth );
      particle.display();
    }
  }

  display(levelWidth, levelHeight) {
    this.width = levelWidth;
    this.height = levelHeight;
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(width/2, height/2, this.width, this.height)

    // center line
    stroke(5);
    //line(width/2, this.y1, width/2, this.y2);

      rectMode(CENTER);
      noStroke();
      fill(255);

      rect(width/2, this.y1 - this.doorHeight/2, this.doorWidth , this.height); // Draw thin white rectangle in center
      rect(width/2, this.y2 + this.doorHeight/2, this.doorWidth , this.height);

      if (door === 'closed') {
        rect(width/2, height/2, this.doorWidth , this.doorHeight);
      }

    pop();
  }
}
