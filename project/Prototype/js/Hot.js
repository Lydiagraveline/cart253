class Hot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = 5; // X velocity
    this.vy = 2; // Y velocity
  }

  // Display the hot particles
  display() {
    push();
    fill(50); 
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }

}
