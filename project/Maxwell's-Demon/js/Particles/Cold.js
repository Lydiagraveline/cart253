class Cold extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = random(2, 4); // X velocity
    this.vy = random(1, 2); // Y velocity
  }

  // Display the cold particles
  display() {
    push();
    stroke(0);
    fill(255); // light blue
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}
