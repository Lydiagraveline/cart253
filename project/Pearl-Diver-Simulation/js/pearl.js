class Pearl {

 // Describes pearls that spawn at the bottom of the water randomly on the x axis
  constructor() {
    this.x = random(100, width - 100);
    this.y = ocean.floor
    this.vy = 1
    this.size = random(15, 25);
    this.found = false;
  }

  // Displays image of pearls & gravity
  display() {
    push();

    // Shadow
    drawingContext.shadowOffsetX = -1;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = `#436666`

    imageMode(CENTER);
    image(pearlImg, this.x, this.y, this.size, this.size);
    pop();

    // Pearl falls down if dropped by the player
    if (this.y < ocean.floor ) {
      this.y += this.vy
    }
  }

  // Calculates when a pearl is found by the diver
  isFound() {
    let d = dist(this.x, this.y, diver.x, diver.y)
    if ( d < this.size/2 + diver.size/2) {
      this.y = diver.y
    }
    if (this.y === ocean.surface) {
      newPoint.play(); //Plays sounds when the player earns a point
      return true;
    }
    return false;
  }

  // Respawns pearl in water when score inscreases
  update() {
    if (this.isFound())
      this.x = random(100, width - 100);
      this.y = ocean.floor
  }

}
