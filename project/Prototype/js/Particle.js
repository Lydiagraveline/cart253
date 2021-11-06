class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 10; // radius
    this.vx = 5; // X velocity
    this.vy = 2; // Y velocity
  }

move() {
  this.x += this.vx;
  this.y += this.vy;

  // Bounces the particles off the borders on the canvas
  if (this.x > width - this.r || this.x < this.r) {
    this.vx = -this.vx;
  }
  if (this.y > height - this.r || this.y < this.r) {
    this.vy = -this.vy;
  }


  // Contains the particles if the door is closed
  if (door === `closed` && this.x > width/2 - this.r && this.x < width/2 + this.r )
    this.vx = -this.vx;

}

display() {
  push();
  fill(255);
  ellipse(this.x, this.y, this.r*2);
  pop();
}

}
