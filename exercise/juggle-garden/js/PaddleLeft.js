class PaddleLeft {

  // Sets up a paddle's properties
  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.x = 0 + this.width/2;
    this.y = height - this.height/2;
    this.speed = paddleSpeed
  }

  // Moves the paddle according to the user's input
  move() {
    // A --> left
    if (keyIsDown(65)) {     // A key code is 65
      this.x -= this.speed;
    }
    // D --> right
    if (keyIsDown(68)) {     // D key code is
      this.x += this.speed;
    }
  }

  // Displays the paddle on the canvas
  display() {
    push();
    fill(255);
    stroke(0);
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);

    pop();
  }

}
