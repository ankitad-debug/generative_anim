let ySpeed = 10;
let xSpeed = 5;
let xPos = 50;
let yPos = 50;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  noStroke();

  //fill(252, 114, 116);
  //ellipse(xPos/10,yPos/10,50);
  fill(252, 134, 215);
  ellipse(xPos,yPos,20);

  yPos = yPos + ySpeed;
  //yPos += ySpeed;
  xPos = yPos + xSpeed;
  //xPos += xSpeed;

  //switch direction from bottom
  if(yPos > height) {
    ySpeed = -ySpeed;
  }
  if(yPos < 0) {
    ySpeed = -ySpeed;
  }
  if(xPos > width) {
    xSpeed = -xSpeed;
  }
  if(xPos > 0) {
    xSpeed = -xSpeed;
  }

}
