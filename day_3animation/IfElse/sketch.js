function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noStroke();

  //change colour in each quadrant
  //top left
  if(mouseX <width/2 && mouseY <height/2) {
    fill(92, 188, 247);
  }
  //top right
  else if(mouseX >= width/2 && mouseY <height/2) {
    fill(252, 106, 216);
  }
  //bottom left
  else if(mouseX <width/2 && mouseY >= height/2) {
    fill(252, 240, 106);
  }
  //bottom right
  else {
    fill(96, 252, 93);
  }

  ellipse(mouseX, mouseY, 50)

}
