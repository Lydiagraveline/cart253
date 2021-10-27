class Flower {

  // The constructor() sets up a paddle's properties
  constructor(x, y) {
    // size, and movement information
    this.x = x;
    this.y = y;
    // velocity
    this.vx = 0;
    this.vy = 0;
    // acceleration
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 20;
    this.active = true; // flower starts as active

    this.petalSize = 25;
    this.petalColor = {
      r: random(130, 255),
      g: random(100, 130),
      b: random(100, 240)
    }


  }

  // Gravity that causes the flower to accelerate downwards
  gravity(force) {
    // adds the force parameter to the flower’s y acceleration
    this.ay = this.ay + force;
  }

  // Moves the flower accoring to its acceleration and velocity
  move() {
    // Adds acceleration to the velocity for both x and y axes
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    // Constrain the velocity based on the maximum speed of the flower
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    // Add the velocity to the position to move the flower
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // flower is no longer active when it leaves the screen
    if (this.y - this.size/2 > height) {
      this.active = false;
      numFlowers--;
      droppedFlowers--;
      lives --;
    }
  }

  // Bounces the flower if it touches the paddle
  bounce(paddleLeft, paddleRight) {
    //Checks the left paddle
    if (this.x > paddleLeft.x - paddleLeft.width/2 &&
        this.x < paddleLeft.x + paddleLeft.width/2 &&
        this.y + this.size/2 > paddleLeft.y - paddleLeft.height/2 &&
        this.y - this.size/2 < paddleLeft.y + paddleLeft.height/2) {

      // Bounce
      let dx = this.x - paddleLeft.x;
      this.vx = this.vx + map(dx,-paddleLeft.width/2,paddleLeft.width/2,-2,2);

      this.vy = -this.vy;
      this.ay = 0;
    }
    //Checks the right paddle
    if (this.x > paddleRight.x - paddleRight.width/2 &&
        this.x < paddleRight.x + paddleRight.width/2 &&
        this.y + this.size/2 > paddleRight.y - paddleRight.height/2 &&
        this.y - this.size/2 < paddleRight.y + paddleRight.height/2) {

      // Bounce
      let dx = this.x - paddleRight.x;
      this.vx = this.vx + map(dx,-paddleRight.width/2,paddleRight.width/2,-2,2);
      this.vy = -this.vy;
      this.ay = 0;
    }

    // Bounces the flower off the left & right edges of the screen
    if (this.x <= 0 || this.x >= width) {
      this.vx = -this.vx;
}
  }

  // Displays the flower on the canvas
  display() {
    push();
    // draw the petals
    fill(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    stroke(0);
    // flower petal code is adapted from "Flower Garden Stamp" by rhymeandreason on P5js editor: https://editor.p5js.org/rhymeandreason/sketches/6hu5yaHoi
    for (var theta=0; theta<TWO_PI; theta+=PI/3){
      var petalx = this.size*cos(theta) + this.x;
      var petaly = this.size*sin(theta) + this.y;
      ellipse(petalx, petaly, this.size);
      }
    //draw the flower center
    fill(255,255,0);
    ellipse(this.x, this.y, this.petalSize,);
    pop();
  }

}
