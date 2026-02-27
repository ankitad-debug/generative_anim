let division=10;
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
}

function draw() {
  background(20);
  noStroke();
  push();

  //move origin to the centetr
  translate(width/2, height/2);
  rotate(frameCount);

  for(let i=0; i<division; i+=1) {
    fill(250, 243, 112);
    ellipse (200,0,50*sin(frameCount));
    fill(250, 243, 112);
    ellipse(400,0,50*sin(frameCount));
    rotate(360/division);

    //rect(300,20,50,50*sin(frameCount));
    //rotate(15);
    //rotate (360/division);

  //triangle(100,100,200,200,300,100);
  rotate (3*frameCount);
  for(let i=0; i<divisions;i+=1) {
    ellipse(300,0,50*cos(frameCount))
    rotate(360/divisions);
  }

  }

  pop()
  //function mousePressed() {
  //division +=1}
}
