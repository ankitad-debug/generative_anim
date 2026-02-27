let divisions=20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  background(15);
}

  function mouseDragged() {
    stroke(mouseX,mouseY,220);
    strokeWeight(5);
   
    push();

    translate(width/2,height/2);
    for(let i=0; i<divisions; i+=1) {
      rotate(20);
      line(mouseX-width/2, mouseY-height/2, pmouseX-width/2, pmouseY-height/2);
      
    }

    pop();
  }

