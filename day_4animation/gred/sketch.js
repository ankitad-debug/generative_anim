let gSize=50
let colours = ["#FFA6A6", "#FF7070", "#FFEDC7"]
function setup() {
 createCanvas(innerWidth,innerHeight);
 frameRate(10);
}

function draw() {
 /*let choice = floor(random(0,3));
 fill(colours[choice]);
 ellipse(200,200,200);*/

 background(220);
 for(let x=0; x<width; x+=gSize){
  for (let y=0; y<height; y+=gSize) {
    let choice = floor(random(0,colours.length));
    fill(colours[choice])
    rect(x,y,gSize);
  }
 }
}
