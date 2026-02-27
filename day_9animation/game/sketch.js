let slots = [];
let slotCount = 6;
let slotCapacity = 4;
let selectedSlot = -1;
let foodImages = [];

let winImage;
let loseImage;

let popupY;
let popupTargetY;
let popupActive = false;

let won = false;
let gameOver = false;

let winFrontImage;

let frontPopupY;
let frontPopupTargetY;
let frontPopupActive = false;

let winReachedCenterTime = 0;

let placeSound;
let matchSound;
let winSound;
let loseSound;

//Score + Timer
let score = 0;
let startTime;
let timeLimit = 40; // seconds

function preload() {
  foodImages[0] = loadImage("./assets_2/IMG_1188.png");
  foodImages[1] = loadImage("./assets_2/IMG_1189.png");
  foodImages[2] = loadImage("./assets_2/IMG_1190.png");
  foodImages[3] = loadImage("./assets_2/IMG_1191.png");

  bgImage = loadImage("./assets_2/IMG_1196.png");

  winImage = loadImage("./assets_2/IMG_1193.png");
  loseImage = loadImage("./assets_2/IMG_1194.png");

  winFrontImage = loadImage("./assets_2/IMG_1192.png");

  placeSound = loadSound ("./assets_2/one_placed.mp3");
  matchSound = loadSound ("./assets_2/one_raw_done.mp3");
  winSound = loadSound ("./assets_2/win.mp3");
  loseSound = loadSound ("./assets_2/game_over.mp3");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  initGame();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function initGame() {
  slots = [];
  won = false;
  gameOver = false;
  selectedSlot = -1;
  score = 0;
  startTime = millis();

  popupActive=false;
  popupY = height + 300; // start below screen
  popupTargetY = height / 2;

  let items = [];

  for (let i = 0; i < foodImages.length; i++) {
    for (let j = 0; j < slotCapacity; j++) {
      items.push(i);
    }
  }

  shuffle(items, true);

  for (let i = 0; i < slotCount; i++) {
    slots.push([]);
  }

  let index = 0;
  for (let i = 0; i < slotCount - 2; i++) {
    for (let j = 0; j < slotCapacity; j++) {
      slots[i].push(items[index++]);
    }
  }
  frontPopupActive = false;
  frontPopupY = height + 300;
  winReachedCenterTime = 0;
}

function draw() {
  image(bgImage, width/2, height/2,width, height);

  let timeLeft = timeLimit - floor((millis() - startTime) / 1000);

  if (timeLeft <= 0 && !won && !gameOver) {
    gameOver = true;
    loseSound.play();
    popupActive = true;
    popupY = height + 300;
  }

  drawUI(timeLeft);
  drawSlots();
  drawPopup();

  if (won) {
    textSize(50);
    fill(0, 150, 0);
    text("YOU WIN!", width / 2, height * 0.15);
  }

  if (gameOver) {
    textSize(50);
    fill(200, 0, 0);
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
  let SPACING = width * 0.04;

  let totalWidth = slotCount * SLOT_WIDTH + (slotCount - 1) * SPACING;
  let startX = width / 2 - totalWidth / 2;
  let y = height / 2 - SLOT_HEIGHT / 2;

  for (let i = 0; i < slotCount; i++) {

    let x = startX + i * (SLOT_WIDTH + SPACING);

    stroke(0);
    strokeWeight(2);
    fill(i === selectedSlot ? "#ffeaa7" : "#ffffff");
    rect(x, y, SLOT_WIDTH, SLOT_HEIGHT, 20);

    for (let j = 0; j < slots[i].length; j++) {

      let imgIndex = slots[i][j];

      image(
        foodImages[imgIndex],
        x + SLOT_WIDTH / 2,
        y + SLOT_HEIGHT - (SLOT_HEIGHT * 0.15) - j * (SLOT_HEIGHT * 0.18),
        SLOT_WIDTH * 0.9,
        SLOT_WIDTH * 0.7
      );
    }
  }
}

function mousePressed() {
  if (won || gameOver) return;

  let SLOT_WIDTH = width * 0.08;
  let SLOT_HEIGHT = height * 0.6;
  let SPACING = width * 0.04;

  let totalWidth = slotCount * SLOT_WIDTH + (slotCount - 1) * SPACING;
  let startX = width / 2 - totalWidth / 2;
  let y = height / 2 - SLOT_HEIGHT / 2;

  for (let i = 0; i < slotCount; i++) {

    let x = startX + i * (SLOT_WIDTH + SPACING);

    if (
      mouseX > x &&
      mouseX < x + SLOT_WIDTH &&
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
    if (slots[index].length > 0) {
      selectedSlot = index;
    }
  } else {
    if (selectedSlot !== index) {
      moveItem(selectedSlot, index);
    }
    selectedSlot = -1;
  }
}

function moveItem(from, to) {
  if (slots[from].length === 0) return;
  if (slots[to].length >= slotCapacity) {
    score -= 2; // penalty
    return;
  }

  let item = slots[from][slots[from].length - 1];

  if (
    slots[to].length === 0 ||
    slots[to][slots[to].length - 1] === item
  ) {
    slots[to].push(slots[from].pop());
    score += 10;// reward
    
    placeSound.play();
    checkSlotMatch(to);
  } else {
    score -= 2; // penalty
  }
}

function checkSlotMatch (index) {
  if (slots[index].length === slotCapacity) {
    let first = slot[index][0];
    for (let item of slots[index]) {
      if (item !== first) return;
    }
    matchSound.play();
  }
}

function checkWin() {
  for (let slot of slots) {
    if (slot.length === 0) continue;

    let first = slot[0];

    for (let item of slot) {
      if (item !== first) return;
    }

    if (slot.length !== slotCapacity) return;
    
  }

  won = true;
  winSound.play();
  popupActive = true;
    popupY = height + 300;

  // Bonus points for time left
  let timeLeft = timeLimit - floor((millis() - startTime) / 1000);
  score += timeLeft * 5;
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    initGame();
  }
}
function drawPopup() {
  if (! popupActive) return;

  //Smooth slide animation
  popupY = lerp(popupY, popupTargetY, 0.08);

  //wen win popup reaches center, start timer
  if (won && abs(popupY - popupTargetY) < 5 && winReachedCenterTime === 0) {
    winReachedCenterTime = millis();
  }
  //after 2 seconds, activate front popup
  if (won && winReachedCenterTime !== 0) {
    if (millis() - winReachedCenterTime > 2000 && ! frontPopupActive) {
      frontPopupActive = true;
      //impoptant : reset starting position here
      frontPopupY = height + 300;

      frontPopupTargetY = popupTargetY + (height * 0.22); //slightly below win image
    }
  }
  
  let imgToShow;
  if (won) {
    imgToShow = winImage;
  } else if (gameOver) {
    imgToShow = loseImage;
  } else {
    return;
  }

  let popupWidth = width * 0.4;
  let ratio = imgToShow.width / imgToShow.height;

  image(
    imgToShow,
    width / 2,
    popupY,
    popupWidth,
    popupWidth / ratio
  );
  // draw secong popup
  if (frontPopupActive) {
    frontPopupY = lerp (frontPopupY, frontPopupTargetY, 0.08);

    let frontWidth = width * 0.4;
    let ratio = winFrontImage.width / winFrontImage.height;

    image(
      winFrontImage,
      width / 2,
      frontPopupY,
      frontWidth,
      frontWidth / ratio
    );
  }
}