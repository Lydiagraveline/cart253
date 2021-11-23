class Container extends Level {
  constructor(width, height){
    super(width, height);

  }

  display() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(width/2, height/2, this.width, this.height)

    // center line
    stroke(5);
    line(width/2, this.y1, width/2, this.y2);

    ellipse(this.x1, this.y2, 10)
    pop();
  }
}
