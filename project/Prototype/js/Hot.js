class Hot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = random(6,8); // X velocity
    this.vy = random(3, 4); // Y velocity
  }

  // Display the hot particles
  display() {
    push();
    fill(50);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}
