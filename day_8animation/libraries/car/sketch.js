let cars = [];
let lightState = "NS"; // NS = North-South green, EW = East-West green
let spawnTimer = 0;
let score = 0;
let stress = 0;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
}

function draw() {
  background(30);

  drawRoad();
  drawTrafficLight();

  spawnTimer++;
  if (spawnTimer > 60) {
    spawnCar();
    spawnTimer = 0;
  }

  for (let i = cars.length - 1; i >= 0; i--) {
    cars[i].update();
    cars[i].show();

    // Remove cars that leave screen
    if (cars[i].offscreen()) {
      score++;
      cars.splice(i, 1);
    }
  }

  checkCollisions();
  drawUI();
}

function keyPressed() {
  if (key === " ") {
    lightState = lightState === "NS" ? "EW" : "NS";
  }
}

function drawRoad() {
  fill(60);
  rect(width / 2, height / 2, 200, height);
  rect(width / 2, height / 2, width, 200);
}

function drawTrafficLight() {
  fill(0);
  rect(width / 2 - 60, height / 2 - 60, 20, 40);

  if (lightState === "NS") {
    fill("green");
  } else {
    fill("red");
  }
  ellipse(width / 2 - 60, height / 2 - 70, 15);

  if (lightState === "EW") {
    fill("green");
  } else {
    fill("red");
  }
  ellipse(width / 2 - 60, height / 2 - 50, 15);
}

function spawnCar() {
  let dir = floor(random(4));
  cars.push(new Car(dir));
}

function checkCollisions() {
  for (let i = 0; i < cars.length; i++) {
    for (let j = i + 1; j < cars.length; j++) {
      if (dist(cars[i].x, cars[i].y, cars[j].x, cars[j].y) < 20) {
        stress++;
      }
    }
  }
}

function drawUI() {
  fill(255);
  textSize(18);
  text("Score: " + score, 20, 30);
  text("Stress: " + stress, 20, 60);
}

class Car {
  constructor(dir) {
    this.dir = dir;
    this.speed = 2;
    this.size = 20;

    if (dir === 0) { // from top
      this.x = width / 2 - 40;
      this.y = 0;
    } else if (dir === 1) { // from bottom
      this.x = width / 2 + 40;
      this.y = height;
    } else if (dir === 2) { // from left
      this.x = 0;
      this.y = height / 2 + 40;
    } else { // from right
      this.x = width;
      this.y = height / 2 - 40;
    }
  }

  update() {
    // Stop at red light near center
    if (this.dir === 0) {
      if (this.y > height/2 - 60 && lightState !== "NS") return;
      this.y += this.speed;
    }
    if (this.dir === 1) {
      if (this.y < height/2 + 60 && lightState !== "NS") return;
      this.y -= this.speed;
    }
    if (this.dir === 2) {
      if (this.x > width/2 - 60 && lightState !== "EW") return;
      this.x += this.speed;
    }
    if (this.dir === 3) {
      if (this.x < width/2 + 60 && lightState !== "EW") return;
      this.x -= this.speed;
    }
  }

  show() {
    fill(200, 100, 100);
    rect(this.x, this.y, this.size, this.size);
  }

  offscreen() {
    return (
      this.x < -50 || 
      this.x > width + 50 || 
      this.y < -50 || 
      this.y > height + 50
    );
  }
}
