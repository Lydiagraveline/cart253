class Particle {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.direction = undefined;
    this.vx = undefined; // X velocity defined in subclasses
    this.vy = undefined; // Y velocity defined in subclasses
  }

  // Move the particles
  move(x, y, containerWidth, containerHeight, doorHeight, doorWidth, radius) {
    // Bounces the particles off the borders of the container
    if (this.x >= containerWidth - this.r || this.x <= x + this.r) {
      this.vx = -this.vx;
    }
    if (this.y >= containerHeight - this.r || this.y <= y + this.r) {
      this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Handle the door
    if (
      door === `closed` &&
      this.x > width / 2 - this.r - doorWidth / 2 &&
      this.x < width / 2 + this.r + doorWidth / 2
    ) {
      if (this.vx < 0) {
        this.x = width / 2 + doorWidth / 2 + this.r;
      } else if (this.vx > 0) {
        this.x = width / 2 - doorWidth / 2 - this.r;
      }
      this.vx = -this.vx;
    } else if (
      door === `open` &&
      this.x >= width / 2 - this.r - doorWidth / 2 &&
      this.x <= width / 2 + this.r + doorWidth / 2 &&
      (this.y >= height / 2 + doorHeight / 2 ||
        this.y <= height / 2 - doorHeight / 2)
    ) {
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
  }

  display() {
    //Define this in the subclasses
  }
}
