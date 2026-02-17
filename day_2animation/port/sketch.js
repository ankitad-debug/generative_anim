let X;
let Y;
function setup() {
  createCanvas(400, 400);
  x=0;
  y=400;
}

function drawGrid() {
  stroke(50);

  //find number of segmentation first
  let segX = (width / 100) * 10;
  let segY = (height / 100) * 10;

  //find width of one segment
  let xW = width / segX;
  let yW = height / segY;

  //draw Columns - loop
  for (let i = 0; i < segX; i++) {
    //change line stroke weight
    strokeWeight(0.4);

    //change stroke width on every 10th line
    if (i % 10 == 0) {
      strokeWeight(2);
    }
    line(xW * i, 0, yW * i, height);
  }

  //draw rows - loop
  for (let i = 0; i < segY; i++) {
    //change line stroke weight
    strokeWeight(0.4);

    //change stroke width on every 10th line
    if (i % 10 == 0) {
      strokeWeight(2);
    }
    line(0, yW * i, width, yW * i);
  }

  stroke(255);
}
function draw() {
  //grid
  
  
  background(237, 159, 204);
  
  
  
  //drawing an ellipse below
  noStroke();
  fill(255, 232, 212);
  rect(130,210,20,30,50,10,10);
  //left ear
  fill (255, 232, 212);
  rect(270,210,20,30,20,50,20,20);
  //right ear
  fill(31, 5, 12)
  rect(130,140,150,200,20,20,20,20)
  fill(255, 232, 212);
  rect(150,150,120,120,50,20,20,20);
  //face shape,x, y, width, height, a,b,c,d
  
  fill(31, 5, 12),
  rect(150,150,120,5)
  fill(31, 5, 12);
  rect(148,150,32,50,5,0,5,0);
  fill(31, 5, 12);
  rect(180,150,20,50,0,0,5,0);
  fill(31, 5, 12);
  rect(200,150,40,50,0,0,400,0);
  fill (31, 5, 12);
  rect (253,150,20,50,0,5,0,400);
  //hair x,y,width,hight,a,b,c,d
  
  
  ellipse(180+mouseX/50,225,10,10);
  //left eye
  ellipse(240+mouseX/50,225,10,10);
  fill(250, 172, 209)
  
  ellipse(170,240,20,10);
  ellipse(252,240,20,10);
  
  noFill();
  stroke(0);
  strokeWeight(2);

  //lips
  arc(207,240,10,20,1,160);
  arc(215,240,10,20,0,260);

  //eyebrow
  arc(173,216,30,10,0,90);
  arc(240,211,20,20,180,0);
  
  stroke(mouseX, mouseY, 200);
  strokeWeight(4);
  fill(222, 47, 31,80)
  triangle(180, 155, 210, 130, 150, 130);
  triangle(240, 155, 270, 130, 210, 130);
  
  
  //drawGrid();
}


