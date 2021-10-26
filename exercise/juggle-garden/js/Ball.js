class Ball {

  // The constructor() sets up a paddle's properties
  constructor(x,y) {
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
    this.size = 40;
    this.active = true; // Ball starts as active
  }

  // Gravity that causes the ball to accelerate downwards
  gravity(force) {
    // adds the force parameter to the ball’s y acceleration
    this.ay = this.ay + force;
  }

  // Moves the ball accoring to its acceleration and velocity
  move() {
    //constrains the ball within the edges of the screen
    this.x = constrain(this.x, 0, width);

    // Adds acceleration to the velocity for both x and y axes
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    // Constrain the velocity based on the maximum speed of the ball
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    // Add the velocity to the position to move the ball
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Ball is no longer active when it leaves the screen
    if (this.y - this.size/2 > height) {
      this.active = false;
    }
  }

  // Bounces the ball if it touches the paddle
  bounce(paddleLeft, paddleRight) {

    //Checks the left paddle
    if (
        this.x > paddleLeft.x - paddleLeft.width/2 &&
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
    if (
        this.x > paddleRight.x - paddleRight.width/2 &&
        this.x < paddleRight.x + paddleRight.width/2 &&
        this.y + this.size/2 > paddleRight.y - paddleRight.height/2 &&
        this.y - this.size/2 < paddleRight.y + paddleRight.height/2) {

      // Bounce
      let dx = this.x - paddleRight.x;
      this.vx = this.vx + map(dx,-paddleRight.width/2,paddleRight.width/2,-2,2);

      this.vy = -this.vy;
      this.ay = 0;
    }

    // Bounces the ball off the left & right edges of the screen
    if (this.x <= 0 || this.x >= width) {
      this.vx = -this.vx;
}
  }

  // Displays the ball on the canvas
  display() {
    push();
    fill(255,50,50); //red
    stroke(0);
    ellipse(this.x,this.y,this.size);
    pop();
  }

}
