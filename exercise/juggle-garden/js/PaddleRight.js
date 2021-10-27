class PaddleRight {
  // Sets up a paddle's properties
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = width - this.width / 2;
    this.y = height - this.height / 2;
    this.speed = paddleSpeed;
  }

  // Moves the paddle according to the user's input
  move() {
    // ArrowLeft --> left
    if (keyIsDown(37)) {
      // ArrowLeft key code is 37
      this.x -= this.speed;
    }
    // ArrowRight --> right
    if (keyIsDown(39)) {
      // ArrowRight key code is 39
      this.x += this.speed;
    }
  }

  // Displays the paddle on the canvas
  display() {
    push();
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
