class Hot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.direction = [speed, -speed, speed + 1, -speed + 2];
    this.vx = random(this.direction); //random(6, 8); // X velocity
    this.vy = random(speed / 2, speed / 2 + 2); //random(3, 4); // Y velocity
  }

  // Display the hot particles
  display(radius) {
    push();
    fill(50);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}
