class Paddle {

  // Sets up a paddle's properties
  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height/2;
  }

  // Moves the paddle according to the user's input
  move() {
    this.x = mouseX;
  }

  // Displays the paddle on the canvas
  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

}
