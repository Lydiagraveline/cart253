class Cold extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = 2; // X velocity
    this.vy = 1; // Y velocity
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
