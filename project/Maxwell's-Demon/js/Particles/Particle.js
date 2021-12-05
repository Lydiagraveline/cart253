class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.vx = 0; // X velocity defined in subclasses
    this.vy = 0; // Y velocity defined in subclasses
  }

  check() {

  }

  // Move the particles
  move(x, y, containerWidth, containerHeight, doorHeight, doorWidth, radius) {
    //x1, y1, x2, y2
    this.x += this.vx;
    this.y += this.vy;

    // Bounces the particles off the borders of the container
    if (this.x >= containerWidth - this.r|| this.x <= x + this.r) {
      this.vx = -this.vx;
    }
    if (this.y >= containerHeight - this.r || this.y <= y + this.r) {
      this.vy = -this.vy;
    }

   if (door === `closed` && this.x >= width / 2 - this.r - doorWidth && this.x <= width / 2 + this.r + doorWidth){
      this.vx = - this.vx;
    } else if (door === `open` &&
      (this.x >= width/2 - this.r - doorWidth && this.x <= width/2 + this.r + doorWidth) &&
      (this.y >= height/2 + doorHeight/2 || this.y <= height/2 - doorHeight/2)) {
        this.vx = - this.vx;
        this.vy = - this.vy;
      }

    if (this.x === width/2){
      //fix particles getting stuck in door
    }

    if (this.x < x) {
      this.x ++;
    }

    this.x = constrain(this.x, width/2 - containerWidth/2, width/2 + containerWidth/2);
    this.y = constrain(this.y, height/2 - containerHeight/2, height/2 + containerHeight/2);

  }



  display() {
    //Define this in the subclasses
  }
}
