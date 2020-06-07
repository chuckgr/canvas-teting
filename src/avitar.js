//--------------------------------------------------------------
// Contains all of the avitarcreator classes
//--------------------------------------------------------------
// -------------------------------------------------------------
// Avitar class responsible for creating the avitars for the 
// playing board.  Setup is determinecd by the classes passed
// for velocity and animation.
//
// 
// -------------------------------------------------------------
class AvitarCreator {
  constructor(vel, anim, count, ctx) {
    this.vel = vel; // Class to create the initial locations of the avitars
    this.anim = anim; // Class to determine the animation for the avitars
    this.NUMSHAPES = 3;
    this.AVITARSIZE = 60;
    this.COUNT = count;
    this.ctx = ctx;
    this.shapes = [];
    this.infected = [];
  }

  // -------------------------------------------------------------
  // Return an array of avatars based on the number defined
  // in global COUNT var 
  // -------------------------------------------------------------
  getAvitars() {
    let shape = "";
    //let shapes = [];
    let shapeType = Math.round(Math.random() * this.NUMSHAPES);
    let v = [];

    for (let i = 0; i < count; i++) {
      v = this.vel.getVelocity(this.ctx.canvas, this.COUNT, this.AVITARSIZE);
      if (shapeType == 0) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("andy"));
        shape.type = shapeType;
      } else if (shapeType == 1) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("stack"));
        shape.type = shapeType;
      } else if (shapeType == 2) {
        shape = new UserImage(v[0], v[1], this.AVITARSIZE, this.AVITARSIZE, document.getElementById("virginia"));
        shape.type = shapeType;
      }
      //console.log(shape);
      if (shape != "") {
        //shape.addAnimation(this.anim.createAnimation('Linear', shape));
        shape.addAnimation(this.anim.createAnimation('LeaveHome', shape));
        this.shapes.push(shape);
      }
      shapeType = Math.floor(Math.random() * this.NUMSHAPES);
    }
    return this.shapes;
  }

  // -------------------------------------------------------------
  // Infect one or more avatars with the corona
  // -------------------------------------------------------------
  infectAvatars() {
    // Infect one or more of the shapes with the 'Rona
    let infectCnt = Math.round(Math.random() * 2) + 1;
    if (debug) {
      console.log(`# infected at start = ${infectCnt}`);
    }
    for (let i = 0; i < infectCnt; i++) {
      let infectLocation = Math.floor(Math.random() * count);
      if (debug) {
        console.log(`Infected index = ${infectLocation}`);
      }
      this.infected.push(infectLocation);
      this.shapes[infectLocation].infect();
    }
    if (debug) {
      // TODO - fix this as it fails now that we get the images from HTML
      //this.shapes[infectLocation].img = document.getElementById("testimg");
    }
  }

  // -------------------------------------------------------------
  // Return the number of infected shapes
  // -------------------------------------------------------------
  numInfected() {
    return this.infected.length;
  }

  //--------------------------------------------------------------
  // Check for avatar collisions
  //--------------------------------------------------------------
  checkCollisions() {
    let nub = 0;
    const IMGWIDTH = 30;
    let touchRan = 0;
    let found = false;
    for (let i = 0; i < this.infected.length; i++) {
      for (let j = 0; j < this.shapes.length; j++) {
        if (this.shapes[this.infected[i]].alive && /*!shapes[j].infected &&*/ this.shapes[j].alive) {
          if (this.infected[i] != j) {
            if ((this.shapes[this.infected[i]].x < this.shapes[j].x + IMGWIDTH &&
                this.shapes[this.infected[i]].x + IMGWIDTH > this.shapes[j].x) &&
              this.shapes[this.infected[i]].y < this.shapes[j].y + IMGWIDTH &&
              this.shapes[this.infected[i]].y + IMGWIDTH > this.shapes[j].y) {

              touchRan = Math.round(Math.random() * TOUCHRANDOM);

              if (!sameTouch.includes(j) && touchRan == 1) {
                this.shapes[j].touch();
                sameTouch = [];
                sameTouch.push(j);
              }

              if (!this.infected.includes(j) && this.shapes[j].infected) {
                this.infected.push(j);
              }
            }
          }
        }
      }
    }
  }

}