function setup() {
  createCanvas(800, 400);
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
  background(120, 16, 0);
  
  noStroke();
  
  fill(171, 59, 43);
  ellipse(350,130,230);
  fill(204, 99, 84);
  ellipse(350,130,210);
  
  fill(8,1,0);
  ellipse(350,130,200);
  //blackhole
  
  fill(69, 11, 2)
  rect(0,240,800,250)
  //sea
  fill(26, 6, 3);
  rect(0,240,400,8,0,20,20,0);
  fill(26, 6, 3);
  rect(400,240,400,8,0,20,20,0);
  
  fill(8, 1, 0);
  ellipse(400,300,10,12);
  fill(8, 1, 0);
  rect(390,306,20,60,10);
  
  
  //drawGrid()
}