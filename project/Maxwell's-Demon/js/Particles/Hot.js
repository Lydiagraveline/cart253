class Hot extends Particle {
  constructor(x, y) {
    super(x, y);
    this.vx = random(speed, speed + 2) //random(6, 8); // X velocity
    this.vy = random(speed/2, speed/2 + 2)//random(3, 4); // Y velocity
  }

  // Display the hot particles
  display(radius) {
    push();
    fill(50);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }

}
