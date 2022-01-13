let rain = [];
let drops = [];
var cnv, soundFile, fft, peakDetect;
var raintext = 0;


function preload() {
  soundFile = loadSound('assets/intherain.mp3');
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (soundFile.isPlaying() ) {
      soundFile.stop();
    } else {
      soundFile.play();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  fade = 255
  lowh = height*0.3
  textFont('Helvetica Neue')
  textStyle(BOLD);
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(20,38,0.4,15);

  }

function draw() {
  background("rgba(20,23,40,1)");
  for (let rand = 0; rand < random(1,2); rand++){
    rain.push(new Rain());
    gen = random (1,100)
    if (gen >= 94) {
      drops.push(new Drops());
    }
  }
  //let randx = random(8000)
  var i = 0 
  fill("rgba(0,0,0,0.3)");
  noStroke();
  rect(0,820,width,lowh);
  makeRain()
  fill(0,0,0,raintext)
  textSize(261);
  noStroke();
  text('IN THE RAIN', 50, 250)
  fft.analyze();
  peakDetect.update(fft);
  if ( peakDetect.isDetected ) {
    raintext = 200;
  } else {
    raintext *= 0.88;
  }
  textSize(50);
  fill("rgba(255,255,255,1)");
  text('BADCOMBINA', 50, 100);
  textSize(28);
  text('FEAT. VVILLOW', 50, 140);
  fill("rgba(255,255,255,1)");
  textSize(100);
  text('IN THE RAIN', 50, 250)
  
  makeDrops()
}

function makeRain() {
    for(var i = 0; i<rain.length;i++){
    rain[i].createParticle();
    rain[i].moveParticle();
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
    this.die = random(900,950)
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
    this.z = random(100,200)
    this.die = random (0,100)
    this.fade = random(10,130)
  }
  createParticle() {
    let ranleng = random(200)
    strokeWeight(1);
    stroke(color(255,255,255,10));
    fill(color(255,255,255,this.fade));
    rect(this.x, this.y, 1, this.z)
  }

  moveParticle() {
    if(this.y < 730)
    this.y+=random(0,100);
    if (this.y >= random(700,730)){
      let index = rain.indexOf(this);
      rain.splice(index,1);
      
    }
  }

}
