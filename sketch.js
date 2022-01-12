let rain = [];
let drops = [];

function setup() {
  createCanvas(1000, 1000);
  // Starts in the middle
  for (let i = 0; i < 50; i++) {
    rain.push(new Rain());
    gen = random(1,100)
    if (gen > 80) {
      drops.push(new Drops());
    }
    ring = 100
    y = 0
    //let randblopp = random(100)
    //y = y + random(1,10);
    //if (y > 1000) {
      //y = 0;
   // }
  }
}

function draw() {
  //let randx = random(8000)
  var i = 0 
  background("rgba(2,4,38,1)");
  makeRain()
  makeDrops()
  //waterdrop(random(1,1000));
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
    this.die = random(150,200)
}
createDrop () {
  stroke("rgba(255,255,255,0.1)");
  strokeWeight(2);
  fill("rgba(2,4,38,0.7)");
  ellipse(this.x,900,this.z,this.y);
}

stretchDrop () {
  if(this.z < 200)
    this.z = this.z+random(2,6)
  if (this.z >= random(100,200))
    this.z = 0
}

}

class Rain {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,100);
    this.z = random(100,200)
    this.die = random (0,100)
  }
  createParticle() {
    let ranleng = random(200)
    strokeWeight(1);
    stroke("rgba(255,255,255,0.2)");
    fill("rgba(255,255,255,0.2)");
    rect(this.x, this.y, 1, this.z)
  }

  moveParticle() {
    if(this.y < 700)
    this.y+=random(0,100);
  console.log (this.y)
    if (this.y >= 700){
      this.y=0
      if (this.die >= 90){
        //waterdrop(this.x)
      }
      
    }
  }

}
