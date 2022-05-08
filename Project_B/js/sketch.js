let imgBgBw, imgBgCol;
let imgSun;
let imgBoat;
let imgCloud;

let sun;

let mtChecked;
let scaleMt = 0.7;

let clouds = [];
let cloudsB = [];

let ripples = [];
let rippleCol;

let bgmMusic = [];
let bgm;
let bgmLevel = 1.0;
let bgmPan = 0.0;
let boatSound;
let sounds = [];

let sunIndex = 0;

function preload() {
  //Background Images in b&w and in color
  imgBgBw = loadImage("visual/background_bw.png");
  imgBgCol = loadImage("visual/background.png");

  //Sun, cloud, and boat image
  imgSun = loadImage("visual/sun.gif");
  imgCloud = loadImage("visual/cVisual/cloud.png");
  imgBoat = loadImage("visual/cVisual/boat.png");

  //Mountain on the left
  imgMtL_Bw1 = loadImage("visual/bVisual/mount2a.png");
  imgMtL_Col1 = loadImage("visual/cVisual/mount2a.png");
  imgMtL_Bw2 = loadImage("visual/bVisual/mount2b.png");
  imgMtL_Col2 = loadImage("visual/cVisual/mount2b.png");
  imgMtL_Bw3 = loadImage("visual/bVisual/mount2c.png");
  imgMtL_Col3 = loadImage("visual/cVisual/mount2c.png");

  //Mountain on the right
  imgMtR_Bw1 = loadImage("visual/bVisual/mount1a.png");
  imgMtR_Col1 = loadImage("visual/cVisual/mount1a.png");
  imgMtR_Bw2 = loadImage("visual/bVisual/mount1b.png");
  imgMtR_Col2 = loadImage("visual/cVisual/mount1b.png");
  imgMtR_Bw3 = loadImage("visual/bVisual/mount1c.png");
  imgMtR_Col3 = loadImage("visual/cVisual/mount1c.png");

  //8 sounds for mountain interactions
  sndmt1a = loadSound("sounds/Mountain/mt1a.mp3");
  sndmt1b = loadSound("sounds/Mountain/mt1b.mp3");
  sndmt1c = loadSound("sounds/Mountain/mt1c.mp3");
  sndmt1c_click = loadSound("sounds/Mountain/mt1c_click.mp3");
  sndmt2a = loadSound("sounds/Mountain/mt2a.mp3");
  sndmt2b = loadSound("sounds/Mountain/mt2b.mp3");
  sndmt2c = loadSound("sounds/Mountain/mt2c.mp3");
  sndmt2c_click = loadSound("sounds/Mountain/mt2c_click.mp3");

  //Sound for moving the boat
  boatSound = loadSound("sounds/Other/boat.mp3");

  //BGM
  bgmMusic.push(loadSound("sounds/BGM/BGM0.m4a")); //bgm0
  bgmMusic.push(loadSound("sounds/BGM/BGM1.mp3")); //bgm1
  bgmMusic.push(loadSound("sounds/BGM/BGM2.mp3")); //bgm2
}

function setup() {
  let canvas = createCanvas(900, 506);
  canvas.parent("sketch");
  // createCanvas(900, 506);
  
  rippleCol = "#84807A";
  //button
  //buttonCreation();

  // Background image sets to b&w
  backImage = imgBgBw;

  //Sun
  sun = new ImageObject(792, 42, 0.2, 0.8, imgSun, imgSun);

  //Mountain L
  mountainL1 = new ImageObject(
    31,
    287,
    scaleMt,
    0.8,
    imgMtL_Bw1,
    imgMtL_Col1,
    sndmt2a
  );
  mountainL2 = new ImageObject(
    158,
    299,
    scaleMt,
    0.7,
    imgMtL_Bw2,
    imgMtL_Col2,
    sndmt2b
  );
  mountainL3 = new ImageObject(
    240,
    322,
    scaleMt,
    0.6,
    imgMtL_Bw3,
    imgMtL_Col3,
    sndmt2c,
    sndmt2c_click
  );

  //Mountain R
  mountainR1 = new ImageObject(
    538,
    140,
    scaleMt,
    0.8,
    imgMtR_Bw1,
    imgMtR_Col1,
    sndmt1a
  );
  mountainR2 = new ImageObject(
    680,
    128,
    scaleMt,
    0.8,
    imgMtR_Bw2,
    imgMtR_Col2,
    sndmt1b
  );
  mountainR3 = new ImageObject(
    820,
    180,
    scaleMt,
    0.8,
    imgMtR_Bw3,
    imgMtR_Col3,
    sndmt1c,
    sndmt1c_click
  );

  //Cloud
  clouds.push(new ImageObject(43, 296, 0.8, 0.5, imgCloud, imgCloud));
  clouds.push(new ImageObject(790, 140, 0.7, 0.8, imgCloud, imgCloud));
  clouds.push(new ImageObject(695, 500, 1.0, 0.8, imgCloud, imgCloud));

  //Cloud B: Transluscent clouds that disappear when hovered
  push();
  tint(255, 100);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let scl = random(0.5, 1.5);
    cloudsB.push(new ImageObject(x, y, scl, 0.8, imgCloud, imgCloud));
  }
  pop();

  //boat
  boat = new ImageObject(331, 384, 0.5, 0.8, imgBoat, imgBoat);
}

function draw() {
  
  //checks if all mountains have been clicked
  mtChecked =
    mountainL1.state == 2 &&
    mountainL2.state == 2 &&
    mountainL3.state == 2 &&
    mountainR1.state == 2 &&
    mountainR2.state == 2 &&
    mountainR3.state == 2;

  //show BGM & background
  playBgmMusic();
  displayBackground();

  //ripples, sun
  drawRipples();
  displaySun();

  //smaller mountain actions
  mountainL1.checkMouse();
  mountainL1.display();
  mountainL2.checkMouse();
  mountainL2.display();
  mountainL3.checkMouse();
  mountainL3.display();

  mountainR1.checkMouse();
  mountainR1.display();
  mountainR2.checkMouse();
  mountainR2.display();
  mountainR3.checkMouse();
  mountainR3.display();

  //cloud B actions
  for (let c of cloudsB) {
    push();
    tint(255, 130);
    c.swing();
    c.checkMouse();

    //if cloud B is hovered, disappear!
    if (c.state < 1) {
      c.display();
    }
    pop();
  }
  
  //cloud actions
  for (let c of clouds) {
    c.swing();
    
    //if clicked, shake position
    if(c.state == 2){
      c.shake();
    }
    c.checkMouse();
    c.display();
  }
  
  displayBoat();
  //console.log(ripples.length);
}

function playBgmMusic() {
  bgm = bgmMusic[sunIndex];
  if (!bgm.isPlaying()) {
    bgm.setVolume(bgmLevel);
    bgm.pan(bgmPan);
    bgm.loop();
    //console.log(bgm);
  }
}

function displayBackground() {
  //console.log(mountainL1.state, mountainR1.state);
  //if all the mountains have been clicked, change background image to the color version
  if (mtChecked) {
    backImage = imgBgCol;
  }

  //background image setting
  push();
  imageMode(CORNER);
  image(backImage, 0, 0, width, height);
  pop();
}

function displaySun() {
  //if all the mountains have been clicked, display sun
  if (mtChecked) {
    sun.checkMouse();
    sun.display();
  }
}

function displayBoat() {
  //if all the mountains have been clicked, display boat; changes the ripple color
  if (mtChecked) {
    boat.drag();
    boat.checkPlace();
    boat.display();
    rippleCol = "#F7EFE3";

    //generates ripples
    if (random() < 0.05) {
      ripples.push(new Ripple(boat.x, boat.y+30, 150, 30));
    }
    
    //using boat's position to manipulate BGM sound
    bgmLevel = map(boat.y, 0, height, 1.0, 0.0, true);
    bgmPan = map(boat.x, 0, width, -1.0, 1.0, true);
    //console.log (bgmLevel, bgmPan);
  }
}

function mousePressed() {
  sunClicked();
  //console.log(mouseX + ", " + mouseY);
}

function sunClicked() {
  //changes bgm if the sun is clicked
  let sunDist = dist(sun.x, sun.y, mouseX, mouseY);
  let sunRad = 66;

  //console.log(sunDist);

  //test if the the mouse in on the sun
  if (sunDist <= sunRad) {
    bgm.stop();
    sunIndex++;

    //console.log(frameCount + ": " + sunIndex);
    // bgm = bgmMusic[sunIndex];
    if (sunIndex > bgmMusic.length - 1) {
      sunIndex = 0;
    }
  }
}

class ImageObject {
  constructor(x, y, scale, areaAdj, imgBw, imgCol, sndHover, sndClicked) {
    this.state = 0;
    /*
      0: no interaction yet
      1: mouse hovered
      2: mouse clicked
    */
    this.img = imgBw;
    this.imgBw = imgBw;
    this.imgCol = imgCol;
    this.snd1 = sndHover;
    this.snd2 = sndClicked;
    this.x = x;
    this.y = y;
    
    //for clouds
    this.xSpd = 0;
    this.ySpd = 0;
    this.swingFreqX = random(0.025, 0.035);
    this.swingFreqY = random(0.015, 0.015);
    this.scale = scale;
    
    //creates detection areas based on img width or height
    if (this.img.width >= this.img.height) {
      this.rad = (this.img.width / 2) * areaAdj;
    } else {
      this.rad = (this.img.height / 2) * areaAdj;
    }
  }
  drag() {
    //if boat is pressed, play boat sound
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad * this.scale) {
      if (mouseIsPressed) {
        this.x = mouseX;
        this.y = mouseY;

        //console.log(mouseX, pmouseX);
        if (!boatSound.isPlaying()) {
          boatSound.loop();
        }
      } else {
        boatSound.pause();
      }
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  swing() {
    this.xSpd = sin(frameCount * this.swingFreqX) * 0.2;
    this.ySpd = sin(frameCount * this.swingFreqY) * 0.1;
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  shake(){
    this.xSpd = this.xSpd * 2;
    this.state = 0;
  }
  checkMouse() {
    //checks to see if the detection area is done nothing on, hovered, or clicked
    
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad * this.scale) {
      if (this.state == 0) {
        this.state = 1;
      }

      // state 1: hovered; checks if there is a sound input; controls sound level with mouse
      if (this.snd1 != undefined) {
        if (!this.snd1.isPlaying()) {
          this.snd1.play();
        }
        let level = map(distance, 0, this.rad * this.scale, 1.0, 0.0, true);
        this.snd1.setVolume(level);
      }

      //state 2: clickedd; checks if there is a sound input; changes b&w image to color image
      if (mouseIsPressed) {
        this.state = 2;
        this.img = this.imgCol;
        if (this.snd2 != undefined) {
          if (!this.snd2.isPlaying()) {
            this.snd2.play();
          }
        }
      }
    }
    
    //if mouse is out of area, pause sound
          else {
        if (this.snd1 != undefined) {
          this.snd1.pause();
        }
        if (this.snd2 != undefined){
          this.snd2.pause();
        }
      }
  }
  checkPlace() {
    //for boat; if boat is out of the canvas, bring it back to initial position!
    if (
      this.x < -10 ||
      this.x > width + 10 ||
      this.y < -10 ||
      this.y > height + 10
    ) {
      this.x = 331;
      this.y = 384;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
    //this.displayDetectingArea();
  }
  displayDetectingArea() {
    //for testing purposes
    push();
    translate(this.x, this.y);
    scale(this.scale);
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

function drawRipples() {
  //Generates ripples for the mountains
  if (frameCount % 120 == 0) {
    ripples.push(new Ripple(677, 208, 250, 25));
    ripples.push(new Ripple(677, 208, 300, 50));
    ripples.push(new Ripple(120, 402, 150, 35));
    ripples.push(new Ripple(120, 402, 300, 70));
  }

  //runs through the array, calling actions
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    r.expand();
    r.updateLifespan();
    r.updateColor();
    r.display();

    if (r.isDone) {
      ripples.splice(i, 1);
    }
  }
  
  //limites the number of ripples generated
  while (ripples.length > 100) {
    ripples.splice(0, 1);
  }
}
class Ripple {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sw = 2;

    this.eSpeed = random(1.004, 1.005); //expansion speed
    this.col = rippleCol;
    this.opa = 255;

    this.isDone = false;
    this.lifespan = 1.0;
    this.lifeReduction = random(0.005, 0.012);
  }
  updateLifespan() {
    //decreases lifespan and splce when lifespan == 0
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  expand() {
    //expands the ripple's size
    this.w *= this.eSpeed;
    this.h *= this.eSpeed;
  }
  updateColor() {
    // this.r = 229;
    // this.g = 202;
    // this.b = 205;
    this.sw = map(this.lifespan, 1.0, 0.0, 2, 0, true);
    this.opa = map(this.lifespan, 1.0, 0.0, 255, 0, true);
  }
  display() {
    push();
    noFill();
    let r = red(rippleCol);
    let g = green(rippleCol);
    let b = blue(rippleCol);
    stroke(r, g, b, this.opa);
    strokeWeight(this.sw);
    ellipse(this.x, this.y, this.w, this.h);
    pop();
  }
}

function buttonCreation() {
  push();
  button = createButton("Save Work");
  button.position(800, 460);
  button.mousePressed(saveWork);
  button.style("font-size", "12 px");
  let buttonCol = "#717285";
  button.style("background-color", buttonCol);
  pop();
}
function saveWork() {
  saveCanvas("Flow of You", "png");
}
