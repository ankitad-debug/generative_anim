let flour;
function setup() {
  createCanvas(400, 400);
  flour = new Ingredient(100,100,50);
}

function draw() {
  background(220);
  flour.draw();
}

function mousePressed() {
  if(dist(mouseX, mouseY,flour.x, flour.y) < flour.size/2) {
    console.log("hello")
    flour.grab();
  }
}

function mouseReleased() {
  flour.release();
}

function mouseDragged() {
  if(flour.isGrabbed) {
    flour.move();
  }
}
