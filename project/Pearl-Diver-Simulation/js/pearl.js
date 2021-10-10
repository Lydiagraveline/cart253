class Pearl {

  constructor() {
    this.x = random(100, width - 100);
    this.y = ocean.floor
    this.vy = 1
    this.size = random(15, 20);
    this.found = false;
  }

  display() {
    push();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
    pop();

    // Pearl falls down if dropped
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
      return true;
    }
    return false;
  }

  // Respawns pearl in water when score inscreases
  update() {
    if (this.isFound())
      this.x = random(100, width - 100);
      this.y = height - 50
  }





}
