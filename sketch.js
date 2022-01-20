let rain = [];
let imagerain = [];
let drops = [];
let part;
var cnv, soundFile, fft, peakDetect;
var raintext = 0;


function preload() {
  soundFile = loadSound('assets/intherain.mp3');
  photo = loadImage('assets/badcombina.jpg')
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (soundFile.isPlaying() ) {
      soundFile.stop();
    } else {
      soundFile.loop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //console.log("RESIZED")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fade = 255
  lowh = height*0.3
  highh = height-lowh
  textFont('Helvetica')
  textStyle(BOLD);
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(30,108,0.9,30);
  }

function draw() {
  rainMask = createGraphics(1000,1000);
  fft.analyze();
  peakDetect.update(fft);

  lowh = height*0.3
  highh = height-lowh
  background("rgba(20,23,40,1)");
  photo.loadPixels();


  for (let rand = 0; rand < random(0,1); rand++){
    rain.push(new Rain());
    gen = random (1,100)
    if (gen >= 94) {
      drops.push(new Drops());
    }
  }

  if ( peakDetect.isDetected ) {
    for (let rand = 0; rand < 50; rand++){
      imagerain.push(new ImageRain());
    }
  } else {
  }



  makeimageRain()
  photo.mask(rainMask.get())
  image(rainMask,0,0,windowWidth, windowHeight);
  image(photo,0,0,windowHeight,windowHeight);
  photo.updatePixels();

  fill("rgba(16,17,26,0.8)");
  noStroke();
  rect(0,highh,width,lowh);




  fill(0,0,0,raintext)
  textSize(height*0.25);
  noStroke();

  textSize(height*0.04);
  textWrap(WORD);
  //was 50
  fill("rgba(255,255,255,1)");
  text('BADCOMBINA', 50, height*0.10, width*0.5, height);
  textSize(height*0.025);
  //was 28
  text('FEAT. VVILLOW', 50, height*0.16);
  fill("rgba(255,255,255,1)");
  textSize(height*0.1);
  //was 100
  text('IN THE RAIN', 50, height*0.25)
  makeRain()

  fill("rgba(16,17,26,0.7)");
  noStroke();
  rect(0,highh,width,lowh);
  makeDrops()
  rainMask.remove();
}

function makeRain() {
    for(var i = 0; i<rain.length;i++){
    rain[i].createParticle();
    rain[i].moveParticle();
  }
}

function makeimageRain() {
  for(var i = 0; i<imagerain.length;i++){
    imagerain[i].createRainParticle();
    imagerain[i].moveRainParticle();
  }
}

function makeDrops() {
    for(var i = 0; i<drops.length;i++){
    drops[i].createDrop();
    drops[i].stretchDrop();
  }
}

class Drops {
  constructor(){
    this.x = random(0,width);
    this.y = random(5,10);
    this.z = random(10,50)
    this.die = random(highh*1.05,height)
    this.fade = random(0,80)
}
createDrop () {
    strokeWeight(1);
    fill(2,4,38,0);
  stroke(255,255,255,this.fade);
  ellipse(this.x,this.die,this.z,this.y);
}

stretchDrop () {
  if(this.z < 200){
    this.fade += -1
    this.z = this.z+random(0.5,5)
  }
  if (this.z >= random(150,200)){
    let dindex = drops.indexOf(this);
    drops.splice(dindex,1);

    }

  }
}

class Rain {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,100);
    this.z = random(50,200)
    this.fade = random(10,150)
  }
  createParticle() {
    strokeWeight(1);
    stroke(color(255,255,255,10));
    fill(color(255,255,255,this.fade));
    rect(this.x, this.y, 1, this.z)
  }

  moveParticle() {
    if(this.y < height*0.80)
      this.y+=random(0,30);
    if (this.y >= random(height*0.60,height*0.80)){
      let index = rain.indexOf(this);
      rain.splice(index,1);

    }
  }

}


class ImageRain {
  constructor(){
    this.x = random(width*0.15,width*0.95);
    this.y = random(0,100);
    this.z = random(10,300)
    this.z=100;
    this.fade = random(0,100);
    this.blob = 1
    //130
  }
  createRainParticle() {
    rainMask.strokeWeight(1);
    rainMask.stroke(color(255,255,255,this.fade));
    rainMask.fill(color(255,255,255,this.fade));
    rainMask.rect(this.x, this.y, this.blob, this.z)
  }

  moveRainParticle() {

    if(this.y < height*0.85){
      this.y+=random(0,40);
    }

    if(this.y >= height*0.80){
      this.fade *= 0.70
    }

    if (this.y >= height*0.85){
      this.fade *= 0.50
      let index = imagerain.indexOf(this);
      imagerain.splice(index,1);

    }
  }
}