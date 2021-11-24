class Level {
  constructor(containerWidth, containerHeight) {
    this.width = containerWidth;
    this.height = containerHeight;
    this.x1 = width / 2 - this.width / 2;
    this.y1 = height / 2 - this.height / 2;
    this.x2 = width / 2 + this.width / 2;
    this.y2 = height / 2 + this.height / 2;
    this.doorHeight = 50
    this.doorWidth = 10

  }

  display() {}

  addParticles() {
    // Create cold particles and put them in our array
    // X and Y are random points inside the container
    for (let i = 0; i < numParticles; i++) {
      let x = random(this.x1, this.x2);
      let y = random(this.y1, this.y2);
      let particle = new Cold(x, y);
      coldParticles.push(particle);
    }
    // Create hot particles and put them in our array
    // X and Y are random points inside the container
    for (let i = 0; i < numParticles; i++) {
      let x = random(this.x1, this.x2);
      let y = random(this.y1, this.y2);
      let particle = new Hot(x, y);
      hotParticles.push(particle);
    }
  }

  // Display and move the particles
  drawParticles() {
    for (let i = 0; i < coldParticles.length; i++) {
      let particle = coldParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth );
      particle.display();
    }

    // Move and display hot particles
    for (let i = 0; i < hotParticles.length; i++) {
      let particle = hotParticles[i];
      particle.move(this.x1, this.y1, this.x2, this.y2,this.doorHeight,this.doorWidth );
      particle.display();
    }


  }
}
