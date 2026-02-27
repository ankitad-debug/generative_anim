let slots = [];
let slotCount = 6;
let slotCapacity = 4;
let selectedSlot = -1;

let foodImages = [];
let slotImage;
let bgImage;

let winSound, loseSound, pickSound, placeSound;

let won = false;
let gameOver = false;

// 🎯 Score + Timer
let score = 0;
let startTime;
let timeLimit = 60;

// 🍔 Food size control
let foodScale = 0.9;

function preload() {
  // Food images
  foodImages[0] = loadImage("./assets_2/IMG_1188.png");
  foodImages[1] = loadImage("./assets_2/IMG_1189.png");
  foodImages[2] = loadImage("./assets_2/IMG_1190.png");
  foodImages[3] = loadImage("./assets_2/IMG_1191.png");

  // Slot + Background
  slotImage = loadImage("./assets_2/Untitled_Artwork(1).png");
  bgImage = loadImage("./assets_2/IMG_1196.png");

  // Sounds
  /*winSound = loadSound("sounds/win.mp3");
  loseSound = loadSound("sounds/lose.mp3");
  pickSound = loadSound("sounds/pick.mp3");
  placeSound = loadSound("sounds/place.mp3");*/
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  userStartAudio();
  initGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function initGame() {
  slots = [];
  won = false;
  gameOver = false;
  selectedSlot = -1;
  score = 0;
  startTime = millis();

  let items = [];

  for (let i = 0; i < foodImages.length; i++) {
    for (let j = 0; j < slotCapacity; j++) {
      items.push(i);
    }
  }

  shuffle(items, true);

  for (let i = 0; i < slotCount; i++) {
    slots.push({
      items: [],
      x: random(width * 0.05, width * 0.85),
      speed: random([-3, -2.5, 2.5, 3])
    });
  }

  let index = 0;
  for (let i = 0; i < slotCount - 2; i++) {
    for (let j = 0; j < slotCapacity; j++) {
      slots[i].items.push(items[index++]);
    }
  }
}

function draw() {

  // 🖼 Background
  image(bgImage, width / 2, height / 2, width, height);

  let timeLeft = timeLimit - floor((millis() - startTime) / 1000);

  if (timeLeft <= 0 && !won && !gameOver) {
    gameOver = true;
    loseSound.play();
  }

  drawUI(timeLeft);
  drawSlots();

  if (won) {
    textSize(50);
    fill(0, 200, 0);
    text("YOU WIN!", width / 2, height * 0.15);
  }

  if (gameOver) {
    textSize(50);
    fill(220, 0, 0);
    text("GAME OVER", width / 2, height * 0.15);
  }
}

function drawUI(timeLeft) {
  fill(0);
  textSize(24);
  text("Score: " + score, width * 0.2, height * 0.05);
  text("Time: " + max(timeLeft, 0), width * 0.8, height * 0.05);
}

function drawSlots() {

  let SLOT_WIDTH = width * 0.08;
  let SLOT_HEIGHT = height * 0.6;
  let y = height / 2 - SLOT_HEIGHT / 2;

  for (let i = 0; i < slotCount; i++) {

    let slot = slots[i];

    // Smooth movement
    slot.x += slot.speed;

    // Clean bounce
    if (slot.x <= 0) {
      slot.x = 0;
      slot.speed *= -1;
    }

    if (slot.x + SLOT_WIDTH >= width) {
      slot.x = width - SLOT_WIDTH;
      slot.speed *= -1;
    }

    // Highlight selected
    if (i === selectedSlot) {
      tint(255, 220);
    } else {
      noTint();
    }

    // Draw slot image
    image(
      slotImage,
      slot.x + SLOT_WIDTH / 2,
      y + SLOT_HEIGHT / 2,
      SLOT_WIDTH,
      SLOT_HEIGHT
    );

    noTint();

    // Draw food items
    for (let j = 0; j < slot.items.length; j++) {

      let imgIndex = slot.items[j];

      image(
        foodImages[imgIndex],
        slot.x + SLOT_WIDTH / 2,
        y + SLOT_HEIGHT - (SLOT_HEIGHT * 0.15) - j * (SLOT_HEIGHT * 0.18),
        SLOT_WIDTH * foodScale,
        SLOT_WIDTH * foodScale
      );
    }
  }
}

function mousePressed() {
  if (won || gameOver) return;

  let SLOT_WIDTH = width * 0.08;
  let SLOT_HEIGHT = height * 0.6;
  let y = height / 2 - SLOT_HEIGHT / 2;

  for (let i = 0; i < slotCount; i++) {

    let slot = slots[i];

    if (
      mouseX > slot.x &&
      mouseX < slot.x + SLOT_WIDTH &&
      mouseY > y &&
      mouseY < y + SLOT_HEIGHT
    ) {
      handleSlotClick(i);
      break;
    }
  }

  checkWin();
}

function handleSlotClick(index) {

  if (selectedSlot === -1) {

    if (slots[index].items.length > 0) {
      selectedSlot = index;
      pickSound.play();
    }

  } else {

    if (selectedSlot !== index) {
      moveItem(selectedSlot, index);
    }

    selectedSlot = -1;
  }
}

function moveItem(from, to) {

  if (slots[from].items.length === 0) return;

  if (slots[to].items.length >= slotCapacity) {
    score -= 2;
    return;
  }

  let item = slots[from].items[slots[from].items.length - 1];

  if (
    slots[to].items.length === 0 ||
    slots[to].items[slots[to].items.length - 1] === item
  ) {
    slots[to].items.push(slots[from].items.pop());
    score += 10;
    placeSound.play();
  } else {
    score -= 2;
  }
}

function checkWin() {

  for (let slot of slots) {

    if (slot.items.length === 0) continue;

    let first = slot.items[0];

    for (let item of slot.items) {
      if (item !== first) return;
    }

    if (slot.items.length !== slotCapacity) return;
  }

  won = true;

  let timeLeft = timeLimit - floor((millis() - startTime) / 1000);
  score += timeLeft * 5;

  winSound.play();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    initGame();
  }
}