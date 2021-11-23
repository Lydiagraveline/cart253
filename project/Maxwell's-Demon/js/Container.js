class Container {
  constructor(){
    this.width = 800;
    this.height = 200;
  }

  display(x, y, width, height) {
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(x, y, width, height)

    // center line
    stroke(5);
    line(x, y - height/2, x, y + height/2);
    pop();
  }
}
