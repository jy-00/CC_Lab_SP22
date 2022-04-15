//3.30 Version: lightning improvement

let particles1 = [];
let cracks = [];
let smokes = [];
let lightnings = [];
let lightningsLength = [];
let co1 = ["#f3d338", "#de3202"]; //,"#e3210a","#6a2136"
let co2 = ["#f8ef3d", "#e16903", "#740718", "#ce9800", "#f1ba17"];
let crackColor = [
  "#f8ef3d",
  "#e16903",
  "#ce9800",
  "#f1ba17",
  "#d4220e",
  "#eeef31",
  "#fc591c",
];
let volcanoHorzitonalDistance = 28;
let cloudX = 22;
let cloudY = 242;
let cloudX2 = 835;
let cloudY2 = 308;
let mountHt, moonRad, outerMoonOpacity;

let backgroundColor = [108, 46, 37];
// let backgroundColor = [6,57,112];

function setup() {
  createCanvas(900, 600);
  background(backgroundColor, 60);

  mountHt = 310;

  //background mountains
  backMount2();
  backMount1();

  //volcano
  drawVolcano();
}

function draw() {
  background(backgroundColor, 60);

  //optional text message
  /*push();
  fill(245);
  strokeWeight(1);
  text("Click on the particles to speed them up :)", 10, 25);
  pop();
  */

  //background mountains 1& 2, moon, & cloud
  drawMoon();
  backMount2();
  backMount1();
  drawCloud();

  /* coordinates for me to draw
  if (mouseIsPressed) {
    console.log("vertex(" + mouseX + "," + mouseY + ");");
    fill(255);
    circle(mouseX, mouseY, 2);
  }
  */

  //putting smoke behind the volcano
  drawSmokes();
  drawVolcano();
  drawVolcanoParticles();
  drawCracks();
  drawLightnings();
}
/*--------------------Background Elements-----------------*/
function drawVolcano() {
  //volcano
  fill(94, 29, 48);
  noStroke();
  quad(
    width * 0.1,
    height,
    width / 2 - volcanoHorzitonalDistance,
    mountHt,
    width / 2 + volcanoHorzitonalDistance,
    mountHt,
    width * 0.9,
    height
  );
}
function backMount2() {
  //backMount c
  push();
  fill("#cac9e9");
  beginShape();
  vertex(1, 141);
  vertex(120, 127);
  //vertex(185, 218);
  vertex(255, 288);
  //vertex(286, 237);
  vertex(365, 288);
  vertex(426, 233);
  vertex(581, 132);
  vertex(663, 156);
  vertex(811, 132);
  vertex(872, 52);
  vertex(897, 63);
  vertex(900, 0);
  vertex(900, 600);
  vertex(0, 600);
  endShape();
  pop();
}
function backMount1() {
  //backMount b
  push();
  fill("#c33124");
  beginShape();
  vertex(0, 410);
  vertex(0, 448);
  vertex(65, 407);
  vertex(144, 328);
  vertex(210, 396);
  vertex(320, 430);
  vertex(396, 468);
  vertex(510, 423);
  vertex(603, 292);
  vertex(640, 209);
  vertex(648, 94);
  vertex(696, 33);
  vertex(748, 47);
  vertex(771, 151);
  vertex(797, 189);
  vertex(818, 192);
  vertex(878, 60);
  vertex(893, 4);
  vertex(900, 0);
  vertex(900, 600);
  vertex(0, 600);
  endShape();
  pop();

  //backMount a
  push();
  fill("#e45f41");
  beginShape();
  vertex(0, 410);
  vertex(12, 393);
  vertex(58, 357);
  vertex(113, 382);
  vertex(161, 436);
  vertex(215, 461);
  vertex(330, 373);
  vertex(409, 378);
  vertex(520, 325);
  vertex(615, 411);
  vertex(691, 473);
  vertex(734, 452);
  vertex(770, 392);
  vertex(825, 376);
  vertex(875, 404);
  vertex(896, 424);
  vertex(900, 450);
  vertex(900, 600);
  vertex(0, 600);
  endShape();
  pop();
}
function drawMoon() {
  moonRad = 70;

  let moonX = 314 + sin(frameCount * 0.02) * 200;
  let moonY = 320 + cos(frameCount * 0.02) * 200;
  //can it just do half the clock?

  //moon
  push();
  fill(242, 255, 255);
  circle(moonX, moonY, moonRad);
  pop();

  //shadow inner ring
  let freq = frameCount * 0.02;
  let newMoonRad = map(sin(freq), -1, 1, moonRad, moonRad + 10);

  //shadow outer ring
  let newMoonRad2 = map(sin(freq), -1, 1, newMoonRad, newMoonRad + 10);

  //decreasing opcacity
  for (let i = newMoonRad2; i >= 0; i--) {
    outerMoonOpacity = 90;
    outerMoonOpacity *= 0.5;
  }
  

  //display
  push();
  fill(245, outerMoonOpacity);
  circle(moonX, moonY, newMoonRad);
  circle(moonX, moonY, newMoonRad2);
  //I think random also gives that shining effect
  pop();
}
function drawCloud() {
  //cloud moves from left to right and back
  let cloudXspd = sin(frameCount * 0.01) * 0.7;
  cloudX += cloudXspd;
  cloudX2 += cloudXspd;
  let cloudRad = 100;

  push();
  fill("#e3e1ea");
  noStroke();
  circle(cloudX, cloudY, cloudRad);
  circle(cloudX + 40, cloudY, cloudRad * 0.8);
  circle(cloudX - 40, cloudY, cloudRad * 0.8);
  circle(cloudX + 70, cloudY, cloudRad * 0.5);
  circle(cloudX - 70, cloudY, cloudRad * 0.5);
  //circle(cloudX + 90, cloudY, cloudRad*0.3);
  //circle(cloudX - 90, cloudY, cloudRad * 0.3);
  pop();

  push();
  fill("#e7ada7");
  noStroke();
  circle(cloudX2, cloudY2, cloudRad);
  circle(cloudX2 + 40, cloudY2, cloudRad * 0.8);
  circle(cloudX2 - 40, cloudY2, cloudRad * 0.8);
  circle(cloudX2 + 70, cloudY2, cloudRad * 0.5);
  circle(cloudX2 - 70, cloudY2, cloudRad * 0.5);
  //circle(cloudX2 + 90, cloudY2, cloudRad*0.3);
  //circle(cloudX2 - 90, cloudY2, cloudRad * 0.3);
  pop();
}
/*-----------------------Particle 1-----------------------*/
function drawVolcanoParticles() {
  //creates particles to the array
  if (random() < 0.3) {
    particles1.push(
      new Particle1(
        random(
          width / 2 - volcanoHorzitonalDistance - 0.1,
          width / 2 + volcanoHorzitonalDistance - 0.1
        ),
        mountHt,
        random(1, 12)
      )
    );
  }

  //runs through the array calling actions
  for (let i = 0; i < particles1.length; i++) {
    let p1 = particles1[i];
    p1.move();
    p1.fall();
    p1.checkPlace();
    p1.checkEdges();
    p1.checkMouse();
    p1.display();
  }
  //console.log(particles1.length);

  //if the num of particles exceeds 570, true: splice
  while (particles1.length > 570) {
    particles1.splice(0, 1);
  }

  //checks if the p is out of image, true: splice
  for (let i = particles1.length - 1; i >= 0; i--) {
    let p1 = particles1[i];
    if (p1.isDone) {
      particles1.splice(i, 1);
    }
  }

  /*display text; for testing
  push();
  fill(255);
  text(particles1.length, 10, 20);
  pop();
  */
}
// ***
class Particle1 {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.xSpd = random(-5, 5);
    this.ySpd = random(-13, -5);
    this.isDone = false;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  fall() {
    this.ySpd += 0.5;
  }
  checkEdges() {
    //if out of picture, splice
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  checkPlace() {
    //if out of a specific range, decrease in size
    if (this.x < width * 0.35 || this.x > width * 0.65) {
      this.rad *= 0.9;
    } else if (this.y > height * 0.875) {
      this.rad *= 0.9;
    }
  }
  checkMouse() {
    //if clicks on the particles, speeds them up!
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseIsPressed && distance < this.rad) {
      //if mouse clicks on the particle, speeds up
      this.xSpd *= 2;
      this.ySpd *= 2;
    }
  }
  display() {
    push();
    noStroke();
    fill(random(co1));
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}
/*--------------------------Crack-------------------------*/
function drawCracks() {
  //creates cracks to the array from volcano top to bottom
  if (random() < 0.02) {
    cracks.push(
      new Crack(
        random(
          width / 2 - volcanoHorzitonalDistance - 0.1,
          width / 2 + volcanoHorzitonalDistance - 0.1
        ),
        mountHt
      )
    );
  }
  //console.log(cracks.length);

  //runs through the array calling actions
  for (let i = 0; i < cracks.length; i++) {
    let c = cracks[i];
    c.grow();
    //c.checkEdges();
    c.display();
  }

  //if the num of cracks exceeds a num, true: splice
  while (cracks.length > 25) {
    cracks.splice(0, 1);
  }

  //if crack reaches edge, true: splice
  for (let i = cracks.length - 1; i >= 0; i--) {
    let c = cracks[i];
    if (c.isDone) {
      cracks.splice(i, 1);
    }
  }
}
// ***
class Crack {
  constructor(initX, initY) {
    let secondX = initX + random(-2, 2) * 3;
    let secondY = initY + random(1, 3) * 10;
    this.x = [initX, secondX];
    this.y = [initY, secondY];
    this.thickness = random(1, 2);
    this.color = random(crackColor);
    this.isDone = false;
  }
  grow() {
    //adds more line segments to existing cracks; gets thicker over time
    if (random() < 0.01) {
      let lastIndex = this.x.length - 1;
      let lastX = this.x[lastIndex];
      let lastY = this.y[lastIndex];
      this.x.push(lastX + random(-1, 1) * 10);
      this.y.push(lastY + random(1, 3) * 10);
      this.thickness *= 1.025;
    }
  }
  checkEdges() {
    //if out of picture, splice
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    for (let i = 1; i < this.x.length; i++) {
      stroke(this.color);
      strokeWeight(this.thickness);
      line(this.x[i - 1], this.y[i - 1], this.x[i], this.y[i]);
    }
    pop();
  }
}
/*-------------------------Smoke--------------------------*/
function drawSmokes() {
  //creates particles to the array
  if (random() < 0.4) {
    smokes.push(
      new Smoke(
        random(
          width / 2 - volcanoHorzitonalDistance - 0.1,
          width / 2 + volcanoHorzitonalDistance - 0.1
        ),
        mountHt,
        random(30, 70),
        -0.01,
        90
      )
    );
  }

  //runs through the array calling actions
  for (let i = 0; i < smokes.length; i++) {
    let s = smokes[i];
    s.acceleration();
    s.move();
    s.updateColor();
    s.checkEdges();
    s.updateLifespan();
    s.display();
  }

  //if the num of particles exceeds 150, true: splice
  while (smokes.length > 150) {
    smokes.splice(0, 1);
  }

  //checks if the p is out of image, true: splice
  for (let i = smokes.length - 1; i >= 0; i--) {
    let s = smokes[i];
    if (s.isDone) {
      smokes.splice(i, 1);
    }
  }
}
// ***
class Smoke {
  constructor(x, y, rad, acc, opa) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.xSpd = random(-2, 2);
    this.ySpd = random(-5, -3);
    this.acc = acc;
    //
    this.bri = 255;
    this.opa = opa;
    this.smokeDistance = mountHt;
    //
    this.lifespan = 1.0; // 100%
    this.lifeReduction = 0.01; //-1%
    this.isDone = false;
  }
  move() {
    // moves to left/right && up
    this.x += this.xSpd;
    this.y += this.ySpd;
    // zigzag
    this.x += random(-5, 5);
  }
  updateLifespan() {
    //decreases lifespan and splce when lifespan = 0
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  acceleration() {
    //goes up faster as time progresses
    this.ySpd += this.acc;
    this.acc *= 1.02;
  }
  updateColor() {
    /*110, 40, 51: dark purplish brown smoke
    this.bri: white smoke
    235,34,3: red smoke
    122,91,80: deep brown smoke
    */
    this.r = 189 * this.lifespan;
    this.g = 173 * this.lifespan;
    this.b = 168 * this.lifespan;
    //this.bri = 255 * this.lifespan;
  }
  checkEdges() {
    //if out of picture, splice
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    noStroke();
    //fill(this.bri, this.opa * this.lifespan);
    fill(this.r, this.g, this.b, this.opa * this.lifespan);
    circle(this.x, this.y, this.rad * 2 * this.lifespan);
    pop();
  }
}
/*-----------------------Lightning------------------------*/
function drawLightnings() {
  //creates lightnings to the array
  if (lightnings.length < 3 && random() < 0.05) {
    lightnings.push(new Lightning(random(width), 0));
  }

  //runs through the array calling actions
  for (let i = 0; i < lightnings.length; i++) {
    let l = lightnings[i];
    l.grow();
    //l.updateColor();
    l.updateLifespan();
    l.checkEdges();
    l.display();
  }

  //if the num of particles exceeds a num, true: splice
  if (lightnings.length > 3) {
    lightnings.splice(0, 1);
  }

  //checks if the element is out of image, true: splice
  for (let i = lightnings.length - 1; i >= 0; i--) {
    let l = lightnings[i];
    if (l.isDone) {
      lightnings.splice(i, 1);
    }
  }
}
// ***
class Lightning {
  constructor(initX, initY) {
    let secondX = initX + random(-2, 2) * 3;
    let secondY = initY + random(1, 3) * 10;
    this.x = [initX, secondX];
    this.y = [initY, secondY];

    //random length (num of segements) for each lightning
    this.len = random(5, 30);

    this.r = 202;
    this.g = 153;
    this.b = 223;
    this.opa = 255;
    this.thickness = 6;
    //
    this.isDone = false;
    this.lifeSpan = 1.0;
    this.lifeReduction = 0.01;
  }
  updateLifespan() {
    //console.log(this.lifeSpan);

    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  grow() {
    for (let i = 0; i < this.len; i++) {
      let lastIndex = this.x.length - 1;
      let lastX = this.x[lastIndex];
      let lastY = this.y[lastIndex];
      this.x.push(lastX + random(-1, 1) * 20);
      this.y.push(lastY + random(1, 3) * 10);
    }
  }
  checkEdges() {
    //if out of picture, splice
    if (this.x < 0 || this.x >= width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y >= height) {
      this.isDone = true;
    }
  }
  updateColor() {
    //Q: this is not working but +=0.1 in display() is working
    //this.r += 0.1;
    //this.g += 0.1;
    //this.b += 0.1;
    //this.opa *= this.lifespan;
    /* this is not working
    if (this.g < 255){
      this.opa -= 10;
    }
    else{
      this.opa = 0;
    }
    */
  }
  display() {
    push();
    for (let i = 1; i < this.x.length; i++) {
      //stroke((this.r += 0.1), (this.g += 0.1), (this.b += 0.1), this.opa);
      stroke(this.r, this.g, this.b, this.opa);
      strokeWeight(this.thickness);
      line(this.x[i - 1], this.y[i - 1], this.x[i], this.y[i]);
      this.thickness *= 0.9; // *** amazing!
      this.opa *= 0.9;
    }
    pop();
  }
}
