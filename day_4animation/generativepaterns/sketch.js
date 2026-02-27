let gSize=100
let colours = ["#FFA6A6", "#FF7070", "#FFEDC7"]

let gridImages = [];

function preload(){
gridImages[0] = loadImage("./assets_2/IMG_1170.png")
gridImages[1] = loadImage("./assets_2/IMG_1171.png")
gridImages[2] = loadImage("./assets_2/IMG_1172.png")
gridImages[3] = loadImage("./assets_2/IMG_1173.png")
}

function setup() {
 createCanvas(innerWidth,innerHeight);
 frameRate(5);
}

function draw() {
 /*let choice = floor(random(0,3));
 fill(colours[choice]);
 ellipse(200,200,200);*/

 background(220);
 for(let x=0; x<width; x+=gSize){
  for (let y=0; y<height; y+=gSize) {
    let choice = floor(random(0,colours.length));
    image(gridImages[choice], x,y,gSize, gSize);
  }
 }
}