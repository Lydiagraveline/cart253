class Container extends Level {
  constructor(){
    super();
    this.containerWidth = 800
    this.containerHeight = 200
  }

  display(x, y, width, height) {
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(this.x1, this.y1, this.containerWidth, this.containerHeight)

    // center line
    stroke(5);
    line(x, y - height/2, x, y + height/2);
    pop();
  }
}
