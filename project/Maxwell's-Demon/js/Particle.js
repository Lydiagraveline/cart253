class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10; // radius
    this.vx = 0; // X velocity defined in subclasses
    this.vy = 0; // Y velocity defined in subclasses
  }

  // Move the particles
  move(x, y, width, height) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounces the particles off the borders on the container
    if (this.x > width - this.r || this.x < x + this.r) {
      this.vx = -this.vx;
    }
    if (this.y > height - this.r || this.y < y + this.r) {
      this.vy = -this.vy;
    }

    // Contains the particles if the door is closed
    if (
      door === `closed` &&
      this.x > width / 2 - this.r &&
      this.x < width / 2 + this.r
    )
      this.vx = -this.vx;
  }

  display() {
    //Define this in the subclasses
  }
}
