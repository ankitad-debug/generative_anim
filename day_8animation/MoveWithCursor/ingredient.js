class Ingredient {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isGrabbed = false;
  }
  draw() {
    ellipse(this.x, this.y, this.size);
  }
  move() {
    this.x = mouseX;
    this.y = mouseY;
  }
  grab() {
    this.isGrabbed = true;
  }
  release() {
    this.isGrabbed = false;
  }
}