class Container extends Level {
  constructor(containerWidth, containerHeight){
    super(containerWidth, containerHeight);
  }

  display() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(`gray`);
    rect(width/2, height/2, this.width, this.height)

    // center line
    stroke(5);
    //line(width/2, this.y1, width/2, this.y2);

      rectMode(CENTER);
      noStroke();
      fill(255);

      rect(width/2, this.y1 - this.doorHeight/2, this.doorWidth , this.height); // Draw thin white rectangle in center
      rect(width/2, this.y2 + this.doorHeight/2, this.doorWidth , this.height);

      if (door === 'closed') {
        rect(width/2, height/2, this.doorWidth , this.doorHeight);
      }

    pop();
  }
}
