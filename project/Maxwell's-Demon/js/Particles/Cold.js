class Cold extends Particle {
  constructor(x, y) {
    super(x, y);
    this.direction = [speed/3, -speed/3];
    this.vx = random(this.direction); //random(2, 4); // X velocity
    this.vy = random(speed/4, speed/4 + 2);//random(1, 2); // Y velocity
  }

  // Display the cold particles
  display(radius) {
    push();
    stroke(0);
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
    pop();
  }
}
