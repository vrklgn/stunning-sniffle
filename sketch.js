let rain = [];
let drops = [];
var cnv, soundFile, fft, peakDetect;
var raintext = 100;


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

function setup() {
  let canvas = createCanvas(1920, 1080);
  fade = 255
  textFont('Helvetica Neue')
  textStyle(BOLD);
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(20,10000);

  }

function draw() {
  for (let rand = 0; rand < random(1,2); rand++){
    rain.push(new Rain());
    gen = random (1,100)
    if (gen >= 94) {
      drops.push(new Drops());
    }
  }
  //let randx = random(8000)
  var i = 0 
  background("rgba(20,23,38,1)");
  fill("rgba(0,0,0,0.3)");
  noStroke();
  rect(0,820,width,380);
  textSize(50);
  fill("rgba(255,255,255,1)");
  text('BADCOMBINA', 50, 100);
  textSize(28);
  text('FEAT. VVILLOW', 50, 140);


  fft.analyze();
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    raintext = 100;
  } else {
    raintext *= 90;
  }

  textSize(raintext);
  text('IN THE RAIN', 50, 250)
  makeRain()
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
